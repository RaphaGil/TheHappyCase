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
    console.log('📞 Calling backend to create payment intent');
    console.log('   URL:', apiUrl);
    console.log('   Request payload:', {
      amount,
      currency,
      itemCount: Array.isArray(items) ? items.length : 0,
      hasCustomerInfo: !!customerInfo,
      customerEmail: customerInfo?.email || 'N/A'
    });
    
    const requestBody = {
      amount,
      currency,
      items,
      customerInfo,
    };
    
    console.log('   Full request body:', JSON.stringify(requestBody, null, 2));
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    console.log('📥 Response received:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      headers: Object.fromEntries(response.headers.entries())
    });

    if (!response.ok) {
      let errorBody;
      const contentType = response.headers.get('content-type');
      
      try {
        if (contentType && contentType.includes('application/json')) {
          errorBody = await response.json();
          console.error('❌ Backend error response (JSON):', {
            status: response.status,
            statusText: response.statusText,
            error: errorBody.error || errorBody.message || errorBody,
            fullBody: errorBody
          });
        } else {
          errorBody = await response.text();
          console.error('❌ Backend error response (text/plain):', {
            status: response.status,
            statusText: response.statusText,
            contentType: contentType,
            body: errorBody,
            bodyLength: errorBody.length,
            fullBody: errorBody // Log full body for debugging
          });
          
          // Try to parse as JSON if it looks like JSON
          try {
            const parsed = JSON.parse(errorBody);
            console.error('   Parsed text as JSON:', parsed);
            errorBody = parsed;
          } catch (e) {
            // Not JSON, keep as text
            console.error('   Response is plain text, not JSON');
          }
        }
      } catch (parseError) {
        console.error('❌ Failed to parse error response:', parseError);
        errorBody = 'Unable to parse error response';
      }
      
      const errorMessage = typeof errorBody === 'string' 
        ? errorBody.substring(0, 200)
        : (errorBody?.error || errorBody?.message || JSON.stringify(errorBody)).substring(0, 200);
      
      throw new Error(
        `Backend responded with ${response.status} ${response.statusText}: ${errorMessage}`
      );
    }

    const data = await response.json();
    console.log('✅ Backend response received:', { 
      hasClientSecret: !!data.clientSecret,
      keys: Object.keys(data),
      dataType: typeof data
    });

    if (!data.clientSecret) {
      console.error('❌ Backend response missing clientSecret');
      console.error('   Response data:', data);
      console.error('   Response keys:', Object.keys(data));
      throw new Error('Backend did not return a clientSecret');
    }

    console.log('✅ Payment intent created successfully');
    return {
      client_secret: data.clientSecret,
    };
  } catch (error) {
    console.error('❌ Failed to create payment intent via backend');
    console.error('   Error name:', error?.name);
    console.error('   Error message:', error?.message);
    console.error('   Error type:', error?.constructor?.name);
    
    // Check if it's a network error
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.error('   ⚠️ Network error detected - server may be down or unreachable');
      console.error('   Check if backend server is running on port 3001');
    }
    
    // Check if it's a 500 error
    if (error?.message?.includes('500')) {
      console.error('   ⚠️ Server 500 error detected');
      console.error('   This indicates a server-side error. Check server logs for details.');
    }
    
    console.error('   Full error:', error);
    if (error?.stack) {
      console.error('   Stack trace:', error.stack);
    }
    
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
