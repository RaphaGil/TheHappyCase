/**
 * API Configuration
 * 
 * Determines the base URL for API calls based on environment.
 * 
 * Development: Uses Netlify Functions (relative paths - Netlify Dev handles routing)
 * Production: Uses Netlify Functions (relative paths - Netlify routes /api/* to functions)
 * 
 * To override and use external API in production:
 * Set VITE_API_URL environment variable during build (e.g., VITE_API_URL=https://api.thehappycase.store)
 * 
 * Netlify Functions:
 * - Development: Use relative paths (e.g., '/api/create-payment-intent')
 *   Netlify Dev will route to http://localhost:8888/.netlify/functions/...
 * - Production: Use relative paths (e.g., '/api/create-payment-intent')
 *   Netlify will route /api/* to /.netlify/functions/* automatically
 */

// API URL based on environment
// Use empty string for relative paths (Netlify Functions) unless VITE_API_URL is explicitly set
// This allows Netlify to route /api/* requests to the appropriate Netlify Functions
const API_URL = import.meta.env.VITE_API_URL || '';

/**
 * Get the base URL for API calls
 * @returns {string} Base URL for API requests (empty string in dev for Netlify Functions)
 */
export const getApiBaseUrl = () => {
  return API_URL;
};

/**
 * Get the full API URL for a given endpoint
 * @param {string} endpoint - API endpoint (e.g., '/api/inventory' or 'api/inventory')
 * @returns {string} Full API URL or relative path for Netlify Functions
 */
export const getApiUrl = (endpoint) => {
  // Ensure endpoint starts with /
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
  // In development mode, always use relative paths so Vite proxy works
  // This allows Vite dev server to proxy /api/* requests to Express server on port 3001
  const isDevelopment = import.meta.env.DEV || import.meta.env.MODE === 'development';
  
  if (isDevelopment) {
    // Use relative path - Vite proxy will handle routing to Express server
    return cleanEndpoint;
  }
  
  // In production, use API_URL if set, otherwise use relative paths for Netlify Functions
  if (!API_URL) {
    return cleanEndpoint;
  }
  
  // In production with API_URL set, combine base URL with endpoint
  return `${API_URL}${cleanEndpoint}`;
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


