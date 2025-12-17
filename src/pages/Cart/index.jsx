import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useCurrency } from "../../context/CurrencyContext";
import { useNavigate } from "react-router-dom";
import { getMaxAvailableQuantity } from "../../utils/inventory";
import CartHeader from "./components/CartHeader";
import EmptyCartState from "./components/EmptyCartState";
import CartItem from "./components/CartItem";
import OrderSummary from "./components/OrderSummary";
import InventoryAlertModal from "../../component/InventoryAlertModal";

const CartPage = () => {
  const {
    cart,
    removeFromCart,
    getTotalPrice,
    getTotalItems,
    incrementItemQty,
    decrementItemQty,
    updateItemNote,
  } = useCart();
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();
  const [openNoteIndex, setOpenNoteIndex] = useState(null);
  const [noteTexts, setNoteTexts] = useState({});
  const [itemErrors, setItemErrors] = useState({}); // Track errors per item ID
  const [showInventoryModal, setShowInventoryModal] = useState(false);
  const [inventoryMessage, setInventoryMessage] = useState('');
  const [inventoryType, setInventoryType] = useState('error');

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

  const handleIncrementWithCheck = (itemId, index) => {
    const item = cart.find(i => (i.id === itemId) || (cart.indexOf(i) === index));
    if (!item) return;
    
    // Check case inventory first (for custom designs or standalone cases)
    const maxAvailable = getMaxAvailableQuantity(item, cart);
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
        [itemId || index]: errorMessage
      }));
      return;
    }
    
    // For custom designs from CreateYours, check charm inventory
    if ((item.pins && Array.isArray(item.pins) && item.pins.length > 0) || 
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
          // Show alert modal for charms when out of stock
          setInventoryMessage(errorMessage);
          setInventoryType('error');
          setShowInventoryModal(true);
          // Also show inline error message
          setItemErrors(prev => ({
            ...prev,
            [itemId || index]: errorMessage
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
          [itemId || index]: errorMessage
        }));
        return;
      }
    }
    
    // Stock available, allow increment
    incrementItemQty(itemId);
    // Clear error when successfully incrementing
    setItemErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[itemId || index];
      return newErrors;
    });
  };

  const handleDecrementWithCheck = (itemId, index) => {
    decrementItemQty(itemId);
    // Clear error when decrementing
    setItemErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[itemId || index];
      return newErrors;
    });
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
          totalItems={getTotalItems()}
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
                  errorMessage={itemErrors[item.id || index]}
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

      {/* Inventory Alert Modal */}
      <InventoryAlertModal
        show={showInventoryModal}
        onClose={() => setShowInventoryModal(false)}
        message={inventoryMessage}
        type={inventoryType}
      />
    </div>
  );
};

export default CartPage;
