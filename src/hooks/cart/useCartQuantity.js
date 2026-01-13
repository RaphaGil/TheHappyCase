import { useCart } from '../../context/CartContext';
import { getMaxAvailableQuantity } from '../../utils/inventory';
import { canIncrementStandaloneCharm, canIncrementCustomDesign, createCharmProduct } from '../../utils/cart/inventoryChecks';

/**
 * Hook to handle cart quantity changes with inventory checks
 */
export const useCartQuantity = (cart, errorHandlers) => {
  const { incrementItemQty, decrementItemQty } = useCart();
  const { 
    setItemError, 
    clearItemError, 
    setErrorForAllIdenticalCharms, 
    clearErrorForAllIdenticalCharms,
    scrollToItem,
    setItemErrors
  } = errorHandlers;

  const handleIncrementWithCheck = (itemId, index) => {
    // Find item by id or by index if id is undefined
    const item = cart.find(i => i.id === itemId) || cart[itemId] || cart[index];
    if (!item) {
      console.error('Item not found for increment:', itemId, index);
      return;
    }
    
    // For standalone charms, check stock first
    if (item.type === 'charm') {
      const result = canIncrementStandaloneCharm(item, cart, itemId, index);
      
      if (!result.canIncrement) {
        setItemError(itemId || index, result.errorMessage);
        setErrorForAllIdenticalCharms(item, result.errorMessage);
        scrollToItem(itemId || index);
        return;
      }
      
      // Stock available for charm, allow increment
      incrementItemQty(itemId);
      clearItemError(itemId || index);
      clearErrorForAllIdenticalCharms(item);
      return;
    }
    
    // For cases (custom designs or standalone cases), check case inventory
    const maxAvailable = getMaxAvailableQuantity(item, cart);
    const canIncrementCase = maxAvailable === null || maxAvailable > 0;
    
    if (!canIncrementCase) {
      // Case is out of stock
      const itemName = item.caseName || item.name || 'Passport Case';
      const errorMessage = `Oops! We don't have any more ${itemName} in stock right now, so you can't add more to your basket.`;
      setItemError(itemId || index, {
        case: errorMessage,
        charms: {}
      });
      scrollToItem(itemId || index);
      return;
    }
    
    // For custom designs from CreateYours, check charm inventory
    if (item.customDesign || 
        (item.pins && Array.isArray(item.pins) && item.pins.length > 0) || 
        (item.pinsDetails && Array.isArray(item.pinsDetails) && item.pinsDetails.length > 0)) {
      
      const result = canIncrementCustomDesign(item, cart, itemId, index);
      
      if (!result.canIncrement) {
        if (result.errorType === 'case') {
          setItemError(itemId || index, {
            case: result.errorMessage,
            charms: {}
          });
        } else if (result.errorType === 'charm') {
          // Store error for the case item with charm-specific info
          // Use setItemErrors to preserve existing errors
          errorHandlers.setItemErrors(prev => ({
            ...prev,
            [itemId || index]: {
              case: prev[itemId || index]?.case || null,
              charms: {
                ...(prev[itemId || index]?.charms || {}),
                [result.errorKey]: result.errorMessage
              }
            }
          }));
          // Also set error for all matching standalone charm items
          setErrorForAllIdenticalCharms(result.charmProduct, result.errorMessage);
        }
        scrollToItem(itemId || index);
        return;
      }
    }
    
    // Stock available, allow increment
    incrementItemQty(itemId);
    // Clear error for the item
    clearItemError(itemId || index);
    // Clear errors for all charms within this custom design (if it's a custom design)
    if (item.customDesign || 
        (item.pins && Array.isArray(item.pins) && item.pins.length > 0) || 
        (item.pinsDetails && Array.isArray(item.pinsDetails) && item.pinsDetails.length > 0)) {
      const pinsToCheck = item.pins || item.pinsDetails || [];
      pinsToCheck.forEach(pin => {
        if (!pin) return;
        const charmProduct = createCharmProduct(pin, pin.category || 'colorful');
        clearErrorForAllIdenticalCharms(charmProduct);
      });
    }
  };

  const handleDecrementWithCheck = (itemId, index) => {
    // Find item by id or by index if id is undefined
    const item = cart.find(i => i.id === itemId) || cart[itemId] || cart[index];
    decrementItemQty(itemId);
    // Clear error when decrementing
    if (item && item.type === 'charm') {
      clearErrorForAllIdenticalCharms(item);
    } else {
      clearItemError(itemId || index);
    }
  };

  return {
    handleIncrementWithCheck,
    handleDecrementWithCheck,
  };
};
