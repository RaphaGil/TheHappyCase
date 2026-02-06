const { createClient } = require('@supabase/supabase-js');
const { readFileSync } = require('fs');
const { join } = require('path');

// Helper to send JSON response
const sendResponse = (statusCode, body, headers = {}) => {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      ...headers,
    },
    body: JSON.stringify(body),
  };
};

// Load products.json
// In Netlify Functions, __dirname points to the function directory
// Try multiple possible paths to find products.json
let Products;
const possiblePaths = [
  join(__dirname, '../../src/data/products.json'), // From function directory
  join(process.cwd(), 'src/data/products.json'), // From project root
  join(__dirname, '../../../src/data/products.json'), // Alternative path
];

for (const productsPath of possiblePaths) {
  try {
    Products = JSON.parse(readFileSync(productsPath, 'utf-8'));
    console.log('✅ Loaded products.json from:', productsPath);
    break;
  } catch (error) {
    // Try next path
    continue;
  }
}

if (!Products) {
  console.error('❌ Could not load products.json from any path');
  Products = { cases: [], pins: { flags: [], colorful: [], bronze: [] } };
}

exports.handler = async (event) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return sendResponse(200, {});
  }

  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return sendResponse(405, { 
      success: false,
      error: 'Method not allowed',
      message: 'Only GET requests are allowed'
    });
  }

  try {
    // Check Supabase configuration
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.warn('⚠️ Supabase not configured, returning empty inventory structure');
      return sendResponse(200, {
        success: true,
        inventory: {
          cases: null,
          caseColors: null,
          pins: {
            flags: null,
            colorful: null,
            bronze: null
          }
        }
      });
    }

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Validate Products structure
    if (!Products || !Products.cases || !Products.pins) {
      console.error('❌ Products structure is invalid');
      return sendResponse(500, {
        success: false,
        error: 'Products data not loaded',
        message: 'The products.json file could not be loaded or has an invalid structure.'
      });
    }

    // Validate Products.pins structure
    if (!Products.pins.flags || !Products.pins.colorful || !Products.pins.bronze) {
      console.error('❌ Products.pins structure is invalid');
      return sendResponse(500, {
        success: false,
        error: 'Products pins data not loaded',
        message: 'The products.json pins structure is invalid.'
      });
    }

    // Fetch all inventory items with timeout protection
    let items = null;
    let error = null;

    try {
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout - Supabase query took too long')), 8000);
      });

      const queryPromise = supabase
        .from('inventory_items')
        .select('*')
        .order('item_type, product_id');

      const result = await Promise.race([queryPromise, timeoutPromise]);

      if (result && typeof result === 'object') {
        items = result.data;
        error = result.error;
      } else {
        throw new Error('Unexpected query result format');
      }
    } catch (queryError) {
      console.error('❌ Error in Supabase query:', queryError);

      // Check if it's a table doesn't exist error
      if (queryError.code === 'PGRST116' || queryError.code === '42P01' ||
          (queryError.error && (queryError.error.code === 'PGRST116' || queryError.error.code === '42P01'))) {
        console.log('ℹ️ Table doesn\'t exist, returning empty structure');
        return sendResponse(200, {
          success: true,
          inventory: {
            cases: null,
            caseColors: null,
            pins: {
              flags: null,
              colorful: null,
              bronze: null
            }
          }
        });
      }

      throw queryError;
    }

    if (error) {
      console.error('❌ Supabase query returned error:', error);
      // If table doesn't exist, return empty structure
      if (error.code === 'PGRST116' || error.code === '42P01') {
        console.log('ℹ️ Table doesn\'t exist (error code), returning empty structure');
        return sendResponse(200, {
          success: true,
          inventory: {
            cases: null,
            caseColors: null,
            pins: {
              flags: null,
              colorful: null,
              bronze: null
            }
          }
        });
      }
      throw error;
    }

    // Ensure items is an array
    if (!Array.isArray(items)) {
      console.error('❌ Items is not an array:', typeof items, items);
      items = [];
    }
    
    console.log(`[SUPABASE_INVENTORY] 📦 Fetched ${items.length} items from Supabase inventory_items table`);
    
    // Log summary of items by type
    const itemsByType = items.reduce((acc, item) => {
      acc[item.item_type] = (acc[item.item_type] || 0) + 1;
      return acc;
    }, {});
    console.log('[SUPABASE_INVENTORY] 📊 Items by type:', itemsByType);
    
    // Log items with qty_in_stock = 0
    const soldOutItems = items.filter(item => item.qty_in_stock === 0);
    if (soldOutItems.length > 0) {
      console.log(`[SUPABASE_INVENTORY] 🚫 Found ${soldOutItems.length} sold out items (qty_in_stock = 0):`, 
        soldOutItems.map(item => ({ item_id: item.item_id, name: item.name, qty_in_stock: item.qty_in_stock }))
      );
    }

    // Transform items into the expected format
    // Initialize arrays with null values matching products.json structure
    const inventory = {
      cases: Products.cases.map(() => null),
      caseColors: Products.cases.map(caseItem => {
        if (!caseItem || !Array.isArray(caseItem.colors)) {
          console.warn('⚠️ Case item missing colors array:', caseItem);
          return [];
        }
        return caseItem.colors.map(() => null);
      }),
      pins: {
        flags: Products.pins.flags ? Products.pins.flags.map(() => null) : [],
        colorful: Products.pins.colorful ? Products.pins.colorful.map(() => null) : [],
        bronze: Products.pins.bronze ? Products.pins.bronze.map(() => null) : []
      }
    };

    // Group items by type
    const caseItems = items.filter(item => item.item_type === 'case_color');
    const flagPins = items.filter(item => item.item_type === 'pin_flags');
    const colorfulPins = items.filter(item => item.item_type === 'pin_colorful');
    const bronzePins = items.filter(item => item.item_type === 'pin_bronze');

    // Process case colors - match by case ID and color
    caseItems.forEach((item) => {
      const stock = item.qty_in_stock; // Read qty_in_stock from Supabase
      
      const caseIndex = Products.cases.findIndex(c => c.id === item.product_id);
      if (caseIndex !== -1) {
        const caseData = Products.cases[caseIndex];
        const colorIndex = caseData.colors.findIndex(c => c.color === item.color);
        if (colorIndex !== -1) {
          inventory.caseColors[caseIndex][colorIndex] = stock; // Use qty_in_stock value
          
          // Log sold out items for debugging
          if (stock === 0) {
            console.log(`[SUPABASE_INVENTORY] 🚫 SOLD OUT - Case ID ${item.product_id} (index ${caseIndex}), Color ${item.color} (index ${colorIndex}): qty_in_stock = 0`);
          }
        } else {
          console.warn(`[SUPABASE_INVENTORY] ⚠️ Color not found: ${item.color} for case ID ${item.product_id}`);
        }
      } else {
        console.warn(`[SUPABASE_INVENTORY] ⚠️ Case not found: product_id ${item.product_id}`);
      }
    });
    
    console.log(`[SUPABASE_INVENTORY] 📊 Processed ${caseItems.length} case color items from Supabase`);

    // Process pins - map by product_id
    flagPins.forEach(item => {
      const index = Products.pins.flags.findIndex(p => p.id === item.product_id);
      if (index !== -1) {
        inventory.pins.flags[index] = item.qty_in_stock;
        if (item.qty_in_stock === 0) {
          console.log(`[SUPABASE_INVENTORY] 🚫 SOLD OUT - Flag pin ID ${item.product_id} (index ${index}): qty_in_stock = 0`);
        }
      }
    });

    colorfulPins.forEach(item => {
      const index = Products.pins.colorful.findIndex(p => p.id === item.product_id);
      if (index !== -1) {
        inventory.pins.colorful[index] = item.qty_in_stock;
        if (item.qty_in_stock === 0) {
          console.log(`[SUPABASE_INVENTORY] 🚫 SOLD OUT - Colorful pin ID ${item.product_id} (index ${index}): qty_in_stock = 0`);
        }
      }
    });

    bronzePins.forEach(item => {
      const index = Products.pins.bronze.findIndex(p => p.id === item.product_id);
      if (index !== -1) {
        inventory.pins.bronze[index] = item.qty_in_stock;
        if (item.qty_in_stock === 0) {
          console.log(`[SUPABASE_INVENTORY] 🚫 SOLD OUT - Bronze pin ID ${item.product_id} (index ${index}): qty_in_stock = 0`);
        }
      }
    });
    
    console.log(`[SUPABASE_INVENTORY] 📊 Processed pins: ${flagPins.length} flags, ${colorfulPins.length} colorful, ${bronzePins.length} bronze`);

    // Log final inventory structure summary
    const soldOutCount = {
      cases: inventory.cases.filter(qty => qty === 0).length,
      caseColors: inventory.caseColors.reduce((sum, arr) => sum + (arr?.filter(qty => qty === 0).length || 0), 0),
      pinsFlags: inventory.pins.flags.filter(qty => qty === 0).length,
      pinsColorful: inventory.pins.colorful.filter(qty => qty === 0).length,
      pinsBronze: inventory.pins.bronze.filter(qty => qty === 0).length
    };
    
    console.log('[SUPABASE_INVENTORY] ✅ Final inventory structure:', {
      cases: inventory.cases.length,
      caseColors: inventory.caseColors.length,
      pinsFlags: inventory.pins.flags.length,
      pinsColorful: inventory.pins.colorful.length,
      pinsBronze: inventory.pins.bronze.length,
      soldOutCount
    });
    
    // Return success response
    return sendResponse(200, {
      success: true,
      inventory: inventory
    });

  } catch (error) {
    console.error('\n❌ ========== ERROR FETCHING INVENTORY ==========');
    console.error('Error message:', error.message);
    console.error('Error name:', error.name);
    if (error.stack) {
      console.error('Error stack:', error.stack);
    }
    if (error.code) {
      console.error('Error code:', error.code);
    }
    console.error('==============================================\n');

    return sendResponse(500, {
      success: false,
      error: error.message || 'Failed to fetch inventory',
      message: 'An error occurred while fetching inventory from Supabase.'
    });
  }
};
