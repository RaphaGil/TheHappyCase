# Stripe Payment Information Guide

## Overview
This document explains what information Stripe needs to process payments using the Payment Element.

## Payment Flow

### Step 1: Create Payment Intent (Backend)

**Required Information:**
1. **`amount`** (number) - **REQUIRED**
   - Amount in smallest currency unit
   - Example: £10.50 = `1050` (for GBP)
   - Example: $10.50 = `1050` (for USD)

2. **`currency`** (string) - **REQUIRED**
   - Three-letter ISO currency code (lowercase)
   - Examples: `'gbp'`, `'usd'`, `'eur'`, `'cad'`, `'aud'`

**Optional but Recommended:**
3. **`metadata`** (object)
   - Store order details, customer info, etc.
   - Useful for tracking and order fulfillment

4. **`description`** (string)
   - Description shown to customer on their statement

5. **`receipt_email`** (string)
   - Email address to automatically send receipt

6. **`shipping`** (object)
   - Shipping address if applicable
   - Required for physical products

7. **`automatic_payment_methods`** (object)
   - Enables multiple payment methods (cards, Apple Pay, Google Pay, etc.)

### Step 2: Frontend Receives Client Secret

The backend returns:
```json
{
  "client_secret": "pi_xxx_secret_xxx",
  "payment_intent_id": "pi_xxx"
}
```

### Step 3: Payment Element Collects Payment Details

The Stripe Payment Element automatically collects:
- **Card Information** (if paying by card):
  - Card number
  - Expiration date
  - CVC
  - Cardholder name (optional)

- **Billing Details** (configurable):
  - Name
  - Email
  - Address (line1, line2, city, postal_code, country, state)

- **Other Payment Methods** (if enabled):
  - Apple Pay
  - Google Pay
  - Link
  - Bank transfers
  - etc.

### Step 4: Confirm Payment (Frontend)

When user submits, the frontend calls:
```javascript
stripe.confirmPayment({
  elements,
  confirmParams: {
    return_url: 'https://yoursite.com/payment-success',
    payment_method_data: {
      billing_details: {
        name: customerInfo.name,
        email: customerInfo.email,
        address: customerInfo.address,
      },
    },
  },
  redirect: 'if_required',
});
```

## Current Implementation

### What We're Sending to Backend:
```javascript
{
  amount: 1050,              // £10.50 in pence
  currency: 'gbp',           // Currency code
  items: [...],             // Cart items array
  customerInfo: {           // Customer details
    email: 'customer@example.com',
    name: 'John Doe',
    address: {
      line1: '123 Main St',
      line2: 'Apt 4B',
      city: 'London',
      postal_code: 'SW1A 1AA',
      country: 'GB',
      state: '',
    }
  }
}
```

### What Stripe Needs (Minimum):
```javascript
{
  amount: 1050,      // REQUIRED
  currency: 'gbp',   // REQUIRED
}
```

### What Stripe Gets During Payment Confirmation:
- Payment method details (from Payment Element)
- Billing information (from form)
- Customer email (from form)
- Shipping address (if provided)

## Backend Implementation Example

### Node.js/Express:
```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency, items, customerInfo } = req.body;
    
    // Validate required fields
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Amount is required' });
    }
    
    if (!currency) {
      return res.status(400).json({ error: 'Currency is required' });
    }
    
    // Create Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,                    // REQUIRED
      currency: currency,                 // REQUIRED
      
      // Optional but recommended
      metadata: {
        items: JSON.stringify(items),
        customerInfo: JSON.stringify(customerInfo),
        orderId: `order_${Date.now()}`,
      },
      description: `Order for ${items.length} item(s)`,
      receipt_email: customerInfo?.email,
      shipping: customerInfo?.address ? {
        name: customerInfo.name,
        address: {
          line1: customerInfo.address.line1,
          line2: customerInfo.address.line2,
          city: customerInfo.address.city,
          postal_code: customerInfo.address.postal_code,
          country: customerInfo.address.country,
          state: customerInfo.address.state,
        },
      } : undefined,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    
    res.json({ 
      client_secret: paymentIntent.client_secret,
      payment_intent_id: paymentIntent.id,
    });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: error.message });
  }
});
```

### Python/Flask:
```python
import stripe
from flask import Flask, request, jsonify

stripe.api_key = os.getenv('STRIPE_SECRET_KEY')

@app.route('/api/create-payment-intent', methods=['POST'])
def create_payment_intent():
    try:
        data = request.json
        amount = data.get('amount')
        currency = data.get('currency', 'gbp')
        items = data.get('items', [])
        customer_info = data.get('customerInfo', {})
        
        # Validate
        if not amount or amount <= 0:
            return jsonify({'error': 'Amount is required'}), 400
        
        # Create Payment Intent
        intent = stripe.PaymentIntent.create(
            amount=amount,
            currency=currency,
            metadata={
                'items': json.dumps(items),
                'customerInfo': json.dumps(customer_info),
                'orderId': f'order_{int(time.time())}',
            },
            description=f'Order for {len(items)} item(s)',
            receipt_email=customer_info.get('email'),
            automatic_payment_methods={'enabled': True},
        )
        
        return jsonify({
            'client_secret': intent.client_secret,
            'payment_intent_id': intent.id,
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500
```

## Environment Variables Needed

### Backend (.env):
```
STRIPE_SECRET_KEY=sk_test_xxxxx  # Your Stripe secret key
```

### Frontend (.env):
```
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx  # Your Stripe publishable key
```

## Testing

### Test Card Numbers:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0025 0000 3155`

Use any future expiry date (e.g., 12/25) and any 3-digit CVC.

## Summary

**Minimum Required for Payment Intent:**
- ✅ `amount` (number)
- ✅ `currency` (string)

**Collected by Payment Element:**
- Payment method details (card, etc.)
- Billing information
- Customer email

**Recommended to Include:**
- Metadata (order details)
- Description
- Receipt email
- Shipping address (for physical products)

