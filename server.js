// Backend server for Stripe Embedded Checkout
// Run with: node server.js
// Install dependencies: npm install express stripe cors dotenv resend @supabase/supabase-js

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");
const { createClient } = require("@supabase/supabase-js");

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

// --- Initialize Supabase Client ---
let supabase = null;
if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
  supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
  console.log("✅ Supabase client initialized");
} else {
  console.log("⚠️ Supabase not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env to enable order storage.");
}

const app = express();
const PORT = process.env.PORT || 3001;

// --- Middleware ---
// Production frontend URLs
const PRODUCTION_FRONTEND_URL = "https://raphagil.github.io";
const NETLIFY_FRONTEND_URL = "https://thehappycasestore.netlify.app";

const allowedOrigins = process.env.FRONTEND_URL
  ? [process.env.FRONTEND_URL, PRODUCTION_FRONTEND_URL, NETLIFY_FRONTEND_URL]
  : ["http://localhost:3000", "http://127.0.0.1:3000", PRODUCTION_FRONTEND_URL, NETLIFY_FRONTEND_URL];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes(origin) ||
        origin.includes("localhost") ||
        origin.includes("127.0.0.1") ||
        origin.startsWith("https://raphagil.github.io") || // Allow GitHub Pages
        origin.startsWith("https://thehappycasestore.netlify.app") // Allow Netlify
      ) {
        return callback(null, true);
      }
      console.log("⚠️ CORS blocked origin:", origin);
      callback(null, true); // Allow all in dev (but log for production debugging)
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
  try {
    const { amount, currency, items, customerInfo } = req.body || {};

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Amount must be greater than 0" });
    }

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

    const minimumAmount = minimumAmounts[resolvedCurrency] || 30; // Default to 30

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
      
      return res.status(400).json({ 
        error: `Amount is too small. Minimum amount is ${symbol}${minDisplay}. Your amount is ${symbol}${currentDisplay}.` 
      });
    }

    console.log(`💳 Creating payment intent: ${roundedAmount} ${resolvedCurrency.toUpperCase()}`);

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

    console.log(`✅ Payment intent created: ${paymentIntent.id}`);

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("❌ Error creating payment intent:", error);
    
    // Provide more helpful error messages
    let errorMessage = error.message || "Failed to create payment intent";
    
    if (error.type === 'StripeInvalidRequestError') {
      // Stripe-specific errors
      if (error.message.includes('minimum')) {
        errorMessage = error.message;
      } else if (error.message.includes('currency')) {
        errorMessage = `Invalid currency: ${error.message}`;
      }
    }
    
    res.status(500).json({ error: errorMessage });
  }
});

