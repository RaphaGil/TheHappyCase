import Products from '../../../data/products.json';

/**
 * Get products with quantities merged from localStorage (Supabase inventory)
 */
export const getProductsWithQuantities = () => {
  const savedQuantities = localStorage.getItem('productQuantities');
  if (!savedQuantities) return Products;
  
  try {
    const quantities = JSON.parse(savedQuantities);
    const mergedProducts = { ...Products };
    
    // Merge pin quantities if they exist
    if (quantities.pins) {
      mergedProducts.pins = {
        ...mergedProducts.pins,
        flags: mergedProducts.pins?.flags?.map((pin, index) => ({
          ...pin,
          quantity: quantities.pins.flags?.[index] !== undefined 
            ? quantities.pins.flags[index] 
            : pin.quantity
        })) || [],
        colorful: mergedProducts.pins?.colorful?.map((pin, index) => ({
          ...pin,
          quantity: quantities.pins.colorful?.[index] !== undefined 
            ? quantities.pins.colorful[index] 
            : pin.quantity
        })) || [],
        bronze: mergedProducts.pins?.bronze?.map((pin, index) => ({
          ...pin,
          quantity: quantities.pins.bronze?.[index] !== undefined 
            ? quantities.pins.bronze[index] 
            : pin.quantity
        })) || []
      };
    }
    
    return mergedProducts;
  } catch (error) {
    console.error('Error loading saved quantities:', error);
    return Products;
  }
};

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






