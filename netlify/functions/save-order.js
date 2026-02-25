/**
 * Netlify Function: save-order
 * Sends order information to Supabase (orders table).
 *
 * Required: orders table must have an order_number column (VARCHAR).
 * If missing, run in Supabase SQL Editor: see supabase-add-order-number.sql
 *
 * Env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY. Do not set BACKEND_API_URL unless proxying.
 */

const { createClient } = require("@supabase/supabase-js");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: corsHeaders, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { error: "Method not allowed" });
  }

  // Proxy only when BACKEND_API_URL is explicitly set (so orders go to Supabase when SUPABASE_* are set)
  const backendUrl = process.env.BACKEND_API_URL;
  if (backendUrl) {
    try {
      const url = `${backendUrl.replace(/\/$/, "")}/api/save-order`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: event.body,
      });
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = { success: false, error: text || "Invalid response from backend" };
      }
      return {
        statusCode: res.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
    } catch (err) {
      console.error("Proxy to backend failed:", err);
      return jsonResponse(502, {
        success: false,
        error: "Backend unavailable",
        message: err.message,
      });
    }
  }

  const supabase = getSupabase();
  if (!supabase) {
    const missing = [];
    if (!process.env.SUPABASE_URL) missing.push("SUPABASE_URL");
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) missing.push("SUPABASE_SERVICE_ROLE_KEY");
    return jsonResponse(503, {
      success: false,
      error: "Supabase not configured",
      message: "Orders cannot be saved. In Netlify: set Environment variables SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (Site settings → Environment variables). Missing: " + missing.join(", ") + ".",
      missing,
    });
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return jsonResponse(400, { success: false, error: "Invalid JSON body" });
  }

  const { paymentIntent, customerInfo, items, userId, order_number: orderNumberFromBody } = body;

  if (!paymentIntent || !paymentIntent.id) {
    return jsonResponse(400, { success: false, error: "Payment Intent ID is required" });
  }
  if (!customerInfo || !customerInfo.email) {
    return jsonResponse(400, { success: false, error: "Customer email is required" });
  }
  if (!items || !Array.isArray(items) || items.length === 0) {
    return jsonResponse(400, { success: false, error: "Items array is required and cannot be empty" });
  }

  const paymentIntentId = paymentIntent.id;
  if (typeof paymentIntentId !== "string" || paymentIntentId.length > 255) {
    return jsonResponse(400, { success: false, error: "Invalid payment intent ID" });
  }
  // Order # = code generated in order summary (from frontend). Not the payment ID. Fallback if missing.
  const orderNumber =
    orderNumberFromBody && String(orderNumberFromBody).trim()
      ? String(orderNumberFromBody).trim()
      : (() => {
          const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
          let code = "THC-";
          for (let i = 0; i < 8; i++) {
            code += chars[Math.floor(Math.random() * chars.length)];
          }
          return code;
        })();

  const unitPrice = (item) => parseFloat(item.totalPrice ?? item.price ?? item.basePrice ?? 0) || 0;
  const qty = (item) => parseInt(item.quantity ?? 1, 10) || 1;

  let totalAmount = 0;
  try {
    totalAmount = items.reduce((sum, item) => sum + unitPrice(item) * qty(item), 0);
  } catch (e) {
    return jsonResponse(400, { success: false, error: "Invalid item prices" });
  }
  if (isNaN(totalAmount) || totalAmount <= 0) {
    return jsonResponse(400, { success: false, error: "Invalid total amount" });
  }

  const orderDate = paymentIntent.created
    ? new Date(paymentIntent.created * 1000).toISOString()
    : new Date().toISOString();

  const itemsForDb = items.map((item, index) => {
    const up = unitPrice(item);
    const n = qty(item);
    return {
      id: item.id ?? null,
      name: item.caseName ?? item.name ?? "Custom Case",
      case_type: item.caseType ?? null,
      color: item.color ?? null,
      quantity: n,
      unit_price: up,
      total_price: up * n,
      pins: item.pins ?? item.pinsDetails ?? null,
      custom_design: item.customDesign ?? false,
      case_image: item.caseImage ?? item.image ?? null,
      design_image: item.designImage ?? null,
    };
  });

  const orderData = {
    order_id: orderNumber,
    order_number: orderNumber,
    payment_intent_id: paymentIntentId,
    customer_email: customerInfo.email,
    customer_name: customerInfo.name ?? null,
    customer_phone: customerInfo.phone ?? null,
    total_amount: parseFloat(totalAmount.toFixed(2)),
    currency: (paymentIntent.currency || "gbp").toLowerCase(),
    status: paymentIntent.status || "succeeded",
    order_date: orderDate,
    user_id: userId ?? null,
    shipping_address: customerInfo.address
      ? {
          line1: customerInfo.address.line1,
          line2: customerInfo.address.line2 ?? null,
          city: customerInfo.address.city,
          postal_code: customerInfo.address.postal_code,
          country: customerInfo.address.country,
          state: customerInfo.address.state ?? null,
        }
      : null,
    items: itemsForDb,
    metadata: {
      ...(paymentIntent.metadata || {}),
      dispatched: false,
      dispatched_at: null,
    },
  };

  try {
    // Idempotency: check by payment_intent_id (Stripe id), not order_id (display number)
    const { data: existing } = await supabase
      .from("orders")
      .select("order_id")
      .eq("payment_intent_id", paymentIntentId)
      .maybeSingle();

    if (existing) {
      return jsonResponse(200, {
        success: true,
        message: "Order already exists (idempotent)",
        order_id: orderNumber,
        data: existing,
        alreadyExists: true,
      });
    }

    const { data: inserted, error } = await supabase
      .from("orders")
      .insert([orderData])
      .select()
      .single();

    if (error) {
      if (error.code === "23505") {
        return jsonResponse(200, {
          success: true,
          message: "Order already exists (idempotent)",
          order_id: orderNumber,
          alreadyExists: true,
        });
      }
      console.error("Supabase insert error:", error);
      return jsonResponse(500, {
        success: false,
        error: error.message || "Failed to save order to database",
        order_id: orderNumber,
      });
    }

    return jsonResponse(200, {
      success: true,
      message: "Order saved successfully",
      order_id: orderNumber,
      data: inserted,
    });
  } catch (err) {
    console.error("save-order error:", err);
    return jsonResponse(500, {
      success: false,
      error: err.message || "Failed to save order",
      order_id: orderNumber,
    });
  }
};
