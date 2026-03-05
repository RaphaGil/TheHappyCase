/**
 * Netlify Function: orders-dispatched
 * Updates order dispatched status and tracking info in Supabase.
 * Sends "Your pack is on its way" email via Resend when marking as dispatched.
 *
 * Invoked via redirect from /api/orders/:orderId/dispatched
 * Parses orderId from event.path
 *
 * Env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY (optional), FROM_EMAIL (optional)
 */

const { createClient } = require("@supabase/supabase-js");
const { Resend } = require("resend");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "PATCH, PUT, OPTIONS",
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

function parseOrderId(event) {
  const params = event.queryStringParameters || {};
  if (params.orderId) return params.orderId;
  const match = event.path && event.path.match(/\/api\/orders\/([^/]+)\/dispatched/);
  return match ? match[1] : null;
}

async function sendDispatchEmail({ to, customerName, orderNumber, trackingNumber, carrier, trackingLink, deliveryEstimate, items, totalAmount, orderDate, shippingAddress, currency }) {
  if (!to || !to.trim()) return { sent: false, reason: "no_customer_email" };
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey || !resendApiKey.startsWith("re_") || resendApiKey.length < 20) {
    return { sent: false, reason: "resend_not_configured" };
  }
  let fromEmail = process.env.FROM_EMAIL || "onboarding@resend.dev";
  const websiteUrl = process.env.URL || "https://thehappycase.shop";
  const logoUrl = `${websiteUrl}/assets/logo.webp`;
  const formatOrderDate = (d) => (d ? new Date(d).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "");
  const formatPrice = (amt, curr = "gbp") => new Intl.NumberFormat("en-GB", { style: "currency", currency: (curr || "gbp").toUpperCase() }).format(amt || 0);
  const itemsToDisplay = Array.isArray(items) ? items : [];
  const orderItemsHtml = itemsToDisplay.map((item) => {
    const name = item.caseName || item.name || "Custom Case";
    const qty = item.quantity || 1;
    let price = 0;
    if (item.total_price != null) price = parseFloat(item.total_price) || 0;
    else if (item.unit_price != null) price = (parseFloat(item.unit_price) || 0) * qty;
    else if (item.totalPrice != null) price = parseFloat(item.totalPrice) || 0;
    else if (item.price != null) price = (parseFloat(item.price) || 0) * qty;
    return `<tr><td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;">${name} × ${qty}</td><td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:right;font-weight:500;">${formatPrice(price, currency)}</td></tr>`;
  }).join("");
  const displayName = customerName && typeof customerName === "string" && customerName.trim() ? customerName.trim() : null;
  const greeting = displayName ? `Hi ${displayName},` : "Hi there,";
  const trackButtonUrl = trackingLink || "https://www.evri.com/track-a-parcel";
  const trackButton = `<div style="text-align:center;margin:28px 0;"><a href="${trackButtonUrl}" style="display:inline-block;padding:14px 32px;background:#111827;color:#fff;font-size:16px;font-weight:600;text-decoration:none;border-radius:8px;">Track your parcel</a></div>`;
  const hasAnyTracking = carrier || trackingNumber || trackingLink;
  const trackSection = hasAnyTracking ? `<div style="background:#fef9c3;padding:20px;border-radius:8px;margin:20px 0;border:1px solid #e5e7eb;"><h2 style="margin:0 0 16px;font-size:18px;">Tracking details</h2><table style="width:100%;">${carrier ? `<tr><td style="padding:8px 0;color:#4b5563;">Carrier:</td><td style="padding:8px 0;text-align:right;">${carrier}</td></tr>` : ""}${trackingNumber ? `<tr><td style="padding:8px 0;color:#4b5563;">Tracking number:</td><td style="padding:8px 0;text-align:right;">${trackingNumber}</td></tr>` : ""}</table></div>` : "";
  const orderSection = (itemsToDisplay.length > 0 || totalAmount || orderNumber || orderDate) ? `<div style="background:#f9fafb;padding:20px;border-radius:8px;margin:20px 0;border:1px solid #e5e7eb;"><h2 style="margin:0 0 16px;font-size:18px;">Order information</h2>${orderNumber ? `<p style="margin:0 0 12px;color:#4b5563;"><strong>Order #:</strong> ${orderNumber}</p>` : ""}${orderDate ? `<p style="margin:0 0 12px;color:#4b5563;"><strong>Date:</strong> ${formatOrderDate(orderDate)}</p>` : ""}${itemsToDisplay.length > 0 ? `<table style="width:100%;border-collapse:collapse;"><thead><tr style="background:#fef9c3;"><th style="padding:10px 12px;text-align:left;">Item</th><th style="padding:10px 12px;text-align:right;">Price</th></tr></thead><tbody>${orderItemsHtml}</tbody>${totalAmount ? `<tfoot><tr><td style="padding:12px;font-weight:600;">Total</td><td style="padding:12px;text-align:right;font-weight:600;">${formatPrice(totalAmount, currency)}</td></tr></tfoot>` : ""}</table>` : ""}${shippingAddress && (shippingAddress.line1 || shippingAddress.city) ? `<p style="margin:16px 0 0;color:#4b5563;"><strong>Shipping to:</strong><br/>${[shippingAddress.line1, shippingAddress.line2, shippingAddress.city, shippingAddress.state, shippingAddress.postal_code, shippingAddress.country].filter(Boolean).join(", ")}</p>` : ""}</div>` : "";
  const emailHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="font-family:Inter,sans-serif;line-height:1.6;color:#111827;max-width:600px;margin:0 auto;padding:20px;"><div style="background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:30px;"><div style="text-align:center;margin-bottom:24px;"><img src="${logoUrl}" alt="The Happy Case" style="max-width:200px;height:auto;" /><h1 style="color:#16a34a;margin:0;font-size:24px;text-transform:uppercase;">Your parcel is on its way</h1></div><p style="margin:0 0 16px;">${greeting}</p><p style="margin:0 0 16px;">Your item has been dispatched. <strong>Expected delivery:</strong> ${deliveryEstimate}.</p>${trackButton}${orderSection}${trackSection}<p style="margin:20px 0 0;color:#64748b;font-size:14px;">Thank you for shopping with The Happy Case.</p></div></body></html>`;
  try {
    const resend = new Resend(resendApiKey);
    const { error } = await resend.emails.send({
      from: `The Happy Case <${fromEmail}>`,
      to: to.trim(),
      subject: `Your order ${orderNumber} is on its way`,
      html: emailHtml,
    });
    if (error) return { sent: false, reason: error.message || "resend_error" };
    return { sent: true };
  } catch (err) {
    return { sent: false, reason: err.message || "send_failed" };
  }
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: corsHeaders, body: "" };
  }

  if (event.httpMethod !== "PATCH" && event.httpMethod !== "PUT") {
    return jsonResponse(405, { error: "Method not allowed" });
  }

  const orderId = parseOrderId(event);
  if (!orderId) {
    return jsonResponse(400, { error: "Invalid request", message: "Order ID not found in path" });
  }

  const supabase = getSupabase();
  if (!supabase) {
    return jsonResponse(503, {
      error: "Supabase not configured",
      message: "Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Netlify environment variables.",
    });
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return jsonResponse(400, { error: "Invalid JSON body" });
  }

  const { dispatched, tracking_number, tracking_link, carrier } = body;
  if (typeof dispatched !== "boolean") {
    return jsonResponse(400, { error: "Invalid request", message: "dispatched must be a boolean value" });
  }

  const processedTrackingNumber = tracking_number && typeof tracking_number === "string" && tracking_number.trim() ? tracking_number.trim() : null;
  const processedTrackingLink = tracking_link && typeof tracking_link === "string" && tracking_link.trim() ? tracking_link.trim() : null;
  const processedCarrier = carrier && typeof carrier === "string" && carrier.trim() ? carrier.trim() : null;

  try {
    const { data: currentOrder, error: fetchError } = await supabase
      .from("orders")
      .select("metadata")
      .eq("order_id", orderId)
      .single();

    if (fetchError || !currentOrder) {
      return jsonResponse(404, { error: "Order not found", message: `Order ${orderId} does not exist` });
    }

    let existingMetadata = {};
    if (currentOrder.metadata) {
      existingMetadata = typeof currentOrder.metadata === "string" ? (() => { try { return JSON.parse(currentOrder.metadata); } catch { return {}; } })() : (typeof currentOrder.metadata === "object" ? currentOrder.metadata : {});
    }

    const updatedMetadata = {
      ...existingMetadata,
      dispatched: dispatched === true,
      dispatched_at: dispatched === true ? new Date().toISOString() : null,
      carrier: dispatched === true ? (processedCarrier || existingMetadata.carrier || null) : null,
    };
    delete updatedMetadata.tracking_number;
    delete updatedMetadata.tracking_link;

    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .update({ metadata: updatedMetadata })
      .eq("order_id", orderId)
      .select("*");

    if (orderError) {
      return jsonResponse(500, { error: orderError.message || "Failed to update order" });
    }

    const trackingData = { order_id: orderId, tracking_number: processedTrackingNumber, tracking_link: processedTrackingLink };
    await supabase.from("tracking").upsert(trackingData, { onConflict: "order_id", ignoreDuplicates: false });

    const trackingWithCarrier = { ...trackingData, carrier: processedCarrier || updatedMetadata.carrier || null };
    const responseOrder = { ...orderData[0], tracking: trackingWithCarrier };

    let dispatchEmailSent = false;
    let dispatchEmailError = null;
    if (dispatched === true) {
      let customerEmail = orderData[0]?.customer_email;
      if (!customerEmail) {
        const { data: row } = await supabase.from("orders").select("customer_email").eq("order_id", orderId).single();
        customerEmail = row?.customer_email;
      }
      const orderNumber = orderData[0]?.order_number || String(orderId).slice(-8).toUpperCase() || orderId;
      const country = orderData[0]?.shipping_address?.country?.toUpperCase?.() || "";
      const isUK = country === "GB" || country === "UK";
      const addWorkingDays = (date, days) => {
        const d = new Date(date);
        let added = 0;
        while (added < days) { d.setDate(d.getDate() + 1); if (d.getDay() !== 0 && d.getDay() !== 6) added++; }
        return d;
      };
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const minDays = isUK ? 3 : 10;
      const maxDays = isUK ? 5 : 15;
      const fmt = (d) => d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "long", year: "numeric" });
      const deliveryEstimate = isUK ? `between ${fmt(addWorkingDays(today, minDays))} and ${fmt(addWorkingDays(today, maxDays))} (3–5 working days)` : `between ${fmt(addWorkingDays(today, minDays))} and ${fmt(addWorkingDays(today, maxDays))} (10–15 working days)`;
      if (customerEmail) {
        const result = await sendDispatchEmail({
          to: customerEmail,
          customerName: orderData[0]?.customer_name,
          orderNumber,
          trackingNumber: processedTrackingNumber,
          carrier: processedCarrier || updatedMetadata.carrier || "Carrier",
          trackingLink: processedTrackingLink,
          deliveryEstimate,
          items: orderData[0]?.items,
          totalAmount: orderData[0]?.total_amount,
          orderDate: orderData[0]?.order_date,
          shippingAddress: orderData[0]?.shipping_address,
          currency: orderData[0]?.currency || "gbp",
        });
        dispatchEmailSent = result.sent === true;
        dispatchEmailError = result.reason || null;
      } else {
        dispatchEmailError = "no_customer_email";
      }
    }

    return jsonResponse(200, {
      success: true,
      order: responseOrder,
      message: dispatched ? "Order marked as dispatched" : "Order marked as not dispatched",
      ...(dispatched && { dispatchEmailSent, ...(dispatchEmailError && { dispatchEmailError }) }),
    });
  } catch (err) {
    console.error("orders-dispatched error:", err);
    return jsonResponse(500, { error: err.message || "Failed to update order" });
  }
};
