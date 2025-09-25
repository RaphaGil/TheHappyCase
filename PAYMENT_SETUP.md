# Payment System Setup Guide

This guide will help you set up the payment system for TheHappyCase project using Stripe.

## 🚀 What's Included

The payment system includes:
- ✅ Cart management with React Context
- ✅ Stripe integration for secure payments
- ✅ Checkout form with customer information
- ✅ Payment success page with order details
- ✅ Responsive design with Tailwind CSS

## 📋 Prerequisites

1. **Stripe Account**: Sign up at [stripe.com](https://stripe.com)
2. **Node.js**: Version 14 or higher
3. **npm**: Comes with Node.js

## 🔧 Setup Instructions

### 1. Stripe Configuration

1. **Create a Stripe Account**:
   - Go to [stripe.com](https://stripe.com) and create an account
   - Complete the account verification process

2. **Get Your API Keys**:
   - In your Stripe Dashboard, go to "Developers" > "API keys"
   - Copy your **Publishable key** (starts with `pk_test_` for test mode)

3. **Environment Variables**:
   Create a `.env` file in your project root:
   ```env
   REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_key_here
   ```

### 2. Backend Setup (Required for Production)

The current implementation uses mock payment processing for demonstration. For production, you need a backend server.

**Recommended Backend Options**:
- **Node.js/Express**: Use Stripe's Node.js library
- **Next.js API Routes**: If migrating to Next.js
- **Firebase Functions**: Serverless backend
- **Vercel/Netlify Functions**: Serverless options

**Example Backend Endpoint** (Node.js/Express):
```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency, items, customerInfo } = req.body;
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in pence
      currency: currency,
      metadata: {
        items: JSON.stringify(items),
        customerInfo: JSON.stringify(customerInfo),
      },
    });
    
    res.json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### 3. Update Frontend for Production

Replace the mock API in `src/component/Checkout/index.jsx`:

```javascript
// Replace the mock API call with real backend call
const response = await fetch('/api/create-payment-intent', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    amount: Math.round(getTotalPrice() * 100),
    currency: 'gbp',
    items: cart,
    customerInfo,
  }),
});

const { client_secret } = await response.json();

// Use real Stripe confirmation
const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
  client_secret,
  {
    payment_method: {
      card: elements.getElement(CardElement),
      billing_details: {
        name: customerInfo.name,
        email: customerInfo.email,
        address: customerInfo.address,
      },
    },
  }
);
```

## 🧪 Testing

### Test Cards (Stripe Test Mode)
Use these test card numbers in development:

- **Successful Payment**: `4242 4242 4242 4242`
- **Declined Payment**: `4000 0000 0000 0002`
- **Requires Authentication**: `4000 0025 0000 3155`

Use any future expiry date (e.g., 12/25) and any 3-digit CVC.

### Testing the Flow
1. Go to `/CreateYours`
2. Design a custom case
3. Click "Add to Basket"
4. Go to `/cart` to view your basket
5. Click "Proceed to Checkout"
6. Fill in the checkout form
7. Use a test card number
8. Complete the payment

## 🎨 Customization

### Styling
The payment components use Tailwind CSS. You can customize:
- Colors in the checkout form
- Layout and spacing
- Typography and fonts

### Features to Add
- **Email Notifications**: Send order confirmations
- **Order Management**: Admin panel for managing orders
- **Inventory Tracking**: Track stock levels
- **Shipping Integration**: Calculate shipping costs
- **Tax Calculation**: Add tax calculation logic
- **Multiple Payment Methods**: Add PayPal, Apple Pay, etc.

## 🔒 Security Considerations

1. **Never expose secret keys** in frontend code
2. **Validate all inputs** on the backend
3. **Use HTTPS** in production
4. **Implement rate limiting** for API endpoints
5. **Store sensitive data** securely (use Stripe's secure storage)

## 📱 Mobile Optimization

The payment system is fully responsive and works on:
- ✅ Desktop computers
- ✅ Tablets
- ✅ Mobile phones

## 🆘 Troubleshooting

### Common Issues

1. **"Invalid API Key" Error**:
   - Check your `.env` file
   - Ensure you're using the correct publishable key
   - Verify the key is for the correct environment (test/live)

2. **Payment Form Not Loading**:
   - Check browser console for errors
   - Verify Stripe script is loading
   - Ensure you have internet connectivity

3. **CORS Errors**:
   - Configure your backend to allow frontend domain
   - Use proper CORS headers

### Getting Help

- **Stripe Documentation**: [stripe.com/docs](https://stripe.com/docs)
- **Stripe Support**: Available in your dashboard
- **React Stripe.js Docs**: [stripe.com/docs/stripe-js/react](https://stripe.com/docs/stripe-js/react)

## 🚀 Going Live

When ready for production:

1. **Switch to Live Mode** in Stripe Dashboard
2. **Update API Keys** to live keys
3. **Set up Webhooks** for payment confirmations
4. **Test thoroughly** with real cards (small amounts)
5. **Configure SSL** certificate
6. **Set up monitoring** and logging

---

**Note**: This is a demonstration setup. For production use, ensure you follow all security best practices and comply with PCI DSS requirements.
