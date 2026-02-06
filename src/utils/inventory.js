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
        console.log('[INVENTORY] 🔍 Fetching inventory from:', apiUrl);
        const response = await fetch(apiUrl, {
          signal: controller.signal,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        clearTimeout(timeoutId);
        
        console.log('[INVENTORY] 📡 Response status:', response.status, response.statusText);
        
        if (response.ok) {
          const data = await safeParseJSON(response);
          
          // Log full response structure for debugging
          console.log('[INVENTORY] ✅ Received inventory data:', {
            success: data.success,
            hasInventory: !!data.inventory,
            inventoryType: typeof data.inventory,
            inventoryKeys: data.inventory ? Object.keys(data.inventory) : null,
            casesType: typeof data.inventory?.cases,
            casesIsArray: Array.isArray(data.inventory?.cases),
            casesLength: data.inventory?.cases?.length,
            casesValue: data.inventory?.cases,
            caseColorsType: typeof data.inventory?.caseColors,
            caseColorsIsArray: Array.isArray(data.inventory?.caseColors),
            caseColorsLength: data.inventory?.caseColors?.length,
            caseColorsValue: data.inventory?.caseColors,
            pinsType: typeof data.inventory?.pins,
            pinsKeys: data.inventory?.pins ? Object.keys(data.inventory.pins) : null,
            pinsFlagsLength: data.inventory?.pins?.flags?.length,
            pinsColorfulLength: data.inventory?.pins?.colorful?.length,
            pinsBronzeLength: data.inventory?.pins?.bronze?.length,
            fullInventory: data.inventory // Log full structure
          });

          if (data.success && data.inventory) {
            console.log('[INVENTORY] 🔄 STEP 5: Parsing inventory data from API response...');
            
            // Convert Supabase format to quantities format
            const quantities = {
              cases: data.inventory.cases,
              caseColors: data.inventory.caseColors,
              pins: data.inventory.pins
            };
            
            console.log('[INVENTORY] 🔍 STEP 5.1: Parsed quantities structure:', {
              casesType: typeof quantities.cases,
              casesIsArray: Array.isArray(quantities.cases),
              casesValue: quantities.cases,
              caseColorsType: typeof quantities.caseColors,
              caseColorsIsArray: Array.isArray(quantities.caseColors),
              caseColorsValue: quantities.caseColors,
              pinsType: typeof quantities.pins,
              pinsValue: quantities.pins
            });
            
            // Log sample of caseColors received
            if (Array.isArray(quantities.caseColors)) {
              console.log('[INVENTORY] 🔍 STEP 5.2: Sample caseColors received (first 2 cases):');
              quantities.caseColors.slice(0, 2).forEach((colorArray, caseIdx) => {
                console.log(`[INVENTORY]   Case ${caseIdx}:`, {
                  arrayLength: colorArray?.length,
                  isArray: Array.isArray(colorArray),
                  first3Colors: colorArray?.slice(0, 3).map((qty, idx) => ({
                    index: idx,
                    value: qty,
                    type: typeof qty,
                    is_zero: qty === 0,
                    is_null: qty === null
                  }))
                });
              });
            }
            
            // Log sold out items for debugging
            console.log('[INVENTORY] 🔄 STEP 5.3: Checking for sold out items in received data...');
            if (quantities.caseColors && Array.isArray(quantities.caseColors)) {
              quantities.caseColors.forEach((colorArray, caseIndex) => {
                if (Array.isArray(colorArray)) {
                  colorArray.forEach((qty, colorIndex) => {
                    if (qty === 0) {
                      console.log(`[INVENTORY] 🚫 STEP 5.3: SOLD OUT detected - Case ${caseIndex}, Color ${colorIndex}: qty = 0`);
                    }
                  });
                }
              });
            } else {
              console.warn('[INVENTORY] ⚠️ STEP 5.3: caseColors is not an array, cannot check sold out items');
            }
            
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
            
            console.log('[INVENTORY] 📊 Inventory summary:', {
              hasInventoryData,
              cacheTimestamp: Date.now(),
              casesType: typeof quantities.cases,
              casesIsArray: Array.isArray(quantities.cases),
              casesPreview: Array.isArray(quantities.cases) ? quantities.cases.slice(0, 5) : quantities.cases,
              caseColorsType: typeof quantities.caseColors,
              caseColorsIsArray: Array.isArray(quantities.caseColors),
              caseColorsPreview: Array.isArray(quantities.caseColors) 
                ? quantities.caseColors.slice(0, 2).map(arr => Array.isArray(arr) ? arr.slice(0, 3) : arr)
                : quantities.caseColors,
              pinsPreview: quantities.pins
            });
            
            // Update in-memory cache
            console.log('[INVENTORY] 🔄 STEP 5.4: Updating in-memory cache...');
            inventoryCache = quantities;
            inventoryCacheTimestamp = Date.now();
            
            console.log('[INVENTORY] ✅ STEP 5.5: Cache updated. Verifying cache contents:');
            console.log('[INVENTORY]   Cache structure:', {
              hasCaseColors: !!inventoryCache.caseColors,
              caseColorsType: typeof inventoryCache.caseColors,
              caseColorsIsArray: Array.isArray(inventoryCache.caseColors),
              caseColorsLength: inventoryCache.caseColors?.length
            });
            
            // Verify sold out items are in cache
            if (Array.isArray(inventoryCache.caseColors)) {
              console.log('[INVENTORY] 🔄 STEP 5.6: Verifying sold out items in cache...');
              inventoryCache.caseColors.forEach((colorArray, caseIdx) => {
                if (Array.isArray(colorArray)) {
                  colorArray.forEach((qty, colorIdx) => {
                    if (qty === 0) {
                      console.log(`[INVENTORY] ✅ STEP 5.6: SOLD OUT confirmed in cache - Case ${caseIdx}, Color ${colorIdx}: qty = 0`);
                    }
                  });
                }
              });
            }
            
            // Dispatch custom events to notify listeners of cache update
            // Dispatch both event names for backward compatibility
            if (typeof window !== 'undefined') {
              const eventDetail = { timestamp: inventoryCacheTimestamp };
              window.dispatchEvent(new CustomEvent('inventoryCacheUpdated', { detail: eventDetail }));
              window.dispatchEvent(new CustomEvent('inventoryUpdated', { detail: eventDetail }));
            }
            
            // Mark initialization as complete
            isInitializing = false;
            
            console.log('[INVENTORY] ✅ STEP 5.7: Inventory fetch complete and cache ready');
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
        
        console.error('[INVENTORY] ❌ Error fetching inventory:', {
          message: fetchError.message,
          name: fetchError.name,
          apiUrl
        });
        
        // If HTML response detected, try direct function URL as fallback
        if (fetchError.message === 'HTML_RESPONSE_FALLBACK') {
          console.log('[INVENTORY] 🔄 Trying fallback URL (HTML response detected)');
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
    console.log('[SOLD_OUT_CHECK] ⚠️ No inventory cache available');
    return null; // No inventory data yet, return unlimited
  }
  
  // Log cache structure for debugging
  console.log('[SOLD_OUT_CHECK] 🔍 Checking cache structure:', {
    hasQuantities: !!quantities,
    quantitiesType: typeof quantities,
    quantitiesKeys: quantities ? Object.keys(quantities) : null,
    hasCaseColors: !!quantities.caseColors,
    caseColorsType: typeof quantities.caseColors,
    caseColorsIsArray: Array.isArray(quantities.caseColors),
    hasCases: !!quantities.cases,
    casesType: typeof quantities.cases,
    casesIsArray: Array.isArray(quantities.cases),
    hasPins: !!quantities.pins,
    pinsType: typeof quantities.pins
  });
  
  // Verify cache structure is valid
  if (!quantities.caseColors && !quantities.cases && !quantities.pins) {
    // Cache exists but has no valid structure - treat as unlimited
    console.log('[SOLD_OUT_CHECK] ⚠️ Cache exists but has no valid structure - treating as unlimited');
    return null;
  }

  // Handle case items - get quantity from Supabase inventory_items table
  if (item.caseType && item.color) {
    // Find the case in Products
    const caseData = Products.cases.find(c => c.type === item.caseType);
    if (!caseData) {
      console.log('[SOLD_OUT_CHECK] ⚠️ Case not found:', item.caseType);
      return null;
    }

    // Get color-specific quantity from Supabase (via in-memory cache)
    let maxQuantity = null;
    let source = 'none';

    // Primary: Get from caseColors array (from Supabase inventory_items table)
    console.log('[SOLD_OUT_CHECK] 🔄 STEP 6: Checking caseColors array...');
    console.log('[SOLD_OUT_CHECK]   Looking for:', {
      caseType: item.caseType,
      color: item.color
    });
    
    if (quantities && quantities.caseColors) {
      console.log('[SOLD_OUT_CHECK] ✅ STEP 6.1: caseColors exists, type:', typeof quantities.caseColors, 'isArray:', Array.isArray(quantities.caseColors));
      
      const caseIndex = Products.cases.findIndex(c => c.type === item.caseType);
      console.log('[SOLD_OUT_CHECK] 🔍 STEP 6.2: Found case index:', caseIndex);
      
      if (caseIndex !== -1 && quantities.caseColors[caseIndex]) {
        console.log('[SOLD_OUT_CHECK] ✅ STEP 6.3: Case array exists at index', caseIndex);
        console.log('[SOLD_OUT_CHECK]   Case array type:', typeof quantities.caseColors[caseIndex], 'isArray:', Array.isArray(quantities.caseColors[caseIndex]));
        console.log('[SOLD_OUT_CHECK]   Case array length:', quantities.caseColors[caseIndex]?.length);
        
        const colorIndex = caseData.colors.findIndex(c => c.color === item.color);
        console.log('[SOLD_OUT_CHECK] 🔍 STEP 6.4: Found color index:', colorIndex);
        
        // Check if value exists (including 0, which means sold out)
        // null/undefined means item not in Supabase (unlimited)
        if (colorIndex !== -1 && quantities.caseColors[caseIndex][colorIndex] !== null && quantities.caseColors[caseIndex][colorIndex] !== undefined) {
          const stock = quantities.caseColors[caseIndex][colorIndex]; // This is qty_in_stock from Supabase
          console.log('[SOLD_OUT_CHECK] ✅ STEP 6.5: Found stock value:', {
            stock,
            type: typeof stock,
            is_zero: stock === 0,
            is_null: stock === null,
            is_undefined: stock === undefined
          });
          
          maxQuantity = stock;
          source = `caseColors[${caseIndex}][${colorIndex}]`;
          
          console.log('[SOLD_OUT_CHECK] ✅ STEP 6.6: Set maxQuantity =', maxQuantity, 'from', source);
        } else {
          console.log('[SOLD_OUT_CHECK] ⚠️ STEP 6.5: Stock value not found or is null/undefined:', {
            colorIndex,
            value: colorIndex !== -1 ? quantities.caseColors[caseIndex][colorIndex] : 'colorIndex not found',
            is_null: colorIndex !== -1 ? quantities.caseColors[caseIndex][colorIndex] === null : 'N/A',
            is_undefined: colorIndex !== -1 ? quantities.caseColors[caseIndex][colorIndex] === undefined : 'N/A'
          });
        }
      } else {
        console.log('[SOLD_OUT_CHECK] ⚠️ STEP 6.3: Case array does not exist at index', caseIndex);
      }
    } else {
      console.log('[SOLD_OUT_CHECK] ⚠️ STEP 6.1: caseColors does not exist or is falsy');
    }

    // Fallback: Get from cases array (overall case quantity from Supabase)
    if (maxQuantity === null && quantities && quantities.cases) {
      const caseIndex = Products.cases.findIndex(c => c.type === item.caseType);
      // Check if value exists (including 0, which means sold out)
      // null/undefined means item not in Supabase (unlimited)
      if (caseIndex !== -1 && quantities.cases[caseIndex] !== null && quantities.cases[caseIndex] !== undefined) {
        const stock = quantities.cases[caseIndex]; // This is qty_in_stock from Supabase
        maxQuantity = stock;
        source = `cases[${caseIndex}]`;
      }
    }

    // Check if item exists in Supabase inventory_items table
    console.log('[SOLD_OUT_CHECK] 🔄 STEP 7: Evaluating maxQuantity...');
    console.log('[SOLD_OUT_CHECK]   maxQuantity:', maxQuantity, 'type:', typeof maxQuantity, 'source:', source);
    
    // If item doesn't exist in Supabase (maxQuantity is null/undefined), return null (unlimited)
    if (maxQuantity === null || maxQuantity === undefined) {
      console.log('[SOLD_OUT_CHECK] ✅ STEP 7.1: DECISION - Unlimited stock:', {
        caseType: item.caseType,
        color: item.color,
        reason: 'Not in Supabase inventory',
        maxQuantity,
        source
      });
      return null; // Item not in Supabase - unlimited stock
    }

    // If item exists in Supabase and qty is 0, show sold out immediately
    // This check happens BEFORE considering cart items
    if (maxQuantity === 0) {
      console.log('[SOLD_OUT_CHECK] ✅ STEP 7.2: DECISION - SOLD OUT (Supabase qty = 0):', {
        caseType: item.caseType,
        color: item.color,
        source,
        maxQuantity,
        cartItems: cart.length
      });
      return 0; // Sold out - item exists in Supabase but qty is 0
    }
    
    console.log('[SOLD_OUT_CHECK] ✅ STEP 7.3: Item has stock, maxQuantity =', maxQuantity);

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
    console.log('[SOLD_OUT_CHECK] 🔄 STEP 8: Calculating available stock...');
    console.log('[SOLD_OUT_CHECK]   Counting items in cart...');
    
    const available = maxQuantity - alreadyInCart;
    
    console.log('[SOLD_OUT_CHECK] ✅ STEP 8.1: Calculation complete:', {
      caseType: item.caseType,
      color: item.color,
      source,
      supabaseQty: maxQuantity,
      alreadyInCart,
      available,
      isSoldOut: available === 0
    });
    
    const finalResult = Math.max(0, available);
    
    console.log('[SOLD_OUT_CHECK] ✅ STEP 8.2: FINAL DECISION - Returning:', {
      result: finalResult,
      isSoldOut: finalResult === 0,
      caseType: item.caseType,
      color: item.color
    });
    
    // If available === 0, show sold out (all items are in cart)
    return finalResult;
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
      console.log('[SOLD_OUT_CHECK] ♾️ Unlimited stock (charm/pin):', {
        category,
        pinName,
        reason: 'Not in Supabase inventory'
      });
      return null; // Item not in Supabase - unlimited stock
    }

    // If item exists in Supabase and qty is 0, show sold out immediately
    // This check happens BEFORE considering cart items
    if (maxQuantity === 0) {
      console.log('[SOLD_OUT_CHECK] 🚫 SOLD OUT (Supabase qty = 0) - charm/pin:', {
        category,
        pinName,
        maxQuantity,
        cartItems: cart.length
      });
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
    
    console.log('[SOLD_OUT_CHECK] 📦 Stock check (charm/pin):', {
      category,
      pinName,
      supabaseQty: maxQuantity,
      alreadyInCart,
      available,
      isSoldOut: available === 0
    });
    
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
