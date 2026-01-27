import { Products, getProductsWithQuantities } from '../shared/products';

/**
 * Helper function to get color name from hex code or image filename
 * @param {string} colorHexOrImage - Hex color code (e.g., "#d17956") OR image path/filename
 * @param {string} imagePath - Image path/filename (optional, only used if first param is hex)
 * @returns {string} - Formatted color name
 */
export const getColorName = (colorHexOrImage, imagePath = null) => {
  // Handle backward compatibility: if only one parameter is passed and it's not a hex code, treat it as image path
  let colorHex = null;
  let image = imagePath;
  
  if (!imagePath && colorHexOrImage && !colorHexOrImage.startsWith('#')) {
    // Old usage: getColorName(image) - treat first param as image
    image = colorHexOrImage;
    colorHex = null;
  } else {
    // New usage: getColorName(hex, image) or getColorName(hex)
    colorHex = colorHexOrImage && colorHexOrImage.startsWith('#') ? colorHexOrImage : null;
    image = imagePath || (colorHexOrImage && !colorHexOrImage.startsWith('#') ? colorHexOrImage : null);
  }
  
  // First, try to extract color name from image path if available
  if (image) {
    const filename = image.split('/').pop().replace(/\.(webp|png|jpg)$/i, '').toLowerCase();
    
    // Remove case type prefixes
    let colorPart = filename
      .replace(/^economycase/i, '')
      .replace(/^businessclasscase/i, '')
      .replace(/^firstclasscase/i, '')
      .replace(/^smartcase/i, '')
      .replace(/^premiumcase/i, '')
      .replace(/^firstclass/i, '');
    
    // Color name mappings
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
      'orange': 'Orange',
      'darkpink': 'Dark Pink'
    };
    
    // Check exact match
    if (colorMap[colorPart]) {
      return colorMap[colorPart];
    }
    
    // Format camelCase or common patterns
    colorPart = colorPart
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/(dark|light|navy|jeans|brick)([a-z]+)/g, '$1 $2')
      .split(/(?=[A-Z])|(?=dark|light|navy|jeans|brick)/)
      .filter(word => word.length > 0)
      .join(' ')
      .toLowerCase()
      .split(' ')
      .map(word => {
        if (colorMap[word]) return colorMap[word];
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
    
    if (colorPart && colorPart !== 'Color') {
      return colorPart;
    }
  }
  
  // If no image path or extraction failed, try hex code mapping
  if (colorHex) {
    // Normalize hex code
    const hex = colorHex.toLowerCase().replace('#', '');
    
    // Hex to color name mappings based on products.json
    const hexToColorMap = {
      '#f49f90': 'Light Pink',
      '#cb0025': 'Red',
      '#9cb4b8': 'Light Blue',
      '#627386': 'Jeans Blue',
      '#3a4763': 'Dark Blue',
      '#c96e50': 'Light Brown',
      '#b0582c': 'Brown',
      '#59332e': 'Dark Brown',
      '#506258': 'Green',
      '#89837e': 'Gray',
      '#413f44': 'Black',
      '#c8b593': 'Gray',
      '#da8ca6': 'Light Pink',
      '#daaf49': 'Yellow',
      '#d33d72': 'Pink',
      '#c49154': 'Brown',
      '#36312b': 'Black',
      '#d17956': 'Brown',
      '#c76f82': 'Brick Red',
      '#adcfa8': 'Green',
      '#ab8b72': 'Dark Pink',
      '#bfa29c': 'Pink',
      '#a799ab': 'Purple',
      '#afab9b': 'Gray',
      '#5f6074': 'Navy Blue',
      '#768695': 'Blue',
      '#cea55c': 'Light Brown',
      '#272a34': 'Black'
    };
    
    if (hexToColorMap[colorHex.toLowerCase()]) {
      return hexToColorMap[colorHex.toLowerCase()];
    }
  }
  
  // Fallback: return the hex code if no match found (better than showing nothing)
  return colorHex || '';
};

/**
 * Helper function to extract color name from image filename (backward compatibility)
 * @param {string} image - Image path/filename
 * @returns {string} - Formatted color name
 */
export const getColorNameFromImage = (image) => {
  return getColorName(null, image);
};

// Re-export getProductsWithQuantities for backward compatibility
export { getProductsWithQuantities };

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
