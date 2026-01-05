/**
 * Image Path Utility
 * 
 * Normalizes image paths to work in both development and production.
 * 
 * Since the app is deployed at root (homepage: "."), we always
 * remove the /TheHappyCase/ prefix to use /images/... paths.
 * This is especially important for Safari compatibility.
 */

/**
 * Normalize an image path to work in the current environment
 * @param {string} imagePath - Image path (may include /TheHappyCase/ prefix)
 * @returns {string} Normalized image path for current environment
 */
export const normalizeImagePath = (imagePath) => {
  if (!imagePath) return imagePath;
  
  // Don't normalize data URLs (base64 images) - return as-is
  if (imagePath.startsWith('data:image/') || imagePath.startsWith('data:application/')) {
    return imagePath;
  }
  
  // Don't normalize external URLs - return as-is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Always remove /TheHappyCase/ prefix if present
  // This works for both development and production (root deployment)
  // Safari is stricter about paths, so normalization is important
  let normalizedPath = imagePath.replace(/^\/TheHappyCase\//, '/');
  
  // For Safari compatibility: ensure path is properly formatted
  // Remove any double slashes and ensure proper encoding
  normalizedPath = normalizedPath.replace(/\/+/g, '/');
  
  // Handle base URL for Vite
  // BASE_URL will be '/' for root deployment, './' for relative, or '/subdir/' for subdirectory
  const baseUrl = import.meta.env.BASE_URL || '/';
  
  // If path starts with /, handle based on base URL
  if (normalizedPath.startsWith('/')) {
    // If base URL is './' or '.', we need relative paths in production
    if ((baseUrl === './' || baseUrl === '.') && import.meta.env.PROD) {
      // Convert absolute path to relative by removing leading slash
      return normalizedPath.substring(1);
    }
    // If base URL is set and not '/' or './', prepend it
    else if (baseUrl && baseUrl !== '/' && baseUrl !== './' && baseUrl !== '.') {
      const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
      // Avoid double prefixing
      if (!normalizedPath.startsWith(cleanBaseUrl)) {
        return `${cleanBaseUrl}${normalizedPath}`;
      }
    }
    // For root deployment (base: '/'), return path as-is
    return normalizedPath;
  }
  
  return normalizedPath;
};

/**
 * Get the base path for images based on environment
 * @returns {string} Base path for images
 */
export const getImageBasePath = () => {
  const isDevelopment = import.meta.env.DEV;
  const publicUrl = import.meta.env.BASE_URL || '';
  
  if (isDevelopment) {
    return '';
  }
  
  return publicUrl;
};

