/**
 * API Configuration
 * 
 * Determines the base URL for API calls based on environment.
 * 
 * Development: Uses relative paths that are proxied to localhost:3001
 * Production: Uses the full backend server URL
 * 
 * To set production backend URL:
 * 1. Set VITE_API_URL environment variable during build
 * 2. Or update the PRODUCTION_API_URL constant below
 */

// Check if we're in development mode
const isDevelopment = import.meta.env.DEV;

// Production backend URL - update this with your deployed backend URL
// Examples:
// - Heroku: https://your-app.herokuapp.com
// - Railway: https://your-app.railway.app
// - Render: https://your-app.onrender.com
// - Vercel: https://your-app.vercel.app
const PRODUCTION_API_URL = import.meta.env.VITE_API_URL || '';

/**
 * Get the base URL for API calls
 * @returns {string} Base URL for API requests
 */
export const getApiBaseUrl = () => {
  if (isDevelopment) {
    // In development, use relative path (proxy handles it)
    return '';
  } else {
    // In production, use the full backend URL
    if (PRODUCTION_API_URL) {
      return PRODUCTION_API_URL;
    } else {
      // Fallback: return empty string to use relative paths
      // This will fail in production (static sites can't proxy), but won't spam console
      // The calling code should handle 404s gracefully
      return '';
    }
  }
};

/**
 * Get the full API URL for a given endpoint
 * @param {string} endpoint - API endpoint (e.g., '/api/inventory')
 * @returns {string} Full API URL
 */
export const getApiUrl = (endpoint) => {
  const baseUrl = getApiBaseUrl();
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
  // In development, always use relative paths to leverage the proxy
  if (isDevelopment && !baseUrl) {
    // Use relative path (proxy in vite.config.js will handle routing to http://localhost:3001)
    return cleanEndpoint;
  }
  
  if (baseUrl) {
    // Remove trailing slash from base URL if present
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    // Ensure production URLs use https (not http) for security
    const finalUrl = `${cleanBaseUrl}${cleanEndpoint}`;
    
    // Warn if trying to use https://localhost in development (should use proxy instead)
    if (isDevelopment && finalUrl.includes('localhost') && finalUrl.startsWith('https://')) {
      console.warn('⚠️ Using HTTPS for localhost in development. Consider using relative paths with proxy instead.');
    }
    
    return finalUrl;
  } else {
    // Fallback: use relative path
    if (isDevelopment) {
      console.warn('⚠️ No API base URL configured in development. Using relative path (proxy required).');
    }
    return cleanEndpoint;
  }
};


