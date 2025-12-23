// Backend server for Stripe Embedded Checkout
// Run with: node server.js
// Install dependencies: npm install express stripe cors dotenv nodemailer @supabase/supabase-js

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
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
      receipt_email: customerInfo?.email || undefined, // Stripe will send receipt automatically
      metadata: {
        item_count: Array.isArray(items) ? items.length : 0,
        customer_email: customerInfo?.email || "",
        customer_name: customerInfo?.name || "",
      },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: error.message || "Failed to create payment intent" });
  }
});

// --- Send Order Confirmation Email ---
app.post("/send-order-confirmation", async (req, res) => {
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

    // Configure email transporter
    // For production, use environment variables for email credentials
    // Options: Gmail, SendGrid, AWS SES, etc.
    let transporter;
    
    if (process.env.EMAIL_SERVICE === 'gmail' && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      // Gmail configuration
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS, // Use App Password for Gmail
        },
      });
    } else if (process.env.SENDGRID_API_KEY) {
      // SendGrid configuration
      transporter = nodemailer.createTransport({
        host: 'smtp.sendgrid.net',
        port: 587,
        secure: false,
        auth: {
          user: 'apikey',
          pass: process.env.SENDGRID_API_KEY,
        },
      });
    } else if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      // Custom SMTP configuration
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      // Development: Log email instead of sending
      console.log('='.repeat(60));
      console.log('ORDER CONFIRMATION EMAIL (Email service not configured)');
      console.log('='.repeat(60));
      console.log(`To: ${customerInfo.email}`);
      console.log(`Subject: Order Confirmation - ${orderId}`);
      console.log('---');
      console.log(`Order ID: ${orderId}`);
      console.log(`Order Date: ${orderDate}`);
      console.log(`Total: £${totalAmount.toFixed(2)}`);
      console.log(`Items: ${items?.length || 0}`);
      console.log('='.repeat(60));
      console.log('\nTo enable email sending, configure one of the following in your .env file:');
      console.log('1. Gmail: EMAIL_SERVICE=gmail, EMAIL_USER=your-email@gmail.com, EMAIL_PASS=your-app-password');
      console.log('2. SendGrid: SENDGRID_API_KEY=your-sendgrid-api-key');
      console.log('3. Custom SMTP: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE');
      console.log('='.repeat(60));

      return res.json({ 
        success: true, 
        message: 'Order confirmation email logged (email service not configured)',
        emailHtml // Return HTML for debugging/testing
      });
    }

    // Send email
    try {
      const fromEmail = process.env.FROM_EMAIL || process.env.EMAIL_USER || 'orders@thehappycase.com';
      
      await transporter.sendMail({
        from: `"The Happy Case" <${fromEmail}>`,
        to: customerInfo.email,
        subject: `Order Confirmation - ${orderId}`,
        html: emailHtml,
      });

      console.log(`✅ Order confirmation email sent to ${customerInfo.email} for order ${orderId}`);

      res.json({ 
        success: true, 
        message: 'Order confirmation email sent successfully'
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      // Log email details even if sending fails
      console.log('='.repeat(60));
      console.log('EMAIL SEND FAILED - Email details logged:');
      console.log(`To: ${customerInfo.email}`);
      console.log(`Subject: Order Confirmation - ${orderId}`);
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
app.post("/save-order", async (req, res) => {
  try {
    const { paymentIntent, customerInfo, items } = req.body;

    if (!supabase) {
      console.log("⚠️ Supabase not configured. Order not saved to database.");
      return res.json({ 
        success: false, 
        message: "Supabase not configured. Order not saved to database." 
      });
    }

    if (!paymentIntent || !customerInfo || !items || !Array.isArray(items)) {
      return res.status(400).json({ error: "Missing required order information" });
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
      console.error("Error saving order to Supabase:", error);
      return res.status(500).json({ 
        error: error.message || "Failed to save order to database",
        details: error 
      });
    }

    console.log(`✅ Order ${orderId} saved to Supabase successfully`);

    res.json({ 
      success: true, 
      message: "Order saved successfully",
      order_id: orderId,
      data: data 
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

    // Fetch all inventory items
    const { data: items, error } = await supabase
      .from('inventory_items')
      .select('*')
      .order('item_type, product_id');

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
  try {
    if (!supabase) {
      return res.status(503).json({ 
        error: "Supabase not configured",
        message: "Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env to enable inventory updates."
      });
    }

    const { cases, caseColors, pins } = req.body;
    const Products = require('./src/data/products.json');

    if (!cases && !caseColors && !pins) {
      return res.status(400).json({ error: "No inventory data provided" });
    }

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

    // Batch upsert all items with all correct information
    if (uniqueItems.length === 0) {
      return res.status(400).json({ error: "No items to update" });
    }

    // Use upsert to create or update items with all fields
    const { data, error } = await supabase
      .from('inventory_items')
      .upsert(uniqueItems, {
        onConflict: 'item_id',
        ignoreDuplicates: false, // Update existing items
      })
      .select();

    if (error) {
      console.error("Error upserting inventory items:", error);
      return res.status(500).json({ 
        error: "Failed to save inventory items",
        details: error.message 
      });
    }

    const successful = data ? data.length : 0;
    console.log(`✅ Upserted ${successful}/${uniqueItems.length} inventory items in Supabase with all correct information`);

    res.json({ 
      success: true,
      message: `Inventory saved successfully (${successful} items saved with all correct information)`,
      updatedCount: successful,
      totalItems: uniqueItems.length,
      inventory: data || []
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
