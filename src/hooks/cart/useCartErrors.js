'use client';

import { useState, useEffect, useRef } from 'react';
import { areItemsIdentical } from '../../utils/cartHelpers';

/**
 * Hook to manage cart item errors with auto-clear functionality
 */
export const useCartErrors = (cart) => {
  const [itemErrors, setItemErrors] = useState({});
  const errorTimeoutsRef = useRef({});

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

  // Set error for a specific item
  const setItemError = (itemKey, error) => {
    setItemErrors(prev => ({
      ...prev,
      [itemKey]: error
    }));
  };

  // Clear error for a specific item
  const clearItemError = (itemKey) => {
    setItemErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[itemKey];
      return newErrors;
    });
  };

  // Scroll to item element
  const scrollToItem = (itemId) => {
    setTimeout(() => {
      const itemElement = document.querySelector(`[data-item-id="${itemId}"]`);
      if (itemElement) {
        itemElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  return {
    itemErrors,
    setItemErrors,
    setErrorForAllIdenticalCharms,
    clearErrorForAllIdenticalCharms,
    setItemError,
    clearItemError,
    scrollToItem,
  };
};
