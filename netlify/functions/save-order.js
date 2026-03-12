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

// Load products catalog (used to map purchased items to inventory_items.item_id)
// The build script copies src/data/products.json into these locations.
function loadProducts() {
  try {
    // eslint-disable-next-line global-require
    return require("./products.json");
  } catch (e1) {
    try {
      // eslint-disable-next-line global-require
      return require("./data/products.json");
    } catch (e2) {
      return null;
    }
  }
}

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
  // UK only - validate shipping address
  const country = (customerInfo?.address?.country || "").toUpperCase();
  if (country && country !== "GB" && country !== "UK") {
    return jsonResponse(400, {
      success: false,
      error: "We currently only ship to the United Kingdom. Please use a UK delivery address.",
    });
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

  const Products = loadProducts();

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

    // After a successful insert, decrement inventory_items.qty_in_stock for purchased items (if not unlimited/null).
    // This keeps Supabase + Dashboard stock in sync after sales on Netlify.
    const inventoryUpdate = {
      totalItems: 0,
      successful: 0,
      failed: 0,
      failedItems: [],
      note: null,
    };

    try {
      if (!Products) {
        inventoryUpdate.note =
          "Products catalog not found in Netlify function. Inventory decrement skipped.";
      } else {
        const CASE_TYPE_TO_PATH = {
          economy: "economy",
          business: "business-class",
          firstclass: "first-class",
        };

        const updates = [];
        const safeQty = (it) => parseInt(it?.quantity ?? 1, 10) || 1;

        const findPinId = (category, pinName, pinSrc, pinObj, itemObj) => {
          // Prefer explicit IDs if provided
          const direct = pinObj?.id ?? itemObj?.pin?.id;
          if (direct != null) return direct;

          const pins = Products?.pins?.[category] || [];
          const found = pins.find(
            (p) =>
              (pinObj?.id != null && p.id === pinObj.id) ||
              (itemObj?.id != null && p.id === itemObj.id) ||
              (pinName && p.name === pinName) ||
              (pinSrc && p.src === pinSrc)
          );
          return found?.id ?? null;
        };

        items.forEach((item) => {
          const quantityToDecrement = safeQty(item);

          // Standalone charm items
          if (item?.type === "charm") {
            const category = item.category || item.pin?.category || "colorful";
            const pinName = item.pin?.name || item.name;
            const pinSrc = item.pin?.src || item.src;
            const pinId = findPinId(category, pinName, pinSrc, item.pin, item);
            if (pinId != null) {
              updates.push({
                item_id: `pin-${category}-${pinId}`,
                quantity: quantityToDecrement,
              });
            }
          }

          // Case inventory (caseType + color)
          if (item?.caseType && item?.color) {
            const caseData = (Products?.cases || []).find((c) => c.type === item.caseType);
            if (caseData && Array.isArray(caseData.colors)) {
              const colorExists = caseData.colors.some((c) => c.color === item.color);
              if (colorExists && caseData.id != null) {
                updates.push({
                  item_id: `case-${caseData.id}-color-${item.color}`,
                  quantity: quantityToDecrement,
                });
              }
            }
          }

          // Pins attached to cases (pinsDetails or pins)
          const pinsAttached = item?.pinsDetails || item?.pins || [];
          if (Array.isArray(pinsAttached) && pinsAttached.length) {
            pinsAttached.forEach((pin) => {
              if (!pin) return;
              const category = pin.category || "colorful";
              const pinName = pin.name;
              const pinSrc = pin.src;
              const pinId = findPinId(category, pinName, pinSrc, pin, item);
              if (pinId != null) {
                updates.push({
                  item_id: `pin-${category}-${pinId}`,
                  quantity: quantityToDecrement,
                });
              }
            });
          }
        });

        // Group by item_id and sum
        const grouped = {};
        updates.forEach((u) => {
          if (!u?.item_id) return;
          grouped[u.item_id] = (grouped[u.item_id] || 0) + (u.quantity || 0);
        });

        const entries = Object.entries(grouped).filter(([, q]) => q > 0);
        inventoryUpdate.totalItems = entries.length;

        const results = await Promise.all(
          entries.map(async ([itemId, decBy]) => {
            try {
              const { data: currentItem, error: fetchError } = await supabase
                .from("inventory_items")
                .select("qty_in_stock")
                .eq("item_id", itemId)
                .single();

              if (fetchError) {
                return { success: false, item_id: itemId, error: fetchError.message };
              }

              const currentQty = currentItem?.qty_in_stock;
              // null => unlimited stock, skip
              if (currentQty === null || currentQty === undefined) {
                return { success: true, item_id: itemId, skipped: true };
              }

              const newQty = Math.max(0, Number(currentQty) - Number(decBy));

              const { error: updateError } = await supabase
                .from("inventory_items")
                .update({ qty_in_stock: newQty, updated_at: new Date().toISOString() })
                .eq("item_id", itemId);

              if (updateError) {
                return { success: false, item_id: itemId, error: updateError.message };
              }

              return { success: true, item_id: itemId, old_qty: currentQty, new_qty: newQty };
            } catch (e) {
              return { success: false, item_id: itemId, error: e.message };
            }
          })
        );

        inventoryUpdate.successful = results.filter((r) => r.success).length;
        const failed = results.filter((r) => !r.success);
        inventoryUpdate.failed = failed.length;
        inventoryUpdate.failedItems = failed.map((f) => f.item_id);
      }
    } catch (e) {
      inventoryUpdate.note = `Inventory decrement failed: ${e.message}`;
    }

    return jsonResponse(200, {
      success: true,
      message: "Order saved successfully",
      order_id: orderNumber,
      data: inserted,
      inventoryUpdate,
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
