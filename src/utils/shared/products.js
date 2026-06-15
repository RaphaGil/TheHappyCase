import Products from '../../data/products.json';
import { getCachedInventory } from '../inventory';

const getPinQuantityFromCache = (categoryKey, pinId, quantities) => {
  if (!pinId || !quantities?.pins?.[categoryKey] || !Products.pins?.[categoryKey]) {
    return undefined;
  }

  const pinIndex = Products.pins[categoryKey].findIndex((pin) => pin.id === pinId);
  if (pinIndex === -1) return undefined;

  return quantities.pins[categoryKey][pinIndex];
};

const mergePinQuantities = (pins, categoryKey, quantities) =>
  (pins || []).map((pin) => ({
    ...pin,
    quantity:
      getPinQuantityFromCache(categoryKey, pin.id, quantities) ??
      pin.quantity,
  }));

/**
 * Get products with quantities merged from Supabase inventory (in-memory cache)
 * This is a shared utility that handles both cases and charms to avoid duplication
 */
export const getProductsWithQuantities = () => {
  const quantities = getCachedInventory();
  if (!quantities) return Products;
  
  try {
    const mergedProducts = { ...Products };
    
    // Merge case quantities and color quantities
    if (quantities.cases) {
      mergedProducts.cases = mergedProducts.cases.map((caseItem, index) => {
        const updatedCase = {
          ...caseItem,
          quantity: quantities.cases[index] !== undefined ? quantities.cases[index] : caseItem.quantity
        };
        
        // Merge color quantities if they exist
        if (quantities.caseColors && quantities.caseColors[index]) {
          updatedCase.colors = updatedCase.colors.map((colorItem, colorIndex) => ({
            ...colorItem,
            quantity: quantities.caseColors[index][colorIndex] !== undefined 
              ? quantities.caseColors[index][colorIndex] 
              : colorItem.quantity
          }));
        }
        
        return updatedCase;
      });
    }
    
    // Merge pin quantities if they exist
    if (quantities.pins) {
      mergedProducts.pins = {
        ...mergedProducts.pins,
        flags: mergePinQuantities(mergedProducts.pins?.flags, 'flags', quantities),
        colorful: mergePinQuantities(mergedProducts.pins?.colorful, 'colorful', quantities),
        bronze: mergePinQuantities(mergedProducts.pins?.bronze, 'bronze', quantities),
      };
    }
    
    return mergedProducts;
  } catch (error) {
    console.error('Error loading saved quantities:', error);
    return Products;
  }
};

// Export Products directly for cases where the raw data is needed
export { Products };
