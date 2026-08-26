const Stripe = require("stripe");
const { createClient } = require("@supabase/supabase-js");
const { saveOrderFromPaymentIntent } = require("./utils/saveOrderFromPaymentIntent.cjs");

function getStripe() {
  const secretKey = (process.env.STRIPE_SECRET_KEY || "").trim();
  if (!secretKey) return null;
  return new Stripe(secretKey);
}

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  const stripe = getStripe();
  const webhookSecret = (process.env.STRIPE_WEBHOOK_SECRET || "").trim();
  if (!stripe || !webhookSecret) {
    return {
      statusCode: 503,
      body: JSON.stringify({ error: "Stripe webhook is not configured" }),
    };
  }

  const signature = event.headers["stripe-signature"] || event.headers["Stripe-Signature"];
  let stripeEvent;
  try {
    stripeEvent = stripe.webhooks.constructEvent(event.body, signature, webhookSecret);
  } catch (err) {
    return { statusCode: 400, body: `Webhook signature verification failed: ${err.message}` };
  }

  if (stripeEvent.type !== "payment_intent.succeeded") {
    return { statusCode: 200, body: JSON.stringify({ received: true, ignored: stripeEvent.type }) };
  }

  const supabase = getSupabase();
  if (!supabase) {
    return { statusCode: 503, body: JSON.stringify({ error: "Supabase is not configured" }) };
  }

  try {
    const pi = await stripe.paymentIntents.retrieve(stripeEvent.data.object.id, {
      expand: ["payment_method", "latest_charge"],
    });
    const result = await saveOrderFromPaymentIntent(supabase, pi);
    return { statusCode: 200, body: JSON.stringify({ received: true, ...result }) };
  } catch (err) {
    console.error("stripe-webhook error:", err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
