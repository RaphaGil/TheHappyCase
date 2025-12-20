import React, { createContext, useContext, useReducer } from 'react';
import { getMaxAvailableQuantity } from '../utils/inventory';
import { areItemsIdentical } from '../utils/cartHelpers';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const newItem = { ...action.payload, id: action.payload.id || Date.now(), quantity: action.payload.quantity || 1 };
      const existingItemIndex = state.items.findIndex(item => areItemsIdentical(item, newItem));
      
      if (existingItemIndex !== -1) {
        // Item already exists, increment its quantity
        const existingItem = state.items[existingItemIndex];
        const maxAvailable = getMaxAvailableQuantity(existingItem, state.items);
        const currentQty = existingItem.quantity || 1;
        const newQty = currentQty + (newItem.quantity || 1);
        
        // Check if we can add the requested quantity
        // maxAvailable represents how many MORE can be added total
        const requestedQty = newItem.quantity || 1;
        // Prevent adding if maxAvailable is 0 (out of stock) or if requested quantity exceeds available
        if (maxAvailable !== null && (maxAvailable === 0 || requestedQty > maxAvailable)) {
          // Can't add requested quantity, return state unchanged (components will show modal)
          return state;
        }
        
        const updatedItem = { ...existingItem, quantity: newQty };
        const updatedCart = state.items.map((item, index) =>
          index === existingItemIndex
            ? updatedItem
            : item
        );
        console.log('✅ CartContext - Item quantity incremented in cart:', {
          itemName: updatedItem.name,
          oldQuantity: currentQty,
          newQuantity: newQty,
          item: updatedItem,
          allItemsInCart: updatedCart.map((item, idx) => ({
            itemNumber: idx + 1,
            name: item.name,
            type: item.type,
            category: item.category,
            quantity: item.quantity,
            price: item.price,
            caseType: item.caseType,
            color: item.color,
            customDesign: item.customDesign,
            pin: item.pin ? { name: item.pin.name, src: item.pin.src, category: item.pin.category } : null
          }))
        });
        return {
          ...state,
          items: updatedCart,
          isDrawerOpen: true,
        };
      } else {
        // New item, check stock before adding
        const maxAvailable = getMaxAvailableQuantity(newItem, state.items);
        const requestedQty = newItem.quantity || 1;
        
        // Prevent adding if maxAvailable is 0 (out of stock) or if requested quantity exceeds available
        if (maxAvailable !== null && (maxAvailable === 0 || requestedQty > maxAvailable)) {
          // Can't add item, return state unchanged (components will show modal)
          return state;
        }
        
        // Stock available, add it to cart
        const addedItem = { ...newItem, quantity: newItem.quantity || 1 };
        const updatedCart = [...state.items, addedItem];
        console.log('✅ CartContext - Item successfully added to cart state:', {
          item: addedItem,
          cartSize: updatedCart.length,
          allItemsInCart: updatedCart.map((item, idx) => ({
            itemNumber: idx + 1,
            name: item.name,
            type: item.type,
            category: item.category,
            quantity: item.quantity,
            price: item.price,
            caseType: item.caseType,
            color: item.color,
            customDesign: item.customDesign,
            pin: item.pin ? { name: item.pin.name, src: item.pin.src, category: item.pin.category } : null
          }))
        });
        return {
          ...state,
          items: updatedCart,
          isDrawerOpen: true,
        };
      }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter((item, index) => index !== action.payload),
      };
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };
    case 'OPEN_CART_DRAWER':
      return {
        ...state,
        isDrawerOpen: true,
      };
    case 'CLOSE_CART_DRAWER':
      return {
        ...state,
        isDrawerOpen: false,
      };
    case 'INCREMENT_ITEM_QTY':
      console.log('🔄 INCREMENT_ITEM_QTY reducer called:', { payload: action.payload, payloadType: typeof action.payload, itemsCount: state.items.length });
      const incrementedItems = state.items.map((item, index) => {
        // Match by id if payload is a string and item has an id, or by index if payload is a number
        let matches = false;
        
        if (typeof action.payload === 'string') {
          // Payload is a string - match by ID
          matches = item.id !== undefined && item.id === action.payload;
        } else if (typeof action.payload === 'number') {
          // Payload is a number - match by index
          matches = index === action.payload;
        }
        
        if (matches) {
          console.log('✅ Item matched in reducer:', { name: item.name || item.caseName, id: item.id, index, currentQty: item.quantity });
          const maxAvailable = getMaxAvailableQuantity(item, state.items);
          const currentQty = item.quantity || 1;
          // Only increment if inventory allows or is unlimited
          // maxAvailable represents how many MORE can be added total, so if it's > 0, we can add one more
          if (maxAvailable === null || maxAvailable > 0) {
            const updatedItem = { ...item, quantity: currentQty + 1 };
            console.log('✅ Incrementing quantity:', { oldQty: currentQty, newQty: updatedItem.quantity });
            return updatedItem;
          } else {
            console.log('⚠️ Inventory limit reached, not incrementing');
          }
          // If inventory limit reached, don't increment (components will show modal)
        }
        return item;
      });
      console.log('📦 Updated cart after increment:', incrementedItems.map((item, idx) => ({ index: idx, name: item.name || item.caseName, qty: item.quantity })));
      return {
        ...state,
        items: incrementedItems,
      };
    case 'DECREMENT_ITEM_QTY':
      console.log('🔄 DECREMENT_ITEM_QTY reducer called:', { payload: action.payload, payloadType: typeof action.payload, itemsCount: state.items.length });
      const decrementedItems = state.items.map((item, index) => {
        // Match by id if payload is a string and item has an id, or by index if payload is a number
        let matches = false;
        
        if (typeof action.payload === 'string') {
          // Payload is a string - match by ID
          matches = item.id !== undefined && item.id === action.payload;
        } else if (typeof action.payload === 'number') {
          // Payload is a number - match by index
          matches = index === action.payload;
        }
        
        if (matches) {
          const currentQty = item.quantity || 1;
          if (currentQty > 1) {
            const updatedItem = { ...item, quantity: currentQty - 1 };
            console.log('✅ Decrementing quantity:', { name: item.name || item.caseName, id: item.id, index, oldQty: currentQty, newQty: updatedItem.quantity });
            return updatedItem;
          } else {
            console.log('⚠️ Quantity already at minimum (1), not decrementing');
          }
        }
        return item;
      });
      console.log('📦 Updated cart after decrement:', decrementedItems.map((item, idx) => ({ index: idx, name: item.name || item.caseName, qty: item.quantity })));
      return {
        ...state,
        items: decrementedItems,
      };
    case 'SET_CHECKOUT_SESSION':
      return {
        ...state,
        checkoutSession: action.payload,
      };
    case 'UPDATE_ITEM_NOTE':
      return {
        ...state,
        items: state.items.map((item, index) =>
          index === action.payload.index ? { ...item, note: action.payload.note } : item
        ),
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    checkoutSession: null,
    isDrawerOpen: false,
  });

  const addToCart = (product) => {
    console.log('🛒 Adding item to cart:', {
      name: product.name,
      type: product.type,
      category: product.category,
      price: product.price,
      quantity: product.quantity || 1,
      caseType: product.caseType,
      color: product.color,
      pins: product.pins ? `${product.pins.length} pins` : 'no pins',
      pinsDetails: product.pinsDetails ? `${product.pinsDetails.length} pinsDetails` : 'no pinsDetails',
      customDesign: product.customDesign,
      pin: product.pin ? { name: product.pin.name, src: product.pin.src, category: product.pin.category } : 'no pin',
      fullProduct: product
    });
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (index) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: index });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const openCartDrawer = () => {
    dispatch({ type: 'OPEN_CART_DRAWER' });
  };

  const closeCartDrawer = () => {
    dispatch({ type: 'CLOSE_CART_DRAWER' });
  };

  const setCheckoutSession = (session) => {
    dispatch({ type: 'SET_CHECKOUT_SESSION', payload: session });
  };

  const updateItemNote = (index, note) => {
    dispatch({ type: 'UPDATE_ITEM_NOTE', payload: { index, note } });
  };

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => {
      let itemTotal = 0;
      
      if (item.type === "charm") {
        // For charms: unit price * quantity
        const singlePrice = item.price || item.totalPrice || 0;
        itemTotal = singlePrice * (item.quantity || 1);
      } else {
        // For cases: (base price + charms) * quantity
        const base = typeof item.basePrice === "number" ? item.basePrice : item.price || item.totalPrice || 0;
        const charmsTotal = item.pinsDetails && item.pinsDetails.length
          ? item.pinsDetails.reduce((sum, pin) => sum + (pin.price || 0), 0)
          : 0;
        itemTotal = (base + charmsTotal) * (item.quantity || 1);
      }
      
      return total + itemTotal;
    }, 0);
  };

  const getTotalItems = () => {
    return state.items.length;
  };

  const value = {
    cart: state.items,
    checkoutSession: state.checkoutSession,
    isDrawerOpen: state.isDrawerOpen,
    addToCart,
    removeFromCart,
    clearCart,
    openCartDrawer,
    closeCartDrawer,
    incrementItemQty: (id) => dispatch({ type: 'INCREMENT_ITEM_QTY', payload: id }),
    decrementItemQty: (id) => dispatch({ type: 'DECREMENT_ITEM_QTY', payload: id }),
    setCheckoutSession,
    updateItemNote,
    getTotalPrice,
    getTotalItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
