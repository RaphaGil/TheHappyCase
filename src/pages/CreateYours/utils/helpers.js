import Products from '../../../data/products.json';

/**
 * Extract color name from image filename
 */
export const getColorName = (image) => {
  if (!image) return '';
  
  const filename = image.split('/').pop().replace('.png', '').replace('.jpg', '').toLowerCase();
  
  let colorPart = filename
    .replace(/^economycase/i, '')
    .replace(/^businessclasscase/i, '')
    .replace(/^firstclasscase/i, '')
    .replace(/^smartcase/i, '')
    .replace(/^premiumcase/i, '')
    .replace(/^firstclass/i, '');
  
  const colorMap = {
    'lightpink': 'Light Pink',
    'lightblue': 'Light Blue',
    'lightbrown': 'Light Brown',
    'darkbrown': 'Dark Brown',
    'darkblue': 'Dark Blue',
    'jeansblue': 'Jeans Blue',
    'brickred': 'Brick Red',
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
  
  if (colorMap[colorPart]) {
    return colorMap[colorPart];
  }
  
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
  
  return colorPart || 'Color';
};

/**
 * Get products with quantities from localStorage
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
 * Get default case and color from URL params or defaults
 */
export const getDefaultCaseAndColor = (searchParams) => {
  const caseParam = searchParams.get('case');
  const colorParam = searchParams.get('color');
  
  // If URL params exist, use them
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
        return {
          caseType: caseFromParam.type,
          color: caseFromParam.colors[0].color,
          image: caseFromParam.colors[0].image
        };
      }
    }
  }
  
  // Fallback to default
  if (Products.cases.length > 0) {
    const defaultCase = Products.cases.find(c => c.type === "economy") || Products.cases[0];
    if (defaultCase && defaultCase.colors.length > 0) {
      return {
        caseType: defaultCase.type,
        color: defaultCase.colors[0].color,
        image: defaultCase.colors[0].image
      };
    }
  }
  return { caseType: "economy", color: "", image: "" };
};




