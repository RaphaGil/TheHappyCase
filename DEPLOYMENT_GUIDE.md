# Deployment Guide

This guide explains how to configure the frontend to connect to your backend server in production.

## Problem

The proxy configuration in `setupProxy.js` only works in **development mode**. When your React app is deployed (e.g., to GitHub Pages), the proxy doesn't work because it's a static site with no server-side routing.

## Solution

The app now uses an API configuration system that automatically detects the environment and uses the correct backend URL.

### Development Mode
- Uses relative paths (e.g., `/api/inventory`)
- Proxy in `setupProxy.js` redirects to `http://localhost:3001`
- No configuration needed

### Production Mode
- Needs the full backend server URL
- Configured via environment variable or code

## Setting Up Production Backend URL

### Option 1: Environment Variable (Recommended)

Set the `REACT_APP_API_URL` environment variable before building:

```bash
# Example for Heroku
REACT_APP_API_URL=https://your-app.herokuapp.com npm run build

# Example for Railway
REACT_APP_API_URL=https://your-app.railway.app npm run build

# Example for Render
REACT_APP_API_URL=https://your-app.onrender.com npm run build
```

### Option 2: Update Code Directly

Edit `src/utils/apiConfig.js` and set the `PRODUCTION_API_URL` constant:

```javascript
const PRODUCTION_API_URL = 'https://your-backend-url.com';
```

### Option 3: GitHub Actions / CI/CD

If you're using GitHub Actions or another CI/CD service, add the environment variable to your workflow:

```yaml
env:
  REACT_APP_API_URL: https://your-backend-url.com
```

## Backend Server Setup

### 1. Deploy Your Backend Server

Deploy `server.js` to a hosting service that supports Node.js:
- **Heroku**: Free tier available
- **Railway**: Easy deployment
- **Render**: Free tier available
- **Vercel**: Serverless functions
- **DigitalOcean**: App Platform

### 2. Configure CORS

The backend server (`server.js`) has been updated to allow requests from:
- `https://raphagil.github.io` (your GitHub Pages domain)
- Any origin in development

If you change your frontend domain, update the `PRODUCTION_FRONTEND_URL` in `server.js`.

### 3. Set Environment Variables on Backend

Make sure your backend server has these environment variables set:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `FRONTEND_URL` (optional, defaults to GitHub Pages URL)

## Testing

### Local Testing (Production Build)

1. Build the production version:
   ```bash
   REACT_APP_API_URL=http://localhost:3001 npm run build
   ```

2. Serve the build folder:
   ```bash
   npx serve -s build
   ```

3. Start your backend server:
   ```bash
   npm run server
   ```

4. Visit `http://localhost:3000` (or the port serve uses)

### Production Testing

1. Deploy your backend server
2. Set `REACT_APP_API_URL` to your backend URL
3. Build and deploy your frontend
4. Test API calls in the browser console

## Troubleshooting

### Error: "Server returned non-JSON response"

This means the frontend can't reach your backend server. Check:

1. **Backend URL is correct**: Verify `REACT_APP_API_URL` matches your deployed backend
2. **Backend is running**: Check that your backend server is online
3. **CORS is configured**: Verify your backend allows requests from your frontend domain
4. **Network issues**: Check browser console for CORS errors

### Error: "CORS blocked origin"

Your backend is blocking requests from your frontend. Update `server.js` to allow your frontend domain.

### API calls work in development but not in production

- Make sure you set `REACT_APP_API_URL` before running `npm run build`
- Environment variables must start with `REACT_APP_` to be available in React
- Rebuild your app after changing the environment variable

## Files Modified

- `src/utils/apiConfig.js` - New file for API URL configuration
- `src/pages/Dashboard/index.jsx` - Updated to use API config
- `src/utils/inventory.js` - Updated to use API config
- `src/utils/mockPaymentAPI.js` - Updated to use API config
- `src/pages/PaymentSuccess/index.jsx` - Updated to use API config
- `server.js` - Updated CORS to allow production frontend

## Next Steps

1. Deploy your backend server to a hosting service
2. Set `REACT_APP_API_URL` environment variable
3. Rebuild your frontend: `npm run build`
4. Deploy the build folder to GitHub Pages
5. Test the deployed site










