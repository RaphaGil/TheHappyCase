import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        items: [...state.items, { ...action.payload, id: Date.now(), quantity: 1 }],
        isDrawerOpen: true,
      };
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
        items: state.items.map((item) =>
          item.id === action.payload ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        ),
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
    return state.items.reduce((total, item) => total + item.totalPrice * (item.quantity || 1), 0);
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
