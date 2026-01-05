/**
 * Image Path Utility
 * 
 * Normalizes image paths to work in both development and production.
 * 
 * Development: Removes /TheHappyCase/ prefix to use /images/... paths
 * Production: Keeps original path (works with both /TheHappyCase/images/... and /images/...)
 */

/**
 * Normalize an image path to work in the current environment
 * @param {string} imagePath - Image path (may include /TheHappyCase/ prefix)
 * @returns {string} Normalized image path for current environment
 */
export const normalizeImagePath = (imagePath) => {
  if (!imagePath) return imagePath;
  
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  // In development, remove /TheHappyCase/ prefix to use /images/... paths
  // In production, keep the original path as it works correctly
  if (isDevelopment) {
    // Remove /TheHappyCase/ prefix if present for development
    return imagePath.replace(/^\/TheHappyCase\//, '/');
  }
  
  // In production, return the path as-is
  // This allows both /TheHappyCase/images/... and /images/... to work
  // Support PUBLIC_URL if set (for custom base paths)
  const publicUrl = process.env.PUBLIC_URL || '';
  if (publicUrl && imagePath.startsWith('/')) {
    // Remove trailing slash from publicUrl if present
    const cleanPublicUrl = publicUrl.endsWith('/') ? publicUrl.slice(0, -1) : publicUrl;
    return `${cleanPublicUrl}${imagePath}`;
  }
  
  return imagePath;
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

