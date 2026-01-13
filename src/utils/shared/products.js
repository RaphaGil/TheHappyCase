import Products from '../../data/products.json';

/**
 * Get products with quantities merged from localStorage (Supabase inventory)
 * This is a shared utility that handles both cases and charms to avoid duplication
 */
export const getProductsWithQuantities = () => {
  const savedQuantities = localStorage.getItem('productQuantities');
  if (!savedQuantities) return Products;
  
  try {
    const quantities = JSON.parse(savedQuantities);
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

// Export Products directly for cases where the raw data is needed
export { Products };
