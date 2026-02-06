import Products from '../data/products.json';
import { areItemsIdentical } from './cartHelpers';
import { getApiUrl } from './apiConfig';

// In-memory cache for inventory data (always fetched from Supabase)
let inventoryCache = null;
let inventoryCacheTimestamp = null;
let inventoryFetchPromise = null; // Track ongoing fetch to avoid duplicate requests
let isInitializing = false; // Track if we're in the initial load phase

/**
 * Fetch inventory from Supabase API (inventory_items table)
 * Updates in-memory cache with fresh data from Supabase
 * @returns {Promise<Object|null>} - Inventory quantities object or null if failed
 */
const fetchInventoryFromSupabase = async () => {
  // If there's already a fetch in progress, wait for it
  if (inventoryFetchPromise) {
    return inventoryFetchPromise;
  }

  inventoryFetchPromise = (async () => {
    try {
      // Mark as initializing if cache is empty
      if (!inventoryCache) {
        isInitializing = true;
      }
      
      // Try to fetch from API (server endpoint) with timeout
      const apiUrl = getApiUrl('/api/inventory');
      
      // Create an AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const safeParseJSON = async (response) => {
        const contentType = response.headers.get('content-type');
        const text = await response.text();
      
        // Check if response is HTML (likely SPA fallback or 404 page)
        if (!contentType || !contentType.includes('application/json')) {
          // If it's HTML, it means the API route wasn't found (Netlify Function not deployed/routed)
          if (text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) {
            // Return special marker to trigger fallback to direct function URL
            throw new Error('HTML_RESPONSE_FALLBACK');
          }
          throw new Error(`Expected JSON, got: ${text.substring(0, 100)}...`);
        }
      
        // Parse JSON from the text we already read
        try {
          return JSON.parse(text);
        } catch (parseError) {
          throw new Error(`Failed to parse JSON response: ${parseError.message}`);
        }
      };
      
      try {
        const response = await fetch(apiUrl, {
          signal: controller.signal,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
          const data = await safeParseJSON(response);

          if (data.success && data.inventory) {
            // Convert Supabase format to quantities format
            const quantities = {
              cases: data.inventory.cases,
              caseColors: data.inventory.caseColors,
              pins: data.inventory.pins
            };
            
            // Check if we actually have inventory data (not just null values)
            const hasInventoryData = (
              (quantities.cases && Array.isArray(quantities.cases) && quantities.cases.some(qty => qty !== null)) ||
              (quantities.caseColors && Array.isArray(quantities.caseColors) && quantities.caseColors.some(arr => arr && arr.some(qty => qty !== null))) ||
              (quantities.pins && (
                (quantities.pins.flags && quantities.pins.flags.some(qty => qty !== null)) ||
                (quantities.pins.colorful && quantities.pins.colorful.some(qty => qty !== null)) ||
                (quantities.pins.bronze && quantities.pins.bronze.some(qty => qty !== null))
              ))
            );
            
            // Update in-memory cache
            inventoryCache = quantities;
            inventoryCacheTimestamp = Date.now();
            
            // Dispatch custom events to notify listeners of cache update
            // Dispatch both event names for backward compatibility
            if (typeof window !== 'undefined') {
              const eventDetail = { timestamp: inventoryCacheTimestamp };
              window.dispatchEvent(new CustomEvent('inventoryCacheUpdated', { detail: eventDetail }));
              window.dispatchEvent(new CustomEvent('inventoryUpdated', { detail: eventDetail }));
            }
            
            // Mark initialization as complete
            isInitializing = false;
            
            return quantities;
          }
        } else if (response.status === 404) {
          // If 404, try direct function URL as fallback (in case redirect rule isn't working)
          const functionUrl = apiUrl.replace('/api/inventory', '/.netlify/functions/inventory');
          try {
            const directResponse = await fetch(functionUrl, {
              signal: controller.signal,
              headers: {
                'Content-Type': 'application/json',
              },
            });
            if (directResponse.ok) {
              const data = await safeParseJSON(directResponse);
              if (data.success && data.inventory) {
                const quantities = {
                  cases: data.inventory.cases,
                  caseColors: data.inventory.caseColors,
                  pins: data.inventory.pins
                };
                
                // Update in-memory cache
                inventoryCache = quantities;
                inventoryCacheTimestamp = Date.now();
                
                return quantities;
              }
            }
          } catch (directError) {
            // Fall through to error handling
          }
        }
      } catch (fetchError) {
        clearTimeout(timeoutId);
        isInitializing = false; // Mark initialization as complete even on error
        
        // If HTML response detected, try direct function URL as fallback
        if (fetchError.message === 'HTML_RESPONSE_FALLBACK') {
          const functionUrl = apiUrl.replace('/api/inventory', '/.netlify/functions/inventory');
          try {
            const directController = new AbortController();
            const directTimeoutId = setTimeout(() => directController.abort(), 10000);
            
            const directResponse = await fetch(functionUrl, {
              signal: directController.signal,
              headers: {
                'Content-Type': 'application/json',
              },
            });
            
            clearTimeout(directTimeoutId);
            
            if (directResponse.ok) {
              const data = await safeParseJSON(directResponse);
              if (data.success && data.inventory) {
                const quantities = {
                  cases: data.inventory.cases,
                  caseColors: data.inventory.caseColors,
                  pins: data.inventory.pins
                };
                
                // Update in-memory cache
                inventoryCache = quantities;
                inventoryCacheTimestamp = Date.now();
                
                return quantities;
              }
            }
          } catch (directError) {
            // Fall through to original error handling
          }
        }
        
        // Silently handle errors
      }
    } catch (error) {
      isInitializing = false; // Clear flag on error
    } finally {
      // Clear the promise so next fetch can proceed
      inventoryFetchPromise = null;
      isInitializing = false; // Ensure flag is cleared
    }
    
    return null;
  })();

  return inventoryFetchPromise;
};

