# Netlify Deployment Setup Guide

This guide explains how to configure your frontend and backend for Netlify deployment.

## Current Issue

The frontend is deployed to Netlify, but the backend server (`server.js`) is not deployed. This causes 404 errors when the app tries to fetch inventory data.

## Solution Options

### Option 1: Deploy Backend Separately (Recommended)

Deploy your backend server to a service that supports Node.js:

**Recommended Platforms:**
- **Render** (https://render.com) - Free tier available
- **Railway** (https://railway.app) - Easy deployment
- **Heroku** (https://heroku.com) - Paid plans only
- **Fly.io** (https://fly.io) - Good free tier

#### Steps:

1. **Deploy Backend Server:**
   - Push your code to GitHub
   - Connect to your hosting service
   - Set environment variables:
     - `SUPABASE_URL`
     - `SUPABASE_SERVICE_ROLE_KEY`
     - `STRIPE_SECRET_KEY`
     - `FRONTEND_URL=https://thehappycasestore.netlify.app`
   - Deploy the `server.js` file

2. **Get Your Backend URL:**
   - After deployment, you'll get a URL like: `https://your-app.onrender.com`

3. **Configure Netlify Build:**
   - Go to your Netlify site settings
   - Navigate to **Build & deploy** → **Environment**
   - Add environment variable:
     - **Key:** `REACT_APP_API_URL`
     - **Value:** `https://your-backend-url.com` (your deployed backend URL)

4. **Rebuild on Netlify:**
   - Go to **Deploys** tab
   - Click **Trigger deploy** → **Clear cache and deploy site**

### Option 2: Use Netlify Functions (Alternative)

If you want everything on Netlify, you can convert your Express server to Netlify Functions. This requires code changes.

### Option 3: Disable Backend Features (Temporary)

If you don't need real-time inventory or Stripe checkout right now, the app will work with localStorage fallback. The 404 warnings are now suppressed, so users won't see errors.

## Current Behavior

- ✅ App loads and works
- ✅ Images display correctly
- ⚠️ Inventory API returns 404 (silently handled)
- ✅ Falls back to localStorage for inventory data
- ⚠️ Stripe checkout won't work (requires backend)

## Quick Fix (Temporary)

If you just want to suppress the console warnings (already done):

The app now:
- Silently handles 404 errors from the inventory API
- Falls back to localStorage for inventory data
- Won't show console warnings for missing backend

## Full Fix (Production Ready)

1. Deploy backend server to Render/Railway/etc.
2. Set `REACT_APP_API_URL` in Netlify environment variables
3. Rebuild the site

## Testing Backend Connection

After deploying, test your backend:

```bash
# Test inventory endpoint
curl https://your-backend-url.com/api/inventory

# Should return JSON with inventory data
```

## CORS Configuration

Make sure your backend's `server.js` allows requests from Netlify:

```javascript
// In server.js, update allowedOrigins:
const allowedOrigins = [
  "https://thehappycasestore.netlify.app",
  "http://localhost:3000",
  // ... other origins
];
```

Then redeploy your backend server.

