import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';
import { getMaxAvailableQuantity } from '../../utils/inventory';
import { areItemsIdentical } from '../../utils/cartHelpers';
import CartDrawerHeader from './components/CartDrawerHeader';
import EmptyCart from './components/EmptyCart';
import CartItem from './components/CartItem';
import CartDrawerFooter from './components/CartDrawerFooter';

const CartDrawer = () => {
  const { cart, isDrawerOpen, closeCartDrawer, getTotalPrice, incrementItemQty, decrementItemQty, removeFromCart, updateItemNote } = useCart();
  const { formatPrice } = useCurrency();
  const [openNoteIndex, setOpenNoteIndex] = useState(null);
  const [noteTexts, setNoteTexts] = useState({});
  const [itemErrors, setItemErrors] = useState({}); // Track errors per item ID
  const errorTimeoutsRef = useRef({}); // Track timeouts for each error

  // Auto-clear error messages after 3 seconds
  useEffect(() => {
    const timeouts = errorTimeoutsRef.current;
    
    Object.keys(itemErrors).forEach((itemKey) => {
      // Clear any existing timeout for this item
      if (timeouts[itemKey]) {
        clearTimeout(timeouts[itemKey]);
      }
      
      // Set new timeout to clear error after 3 seconds
      timeouts[itemKey] = setTimeout(() => {
        setItemErrors(prev => {
          const newErrors = { ...prev };
          // Handle both string errors (old format) and object errors (new format)
          if (typeof newErrors[itemKey] === 'string') {
            delete newErrors[itemKey];
          } else if (newErrors[itemKey] && typeof newErrors[itemKey] === 'object') {
            // Clear all errors for this item after timeout
            delete newErrors[itemKey];
          }
          return newErrors;
        });
        delete timeouts[itemKey];
      }, 3000); // 3 seconds
    });

    // Cleanup function to clear timeouts when component unmounts
    return () => {
      Object.values(timeouts).forEach(timeout => {
        clearTimeout(timeout);
      });
    };
  }, [itemErrors]);

  const handleToggleNote = (index) => {
    if (openNoteIndex === index) {
      setOpenNoteIndex(null);
    } else {
      setOpenNoteIndex(index);
      // Initialize note text if it doesn't exist
      if (!noteTexts[index] && cart[index]?.note) {
        setNoteTexts({ ...noteTexts, [index]: cart[index].note });
      } else if (!noteTexts[index]) {
        setNoteTexts({ ...noteTexts, [index]: '' });
      }
    }
  };

  const handleNoteChange = (index, value) => {
    setNoteTexts({ ...noteTexts, [index]: value });
  };

  const handleSaveNote = (index) => {
    updateItemNote(index, noteTexts[index] || '');
    setOpenNoteIndex(null);
  };

  const handleCancelNote = (index) => {
    setOpenNoteIndex(null);
    setNoteTexts({ ...noteTexts, [index]: cart[index]?.note || '' });
  };

  // Helper function to set error for all identical charms
  const setErrorForAllIdenticalCharms = (item, errorMessage) => {
    setItemErrors(prev => {
      const newErrors = { ...prev };
      // Find all identical charms in cart and set error for all
      cart.forEach(cartItem => {
        if (cartItem.type === 'charm' && areItemsIdentical(item, cartItem)) {
          newErrors[cartItem.id] = errorMessage;
        }
      });
      return newErrors;
    });
  };

  // Helper function to clear error for all identical charms
  const clearErrorForAllIdenticalCharms = (item) => {
    setItemErrors(prev => {
      const newErrors = { ...prev };
      // Find all identical charms in cart and clear error for all
      cart.forEach(cartItem => {
        if (cartItem.type === 'charm' && areItemsIdentical(item, cartItem)) {
          delete newErrors[cartItem.id];
        }
      });
      return newErrors;
    });
  };

  const handleIncrementWithCheck = (itemId) => {
    // Find item by id or by index if id is undefined
    const item = cart.find(i => i.id === itemId) || cart[itemId];
    if (!item) {
      console.error('Item not found for increment:', itemId);
      return;
    }
    
    // Check inventory
    const maxAvailable = getMaxAvailableQuantity(item, cart);
    
    // For standalone charms, check stock first
    if (item.type === 'charm') {
      const charmCategory = item.category || item.pin?.category || 'colorful';
      const charmName = item.pin?.name || item.name || '';
      const charmSrc = item.pin?.src || '';
      
      // If maxAvailable is 0, no more can be added
      if (maxAvailable !== null && maxAvailable === 0) {
        const itemName = item.name || item.pin?.name || 'Charm';
        const errorMessage = `Oops! We don't have any more ${itemName} in stock right now, so you can't add more to your basket.`;
        setErrorForAllIdenticalCharms(item, errorMessage);
        return;
      }
      
      // If maxAvailable is null (unlimited), allow increment
      if (maxAvailable === null) {
        incrementItemQty(itemId);
        clearErrorForAllIdenticalCharms(item);
        return;
      }
      
      // Count ALL standalone charms already in cart (including current item)
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
        if (cartItem.type === 'charm') return; // Skip standalone charms
        
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
            charmCountInCustomDesigns += (cartItem.quantity || 1);
          }
        });
      });
      
      // Calculate total current usage: standalone + in custom designs
      const currentUsage = standaloneCharmsInCart + charmCountInCustomDesigns;
      
      // maxAvailable represents how many MORE identical standalone charms can be added
      // maxAvailable = maxQuantity - (current identical standalone charms counted by areItemsIdentical)
      // To get the total max quantity, we need to add back the identical standalone charms
      // Count identical standalone charms (what getMaxAvailableQuantity counts)
      let identicalStandaloneCharms = 0;
      cart.forEach(cartItem => {
        if (cartItem.type === 'charm' && areItemsIdentical(item, cartItem)) {
          identicalStandaloneCharms += (cartItem.quantity || 1);
        }
      });
      
      // Calculate total max quantity: maxAvailable + identical standalone charms
      const totalMaxQuantity = maxAvailable + identicalStandaloneCharms;
      
      // Calculate total usage if we increment standalone: current usage + 1
      const newUsage = currentUsage + 1;
      
      // Check if incrementing would exceed total inventory
      // Also check if maxAvailable is 0 (no more identical standalone charms can be added)
      if (maxAvailable === 0 || newUsage > totalMaxQuantity) {
        const itemName = item.name || item.pin?.name || 'Charm';
        const errorMessage = `Oops! We don't have any more ${itemName} in stock right now, so you can't add more to your basket.`;
        setErrorForAllIdenticalCharms(item, errorMessage);
        return;
      }
      
      // Stock available for charm, allow increment
      incrementItemQty(itemId);
      clearErrorForAllIdenticalCharms(item);
      return;
    }
    
    // For cases (custom designs or standalone cases), check case inventory
    // maxAvailable represents how many MORE can be added (already accounts for current cart)
    // If maxAvailable is null, inventory is unlimited - allow increment
    if (maxAvailable === null) {
      // For custom designs, still need to check charm inventory below
      // For standalone cases, allow increment
      if (!item.customDesign && 
          !(item.pins && Array.isArray(item.pins) && item.pins.length > 0) && 
          !(item.pinsDetails && Array.isArray(item.pinsDetails) && item.pinsDetails.length > 0)) {
        incrementItemQty(itemId);
        setItemErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[itemId];
          return newErrors;
        });
        return;
      }
    } else if (maxAvailable <= 0) {
      // Case is out of stock - no more can be added
      const itemName = item.caseName || item.name || 'Passport Case';
      const errorMessage = `Oops! We don't have any more ${itemName} in stock right now, so you can't add more to your basket.`;
      setItemErrors(prev => ({
        ...prev,
        [itemId]: {
          case: errorMessage,
          charms: prev[itemId]?.charms || {}
        }
      }));
      return;
    }
    
    // For custom designs from CreateYours, check charm inventory
    if (item.customDesign || 
        (item.pins && Array.isArray(item.pins) && item.pins.length > 0) || 
        (item.pinsDetails && Array.isArray(item.pinsDetails) && item.pinsDetails.length > 0)) {
      const pinsToCheck = item.pins || item.pinsDetails || [];
      const currentQuantity = item.quantity || 1;
      
      for (const pin of pinsToCheck) {
        if (!pin) continue;
        
        // Normalize empty category string to 'colorful' (matching display logic)
        const charmCategory = (pin.category && pin.category.trim() !== '') ? pin.category : 'colorful';
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
        
        // If no inventory limit for this charm, skip check
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
        
        // Count how many of this charm are in custom designs already in cart (excluding current item)
        let charmCountInCustomDesigns = 0;
        cart.forEach(cartItem => {
          // Skip the current item to avoid double-counting
          if (cartItem.id === itemId) return;
          
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
          // Also check pinsDetails
          if (cartItem.pinsDetails && Array.isArray(cartItem.pinsDetails)) {
            cartItem.pinsDetails.forEach(cartPin => {
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
        const charmCountInDesign = pinsToCheck.filter(p => {
          const pPin = p.pin || p;
          const pPinName = pPin.name || pPin.src;
          const pPinCategory = pPin.category || charmCategory;
          return (pPinName === charmName || pPinName === charmSrc) && 
                 pPinCategory === charmCategory;
        }).length;
        
        // Calculate total inventory and usage
        const totalInventory = charmMaxAvailable + standaloneCharmsInCart;
        // Already used: standalone + in other custom designs + in current design with current quantity
        // New usage if we increment: current usage + charmCountInDesign (one more design)
        const currentUsage = standaloneCharmsInCart + charmCountInCustomDesigns + (charmCountInDesign * currentQuantity);
        const newUsage = currentUsage + charmCountInDesign;
        
        // Check if adding one more design would exceed inventory
        if (charmMaxAvailable === 0 || newUsage > totalInventory) {
          const errorMessage = `Oops! We don't have any more ${pin.name || 'this charm'} in stock right now, so you can't add more to your basket.`;
          const errorKey = `${charmName}-${charmCategory}`;
          
          // Store error for the case item with charm-specific info
          setItemErrors(prev => ({
            ...prev,
            [itemId]: {
              case: prev[itemId]?.case || null,
              charms: {
                ...(prev[itemId]?.charms || {}),
                [errorKey]: errorMessage
              }
            }
          }));
          // Also set error for all matching standalone charm items
          setErrorForAllIdenticalCharms(charmProduct, errorMessage);
          return;
        }
      }
    }
    
    // All checks passed, allow increment
    incrementItemQty(itemId);
    // Clear error for the custom case item
    setItemErrors(prev => {
      const newErrors = { ...prev };
      // For custom designs, only clear case error, keep charm errors if any
      if (item.customDesign || 
          (item.pins && Array.isArray(item.pins) && item.pins.length > 0) || 
          (item.pinsDetails && Array.isArray(item.pinsDetails) && item.pinsDetails.length > 0)) {
        // Keep charm errors, only clear case error
        if (newErrors[itemId]) {
          newErrors[itemId] = {
            case: null,
            charms: newErrors[itemId].charms || {}
          };
          // Remove the item error entry if both case and charms are empty
          if (!newErrors[itemId].case && (!newErrors[itemId].charms || Object.keys(newErrors[itemId].charms).length === 0)) {
            delete newErrors[itemId];
          }
        }
      } else {
        // For standalone cases, remove the entire error entry
        delete newErrors[itemId];
      }
      return newErrors;
    });
    // Clear errors for all charms within this custom design
    if (item.customDesign || 
        (item.pins && Array.isArray(item.pins) && item.pins.length > 0) || 
        (item.pinsDetails && Array.isArray(item.pinsDetails) && item.pinsDetails.length > 0)) {
      const pinsToCheck = item.pins || item.pinsDetails || [];
      pinsToCheck.forEach(pin => {
        if (!pin) return;
        const charmProduct = {
          name: pin.name || pin.src || '',
          price: pin.price || 2.0,
          totalPrice: pin.price || 2.0,
          image: pin.src || '',
          pin: pin,
          category: (pin.category && pin.category.trim() !== '') ? pin.category : 'colorful',
          type: 'charm'
        };
        clearErrorForAllIdenticalCharms(charmProduct);
      });
    }
  };

  const handleDecrementWithCheck = (itemId) => {
    // Find item by id or by index if id is undefined
    const item = cart.find(i => i.id === itemId) || cart[itemId];
    decrementItemQty(itemId);
    // Clear error for all identical charms when decrementing
    if (item && item.type === 'charm') {
      clearErrorForAllIdenticalCharms(item);
    } else {
      // For non-charm items, just clear the error for this specific item
      setItemErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[itemId];
        return newErrors;
      });
    }
  };

  return (
    <div className={`fixed inset-0 z-50  ${isDrawerOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black  transition-opacity ${isDrawerOpen ? 'opacity-40' : 'opacity-0'}`}
        onClick={closeCartDrawer}
      />

      {/* Drawer */}
      <div
        className={`absolute right-0 top-0 h-full w-full sm:w-2/3 lg:w-2/5 bg-white shadow-2xl transform transition-transform duration-300 flex flex-col ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <CartDrawerHeader onClose={closeCartDrawer} />

        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
          {cart.length === 0 ? (
            <EmptyCart />
          ) : (
            cart.map((item, index) => (
              <CartItem
                key={item.id}
                item={item}
                index={index}
                formatPrice={formatPrice}
                onRemove={removeFromCart}
                onIncrement={handleIncrementWithCheck}
                onDecrement={handleDecrementWithCheck}
                openNoteIndex={openNoteIndex}
                noteTexts={noteTexts}
                onToggleNote={handleToggleNote}
                onNoteChange={handleNoteChange}
                onSaveNote={handleSaveNote}
                onCancelNote={handleCancelNote}
                errorMessage={typeof itemErrors[item.id] === 'string' ? itemErrors[item.id] : itemErrors[item.id]?.case}
                charmErrors={itemErrors[item.id]?.charms || {}}
              />
            ))
          )}
        </div>

        {/* Footer */}
        <CartDrawerFooter
          totalPrice={getTotalPrice()}
          formatPrice={formatPrice}
          cartLength={cart.length}
          onClose={closeCartDrawer}
        />
      </div>
    </div>
  );
};

export default CartDrawer;


