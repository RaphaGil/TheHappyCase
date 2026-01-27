import { getMaxAvailableQuantity } from '../inventory';
import { getColorName } from '../createyours/helpers';

/**
 * Count standalone charms already in cart (excluding current item)
 */
export const countStandaloneCharmsInCart = (cart, charmName, charmSrc, charmCategory, excludeItemId, excludeIndex) => {
  let count = 0;
  cart.forEach(cartItem => {
    if (cartItem.type === 'charm') {
      const cartItemId = cartItem.id;
      const isCurrentItem = (cartItemId === excludeItemId || (excludeItemId === undefined && cart.indexOf(cartItem) === excludeIndex));
      if (isCurrentItem) return; // Skip current item
      
      const cartPin = cartItem.pin || cartItem;
      const cartPinName = cartPin.name || cartPin.src;
      const cartPinCategory = cartPin.category || cartItem.category || charmCategory;
      if ((cartPinName === charmName || cartPinName === charmSrc) && 
          cartPinCategory === charmCategory) {
        count += (cartItem.quantity || 1);
      }
    }
  });
  return count;
};

/**
 * Count how many of a charm are in custom designs already in cart
 */
export const countCharmsInCustomDesigns = (cart, charmName, charmSrc, charmCategory, excludeItemId, excludeIndex) => {
  let count = 0;
  cart.forEach(cartItem => {
    if (cartItem.type === 'charm') return; // Skip standalone charms
    
    // Skip the current item to avoid double-counting
    if (cartItem.id === excludeItemId || cart.indexOf(cartItem) === excludeIndex) return;
    
    const pinsToCheck = cartItem.pins || cartItem.pinsDetails || [];
    pinsToCheck.forEach(cartPin => {
      if (!cartPin) return;
      const cartPinName = cartPin.name || cartPin.src;
      const cartPinSrc = cartPin.src || '';
      const cartPinCategory = cartPin.category || charmCategory;
      
      const nameMatches = (cartPinName === charmName || cartPinName === charmSrc || 
                          cartPinSrc === charmName || cartPinSrc === charmSrc);
      const categoryMatches = (cartPinCategory === charmCategory);
      
      if (nameMatches && categoryMatches) {
        count += (cartItem.quantity || 1);
      }
    });
  });
  return count;
};

/**
 * Count how many of a charm are in a specific design
 */
export const countCharmsInDesign = (pinsToCheck, charmName, charmSrc, charmCategory) => {
  return pinsToCheck.filter(p => {
    const pPin = p.pin || p;
    const pPinName = pPin.name || pPin.src;
    const pPinCategory = pPin.category || charmCategory;
    return (pPinName === charmName || pPinName === charmSrc) && 
           pPinCategory === charmCategory;
  }).length;
};

/**
 * Create a charm product object for inventory checking
 */
export const createCharmProduct = (pin, category = 'colorful') => {
  const charmCategory = (category && category.trim() !== '') ? category : 'colorful';
  const charmName = pin.name || pin.src || '';
  const charmSrc = pin.src || '';
  
  return {
    name: charmName,
    price: pin.price || 2.0,
    totalPrice: pin.price || 2.0,
    image: charmSrc,
    pin: pin,
    category: charmCategory,
    type: 'charm'
  };
};

/**
 * Check if a standalone charm can be incremented
 */
