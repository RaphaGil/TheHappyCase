const Stripe = require("stripe");

// Helper function to get Stripe instance with validation
const getStripeInstance = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  
  // Validate key exists
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY environment variable is not set. Please configure it in Netlify environment variables.");
  }
  
  // Validate key format (should start with sk_test_ or sk_live_)
  if (!secretKey.startsWith("sk_test_") && !secretKey.startsWith("sk_live_")) {
    throw new Error("Invalid STRIPE_SECRET_KEY format. Key must start with 'sk_test_' (test mode) or 'sk_live_' (live mode).");
  }
  
  // Remove any whitespace that might have been accidentally added
  const cleanKey = secretKey.trim();
  
  try {
    return new Stripe(cleanKey);
  } catch (error) {
    throw new Error(`Failed to initialize Stripe: ${error.message}`);
  }
};

exports.handler = async (event) => {
  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    // Initialize Stripe with validation
    const stripe = getStripeInstance();
    const { amount, currency, items, customerInfo } = JSON.parse(event.body || "{}");

    // Validate required fields
    if (!amount || amount <= 0) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ error: "Amount is required and must be greater than 0" }),
      };
    }

    // Use currency from request or default to GBP
    const resolvedCurrency = (currency || "gbp").toLowerCase();
    const roundedAmount = Math.round(amount);

    // Stripe minimum amounts by currency (in smallest currency unit)
    const minimumAmounts = {
      'gbp': 30,      // 30 pence = £0.30
      'usd': 50,      // 50 cents = $0.50
      'eur': 50,      // 50 cents = €0.50
      'cad': 50,      // 50 cents = C$0.50
      'aud': 50,      // 50 cents = A$0.50
      'brl': 50,      // 50 centavos = R$0.50
      'jpy': 50,      // 50 yen
      'mxn': 100,     // 100 centavos = MX$1.00
      'inr': 50,      // 50 paise = ₹0.50
    };

    const minimumAmount = minimumAmounts[resolvedCurrency] || 30;

    if (roundedAmount < minimumAmount) {
      const currencySymbols = {
        'gbp': '£',
        'usd': '$',
        'eur': '€',
        'cad': 'C$',
        'aud': 'A$',
        'brl': 'R$',
        'jpy': '¥',
        'mxn': 'MX$',
        'inr': '₹',
      };
      const symbol = currencySymbols[resolvedCurrency] || resolvedCurrency.toUpperCase();
      const minDisplay = (minimumAmount / 100).toFixed(2);
      const currentDisplay = (roundedAmount / 100).toFixed(2);

      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          error: `Amount is too small. Minimum amount is ${symbol}${minDisplay}. Your amount is ${symbol}${currentDisplay}.`,
        }),
      };
    }

    // Build payment intent parameters
    const paymentIntentParams = {
      amount: roundedAmount,
      currency: resolvedCurrency,
      automatic_payment_methods: { enabled: true },
    };

    // Add metadata if items or customerInfo are provided
    if (items || customerInfo) {
      paymentIntentParams.metadata = {};
      if (items) {
        paymentIntentParams.metadata.items = JSON.stringify(items);
      }
      if (customerInfo) {
        paymentIntentParams.metadata.customerInfo = JSON.stringify(customerInfo);
        if (customerInfo.email) {
          paymentIntentParams.receipt_email = customerInfo.email;
        }
      }
      paymentIntentParams.metadata.orderId = `order_${Date.now()}`;
    }

    // Add description
    if (items && Array.isArray(items) && items.length > 0) {
      paymentIntentParams.description = `Order for ${items.length} item(s)`;
    }

    // Add shipping address if provided
    if (customerInfo?.address) {
      paymentIntentParams.shipping = {
        name: customerInfo.name || "Customer",
        address: {
          line1: customerInfo.address.line1 || "",
          line2: customerInfo.address.line2 || "",
          city: customerInfo.address.city || "",
          postal_code: customerInfo.address.postal_code || "",
          country: customerInfo.address.country || "GB",
          state: customerInfo.address.state || "",
        },
      };
    }

    const paymentIntent = await stripe.paymentIntents.create(paymentIntentParams);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientSecret: paymentIntent.client_secret,
      }),
    };
  } catch (err) {
    console.error("Error creating payment intent:", err);
    
    // Provide more helpful error messages
    let errorMessage = err.message;
    
    // Check for common Stripe API key errors
    if (err.message && err.message.includes("Invalid API Key")) {
      errorMessage = "Invalid Stripe API key. Please check your STRIPE_SECRET_KEY in Netlify environment variables. Make sure it starts with 'sk_test_' (test mode) or 'sk_live_' (live mode) and has no extra spaces or characters.";
    } else if (err.message && err.message.includes("No API key provided")) {
      errorMessage = "Stripe API key is missing. Please set STRIPE_SECRET_KEY in Netlify environment variables.";
    } else if (err.message && err.message.includes("STRIPE_SECRET_KEY")) {
      // Keep the validation error message as-is
      errorMessage = err.message;
    }
    
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ error: errorMessage }),
    };
  }
};
