/**
 * API Configuration
 * 
 * Determines the base URL for API calls based on environment.
 * 
 * Development: Uses relative paths that are proxied to localhost:3001
 * Production: Uses the full backend server URL
 * 
 * To set production backend URL:
 * 1. Set REACT_APP_API_URL environment variable during build
 * 2. Or update the PRODUCTION_API_URL constant below
 */

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV === 'development';

// Production backend URL - update this with your deployed backend URL
// Examples:
// - Heroku: https://your-app.herokuapp.com
// - Railway: https://your-app.railway.app
// - Render: https://your-app.onrender.com
// - Vercel: https://your-app.vercel.app
const PRODUCTION_API_URL = process.env.REACT_APP_API_URL || '';

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
      // Fallback: try to detect from window location (for custom domains)
      // Or return empty string to use relative paths (won't work on GitHub Pages)
      console.warn('⚠️ REACT_APP_API_URL not set. API calls may fail in production.');
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
  
  if (baseUrl) {
    // Remove trailing slash from base URL if present
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    return `${cleanBaseUrl}${cleanEndpoint}`;
  } else {
    // Use relative path (works in dev with proxy, won't work in production)
    return cleanEndpoint;
  }
};

export default {
  getApiBaseUrl,
  getApiUrl,
};

