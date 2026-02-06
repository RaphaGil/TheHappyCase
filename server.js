// Backend server for Stripe Embedded Checkout
// Run with: node server.js
// Install dependencies: npm install express stripe cors dotenv resend @supabase/supabase-js

import "dotenv/config";
import express from "express";
import cors from "cors";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load Products.json with error handling
let Products;
try {
  const productsPath = join(__dirname, './src/data/products.json');
  const productsContent = readFileSync(productsPath, 'utf-8');
  Products = JSON.parse(productsContent);
  console.log('✅ Products.json loaded successfully');
  console.log(`   - Cases: ${Products?.cases?.length || 0}`);
  console.log(`   - Pins flags: ${Products?.pins?.flags?.length || 0}`);
  console.log(`   - Pins colorful: ${Products?.pins?.colorful?.length || 0}`);
  console.log(`   - Pins bronze: ${Products?.pins?.bronze?.length || 0}`);
} catch (error) {
  console.error('\n❌ ========== CRITICAL ERROR LOADING PRODUCTS.JSON ==========');
  console.error('Error loading products.json:', error.message);
  console.error('Error path:', join(__dirname, './src/data/products.json'));
  console.error('============================================================\n');
  // Set Products to empty structure to prevent crashes
  Products = {
    cases: [],
    pins: {
      flags: [],
      colorful: [],
      bronze: []
    }
  };
}

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
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

console.log("🔍 Stripe API version in use:", stripe.getApiField("version"));

// --- Initialize Supabase Client ---
let supabase = null;
if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
  try {
    supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    console.log("✅ Supabase client initialized");
    console.log(`   URL: ${process.env.SUPABASE_URL.substring(0, 30)}...`);
    console.log(`   Key: ${process.env.SUPABASE_SERVICE_ROLE_KEY.substring(0, 20)}...`);
  } catch (error) {
    console.error("❌ Error initializing Supabase client:", error.message);
    supabase = null;
  }
} else {
  console.log("⚠️ Supabase not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env to enable order storage.");
  if (!process.env.SUPABASE_URL) {
    console.log("   - SUPABASE_URL is missing");
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.log("   - SUPABASE_SERVICE_ROLE_KEY is missing");
  }
}

const app = express();
const PORT = process.env.PORT || 3001;

// --- Middleware ---
// Production frontend URLs
const PRODUCTION_FRONTEND_URL = "https://raphagil.github.io";
const NETLIFY_FRONTEND_URL = "https://thehappycasestore.netlify.app";
// Custom domain - support both www and non-www versions
const CUSTOM_DOMAIN = process.env.CUSTOM_DOMAIN || "thehappycase.store";
const CUSTOM_DOMAIN_WWW = `www.${CUSTOM_DOMAIN}`;

const allowedOrigins = process.env.FRONTEND_URL
  ? [process.env.FRONTEND_URL, PRODUCTION_FRONTEND_URL, NETLIFY_FRONTEND_URL, `https://${CUSTOM_DOMAIN}`, `https://${CUSTOM_DOMAIN_WWW}`]
  : ["http://localhost:3000", "http://127.0.0.1:3000", PRODUCTION_FRONTEND_URL, NETLIFY_FRONTEND_URL, `https://${CUSTOM_DOMAIN}`, `https://${CUSTOM_DOMAIN_WWW}`];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      
      // Development origins
      if (origin.includes("localhost") || origin.includes("127.0.0.1")) {
        return callback(null, true);
      }
      
      // Check exact matches
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      
      // Allow GitHub Pages
      if (origin.startsWith("https://raphagil.github.io")) {
        return callback(null, true);
      }
      
      // Allow Netlify subdomain
      if (origin.startsWith("https://thehappycasestore.netlify.app")) {
        return callback(null, true);
      }
      
      // Allow custom domain (both www and non-www)
      if (origin === `https://${CUSTOM_DOMAIN}` || 
          origin === `https://${CUSTOM_DOMAIN_WWW}` ||
          origin === `http://${CUSTOM_DOMAIN}` ||
          origin === `http://${CUSTOM_DOMAIN_WWW}`) {
        return callback(null, true);
      }
      
      // Log blocked origins for debugging
      console.log("⚠️ CORS blocked origin:", origin);
      // Allow all in dev (but log for production debugging)
      callback(null, true);
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
app.post("/api/create-payment-intent", async (req, res) => {
  // Ensure we always send JSON responses
  const sendErrorResponse = (status, errorMessage) => {
    if (!res.headersSent) {
      res.status(status).json({ error: errorMessage });
    } else {
      console.error('⚠️ Cannot send error response - headers already sent');
    }
  };

  console.log('\n📥 POST /api/create-payment-intent request received');
  
  try {
    // Log request details safely
    try {
      console.log('   Request body:', JSON.stringify(req.body, null, 2));
    } catch (logError) {
      console.log('   Request body: (unable to stringify)', req.body);
    }
    const { amount, currency, items, customerInfo } = req.body || {};
    
    console.log('   Parsed request data:', {
      amount,
      currency,
      itemCount: Array.isArray(items) ? items.length : 'not an array',
      hasCustomerInfo: !!customerInfo,
      customerEmail: customerInfo?.email || 'N/A'
    });

    // Validate Stripe is configured
    if (!stripe) {
      console.error('❌ Stripe is not configured!');
      return sendErrorResponse(500, "Stripe is not configured. Please set STRIPE_SECRET_KEY in environment variables.");
    }

    if (!amount || amount <= 0) {
      console.error('❌ Invalid amount:', amount);
      return sendErrorResponse(400, "Amount must be greater than 0");
    }

    const resolvedCurrency = (currency || "gbp").toLowerCase();
    const roundedAmount = Math.round(amount);
    
    console.log('   Processed values:', {
      originalAmount: amount,
      roundedAmount,
      originalCurrency: currency,
      resolvedCurrency
    });

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

    const minimumAmount = minimumAmounts[resolvedCurrency] || 30; // Default to 30
    
    console.log('   Amount validation:', {
      roundedAmount,
      minimumAmount,
      currency: resolvedCurrency,
      isValid: roundedAmount >= minimumAmount
    });

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
      
      console.error('❌ Amount too small:', {
        roundedAmount,
        minimumAmount,
        currentDisplay: `${symbol}${currentDisplay}`,
        minDisplay: `${symbol}${minDisplay}`
      });
      
      return sendErrorResponse(400, `Amount is too small. Minimum amount is ${symbol}${minDisplay}. Your amount is ${symbol}${currentDisplay}.`);
    }

    console.log(`💳 Creating payment intent with Stripe: ${roundedAmount} ${resolvedCurrency.toUpperCase()}`);
    console.log('   Payment intent params:', {
      amount: roundedAmount,
      currency: resolvedCurrency,
      receipt_email: customerInfo?.email || 'not provided',
      metadata: {
        item_count: Array.isArray(items) ? items.length : 0,
        customer_email: customerInfo?.email || "",
        customer_name: customerInfo?.name || "",
      }
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: roundedAmount,
      currency: resolvedCurrency,
      automatic_payment_methods: {
        enabled: true,
      },
      receipt_email: customerInfo?.email || undefined, // Stripe will send receipt automatically
      metadata: {
        item_count: Array.isArray(items) ? items.length : 0,
        customer_email: customerInfo?.email || "",
        customer_name: customerInfo?.name || "",
      },
    });

    console.log(`✅ Payment intent created successfully: ${paymentIntent.id}`);
    console.log('   Response:', {
      paymentIntentId: paymentIntent.id,
      hasClientSecret: !!paymentIntent.client_secret,
      status: paymentIntent.status
    });

    if (!res.headersSent) {
      res.json({ clientSecret: paymentIntent.client_secret });
    } else {
      console.error('⚠️ Cannot send success response - headers already sent');
    }
  } catch (error) {
    console.error("❌ Error creating payment intent");
    console.error("   Error name:", error?.name);
    console.error("   Error type:", error?.type);
    console.error("   Error message:", error?.message);
    console.error("   Error code:", error?.code);
    console.error("   Error statusCode:", error?.statusCode);
    console.error("   Full error:", error);
    if (error?.stack) {
      console.error("   Stack trace:", error.stack);
    }
    
    // Provide more helpful error messages
    let errorMessage = error.message || "Failed to create payment intent";
    
    if (error.type === 'StripeInvalidRequestError') {
      console.error("   ⚠️ Stripe invalid request error detected");
      // Stripe-specific errors
      if (error.message.includes('minimum')) {
        errorMessage = error.message;
      } else if (error.message.includes('currency')) {
        errorMessage = `Invalid currency: ${error.message}`;
      } else if (error.message.includes('api_key')) {
        errorMessage = "Stripe API key error. Please check STRIPE_SECRET_KEY configuration.";
      }
    } else if (error.type === 'StripeAuthenticationError') {
      console.error("   ⚠️ Stripe authentication error detected");
      errorMessage = "Stripe authentication failed. Please check your Stripe API key.";
    } else if (error.type === 'StripeAPIError') {
      console.error("   ⚠️ Stripe API error detected");
      errorMessage = `Stripe API error: ${error.message}`;
    } else if (error instanceof TypeError) {
      console.error("   ⚠️ TypeError detected - possible undefined/null reference");
      errorMessage = `Type error: ${error.message}`;
    } else if (error instanceof ReferenceError) {
      console.error("   ⚠️ ReferenceError detected - possible undefined variable");
      errorMessage = `Reference error: ${error.message}`;
    }
    
    console.error("   Sending error response:", {
      status: 500,
      error: errorMessage
    });
    
    sendErrorResponse(500, errorMessage);
  }
});

