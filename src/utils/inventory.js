import Products from '../data/products.json';
import { areItemsIdentical } from './cartHelpers';

/**
 * Get the maximum available quantity for an item based on inventory
 * @param {Object} item - The product/item to check
 * @param {Array} cart - Array of items currently in the cart
 * @returns {number|null} - Maximum quantity available (null if unlimited)
 */
export const getMaxAvailableQuantity = (item, cart) => {
  // Get saved quantities from localStorage
  const savedQuantities = localStorage.getItem('productQuantities');
  let quantities = null;
  
  if (savedQuantities) {
    try {
      quantities = JSON.parse(savedQuantities);
    } catch (error) {
      console.error('Error parsing saved quantities:', error);
    }
  }

  // Handle case items
  if (item.caseType && item.color) {
    // Find the case in Products
    const caseData = Products.cases.find(c => c.type === item.caseType);
    if (!caseData) return null;

    // Get color-specific quantity if available
    const colorData = caseData.colors.find(c => c.color === item.color);
    let maxQuantity = null;

    if (quantities && quantities.caseColors) {
      const caseIndex = Products.cases.findIndex(c => c.type === item.caseType);
      if (caseIndex !== -1 && quantities.caseColors[caseIndex]) {
        const colorIndex = caseData.colors.findIndex(c => c.color === item.color);
        if (colorIndex !== -1 && quantities.caseColors[caseIndex][colorIndex] !== undefined) {
          maxQuantity = quantities.caseColors[caseIndex][colorIndex];
        }
      }
    }

    // Fallback to case-level quantity
    if (maxQuantity === null && quantities && quantities.cases) {
      const caseIndex = Products.cases.findIndex(c => c.type === item.caseType);
      if (caseIndex !== -1 && quantities.cases[caseIndex] !== undefined) {
        maxQuantity = quantities.cases[caseIndex];
      }
    }

    // Fallback to product data quantity
    if (maxQuantity === null && colorData && colorData.quantity !== undefined) {
      maxQuantity = colorData.quantity;
    }
    if (maxQuantity === null && caseData.quantity !== undefined) {
      maxQuantity = caseData.quantity;
    }

    // If no quantity limit found, return null (unlimited)
    if (maxQuantity === null || maxQuantity === undefined) {
      return null;
    }

    // Count how many items with same caseType+color are already in cart
    // (Inventory is shared across all pin combinations for the same case+color)
    const alreadyInCart = cart.reduce((total, cartItem) => {
      // Check if cart item matches by caseType and color (ignore pins for inventory)
      if (cartItem.caseType === item.caseType && cartItem.color === item.color) {
        return total + (cartItem.quantity || 1);
      }
      return total;
    }, 0);

    // Return how many MORE can be added
    const available = maxQuantity - alreadyInCart;
    return Math.max(0, available);
  }

  // Handle charm items
  if (item.type === 'charm' || item.category || item.pin) {
    const category = item.category || (item.pin && item.pin.category);
    const pinName = item.pin?.name || item.pin?.src || item.name;
    
    if (!category || !pinName) return null;

    // Find the charm in Products
    let charmData = null;
    if (Products.pins && Products.pins[category]) {
      charmData = Products.pins[category].find(
        p => (p.name === pinName || p.src === pinName)
      );
    }

    if (!charmData) return null;

    let maxQuantity = null;

    // Get quantity from localStorage
    if (quantities && quantities.pins && quantities.pins[category]) {
      const pinIndex = Products.pins[category].findIndex(
        p => (p.name === pinName || p.src === pinName)
      );
      if (pinIndex !== -1 && quantities.pins[category][pinIndex] !== undefined) {
        maxQuantity = quantities.pins[category][pinIndex];
      }
    }

    // Fallback to product data quantity
    if (maxQuantity === null && charmData.quantity !== undefined) {
      maxQuantity = charmData.quantity;
    }

    // If no quantity limit found, return null (unlimited)
    if (maxQuantity === null || maxQuantity === undefined) {
      return null;
    }

    // Count how many identical items are already in cart
    const alreadyInCart = cart.reduce((total, cartItem) => {
      if (areItemsIdentical(item, cartItem)) {
        return total + (cartItem.quantity || 1);
      }
      return total;
    }, 0);

    // Return how many MORE can be added
    const available = maxQuantity - alreadyInCart;
    return Math.max(0, available);
  }

  // Unknown item type, return null (unlimited)
  return null;
};
