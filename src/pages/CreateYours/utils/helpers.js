import Products from '../../../data/products.json';

/**
 * Helper function to extract color name from image filename
 * @param {string} image - Image path/filename
 * @returns {string} - Formatted color name
 */
export const getColorName = (image) => {
  if (!image) return '';
  
  // Extract filename from path
  const filename = image.split('/').pop().replace('.png', '').replace('.jpg', '').toLowerCase();
  
  // Remove case type prefixes (economycase, businessclasscase, firstclasscase, etc.)
  let colorPart = filename
    .replace(/^economycase/i, '')
    .replace(/^businessclasscase/i, '')
    .replace(/^firstclasscase/i, '')
    .replace(/^smartcase/i, '')
    .replace(/^premiumcase/i, '')
    .replace(/^firstclass/i, '');
  
  // Handle common color name patterns
  const colorMap = {
    'lightpink': 'Light Pink',
    'lightblue': 'Light Blue',
    'lightbrown': 'Light Brown',
    'darkbrown': 'Dark Brown',
    'darkblue': 'Dark Blue',
    'jeansblue': 'Jeans Blue',
    'brickred': 'Brick Red',
    'ligthpink': 'Light Pink', // Handle typo
    'navyblue': 'Navy Blue',
    'gray': 'Gray',
    'grey': 'Gray',
    'black': 'Black',
    'brown': 'Brown',
    'red': 'Red',
    'pink': 'Pink',
    'blue': 'Blue',
    'green': 'Green',
    'purple': 'Purple',
    'yellow': 'Yellow',
    'orange': 'Orange'
  };
  
  // Check if exact match exists
  if (colorMap[colorPart]) {
    return colorMap[colorPart];
  }
  
  // Try to split camelCase or find common patterns
  // Split on common word boundaries
  colorPart = colorPart
    .replace(/([a-z])([A-Z])/g, '$1 $2') // camelCase
    .replace(/(dark|light|navy|jeans|brick)([a-z]+)/g, '$1 $2') // prefixes
    .split(/(?=[A-Z])|(?=dark|light|navy|jeans|brick)/) // split on capitals or prefixes
    .filter(word => word.length > 0)
    .join(' ')
    .toLowerCase()
    .split(' ')
    .map(word => {
      // Check if word is in color map
      if (colorMap[word]) return colorMap[word];
      // Capitalize first letter
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
  
  return colorPart || 'Color';
};

/**
 * Get products with quantities merged from localStorage (Supabase inventory)
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
    
    return mergedProducts;
  } catch (error) {
    console.error('Error loading saved quantities:', error);
    return Products;
  }
};

/**
 * Get default case type, color, and image from URL search params
 * @param {URLSearchParams} searchParams - URL search parameters
 * @returns {Object} - Object with caseType, color, and image
 */
export const getDefaultCaseAndColor = (searchParams) => {
  const caseParam = searchParams?.get('case');
  const colorParam = searchParams?.get('color');
  
  // Default values
  const defaultCaseType = 'economy';
  let defaultColor = '';
  let defaultImage = '';
  
  // If case param exists, try to find it in Products
  if (caseParam) {
    const caseFromParam = Products.cases.find(c => c.type === caseParam);
    if (caseFromParam) {
      // If color param exists and is valid for this case, use it
      if (colorParam) {
        const colorData = caseFromParam.colors.find(c => c.color === colorParam);
        if (colorData) {
          return {
            caseType: caseFromParam.type,
            color: colorData.color,
            image: colorData.image
          };
        }
      }
      
      // Otherwise use first color of the case
      if (caseFromParam.colors && caseFromParam.colors.length > 0) {
        const firstColor = caseFromParam.colors[0];
        return {
          caseType: caseFromParam.type,
          color: firstColor.color,
          image: firstColor.image
        };
      }
    }
  }
  
  // Fallback to default case (economy) and its first color
  const defaultCase = Products.cases.find(c => c.type === defaultCaseType);
  if (defaultCase && defaultCase.colors && defaultCase.colors.length > 0) {
    const firstColor = defaultCase.colors[0];
    return {
      caseType: defaultCaseType,
      color: firstColor.color,
      image: firstColor.image
    };
  }
  
  // Ultimate fallback
  return {
    caseType: defaultCaseType,
    color: defaultColor,
    image: defaultImage
  };
};