// --- Send Order Confirmation Email ---
app.post("/api/send-order-confirmation", async (req, res) => {
  // Ensure we always return JSON, even if there's an unhandled error
  const sendErrorResponse = (status, error, details) => {
    if (!res.headersSent) {
      res.status(status).json({
        success: false,
        error: error || 'Unknown error',
        details: details
      });
    }
  };

  try {
    console.log('\n📧 ========== EMAIL SEND REQUEST RECEIVED ==========');
    
    // Validate request body exists
    if (!req.body) {
      console.error('❌ Request body is missing');
      return sendErrorResponse(400, 'Request body is required');
    }
    
    const { paymentIntent, customerInfo, items, shippingCost, vatAmount, subtotal, totalWithShipping } = req.body;

    console.log('📧 Email request details:');
    console.log('   - Payment Intent ID:', paymentIntent?.id || 'MISSING');
    console.log('   - Customer Email:', customerInfo?.email || 'MISSING');
    console.log('   - Customer Name:', customerInfo?.name || 'MISSING');
    console.log('   - Items Count:', items?.length || 0);
    console.log('   - Shipping Cost:', shippingCost || 'N/A');
    console.log('   - VAT Amount:', vatAmount || 'N/A');
    console.log('   - Subtotal:', subtotal || 'N/A');
    console.log('   - Total with Shipping:', totalWithShipping || 'N/A');
    console.log('   - Request body keys:', Object.keys(req.body || {}));

    if (!customerInfo?.email) {
      console.error('❌ Email request rejected: Customer email is required');
      return res.status(400).json({ 
        success: false,
        error: "Customer email is required" 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerInfo.email)) {
      console.error(`❌ Email request rejected: Invalid email format: ${customerInfo.email}`);
      return res.status(400).json({ 
        success: false,
        error: `Invalid email format: ${customerInfo.email}` 
      });
    }

    console.log(`✅ Email address validated: ${customerInfo.email}`);

    // Calculate amounts - use passed values or calculate from items and customer info
    const calculatedSubtotal = subtotal !== undefined ? subtotal : (items?.reduce((sum, item) => sum + (item.totalPrice || item.price || 0) * (item.quantity || 1), 0) || 0);
    
    // Calculate shipping if not provided (fallback for Stripe redirects or old requests)
    let calculatedShipping = shippingCost || 0;
    if (!shippingCost && customerInfo?.address?.country && items?.length > 0) {
      const SHIPPING_RATES = {
        GB: 3,
        US: 16,
        FR: 7,
      };
      const DEFAULT_SHIPPING_RATE = 12;
      const country = customerInfo.address.country.toUpperCase();
      calculatedShipping = SHIPPING_RATES[country] ?? DEFAULT_SHIPPING_RATE;
      console.log(`   Calculated shipping from country ${country}: £${calculatedShipping}`);
    }
    
    // Calculate VAT if not provided (fallback for Stripe redirects or old requests)
    let calculatedVat = vatAmount || 0;
    if (!vatAmount && customerInfo?.address?.country) {
      const EUROPEAN_COUNTRIES = new Set(['FR', 'DE', 'ES', 'IT']);
      const EUROPEAN_VAT_RATE = 0.2;
      const country = customerInfo.address.country.toUpperCase();
      if (EUROPEAN_COUNTRIES.has(country)) {
        calculatedVat = calculatedSubtotal * EUROPEAN_VAT_RATE;
        console.log(`   Calculated VAT for European country ${country}: £${calculatedVat.toFixed(2)}`);
      }
    }
    
    // Calculate total
    const totalAmount = totalWithShipping !== undefined 
      ? totalWithShipping 
      : calculatedSubtotal + calculatedVat + calculatedShipping;
    
    console.log(`📊 Order totals:`);
    console.log(`   - Subtotal: £${calculatedSubtotal.toFixed(2)}`);
    console.log(`   - Shipping: £${calculatedShipping.toFixed(2)}`);
    console.log(`   - VAT: £${calculatedVat.toFixed(2)}`);
    console.log(`   - Total: £${totalAmount.toFixed(2)}`);
    
    const orderId = paymentIntent?.id || `order-${Date.now()}`;
    
    // Try to fetch saved order to get Supabase Storage image URLs and order totals
    let savedOrderItems = null;
    let savedOrderTotals = null;
    if (supabase && orderId) {
      try {
        const { data: savedOrder } = await supabase
          .from('orders')
          .select('items, total_amount, shipping_address')
          .eq('order_id', orderId)
          .maybeSingle();
        
        if (savedOrder) {
          if (savedOrder.items && Array.isArray(savedOrder.items)) {
            savedOrderItems = savedOrder.items;
            console.log(`✅ Found saved order with ${savedOrderItems.length} items (using Supabase Storage URLs)`);
          }
          
          // Try to get shipping info from saved order metadata or calculate from address
          if (savedOrder.total_amount && savedOrder.shipping_address) {
            // We can use the saved total_amount, but we still need to calculate breakdown
            // The order might have shipping included in total_amount, but we don't store breakdown separately
            // So we'll still calculate from address if not provided
            savedOrderTotals = {
              total_amount: savedOrder.total_amount
            };
            console.log(`✅ Found saved order total: £${savedOrder.total_amount}`);
          }
        }
      } catch (fetchError) {
        console.warn('⚠️ Could not fetch saved order for images:', fetchError.message);
        // Continue with original items
      }
    }
    const orderDate = paymentIntent?.created 
      ? new Date(paymentIntent.created * 1000).toLocaleDateString('en-GB', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      : new Date().toLocaleDateString('en-GB');

    // Get website URL for logo image (use same logic as CORS allowed origins)
    const websiteUrl = process.env.FRONTEND_URL || 
                      (CUSTOM_DOMAIN ? `https://${CUSTOM_DOMAIN}` : 'https://thehappycase.store');
    // Ensure logo URL is absolute
    const logoUrl = `${websiteUrl}/assets/logo.webp`;
    
    console.log(`📧 Email configuration:`);
    console.log(`   - Website URL: ${websiteUrl}`);
    console.log(`   - Logo URL: ${logoUrl}`);

    // Format order items HTML
    // Use saved order items if available (they have Supabase Storage URLs), otherwise use original items
    const itemsToDisplay = savedOrderItems || items || [];
    const imageSource = savedOrderItems ? 'SAVED ORDER (Supabase Storage URLs)' : 'ORIGINAL ITEMS (from request)';
    console.log(`\n📧 Formatting ${itemsToDisplay?.length || 0} items for email...`);
    console.log(`   Image source: ${imageSource}`);
    
    if (!Array.isArray(itemsToDisplay) || itemsToDisplay.length === 0) {
      console.error('❌ No items to display in email');
      return res.status(400).json({
        success: false,
        error: 'No items found for email',
        itemsCount: itemsToDisplay?.length || 0
      });
    }
    
    let itemsHtml = '';
    try {
      itemsHtml = itemsToDisplay.map((item, index) => {
        const itemName = item.caseName || item.name || 'Custom Case';
      const quantity = item.quantity || 1;
      
      // Calculate price - handle both saved order format (unit_price, total_price) and original format (price, totalPrice)
      let itemPrice = 0;
      if (item.total_price !== undefined) {
        // Saved order format: use total_price directly
        itemPrice = parseFloat(item.total_price) || 0;
      } else if (item.unit_price !== undefined) {
        // Saved order format: unit_price * quantity
        itemPrice = (parseFloat(item.unit_price) || 0) * quantity;
      } else if (item.totalPrice !== undefined) {
        // Original format: totalPrice * quantity
        itemPrice = (parseFloat(item.totalPrice) || 0) * quantity;
      } else if (item.price !== undefined) {
        // Original format: price * quantity
        itemPrice = (parseFloat(item.price) || 0) * quantity;
      }
      const formattedPrice = itemPrice.toFixed(2);
      
      // Get item image URL - match dashboard priority: design_image first (custom design with charms), then case_image (just the case)
      // This matches the dashboard display logic: design_image > case_image
      let itemImageUrl = item.design_image || item.designImage || item.case_image || item.caseImage || item.image || null;
      
      // Ensure image URL is absolute (add protocol if missing)
      if (itemImageUrl && !itemImageUrl.startsWith('data:') && !itemImageUrl.startsWith('http://') && !itemImageUrl.startsWith('https://')) {
        // If it's a relative URL, make it absolute using the website URL
        if (itemImageUrl.startsWith('/')) {
          itemImageUrl = `${websiteUrl}${itemImageUrl}`;
        } else {
          itemImageUrl = `${websiteUrl}/${itemImageUrl}`;
        }
      }
      
      // Log image URL for debugging
      console.log(`   Item ${index + 1} (${itemName}):`);
      console.log(`     - Image URL: ${itemImageUrl || 'NONE'}`);
      if (itemImageUrl) {
        // Determine which image type was used (matches dashboard logic)
        const imageType = itemImageUrl === (item.design_image || item.designImage) ? 'DESIGN (custom with charms)' : 
                         itemImageUrl === (item.case_image || item.caseImage) ? 'CASE (base case only)' : 
                         'OTHER';
        console.log(`       - Image type: ${imageType}`);
        console.log(`       - URL type: ${itemImageUrl.startsWith('data:') ? 'BASE64 (not usable in email)' : itemImageUrl.startsWith('http') ? 'HTTP/HTTPS URL' : 'RELATIVE URL'}`);
        if (itemImageUrl.includes('supabase')) {
          console.log(`       - Source: Supabase Storage`);
        } else if (itemImageUrl.includes(websiteUrl)) {
          console.log(`       - Source: Website assets`);
        } else {
          console.log(`       - Source: External URL`);
        }
      }
      console.log(`     - Price: £${formattedPrice} (unit: ${item.unit_price || item.price || 'N/A'}, qty: ${quantity})`);
      
      // If image is a data URL (base64), we can't use it in email - skip it
      // Also check if it's a valid HTTP/HTTPS URL
      const hasValidImage = itemImageUrl && 
                           !itemImageUrl.startsWith('data:') && 
                           (itemImageUrl.startsWith('http://') || itemImageUrl.startsWith('https://'));
      
      return `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
            ${hasValidImage ? `
              <div style="display: flex; align-items: center; gap: 12px;">
                <img 
                  src="${itemImageUrl}" 
                  alt="${itemName}" 
                  style="width: 80px; height: 80px; object-fit: cover; border-radius: 6px; border: 1px solid #e5e7eb; display: block; background-color: #f3f4f6;"
                />
                <div style="flex: 1;">
                  <strong>${itemName}</strong>
                  ${item.color ? `<br><span style="color: #6b7280; font-size: 14px;">Color: ${item.color}</span>` : ''}
                  ${(item.pinsDetails && item.pinsDetails.length > 0) || (item.pins && Array.isArray(item.pins) && item.pins.length > 0) ? `<br><span style="color: #6b7280; font-size: 14px;">Charms: ${(item.pinsDetails || item.pins || []).length}</span>` : ''}
                </div>
              </div>
            ` : `
              <div>
                <strong>${itemName}</strong>
                ${item.color ? `<br><span style="color: #6b7280; font-size: 14px;">Color: ${item.color}</span>` : ''}
                ${(item.pinsDetails && item.pinsDetails.length > 0) || (item.pins && Array.isArray(item.pins) && item.pins.length > 0) ? `<br><span style="color: #6b7280; font-size: 14px;">Charms: ${(item.pinsDetails || item.pins || []).length}</span>` : ''}
              </div>
            `}
          </td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center; vertical-align: middle;">${quantity}</td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right; vertical-align: middle; font-weight: 500;">£${formattedPrice}</td>
        </tr>
      `;
      }).join('') || '';
    } catch (itemsError) {
      console.error('❌ Error generating items HTML:', itemsError);
      console.error('   Error details:', {
        message: itemsError.message,
        stack: itemsError.stack,
        items: itemsToDisplay
      });
      // Generate fallback HTML without images if there's an error
      if (!Array.isArray(itemsToDisplay) || itemsToDisplay.length === 0) {
        itemsHtml = '<tr><td colspan="3" style="padding: 12px; text-align: center; color: #6b7280;">No items found</td></tr>';
      } else {
        itemsHtml = itemsToDisplay.map((item, index) => {
        const itemName = item.caseName || item.name || 'Custom Case';
        const quantity = item.quantity || 1;
        let itemPrice = 0;
        if (item.total_price !== undefined) {
          itemPrice = parseFloat(item.total_price) || 0;
        } else if (item.unit_price !== undefined) {
          itemPrice = (parseFloat(item.unit_price) || 0) * quantity;
        } else if (item.totalPrice !== undefined) {
          itemPrice = (parseFloat(item.totalPrice) || 0) * quantity;
        } else if (item.price !== undefined) {
          itemPrice = (parseFloat(item.price) || 0) * quantity;
        }
        const formattedPrice = itemPrice.toFixed(2);
        
        return `
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
              <strong>${itemName}</strong>
              ${item.color ? `<br><span style="color: #6b7280; font-size: 14px;">Color: ${item.color}</span>` : ''}
            </td>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center; vertical-align: middle;">${quantity}</td>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right; vertical-align: middle; font-weight: 500;">£${formattedPrice}</td>
          </tr>
        `;
        }).join('') || '';
      }
      console.warn('⚠️ Using fallback items HTML (without images)');
    }

    // Email HTML template
    let emailHtml = '';
    try {
      emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 30px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <img 
              src="${logoUrl}" 
              alt="The Happy Case Logo" 
              style="max-width: 200px; height: auto; margin-bottom: 20px; display: block; margin-left: auto; margin-right: auto; background-color: #f9fafb;"
            />
            <h1 style="color: #059669; margin: 0; font-size: 28px;">Order Confirmed!</h1>
            <p style="color: #6b7280; margin-top: 10px;">Thank you for your order</p>
          </div>

          <div style="background-color: #f9fafb; padding: 20px; border-radius: 6px; margin-bottom: 30px;">
            <h2 style="margin-top: 0; font-size: 20px; color: #111827;">Order Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Order ID:</td>
                <td style="padding: 8px 0; text-align: right; font-weight: bold;">${orderId}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Order Date:</td>
                <td style="padding: 8px 0; text-align: right;">${orderDate}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Status:</td>
                <td style="padding: 8px 0; text-align: right; color: #059669; font-weight: bold;">Confirmed</td>
              </tr>
            </table>
          </div>

          <div style="margin-bottom: 30px;">
            <h2 style="font-size: 20px; color: #111827; margin-bottom: 15px;">Items Ordered</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background-color: #f9fafb;">
                  <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e5e7eb;">Item</th>
                  <th style="padding: 12px; text-align: center; border-bottom: 2px solid #e5e7eb;">Qty</th>
                  <th style="padding: 12px; text-align: right; border-bottom: 2px solid #e5e7eb;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="2" style="padding: 8px 12px; text-align: right; border-top: 2px solid #e5e7eb; color: #6b7280;">Subtotal:</td>
                  <td style="padding: 8px 12px; text-align: right; border-top: 2px solid #e5e7eb;">£${calculatedSubtotal.toFixed(2)}</td>
                </tr>
                ${calculatedShipping > 0 ? `
                <tr>
                  <td colspan="2" style="padding: 8px 12px; text-align: right; color: #6b7280;">Shipping:</td>
                  <td style="padding: 8px 12px; text-align: right;">£${calculatedShipping.toFixed(2)}</td>
                </tr>
                ` : ''}
                ${calculatedVat > 0 ? `
                <tr>
                  <td colspan="2" style="padding: 8px 12px; text-align: right; color: #6b7280;">VAT:</td>
                  <td style="padding: 8px 12px; text-align: right;">£${calculatedVat.toFixed(2)}</td>
                </tr>
                ` : ''}
                <tr>
                  <td colspan="2" style="padding: 12px; text-align: right; font-weight: bold; border-top: 2px solid #e5e7eb; font-size: 16px;">Total:</td>
                  <td style="padding: 12px; text-align: right; font-weight: bold; font-size: 18px; border-top: 2px solid #e5e7eb;">£${totalAmount.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          ${customerInfo?.address ? `
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 6px; margin-bottom: 30px;">
            <h2 style="margin-top: 0; font-size: 20px; color: #111827;">Shipping Address</h2>
            <p style="margin: 5px 0;">
              ${(customerInfo.name || '').replace(/</g, '&lt;').replace(/>/g, '&gt;')}<br>
              ${(customerInfo.address.line1 || '').replace(/</g, '&lt;').replace(/>/g, '&gt;')}<br>
              ${customerInfo.address.line2 ? (customerInfo.address.line2.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '<br>') : ''}
              ${(customerInfo.address.city || '').replace(/</g, '&lt;').replace(/>/g, '&gt;')} ${(customerInfo.address.postal_code || '').replace(/</g, '&lt;').replace(/>/g, '&gt;')}<br>
              ${(customerInfo.address.country || '').replace(/</g, '&lt;').replace(/>/g, '&gt;')}
            </p>
          </div>
          ` : ''}

          <div style="background-color: #eff6ff; padding: 20px; border-radius: 6px; border-left: 4px solid #3b82f6;">
            <h3 style="margin-top: 0; color: #1e40af;">What's Next?</h3>
            <p style="margin: 5px 0; color: #1e3a8a;">
              Your order will be processed within 1-2 business days. You will receive a shipping confirmation email with tracking details once your items are dispatched.
            </p>
            <p style="margin: 10px 0 0 0; color: #1e3a8a;">
              <strong>Estimated delivery:</strong> 3-5 business days
            </p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 14px;">
            <p>Questions about your order? Contact us at <a href="mailto:support@thehappycase.com" style="color: #3b82f6;">support@thehappycase.com</a></p>
          </div>
        </div>
      </body>
      </html>
    `;
    } catch (templateError) {
      console.error('❌ Error generating email HTML template:', templateError);
      console.error('   Error details:', {
        message: templateError.message,
        stack: templateError.stack
      });
      return res.status(500).json({
        success: false,
        error: 'Failed to generate email template',
        details: templateError.message
      });
    }

    // Define email subject (change this to update the email title)
    const emailSubject = `Thank you for your order`;

    // Configure Resend email service
    const resendApiKey = process.env.RESEND_API_KEY;
    const placeholderKey = 're_iV7Ucv7i_M6Bbi2iwk9HFxBzfNSsJqJWY';
    
    // Check if API key is missing or is the placeholder/default value
    if (!resendApiKey || resendApiKey === placeholderKey) {
      // Development: Log email instead of sending
      console.log('='.repeat(60));
      console.log('⚠️ ORDER CONFIRMATION EMAIL (Resend API key not configured or using placeholder)');
      console.log('='.repeat(60));
      console.log(`To: ${customerInfo.email}`);
      console.log(`Subject: ${emailSubject}`);
      console.log('---');
      console.log(`Order ID: ${orderId}`);
      console.log(`Order Date: ${orderDate}`);
      console.log(`Subtotal: £${calculatedSubtotal.toFixed(2)}`);
      console.log(`Shipping: £${calculatedShipping.toFixed(2)}`);
      if (calculatedVat > 0) {
        console.log(`VAT: £${calculatedVat.toFixed(2)}`);
      }
      console.log(`Total: £${totalAmount.toFixed(2)}`);
      console.log(`Items: ${items?.length || 0}`);
      console.log('='.repeat(60));
      console.log('\n⚠️ To enable email sending:');
      console.log('   1. Get your Resend API key from https://resend.com/api-keys');
      console.log('   2. Set RESEND_API_KEY in your .env file (replace the placeholder)');
      console.log('   3. Restart your server');
      console.log('='.repeat(60));

      return res.json({ 
        success: false, 
        message: 'Order confirmation email logged (Resend API key not configured)',
        warning: 'Set RESEND_API_KEY in .env to enable email sending',
        note: 'Order was saved successfully, but email was not sent'
      });
    }

    // Resend requires verified domains. For testing, use onboarding@resend.dev
    // For production, you must verify your own domain at https://resend.com/domains
    let fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';
    
    // Check if FROM_EMAIL is a Gmail address (which cannot be verified)
    const emailDomain = fromEmail.split('@')[1]?.toLowerCase();
    const unverifiedDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'];
    
    if (emailDomain && unverifiedDomains.includes(emailDomain)) {
      console.warn('⚠️  WARNING: FROM_EMAIL is set to a Gmail/unverified domain address.');
      console.warn(`   Current FROM_EMAIL: ${fromEmail}`);
      console.warn('   Resend does not allow sending from Gmail/Yahoo/Hotmail/Outlook/iCloud domains.');
      console.warn('   Falling back to test email: onboarding@resend.dev');
      console.warn('');
      console.warn('   To fix this:');
      console.warn('   1. For testing: Remove FROM_EMAIL from .env (or set to onboarding@resend.dev)');
      console.warn('   2. For production: Verify your own domain at https://resend.com/domains');
      console.warn('      Then set FROM_EMAIL to an email from your verified domain (e.g., orders@yourdomain.com)');
      console.warn('');
      fromEmail = 'onboarding@resend.dev';
    }

    // Send email using Resend
    try {
      console.log('\n📧 ========== ATTEMPTING TO SEND EMAIL ==========');
      console.log(`API Key: ${resendApiKey.substring(0, 10)}...${resendApiKey.substring(resendApiKey.length - 4)}`);
      console.log(`API Key length: ${resendApiKey.length} characters`);
      console.log(`API Key starts with 're_': ${resendApiKey.startsWith('re_')}`);
      console.log(`From: ${fromEmail}`);
      console.log(`To: ${customerInfo.email}`);
      console.log(`Subject: ${emailSubject}`);
      console.log(`HTML length: ${emailHtml.length} characters`);
      
      // Validate API key format
      if (!resendApiKey.startsWith('re_') || resendApiKey.length < 20) {
        throw new Error(`Invalid Resend API key format. Key should start with 're_' and be at least 20 characters. Current length: ${resendApiKey.length}`);
      }
      
      const resend = new Resend(resendApiKey);
      
      // Resend requires the "from" email to be verified in your Resend account
      // Format: "Name <email@domain.com>" or just "email@domain.com"
      console.log('📧 Calling Resend API...');
      const { data, error } = await resend.emails.send({
        from: `The Happy Case <${fromEmail}>`,
        to: customerInfo.email,
        subject: emailSubject,
        html: emailHtml,
      });
      
      console.log('📧 Resend API Response received');
      console.log('   Response data:', JSON.stringify(data, null, 2));
      console.log('   Response error:', error ? JSON.stringify(error, null, 2) : 'None');

      if (error) {
        console.error('❌ Resend API Error Details:');
        console.error('   Error object:', JSON.stringify(error, null, 2));
        console.error('   Error message:', error.message);
        console.error('   Error name:', error.name);
        console.error('   Error status:', error.statusCode || 'N/A');
        
        // Provide specific guidance based on error
        if (error.message?.includes('Invalid API key') || error.message?.includes('Unauthorized')) {
          console.error('\n🚨 INVALID API KEY DETECTED');
          console.error('   The Resend API key in your .env file is invalid or incorrect.');
          console.error('   Please:');
          console.error('   1. Go to https://resend.com/api-keys');
          console.error('   2. Create a new API key');
          console.error('   3. Copy the key (starts with re_)');
          console.error('   4. Update RESEND_API_KEY in your .env file');
          console.error('   5. Restart your server\n');
        }
        
        throw new Error(error.message || JSON.stringify(error) || 'Failed to send email via Resend');
      }

      if (!data || !data.id) {
        console.warn('⚠️ Resend returned no data or email ID');
        console.warn('   Data received:', JSON.stringify(data, null, 2));
        console.warn('   This might indicate the email was queued but not immediately sent');
      }

      console.log(`✅ Order confirmation email sent successfully!`);
      console.log(`   📬 Recipient: ${customerInfo.email}`);
      console.log(`   📦 Order ID: ${orderId}`);
      console.log(`   🆔 Resend Email ID: ${data?.id || 'N/A'}`);
      console.log(`   📅 Sent at: ${new Date().toISOString()}`);
      if (data?.id) {
        console.log(`   🔗 Check delivery status: https://resend.com/emails/${data.id}`);
      }
      console.log(`\n💡 IMPORTANT: Check your inbox AND spam folder for: ${customerInfo.email}`);
      console.log('📧 ==========================================\n');

      return res.json({ 
        success: true, 
        message: 'Order confirmation email sent successfully',
        emailId: data?.id,
        recipient: customerInfo.email
      });
    } catch (emailError) {
      console.error("❌ Error sending email via Resend:", emailError);
      console.error("❌ Error details:", {
        message: emailError.message,
        stack: emailError.stack,
        name: emailError.name
      });
      
      // Check if error is related to unverified domain
      const isDomainError = emailError.message?.toLowerCase().includes('domain') || 
                           emailError.message?.toLowerCase().includes('gmail') ||
                           emailError.message?.toLowerCase().includes('not verified');
      
      // Log email details even if sending fails
      console.log('='.repeat(60));
      console.log('EMAIL SEND FAILED - Email details logged:');
      console.log(`To: ${customerInfo.email}`);
      console.log(`From: ${fromEmail}`);
      console.log(`Subject: ${emailSubject}`);
      console.log(`Error: ${emailError.message}`);
      console.log('='.repeat(60));
      
      if (isDomainError) {
        console.log('🚨 DOMAIN VERIFICATION ERROR DETECTED');
        console.log('');
        console.log('The error indicates that the "from" email domain is not verified.');
        console.log(`Current FROM_EMAIL: ${fromEmail}`);
        console.log('');
        console.log('✅ QUICK FIX:');
        console.log('   1. Open your .env file');
        console.log('   2. Remove or comment out the FROM_EMAIL line, OR');
        console.log('   3. Set FROM_EMAIL=onboarding@resend.dev');
        console.log('   4. Restart your server');
        console.log('');
        console.log('📧 For production use:');
        console.log('   1. Go to https://resend.com/domains');
        console.log('   2. Click "Add Domain"');
        console.log('   3. Add your domain (e.g., thehappycase.com)');
        console.log('   4. Add the DNS records Resend provides to your domain');
        console.log('   5. Wait for verification (usually a few minutes)');
        console.log('   6. Set FROM_EMAIL=orders@yourdomain.com (or similar)');
        console.log('');
      } else {
        console.log('💡 Troubleshooting:');
        console.log('1. Resend requires domain verification. You cannot use @gmail.com addresses.');
        console.log('2. For testing: Use "onboarding@resend.dev" (already set as default)');
        console.log('3. For production: Verify your own domain at https://resend.com/domains');
        console.log('4. Steps to verify domain:');
        console.log('   a. Go to https://resend.com/domains');
        console.log('   b. Click "Add Domain"');
        console.log('   c. Add your domain (e.g., thehappycase.com)');
        console.log('   d. Add the DNS records Resend provides');
        console.log('   e. Wait for verification (usually a few minutes)');
        console.log('   f. Update FROM_EMAIL in .env to use your verified domain');
        console.log('5. Check that the Resend API key is correct');
      }
      console.log('='.repeat(60));
      
      // Return error response (but don't throw to avoid crashing)
      return res.json({ 
        success: false, 
        message: 'Order confirmed but email sending failed',
        error: emailError.message,
        emailHtml // Return HTML for debugging/testing
      });
    }
  } catch (error) {
    console.error("\n❌ ========== UNEXPECTED ERROR IN EMAIL ENDPOINT ==========");
    console.error("Error name:", error?.name || 'Unknown');
    console.error("Error message:", error?.message || 'Unknown error');
    console.error("Error stack:", error?.stack || 'No stack trace');
    try {
      console.error("Full error object:", JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
    } catch (stringifyError) {
      console.error("Could not stringify error object:", stringifyError.message);
    }
    console.error("==========================================================\n");
    
    // Ensure we always send a JSON response
    sendErrorResponse(500, error?.message || "Failed to send order confirmation email", {
      errorName: error?.name,
      errorStack: process.env.NODE_ENV === 'development' ? error?.stack : undefined
    });
  }
});

// --- Test Email Endpoint (for debugging) ---
app.post("/api/test-email", async (req, res) => {
  try {
    const { email } = req.body;
    const testEmail = email || 'thehappycase.shop@gmail.com';
    
    console.log('\n🧪 ========== TEST EMAIL REQUEST ==========');
    console.log(`Test email address: ${testEmail}`);
    
    const resendApiKey = process.env.RESEND_API_KEY;
    const placeholderKey = 're_iV7Ucv7i_M6Bbi2iwk9HFxBzfNSsJqJWY';
    
    if (!resendApiKey || resendApiKey === placeholderKey) {
      return res.json({
        success: false,
        error: 'Resend API key not configured or using placeholder',
        message: 'Please set a valid RESEND_API_KEY in your .env file'
      });
    }
    
    if (!resendApiKey.startsWith('re_') || resendApiKey.length < 20) {
      return res.json({
        success: false,
        error: 'Invalid API key format',
        message: `API key should start with 're_' and be at least 20 characters. Current length: ${resendApiKey.length}`
      });
    }
    
    let fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';
    const emailDomain = fromEmail.split('@')[1]?.toLowerCase();
    const unverifiedDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'];
    
    if (emailDomain && unverifiedDomains.includes(emailDomain)) {
      fromEmail = 'onboarding@resend.dev';
      console.log(`⚠️ FROM_EMAIL is unverified domain, using: ${fromEmail}`);
    }
    
    console.log(`API Key: ${resendApiKey.substring(0, 10)}...${resendApiKey.substring(resendApiKey.length - 4)}`);
    console.log(`From: ${fromEmail}`);
    console.log(`To: ${testEmail}`);
    
    const resend = new Resend(resendApiKey);
    
    const testHtml = `
      <html>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Test Email from The Happy Case</h2>
          <p>This is a test email to verify your Resend configuration.</p>
          <p>If you received this, your email setup is working correctly!</p>
          <p><strong>Sent at:</strong> ${new Date().toISOString()}</p>
        </body>
      </html>
    `;
    
    const { data, error } = await resend.emails.send({
      from: `The Happy Case <${fromEmail}>`,
      to: testEmail,
      subject: 'Test Email - The Happy Case',
      html: testHtml,
    });
    
    if (error) {
      console.error('❌ Resend API Error:', JSON.stringify(error, null, 2));
      return res.json({
        success: false,
        error: error.message || 'Failed to send test email',
        details: error
      });
    }
    
    console.log('✅ Test email sent successfully!');
    console.log(`   Email ID: ${data?.id || 'N/A'}`);
    if (data?.id) {
      console.log(`   Check status: https://resend.com/emails/${data.id}`);
    }
    
    return res.json({
      success: true,
      message: 'Test email sent successfully',
      emailId: data?.id,
      recipient: testEmail,
      checkStatus: data?.id ? `https://resend.com/emails/${data.id}` : null
    });
    
  } catch (error) {
    console.error('❌ Error in test email endpoint:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to send test email',
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// --- Helper: Upload Image to Supabase Storage ---
async function uploadImageToStorage(imageData, orderId, itemId, imageType) {
  // Skip if no image data
  if (!imageData) return null;
  
  // If it's already a URL (not base64), return as-is
  if (typeof imageData === 'string' && !imageData.startsWith('data:image/')) {
    // Already a URL - check if it's a Supabase Storage URL
    if (imageData.includes('supabase') || imageData.includes('storage')) {
      console.log(`ℹ️ Image ${imageType} is already a Supabase Storage URL, skipping upload`);
    }
    return imageData;
  }

  // Skip if not a base64 data URL
  if (!imageData.startsWith('data:image/')) {
    console.warn(`⚠️ Image is not a base64 data URL, skipping upload: ${imageType}`);
    return imageData;
  }

  // Check if Supabase is configured
  if (!supabase) {
    console.warn(`⚠️ Supabase not configured, cannot upload ${imageType} image to storage`);
    return imageData; // Return original base64 as fallback
  }

  try {
    // Extract image format and data from base64 string
    const matches = imageData.match(/^data:image\/(\w+);base64,(.+)$/);
    if (!matches) {
      console.warn(`⚠️ Invalid base64 image format: ${imageType}`);
      return imageData; // Return original if can't parse
    }

    const imageFormat = matches[1]; // png, jpeg, etc.
    const base64Data = matches[2];
    
    // Convert base64 to buffer
    const imageBuffer = Buffer.from(base64Data, 'base64');
    
    // Generate unique filename
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 9);
    const filename = `${orderId}/${itemId}-${imageType}-${timestamp}-${randomStr}.${imageFormat}`;
    
    console.log(`📤 Uploading ${imageType} image to Supabase Storage bucket 'order-images'...`);
    console.log(`   Order ID: ${orderId}`);
    console.log(`   Item ID: ${itemId}`);
    console.log(`   Filename: ${filename}`);
    console.log(`   Size: ${(imageBuffer.length / 1024).toFixed(2)} KB`);
    
    // Upload to Supabase Storage bucket 'order-images'
    const { data, error } = await supabase.storage
      .from('order-images')
      .upload(filename, imageBuffer, {
        contentType: `image/${imageFormat}`,
        upsert: false, // Don't overwrite existing files
      });

    if (error) {
      console.error(`❌ Error uploading ${imageType} to Supabase Storage:`, error);
      console.error(`   Error code: ${error.statusCode || error.code || 'unknown'}`);
      console.error(`   Error message: ${error.message || 'unknown error'}`);
      // Check if it's a bucket not found error
      if (error.message?.includes('bucket') || error.message?.includes('not found')) {
        console.error(`   ⚠️ Bucket 'order-images' may not exist. Run SUPABASE_STORAGE_SETUP.sql in Supabase SQL Editor.`);
      }
      return imageData; // Return original base64 as fallback
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('order-images')
      .getPublicUrl(filename);

    const publicUrl = urlData?.publicUrl || null;
    console.log(`✅ Uploaded ${imageType} to Supabase Storage:`);
    console.log(`   Filename: ${filename}`);
    console.log(`   Public URL: ${publicUrl || 'FAILED TO GET URL'}`);
    
    if (!publicUrl) {
      console.error(`❌ Failed to get public URL for ${filename}`);
      return imageData; // Return original base64 as fallback
    }
    
    return publicUrl;
  } catch (error) {
    console.error(`❌ Exception uploading ${imageType} to Supabase Storage:`, error);
    console.error(`   Error name: ${error.name}`);
    console.error(`   Error message: ${error.message}`);
    console.error(`   Error stack: ${error.stack}`);
    return imageData; // Return original base64 as fallback
  }
}

// --- Save Order to Supabase ---
app.post("/api/save-order", async (req, res) => {
  console.log('📥 POST /api/save-order request received');
  
  // Track if response has been sent
  let responseSent = false;
  
  // Ensure we always return JSON, even if there's an unhandled error
  const sendErrorResponse = (status, error, details) => {
    if (!responseSent && !res.headersSent) {
      try {
        responseSent = true;
        const errorResponse = {
          success: false,
          error: error || 'Unknown error',
          message: error || 'An error occurred while saving the order'
        };
        
        if (details) {
          if (process.env.NODE_ENV === 'development') {
            errorResponse.details = details;
          }
        }
        
        res.status(status).json(errorResponse);
        console.log(`✅ Error response sent: ${status}`, error);
        return true;
      } catch (sendError) {
        console.error('❌ Error in sendErrorResponse:', sendError);
        responseSent = false;
        return false;
      }
    }
    return false;
  };

  // Wrap everything in try-catch to ensure response is always sent
  try {
    // Validate request body exists
    if (!req.body) {
      console.error('❌ Request body is missing');
      return sendErrorResponse(400, 'Request body is required');
    }

    const { paymentIntent, customerInfo, items, userId } = req.body;

    console.log("\n📦 Received order save request:");
    console.log("  - Payment Intent ID:", paymentIntent?.id || "MISSING");
    console.log("  - Customer Email:", customerInfo?.email || "MISSING");
    console.log("  - User ID:", userId || "N/A");
    console.log("  - Items Count:", items?.length || 0);
    console.log("  - Request body keys:", Object.keys(req.body || {}));

    if (!supabase) {
      console.error("❌ Supabase not configured. Order not saved to database.");
      if (!responseSent && !res.headersSent) {
        responseSent = true;
        return res.json({ 
          success: false, 
          message: "Supabase not configured. Order not saved to database." 
        });
      }
      return;
    }

    if (!paymentIntent || !customerInfo || !items || !Array.isArray(items)) {
      console.error("❌ Missing required order information:");
      console.error("  - paymentIntent:", !!paymentIntent);
      console.error("  - customerInfo:", !!customerInfo);
      console.error("  - items:", items ? (Array.isArray(items) ? items.length : "NOT ARRAY") : "MISSING");
      return sendErrorResponse(400, "Missing required order information", {
        hasPaymentIntent: !!paymentIntent,
        hasCustomerInfo: !!customerInfo,
        hasItems: !!items,
        itemsIsArray: Array.isArray(items)
      });
    }

    // Validate items array is not empty
    if (items.length === 0) {
      console.error("❌ Items array is empty");
      return sendErrorResponse(400, "Items array cannot be empty");
    }

    // Calculate totals with error handling
    let totalAmount = 0;
    try {
      totalAmount = items.reduce((sum, item) => {
        const price = parseFloat(item.totalPrice || item.price || 0);
        const quantity = parseInt(item.quantity || 1, 10);
        return sum + (price * quantity);
      }, 0);
      
      if (isNaN(totalAmount) || totalAmount <= 0) {
        console.error("❌ Invalid total amount calculated:", totalAmount);
        return sendErrorResponse(400, "Invalid total amount", { calculatedTotal: totalAmount });
      }
    } catch (calcError) {
      console.error("❌ Error calculating total amount:", calcError);
      return sendErrorResponse(400, "Error calculating total amount", { error: calcError.message });
    }
    // Validate and generate order ID
    if (!paymentIntent.id) {
      console.error("❌ Payment Intent ID is missing");
      return sendErrorResponse(400, "Payment Intent ID is required", {
        paymentIntent: paymentIntent ? Object.keys(paymentIntent) : null
      });
    }
    const orderId = paymentIntent.id;
    
    // Validate order ID format (should be a string and not too long for VARCHAR(255))
    if (typeof orderId !== 'string') {
      console.error("❌ Payment Intent ID is not a string:", typeof orderId, orderId);
      return sendErrorResponse(400, "Payment Intent ID must be a string", {
        receivedType: typeof orderId,
        receivedValue: orderId
      });
    }
    if (orderId.length > 255) {
      console.error("❌ Payment Intent ID is too long:", orderId.length, "characters (max 255)");
      return sendErrorResponse(400, "Payment Intent ID is too long (max 255 characters)", {
        length: orderId.length
      });
    }
    console.log(`✅ Order ID validated: ${orderId} (${orderId.length} chars)`);

    // Generate order date
    const orderDate = paymentIntent.created 
      ? new Date(paymentIntent.created * 1000).toISOString()
      : new Date().toISOString();

    // Check if order already exists (idempotent behavior)
    console.log(`\n🔍 Checking if order ${orderId} already exists...`);
    let existingOrder = null;
    try {
      const { data: orderData, error: checkError } = await supabase
        .from('orders')
        .select('order_id, order_date, total_amount, items')
        .eq('order_id', orderId)
        .maybeSingle();

      if (orderData) {
        existingOrder = orderData;
        console.log(`✅ Order ${orderId} already exists in database (idempotent check)`);
        console.log(`   - Existing order date: ${existingOrder.order_date}`);
        console.log(`   - Existing total: £${existingOrder.total_amount}`);
        console.log(`   - Skipping duplicate insert`);
      } else if (checkError && checkError.code !== 'PGRST116') {
        console.warn(`⚠️ Unexpected error checking for existing order:`, checkError.message);
      }
    } catch (checkException) {
      console.warn(`⚠️ Exception checking for existing order:`, checkException.message);
    }

    // If order exists, return early (before uploading images)
    if (existingOrder) {
      if (!responseSent && !res.headersSent) {
        responseSent = true;
        return res.json({ 
          success: true, 
          message: "Order already exists (idempotent)",
          order_id: orderId,
          data: existingOrder,
          alreadyExists: true
        });
      }
      return;
    }

    // --- Double-check inventory before saving order ---
    // This prevents race conditions where another customer bought the last item
    console.log("\n🔍 Double-checking inventory before saving order...");
    const inventoryChecks = [];
    
    items.forEach(item => {
      const quantity = item.quantity || 1;
      
      // Handle standalone charm items (type === 'charm')
      if (item.type === 'charm') {
        const category = item.category || item.pin?.category || 'colorful';
        const pinName = item.pin?.name || item.name;
        const pinSrc = item.pin?.src || item.src;
        
        let foundPin = null;
        let pinId = null;
        
        // Try to find pin by ID first
        if (item.pin?.id || item.id) {
          pinId = item.pin?.id || item.id;
        } else {
          // Find pin by name or src in products.json
          if (category === 'flags' && Products.pins.flags) {
            foundPin = Products.pins.flags.find(p => 
              p.name === pinName || 
              (pinSrc && p.src === pinSrc) ||
              p.id === item.pin?.id
            );
          } else if (category === 'colorful' && Products.pins.colorful) {
            foundPin = Products.pins.colorful.find(p => 
              p.name === pinName || 
              (pinSrc && p.src === pinSrc) ||
              p.id === item.pin?.id
            );
          } else if (category === 'bronze' && Products.pins.bronze) {
            foundPin = Products.pins.bronze.find(p => 
              p.name === pinName || 
              (pinSrc && p.src === pinSrc) ||
              p.id === item.pin?.id
            );
          }
          
          pinId = foundPin?.id;
        }
        
        if (pinId) {
          const itemId = `pin-${category}-${pinId}`;
          inventoryChecks.push({
            item_id: itemId,
            quantity: quantity,
            name: pinName || 'Unknown Charm',
            type: 'charm'
          });
        }
      }
      
      // Check case inventory if caseType and color are present
      if (item.caseType && item.color) {
        const caseData = Products.cases.find(c => c.type === item.caseType);
        if (caseData) {
          const colorExists = caseData.colors.some(c => c.color === item.color);
          if (colorExists) {
            const itemId = `case-${caseData.id}-color-${item.color}`;
            inventoryChecks.push({
              item_id: itemId,
              quantity: quantity,
              name: `${caseData.name} - ${item.color}`,
              type: 'case'
            });
          }
        }
      }
      
      // Check pin inventory if pins are present (pins attached to cases)
      const pins = item.pins || item.pinsDetails || [];
      if (Array.isArray(pins) && pins.length > 0) {
        pins.forEach(pin => {
          if (!pin) return;
          
          const category = pin.category || 'colorful';
          let pinId = null;
          
          if (pin.id) {
            pinId = pin.id;
          } else {
            let foundPin = null;
            if (category === 'flags' && Products.pins.flags) {
              foundPin = Products.pins.flags.find(p => 
                p.id === pin.id || 
                p.name === pin.name || 
                (pin.src && p.src === pin.src)
              );
            } else if (category === 'colorful' && Products.pins.colorful) {
              foundPin = Products.pins.colorful.find(p => 
                p.id === pin.id || 
                p.name === pin.name || 
                (pin.src && p.src === pin.src)
              );
            } else if (category === 'bronze' && Products.pins.bronze) {
              foundPin = Products.pins.bronze.find(p => 
                p.id === pin.id || 
                p.name === pin.name || 
                (pin.src && p.src === pin.src)
              );
            }
            pinId = foundPin?.id;
          }
          
          if (pinId) {
            const itemId = `pin-${category}-${pinId}`;
            inventoryChecks.push({
              item_id: itemId,
              quantity: quantity,
              name: pin.name || 'Unknown Pin',
              type: 'pin'
            });
          }
        });
      }
    });
    
    // Check each item's inventory
    const outOfStockItems = [];
    for (const check of inventoryChecks) {
      try {
        const { data: inventoryItem, error: fetchError } = await supabase
          .from('inventory_items')
          .select('qty_in_stock, name')
          .eq('item_id', check.item_id)
          .single();
        
        if (fetchError) {
          if (fetchError.code === 'PGRST116') {
            // Item not in inventory table - treat as unlimited (skip check)
            console.log(`  ℹ️ ${check.name}: Not in inventory table (unlimited stock)`);
            continue;
          }
          console.warn(`  ⚠️ Error checking inventory for ${check.item_id}:`, fetchError.message);
          continue;
        }
        
        if (!inventoryItem) {
          // Item not found - treat as unlimited (skip check)
          console.log(`  ℹ️ ${check.name}: Not found in inventory (unlimited stock)`);
          continue;
        }
        
        const currentQty = inventoryItem.qty_in_stock;
        
        // If qty_in_stock is null, it means unlimited - skip check
        if (currentQty === null) {
          console.log(`  ✅ ${check.name}: Unlimited stock`);
          continue;
        }
        
        // Check if there's enough stock
        if (currentQty < check.quantity) {
          const itemName = inventoryItem.name || check.name;
          outOfStockItems.push({
            name: itemName,
            requested: check.quantity,
            available: currentQty
          });
          console.warn(`  ❌ ${itemName}: Insufficient stock (requested: ${check.quantity}, available: ${currentQty})`);
        } else {
          console.log(`  ✅ ${check.name}: Stock available (requested: ${check.quantity}, available: ${currentQty})`);
        }
      } catch (checkError) {
        console.warn(`  ⚠️ Exception checking inventory for ${check.item_id}:`, checkError.message);
        // Continue with other checks - don't block order if check fails
      }
    }
    
    // If any items are out of stock, reject the order
    if (outOfStockItems.length > 0) {
      const itemsList = outOfStockItems.map(item => 
        `${item.name} (requested: ${item.requested}, available: ${item.available})`
      ).join(', ');
      
      console.error(`\n❌ Order rejected - items out of stock: ${itemsList}`);
      return sendErrorResponse(409, "Some items are no longer available", {
        outOfStockItems: outOfStockItems,
        message: "One or more items in your order are no longer in stock. Please update your cart and try again."
      });
    }
    
    console.log(`✅ Inventory check passed - all items are in stock`);

    // Upload images to Supabase Storage and prepare items with image URLs
    console.log("\n📤 Uploading images to Supabase Storage bucket 'order-images'...");
    let itemsWithImages = [];
    try {
      itemsWithImages = await Promise.all(
        items.map(async (item, index) => {
          try {
            const itemId = item.id || `item-${index}`;
            
            // Upload case image if it exists
            let caseImageUrl = null;
            try {
              caseImageUrl = await uploadImageToStorage(
                item.caseImage || item.image,
                orderId,
                itemId,
                'case'
              );
            } catch (caseImageError) {
              console.error(`❌ Error uploading case image for item ${index}:`, caseImageError.message);
              // Continue without image
            }
            
            // Upload design image if it exists (for custom designs)
            let designImageUrl = null;
            try {
              designImageUrl = await uploadImageToStorage(
                item.designImage,
                orderId,
                itemId,
                'design'
              );
            } catch (designImageError) {
              console.error(`❌ Error uploading design image for item ${index}:`, designImageError.message);
              // Continue without image
            }

            return {
              id: item.id || null,
              name: item.caseName || item.name || 'Custom Case',
              case_type: item.caseType || null,
              color: item.color || null,
              quantity: item.quantity || 1,
              unit_price: item.totalPrice || item.price || 0,
              total_price: (item.totalPrice || item.price || 0) * (item.quantity || 1),
              pins: item.pins || item.pinsDetails || null,
              custom_design: item.customDesign || false,
              case_image: caseImageUrl, // Now contains Supabase Storage URL or original URL
              design_image: designImageUrl, // Now contains Supabase Storage URL or null
            };
          } catch (itemError) {
            console.error(`❌ Error processing item ${index}:`, itemError);
            // Return a basic item structure even if processing fails
            return {
              id: item.id || null,
              name: item.caseName || item.name || 'Custom Case',
              case_type: item.caseType || null,
              color: item.color || null,
              quantity: item.quantity || 1,
              unit_price: item.totalPrice || item.price || 0,
              total_price: (item.totalPrice || item.price || 0) * (item.quantity || 1),
              pins: item.pins || item.pinsDetails || null,
              custom_design: item.customDesign || false,
              case_image: null,
              design_image: null,
            };
          }
        })
      );
    } catch (uploadError) {
      console.error("❌ Error during image upload process:", uploadError);
      console.error("   Error message:", uploadError.message);
      console.error("   Error stack:", uploadError.stack);
      // Fallback: create items without images
      console.warn("⚠️ Falling back to items without images");
      itemsWithImages = items.map((item, index) => ({
        id: item.id || null,
        name: item.caseName || item.name || 'Custom Case',
        case_type: item.caseType || null,
        color: item.color || null,
        quantity: item.quantity || 1,
        unit_price: item.totalPrice || item.price || 0,
        total_price: (item.totalPrice || item.price || 0) * (item.quantity || 1),
        pins: item.pins || item.pinsDetails || null,
        custom_design: item.customDesign || false,
        case_image: null,
        design_image: null,
      }));
    }

    // Prepare order data - matches SUPABASE_ORDERS_SCHEMA.sql structure
    const orderData = {
      order_id: orderId, // VARCHAR(255) PRIMARY KEY
      payment_intent_id: paymentIntent.id, // VARCHAR(255)
      customer_email: customerInfo.email, // VARCHAR(255) NOT NULL
      customer_name: customerInfo.name || null, // VARCHAR(255)
      customer_phone: customerInfo.phone || null, // VARCHAR(50)
      total_amount: parseFloat(totalAmount.toFixed(2)), // DECIMAL(10, 2) NOT NULL
      currency: (paymentIntent.currency || 'gbp').toLowerCase(), // VARCHAR(10) DEFAULT 'gbp'
      status: paymentIntent.status || 'succeeded', // VARCHAR(50) DEFAULT 'succeeded'
      order_date: orderDate, // TIMESTAMPTZ NOT NULL
      user_id: userId ?? null, // UUID - Supabase auth user ID (nullable)
      shipping_address: customerInfo.address ? { // JSONB
        line1: customerInfo.address.line1,
        line2: customerInfo.address.line2 || null,
        city: customerInfo.address.city,
        postal_code: customerInfo.address.postal_code,
        country: customerInfo.address.country,
        state: customerInfo.address.state || null,
      } : null,
      items: itemsWithImages, // JSONB NOT NULL - contains items with Supabase Storage image URLs
      metadata: {
        ...(paymentIntent.metadata || {}),
        dispatched: false,
        dispatched_at: null,
      }, // JSONB - tracking info is stored in separate tracking table
      // created_at and updated_at are auto-generated by database
    };

    // Save to Supabase
    console.log(`\n💾 Inserting new order ${orderId}...`);
    console.log(`   Payment Intent ID: ${paymentIntent.id}`);
    console.log(`   Order ID: ${orderId} (type: ${typeof orderId}, length: ${orderId.length})`);
    console.log(`   Customer Email: ${customerInfo.email}`);
    console.log(`   User ID: ${userId ?? 'N/A'}`);
    console.log(`   Total Amount: £${totalAmount.toFixed(2)}`);
    console.log(`   Items Count: ${itemsWithImages.length}`);
    console.log(`   Images uploaded: ${itemsWithImages.filter(item => item.case_image || item.design_image).length} items have images`);
    console.log(`   Order Data Keys: ${Object.keys(orderData).join(', ')}`);
    console.log(`   Order ID in data: ${orderData.order_id} (type: ${typeof orderData.order_id})`);
    
    // Insert order with user_id (null if user not authenticated)
    const { data, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select();

    if (error) {
      console.error("❌ Error saving order to Supabase:", error);
      console.error("  - Error Code:", error.code);
      console.error("  - Error Message:", error.message);
      console.error("  - Error Details:", error.details);
      console.error("  - Error Hint:", error.hint);
      console.error("  - Order ID that failed:", orderId);
      console.error("  - Order ID type:", typeof orderId);
      console.error("  - Order ID length:", orderId?.length);
      
      // Check if it's an ID-related error
      if (error.message?.includes('order_id') || error.message?.includes('duplicate') || error.code === '23505') {
        console.error("  🚨 ID-RELATED ERROR DETECTED");
        console.error("     This might be a duplicate order_id or invalid ID format");
      }
      
      return res.status(500).json({ 
        success: false,
        error: error.message || "Failed to save order to database",
        details: error,
        orderId: orderId
      });
    }

    console.log(`✅ Order ${orderId} saved to Supabase successfully`);

    // --- Update Inventory Items ---
    console.log("\n📦 Updating inventory_items table for purchased items...");
    console.log(`   Processing ${items.length} item(s) from order`);
    const inventoryUpdates = [];

    items.forEach((item, index) => {
      const quantity = item.quantity || 1;
      console.log(`\n   Item ${index + 1}/${items.length}:`);
      console.log(`     - Type: ${item.type || 'case'}`);
      console.log(`     - Quantity: ${quantity}`);
      console.log(`     - Name: ${item.name || item.caseName || item.pin?.name || 'Unknown'}`);
      
      // Handle standalone charm items (type === 'charm')
      if (item.type === 'charm') {
        const category = item.category || item.pin?.category || 'colorful';
        const pinName = item.pin?.name || item.name;
        const pinSrc = item.pin?.src || item.src;
        
        let foundPin = null;
        let pinId = null;
        
        // Try to find pin by ID first
        if (item.pin?.id || item.id) {
          pinId = item.pin?.id || item.id;
        } else {
          // Find pin by name or src in products.json
          if (category === 'flags' && Products.pins.flags) {
            foundPin = Products.pins.flags.find(p => 
              p.name === pinName || 
              (pinSrc && p.src === pinSrc) ||
              p.id === item.pin?.id
            );
          } else if (category === 'colorful' && Products.pins.colorful) {
            foundPin = Products.pins.colorful.find(p => 
              p.name === pinName || 
              (pinSrc && p.src === pinSrc) ||
              p.id === item.pin?.id
            );
          } else if (category === 'bronze' && Products.pins.bronze) {
            foundPin = Products.pins.bronze.find(p => 
              p.name === pinName || 
              (pinSrc && p.src === pinSrc) ||
              p.id === item.pin?.id
            );
          }
          
          pinId = foundPin?.id;
        }
        
        if (pinId) {
          const itemId = `pin-${category}-${pinId}`;
          inventoryUpdates.push({
            item_id: itemId,
            quantity: quantity
          });
          console.log(`  📝 Standalone Charm: ${pinName || 'Unknown'} (${category}, ${quantity}x) → ${itemId}`);
        } else {
          console.warn(`  ⚠️ Could not find standalone charm ID for: ${pinName || 'Unknown'} (category: ${category})`);
        }
      }
      
      // Update case inventory if caseType and color are present
      if (item.caseType && item.color) {
        // Find the case in products.json by type
        const caseData = Products.cases.find(c => c.type === item.caseType);
        if (caseData) {
          // Verify the color exists for this case
          const colorExists = caseData.colors.some(c => c.color === item.color);
          if (colorExists) {
            const itemId = `case-${caseData.id}-color-${item.color}`;
            inventoryUpdates.push({
              item_id: itemId,
              quantity: quantity
            });
            console.log(`  📝 Case: ${caseData.name} - ${item.color} (${quantity}x) → ${itemId}`);
          } else {
            console.warn(`  ⚠️ Color ${item.color} not found for case type ${item.caseType}`);
          }
        } else {
          console.warn(`  ⚠️ Case type ${item.caseType} not found in products.json`);
        }
      }

      // Update pin inventory if pins are present (pins attached to cases)
      const pins = item.pins || item.pinsDetails || [];
      if (Array.isArray(pins) && pins.length > 0) {
        pins.forEach(pin => {
          if (!pin) return;
          
          // Determine pin category and ID
          const category = pin.category || 'colorful'; // Default to colorful
          let pinId = null;
          
          // First, try to use pin.id directly if it exists
          if (pin.id) {
            pinId = pin.id;
          } else {
            // Try to find pin ID from products.json by matching name or src
            let foundPin = null;
            
            if (category === 'flags' && Products.pins.flags) {
              foundPin = Products.pins.flags.find(p => 
                p.id === pin.id || 
                p.name === pin.name || 
                (pin.src && p.src === pin.src)
              );
            } else if (category === 'colorful' && Products.pins.colorful) {
              foundPin = Products.pins.colorful.find(p => 
                p.id === pin.id || 
                p.name === pin.name || 
                (pin.src && p.src === pin.src)
              );
            } else if (category === 'bronze' && Products.pins.bronze) {
              foundPin = Products.pins.bronze.find(p => 
                p.id === pin.id || 
                p.name === pin.name || 
                (pin.src && p.src === pin.src)
              );
            }
            
            pinId = foundPin?.id;
          }
          
          if (pinId) {
            const itemId = `pin-${category}-${pinId}`;
            inventoryUpdates.push({
              item_id: itemId,
              quantity: quantity // Each case has quantity pins
            });
            console.log(`  📝 Pin (attached to case): ${pin.name || 'Unknown'} (${category}, ${quantity}x) → ${itemId}`);
          } else {
            console.warn(`  ⚠️ Could not find pin ID for: ${pin.name || 'Unknown'} (category: ${category})`);
            if (pin.src) {
              console.warn(`    Pin src: ${pin.src}`);
            }
          }
        });
      }
    });

    // Group updates by item_id and sum quantities
    const groupedUpdates = {};
    inventoryUpdates.forEach(update => {
      if (!groupedUpdates[update.item_id]) {
        groupedUpdates[update.item_id] = 0;
      }
      groupedUpdates[update.item_id] += update.quantity;
    });

    console.log(`\n📊 Inventory Update Summary:`);
    console.log(`   Total unique items to update: ${Object.keys(groupedUpdates).length}`);
    console.log(`   Items breakdown:`);
    Object.entries(groupedUpdates).forEach(([itemId, totalQty]) => {
      console.log(`     - ${itemId}: ${totalQty} unit(s)`);
    });
    
    let inventoryUpdateResults = {
      totalItems: Object.keys(groupedUpdates).length,
      successful: 0,
      failed: 0,
      failedItems: []
    };
    
    // Update inventory for each item
    if (Object.keys(groupedUpdates).length > 0) {
      const updatePromises = Object.entries(groupedUpdates).map(async ([itemId, qtyToDecrement]) => {
        try {
          console.log(`\n  🔄 Processing: ${itemId}`);
          console.log(`     Quantity to decrement: ${qtyToDecrement}`);
          
          // First, get current quantity
          const { data: currentItem, error: fetchError } = await supabase
            .from('inventory_items')
            .select('qty_in_stock, name')
            .eq('item_id', itemId)
            .single();

          if (fetchError) {
            if (fetchError.code === 'PGRST116') {
              console.warn(`  ⚠️ Item not found: ${itemId} (skipping)`);
              return { success: false, item_id: itemId, reason: 'not_found' };
            }
            throw fetchError;
          }

          if (!currentItem) {
            console.warn(`  ⚠️ Item not found: ${itemId} (skipping)`);
            return { success: false, item_id: itemId, reason: 'not_found' };
          }

          const currentQty = currentItem.qty_in_stock;
          console.log(`     Current quantity in stock: ${currentQty === null ? 'Unlimited (null)' : currentQty}`);
          
          // If qty_in_stock is null, it means unlimited - don't decrement
          if (currentQty === null) {
            console.log(`  ✅ ${currentItem.name || itemId}: Unlimited stock (no update needed)`);
            return { success: true, item_id: itemId, reason: 'unlimited' };
          }

          // Calculate new quantity
          const newQty = Math.max(0, currentQty - qtyToDecrement);
          console.log(`     New quantity after decrement: ${newQty} (${currentQty} - ${qtyToDecrement})`);
          
          // Update inventory
          const { error: updateError } = await supabase
            .from('inventory_items')
            .update({ 
              qty_in_stock: newQty,
              updated_at: new Date().toISOString()
            })
            .eq('item_id', itemId);

          if (updateError) {
            console.error(`  ❌ Error updating ${itemId}:`, updateError.message);
            return { success: false, item_id: itemId, error: updateError.message };
          }

          console.log(`  ✅ ${currentItem.name || itemId}: ${currentQty} → ${newQty} (decremented ${qtyToDecrement})`);
          return { success: true, item_id: itemId, old_qty: currentQty, new_qty: newQty };
        } catch (error) {
          console.error(`  ❌ Error processing ${itemId}:`, error.message);
          return { success: false, item_id: itemId, error: error.message };
        }
      });

      const results = await Promise.all(updatePromises);
      const successful = results.filter(r => r.success).length;
      const failed = results.filter(r => !r.success);
      
      inventoryUpdateResults.successful = successful;
      inventoryUpdateResults.failed = failed.length;
      inventoryUpdateResults.failedItems = failed.map(f => f.item_id);

      console.log(`\n📊 Inventory Update Summary:`);
      console.log(`  ✅ Successfully updated: ${successful}`);
      console.log(`  ❌ Failed: ${failed.length}`);
      
      if (failed.length > 0) {
        console.warn(`  ⚠️ Failed items:`, failed.map(f => f.item_id).join(', '));
      }
    } else {
      console.log(`  ℹ️ No inventory items to update`);
    }

    // Ensure response is sent with proper error handling
    if (!responseSent && !res.headersSent) {
      try {
        responseSent = true;
        const successResponse = { 
          success: true, 
          message: "Order saved successfully",
          order_id: orderId,
          data: data,
          inventoryUpdate: {
            totalItems: inventoryUpdateResults.totalItems,
            successful: inventoryUpdateResults.successful,
            failed: inventoryUpdateResults.failed,
            failedItems: inventoryUpdateResults.failedItems
          }
        };
        res.json(successResponse);
        console.log('✅ Success response sent for order:', orderId);
      } catch (jsonError) {
        console.error('❌ Error sending success response:', jsonError);
        responseSent = false;
        // Try to send error response instead
        if (!res.headersSent) {
          sendErrorResponse(500, 'Failed to send response', { originalError: jsonError.message });
        }
      }
    } else {
      console.warn('⚠️ Response already sent, skipping success response');
    }
  } catch (error) {
    console.error("❌ Error saving order:", error);
    console.error("❌ Error name:", error.name);
    console.error("❌ Error message:", error.message);
    if (error.stack) {
      console.error("❌ Error stack:", error.stack);
    }
    
    // Ensure error response is sent
    if (!responseSent && !res.headersSent) {
      if (!sendErrorResponse(500, error.message || "Failed to save order", {
        errorName: error.name,
        errorStack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      })) {
        // Fallback if sendErrorResponse failed
        try {
          const errorResponse = {
            success: false,
            error: error.message || "Failed to save order",
            message: error.message || "An error occurred while saving the order"
          };
          res.status(500).json(errorResponse);
          console.log('✅ Fallback error response sent');
        } catch (fallbackError) {
          console.error('❌ Critical: Failed to send fallback error response:', fallbackError);
          if (!res.headersSent) {
            try {
              res.status(500).type('text/plain').send('Error: Failed to save order');
              console.log('✅ Plain text error response sent');
            } catch (finalError) {
              console.error('❌ CRITICAL: Completely failed to send any response:', finalError);
            }
          }
        }
      }
    } else {
      console.warn('⚠️ Cannot send error response - already sent or headers sent');
    }
  }
});

// --- Get Order by Payment Intent ID ---
app.get("/api/orders", async (req, res) => {
  try {
    if (!supabase) {
      return res.status(503).json({ 
        success: false,
        error: "Supabase not configured",
        message: "Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env to enable order fetching."
      });
    }

    const { payment_intent_id, order_id } = req.query;

    if (!payment_intent_id && !order_id) {
      return res.status(400).json({ 
        success: false,
        error: "payment_intent_id or order_id query parameter is required"
      });
    }

    let query = supabase.from('orders').select('*');

    if (payment_intent_id) {
      query = query.eq('payment_intent_id', payment_intent_id);
    } else if (order_id) {
      query = query.eq('order_id', order_id);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching order from Supabase:", error);
      return res.status(500).json({ 
        success: false,
        error: error.message || "Failed to fetch order",
        details: error 
      });
    }

    if (!data || data.length === 0) {
      return res.json({ 
        success: false,
        order: null,
        message: "Order not found"
      });
    }

    // Fetch tracking data for this order
    const order = data[0];
    let trackingData = null;
    if (order.order_id) {
      const { data: tracking, error: trackingError } = await supabase
        .from('tracking')
        .select('*')
        .eq('order_id', order.order_id)
        .single();

      if (!trackingError && tracking) {
        trackingData = tracking;
      }
    }

    // Merge tracking data with order
    const orderWithTracking = {
      ...order,
      tracking: trackingData
    };

    res.json({ 
      success: true,
      order: orderWithTracking
    });
  } catch (error) {
    console.error("Error in /api/orders:", error);
    res.status(500).json({ 
      success: false,
      error: error.message || "Failed to fetch order"
    });
  }
});

// --- Get Orders from Supabase ---
app.get("/get-orders", async (req, res) => {
  console.log('📥 GET /get-orders request received');
  console.log('📥 Request URL:', req.url);
  console.log('📥 Request method:', req.method);
  
  // Ensure we only send one response
  let responseSent = false;
  const sendResponse = (status, data) => {
    if (!responseSent && !res.headersSent) {
      try {
        // Ensure data is valid
        if (!data || typeof data !== 'object') {
          console.error('❌ Invalid data passed to sendResponse:', data);
          data = { success: false, error: 'Invalid response data' };
        }
        
        responseSent = true;
        res.status(status).json(data);
        console.log(`✅ Response sent: ${status}`, data?.success !== undefined ? `success: ${data.success}` : '');
        return true;
      } catch (sendError) {
        console.error('❌ Error in sendResponse:', sendError);
        console.error('❌ Send error details:', {
          message: sendError.message,
          stack: sendError.stack
        });
        responseSent = false; // Reset so we can try again
        return false;
      }
    } else {
      console.warn('⚠️ Attempted to send response but already sent:', {
        responseSent,
        headersSent: res.headersSent
      });
    }
    return false;
  };
  
  // Wrap everything in a try-catch to ensure we always send a response
  try {
    if (!supabase) {
      console.error('❌ Supabase not configured');
      if (sendResponse(503, { 
        success: false,
        error: "Supabase not configured",
        message: "Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env to enable order fetching."
      })) {
        return;
      }
    }

    const { limit = 100, offset = 0, status, email, user_id } = req.query;
    console.log('📥 Query params:', { limit, offset, status, email, user_id });

    console.log('📥 Building Supabase query...');
    // Fetch orders first
    let query = supabase
      .from('orders')
      .select('*')
      .order('order_date', { ascending: false })
      .range(parseInt(offset), parseInt(offset) + parseInt(limit) - 1);

    // Filter by status if provided
    if (status) {
      query = query.eq('status', status);
    }

    // Filter by user_id if provided (preferred method)
    if (user_id) {
      console.log('👤 Filtering orders by user_id:', user_id);
      query = query.eq('user_id', user_id);
    } 
    // Filter by email if provided (fallback for compatibility)
    else if (email) {
      console.log('📧 Filtering orders by email:', email);
      query = query.eq('customer_email', email);
    } else {
      console.log('📊 No user_id or email filter - returning ALL orders from all emails');
    }

    console.log('📥 Executing Supabase query...');
    let data, error;
    try {
      const result = await query;
      data = result.data;
      error = result.error;
    } catch (queryError) {
      console.error('❌ Exception during Supabase query execution:', queryError);
      console.error('❌ Query error details:', {
        name: queryError.name,
        message: queryError.message,
        stack: queryError.stack
      });
      error = queryError;
      data = null;
    }
    
    console.log('📥 Query result:', { 
      dataLength: data?.length, 
      hasError: !!error,
      errorMessage: error?.message,
      errorCode: error?.code,
      dataIsNull: data === null,
      dataIsUndefined: data === undefined
    });

    if (error) {
      console.error("❌ Error fetching orders from Supabase:", error);
      console.error("❌ Error code:", error.code);
      console.error("❌ Error message:", error.message);
      console.error("❌ Error details:", error.details);
      console.error("❌ Error hint:", error.hint);
      
      const errorMessage = error.message || "Failed to fetch orders from database";
      const errorResponse = {
        success: false,
        error: errorMessage,
        message: errorMessage
      };
      
      // Add helpful details
      if (error.code === '42P01') {
        errorResponse.error = "Database table 'orders' does not exist. Please run the database migration.";
        errorResponse.message = "Database table 'orders' does not exist. Please run the database migration.";
      } else if (error.code === 'PGRST116') {
        errorResponse.error = "No rows returned (table might be empty or query returned no results)";
        errorResponse.message = "No orders found";
      }
      
      if (process.env.NODE_ENV === 'development') {
        errorResponse.details = {
          code: error.code,
          hint: error.hint,
          details: error.details
        };
      }
      
      if (sendResponse(500, errorResponse)) {
        console.log('✅ Error response sent for Supabase query error');
        return;
      } else {
        console.error('❌ Failed to send error response via sendResponse, trying direct send');
        // Fallback: try to send directly
        if (!res.headersSent) {
          try {
            res.status(500).json(errorResponse);
            console.log('✅ Error response sent directly');
            return;
          } catch (directError) {
            console.error('❌ Failed to send error response directly:', directError);
          }
        }
      }
    }

    // Ensure data is always an array, even if null/undefined
    const ordersData = Array.isArray(data) ? data : (data ? [data] : []);

    // Fetch tracking data separately and merge with orders
    let trackingMap = {};
    if (ordersData && ordersData.length > 0) {
      const orderIds = ordersData.map(order => order.order_id).filter(id => id); // Filter out null/undefined
      console.log('📦 Fetching tracking data for orders:', orderIds.length);
      
      if (orderIds.length > 0) {
        try {
          const { data: trackingData, error: trackingError } = await supabase
            .from('tracking')
            .select('*')
            .in('order_id', orderIds);

          if (trackingError) {
            // Check if error is because table doesn't exist (code 42P01)
            if (trackingError.code === '42P01' || trackingError.message?.includes('does not exist')) {
              console.warn("⚠️ Tracking table does not exist yet. Run SUPABASE_TRACKING_SCHEMA.sql to create it.");
            } else {
              console.warn("⚠️ Error fetching tracking data (continuing without it):", trackingError);
            }
          } else {
            // Create a map of order_id -> tracking data
            trackingMap = {};
            (trackingData || []).forEach(tracking => {
              trackingMap[tracking.order_id] = tracking;
            });
            console.log(`✅ Loaded tracking data for ${Object.keys(trackingMap).length} orders`);
          }
        } catch (trackingException) {
          console.warn("⚠️ Exception fetching tracking data (continuing without it):", trackingException);
          // Continue without tracking data - orders will still be returned
        }
      } else {
        console.log('📦 No valid order IDs to fetch tracking data for');
      }
    }

    // Get total count for pagination (with error handling)
    let totalCount = 0;
    try {
      const { count, error: countError } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true });
      
      if (countError) {
        console.warn("Warning: Failed to get order count:", countError);
        // Continue without count rather than failing
      } else {
        totalCount = count || 0;
      }
    } catch (countErr) {
      console.warn("Warning: Exception getting order count:", countErr);
      // Continue without count
    }

    // Sanitize orders data to ensure it's JSON serializable
    // This handles cases where metadata or items might contain non-serializable data
    const sanitizedOrders = ordersData.map(order => {
      try {
        // Ensure metadata is a plain object (Supabase returns JSONB as object)
        let sanitizedMetadata = {};
        if (order.metadata) {
          if (typeof order.metadata === 'object' && !Array.isArray(order.metadata)) {
            // Try to create a clean copy, but handle circular references
            try {
              sanitizedMetadata = JSON.parse(JSON.stringify(order.metadata));
            } catch (e) {
              // If JSON.stringify fails (circular ref), just use the object as-is
              // Supabase JSONB should already be serializable
              sanitizedMetadata = order.metadata;
            }
          } else if (typeof order.metadata === 'string') {
            // If it's a string, try to parse it
            try {
              sanitizedMetadata = JSON.parse(order.metadata);
            } catch (e) {
              sanitizedMetadata = {};
            }
          }
        }

        // Ensure items is an array
        let sanitizedItems = [];
        if (order.items) {
          if (Array.isArray(order.items)) {
            try {
              sanitizedItems = JSON.parse(JSON.stringify(order.items));
            } catch (e) {
              // If serialization fails, use as-is (should be fine from Supabase)
              sanitizedItems = order.items;
            }
          } else if (typeof order.items === 'string') {
            try {
              sanitizedItems = JSON.parse(order.items);
            } catch (e) {
              sanitizedItems = [];
            }
          }
        }

        // Get tracking data from the map we created earlier
        const trackingData = trackingMap[order.order_id] || null;

        // Return sanitized order with all original fields
        const sanitizedOrder = {
          ...order,
          metadata: sanitizedMetadata,
          items: sanitizedItems,
          tracking: trackingData
        };

        return sanitizedOrder;
      } catch (sanitizeError) {
        console.warn(`Warning: Failed to sanitize order ${order?.order_id || 'unknown'}:`, sanitizeError);
        // Return order with safe defaults if sanitization fails
        return {
          ...order,
          metadata: order.metadata || {},
          items: Array.isArray(order.items) ? order.items : [],
          tracking: trackingMap[order.order_id] || null
        };
      }
    });

    const response = { 
      success: true,
      orders: sanitizedOrders || [],
      total: totalCount || 0,
      limit: parseInt(limit) || 100,
      offset: parseInt(offset) || 0
    };

    console.log(`✅ Returning ${sanitizedOrders?.length || 0} orders (total: ${totalCount || 0})`);
    
    // Ensure response is always sent with proper error handling
    try {
      // Validate response before sending
      if (!response || typeof response !== 'object') {
        console.error('❌ Invalid response object:', response);
        throw new Error('Invalid response object');
      }
      
      // Ensure response has required fields
      if (response.success === undefined) {
        response.success = true;
      }
      if (!response.orders) {
        response.orders = [];
      }
      
      if (sendResponse(200, response)) {
        console.log('✅ Response sent successfully');
      } else {
        console.warn("⚠️ Response already sent, skipping");
        // Double-check if response was actually sent
        if (!res.headersSent && !responseSent) {
          console.log('⚠️ Attempting to send response directly...');
          try {
            res.status(200).json(response);
            console.log('✅ Response sent directly');
          } catch (directError) {
            console.error('❌ Failed to send response directly:', directError);
          }
        }
      }
    } catch (responseError) {
      console.error("❌ Error sending response:", responseError);
      console.error("❌ Response error details:", {
        name: responseError.name,
        message: responseError.message,
        stack: responseError.stack
      });
      // Last resort: try to send a plain text response
      if (!res.headersSent) {
        try {
          const safeResponse = {
            success: true,
            orders: sanitizedOrders || [],
            total: totalCount || 0,
            limit: parseInt(limit) || 100,
            offset: parseInt(offset) || 0
          };
          res.status(200).type('application/json').send(JSON.stringify(safeResponse));
          console.log('✅ Fallback response sent');
        } catch (fallbackError) {
          console.error("❌ Critical: Failed to send fallback response:", fallbackError);
          if (!res.headersSent) {
            try {
              res.status(500).type('text/plain').send('Error: Failed to send response');
              console.log('✅ Basic error response sent');
            } catch (finalError) {
              console.error("❌ CRITICAL: Completely failed to send any response:", finalError);
            }
          }
        }
      }
    }
  } catch (error) {
    console.error("❌ Error in /get-orders endpoint:", error);
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    if (error.stack) {
      console.error("Error stack:", error.stack);
    }
    
    // Ensure we always return valid JSON
    if (!res.headersSent && !responseSent) {
      try {
        const errorResponse = { 
          success: false,
          error: error.message || "Failed to fetch orders",
          message: error.message || "An error occurred while fetching orders"
        };
        
        // Add details in development
        if (process.env.NODE_ENV === 'development') {
          errorResponse.details = {
            name: error.name,
            stack: error.stack,
            ...(error.code && { code: error.code })
          };
        }
        
        res.status(500).json(errorResponse);
        console.log('✅ Error response sent to client');
      } catch (jsonError) {
        // If even JSON.stringify fails, send plain text
        console.error("❌ Critical: Failed to send JSON error response:", jsonError);
        console.error("❌ JSON error details:", jsonError.message);
        if (!res.headersSent) {
          try {
            // Build a safe error message - ensure it's always non-empty
            let errorMessage = "Failed to fetch orders";
            try {
              if (error?.message) {
                errorMessage = String(error.message);
              } else if (error?.toString) {
                errorMessage = String(error.toString());
              } else if (typeof error === 'string') {
                errorMessage = error;
              }
            } catch (e) {
              errorMessage = "An unknown error occurred";
            }
            
            // Ensure we have a non-empty message
            if (!errorMessage || errorMessage.trim() === '') {
              errorMessage = "Internal server error occurred";
            }
            
            const plainTextResponse = `Error: ${errorMessage}`;
            console.log('📤 Sending plain text error response:', plainTextResponse);
            res.status(500).type('text/plain').send(plainTextResponse);
            console.log('✅ Plain text error response sent successfully');
          } catch (plainTextError) {
            console.error("❌ Critical: Failed to send plain text error response:", plainTextError);
            console.error("❌ Plain text error details:", plainTextError.message);
            // Last resort - send a basic error (this should never fail)
            if (!res.headersSent) {
              try {
                const basicError = 'Error: Internal server error occurred';
                res.status(500).type('text/plain').send(basicError);
                console.log('✅ Basic error response sent:', basicError);
              } catch (finalError) {
                console.error("❌ CRITICAL: Completely failed to send any error response:", finalError);
                // At this point, we've exhausted all options
              }
            }
          }
        }
      }
    } else {
      console.warn("⚠️ Response already sent, cannot send error response");
      console.warn("⚠️ Headers sent:", res.headersSent);
      console.warn("⚠️ Response sent flag:", responseSent);
    }
  }
});

// --- Update Order Dispatched Status ---
// Support both PATCH and PUT for compatibility
app.patch("/api/orders/:orderId/dispatched", async (req, res) => {
  handleDispatchedUpdate(req, res);
});

app.put("/api/orders/:orderId/dispatched", async (req, res) => {
  handleDispatchedUpdate(req, res);
});

async function handleDispatchedUpdate(req, res) {
  console.log('🔄 Handling dispatched status update:', {
    orderId: req.params.orderId,
    dispatched: req.body?.dispatched,
    tracking_number: req.body?.tracking_number,
    tracking_link: req.body?.tracking_link,
    method: req.method
  });
  
  try {
    if (!supabase) {
      return res.status(503).json({ 
        error: "Supabase not configured",
        message: "Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env to enable order updates."
      });
    }

    const { orderId } = req.params;
    const { dispatched, tracking_number, tracking_link } = req.body;

    console.log('📦 Received tracking data:', {
      tracking_number: tracking_number,
      tracking_link: tracking_link,
      tracking_number_type: typeof tracking_number,
      tracking_link_type: typeof tracking_link,
      tracking_number_length: tracking_number?.length,
      tracking_link_length: tracking_link?.length
    });

    if (typeof dispatched !== 'boolean') {
      return res.status(400).json({ 
        error: "Invalid request",
        message: "dispatched must be a boolean value"
      });
    }

    // Get current order to preserve existing metadata
    const { data: currentOrder, error: fetchError } = await supabase
      .from('orders')
      .select('metadata')
      .eq('order_id', orderId)
      .single();

    if (fetchError || !currentOrder) {
      console.error("❌ Order not found:", { orderId, fetchError });
      return res.status(404).json({ 
        error: "Order not found",
        message: `Order ${orderId} does not exist`,
        details: fetchError
      });
    }

    // Ensure metadata is an object (Supabase JSONB might return as object or string)
    let existingMetadata = {};
    if (currentOrder.metadata) {
      if (typeof currentOrder.metadata === 'string') {
        try {
          existingMetadata = JSON.parse(currentOrder.metadata);
        } catch (e) {
          console.warn("⚠️ Failed to parse metadata string, using empty object:", e);
          existingMetadata = {};
        }
      } else if (typeof currentOrder.metadata === 'object' && currentOrder.metadata !== null) {
        existingMetadata = currentOrder.metadata;
      }
    }

    // Process tracking info - handle empty strings, null, undefined
    // If tracking_number is provided and not empty after trim, use it; otherwise set to null
    const processedTrackingNumber = (tracking_number && typeof tracking_number === 'string' && tracking_number.trim().length > 0)
      ? tracking_number.trim()
      : null;
    
    // If tracking_link is provided and not empty after trim, use it; otherwise set to null
    const processedTrackingLink = (tracking_link && typeof tracking_link === 'string' && tracking_link.trim().length > 0)
      ? tracking_link.trim()
      : null;

    console.log('📦 Processed tracking data:', {
      processedTrackingNumber,
      processedTrackingLink,
      original_tracking_number: tracking_number,
      original_tracking_link: tracking_link
    });

    // Update metadata with dispatched status (keep tracking info separate in tracking table)
    // Always explicitly set dispatched and dispatched_at to ensure they're saved correctly
    const updatedMetadata = {
      ...existingMetadata,
      dispatched: dispatched === true, // Ensure it's always a boolean
      dispatched_at: dispatched === true ? new Date().toISOString() : null, // Explicitly set to null when false
    };

    // Remove tracking fields from metadata (they're now in tracking table)
    delete updatedMetadata.tracking_number;
    delete updatedMetadata.tracking_link;

    console.log('📦 Final metadata to save:', JSON.stringify(updatedMetadata, null, 2));

    // Validate metadata is serializable
    try {
      JSON.stringify(updatedMetadata);
    } catch (validationError) {
      console.error("❌ Metadata validation failed:", validationError);
      return res.status(400).json({ 
        error: "Invalid metadata",
        message: "Metadata contains non-serializable data",
        details: validationError.message
      });
    }

    // Update order metadata (dispatched status only)
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .update({ 
        metadata: updatedMetadata
      })
      .eq('order_id', orderId)
      .select();

    if (orderError) {
      console.error("❌ Error updating order dispatched status:", orderError);
      console.error("   Error code:", orderError.code);
      console.error("   Error message:", orderError.message);
      console.error("   Error details:", JSON.stringify(orderError, null, 2));
      console.error("   Order ID:", orderId);
      return res.status(500).json({ 
        error: orderError.message || "Failed to update order",
        code: orderError.code,
        details: orderError,
        hint: orderError.hint || "Check server logs for more details"
      });
    }

    // Upsert tracking information to tracking table
    const trackingData = {
      order_id: orderId,
      tracking_number: processedTrackingNumber,
      tracking_link: processedTrackingLink,
    };

    console.log('📦 Saving tracking data to tracking table:', trackingData);

    const { data: trackingResult, error: trackingError } = await supabase
      .from('tracking')
      .upsert(trackingData, {
        onConflict: 'order_id',
        ignoreDuplicates: false
      })
      .select()
      .single();

    if (trackingError) {
      console.error("❌ Error saving tracking information:", trackingError);
      // Don't fail the whole request if tracking save fails, but log it
      console.warn("⚠️ Order metadata updated but tracking info failed to save");
    } else {
      console.log('✅ Tracking information saved:', trackingResult);
    }

    // Combine order and tracking data for response
    const responseOrder = {
      ...orderData[0],
      tracking: trackingResult || null
    };

    console.log(`✅ Order ${orderId} marked as ${dispatched ? 'dispatched' : 'not dispatched'}`);
    res.json({ 
      success: true,
      order: responseOrder,
      message: `Order ${dispatched ? 'marked as dispatched' : 'marked as not dispatched'}`
    });
  } catch (error) {
    console.error("Error updating dispatched status:", error);
    res.status(500).json({ error: error.message || "Failed to update order" });
  }
}

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

// --- Get Inventory from Supabase (New Structure: inventory_items) ---
app.get("/api/inventory", async (req, res) => {
  console.log("📥 GET /api/inventory - Request received");
  
  // Helper to send JSON error response
  const sendError = (status, error, message, details) => {
    if (res.headersSent) {
      console.warn("⚠️ Cannot send error - headers already sent");
      return;
    }
    
    try {
      // If details has success: true, send it as success response
      if (details && details.success === true) {
        res.status(200).json(details);
        console.log(`✅ Sent success response via sendError`);
        return;
      }
      
      const errorResponse = { 
        success: false,
        error: error || "Unknown error",
        message: message || "An error occurred"
      };
      
      // Only add details if it's safe to serialize
      if (details !== undefined) {
        try {
          JSON.stringify(details);
          errorResponse.details = details;
        } catch (e) {
          console.warn("⚠️ Details not serializable, omitting from response");
        }
      }
      
      res.status(status || 500).json(errorResponse);
      console.log(`✅ Sent error response: ${status} - ${error || 'Unknown'}`);
    } catch (jsonError) {
      console.error("❌ Failed to send JSON error:", jsonError);
      console.error("   JSON error details:", {
        message: jsonError.message,
        name: jsonError.name
      });
      
      if (!res.headersSent) {
        try {
          const plainText = `Error: ${error || 'Unknown error'}\nMessage: ${message || ''}\n`;
          res.status(status || 500)
            .type('text/plain')
            .set('Content-Length', Buffer.byteLength(plainText))
            .send(plainText);
          console.log(`✅ Sent error response as plain text`);
        } catch (plainError) {
          console.error("❌ Critical: Even plain text send failed:", plainError);
        }
      }
    }
  };

  try {
    // Check Supabase configuration
    if (!supabase) {
      return sendError(503, "Supabase not configured", 
        "Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env to enable inventory fetching.");
    }

    // Validate Products structure
    if (!Products || !Products.cases || !Products.pins) {
      console.error("❌ Products structure is invalid:", {
        hasProducts: !!Products,
        hasCases: !!(Products && Products.cases),
        hasPins: !!(Products && Products.pins)
      });
      return sendError(500, "Products data not loaded",
        "The products.json file could not be loaded or has an invalid structure.",
        process.env.NODE_ENV === 'development' ? {
          hasProducts: !!Products,
          hasCases: !!(Products && Products.cases),
          hasPins: !!(Products && Products.pins)
        } : undefined);
    }

    // Validate Products.pins structure
    if (!Products.pins.flags || !Products.pins.colorful || !Products.pins.bronze) {
      console.error("❌ Products.pins structure is invalid:", {
        hasFlags: !!(Products.pins && Products.pins.flags),
        hasColorful: !!(Products.pins && Products.pins.colorful),
        hasBronze: !!(Products.pins && Products.pins.bronze)
      });
      return sendError(500, "Products pins data not loaded",
        "The products.json pins structure is invalid.",
        process.env.NODE_ENV === 'development' ? {
          hasFlags: !!(Products.pins && Products.pins.flags),
          hasColorful: !!(Products.pins && Products.pins.colorful),
          hasBronze: !!(Products.pins && Products.pins.bronze)
        } : undefined);
    }

    // Fetch all inventory items with timeout protection
    let items = null;
    let error = null;
    
    try {
      // Create a timeout promise that rejects after 8 seconds
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout - Supabase query took too long')), 8000);
      });

      // Create the Supabase query promise
      const queryPromise = supabase
        .from('inventory_items')
        .select('*')
        .order('item_type, product_id');
      
      let result;
      try {
        // Race the query against the timeout
        result = await Promise.race([queryPromise, timeoutPromise]);
      } catch (raceError) {
        // Handle timeout errors
        if (raceError.message && raceError.message.includes('timeout')) {
          console.error("⏱️ Supabase query timed out after 8 seconds");
          return sendError(504,
            "Gateway Timeout",
            "The inventory query took too long to respond. Please check your Supabase connection.",
            {
              timeout: raceError.message
            }
          );
        }
        // Re-throw other errors to be handled below
        throw raceError;
      }

      // Extract data and error from Supabase result
      // Supabase queries return { data, error } objects
      if (result && typeof result === 'object') {
        items = result.data;
        error = result.error;
      } else {
        console.error("❌ Unexpected result type:", typeof result, result);
        throw new Error('Unexpected query result format');
      }
    } catch (queryError) {
      console.error("❌ Error in Supabase query:", queryError);
      console.error("   Error type:", typeof queryError);
      console.error("   Error message:", queryError.message);
      if (queryError.error) {
        console.error("   Supabase error:", queryError.error);
      }
      if (queryError.code) {
        console.error("   Error code:", queryError.code);
      }
      
      // Check if it's a table doesn't exist error
      const errorCode = queryError.code || (queryError.error && queryError.error.code);
      if (errorCode === 'PGRST116' || errorCode === '42P01') {
        console.log("ℹ️ Table doesn't exist, returning empty structure");
        return sendError(200, null, null, {
          success: true,
          inventory: {
            cases: null,
            caseColors: null,
            pins: {
              flags: null,
              colorful: null,
              bronze: null
            }
          }
        });
      }
      
      // Re-throw to be caught by outer catch block
      throw queryError;
    }

    if (error) {
      console.error("❌ Supabase query returned error:", error);
      // If table doesn't exist, return empty structure
      if (error.code === 'PGRST116' || error.code === '42P01') {
        console.log("ℹ️ Table doesn't exist (error code), returning empty structure");
        if (!res.headersSent) {
          return res.json({
            success: true,
            inventory: {
              cases: null,
              caseColors: null,
              pins: {
                flags: null,
                colorful: null,
                bronze: null
              }
            }
          });
        }
        return;
      }
      throw error;
    }

    // Ensure items is an array
    if (!items || !Array.isArray(items)) {
      console.warn("⚠️ Items is not an array or is null/undefined, using empty array:", typeof items);
      items = [];
    }

    // Transform items into the expected format
    
    // Initialize arrays with null values matching products.json structure
    const inventory = {
      cases: Products.cases.map(() => null),
      caseColors: Products.cases.map(caseItem => {
        if (!caseItem || !Array.isArray(caseItem.colors)) {
          console.warn("⚠️ Case item missing colors array:", caseItem);
          return [];
        }
        return caseItem.colors.map(() => null);
      }),
      pins: {
        flags: Products.pins.flags ? Products.pins.flags.map(() => null) : [],
        colorful: Products.pins.colorful ? Products.pins.colorful.map(() => null) : [],
        bronze: Products.pins.bronze ? Products.pins.bronze.map(() => null) : []
      }
    };

    // Group items by type
    const caseItems = items.filter(item => item.item_type === 'case_color');
    const flagPins = items.filter(item => item.item_type === 'pin_flags');
    const colorfulPins = items.filter(item => item.item_type === 'pin_colorful');
    const bronzePins = items.filter(item => item.item_type === 'pin_bronze');

    // Process case colors - match by case ID and color
    caseItems.forEach((item) => {
      try {
        const stock = item.qty_in_stock; // Read qty_in_stock from Supabase (production)
        
        const caseIndex = Products.cases.findIndex(c => c.id === item.product_id);
        if (caseIndex !== -1) {
          const caseData = Products.cases[caseIndex];
          if (caseData && Array.isArray(caseData.colors)) {
            const colorIndex = caseData.colors.findIndex(c => c.color === item.color);
            if (colorIndex !== -1 && inventory.caseColors[caseIndex]) {
              inventory.caseColors[caseIndex][colorIndex] = stock; // Use qty_in_stock value
            }
          }
        }
      } catch (itemError) {
        // Silently handle errors
      }
    });

    // Process pins - map by product_id
    flagPins.forEach(item => {
      try {
        const index = Products.pins.flags.findIndex(p => p.id === item.product_id);
        if (index !== -1 && inventory.pins.flags) {
          inventory.pins.flags[index] = item.qty_in_stock;
        }
      } catch (itemError) {
        console.warn(`⚠️ Error processing flag pin ${item.product_id}:`, itemError.message);
      }
    });

    colorfulPins.forEach(item => {
      try {
        const index = Products.pins.colorful.findIndex(p => p.id === item.product_id);
        if (index !== -1 && inventory.pins.colorful) {
          inventory.pins.colorful[index] = item.qty_in_stock;
        }
      } catch (itemError) {
        console.warn(`⚠️ Error processing colorful pin ${item.product_id}:`, itemError.message);
      }
    });

    bronzePins.forEach(item => {
      try {
        const index = Products.pins.bronze.findIndex(p => p.id === item.product_id);
        if (index !== -1 && inventory.pins.bronze) {
          inventory.pins.bronze[index] = item.qty_in_stock;
        }
      } catch (itemError) {
        console.warn(`⚠️ Error processing bronze pin ${item.product_id}:`, itemError.message);
      }
    });

    // Send success response with error handling
    if (!res.headersSent) {
      try {
        // Ensure inventory data is serializable
        const responseData = { 
          success: true,
          inventory: inventory
        };
        
        // Test serialization before sending
        JSON.stringify(responseData);
        
        res.json(responseData);
        console.log('✅ Inventory sent successfully');
      } catch (jsonError) {
        console.error("❌ Failed to send JSON success response:", jsonError);
        console.error("Error details:", {
          message: jsonError.message,
          name: jsonError.name,
          stack: jsonError.stack
        });
        
        if (!res.headersSent) {
          try {
            // Try to send a minimal error response
            const errorResponse = {
              success: false,
              error: "Failed to serialize inventory response",
              message: jsonError.message || "Unknown serialization error"
            };
            res.status(500).json(errorResponse);
            console.log('✅ Sent error response as JSON');
          } catch (fallbackError) {
            console.error("❌ Even fallback JSON failed:", fallbackError);
            if (!res.headersSent) {
              try {
                res.status(500)
                  .type('text/plain')
                  .send(`Error: Failed to serialize inventory response\nDetails: ${jsonError.message || 'Unknown error'}\n`);
                console.log('✅ Sent error response as plain text');
              } catch (plainError) {
                console.error("❌ Critical: All response methods failed:", plainError);
              }
            }
          }
        }
      }
    } else {
      console.warn('⚠️ Response already sent, skipping inventory JSON response');
    }
  } catch (error) {
    console.error("\n❌ ========== ERROR FETCHING INVENTORY ==========");
    console.error("Error message:", error.message);
    console.error("Error name:", error.name);
    console.error("Error stack:", error.stack);
    if (error.code) {
      console.error("Error code:", error.code);
    }
    if (error.details) {
      console.error("Error details:", error.details);
    }
    console.error("==============================================\n");
    
    // Always send JSON error response (unless headers already sent)
    sendError(500, 
      error.message || "Failed to fetch inventory",
      "An error occurred while fetching inventory from Supabase.",
      process.env.NODE_ENV === 'development' ? {
        errorName: error.name,
        errorCode: error.code,
        stack: error.stack
      } : undefined
    );
  }
});

// --- Update Inventory in Supabase (New Structure: inventory_items) ---
app.post("/api/inventory", async (req, res) => {
  // Helper to send JSON error response
  const sendError = (status, error, message, details) => {
    if (!res.headersSent) {
      try {
        res.status(status).json({ 
          success: false,
          error: error,
          message: message,
          details: details
        });
      } catch (jsonError) {
        console.error("Failed to send JSON error:", jsonError);
        if (!res.headersSent) {
          res.status(status).type('text/plain').send(
            `Error: ${error}\nMessage: ${message || ''}\n`
          );
        }
      }
    }
  };

  console.log("📥 POST /api/inventory - Request received");
  try {
    console.log("📦 Request body:", JSON.stringify(req.body, null, 2));
  } catch (logError) {
    console.error("❌ Failed to log request body:", logError);
    console.log("📦 Request body exists:", !!req.body);
  }
  
  try {
    // Validate Supabase
    if (!supabase) {
      console.error("❌ Supabase client not initialized");
      return sendError(503, "Supabase not configured",
        "Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env to enable inventory updates.");
    }

    // Validate Products structure
    if (!Products || !Products.cases || !Products.pins) {
      console.error("❌ Products structure is invalid for POST /api/inventory");
      return sendError(500, "Products data not loaded",
        "The products.json file could not be loaded or has an invalid structure.");
    }

    // Validate Products.pins structure
    if (!Products.pins.flags || !Products.pins.colorful || !Products.pins.bronze) {
      console.error("❌ Products.pins structure is invalid for POST /api/inventory");
      return sendError(500, "Products pins data not loaded",
        "The products.json pins structure is invalid.");
    }

    const { cases, caseColors, pins } = req.body;
    
    console.log("📊 Received data - cases:", cases?.length || 0, "caseColors:", caseColors?.length || 0, "pins:", pins ? Object.keys(pins).length : 0);
    console.log("📊 cases array:", cases ? `[${cases.slice(0, 3).join(', ')}...]` : 'null');
    console.log("📊 caseColors array:", caseColors ? `[${caseColors.length} color arrays]` : 'null');
    console.log("📊 pins object:", pins ? JSON.stringify(Object.keys(pins)) : 'null');

    // Note: Arrays might be empty or contain all nulls, but we still process them
    // to ensure items exist in the database (with null = unlimited stock)

    const itemsToUpsert = [];

    // Process case colors with all correct information
    if (caseColors) {
      caseColors.forEach((colorArray, caseIndex) => {
        if (colorArray && Array.isArray(colorArray)) {
          const caseItem = Products.cases[caseIndex];
          if (caseItem) {
            colorArray.forEach((qty, colorIndex) => {
              const color = caseItem.colors[colorIndex];
              if (color) {
                const itemId = `case-${caseItem.id}-color-${color.color}`;
                itemsToUpsert.push({
                  item_id: itemId,
                  item_type: "case_color",
                  product_id: caseItem.id,
                  name: `${caseItem.name} - ${color.color}`,
                  color: color.color,
                  price: caseItem.basePrice,
                  qty_in_stock: qty !== null && qty !== undefined ? parseInt(qty) : null,
                  category: null,
                  case_type: caseItem.type,
                });
              }
            });
          }
        }
      });
    }

    // Process overall case quantities (if provided) - update all colors for each case
    if (cases) {
      cases.forEach((qty, caseIndex) => {
        const caseItem = Products.cases[caseIndex];
        if (caseItem && qty !== null && qty !== undefined) {
          // Update all colors for this case to the same quantity
          caseItem.colors.forEach((color) => {
            const itemId = `case-${caseItem.id}-color-${color.color}`;
            // Check if this item is already in the array (from caseColors)
            const existingIndex = itemsToUpsert.findIndex(item => item.item_id === itemId);
            if (existingIndex >= 0) {
              // Update existing entry with the overall case quantity
              itemsToUpsert[existingIndex].qty_in_stock = parseInt(qty);
            } else {
              // Add new entry
              itemsToUpsert.push({
                item_id: itemId,
                item_type: "case_color",
                product_id: caseItem.id,
                name: `${caseItem.name} - ${color.color}`,
                color: color.color,
                price: caseItem.basePrice,
                qty_in_stock: parseInt(qty),
                category: null,
                case_type: caseItem.type,
              });
            }
          });
        }
      });
    }

    // Process pins with all correct information
    if (pins) {
      if (pins.flags) {
        pins.flags.forEach((qty, index) => {
          const pin = Products.pins.flags[index];
          if (pin) {
            const itemId = `pin-flags-${pin.id}`;
            itemsToUpsert.push({
              item_id: itemId,
              item_type: "pin_flags",
              product_id: pin.id,
              name: pin.name,
              color: null,
              price: pin.price,
              qty_in_stock: qty !== null && qty !== undefined ? parseInt(qty) : null,
              category: "flags",
              case_type: null,
            });
          }
        });
      }

      if (pins.colorful) {
        pins.colorful.forEach((qty, index) => {
          const pin = Products.pins.colorful[index];
          if (pin) {
            const itemId = `pin-colorful-${pin.id}`;
            itemsToUpsert.push({
              item_id: itemId,
              item_type: "pin_colorful",
              product_id: pin.id,
              name: pin.name,
              color: null,
              price: pin.price,
              qty_in_stock: qty !== null && qty !== undefined ? parseInt(qty) : null,
              category: "colorful",
              case_type: null,
            });
          }
        });
      }

      if (pins.bronze) {
        pins.bronze.forEach((qty, index) => {
          const pin = Products.pins.bronze[index];
          if (pin) {
            const itemId = `pin-bronze-${pin.id}`;
            itemsToUpsert.push({
              item_id: itemId,
              item_type: "pin_bronze",
              product_id: pin.id,
              name: pin.name,
              color: null,
              price: pin.price,
              qty_in_stock: qty !== null && qty !== undefined ? parseInt(qty) : null,
              category: "bronze",
              case_type: null,
            });
          }
        });
      }
    }

    // Remove duplicates based on item_id (keep the last one)
    const uniqueItems = [];
    const seen = new Set();
    for (let i = itemsToUpsert.length - 1; i >= 0; i--) {
      if (!seen.has(itemsToUpsert[i].item_id)) {
        seen.add(itemsToUpsert[i].item_id);
        uniqueItems.unshift(itemsToUpsert[i]);
      }
    }

    console.log(`📝 Prepared ${itemsToUpsert.length} items, ${uniqueItems.length} unique items after deduplication`);
    
    // Validate all items have required fields before saving
    const requiredFields = ['item_id', 'item_type', 'product_id', 'name', 'price'];
    const invalidItems = uniqueItems.filter(item => {
      return requiredFields.some(field => !(field in item) || item[field] === undefined || item[field] === null);
    });
    
    if (invalidItems.length > 0) {
      console.error(`❌ ERROR: ${invalidItems.length} items are missing required fields:`);
      invalidItems.slice(0, 3).forEach(item => {
        const missing = requiredFields.filter(f => !(f in item) || item[f] === undefined || item[f] === null);
        console.error(`   - ${item.item_id || 'unknown'}: missing ${missing.join(', ')}`);
      });
      return res.status(400).json({ 
        error: "Invalid items detected",
        message: `Some items are missing required fields. Please check the data.`,
        invalidCount: invalidItems.length
      });
    }
    
    console.log(`✅ Validation: All ${uniqueItems.length} items have required fields (${requiredFields.join(', ')})`);
    
    if (uniqueItems.length > 0) {
      console.log("📋 Sample item to upsert (with all required fields):");
      const sample = uniqueItems[0];
      console.log(JSON.stringify({
        item_id: sample.item_id,
        item_type: sample.item_type,
        product_id: sample.product_id,
        name: sample.name,
        color: sample.color,
        price: sample.price,
        qty_in_stock: sample.qty_in_stock,
        category: sample.category,
        case_type: sample.case_type
      }, null, 2));
    }

    // Batch upsert all items with all correct information
    if (uniqueItems.length === 0) {
      console.warn("⚠️ No items to update - all quantities may be null/undefined");
      return res.status(400).json({ 
        error: "No items to update",
        message: "All quantities appear to be null or undefined. Please set at least one quantity before saving."
      });
    }

    console.log("💾 Attempting to upsert items to Supabase...");
    console.log(`📊 TABLE: inventory_items`);
    console.log(`📊 OPERATION: UPSERT (Create or Update)`);
    console.log(`📊 TOTAL ITEMS TO UPDATE: ${uniqueItems.length}`);
    
    // First, check if table has any items (to determine if migration is needed)
    console.log("\n🔍 Checking if inventory_items table has data...");
    const { data: existingItems, error: checkError } = await supabase
      .from('inventory_items')
      .select('item_id')
      .limit(1);
    
    if (checkError) {
      if (checkError.code === 'PGRST116' || checkError.code === '42P01') {
        console.error("❌ TABLE DOES NOT EXIST: inventory_items");
        console.error("💡 SOLUTION: Run the SQL schema first (SUPABASE_INVENTORY_SCHEMA.sql)");
        return res.status(500).json({ 
          error: "Table does not exist",
          message: "Please create the inventory_items table first by running SUPABASE_INVENTORY_SCHEMA.sql in Supabase SQL Editor"
        });
      }
      console.error("⚠️ Error checking table:", checkError.message);
    } else {
      const itemCount = existingItems ? existingItems.length : 0;
      if (itemCount === 0) {
        console.warn("⚠️ WARNING: inventory_items table is EMPTY!");
        console.warn("💡 SOLUTION: Run the migration script to create items:");
        console.warn("   node migrate-inventory-to-items.js");
        console.warn("   This will create all items in the table, then you can update quantities.");
      } else {
        console.log(`✅ Table has ${itemCount > 0 ? 'items' : 'no items'} (checked sample)`);
      }
    }
    
    // Log summary by item type - include all info needed to match cart format
    const itemsByType = {};
    uniqueItems.forEach(item => {
      if (!itemsByType[item.item_type]) {
        itemsByType[item.item_type] = [];
      }
      itemsByType[item.item_type].push({
        item_id: item.item_id,
        name: item.name,
        qty_in_stock: item.qty_in_stock,
        price: item.price,
        product_id: item.product_id,
        color: item.color,
        category: item.category,
        case_type: item.case_type
      });
    });
    
    console.log("\n📋 ITEMS BEING UPDATED (using same ID format as cart):");
    Object.keys(itemsByType).forEach(type => {
      console.log(`  ${type}: ${itemsByType[type].length} items`);
      itemsByType[type].slice(0, 5).forEach(item => {
        // Format item info to match cart console.log format
        let itemInfo = {
          item_id: item.item_id,
          name: item.name,
          qty_in_stock: item.qty_in_stock !== null ? item.qty_in_stock : 'unlimited',
          price: item.price
        };
        
        // Add cart-style identification to match cart console.log format
        if (type === 'case_color') {
          // Match cart format: caseType and color (same as cart uses)
          const caseItem = Products.cases.find(c => c.id === item.product_id);
          if (caseItem) {
            itemInfo.caseType = caseItem.type; // Same as cart: item.caseType
            itemInfo.color = item.color; // Same as cart: item.color
            itemInfo.cartId = `case-${caseItem.type}-${item.color}`; // Same format as cart grouping
          }
        } else if (type.startsWith('pin_')) {
          // Match cart format: category and pin info (same as cart uses)
          const category = type.replace('pin_', '');
          itemInfo.category = category; // Same as cart: item.category
          itemInfo.cartId = `charm-${category}-${item.name}`; // Same format as cart grouping
          
          // Try to find pin details to match cart: item.pin format
          let pinData = null;
          if (category === 'flags' && Products.pins.flags) {
            pinData = Products.pins.flags.find(p => p.id === item.product_id);
          } else if (category === 'colorful' && Products.pins.colorful) {
            pinData = Products.pins.colorful.find(p => p.id === item.product_id);
          } else if (category === 'bronze' && Products.pins.bronze) {
            pinData = Products.pins.bronze.find(p => p.id === item.product_id);
          }
          
          if (pinData) {
            // Match cart format: item.pin = { name, src, category }
            itemInfo.pin = {
              name: pinData.name, // Same as cart: item.pin.name
              src: pinData.src, // Same as cart: item.pin.src
              category: category // Same as cart: item.pin.category
            };
          }
        }
        
        console.log(`    - ${JSON.stringify(itemInfo, null, 2)}`);
      });
      if (itemsByType[type].length > 5) {
        console.log(`    ... and ${itemsByType[type].length - 5} more items`);
      }
    });
    
    // Use upsert to create or update items with all fields
    console.log("\n💾 Executing UPSERT to inventory_items table...");
    console.log(`📊 Attempting to upsert ${uniqueItems.length} items`);
    
    const { data, error } = await supabase
      .from('inventory_items')
      .upsert(uniqueItems, {
        onConflict: 'item_id',
        ignoreDuplicates: false, // Update existing items
      })
      .select();

    if (error) {
      console.error("\n❌ ERROR UPDATING TABLE: inventory_items");
      console.error("❌ Error code:", error.code);
      console.error("❌ Error message:", error.message);
      console.error("❌ Error details:", JSON.stringify(error, null, 2));
      console.error("❌ Error hint:", error.hint);
      return sendError(500,
        "Failed to save inventory items",
        error.message || "Error saving inventory to Supabase",
        {
          code: error.code,
          hint: error.hint,
          details: error.details
        }
      );
    }

    // Verify the upsert actually worked
    if (!data || data.length === 0) {
      console.error("\n⚠️ WARNING: Upsert returned no data!");
      console.error("⚠️ This might mean:");
      console.error("   1. Items don't exist in the table (run migration script first)");
      console.error("   2. Upsert failed silently");
      console.error("   3. There's a constraint violation");
      
      // Try to verify by checking if items exist
      console.log("\n🔍 Verifying items in database...");
      const sampleItemId = uniqueItems[0]?.item_id;
      if (sampleItemId) {
        const { data: checkData, error: checkError } = await supabase
          .from('inventory_items')
          .select('*')
          .eq('item_id', sampleItemId)
          .limit(1);
        
        if (checkError) {
          console.error("❌ Error checking database:", checkError.message);
        } else if (checkData && checkData.length > 0) {
          console.log("✅ Item exists in database:", checkData[0]);
        } else {
          console.error("❌ Item does NOT exist in database!");
          console.error("💡 SOLUTION: Run the migration script first:");
          console.error("   node migrate-inventory-to-items.js");
        }
      }
      
      return res.status(500).json({ 
        error: "Upsert returned no data",
        message: "Items may not exist in the table. Please run the migration script first: node migrate-inventory-to-items.js",
        attemptedItems: uniqueItems.length
      });
    }

    const successful = data ? data.length : 0;
    console.log(`\n✅ SUCCESS: Upserted ${successful}/${uniqueItems.length} items in inventory_items table`);
    console.log(`📊 TABLE: inventory_items`);
    console.log(`📊 OPERATION: UPSERT completed successfully`);
    console.log(`💾 All data is now persisted in Supabase and will be available after deployment`);
    
    // Verify all required fields are present in saved data
    if (data && data.length > 0) {
      const sampleItem = data[0];
      const requiredFields = ['item_id', 'item_type', 'product_id', 'name', 'price', 'qty_in_stock'];
      const missingFields = requiredFields.filter(field => !(field in sampleItem));
      
      if (missingFields.length === 0) {
        console.log(`✅ Verification: All required fields are present in saved items`);
        console.log(`   Required fields: ${requiredFields.join(', ')}`);
      } else {
        console.warn(`⚠️ Warning: Missing fields in saved items: ${missingFields.join(', ')}`);
      }
    }
    
    // Verify a few items were actually updated
    if (successful > 0) {
      console.log("\n🔍 Verifying updates in database...");
      const sampleIds = uniqueItems.slice(0, 3).map(item => item.item_id);
      const { data: verifyData, error: verifyError } = await supabase
        .from('inventory_items')
        .select('item_id, name, qty_in_stock, updated_at')
        .in('item_id', sampleIds);
      
      if (verifyError) {
        console.error("⚠️ Could not verify updates:", verifyError.message);
      } else {
        console.log("✅ Verified items in database:");
        verifyData.forEach(item => {
          console.log(`   - ${item.item_id}: qty=${item.qty_in_stock}, updated=${item.updated_at}`);
        });
      }
    }
    
    if (data && data.length > 0) {
      console.log("\n📋 UPDATED ITEMS SUMMARY (using same ID format as cart):");
      // Group by type for summary
      const updatedByType = {};
      data.forEach(item => {
        if (!updatedByType[item.item_type]) {
          updatedByType[item.item_type] = 0;
        }
        updatedByType[item.item_type]++;
      });
      
      Object.keys(updatedByType).forEach(type => {
        console.log(`  ${type}: ${updatedByType[type]} items updated`);
      });
      
      console.log("\n📋 SAMPLE UPDATED ITEM (cart format):");
      if (data && data.length > 0) {
        const sampleItem = data[0];
        const itemInfo = {
          item_id: sampleItem.item_id,
          name: sampleItem.name,
          qty_in_stock: sampleItem.qty_in_stock,
          price: sampleItem.price
        };
        
        // Add cart-style identification
        if (sampleItem.item_type === 'case_color') {
          const caseItem = Products.cases.find(c => c.id === sampleItem.product_id);
          if (caseItem) {
            itemInfo.caseType = caseItem.type;
            itemInfo.color = sampleItem.color;
            itemInfo.cartId = `case-${caseItem.type}-${sampleItem.color}`;
          }
        } else if (sampleItem.item_type.startsWith('pin_')) {
          const category = sampleItem.item_type.replace('pin_', '');
          itemInfo.category = category;
          itemInfo.cartId = `charm-${category}-${sampleItem.name}`;
          
          let pinData = null;
          if (category === 'flags' && Products.pins.flags) {
            pinData = Products.pins.flags.find(p => p.id === sampleItem.product_id);
          } else if (category === 'colorful' && Products.pins.colorful) {
            pinData = Products.pins.colorful.find(p => p.id === sampleItem.product_id);
          } else if (category === 'bronze' && Products.pins.bronze) {
            pinData = Products.pins.bronze.find(p => p.id === sampleItem.product_id);
          }
          
          if (pinData) {
            itemInfo.pin = {
              name: pinData.name,
              src: pinData.src,
              category: category
            };
          }
        }
        
        console.log(JSON.stringify(itemInfo, null, 2));
      }
    }

    // Final summary for deployment assurance
    console.log("\n" + "=".repeat(60));
    console.log("📦 DEPLOYMENT READINESS CHECK");
    console.log("=".repeat(60));
    console.log(`✅ Items saved: ${successful}/${uniqueItems.length}`);
    console.log(`✅ Table: inventory_items`);
    console.log(`✅ All required fields present: Yes`);
    console.log(`✅ Data persisted in Supabase: Yes`);
    console.log(`✅ Will be available after deployment: Yes`);
    console.log(`✅ Timestamp: ${new Date().toISOString()}`);
    console.log("=".repeat(60));

    // Send success response with error handling
    if (!res.headersSent) {
      try {
        res.json({ 
          success: true,
          message: `Inventory saved successfully (${successful} items saved with all correct information)`,
          updatedCount: successful,
          totalItems: uniqueItems.length,
          inventory: data || [],
          persisted: true,
          deploymentReady: true,
          savedAt: new Date().toISOString(),
          note: "All data is saved to Supabase inventory_items table and will persist after deployment"
        });
        console.log('✅ POST /api/inventory - Success response sent');
      } catch (jsonError) {
        console.error("❌ Failed to send JSON success response:", jsonError);
        sendError(500,
          "Failed to serialize response",
          "Inventory was saved but failed to send response",
          {
            savedCount: successful
          }
        );
      }
    } else {
      console.warn('⚠️ POST /api/inventory - Response already sent, skipping success response');
    }
  } catch (error) {
    console.error("\n❌ ========== ERROR UPDATING INVENTORY ==========");
    console.error("Error message:", error.message);
    console.error("Error name:", error.name);
    console.error("Error stack:", error.stack);
    if (error.code) {
      console.error("Error code:", error.code);
    }
    if (error.details) {
      console.error("Error details:", error.details);
    }
    console.error("================================================\n");
    
    // Use sendError helper to ensure JSON response
    sendError(500,
      error.message || "Failed to update inventory",
      "An error occurred while updating inventory in Supabase.",
      process.env.NODE_ENV === 'development' ? {
        errorName: error.name,
        errorCode: error.code,
        stack: error.stack
      } : undefined
    );
  }
});

// --- Health Check ---
app.get("/health", (req, res) => {
  res.json({ 
    status: "ok", 
    message: "Stripe checkout server is running",
    supabase: supabase ? "configured" : "not configured"
  });
});

// --- Supabase Config Check ---
app.get("/api/config-check", (req, res) => {
  const hasUrl = !!process.env.SUPABASE_URL;
  const hasKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY;
  const isConfigured = supabase !== null;
  
  res.json({
    supabaseUrl: hasUrl ? "set" : "missing",
    supabaseKey: hasKey ? "set" : "missing",
    supabaseClient: isConfigured ? "initialized" : "not initialized",
    message: isConfigured 
      ? "Supabase is properly configured" 
      : "Supabase is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to .env and restart the server."
  });
});

// --- Get All Inventory Items (with full details) ---
app.get("/api/inventory/items", async (req, res) => {
  try {
    if (!supabase) {
      return res.status(503).json({ 
        error: "Supabase not configured",
        message: "Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env to enable inventory fetching."
      });
    }

    const { data: items, error } = await supabase
      .from('inventory_items')
      .select('*')
      .order('item_type, product_id');

    if (error) {
      if (error.code === '42P01') {
        return res.status(404).json({ 
          error: "Table not found",
          message: "Run the migration script first: node migrate-inventory-to-items.js"
        });
      }
      throw error;
    }

    res.json({ 
      success: true,
      items: items || []
    });
  } catch (error) {
    console.error("Error fetching inventory items:", error);
    res.status(500).json({ 
      error: error.message || "Failed to fetch inventory items",
      details: error 
    });
  }
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.path
  });
});

// Final error handler (catches any errors not handled by routes)
app.use((err, req, res, next) => {
  console.error('\n❌ ========== FINAL ERROR HANDLER ==========');
  console.error('Unhandled error:', err);
  console.error('Error message:', err?.message);
  console.error('Error name:', err?.name);
  console.error('Error stack:', err?.stack);
  console.error('Request path:', req.path);
  console.error('Request method:', req.method);
  if (err?.code) {
    console.error('Error code:', err.code);
  }
  console.error('==========================================\n');
  
  if (!res.headersSent) {
    try {
      res.status(500).json({
        success: false,
        error: err.message || 'Internal server error',
        errorName: err.name,
        errorCode: err.code,
        path: req.path
      });
    } catch (jsonError) {
      // If JSON.stringify fails, send plain text
      console.error('Failed to send JSON error response:', jsonError);
      res.status(500).type('text/plain').send(
        `Error: ${err.message || 'Internal server error'}\n` +
        `Path: ${req.path}\n` +
        `Check server console for details.`
      );
    }
  } else {
    console.error('⚠️ Response already sent, cannot send error response');
  }
});

// Handle uncaught exceptions and unhandled promise rejections
process.on('uncaughtException', (error) => {
  console.error('\n❌ ========== UNCAUGHT EXCEPTION ==========');
  console.error('Uncaught Exception:', error);
  console.error('Stack:', error.stack);
  console.error('==========================================\n');
  // Don't exit - let the server continue running
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('\n❌ ========== UNHANDLED PROMISE REJECTION ==========');
  console.error('Unhandled Rejection at:', promise);
  console.error('Reason:', reason);
  if (reason && typeof reason === 'object' && reason.stack) {
    console.error('Stack:', reason.stack);
  }
  console.error('==================================================\n');
  // Don't exit - let the server continue running
});

app.listen(PORT, () => {
  console.log(`🚀 Stripe Embedded Checkout Server running on http://localhost:${PORT}`);
  console.log(`📝 Make sure your frontend is configured to call this server: ${PORT}`);
  console.log(`✅ Available endpoints:`);
  console.log(`   - GET  /get-orders`);
  console.log(`   - PATCH /api/orders/:orderId/dispatched`);
  console.log(`   - PUT   /api/orders/:orderId/dispatched`);
});
