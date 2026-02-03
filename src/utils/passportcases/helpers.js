import { Products, getProductsWithQuantities } from '../shared/products';
import { getMaxAvailableQuantity } from '../inventory';
import { normalizeImagePath } from '../imagePath';

// Map filter values to case types
export const filterToType = {
  'economy': 'economy',
  'business': 'business',
  'firstclass': 'firstclass',
  'first-class': 'firstclass',
  'business-class': 'business',
  'economy-class': 'economy'
};

// Re-export getProductsWithQuantities for backward compatibility
export { getProductsWithQuantities };

// Function to format case type to display name
export const getCaseDisplayName = (caseType) => {
  const caseTypeMap = {
    'economy': 'Economy Class',
    'business': 'Business Class',
    'firstclass': 'First Class'
  };
  return caseTypeMap[caseType] || caseType;
};

// Helper function to get color name from image filename
export const getColorName = (image) => {
  if (!image) return '';
  
  const filename = image.split('/').pop().replace('.webp', '').replace('.png', '').replace('.jpg', '').toLowerCase();
  
  // Remove case type prefixes
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
  
  // Format the color name
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

// Get detail images from SmartCase folder
export const getDetailImagesForColor = (selectedCaseType, selectedColorData, selectedCase) => {
  // Get the main color image
  const colorImage = selectedColorData?.image || selectedCase.images[0] || '';
  
  // Build images array from SmartCase folder
  const smartCaseImages = [];
  
  // Add the main color image (normalized)
  if (colorImage) {
    smartCaseImages.push(normalizeImagePath(colorImage));
  }
  
  // Add detail images based on case type
  let detailImages = [];
  
  if (selectedCaseType === 'economy') {
    detailImages = [
      '/images/SmartCase/economycaseinside.webp',
      '/images/SmartCase/economycaseclosure.webp',
      '/images/SmartCase/economycaseclosureinside.webp'
    ];
  } else if (selectedCaseType === 'business') {
    detailImages = [
      '/images/BusinessClassCase/businessclass.webp',
      '/images/BusinessClassCase/businessclass1.webp'
    ];
  } else if (selectedCaseType === 'firstclass') {
    detailImages = [
      '/images/FirstClassCase/firstclass.webp',
      '/images/FirstClassCase/firstclass1.webp',
      '/images/FirstClassCase/firstclass2.webp'
    ];
  }
  
  // Add detail images if they exist (normalized)
  detailImages.forEach(img => {
    if (img) {
      smartCaseImages.push(normalizeImagePath(img));
    }
  });
  
  // If we have at least one image, return them; otherwise return empty array
  return smartCaseImages.length > 0 ? smartCaseImages : (colorImage ? [normalizeImagePath(colorImage)] : []);
};

// Helper function to check if selected color is sold out (considering cart inventory)
export const isSelectedColorSoldOut = (selectedCase, selectedCaseType, selectedColor, cart) => {
  if (!selectedCase || !selectedColor) return false;
  
  // Check available inventory:
  // 1. First checks Supabase qty - if 0, shows sold out immediately
  // 2. Then calculates: Supabase qty - cart items - if 0, shows sold out
  const productForInventory = {
    caseType: selectedCaseType,
    color: selectedColor,
  };
  const maxAvailable = getMaxAvailableQuantity(productForInventory, cart);
  
  // If maxAvailable === 0, item is sold out (either Supabase qty is 0, or all items are in cart)
  // If maxAvailable is null (unlimited) or > 0, color is available
  return maxAvailable !== null && maxAvailable === 0;
};

// Helper function to check if a specific color is sold out (considering cart inventory)
export const isColorSoldOut = (selectedCase, selectedCaseType, color, cart) => {
  if (!selectedCase || !color) return false;
  
  // Check available inventory:
  // 1. First checks Supabase qty - if 0, shows sold out immediately
  // 2. Then calculates: Supabase qty - cart items - if 0, shows sold out
  const productForInventory = {
    caseType: selectedCaseType,
    color: color,
  };
  const maxAvailable = getMaxAvailableQuantity(productForInventory, cart);
  
  // If maxAvailable === 0, item is sold out (either Supabase qty is 0, or all items are in cart)
  // If maxAvailable is null (unlimited) or > 0, color is available
  return maxAvailable !== null && maxAvailable === 0;
};

// Helper function to check if a case type is sold out (all colors sold out or case-level quantity is 0)
export const isCaseTypeSoldOut = (caseType, cart) => {
  // Get fresh data from products
  const caseData = Products.cases.find(c => c.type === caseType);
  if (!caseData) return false;
  
  // Note: We check inventory through getMaxAvailableQuantity below
  // which properly handles localStorage quantities, product data, and cart items
  // to determine if cases can be added to the basket
  
  // Check if all colors are sold out (considering cart inventory)
  // This uses getMaxAvailableQuantity which checks both color-level and case-level quantities
  if (caseData.colors && caseData.colors.length > 0) {
    // Check if at least one color has available inventory that can be added to basket
    // This considers items already in the basket/cart
    const hasAvailableColor = caseData.colors.some(color => {
      // Check available inventory considering cart (items in basket)
      // getMaxAvailableQuantity returns how many MORE can be added to the basket
      // It checks: color-level quantity -> case-level quantity -> product data
      // Returns: null (unlimited), > 0 (can add more), or 0 (cannot add any more)
      const productForInventory = {
        caseType: caseType,
        color: color.color,
      };
      const maxAvailable = getMaxAvailableQuantity(productForInventory, cart);
      
      // If maxAvailable is null, it means unlimited inventory (can add to basket)
      // If maxAvailable > 0, there's inventory available (can add to basket)
      // If maxAvailable === 0, no more can be added (all in basket or sold out) - SOLD OUT
      return maxAvailable === null || maxAvailable > 0;
    });
    
    // If no color has available inventory (maxAvailable === 0 for all colors), 
    // it means no cases can be added to the basket - show as SOLD OUT
    return !hasAvailableColor;
  }
  
  return false;
};