/**
 * Directly fetch quantity for a specific item from Supabase inventory_items table
 * @param {string} itemId - The item_id (e.g., "case-1-color-#f49f90" or "pin-flags-1")
 * @returns {Promise<number|null>} - Quantity in stock (null if unlimited or not found)
 */
export const getItemQuantityFromSupabase = async (itemId) => {
  try {
    const apiUrl = getApiUrl('/api/inventory/items');
    
    // Create an AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    try {
      const response = await fetch(apiUrl, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.items) {
          const item = data.items.find(i => i.item_id === itemId);
          if (item) {
            return item.qty_in_stock; // null means unlimited
          }
        }
      }
    } catch (fetchError) {
      clearTimeout(timeoutId);
      if (fetchError.name !== 'AbortError') {
        throw fetchError; // Re-throw non-timeout errors
      }
    }
  } catch (error) {
    // Silently handle errors
  }
  return null;
};

/**
 * Initialize inventory from Supabase API
 * Always fetches fresh data from Supabase (no localStorage fallback)
 * @returns {Promise<void>}
 */
export const initializeQuantities = async () => {
  // Always fetch fresh data from Supabase
  await fetchInventoryFromSupabase();
};

/**
 * Get the maximum available quantity for an item based on inventory from Supabase
 * Uses in-memory cache that's always kept fresh from Supabase
 * @param {Object} item - The product/item to check
 * @param {Array} cart - Array of items currently in the cart
 * @returns {number|null} - Maximum quantity available (null if unlimited)
 */
