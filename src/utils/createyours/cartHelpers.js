import { getMaxAvailableQuantity } from '../inventory';
import { normalizeImagePath } from '../imagePath';
import { createCompositeDesignImage } from '../canvas/imageExport';

/**
 * Validate case inventory before adding to cart
 */
export const validateCaseInventory = (selectedCaseType, selectedColor, cart, quantity, selectedCase) => {
  const productForInventory = {
    caseType: selectedCaseType,
    color: selectedColor,
  };
  const maxAvailableCase = getMaxAvailableQuantity(productForInventory, cart);
  
  const caseName = selectedCase?.name || 'Passport Case';
  const colorData = selectedCase?.colors?.find(c => c.color === selectedColor);
  const colorName = colorData?.color || selectedColor || '';
  
  // Validate case quantity against inventory
  if (maxAvailableCase !== null && maxAvailableCase === 0) {
    const colorText = colorName ? ` in ${colorName}` : '';
    return {
      valid: false,
      errorMessage: `Oops! We don't have any more ${caseName}${colorText} in stock right now, so you can't add more to your basket.`
    };
  }
  
  if (maxAvailableCase !== null && quantity > maxAvailableCase) {
    const colorText = colorName ? ` in ${colorName}` : '';
    return {
      valid: false,
      errorMessage: `Oops! We don't have any more ${caseName}${colorText} in stock right now, so you can't add more to your basket.`,
      maxAvailable: maxAvailableCase
    };
  }
  
  return { valid: true };
};

/**
 * Validate charm inventory before adding to cart
 */
export const validateCharmInventory = (selectedPins, cart, quantity, selectedCategory) => {
  for (const { pin } of selectedPins) {
    const charmCategory = pin?.category || selectedCategory || 'colorful';
    const charmName = pin?.name || 'charm';
    
    const charmProduct = {
      type: 'charm',
      category: charmCategory,
      pin: pin,
      name: charmName
    };
    
    const maxAvailableCharm = getMaxAvailableQuantity(charmProduct, cart);
    
    // Check if charm is out of stock
    if (maxAvailableCharm !== null && maxAvailableCharm === 0) {
      return {
        valid: false,
        errorMessage: `Oops! We don't have any more ${charmName} in stock right now, so you can't add more to your basket.`
      };
    }
    
    // Check if we can add the requested quantity of this charm
    if (maxAvailableCharm !== null && quantity > maxAvailableCharm) {
      return {
        valid: false,
        errorMessage: `Oops! We don't have any more ${charmName} in stock right now, so you can't add more to your basket.`
      };
    }
  }
  
  return { valid: true };
};

/**
 * Create composite design image
 */
export const createDesignImage = async (normalizedCaseImage, canvasImageDataURL) => {
  let designImage = normalizedCaseImage; // Fallback to normalized case image if composite fails
  
  if (normalizedCaseImage && canvasImageDataURL) {
    try {
      designImage = await createCompositeDesignImage(normalizedCaseImage, canvasImageDataURL, 300, 350);
      
      // Validate the composite image was created successfully
      if (!designImage || !designImage.startsWith('data:image/')) {
        console.warn('⚠️ Composite image creation returned invalid result, using case image fallback');
        designImage = normalizedCaseImage;
      }
    } catch (error) {
      console.error('❌ Error creating composite design image:', error);
      designImage = normalizedCaseImage;
    }
  } else if (canvasImageDataURL) {
    designImage = canvasImageDataURL;
  } else if (normalizedCaseImage) {
    designImage = normalizedCaseImage;
  }
  
  // Final validation
  if (!designImage || (typeof designImage === 'string' && designImage.trim().length === 0)) {
    console.error('❌ No valid design image available, using case image fallback');
    designImage = normalizedCaseImage || '';
  }
  
  return designImage;
};

/**
 * Prepare pins details for cart
 */
export const preparePinsDetails = (selectedPins, selectedCategory) => {
  return selectedPins.map(({ pin }) => {
    const pinCategory = (pin?.category && pin.category.trim() !== '') 
      ? pin.category 
      : (selectedCategory && selectedCategory.trim() !== '') 
        ? selectedCategory 
        : 'colorful';
    return {
      ...pin,
      name: pin?.name || 'Charm',
      src: pin?.src || '',
      price: pin?.price || 0,
      category: pinCategory
    };
  });
};

/**
 * Create cart products from design
 */
export const createCartProducts = ({
  selectedCase,
  selectedCaseType,
  selectedColor,
  selectedCaseImage,
  selectedPins,
  caseBasePrice,
  quantity,
  designImage,
  normalizedCaseImage,
  pinsDetails,
  selectedCategory
}) => {
  const effectiveQuantity = Math.max(quantity, 1);
  const uniqueTimestamp = Date.now();
  
  // Create case product
  const caseName = selectedCase?.name || 'Passport Case';
  const caseProduct = {
    id: `case-${uniqueTimestamp}-${Math.random().toString(36).substr(2, 9)}`,
    name: caseName,
    caseType: selectedCaseType,
    caseName: caseName,
    color: selectedColor,
    basePrice: caseBasePrice,
    casePrice: caseBasePrice,
    totalPrice: caseBasePrice,
    price: caseBasePrice,
    image: designImage,
    designImage: designImage,
    caseImage: normalizedCaseImage,
    customDesign: true,
    quantity: effectiveQuantity
  };
  
  // Create charm products
  const charmProducts = pinsDetails.map((pin, index) => {
    const charmCategory = pin.category || selectedCategory || 'colorful';
    const charmName = pin.name || 'Charm';
    const charmPrice = pin.price || 2.0;
    
    return {
      id: `charm-${uniqueTimestamp}-${index}-${Math.random().toString(36).substr(2, 9)}`,
      name: charmName,
      price: charmPrice,
      totalPrice: charmPrice,
      image: pin.src || '',
      pin: pin,
      category: charmCategory,
      type: 'charm',
      quantity: effectiveQuantity
    };
  });
  
  return { caseProduct, charmProducts };
};
