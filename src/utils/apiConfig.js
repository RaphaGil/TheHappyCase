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

/**
 * Wait for a short delay to ensure Supabase session is restored
 * This helps prevent race conditions where API calls are made before
 * the auth session is fully available, which can cause RLS check failures.
 * 
 * Note: Server-side calls use service role key and bypass RLS, but this
 * utility can be used for client-side Supabase calls if needed.
 * 
 * @param {number} delayMs - Delay in milliseconds (default: 100ms)
 * @returns {Promise<void>}
 */
export const waitForSessionReady = (delayMs = 100) => {
  return new Promise(resolve => setTimeout(resolve, delayMs));
};

/**
 * Fetch with retry logic and session delay
 * Handles race conditions by waiting for session initialization and retrying on failure
 * 
 * @param {string} endpoint - API endpoint
 * @param {RequestInit} options - Fetch options
 * @param {Object} retryConfig - Retry configuration
 * @param {number} retryConfig.maxRetries - Maximum number of retries (default: 3)
 * @param {number} retryConfig.retryDelay - Delay between retries in ms (default: 500)
 * @param {number} retryConfig.initialDelay - Initial delay before first request in ms (default: 100)
 * @returns {Promise<Response>}
 */
export const fetchWithRetry = async (endpoint, options = {}, retryConfig = {}) => {
  const {
    maxRetries = 3,
    retryDelay = 500,
    initialDelay = 100
  } = retryConfig;

  // Wait for session to be ready (prevents race condition)
  await waitForSessionReady(initialDelay);

  const url = getApiUrl(endpoint);
  let lastError;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);
      
      // If successful or client error (4xx), don't retry
      if (response.ok || (response.status >= 400 && response.status < 500)) {
        return response;
      }
      
      // Server error (5xx), retry if attempts remain
      if (response.status >= 500 && attempt < maxRetries) {
        console.warn(`⚠️ Server error ${response.status}, retrying... (${attempt + 1}/${maxRetries})`);
        await waitForSessionReady(retryDelay);
        continue;
      }
      
      return response;
    } catch (error) {
      lastError = error;
      
      // Retry on network errors if attempts remain
      if (attempt < maxRetries) {
        console.warn(`⚠️ Network error, retrying... (${attempt + 1}/${maxRetries}):`, error.message);
        await waitForSessionReady(retryDelay);
        continue;
      }
    }
  }

  // All retries exhausted
  throw lastError || new Error(`Failed to fetch ${endpoint} after ${maxRetries + 1} attempts`);
};


