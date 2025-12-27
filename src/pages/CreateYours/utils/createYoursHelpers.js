import Products from '../../../data/products.json';
import { getMaxAvailableQuantity } from '../../../utils/inventory';

/**
 * Get default case and color from URL params or fallback to defaults
 */
export const getDefaultCaseAndColor = (searchParams) => {
  const caseParam = searchParams.get('case');
  const colorParam = searchParams.get('color');
  
  if (caseParam) {
    const caseFromParam = Products.cases.find(c => c.type === caseParam);
    if (caseFromParam) {
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

/**
 * Get color name from image filename
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
    
    if (quantities.cases) {
      mergedProducts.cases = mergedProducts.cases.map((caseItem, index) => {
        const updatedCase = {
          ...caseItem,
          quantity: quantities.cases[index] !== undefined ? quantities.cases[index] : caseItem.quantity
        };
        
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
 * Count how many of a charm are in the cart (standalone + in custom designs)
 */
export const countCharmInCart = (charmName, charmSrc, charmCategory, cart) => {
  let standaloneCount = 0;
  let inCustomDesignsCount = 0;
  
  cart.forEach(cartItem => {
    // Count standalone charms
    if (cartItem.type === 'charm') {
      const cartPin = cartItem.pin || cartItem;
      const cartPinName = cartPin.name || cartPin.src;
      const cartPinCategory = cartPin.category || cartItem.category || charmCategory;
      if ((cartPinName === charmName || cartPinName === charmSrc) && 
          cartPinCategory === charmCategory) {
        standaloneCount += (cartItem.quantity || 1);
      }
    }
    
    // Count charms in custom designs
    if (cartItem.pins && Array.isArray(cartItem.pins)) {
      cartItem.pins.forEach(cartPin => {
        const cartPinName = cartPin.name || cartPin.src;
        const cartPinCategory = cartPin.category || charmCategory;
        if ((cartPinName === charmName || cartPinName === charmSrc) && 
            cartPinCategory === charmCategory) {
          inCustomDesignsCount += (cartItem.quantity || 1);
        }
      });
    }
  });
  
  return { standaloneCount, inCustomDesignsCount };
};

/**
 * Check if a charm can be added based on inventory
 */
export const canAddCharm = (pin, selectedCategory, selectedPins, quantity, cart) => {
  const charmCategory = pin?.category || selectedCategory || 'colorful';
  const charmName = pin?.name || 'charm';
  const charmSrc = pin?.src || '';
  
  const charmProduct = {
    type: 'charm',
    category: charmCategory,
    pin: pin,
    name: charmName
  };
  
  const maxAvailableCharm = getMaxAvailableQuantity(charmProduct, cart);
  
  // If no inventory limit, allow adding
  if (maxAvailableCharm === null) {
    return { canAdd: true };
  }
  
  const { standaloneCount, inCustomDesignsCount } = countCharmInCart(
    charmName, 
    charmSrc, 
    charmCategory, 
    cart
  );
  
  // Count how many of this charm are in the current design
  const charmCountInDesign = selectedPins.filter(p => {
    const pPin = p.pin || p;
    const pPinName = pPin.name || pPin.src;
    const pPinCategory = pPin.category || charmCategory;
    return (pPinName === charmName || pPinName === charmSrc) && 
           pPinCategory === charmCategory;
  }).length;
  
  // Calculate total inventory and usage
  const totalInventory = maxAvailableCharm + standaloneCount;
  const totalUsage = standaloneCount + inCustomDesignsCount + (charmCountInDesign * quantity);
  
  if (maxAvailableCharm === 0 || totalUsage >= totalInventory) {
    return { 
      canAdd: false, 
      message: `Oops! We don't have any more ${charmName} in stock right now, so you can't add more to your basket.`
    };
  }
  
  return { canAdd: true };
};

/**
 * Scroll to element helper
 */
export const scrollToElement = (selector, options = {}) => {
  setTimeout(() => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center',
        ...options
      });
    }
  }, 100);
};

/**
 * Get case images array
 */
export const getCaseImages = (selectedColorData, selectedCase) => {
  const colorImage = selectedColorData?.image || selectedCase?.images?.[0] || '';
  const smartCaseImages = [];
  
  if (colorImage) {
    smartCaseImages.push(colorImage);
  }
  
  const detailImages = [
    '/TheHappyCase/images/SmartCase/economycaseinside.jpg',
    '/TheHappyCase/images/SmartCase/economycaseclosure.jpg',
    '/TheHappyCase/images/SmartCase/economycaseclosureinside.jpg'
  ];
  
  detailImages.forEach(img => {
    if (img) {
      smartCaseImages.push(img);
    }
  });
  
  return smartCaseImages.length > 0 ? smartCaseImages : (colorImage ? [colorImage] : []);
};

