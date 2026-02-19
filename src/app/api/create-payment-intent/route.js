import Stripe from 'stripe';

/**
 * Next.js API Route for Creating Payment Intent
 * 
 * Creates a Stripe payment intent for checkout.
 * Requires STRIPE_SECRET_KEY in environment variables.
 */

// Helper function to get Stripe instance with validation
const getStripeInstance = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  
  // Validate key exists
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY environment variable is not set. Please configure it in environment variables.');
  }
  
  // Validate key format (should start with sk_test_ or sk_live_)
  if (!secretKey.startsWith('sk_test_') && !secretKey.startsWith('sk_live_')) {
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

// Helper to send JSON response
const sendResponse = (statusCode, body, headers = {}) => {
  return new Response(JSON.stringify(body), {
    status: statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      ...headers,
    },
  });
};

export async function POST(request) {
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return sendResponse(200, {});
  }

  try {
    // Initialize Stripe with validation
    const stripe = getStripeInstance();
    const body = await request.json();
    const { amount, currency, items, customerInfo } = body || {};

    // Validate required fields
    if (!amount || amount <= 0) {
      return sendResponse(400, {
        error: 'Amount is required and must be greater than 0',
      });
    }

    // Use currency from request or default to GBP
    const resolvedCurrency = (currency || 'gbp').toLowerCase();
    const roundedAmount = Math.round(amount);

    // Stripe minimum amounts by currency (in smallest currency unit)
    const minimumAmounts = {
      'gbp': 30,      // 30 pence = £0.30
      'eur': 50,      // 50 cents = €0.50
    };

    const minimumAmount = minimumAmounts[resolvedCurrency] || 30;

    if (roundedAmount < minimumAmount) {
      const currencySymbols = {
        'gbp': '£',
        'eur': '€',
      };
      const symbol = currencySymbols[resolvedCurrency] || resolvedCurrency.toUpperCase();
      const minDisplay = (minimumAmount / 100).toFixed(2);
      const currentDisplay = (roundedAmount / 100).toFixed(2);

      return sendResponse(400, {
        error: `Amount is too small. Minimum amount is ${symbol}${minDisplay}. Your amount is ${symbol}${currentDisplay}.`,
      });
    }

    // Build payment intent parameters
    const paymentIntentParams = {
      amount: roundedAmount,
      currency: resolvedCurrency,
      automatic_payment_methods: { enabled: true },
    };

    // Add metadata if items or customerInfo are provided
    // Note: Stripe metadata has a 500 character limit per value
    // We need to exclude large image data URLs and summarize items
    if (items || customerInfo) {
      paymentIntentParams.metadata = {};
      
      if (items && Array.isArray(items)) {
        // Create a summary of items without large image data
        const itemsSummary = items.map(item => ({
          id: item.id,
          name: item.name || item.caseName,
          type: item.type || item.caseType,
          quantity: item.quantity || 1,
          price: item.price || item.basePrice || item.totalPrice,
          // Exclude large image data URLs (designImage, caseImage, image)
          // Only include a flag indicating if custom design exists
          hasCustomDesign: !!item.customDesign,
          hasDesignImage: !!item.designImage,
          // Include color/category info if available
          color: item.color,
          category: item.category,
        }));
        
        // Stringify the summary (should be much smaller)
        const itemsJson = JSON.stringify(itemsSummary);
        
        // If still too large, truncate or use a more minimal summary
        if (itemsJson.length > 450) {
          // Use an even more minimal summary
          const minimalSummary = items.map(item => ({
            id: item.id,
            name: (item.name || item.caseName || '').substring(0, 50),
            qty: item.quantity || 1,
            price: item.price || item.basePrice || item.totalPrice,
          }));
          paymentIntentParams.metadata.items = JSON.stringify(minimalSummary).substring(0, 450);
        } else {
          paymentIntentParams.metadata.items = itemsJson;
        }
        
        paymentIntentParams.metadata.item_count = items.length.toString();
      }
      
      if (customerInfo) {
        // Store customer info without large data
        const customerSummary = {
          email: customerInfo.email || '',
          name: customerInfo.name || '',
          surname: customerInfo.surname || '',
          // Exclude address details from metadata (they're in shipping param)
        };
        const customerJson = JSON.stringify(customerSummary);
        if (customerJson.length <= 450) {
          paymentIntentParams.metadata.customerInfo = customerJson;
        } else {
          // Just store email and name if too large
          paymentIntentParams.metadata.customer_email = (customerInfo.email || '').substring(0, 100);
          paymentIntentParams.metadata.customer_name = ((customerInfo.name || '') + ' ' + (customerInfo.surname || '')).substring(0, 100);
        }
        
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
        name: customerInfo.name || 'Customer',
        address: {
          line1: customerInfo.address.line1 || '',
          line2: customerInfo.address.line2 || '',
          city: customerInfo.address.city || '',
          postal_code: customerInfo.address.postal_code || '',
          country: customerInfo.address.country || 'GB',
          state: customerInfo.address.state || '',
        },
      };
    }

    const paymentIntent = await stripe.paymentIntents.create(paymentIntentParams);

    return sendResponse(200, {
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.error('Error creating payment intent:', err);
    
    // Provide more helpful error messages
    let errorMessage = err.message || 'Failed to create payment intent';
    
    // Check for common Stripe API key errors
    if (err.message && err.message.includes('Invalid API Key')) {
      errorMessage = "Invalid Stripe API key. Please check your STRIPE_SECRET_KEY in environment variables. Make sure it starts with 'sk_test_' (test mode) or 'sk_live_' (live mode) and has no extra spaces or characters.";
    } else if (err.message && err.message.includes('No API key provided')) {
      errorMessage = 'Stripe API key is missing. Please set STRIPE_SECRET_KEY in environment variables.';
    } else if (err.message && err.message.includes('STRIPE_SECRET_KEY')) {
      // Keep the validation error message as-is
      errorMessage = err.message;
    }
    
    return sendResponse(500, { error: errorMessage });
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return sendResponse(200, {});
}
