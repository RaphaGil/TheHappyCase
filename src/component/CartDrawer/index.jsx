import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';
import { getMaxAvailableQuantity } from '../../utils/inventory';
import CartDrawerHeader from './components/CartDrawerHeader';
import EmptyCart from './components/EmptyCart';
import CartItem from './components/CartItem';
import CartDrawerFooter from './components/CartDrawerFooter';
import InventoryAlertModal from '../InventoryAlertModal';

const CartDrawer = () => {
  const { cart, isDrawerOpen, closeCartDrawer, getTotalPrice, incrementItemQty, decrementItemQty, removeFromCart, updateItemNote } = useCart();
  const { formatPrice } = useCurrency();
  const [openNoteIndex, setOpenNoteIndex] = useState(null);
  const [noteTexts, setNoteTexts] = useState({});
  const [itemErrors, setItemErrors] = useState({}); // Track errors per item ID
  const [showInventoryModal, setShowInventoryModal] = useState(false);
  const [inventoryMessage, setInventoryMessage] = useState('');
  const [inventoryType, setInventoryType] = useState('error');

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

  // Helper function to get color name from image filename
  const getColorName = (image) => {
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

  const handleIncrementWithCheck = (itemId) => {
    const item = cart.find(i => i.id === itemId);
    if (!item) return;
    
    // Check case inventory first (for custom designs or standalone cases)
    const maxAvailable = getMaxAvailableQuantity(item, cart);
    // maxAvailable === null means unlimited, maxAvailable > 0 means we can add more
    // maxAvailable === 0 means no more can be added
    const canIncrementCase = maxAvailable === null || maxAvailable > 0;
    
    if (!canIncrementCase) {
      // Case is out of stock
      let itemName = item.caseName || item.name || 'Passport Case';
      let colorName = '';
      
      // Get color name from case image or color
      if (item.caseImage || item.image) {
        const imagePath = (item.caseImage || item.image);
        colorName = getColorName(imagePath);
      }
      
      const colorText = colorName ? ` in ${colorName}` : '';
      const errorMessage = `We don't have any more ${itemName}${colorText} in stock to be added anymore.`;
      
      setItemErrors(prev => ({
        ...prev,
        [itemId]: errorMessage
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
        
        const charmCategory = pin.category || 'colorful';
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
          // Show alert modal for charms when out of stock
          setInventoryMessage(errorMessage);
          setInventoryType('error');
          setShowInventoryModal(true);
          // Also show inline error message
          setItemErrors(prev => ({
            ...prev,
            [itemId]: errorMessage
          }));
          return;
        }
      }
    }
    
    // All checks passed, allow increment
    if (item.type === 'charm') {
      // For standalone charms
      const itemName = item.name || item.pin?.name || 'Charm';
      // Show alert modal for charms when out of stock (if maxAvailable is 0)
      if (maxAvailable === 0) {
        const errorMessage = `Oops! We don't have any more ${itemName} in stock right now, so you can't add more to your basket.`;
        setInventoryMessage(errorMessage);
        setInventoryType('error');
        setShowInventoryModal(true);
        setItemErrors(prev => ({
          ...prev,
          [itemId]: errorMessage
        }));
        return;
      }
    }
    
    // Stock available, allow increment
    incrementItemQty(itemId);
    // Clear error when successfully incrementing
    setItemErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[itemId];
      return newErrors;
    });
  };

  const handleDecrementWithCheck = (itemId) => {
    decrementItemQty(itemId);
    // Clear error when decrementing
    setItemErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[itemId];
      return newErrors;
    });
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
        className={`absolute right-0 top-0 h-full w-full sm:w-2/3 lg:w-1/4 bg-white shadow-2xl transform transition-transform duration-300 flex flex-col ${
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
                errorMessage={itemErrors[item.id]}
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

      {/* Inventory Alert Modal for Charms */}
      <InventoryAlertModal
        show={showInventoryModal}
        onClose={() => setShowInventoryModal(false)}
        message={inventoryMessage}
        type={inventoryType}
      />
    </div>
  );
};

export default CartDrawer;