export const getMaxAvailableQuantity = (item, cart) => {
  // If cache is empty and we're still initializing, wait for the fetch to complete
  if (!inventoryCache && inventoryFetchPromise && isInitializing) {
    // Cache is being populated - return null for now (will be checked again after cache is populated)
    // Don't log warning during initialization
    return null;
  }
  
  // Trigger background refresh if cache is empty or stale (> 1 minute old)
  const cacheAge = inventoryCacheTimestamp ? Date.now() - inventoryCacheTimestamp : Infinity;
  const isStale = !inventoryCache || cacheAge > 60 * 1000; // 1 minute
  
  if (isStale && !isInitializing) {
    // Fetch fresh data in background (fire and forget) - but not if we're already initializing
    fetchInventoryFromSupabase().catch(() => {
      // Silently handle errors
    });
  }

  // Use cached data if available, otherwise return null (unlimited)
  const quantities = inventoryCache;
  
  // If cache is not populated, return null (unlimited stock)
  // This happens when:
  // 1. Cache hasn't loaded yet (should be handled by waiting for inventoryInitialized)
  // 2. No items in Supabase inventory table (unlimited stock)
  if (!quantities) {
    return null; // No inventory data yet, return unlimited
  }
  
  // Verify cache structure is valid
  if (!quantities.caseColors && !quantities.cases && !quantities.pins) {
    // Cache exists but has no valid structure - treat as unlimited
    return null;
  }

  // Handle case items - get quantity from Supabase inventory_items table
  if (item.caseType && item.color) {
    // Find the case in Products
    const caseData = Products.cases.find(c => c.type === item.caseType);
    if (!caseData) return null;

    // Get color-specific quantity from Supabase (via in-memory cache)
    let maxQuantity = null;

    // Primary: Get from caseColors array (from Supabase inventory_items table)
    if (quantities && quantities.caseColors) {
      const caseIndex = Products.cases.findIndex(c => c.type === item.caseType);
      if (caseIndex !== -1 && quantities.caseColors[caseIndex]) {
        const colorIndex = caseData.colors.findIndex(c => c.color === item.color);
        // Check if value exists (including 0, which means sold out)
        // null/undefined means item not in Supabase (unlimited)
        if (colorIndex !== -1 && quantities.caseColors[caseIndex][colorIndex] !== null && quantities.caseColors[caseIndex][colorIndex] !== undefined) {
          const stock = quantities.caseColors[caseIndex][colorIndex]; // This is qty_in_stock from Supabase
          maxQuantity = stock;
        }
      }
    }

    // Fallback: Get from cases array (overall case quantity from Supabase)
    if (maxQuantity === null && quantities && quantities.cases) {
      const caseIndex = Products.cases.findIndex(c => c.type === item.caseType);
      // Check if value exists (including 0, which means sold out)
      // null/undefined means item not in Supabase (unlimited)
      if (caseIndex !== -1 && quantities.cases[caseIndex] !== null && quantities.cases[caseIndex] !== undefined) {
        const stock = quantities.cases[caseIndex]; // This is qty_in_stock from Supabase
        maxQuantity = stock;
      }
    }

    // Check if item exists in Supabase inventory_items table
    // If item doesn't exist in Supabase (maxQuantity is null/undefined), return null (unlimited)
    if (maxQuantity === null || maxQuantity === undefined) {
      return null; // Item not in Supabase - unlimited stock
    }

    // If item exists in Supabase and qty is 0, show sold out immediately
    // This check happens BEFORE considering cart items
    if (maxQuantity === 0) {
      return 0; // Sold out - item exists in Supabase but qty is 0
    }

    // If item exists in Supabase and qty > 0, subtract items already in cart
    // Count how many items with same caseType+color are already in cart
    // (Inventory is shared across all pin combinations for the same case+color)
    const alreadyInCart = cart.reduce((total, cartItem) => {
      // Check if cart item matches by caseType and color (ignore pins for inventory)
      if (cartItem.caseType === item.caseType && cartItem.color === item.color) {
        return total + (cartItem.quantity || 1);
      }
      return total;
    }, 0);

    // Calculate: Supabase qty_in_stock - cart items
    const available = maxQuantity - alreadyInCart;
    
    // If available === 0, show sold out (all items are in cart)
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

    // Get quantity from Supabase (via in-memory cache)
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

    // Check if item exists in Supabase inventory_items table
    // If item doesn't exist in Supabase (maxQuantity is null/undefined), return null (unlimited)
    if (maxQuantity === null || maxQuantity === undefined) {
      return null; // Item not in Supabase - unlimited stock
    }

    // If item exists in Supabase and qty is 0, show sold out immediately
    // This check happens BEFORE considering cart items
    if (maxQuantity === 0) {
      return 0; // Sold out - item exists in Supabase but qty is 0
    }

    // If item exists in Supabase and qty > 0, subtract items already in cart
    // Count how many identical items are already in cart
    const alreadyInCart = cart.reduce((total, cartItem) => {
      if (areItemsIdentical(item, cartItem)) {
        return total + (cartItem.quantity || 1);
      }
      return total;
    }, 0);

    // Calculate: Supabase qty - cart items
    const available = maxQuantity - alreadyInCart;
    
    // If available === 0, show sold out (all items are in cart)
    return Math.max(0, available);
  }

  // Unknown item type, return null (unlimited)
  return null;
};

/**
 * Get the current cached inventory quantities
 * Returns null if cache is empty
 * @returns {Object|null} - Cached inventory quantities or null
 */
export const getCachedInventory = () => {
  return inventoryCache;
};

/**
 * Force refresh inventory from Supabase inventory_items table
 * Always fetches fresh data from Supabase API
 * @returns {Promise<Object|null>} - Updated quantities object or null if failed
 */
export const refreshInventoryFromSupabase = async () => {
  // Clear in-memory cache to force fresh fetch
  inventoryCache = null;
  inventoryCacheTimestamp = null;
  
  // Fetch fresh data from Supabase
  const quantities = await fetchInventoryFromSupabase();
  
  return quantities;
};
