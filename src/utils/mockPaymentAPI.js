// Mock API for payment processing
// In a real application, this would be a backend server endpoint

/**
 * STRIPE PAYMENT INTENT - REQUIRED INFORMATION
 * 
 * To create a Stripe Payment Intent, you need:
 * 
 * REQUIRED FIELDS:
 * 1. amount (number) - Amount in smallest currency unit (e.g., pence for GBP, cents for USD)
 *    Example: £10.50 = 1050 (for GBP)
 * 
 * 2. currency (string) - Three-letter ISO currency code (lowercase)
 *    Examples: 'gbp', 'usd', 'eur', 'cad', 'aud'
 * 
 * OPTIONAL BUT RECOMMENDED FIELDS:
 * 3. metadata (object) - Additional data stored with the payment intent
 *    - items: Array of cart items
 *    - customerInfo: Customer details
 *    - orderId: Your internal order ID
 * 
 * 4. description (string) - Description of the payment (shown to customer)
 * 
 * 5. receipt_email (string) - Email to send receipt to
 * 
 * 6. shipping (object) - Shipping address (if applicable)
 *    {
 *      name: string,
 *      address: {
 *        line1: string,
 *        line2: string (optional),
 *        city: string,
 *        postal_code: string,
 *        country: string (ISO 2-letter code)
 *      }
 *    }
 * 
 * BACKEND IMPLEMENTATION EXAMPLE (Node.js/Express):
 * 
 * const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
 * 
 * app.post('/api/create-payment-intent', async (req, res) => {
 *   try {
 *     const { amount, currency, items, customerInfo } = req.body;
 *     
 *     const paymentIntent = await stripe.paymentIntents.create({
 *       amount: amount,                    // REQUIRED: in smallest currency unit
 *       currency: currency,                 // REQUIRED: 'gbp', 'usd', etc.
 *       metadata: {                         // OPTIONAL: but recommended
 *         items: JSON.stringify(items),
 *         customerInfo: JSON.stringify(customerInfo),
 *         orderId: `order_${Date.now()}`,
 *       },
 *       description: `Order for ${items.length} item(s)`, // OPTIONAL
 *       receipt_email: customerInfo.email,  // OPTIONAL: auto-send receipt
 *       shipping: customerInfo.address ? {  // OPTIONAL: if shipping required
 *         name: customerInfo.name,
 *         address: customerInfo.address,
 *       } : undefined,
 *       automatic_payment_methods: {        // RECOMMENDED: enables multiple payment methods
 *         enabled: true,
 *       },
 *     });
 *     
 *     res.json({ 
 *       client_secret: paymentIntent.client_secret,
 *       payment_intent_id: paymentIntent.id,
 *     });
 *   } catch (error) {
 *     res.status(500).json({ error: error.message });
 *   }
 * });
 */

import { getApiUrl } from './apiConfig';

export const createPaymentIntent = async (paymentData) => {
  const { amount, currency = 'gbp', items, customerInfo } = paymentData;

  if (!amount || amount <= 0) {
    throw new Error('Amount is required and must be greater than 0');
  }

  if (!currency) {
    throw new Error('Currency is required');
  }

  // Try to create a real Payment Intent via backend
  try {
    const apiUrl = getApiUrl('/api/create-payment-intent');
    console.log('📞 Calling backend to create payment intent:', apiUrl);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        currency,
        items,
        customerInfo,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('❌ Backend error response:', {
        status: response.status,
        statusText: response.statusText,
        body: errorBody.substring(0, 200) // First 200 chars
      });
      throw new Error(
        `Backend responded with ${response.status} ${response.statusText}: ${errorBody.substring(0, 100)}`
      );
    }

    const data = await response.json();
    console.log('✅ Backend response received:', { 
      hasClientSecret: !!data.clientSecret,
      keys: Object.keys(data)
    });

    if (!data.clientSecret) {
      console.error('❌ Backend response missing clientSecret:', data);
      throw new Error('Backend did not return a clientSecret');
    }

    console.log('✅ Payment intent created successfully');
    return {
      client_secret: data.clientSecret,
    };
  } catch (error) {
    console.error(
      '❌ Failed to create payment intent via backend. Falling back to mock client secret.',
      error
    );
    console.error('Error details:', {
      message: error.message,
      name: error.name,
      stack: error.stack?.substring(0, 200)
    });
    
    // Don't fall back to mock - throw the error so the user knows something is wrong
    throw new Error(
      `Failed to create payment intent: ${error.message}. Please ensure your backend server is running on port 3001.`
    );
  }

  // Removed fallback to mock - we should always use real payment intents
  // If we reach here, something went wrong and we should show an error
};

// Mock function to simulate successful payment
export const confirmMockPayment = async (paymentIntentId, amount) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    id: paymentIntentId,
    status: 'succeeded',
    created: Math.floor(Date.now() / 1000),
    amount: amount, // Use actual amount from payment data
    currency: 'gbp',
  };
};
