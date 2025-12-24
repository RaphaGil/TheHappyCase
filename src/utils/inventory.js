import Products from '../data/products.json';
import { areItemsIdentical } from './cartHelpers';
import { getApiUrl } from './apiConfig';

// Track if initialization warning has been shown (to avoid spam)
let initializationWarningShown = false;

/**
 * Fetch inventory from Supabase API (inventory_items table)
 * Falls back to localStorage if API fails
 */
const fetchInventoryFromSupabase = async () => {
  try {
    // Try to fetch from API (server endpoint)
    const response = await fetch(getApiUrl('/api/inventory'));
    if (response.ok) {
      const data = await response.json();
      if (data.success && data.inventory) {
        // Convert Supabase format to localStorage format
        const quantities = {
          cases: data.inventory.cases,
          caseColors: data.inventory.caseColors,
          pins: data.inventory.pins
        };
        
        // Cache in localStorage for offline use
        localStorage.setItem('productQuantities', JSON.stringify(quantities));
        localStorage.setItem('productQuantitiesTimestamp', Date.now().toString());
        
        console.log('✅ Inventory loaded from Supabase inventory_items table');
        return quantities;
      }
    }
  } catch (error) {
    console.debug('Failed to fetch inventory from Supabase, using localStorage fallback:', error.message);
  }
  
  return null;
};

/**
 * Directly fetch quantity for a specific item from Supabase inventory_items table
 * @param {string} itemId - The item_id (e.g., "case-1-color-#f49f90" or "pin-flags-1")
 * @returns {Promise<number|null>} - Quantity in stock (null if unlimited or not found)
 */
export const getItemQuantityFromSupabase = async (itemId) => {
  try {
    const response = await fetch(getApiUrl('/api/inventory/items'));
    if (response.ok) {
      const data = await response.json();
      if (data.success && data.items) {
        const item = data.items.find(i => i.item_id === itemId);
        if (item) {
          return item.qty_in_stock; // null means unlimited
        }
      }
    }
  } catch (error) {
    console.debug('Failed to fetch item quantity from Supabase:', error.message);
  }
  return null;
};

/**
 * Initialize productQuantities from Supabase inventory_items table
 * 
 * Priority:
 * 1. Supabase API - inventory_items table (source of truth)
 * 2. localStorage (cached, 5-minute TTL)
 * 3. products.json (fallback only if Supabase unavailable)
 */
export const initializeQuantities = async () => {
  // Check if quantities already exist in localStorage and are recent (< 5 minutes old)
  const savedQuantities = localStorage.getItem('productQuantities');
  const timestamp = localStorage.getItem('productQuantitiesTimestamp');
  const isRecent = timestamp && (Date.now() - parseInt(timestamp)) < 5 * 60 * 1000; // 5 minutes
  
  if (savedQuantities && isRecent) {
    try {
      // Validate that saved quantities are valid JSON
      JSON.parse(savedQuantities);
      return; // Already initialized and recent
    } catch (e) {
      // Invalid JSON, clear it
      localStorage.removeItem('productQuantities');
      localStorage.removeItem('productQuantitiesTimestamp');
    }
  }

  // Try to fetch from Supabase API
  const supabaseQuantities = await fetchInventoryFromSupabase();
  if (supabaseQuantities) {
    return; // Successfully loaded from Supabase
  }

  // Fallback: Extract quantities from products.json and initialize localStorage
  try {
    const quantities = {
      cases: Products.cases.map(c => c.quantity ?? null),
      caseColors: Products.cases.map(c => 
        c.colors?.map(col => col.quantity ?? null) || []
      ),
      pins: {
        flags: Products.pins?.flags?.map(p => p.quantity ?? null) || [],
        colorful: Products.pins?.colorful?.map(p => p.quantity ?? null) || [],
        bronze: Products.pins?.bronze?.map(p => p.quantity ?? null) || [],
      }
    };

    // Only save if we found at least some quantities
    const hasQuantities = 
      quantities.cases.some(q => q !== null) ||
      quantities.caseColors.some(arr => arr.some(q => q !== null)) ||
      Object.values(quantities.pins).some(arr => arr.some(q => q !== null));

    if (hasQuantities) {
      localStorage.setItem('productQuantities', JSON.stringify(quantities));
      localStorage.setItem('productQuantitiesTimestamp', Date.now().toString());
    }
    // Silently continue if no quantities found - items will show as unlimited until set via Dashboard
  } catch (error) {
    if (!initializationWarningShown) {
      console.error('Error initializing quantities:', error);
      initializationWarningShown = true;
    }
  }
};