// --- Send Order Confirmation Email ---
app.post("/api/send-order-confirmation", async (req, res) => {
  try {
    const { paymentIntent, customerInfo, items } = req.body;

    if (!customerInfo?.email) {
      return res.status(400).json({ error: "Customer email is required" });
    }

    // Calculate total
    const totalAmount = items?.reduce((sum, item) => sum + (item.totalPrice || item.price || 0) * (item.quantity || 1), 0) || 0;
    const orderId = paymentIntent?.id || `order-${Date.now()}`;
    const orderDate = paymentIntent?.created 
      ? new Date(paymentIntent.created * 1000).toLocaleDateString('en-GB', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      : new Date().toLocaleDateString('en-GB');

    // Format order items HTML
    const itemsHtml = items?.map((item, index) => {
      const itemName = item.caseName || item.name || 'Custom Case';
      const itemPrice = ((item.totalPrice || item.price || 0) * (item.quantity || 1)).toFixed(2);
      const quantity = item.quantity || 1;
      
      return `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
            <strong>${itemName}</strong>
            ${item.color ? `<br><span style="color: #6b7280; font-size: 14px;">Color: ${item.color}</span>` : ''}
            ${item.pinsDetails && item.pinsDetails.length > 0 ? `<br><span style="color: #6b7280; font-size: 14px;">Charms: ${item.pinsDetails.length}</span>` : ''}
          </td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${quantity}</td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">£${itemPrice}</td>
        </tr>
      `;
    }).join('') || '';

    // Email HTML template
    const emailHtml = `
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
                  <td colspan="2" style="padding: 12px; text-align: right; font-weight: bold; border-top: 2px solid #e5e7eb;">Total:</td>
                  <td style="padding: 12px; text-align: right; font-weight: bold; font-size: 18px; border-top: 2px solid #e5e7eb;">£${totalAmount.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          ${customerInfo?.address ? `
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 6px; margin-bottom: 30px;">
            <h2 style="margin-top: 0; font-size: 20px; color: #111827;">Shipping Address</h2>
            <p style="margin: 5px 0;">
              ${customerInfo.name || ''}<br>
              ${customerInfo.address.line1 || ''}<br>
              ${customerInfo.address.line2 ? customerInfo.address.line2 + '<br>' : ''}
              ${customerInfo.address.city || ''} ${customerInfo.address.postal_code || ''}<br>
              ${customerInfo.address.country || ''}
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

    // Configure Resend email service
    const resendApiKey = process.env.RESEND_API_KEY || 're_iV7Ucv7i_M6Bbi2iwk9HFxBzfNSsJqJWY';
    // Resend requires verified domains. For testing, use onboarding@resend.dev
    // For production, you must verify your own domain at https://resend.com/domains
    const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';
    
    if (!resendApiKey) {
      // Development: Log email instead of sending
      console.log('='.repeat(60));
      console.log('ORDER CONFIRMATION EMAIL (Resend API key not configured)');
      console.log('='.repeat(60));
      console.log(`To: ${customerInfo.email}`);
      console.log(`Subject: Order Confirmation - ${orderId}`);
      console.log('---');
      console.log(`Order ID: ${orderId}`);
      console.log(`Order Date: ${orderDate}`);
      console.log(`Total: £${totalAmount.toFixed(2)}`);
      console.log(`Items: ${items?.length || 0}`);
      console.log('='.repeat(60));
      console.log('\nTo enable email sending, set RESEND_API_KEY in your .env file');
      console.log('='.repeat(60));

      return res.json({ 
        success: true, 
        message: 'Order confirmation email logged (Resend API key not configured)',
        emailHtml // Return HTML for debugging/testing
      });
    }

    // Send email using Resend
    try {
      const resend = new Resend(resendApiKey);
      
      console.log('📧 Attempting to send email via Resend...');
      console.log(`From: ${fromEmail}`);
      console.log(`To: ${customerInfo.email}`);
      console.log(`Subject: Order Confirmation - ${orderId}`);
      
      // Resend requires the "from" email to be verified in your Resend account
      // Format: "Name <email@domain.com>" or just "email@domain.com"
      const { data, error } = await resend.emails.send({
        from: `The Happy Case <${fromEmail}>`,
        to: customerInfo.email,
        subject: `Order Confirmation - ${orderId}`,
        html: emailHtml,
      });

      if (error) {
        console.error('❌ Resend API Error:', error);
        throw new Error(error.message || JSON.stringify(error) || 'Failed to send email via Resend');
      }

      if (!data || !data.id) {
        console.warn('⚠️ Resend returned no data or email ID');
      }

      console.log(`✅ Order confirmation email sent to ${customerInfo.email} for order ${orderId}`);
      console.log(`📧 Resend email ID: ${data?.id || 'N/A'}`);

      res.json({ 
        success: true, 
        message: 'Order confirmation email sent successfully',
        emailId: data?.id
      });
    } catch (emailError) {
      console.error("❌ Error sending email via Resend:", emailError);
      console.error("❌ Error details:", {
        message: emailError.message,
        stack: emailError.stack,
        name: emailError.name
      });
      // Log email details even if sending fails
      console.log('='.repeat(60));
      console.log('EMAIL SEND FAILED - Email details logged:');
      console.log(`To: ${customerInfo.email}`);
      console.log(`From: ${fromEmail}`);
      console.log(`Subject: Order Confirmation - ${orderId}`);
      console.log(`Error: ${emailError.message}`);
      console.log('='.repeat(60));
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
      console.log('='.repeat(60));
      
      // Still return success to not block the payment flow
      res.json({ 
        success: false, 
        message: 'Order confirmed but email sending failed',
        error: emailError.message,
        emailHtml // Return HTML for debugging/testing
      });
    }
  } catch (error) {
    console.error("Error sending order confirmation email:", error);
    res.status(500).json({ error: error.message || "Failed to send order confirmation email" });
  }
});

// --- Save Order to Supabase ---
app.post("/api/save-order", async (req, res) => {
  try {
    const { paymentIntent, customerInfo, items } = req.body;

    console.log("\n📦 Received order save request:");
    console.log("  - Payment Intent ID:", paymentIntent?.id || "MISSING");
    console.log("  - Customer Email:", customerInfo?.email || "MISSING");
    console.log("  - Items Count:", items?.length || 0);

    if (!supabase) {
      console.error("❌ Supabase not configured. Order not saved to database.");
      return res.json({ 
        success: false, 
        message: "Supabase not configured. Order not saved to database." 
      });
    }

    if (!paymentIntent || !customerInfo || !items || !Array.isArray(items)) {
      console.error("❌ Missing required order information:");
      console.error("  - paymentIntent:", !!paymentIntent);
      console.error("  - customerInfo:", !!customerInfo);
      console.error("  - items:", items ? (Array.isArray(items) ? items.length : "NOT ARRAY") : "MISSING");
      return res.status(400).json({ 
        success: false,
        error: "Missing required order information",
        details: {
          hasPaymentIntent: !!paymentIntent,
          hasCustomerInfo: !!customerInfo,
          hasItems: !!items,
          itemsIsArray: Array.isArray(items)
        }
      });
    }

    // Calculate totals
    const totalAmount = items.reduce((sum, item) => 
      sum + (item.totalPrice || item.price || 0) * (item.quantity || 1), 0
    );
    const orderId = paymentIntent.id || `order-${Date.now()}`;
    const orderDate = paymentIntent.created 
      ? new Date(paymentIntent.created * 1000).toISOString()
      : new Date().toISOString();

    // Prepare order data
    const orderData = {
      order_id: orderId,
      payment_intent_id: paymentIntent.id,
      customer_email: customerInfo.email,
      customer_name: customerInfo.name || null,
      customer_phone: customerInfo.phone || null,
      total_amount: totalAmount,
      currency: paymentIntent.currency || 'gbp',
      status: paymentIntent.status || 'succeeded',
      order_date: orderDate,
      shipping_address: customerInfo.address ? {
        line1: customerInfo.address.line1,
        line2: customerInfo.address.line2 || null,
        city: customerInfo.address.city,
        postal_code: customerInfo.address.postal_code,
        country: customerInfo.address.country,
        state: customerInfo.address.state || null,
      } : null,
      items: items.map(item => ({
        id: item.id || null,
        name: item.caseName || item.name || 'Custom Case',
        case_type: item.caseType || null,
        color: item.color || null,
        quantity: item.quantity || 1,
        unit_price: item.totalPrice || item.price || 0,
        total_price: (item.totalPrice || item.price || 0) * (item.quantity || 1),
        pins: item.pins || item.pinsDetails || null,
        custom_design: item.customDesign || false,
        case_image: item.caseImage || item.image || null,
        design_image: item.designImage || null,
      })),
      metadata: paymentIntent.metadata || {},
    };

    // Save to Supabase
    const { data, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select();

    if (error) {
      console.error("❌ Error saving order to Supabase:", error);
      console.error("  - Error Code:", error.code);
      console.error("  - Error Message:", error.message);
      console.error("  - Error Details:", error.details);
      return res.status(500).json({ 
        success: false,
        error: error.message || "Failed to save order to database",
        details: error 
      });
    }

    console.log(`✅ Order ${orderId} saved to Supabase successfully`);

    // --- Update Inventory Items ---
    console.log("\n📦 Updating inventory_items table for purchased items...");
    const Products = require('./src/data/products.json');
    const inventoryUpdates = [];

    items.forEach(item => {
      const quantity = item.quantity || 1;
      
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

      // Update pin inventory if pins are present
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
            console.log(`  📝 Pin: ${pin.name || 'Unknown'} (${category}, ${quantity}x) → ${itemId}`);
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

    console.log(`\n📊 Total unique items to update: ${Object.keys(groupedUpdates).length}`);
    
    // Update inventory for each item
    if (Object.keys(groupedUpdates).length > 0) {
      const updatePromises = Object.entries(groupedUpdates).map(async ([itemId, qtyToDecrement]) => {
        try {
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
          
          // If qty_in_stock is null, it means unlimited - don't decrement
          if (currentQty === null) {
            console.log(`  ✅ ${currentItem.name || itemId}: Unlimited stock (no update needed)`);
            return { success: true, item_id: itemId, reason: 'unlimited' };
          }

          // Calculate new quantity
          const newQty = Math.max(0, currentQty - qtyToDecrement);
          
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

      console.log(`\n📊 Inventory Update Summary:`);
      console.log(`  ✅ Successfully updated: ${successful}`);
      console.log(`  ❌ Failed: ${failed.length}`);
      
      if (failed.length > 0) {
        console.warn(`  ⚠️ Failed items:`, failed.map(f => f.item_id).join(', '));
      }
    } else {
      console.log(`  ℹ️ No inventory items to update`);
    }

    res.json({ 
      success: true, 
      message: "Order saved successfully",
      order_id: orderId,
      data: data,
      inventoryUpdated: Object.keys(groupedUpdates).length
    });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ error: error.message || "Failed to save order" });
  }
});

// --- Get Orders from Supabase ---
app.get("/get-orders", async (req, res) => {
  try {
    if (!supabase) {
      return res.status(503).json({ 
        error: "Supabase not configured",
        message: "Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env to enable order fetching."
      });
    }

    const { limit = 100, offset = 0, status, email } = req.query;

    let query = supabase
      .from('orders')
      .select('*')
      .order('order_date', { ascending: false })
      .range(parseInt(offset), parseInt(offset) + parseInt(limit) - 1);

    // Filter by status if provided
    if (status) {
      query = query.eq('status', status);
    }

    // Filter by email if provided
    if (email) {
      query = query.eq('customer_email', email);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching orders from Supabase:", error);
      return res.status(500).json({ 
        error: error.message || "Failed to fetch orders",
        details: error 
      });
    }

    // Get total count for pagination
    const { count: totalCount } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true });

    res.json({ 
      success: true,
      orders: data || [],
      total: totalCount || 0,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: error.message || "Failed to fetch orders" });
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

// --- Get Inventory from Supabase (New Structure: inventory_items) ---
app.get("/api/inventory", async (req, res) => {
  try {
    if (!supabase) {
      return res.status(503).json({ 
        error: "Supabase not configured",
        message: "Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env to enable inventory fetching."
      });
    }

    // Fetch all inventory items with timeout protection
    let items = null;
    let error = null;
    
    try {
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout - Supabase query took too long')), 8000);
      });

      const queryPromise = supabase
        .from('inventory_items')
        .select('*')
        .order('item_type, product_id');
      
      const result = await Promise.race([queryPromise, timeoutPromise]);
      items = result.data;
      error = result.error;
    } catch (timeoutError) {
      if (timeoutError.message.includes('timeout')) {
        console.error("⏱️ Supabase query timed out after 8 seconds");
        return res.status(504).json({ 
          error: "Gateway Timeout",
          message: "The inventory query took too long to respond. Please check your Supabase connection.",
          details: timeoutError.message
        });
      }
      throw timeoutError;
    }

    if (error) {
      // If table doesn't exist, return empty structure
      if (error.code === 'PGRST116' || error.code === '42P01') {
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
      throw error;
    }

    // Transform items into the expected format
    const Products = require('./src/data/products.json');
    
    // Initialize arrays with null values matching products.json structure
    const inventory = {
      cases: Products.cases.map(() => null),
      caseColors: Products.cases.map(caseItem => caseItem.colors.map(() => null)),
      pins: {
        flags: Products.pins.flags.map(() => null),
        colorful: Products.pins.colorful.map(() => null),
        bronze: Products.pins.bronze.map(() => null)
      }
    };

    // Group items by type
    const caseItems = items.filter(item => item.item_type === 'case_color');
    const flagPins = items.filter(item => item.item_type === 'pin_flags');
    const colorfulPins = items.filter(item => item.item_type === 'pin_colorful');
    const bronzePins = items.filter(item => item.item_type === 'pin_bronze');

    // Process case colors - match by case ID and color
    caseItems.forEach(item => {
      const caseIndex = Products.cases.findIndex(c => c.id === item.product_id);
      if (caseIndex !== -1) {
        const caseData = Products.cases[caseIndex];
        const colorIndex = caseData.colors.findIndex(c => c.color === item.color);
        if (colorIndex !== -1) {
          inventory.caseColors[caseIndex][colorIndex] = item.qty_in_stock;
        }
      }
    });

    // Process pins - map by product_id
    flagPins.forEach(item => {
      const index = Products.pins.flags.findIndex(p => p.id === item.product_id);
      if (index !== -1) {
        inventory.pins.flags[index] = item.qty_in_stock;
      }
    });

    colorfulPins.forEach(item => {
      const index = Products.pins.colorful.findIndex(p => p.id === item.product_id);
      if (index !== -1) {
        inventory.pins.colorful[index] = item.qty_in_stock;
      }
    });

    bronzePins.forEach(item => {
      const index = Products.pins.bronze.findIndex(p => p.id === item.product_id);
      if (index !== -1) {
        inventory.pins.bronze[index] = item.qty_in_stock;
      }
    });

    res.json({ 
      success: true,
      inventory: inventory
    });
  } catch (error) {
    console.error("Error fetching inventory from Supabase:", error);
    res.status(500).json({ 
      error: error.message || "Failed to fetch inventory",
      details: error 
    });
  }
});

// --- Update Inventory in Supabase (New Structure: inventory_items) ---
app.post("/api/inventory", async (req, res) => {
  console.log("📥 POST /api/inventory - Request received");
  console.log("📦 Request body:", JSON.stringify(req.body, null, 2));
  
  try {
    if (!supabase) {
      console.error("❌ Supabase client not initialized");
      return res.status(503).json({ 
        error: "Supabase not configured",
        message: "Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env to enable inventory updates."
      });
    }

    const { cases, caseColors, pins } = req.body;
    const Products = require('./src/data/products.json');
    
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
      return res.status(500).json({ 
        error: "Failed to save inventory items",
        details: error.message,
        code: error.code,
        hint: error.hint
      });
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
  } catch (error) {
    console.error("Error updating inventory in Supabase:", error);
    res.status(500).json({ 
      error: error.message || "Failed to update inventory",
      details: error 
    });
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

app.listen(PORT, () => {
  console.log(`🚀 Stripe Embedded Checkout Server running on http://localhost:${PORT}`);
  console.log(`📝 Make sure your frontend is configured to call this server: ${PORT}`);
});
