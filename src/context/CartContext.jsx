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
        if (maxAvailable !== null && requestedQty > maxAvailable) {
          // Can't add requested quantity, return state unchanged (components will show modal)
          return state;
        }
        
        return {
          ...state,
          items: state.items.map((item, index) =>
            index === existingItemIndex
              ? { ...item, quantity: newQty }
              : item
          ),
          isDrawerOpen: true,
        };
      } else {
        // New item, add it to cart
        return {
          ...state,
          items: [...state.items, { ...newItem, quantity: newItem.quantity || 1 }],
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
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.payload) {
            const maxAvailable = getMaxAvailableQuantity(item, state.items);
            const currentQty = item.quantity || 1;
            // Only increment if inventory allows or is unlimited
            // maxAvailable represents how many MORE can be added total, so if it's > 0, we can add one more
            if (maxAvailable === null || maxAvailable > 0) {
              return { ...item, quantity: currentQty + 1 };
            }
            // If inventory limit reached, don't increment (components will show modal)
          }
          return item;
        }),
      };
    case 'DECREMENT_ITEM_QTY':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload && (item.quantity || 1) > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
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
