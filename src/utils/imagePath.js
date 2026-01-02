/**
 * Image Path Utility
 * 
 * Normalizes image paths to work in both development and production.
 * 
 * In development: `/images/...`
 * In production: Uses the path as-is (for GitHub Pages subdirectory support)
 */

/**
 * Normalize an image path to work in the current environment
 * @param {string} imagePath - Image path (may include /TheHappyCase/ prefix)
 * @returns {string} Normalized image path for current environment
 */
export const normalizeImagePath = (imagePath) => {
  if (!imagePath) return imagePath;
  
  // In development, remove /TheHappyCase/ prefix if present
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  if (isDevelopment) {
    // Remove /TheHappyCase/ prefix if it exists
    return imagePath.replace(/^\/TheHappyCase\//, '/');
  }
  
  // In production, use path as-is (for GitHub Pages subdirectory support)
  // But also support PUBLIC_URL if set
  const publicUrl = process.env.PUBLIC_URL || '';
  if (publicUrl && imagePath.startsWith('/')) {
    return `${publicUrl}${imagePath}`;
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

