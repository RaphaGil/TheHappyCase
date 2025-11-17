// Backend server for Stripe Embedded Checkout
// Run with: node server.js
// Install dependencies: npm install express stripe cors dotenv

require("dotenv").config();
const express = require("express");
const cors = require("cors");

// --- Validate keys ---
if (
  !process.env.STRIPE_SECRET_KEY ||
  process.env.STRIPE_SECRET_KEY === "sk_test_your_secret_key_here"
) {
  console.error("❌ ERROR: STRIPE_SECRET_KEY is not set or is still the placeholder value!");
  console.error("Please set your Stripe secret key in the .env file.");
  process.exit(1);
}

// ✅ Force modern Stripe API version that supports Embedded Checkout
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

console.log("🔍 Stripe API version in use:", stripe.getApiField("version"));

const app = express();
const PORT = process.env.PORT || 3001;

// --- Middleware ---
const allowedOrigins = process.env.FRONTEND_URL
  ? [process.env.FRONTEND_URL]
  : ["http://localhost:3000", "http://127.0.0.1:3000"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes(origin) ||
        origin.includes("localhost") ||
        origin.includes("127.0.0.1")
      ) {
        return callback(null, true);
      }
      console.log("⚠️ CORS blocked origin:", origin);
      callback(null, true); // Allow all in dev
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("public"));

// --- Create Embedded Checkout Session ---
app.post("/create-checkout-session", async (req, res) => {
  try {
    const { items, totalAmount, currency } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }
    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }
    const resolvedCurrency = (currency || "gbp").toLowerCase();

    // Build a single summarized line item to avoid rendering detailed product information
    const lineItems = [
      {
        price_data: {
          currency: resolvedCurrency,
          product_data: {
            name: " ",
          },
          unit_amount: Math.round(totalAmount),
        },
        quantity: 1,
      },
    ];

    // ✅ Create Embedded Checkout Session
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded", // Required for Embedded Checkout
      mode: "payment",
      line_items: lineItems,
      return_url: `${
        req.headers.origin || process.env.FRONTEND_URL || "http://localhost:3000"
      }/TheHappyCase/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      payment_method_types: ["card"], // Apple Pay/Google Pay auto-added
      shipping_address_collection: {
        allowed_countries: ["GB", "US", "CA", "AU", "DE", "FR", "ES", "IT"],
      },
    });

    if (!session.client_secret) {
      console.warn("⚠️ No client_secret on session! Full session:", session);
      return res.status(500).json({
        error: "Stripe did not return a client_secret. Check API version and Embedded Checkout settings.",
      });
    }

    res.json({ clientSecret: session.client_secret });
  } catch (error) {

    res.status(500).json({ error: error.message || "Failed to create checkout session" });
  }
});

// --- Create Payment Intent for Payment Element ---
app.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount, currency, items, customerInfo } = req.body || {};

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Amount must be greater than 0" });
    }

    const resolvedCurrency = (currency || "gbp").toLowerCase();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency: resolvedCurrency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        item_count: Array.isArray(items) ? items.length : 0,
        customer_email: customerInfo?.email || "",
      },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: error.message || "Failed to create payment intent" });
  }
});

// --- Session Status ---
app.get("/session-status", async (req, res) => {
  try {
    const { session_id } = req.query;
    if (!session_id) return res.status(400).json({ error: "Session ID is required" });

    const session = await stripe.checkout.sessions.retrieve(session_id);
    res.json({
      status: session.status,
      customer_email: session.customer_details?.email,
      payment_intent: session.payment_intent,
    });
  } catch (error) {
    console.error("Error retrieving session:", error);
    res.status(500).json({ error: error.message || "Failed to retrieve session" });
  }
});

// --- Health Check ---
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Stripe checkout server is running" });
});

app.listen(PORT, () => {
  console.log(`🚀 Stripe Embedded Checkout Server running on http://localhost:${PORT}`);
  console.log(`📝 Make sure your frontend is configured to call this server: ${PORT}`);
});
