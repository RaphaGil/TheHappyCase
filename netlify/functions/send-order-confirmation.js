/**
 * Netlify Function: send-order-confirmation
 * Sends (or simulates sending) an order confirmation email via Resend.
 *
 * Frontend calls: POST /api/send-order-confirmation
 * Redirected in netlify.toml to: /.netlify/functions/send-order-confirmation
 *
 * Env:
 * - RESEND_API_KEY (optional but recommended)
 * - FROM_EMAIL (optional, defaults to onboarding@resend.dev)
 */

const { Resend } = require("resend");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

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
    return jsonResponse(405, { success: false, error: "Method not allowed" });
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return jsonResponse(400, { success: false, error: "Invalid JSON body" });
  }

  const { paymentIntent, customerInfo, items, shippingCost, subtotal, totalWithShipping } = body;

  if (!customerInfo || !customerInfo.email) {
    return jsonResponse(400, { success: false, error: "Customer email is required" });
  }

  const email = customerInfo.email;

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return jsonResponse(400, { success: false, error: `Invalid email format: ${email}` });
  }

  // UK-only guard, mirroring server.js behaviour
  const country = (customerInfo?.address?.country || "").toUpperCase();
  if (country && country !== "GB" && country !== "UK") {
    return jsonResponse(400, {
      success: false,
      error: "We currently only ship to the United Kingdom. Please use a UK delivery address.",
    });
  }

  const computedSubtotal =
    typeof subtotal === "number"
      ? subtotal
      : (items || []).reduce(
          (sum, item) =>
            sum +
            ((item.totalPrice ?? item.price ?? item.basePrice ?? 0) *
              (item.quantity ?? 1)),
          0
        );

  let computedShipping = typeof shippingCost === "number" ? shippingCost : 0;
  if (!shippingCost && items && items.length > 0) {
    computedShipping = 3; // Flat UK shipping
  }

  const computedTotal =
    typeof totalWithShipping === "number"
      ? totalWithShipping
      : computedSubtotal + computedShipping;

  const customerName =
    [customerInfo.name, customerInfo.surname].filter(Boolean).join(" ") || "Customer";

  // Prefer short, customer-facing order number (e.g. 12FRBPXG), not full pi_...
  let displayOrderNumber =
    paymentIntent?.metadata?.order_number ||
    paymentIntent?.metadata?.order_id ||
    (paymentIntent?.id
      ? String(paymentIntent.id).slice(-8).toUpperCase()
      : "N/A");

  const orderDate =
    typeof paymentIntent?.created === "number"
      ? new Date(paymentIntent.created * 1000)
      : new Date();
  const formattedOrderDate = orderDate.toLocaleString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const FROM_EMAIL = process.env.FROM_EMAIL || "onboarding@resend.dev";

  // If RESEND_API_KEY is not configured, return a soft warning so frontend logs a warning, not an error
  if (!RESEND_API_KEY) {
    return jsonResponse(200, {
      success: false,
      message: "Resend API key not configured",
      warning: "RESEND_API_KEY is not set in Netlify environment variables",
      email: {
        to: email,
        from: FROM_EMAIL,
        orderNumber: displayOrderNumber,
        subtotal: computedSubtotal,
        shipping: computedShipping,
        total: computedTotal,
      },
    });
  }

  const resend = new Resend(RESEND_API_KEY);

  const subject =
    displayOrderNumber && displayOrderNumber !== "N/A"
      ? `Thank you for your order ${displayOrderNumber} – The Happy Case`
      : "Your order – The Happy Case";

  const websiteUrl = process.env.URL || "https://thehappycase.shop";
  const logoUrl = `${websiteUrl}/assets/logo.webp`;
  const viewOrderUrl = `${websiteUrl}/my-orders`;

  const formatGBP = (value) => `£${Number(value || 0).toFixed(2)}`;
  const itemsToDisplay = Array.isArray(items) ? items : [];
  const itemsHtml =
    itemsToDisplay.length > 0
      ? itemsToDisplay
          .map((item) => {
            const name = item.caseName || item.name || item.title || "Custom Case";
            const qty = item.quantity ?? 1;
            const unit = item.price ?? item.basePrice ?? 0;
            const total =
              item.totalPrice ??
              item.total_price ??
              (Number(unit || 0) * Number(qty || 1));
            return `<tr>
              <td style="padding:12px 14px;border-bottom:1px solid #dbeafe;">
                <div style="font-weight:600;color:#0f172a;">${String(name)}</div>
                <div style="color:#475569;font-size:13px;margin-top:2px;">Qty: ${qty}</div>
              </td>
              <td style="padding:12px 14px;border-bottom:1px solid #dbeafe;text-align:right;white-space:nowrap;font-weight:600;color:#0f172a;">
                ${formatGBP(total)}
              </td>
            </tr>`;
          })
          .join("")
      : `<tr><td style="padding:12px 14px;color:#475569;">(No items provided)</td><td></td></tr>`;

  const address = customerInfo?.address || {};
  const shippingAddressLines = [
    customerName,
    address.line1,
    address.line2,
    address.city,
    address.state,
    address.postal_code || address.postcode,
    address.country,
  ].filter(Boolean);
  const shippingAddressHtml = shippingAddressLines.length
    ? shippingAddressLines.map((l) => `${String(l)}`).join("<br/>")
    : "N/A";

  const emailHtml = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Order confirmation</title>
  </head>
  <body style="margin:0;padding:0;background:#eff6ff;">
    <div style="max-width:640px;margin:0 auto;padding:28px 16px;font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#0f172a;">
      <div style="background:#ffffff;border:1px solid #bfdbfe;border-radius:14px;overflow:hidden;">
        <div style="padding:22px 22px 16px;background:#ffffff;border-bottom:1px solid #bfdbfe;">
          <div style="text-align:center;">
            <img src="${logoUrl}" alt="The Happy Case" style="max-width:140px;height:auto;" />
          </div>
          <h1 style="margin:16px 0 6px;text-align:center;font-size:22px;letter-spacing:0.3px;color:#1d4ed8;">
            Thanks for your purchase
          </h1>
          <p style="margin:0;text-align:center;color:#334155;font-size:14px;">
            We’ve received your order and will start processing it shortly.
          </p>
        </div>

        <div style="padding:22px;">
          <p style="margin:0 0 14px;font-size:15px;color:#0f172a;">Hi <strong>${customerName}</strong>,</p>

          <div style="display:block;background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:16px;">
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <tr>
                <td style="padding:6px 0;color:#475569;">Order ID</td>
                <td style="padding:6px 0;text-align:right;font-weight:700;color:#0f172a;">${displayOrderNumber}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;color:#475569;">Order date</td>
                <td style="padding:6px 0;text-align:right;color:#0f172a;">${formattedOrderDate}</td>
              </tr>
            </table>
          </div>

          <div style="text-align:center;margin:18px 0 0;">
            <a href="${viewOrderUrl}" style="display:inline-block;background:#1d4ed8;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:12px 18px;border-radius:10px;">
              View order
            </a>
            <div style="margin-top:8px;color:#64748b;font-size:12px;">
              You may need to sign in to view your order.
            </div>
          </div>

          <h2 style="margin:22px 0 10px;font-size:16px;color:#1e40af;">Items purchased</h2>
          <div style="border:1px solid #bfdbfe;border-radius:12px;overflow:hidden;background:#ffffff;">
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <thead>
                <tr style="background:#dbeafe;">
                  <th style="padding:12px 14px;text-align:left;color:#1e40af;font-weight:700;">Item</th>
                  <th style="padding:12px 14px;text-align:right;color:#1e40af;font-weight:700;">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
              <tfoot>
                <tr>
                  <td style="padding:12px 14px;text-align:right;color:#475569;">Subtotal</td>
                  <td style="padding:12px 14px;text-align:right;font-weight:700;color:#0f172a;">${formatGBP(computedSubtotal)}</td>
                </tr>
                <tr>
                  <td style="padding:0 14px 12px;text-align:right;color:#475569;">Shipping</td>
                  <td style="padding:0 14px 12px;text-align:right;font-weight:700;color:#0f172a;">${formatGBP(computedShipping)}</td>
                </tr>
                <tr>
                  <td style="padding:12px 14px;text-align:right;color:#1e40af;font-weight:800;border-top:1px solid #dbeafe;">Total</td>
                  <td style="padding:12px 14px;text-align:right;color:#1e40af;font-weight:800;border-top:1px solid #dbeafe;">${formatGBP(computedTotal)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <h2 style="margin:22px 0 10px;font-size:16px;color:#1e40af;">Shipping address</h2>
          <div style="border:1px solid #bfdbfe;border-radius:12px;background:#eff6ff;padding:16px;color:#0f172a;font-size:14px;line-height:1.5;">
            ${shippingAddressHtml}
          </div>

          <h2 style="margin:22px 0 10px;font-size:16px;color:#1e40af;">What’s next?</h2>
          <div style="border:1px solid #bfdbfe;border-radius:12px;background:#ffffff;padding:16px;color:#0f172a;font-size:14px;line-height:1.6;">
            <p style="margin:0 0 10px;">Your order will be processed within 1-2 business days. You will receive a shipping confirmation email with tracking details once your items are dispatched.</p>
            <p style="margin:0;"><strong>Estimated delivery:</strong> 3-5 business days</p>
          </div>

          <p style="margin:22px 0 0;color:#475569;font-size:12px;text-align:center;">
            If you have any questions, just reply to this email.
          </p>
        </div>
      </div>
    </div>
  </body>
</html>`;

  const lines = [
    `Hi ${customerName},`,
    "",
    "Thank you for your order from The Happy Case.",
    "",
    displayOrderNumber && displayOrderNumber !== "N/A"
      ? `Order number: ${displayOrderNumber}`
      : null,
    "",
    `Subtotal: £${computedSubtotal.toFixed(2)}`,
    `Shipping: £${computedShipping.toFixed(2)}`,
    `Total:    £${computedTotal.toFixed(2)}`,
    "",
    `View your order: ${viewOrderUrl}`,
    "",
    "We will email you again when your order has been dispatched.",
    "",
    "Best wishes,",
    "The Happy Case",
  ].filter(Boolean);

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject,
      text: lines.join("\n"),
      html: emailHtml,
    });

    if (error) {
      return jsonResponse(500, {
        success: false,
        error: error.message || "Failed to send email via Resend",
      });
    }

    return jsonResponse(200, {
      success: true,
      message: "Order confirmation email sent successfully",
      emailId: data?.id,
      recipient: email,
    });
  } catch (err) {
    return jsonResponse(500, {
      success: false,
      error: err.message || "Failed to send email",
    });
  }
};

