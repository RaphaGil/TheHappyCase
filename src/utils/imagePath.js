/**
 * Image Path Utility
 * 
 * Normalizes image paths to work in both development and production.
 * 
 * Since the app is deployed to Netlify at root (homepage: "."), we always
 * remove the /TheHappyCase/ prefix to use /images/... paths.
 */

/**
 * Normalize an image path to work in the current environment
 * @param {string} imagePath - Image path (may include /TheHappyCase/ prefix)
 * @returns {string} Normalized image path for current environment
 */
export const normalizeImagePath = (imagePath) => {
  if (!imagePath) return imagePath;
  
  // Always remove /TheHappyCase/ prefix if present
  // This works for both development and production (Netlify root deployment)
  let normalizedPath = imagePath.replace(/^\/TheHappyCase\//, '/');
  
  // Support PUBLIC_URL if set (for custom base paths)
  const publicUrl = process.env.PUBLIC_URL || '';
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
  const isDevelopment = process.env.NODE_ENV === 'development';
  const publicUrl = process.env.PUBLIC_URL || '';
  
  if (isDevelopment) {
    return '';
  }
  
  return publicUrl;
};

