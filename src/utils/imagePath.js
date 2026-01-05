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
  
  // Always remove /TheHappyCase/ prefix if present
  // This works for both development and production (root deployment)
  // Safari is stricter about paths, so normalization is important
  let normalizedPath = imagePath.replace(/^\/TheHappyCase\//, '/');
  
  // For Safari compatibility: ensure path is properly formatted
  // Remove any double slashes and ensure proper encoding
  normalizedPath = normalizedPath.replace(/\/+/g, '/');
  
  // Support PUBLIC_URL if set (for custom base paths)
  const publicUrl = import.meta.env.BASE_URL || '';
  if (publicUrl && normalizedPath.startsWith('/')) {
    // Remove trailing slash from publicUrl if present
    const cleanPublicUrl = publicUrl.endsWith('/') ? publicUrl.slice(0, -1) : publicUrl;
    return `${cleanPublicUrl}${normalizedPath}`;
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

