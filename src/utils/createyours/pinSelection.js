import { getMaxAvailableQuantity } from '../inventory';

/**
 * Check if a pin can be added based on inventory
 * @param {Object} pin - The pin object to check
 * @param {Array} cart - Current cart items
 * @param {Array} selectedPins - Currently selected pins in the design
 * @param {string} selectedCategory - Selected category
 * @returns {Object} - { canAdd: boolean, errorMessage: string }
 */
export const checkPinInventory = (pin, cart, selectedPins, selectedCategory) => {
  const getCharmCategory = () => {
    if (pin.category) return pin.category;
    if (selectedCategory) return selectedCategory;
    return 'colorful'; // Default fallback
  };

  const charmCategory = getCharmCategory();
  const charmName = pin.name || pin.src || '';
  const charmSrc = pin.src || '';

  // Ensure pin object has category property for cart tracking
  const pinWithCategory = {
    ...pin,
    category: charmCategory
  };

  const product = {
    name: charmName,
    price: pin.price || 2.0,
    totalPrice: pin.price || 2.0,
    image: charmSrc,
    pin: pinWithCategory,
    category: charmCategory,
    type: 'charm'
  };

  // Check inventory for standalone charms in cart
  const maxAvailable = getMaxAvailableQuantity(product, cart);
  
  // If no inventory limit, allow adding
  if (maxAvailable === null) {
    return { canAdd: true, errorMessage: '', pinWithCategory };
  }
  
  // Count standalone charms already in cart
  let standaloneCharmsInCart = 0;
  cart.forEach(cartItem => {
    if (cartItem.type === 'charm') {
      const cartPin = cartItem.pin || cartItem;
      const cartPinName = cartPin.name || cartPin.src;
      const cartPinCategory = cartPin.category || cartItem.category || charmCategory;
      if ((cartPinName === charmName || cartPinName === charmSrc) && 
          cartPinCategory === charmCategory) {
        standaloneCharmsInCart += (cartItem.quantity || 1);
      }
    }
  });
  
  // Count how many of this charm are in custom designs already in cart
  let charmCountInCustomDesigns = 0;
  cart.forEach(cartItem => {
    if (cartItem.pins && Array.isArray(cartItem.pins)) {
      cartItem.pins.forEach(cartPin => {
        const cartPinName = cartPin.name || cartPin.src;
        const cartPinCategory = cartPin.category || charmCategory;
        if ((cartPinName === charmName || cartPinName === charmSrc) && 
            cartPinCategory === charmCategory) {
          charmCountInCustomDesigns += (cartItem.quantity || 1);
        }
      });
    }
  });
  
  // Count how many of this charm are already selected in the current design
  const charmCountInDesign = selectedPins.filter(p => {
    const pPin = p.pin || p;
    const pPinName = pPin.name || pPin.src;
    const pPinCategory = pPin.category || charmCategory;
    return (pPinName === charmName || pPinName === charmSrc) && 
           pPinCategory === charmCategory;
  }).length;
  
  // Calculate total inventory: maxAvailable + standalone charms in cart
  const totalInventory = maxAvailable + standaloneCharmsInCart;
  
  // Calculate total usage: standalone + in custom designs + in current design + 1 (new one)
  const totalUsage = standaloneCharmsInCart + charmCountInCustomDesigns + charmCountInDesign + 1;
  
  // If maxAvailable is 0, no more charms can be added (standalone or in designs)
  // Also check if total usage would exceed total inventory
  if (maxAvailable === 0 || totalUsage > totalInventory) {
    const charmDisplayName = pin.name || pin.src || 'this charm';
    const errorMessage = `Oops! We don't have any more ${charmDisplayName} in stock right now, so you can't add more to your basket.`;
    return { canAdd: false, errorMessage, pinWithCategory };
  }
  
  return { canAdd: true, errorMessage: '', pinWithCategory };
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
