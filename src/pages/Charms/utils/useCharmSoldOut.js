import { useMemo } from 'react';
import { getMaxAvailableQuantity } from '../../../utils/inventory';

/**
 * Hook to check if a charm is sold out
 * Considers both standalone charms in cart and charms in custom designs
 */
export const useCharmSoldOut = (charm, charmType, cart) => {
  return useMemo(() => {
    if (!charm) return false;
    
    const category = charmType; // colorful, bronze, or flags
    const pinName = charm.name || charm.src;
    
    if (!category || !pinName) return false;
    
    const productForInventory = {
      type: 'charm',
      category: category,
      pin: charm,
      name: pinName
    };
    const maxAvailable = getMaxAvailableQuantity(productForInventory, cart);
    
    // If no inventory limit, charm is always available
    if (maxAvailable === null) return false;
    
    // Count standalone charms already in cart
    let standaloneCharmsInCart = 0;
    cart.forEach(cartItem => {
      if (cartItem.type === 'charm') {
        const cartPin = cartItem.pin || cartItem;
        const cartPinName = cartPin.name || cartPin.src;
        const cartPinCategory = cartPin.category || cartItem.category || category;
        if ((cartPinName === pinName || cartPinName === charm.src) && 
            cartPinCategory === category) {
          standaloneCharmsInCart += (cartItem.quantity || 1);
        }
      }
    });
    
    // Count how many of this charm are in custom designs already in cart
    let charmCountInCustomDesigns = 0;
    cart.forEach(cartItem => {
      if (cartItem.type === 'charm') return;
      
      const pinsToCheck = cartItem.pins || cartItem.pinsDetails || [];
      
      let charmCountInThisDesign = 0;
      pinsToCheck.forEach(cartPin => {
        if (!cartPin) return;
        
        const cartPinName = cartPin.name || cartPin.src || '';
        const cartPinSrc = cartPin.src || '';
        const cartPinCategory = cartPin.category || category;
        
        const nameMatches = (cartPinName === pinName || cartPinName === charm.src || 
                            cartPinSrc === pinName || cartPinSrc === charm.src);
        const categoryMatches = (cartPinCategory === category);
        
        if (nameMatches && categoryMatches) {
          charmCountInThisDesign += 1;
        }
      });
      
      if (charmCountInThisDesign > 0) {
        charmCountInCustomDesigns += (charmCountInThisDesign * (cartItem.quantity || 1));
      }
    });
    
    const totalInventory = maxAvailable + standaloneCharmsInCart;
    const totalUsage = standaloneCharmsInCart + charmCountInCustomDesigns;
    
    return maxAvailable === 0 || totalUsage >= totalInventory;
  }, [charm, charmType, cart]);
};