/**
 * Get the maximum available quantity for an item based on inventory from Supabase
 * @param {Object} item - The product/item to check
 * @param {Array} cart - Array of items currently in the cart
 * @returns {number|null} - Maximum quantity available (null if unlimited)
 */
export const getMaxAvailableQuantity = (item, cart) => {
  // Initialize quantities on first call if needed (async but we use cached localStorage)
  // Note: initializeQuantities fetches from Supabase inventory_items table
  if (!localStorage.getItem('productQuantities')) {
    initializeQuantities(); // Fire and forget - will update localStorage when ready
  }

  // Get saved quantities from localStorage (cached from Supabase)
  const savedQuantities = localStorage.getItem('productQuantities');
  let quantities = null;
  
  if (savedQuantities) {
    try {
      quantities = JSON.parse(savedQuantities);
    } catch (error) {
      console.error('Error parsing saved quantities:', error);
    }
  }
  
  // If no cached data, try to refresh from Supabase (but return null for now to avoid blocking)
  if (!quantities) {
    // Trigger a background refresh
    initializeQuantities();
    return null; // Return unlimited until data loads
  }

  // Handle case items - get quantity from Supabase inventory_items table
  if (item.caseType && item.color) {
    // Find the case in Products
    const caseData = Products.cases.find(c => c.type === item.caseType);
    if (!caseData) return null;

    // Get color-specific quantity from Supabase (via cached localStorage)
    let maxQuantity = null;

    // Primary: Get from caseColors array (from Supabase inventory_items table)
    if (quantities && quantities.caseColors) {
      const caseIndex = Products.cases.findIndex(c => c.type === item.caseType);
      if (caseIndex !== -1 && quantities.caseColors[caseIndex]) {
        const colorIndex = caseData.colors.findIndex(c => c.color === item.color);
        if (colorIndex !== -1 && quantities.caseColors[caseIndex][colorIndex] !== undefined) {
          maxQuantity = quantities.caseColors[caseIndex][colorIndex];
        }
      }
    }

    // Fallback: Get from cases array (overall case quantity from Supabase)
    if (maxQuantity === null && quantities && quantities.cases) {
      const caseIndex = Products.cases.findIndex(c => c.type === item.caseType);
      if (caseIndex !== -1 && quantities.cases[caseIndex] !== undefined) {
        maxQuantity = quantities.cases[caseIndex];
      }
    }

    // If no quantity limit found in Supabase, return null (unlimited)
    // Note: We no longer fall back to products.json quantities - Supabase is the source of truth
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

  // Handle charm items - get quantity from Supabase inventory_items table
  if (item.type === 'charm' || item.category || item.pin) {
    const category = item.category || (item.pin && item.pin.category);
    const pinName = item.pin?.name || item.pin?.src || item.name;
    
    if (!category || !pinName) return null;

    // Find the charm in Products to get the ID
    let charmData = null;
    if (Products.pins && Products.pins[category]) {
      charmData = Products.pins[category].find(
        p => (p.name === pinName || p.src === pinName)
      );
    }

    if (!charmData) return null;

    let maxQuantity = null;

    // Get quantity from Supabase (via cached localStorage)
    // Map category to the correct key: 'flags' -> 'pin_flags', 'colorful' -> 'pin_colorful', 'bronze' -> 'pin_bronze'
    const categoryKey = category === 'flags' ? 'flags' : category;
    
    if (quantities && quantities.pins && quantities.pins[categoryKey]) {
      const pinIndex = Products.pins[categoryKey].findIndex(
        p => (p.name === pinName || p.src === pinName || p.id === charmData.id)
      );
      if (pinIndex !== -1 && quantities.pins[categoryKey][pinIndex] !== undefined) {
        maxQuantity = quantities.pins[categoryKey][pinIndex];
      }
    }

    // If no quantity limit found in Supabase, return null (unlimited)
    // Note: We no longer fall back to products.json quantities - Supabase is the source of truth
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

/**
 * Force refresh inventory from Supabase inventory_items table
 * Useful when you want to get the latest inventory data
 * @returns {Promise<Object|null>} - Updated quantities object or null if failed
 */
export const refreshInventoryFromSupabase = async () => {
  // Clear cache to force fresh fetch
  localStorage.removeItem('productQuantities');
  localStorage.removeItem('productQuantitiesTimestamp');
  
  // Fetch fresh data from Supabase
  const quantities = await fetchInventoryFromSupabase();
  
  if (quantities) {
    console.log('✅ Inventory refreshed from Supabase inventory_items table');
  }
  
  return quantities;
};