export const canIncrementStandaloneCharm = (item, cart, itemId, index) => {
  const maxAvailable = getMaxAvailableQuantity(item, cart);
  const charmCategory = item.category || item.pin?.category || 'colorful';
  const charmName = item.pin?.name || item.name || '';
  const charmSrc = item.pin?.src || '';
  
  // If maxAvailable is 0, no more can be added
  if (maxAvailable !== null && maxAvailable === 0) {
    return {
      canIncrement: false,
      errorMessage: `Oops! We don't have any more ${item.name || item.pin?.name || 'Charm'} in stock right now, so you can't add more to your basket.`
    };
  }
  
  // If maxAvailable is null (unlimited), allow increment
  if (maxAvailable === null) {
    return { canIncrement: true };
  }
  
  // Count standalone charms already in cart (excluding current item)
  const standaloneCharmsInCart = countStandaloneCharmsInCart(
    cart, charmName, charmSrc, charmCategory, itemId, index
  );
  
  // Count how many of this charm are in custom designs already in cart
  const charmCountInCustomDesigns = countCharmsInCustomDesigns(
    cart, charmName, charmSrc, charmCategory, itemId, index
  );
  
  // Calculate total inventory: maxAvailable + standalone charms (excluding current item)
  const currentStandaloneQty = item.quantity || 1;
  const totalInventory = maxAvailable + standaloneCharmsInCart;
  
  // Calculate total usage if we increment: standalone (with new qty) + in custom designs
  const newStandaloneQty = currentStandaloneQty + 1;
  const totalUsage = newStandaloneQty + charmCountInCustomDesigns;
  
  // Check if incrementing would exceed inventory
  if (totalUsage > totalInventory) {
    return {
      canIncrement: false,
      errorMessage: `Oops! We don't have any more ${item.name || item.pin?.name || 'Charm'} in stock right now, so you can't add more to your basket.`
    };
  }
  
  return { canIncrement: true };
};

/**
 * Check if a custom design case can be incremented
 */
export const canIncrementCustomDesign = (item, cart, itemId, index) => {
  const maxAvailable = getMaxAvailableQuantity(item, cart);
  const pinsToCheck = item.pins || item.pinsDetails || [];
  const currentQuantity = item.quantity || 1;
  
  // Check case inventory first
  const canIncrementCase = maxAvailable === null || maxAvailable > 0;
  
  if (!canIncrementCase) {
    const itemName = item.caseName || item.name || 'Passport Case';
    // Get human-readable color name from hex code or image path
    const colorName = item.color 
      ? getColorName(item.color, item.caseImage || item.case_image || item.image) 
      : '';
    const colorText = colorName ? ` in ${colorName}` : '';
    return {
      canIncrement: false,
      errorMessage: `Oops! We don't have any more ${itemName}${colorText} in stock right now, so you can't add more to your basket.`,
      errorType: 'case'
    };
  }
  
  // Check each charm in the design
  for (const pin of pinsToCheck) {
    if (!pin) continue;
    
    // Normalize empty category string to 'colorful' (matching display logic)
    const charmCategory = (pin.category && pin.category.trim() !== '') ? pin.category : 'colorful';
    const charmName = pin.name || pin.src || '';
    const charmSrc = pin.src || '';
    
    const charmProduct = createCharmProduct(pin, charmCategory);
    const charmMaxAvailable = getMaxAvailableQuantity(charmProduct, cart);
    
    // If no inventory limit for this charm, skip check
    if (charmMaxAvailable === null) continue;
    
    // Count standalone charms already in cart
    const standaloneCharmsInCart = countStandaloneCharmsInCart(
      cart, charmName, charmSrc, charmCategory, itemId, index
    );
    
    // Count how many of this charm are in custom designs already in cart (excluding current item)
    const charmCountInCustomDesigns = countCharmsInCustomDesigns(
      cart, charmName, charmSrc, charmCategory, itemId, index
    );
    
    // Count how many of this charm are in the current design (per design)
    const charmCountInDesign = countCharmsInDesign(pinsToCheck, charmName, charmSrc, charmCategory);
    
    // Calculate total inventory and usage
    const totalInventory = charmMaxAvailable + standaloneCharmsInCart;
    // Already used: standalone + in other custom designs + in current design with current quantity
    // New usage if we increment: current usage + charmCountInDesign (one more design)
    const currentUsage = standaloneCharmsInCart + charmCountInCustomDesigns + (charmCountInDesign * currentQuantity);
    const newUsage = currentUsage + charmCountInDesign;
    
    // Check if adding one more design would exceed inventory
    if (charmMaxAvailable === 0 || newUsage > totalInventory) {
      return {
        canIncrement: false,
        errorMessage: `Oops! We don't have any more ${pin.name || 'this charm'} in stock right now, so you can't add more to your basket.`,
        errorType: 'charm',
        errorKey: `${charmName}-${charmCategory}`,
        charmProduct
      };
    }
  }
  
  return { canIncrement: true };
};
