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
        subtotal: computedSubtotal,
        shipping: computedShipping,
        total: computedTotal,
      },
    });
  }

  const resend = new Resend(RESEND_API_KEY);

  const customerName =
    [customerInfo.name, customerInfo.surname].filter(Boolean).join(" ") || "Customer";

  const orderId =
    paymentIntent?.id ||
    paymentIntent?.metadata?.order_id ||
    paymentIntent?.metadata?.order_number ||
    "N/A";

  const subject = `Your order${orderId !== "N/A" ? ` ${orderId}` : ""} – The Happy Case`;

  const lines = [
    `Hi ${customerName},`,
    "",
    "Thank you for your order from The Happy Case.",
    "",
    `Order ID: ${orderId}`,
    "",
    `Subtotal: £${computedSubtotal.toFixed(2)}`,
    `Shipping: £${computedShipping.toFixed(2)}`,
    `Total:    £${computedTotal.toFixed(2)}`,
    "",
    "We will email you again when your order has been dispatched.",
    "",
    "Best wishes,",
    "The Happy Case",
  ];

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject,
      text: lines.join("\n"),
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

