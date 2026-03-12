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
  const toTitleCase = (value) =>
    String(value || "")
      .replace(/[-_]+/g, " ")
      .trim()
      .replace(/\b\w/g, (m) => m.toUpperCase());

  const normalizePins = (pins) => {
    if (!pins) return [];
    if (Array.isArray(pins)) return pins.filter(Boolean);
    if (typeof pins === "string") return pins.split(",").map((s) => s.trim()).filter(Boolean);
    return [];
  };

  const getItemName = (item) => item?.caseName || item?.name || item?.title || "Custom Case";
  const getQty = (item) => Number(item?.quantity ?? 1) || 1;
  const getUnitPrice = (item) => {
    if (item?.unit_price != null) return parseFloat(item.unit_price) || 0;
    if (item?.unitPrice != null) return parseFloat(item.unitPrice) || 0;
    if (item?.price != null) return parseFloat(item.price) || 0;
    if (item?.basePrice != null) return parseFloat(item.basePrice) || 0;
    const qty = getQty(item);
    const total = item?.total_price ?? item?.totalPrice;
    if (total != null) return (parseFloat(total) || 0) / Math.max(1, qty);
    return 0;
  };
  const getTotalPrice = (item) => {
    const qty = getQty(item);
    if (item?.total_price != null) return parseFloat(item.total_price) || 0;
    if (item?.totalPrice != null) return parseFloat(item.totalPrice) || 0;
    return getUnitPrice(item) * qty;
  };

  const orderItemsHtml =
    itemsToDisplay.length > 0
      ? itemsToDisplay
          .map((item) => {
            const name = getItemName(item);
            const qty = getQty(item);
            const unit = getUnitPrice(item);
            const total = getTotalPrice(item);
            const caseType = item?.case_type || item?.caseType;
            const color = item?.color;
            const pins = normalizePins(item?.pins || item?.pinsDetails);
            const hasPins = pins.length > 0;
            const customDesign = item?.custom_design === true || item?.customDesign === true;

            const details = [
              caseType ? `Case: ${toTitleCase(caseType)}` : null,
              color ? `Color: ${toTitleCase(color)}` : null,
              customDesign ? "Custom design: Yes" : null,
              hasPins ? `Pins: ${pins.map((p) => (typeof p === "string" ? p : p?.name || "")).filter(Boolean).join(", ")}` : null,
              `Qty: ${qty} • Unit: ${formatPrice(unit, currency)}`,
            ].filter(Boolean);

            const detailsHtml = details.length
              ? `<div style="color:#475569;font-size:12.5px;margin-top:4px;line-height:1.35;">${details
                  .map((d) => `<div>${String(d)}</div>`)
                  .join("")}</div>`
              : "";

            return `<tr>
              <td style="padding:12px 14px;border-bottom:1px solid #dbeafe;">
                <div style="font-weight:600;color:#0f172a;">${String(name)}</div>
                ${detailsHtml}
              </td>
              <td style="padding:12px 14px;border-bottom:1px solid #dbeafe;text-align:right;white-space:nowrap;font-weight:700;color:#0f172a;">
                ${formatPrice(total, currency)}
              </td>
            </tr>`;
          })
          .join("")
      : `<tr><td style="padding:12px 14px;color:#475569;">(No items provided)</td><td></td></tr>`;
  const displayName = customerName && typeof customerName === "string" && customerName.trim() ? customerName.trim() : null;
  const greeting = displayName ? `Hi ${displayName},` : "Hi there,";
  const trackButtonUrl = trackingLink || "https://www.evri.com/track-a-parcel";
  const trackButton = `<div style="text-align:center;margin:18px 0 0;">
    <a href="${trackButtonUrl}" style="display:inline-block;background:#1d4ed8;color:#ffffff;text-decoration:none;font-weight:800;font-size:14px;padding:12px 18px;border-radius:10px;">
      Track your parcel
    </a>
  </div>`;
  const hasAnyTracking = carrier || trackingNumber || trackingLink;
  const trackSection = hasAnyTracking
    ? `<h2 style="margin:22px 0 10px;font-size:16px;color:#1e40af;">Tracking details</h2>
       <div style="border:1px solid #bfdbfe;border-radius:12px;background:#eff6ff;padding:16px;color:#0f172a;font-size:14px;line-height:1.5;">
         <table style="width:100%;border-collapse:collapse;font-size:14px;">
           ${carrier ? `<tr><td style="padding:6px 0;color:#475569;">Carrier</td><td style="padding:6px 0;text-align:right;font-weight:700;color:#0f172a;">${carrier}</td></tr>` : ""}
           ${trackingNumber ? `<tr><td style="padding:6px 0;color:#475569;">Tracking number</td><td style="padding:6px 0;text-align:right;font-weight:700;color:#0f172a;">${trackingNumber}</td></tr>` : ""}
           ${trackingLink ? `<tr><td style="padding:6px 0;color:#475569;">Tracking link</td><td style="padding:6px 0;text-align:right;"><a href="${trackingLink}" style="color:#1d4ed8;text-decoration:none;font-weight:700;">Open tracking</a></td></tr>` : ""}
         </table>
       </div>`
    : "";

  const shippingAddressLines =
    shippingAddress && typeof shippingAddress === "object"
      ? [
          shippingAddress.name,
          shippingAddress.line1,
          shippingAddress.line2,
          shippingAddress.city,
          shippingAddress.state,
          shippingAddress.postal_code || shippingAddress.postcode,
          shippingAddress.country,
        ].filter(Boolean)
      : [];
  const shippingAddressHtml = shippingAddressLines.length
    ? shippingAddressLines.map((l) => `${String(l)}`).join("<br/>")
    : "N/A";

  const emailHtml = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Your parcel is on its way</title>
  </head>
  <body style="margin:0;padding:0;background:#eff6ff;">
    <div style="max-width:640px;margin:0 auto;padding:28px 16px;font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#0f172a;">
      <div style="background:#ffffff;border:1px solid #bfdbfe;border-radius:14px;overflow:hidden;">
        <div style="padding:22px 22px 16px;background:#ffffff;border-bottom:1px solid #bfdbfe;">
          <div style="text-align:center;">
            <img src="${logoUrl}" alt="The Happy Case" style="max-width:140px;height:auto;" />
          </div>
          <h1 style="margin:16px 0 6px;text-align:center;font-size:22px;letter-spacing:0.3px;color:#16a34a;">
            Your parcel is on its way
          </h1>
          <p style="margin:0;text-align:center;color:#334155;font-size:14px;">
            Your order has been dispatched. <strong>Expected delivery:</strong> ${deliveryEstimate}.
          </p>
          ${trackButton}
          <div style="margin-top:8px;color:#64748b;font-size:12px;text-align:center;">
            If the button doesn’t work, copy and paste: ${trackButtonUrl}
          </div>
        </div>

        <div style="padding:22px;">
          <p style="margin:0 0 14px;font-size:15px;color:#0f172a;">${greeting}</p>

          <div style="display:block;background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:16px;">
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              ${orderNumber ? `<tr><td style="padding:6px 0;color:#475569;">Order ID</td><td style="padding:6px 0;text-align:right;font-weight:700;color:#0f172a;">${orderNumber}</td></tr>` : ""}
              ${orderDate ? `<tr><td style="padding:6px 0;color:#475569;">Order date</td><td style="padding:6px 0;text-align:right;color:#0f172a;">${formatOrderDate(orderDate)}</td></tr>` : ""}
              ${totalAmount ? `<tr><td style="padding:6px 0;color:#475569;">Order total</td><td style="padding:6px 0;text-align:right;font-weight:800;color:#1e40af;">${formatPrice(totalAmount, currency)}</td></tr>` : ""}
            </table>
          </div>

          <h2 style="margin:22px 0 10px;font-size:16px;color:#1e40af;">Items in your order</h2>
          <div style="border:1px solid #bfdbfe;border-radius:12px;overflow:hidden;background:#ffffff;">
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <thead>
                <tr style="background:#dbeafe;">
                  <th style="padding:12px 14px;text-align:left;color:#1e40af;font-weight:800;">Item</th>
                  <th style="padding:12px 14px;text-align:right;color:#1e40af;font-weight:800;">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${orderItemsHtml}
              </tbody>
            </table>
          </div>

          ${trackSection}

          <h2 style="margin:22px 0 10px;font-size:16px;color:#1e40af;">Shipping address</h2>
          <div style="border:1px solid #bfdbfe;border-radius:12px;background:#eff6ff;padding:16px;color:#0f172a;font-size:14px;line-height:1.5;">
            ${shippingAddressHtml}
          </div>

          <p style="margin:22px 0 0;color:#475569;font-size:12px;text-align:center;">
            If you have any questions, just reply to this email.
          </p>
        </div>
      </div>
    </div>
  </body>
</html>`;
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

    // Update customer profile when marking as dispatched (profiles table)
    const userId = orderData[0]?.user_id;
    if (dispatched === true && userId) {
      await supabase
        .from("profiles")
        .update({
          last_order_dispatched_at: new Date().toISOString(),
          last_order_dispatched_id: orderId,
        })
        .eq("id", userId);
    }

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
