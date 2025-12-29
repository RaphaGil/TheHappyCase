import { useState, useEffect } from 'react';
import { getMaxAvailableQuantity } from '../../../utils/inventory';
import { getColorName } from '../utils/helpers';

/**
 * Custom hook for managing inventory checks and messages
 */
export const useInventoryCheck = ({
  selectedCaseType,
  selectedColor,
  selectedPins,
  quantity,
  cart,
  selectedCategory,
  selectedCase
}) => {
  const [inventoryMessage, setInventoryMessage] = useState('');
  const [inventoryType, setInventoryType] = useState('warning');
  const [quantityError, setQuantityError] = useState('');
  const [charmInventoryError, setCharmInventoryError] = useState('');

  // Auto-dismiss inventory message after 3 seconds
  useEffect(() => {
    if (inventoryMessage) {
      const timer = setTimeout(() => {
        setInventoryMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [inventoryMessage]);

  // Check inventory when case/color or charms change
  useEffect(() => {
    // Check case inventory
    if (selectedCaseType && selectedColor) {
      const productForInventory = {
        caseType: selectedCaseType,
        color: selectedColor,
      };
      const maxAvailable = getMaxAvailableQuantity(productForInventory, cart);
      
      if (maxAvailable !== null && maxAvailable > 0) {
        setInventoryMessage('');
      }
    }

    // Check charm inventory for selected charms
    if (selectedPins.length > 0) {
      let outOfStockCharm = null;
      
      for (const { pin } of selectedPins) {
        if (!pin) continue;
        
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
        
        if (maxAvailableCharm === null) continue;
        
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
        
        // Calculate total inventory and usage
        const totalInventory = maxAvailableCharm + standaloneCharmsInCart;
        const totalUsage = standaloneCharmsInCart + charmCountInCustomDesigns + (charmCountInDesign * quantity);
        
        // Check if charm is out of stock or would exceed inventory
        if (maxAvailableCharm === 0 || totalUsage > totalInventory) {
          outOfStockCharm = charmName;
          break;
        }
      }
      
      // Set or clear inventory message based on findings
      if (outOfStockCharm) {
        setInventoryMessage(`Oops! We don't have any more ${outOfStockCharm} in stock right now.`);
        setInventoryType('warning');
      } else {
        setInventoryMessage(prev => {
          if (prev && prev.includes("can't add more to your basket")) {
            return prev;
          }
          if (prev && !prev.includes("Passport Case") && !prev.includes("Case")) {
            return '';
          }
          return prev;
        });
      }
    } else {
      setInventoryMessage(prev => {
        if (prev && prev.includes("can't add more to your basket")) {
          return prev;
        }
        if (prev && !prev.includes("Passport Case") && !prev.includes("Case")) {
          return '';
        }
        return prev;
      });
    }
  }, [selectedCaseType, selectedColor, selectedPins, quantity, cart, selectedCategory]);

  // Note: Quantity clamping is handled in the component

  // Helper function to check if quantity can be incremented
  const checkQuantityIncrement = (currentQuantity) => {
    const productForInventory = {
      caseType: selectedCaseType,
      color: selectedColor,
    };
    const maxAvailable = getMaxAvailableQuantity(productForInventory, cart);
    
    if (maxAvailable !== null && (maxAvailable <= 0 || currentQuantity + 1 > maxAvailable)) {
      const itemName = selectedCase?.name || 'Passport Case';
      const selectedColorData = selectedCase?.colors?.find(c => c.color === selectedColor);
      const colorName = selectedColorData?.image ? getColorName(selectedColorData.image) : '';
      
      const colorText = colorName ? ` in ${colorName}` : '';
      const errorMessage = `Oops! We don't have any more ${itemName}${colorText} in stock right now, so you can't add more to your basket.`;
      setQuantityError(`We don't have any more ${itemName}${colorText} in stock to be added anymore.`);
      setInventoryMessage(errorMessage);
      setInventoryType('error');
      return false;
    }
    
    // Check charm inventory for all charms in the design
    if (selectedPins.length > 0) {
      for (const { pin } of selectedPins) {
        if (!pin) continue;
        
        const getCharmCategory = () => {
          if (pin.category) return pin.category;
          if (selectedCategory) return selectedCategory;
          return 'colorful';
        };
        
        const charmCategory = getCharmCategory();
        const charmName = pin.name || pin.src || '';
        const charmSrc = pin.src || '';
        
        const charmProduct = {
          name: charmName,
          price: pin.price || 2.0,
          totalPrice: pin.price || 2.0,
          image: charmSrc,
          pin: pin,
          category: charmCategory,
          type: 'charm'
        };
        
        const charmMaxAvailable = getMaxAvailableQuantity(charmProduct, cart);
        
        if (charmMaxAvailable === null) continue;
        
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
        
        // Count how many of this charm are in the current design (per design)
        const charmCountInDesign = selectedPins.filter(p => {
          const pPin = p.pin || p;
          const pPinName = pPin.name || pPin.src;
          const pPinCategory = pPin.category || charmCategory;
          return (pPinName === charmName || pPinName === charmSrc) && 
                 pPinCategory === charmCategory;
        }).length;
        
        // Calculate total inventory and usage
        const totalInventory = charmMaxAvailable + standaloneCharmsInCart;
        const currentUsage = standaloneCharmsInCart + charmCountInCustomDesigns + (charmCountInDesign * currentQuantity);
        const newUsage = currentUsage + charmCountInDesign;
        
        // Check if adding one more design would exceed inventory
        if (charmMaxAvailable === 0 || newUsage > totalInventory) {
          const errorMessage = `Oops! We don't have any more ${pin.name || 'this charm'} in stock right now, so you can't add more to your basket.`;
          setCharmInventoryError(errorMessage);
          setInventoryMessage(errorMessage);
          setInventoryType('error');
          return false;
        }
      }
    }
    
    return true;
  };

  return {
    inventoryMessage,
    inventoryType,
    quantityError,
    charmInventoryError,
    setInventoryMessage,
    setInventoryType,
    setQuantityError,
    setCharmInventoryError,
    checkQuantityIncrement
  };
};

