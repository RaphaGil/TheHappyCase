import Products from '../../../data/products.json';

/**
 * Get products with quantities from localStorage (includes charms)
 */
export const getProductsWithQuantities = () => {
  const savedQuantities = localStorage.getItem('productQuantities');
  if (!savedQuantities) return Products;
  
  try {
    const quantities = JSON.parse(savedQuantities);
    const mergedProducts = { ...Products };
    
    // Merge charm quantities
    if (quantities.pins) {
      ['flags', 'colorful', 'bronze'].forEach(category => {
        if (quantities.pins[category] && mergedProducts.pins[category]) {
          mergedProducts.pins[category] = mergedProducts.pins[category].map((charm, index) => ({
            ...charm,
            quantity: quantities.pins[category][index] !== undefined 
              ? quantities.pins[category][index] 
              : charm.quantity
          }));
        }
      });
    }
    
    return mergedProducts;
  } catch (error) {
    console.error('Error loading saved quantities:', error);
    return Products;
  }
};

/**
 * Get charm price based on charm type
 */
export const getCharmPrice = (charm, charmType) => {
  if (charmType === 'bronze') return charm.price || 1.0;
  return charm.price || 2.0;
};

/**
 * Get charm category from charm type
 */
export const getCharmCategory = (charmType) => {
  if (charmType === 'colorful') return 'colorful';
  if (charmType === 'bronze') return 'bronze';
  if (charmType === 'flags') return 'flags';
  return 'colorful';
};

/**
 * Clean charm name (remove suffixes)
 */
export const getCharmName = (charmName) => {
  let baseName = charmName || '';
  // Remove common suffixes
  baseName = baseName.replace(/\s*-\s*(Flag|Colorful Charm|Bronze Charm)$/i, '');
  baseName = baseName.replace(/\s+Flag$/i, '');
  return baseName.trim();
};


