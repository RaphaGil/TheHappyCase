# Stripe Checkout Backend Server

This server handles Stripe Checkout Session creation for your React app.

## Setup Instructions

### 1. Install Dependencies

```bash
npm install express stripe cors dotenv
```

### 2. Environment Variables

Create a `.env` file in the root directory (or add to existing `.env`):

```env
# Stripe Secret Key (Backend)
STRIPE_SECRET_KEY=sk_test_your_secret_key_here

# Frontend URL (for CORS and redirect URLs)
FRONTEND_URL=http://localhost:3000

# Server Port (optional, defaults to 3001)
PORT=3001
```

### 3. Get Your Stripe Secret Key

1. Go to https://dashboard.stripe.com/apikeys
2. Make sure you're in **Test mode**
3. Copy your **Secret key** (starts with `sk_test_`)
4. Add it to your `.env` file

### 4. Run the Server

```bash
node server.js
```

The server will start on `http://localhost:3001`

### 5. Update Frontend to Use Backend

The checkout component already calls `/create-checkout-session`. You have two options:

**Option A: Use Proxy (Recommended for Development)**

Add to `package.json`:
```json
{
  "proxy": "http://localhost:3001"
}
```

Then restart your React dev server.

**Option B: Update Frontend Fetch URL**

Update `src/pages/CheckoutStripe/index.jsx` to use full URL:
```javascript
return fetch("http://localhost:3001/create-checkout-session", {
  // ...
});
```

## Endpoints

- `POST /create-checkout-session` - Creates a Stripe Checkout Session
- `GET /session-status?session_id=xxx` - Gets checkout session status
- `GET /health` - Health check endpoint

## Testing

1. Start the backend server: `node server.js`
2. Start your React app: `npm start`
3. Add items to cart
4. Click checkout
5. Use Stripe test card: `4242 4242 4242 4242`
6. Complete the payment

## Production Deployment

For production:
1. Set `FRONTEND_URL` to your production domain
2. Use Stripe live keys (`sk_live_...`)
3. Deploy backend server (Heroku, Vercel, Railway, etc.)
4. Update frontend to use production backend URL

