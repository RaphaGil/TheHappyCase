import { getProductsWithQuantities } from '../shared/products';

// Re-export for backward compatibility
export { getProductsWithQuantities };

/**
 * Get charm price based on charm type
 * @param {Object} charm - The charm object
 * @param {string} charmType - 'bronze', 'colorful', or 'flags'
 * @returns {number} - Price in pounds
 */
export const getCharmPrice = (charm, charmType) => {
  // If charm has a price property, use it
  if (charm.price !== undefined && charm.price !== null) {
    return charm.price;
  }
  
  // Otherwise, use default prices based on type
  if (charmType === 'bronze') {
    return 1.50;
  } else if (charmType === 'colorful' || charmType === 'flags') {
    return 2.00;
  }
  
  // Default fallback
  return 2.00;
};

/**
 * Get charm category string for cart/inventory tracking
 * @param {string} charmType - 'bronze', 'colorful', or 'flags'
 * @returns {string} - Category string
 */
export const getCharmCategory = (charmType) => {
  return charmType || 'colorful';
};

/**
 * Get formatted charm name
 * @param {string} name - The charm name
 * @returns {string} - Formatted name
 */
export const getCharmName = (name) => {
  if (!name) return 'Charm';
  
  // Remove common suffixes if needed
  let formattedName = name;
  formattedName = formattedName.replace(/\s*-\s*(Flag|Colorful Charm|Bronze Charm)$/i, '');
  formattedName = formattedName.replace(/\s+Flag$/i, '');
  
  return formattedName.trim();
};








