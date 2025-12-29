import React, { useState, useEffect, useRef } from "react";
import { useCart } from "../../context/CartContext";
import { useCurrency } from "../../context/CurrencyContext";
import { useNavigate } from "react-router-dom";
import { getMaxAvailableQuantity } from "../../utils/inventory";
import { areItemsIdentical } from "../../utils/cartHelpers";
import CartHeader from "./components/CartHeader";
import EmptyCartState from "./components/EmptyCartState";
import CartItem from "./components/CartItem";
import OrderSummary from "./components/OrderSummary";
const CartPage = () => {
  const {
    cart,
    removeFromCart,
    getTotalPrice,
    getTotalQuantity,
    incrementItemQty,
    decrementItemQty,
    updateItemNote,
  } = useCart();
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();
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

  // Helper function to set error for all identical charms
  const setErrorForAllIdenticalCharms = (item, errorMessage) => {
    setItemErrors(prev => {
      const newErrors = { ...prev };
      // Find all identical charms in cart and set error for all
      cart.forEach(cartItem => {
        if (cartItem.type === 'charm' && areItemsIdentical(item, cartItem)) {
          const itemKey = cartItem.id || cart.indexOf(cartItem);
          newErrors[itemKey] = errorMessage;
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
          const itemKey = cartItem.id || cart.indexOf(cartItem);
          delete newErrors[itemKey];
        }
      });
      return newErrors;
    });
  };

  const handleIncrementWithCheck = (itemId, index) => {
    // Find item by id or by index if id is undefined
    const item = cart.find(i => i.id === itemId) || cart[itemId] || cart[index];
    if (!item) {
      console.error('Item not found for increment:', itemId, index);
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
        setItemErrors(prev => ({
          ...prev,
          [itemId || index]: errorMessage
        }));
        setErrorForAllIdenticalCharms(item, errorMessage);
        setTimeout(() => {
          const itemElement = document.querySelector(`[data-item-id="${itemId || index}"]`);
          if (itemElement) {
            itemElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);
        return;
      }
      
      // If maxAvailable is null (unlimited), allow increment
      if (maxAvailable === null) {
        incrementItemQty(itemId);
        setItemErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[itemId || index];
          return newErrors;
        });
        clearErrorForAllIdenticalCharms(item);
        return;
      }
      
      // Count standalone charms already in cart (excluding current item)
      let standaloneCharmsInCart = 0;
      cart.forEach(cartItem => {
        if (cartItem.type === 'charm') {
          const cartItemId = cartItem.id;
          const isCurrentItem = (cartItemId === itemId || (itemId === undefined && cart.indexOf(cartItem) === index));
          if (isCurrentItem) return; // Skip current item
          
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
      
      // Calculate total inventory: maxAvailable + standalone charms (excluding current item)
      const currentStandaloneQty = item.quantity || 1;
      const totalInventory = maxAvailable + standaloneCharmsInCart;
      
      // Calculate total usage if we increment: standalone (with new qty) + in custom designs
      const newStandaloneQty = currentStandaloneQty + 1;
      const totalUsage = newStandaloneQty + charmCountInCustomDesigns;
      
      // Check if incrementing would exceed inventory
      if (totalUsage > totalInventory) {
        const itemName = item.name || item.pin?.name || 'Charm';
        const errorMessage = `Oops! We don't have any more ${itemName} in stock right now, so you can't add more to your basket.`;
        setItemErrors(prev => ({
          ...prev,
          [itemId || index]: errorMessage
        }));
        setErrorForAllIdenticalCharms(item, errorMessage);
        setTimeout(() => {
          const itemElement = document.querySelector(`[data-item-id="${itemId || index}"]`);
          if (itemElement) {
            itemElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);
        return;
      }
      
      // Stock available for charm, allow increment
      incrementItemQty(itemId);
      setItemErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[itemId || index];
        return newErrors;
      });
      clearErrorForAllIdenticalCharms(item);
      return;
    }
    
    // For cases (custom designs or standalone cases), check case inventory
    const canIncrementCase = maxAvailable === null || maxAvailable > 0;
    
    if (!canIncrementCase) {
      // Case is out of stock
      const itemName = item.caseName || item.name || 'Passport Case';
      const errorMessage = `Oops! We don't have any more ${itemName} in stock right now, so you can't add more to your basket.`;
      setItemErrors(prev => ({
        ...prev,
        [itemId || index]: {
          case: errorMessage,
          charms: prev[itemId || index]?.charms || {}
        }
      }));
      
      
      setTimeout(() => {
        const itemElement = document.querySelector(`[data-item-id="${itemId || index}"]`);
        if (itemElement) {
          itemElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
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
          if (cartItem.id === itemId || cart.indexOf(cartItem) === index) return;
          
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
            [itemId || index]: {
              case: prev[itemId || index]?.case || null,
              charms: {
                ...(prev[itemId || index]?.charms || {}),
                [errorKey]: errorMessage
              }
            }
          }));
          // Also set error for all matching standalone charm items
          setErrorForAllIdenticalCharms(charmProduct, errorMessage);
          setTimeout(() => {
            const itemElement = document.querySelector(`[data-item-id="${itemId || index}"]`);
            if (itemElement) {
              itemElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }, 100);
          return;
        }
      }
    }
    
    // Stock available, allow increment
    incrementItemQty(itemId);
    // Clear error for the item
    setItemErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[itemId || index];
      return newErrors;
    });
    // Clear errors for all charms within this custom design (if it's a custom design)
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
          category: pin.category || 'colorful',
          type: 'charm'
        };
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
      setItemErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[itemId || index];
        return newErrors;
      });
    }
  };

  const handleCheckout = () => {
    if (cart.length > 0) {
      navigate("/checkout");
    }
  };

  const handleContinueShopping = () => {
    navigate("/CreateYours");
  };

  const handleNoteChange = (index, value) => {
    setNoteTexts({ ...noteTexts, [index]: value });
  };

  const handleSaveNote = (index) => {
    updateItemNote(index, noteTexts[index] || "");
    setOpenNoteIndex(null);
  };

  const formattedTotalPrice = formatPrice(getTotalPrice());

  return (
    <div className="min-h-screen bg-white py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <CartHeader
          totalItems={getTotalQuantity()}
          onBack={() => navigate("/")}
        />

        {cart.length === 0 ? (
          <EmptyCartState onContinueShopping={handleContinueShopping} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item, index) => (
                <CartItem
                  key={index}
                  item={item}
                  index={index}
                  formatPrice={formatPrice}
                  incrementItemQty={(id) => handleIncrementWithCheck(id, index)}
                  decrementItemQty={(id) => handleDecrementWithCheck(id, index)}
                  removeFromCart={removeFromCart}
                  openNoteIndex={openNoteIndex}
                  setOpenNoteIndex={setOpenNoteIndex}
                  noteTexts={noteTexts}
                  setNoteTexts={setNoteTexts}
                  handleNoteChange={handleNoteChange}
                  handleSaveNote={handleSaveNote}
                  errorMessage={typeof itemErrors[item.id || index] === 'string' ? itemErrors[item.id || index] : itemErrors[item.id || index]?.case}
                  charmErrors={itemErrors[item.id || index]?.charms || {}}
                />
              ))}
            </div>

            <OrderSummary
              totalPrice={formattedTotalPrice}
              onCheckout={handleCheckout}
            />
          </div>
        )}
      </div>

    </div>
  );
};

export default CartPage;
