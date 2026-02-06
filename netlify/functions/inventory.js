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
        
        console.log(`📥 Fetched ${items ? items.length : 0} items from Supabase inventory_items table`);
        if (items && items.length > 0) {
          console.log(`   Sample item structure:`, {
            item_id: items[0].item_id,
            product_id: items[0].product_id,
            item_type: items[0].item_type,
            color: items[0].color,
            qty_in_stock: items[0].qty_in_stock, // This is the key field from Supabase
            qty_in_stock_type: typeof items[0].qty_in_stock
          });
        }
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
    console.log(`📦 Processing ${caseItems.length} case color items from Supabase inventory_items table`);
    caseItems.forEach((item, idx) => {
      const stock = item.qty_in_stock; // Read qty_in_stock from Supabase
      console.log(`   Case Item ${idx + 1}: item_id="${item.item_id}", product_id=${item.product_id}, color="${item.color}", qty_in_stock=${stock}`);
      
      const caseIndex = Products.cases.findIndex(c => c.id === item.product_id);
      if (caseIndex !== -1) {
        const caseData = Products.cases[caseIndex];
        const colorIndex = caseData.colors.findIndex(c => c.color === item.color);
        if (colorIndex !== -1) {
          inventory.caseColors[caseIndex][colorIndex] = stock; // Use qty_in_stock value
          console.log(`     ✓ Mapped to: ${caseData.name} (index ${caseIndex}), color index ${colorIndex} → qty_in_stock=${stock}`);
        } else {
          console.warn(`     ⚠️ Color "${item.color}" not found in ${caseData.name} colors`);
        }
      } else {
        console.warn(`     ⚠️ Case with product_id=${item.product_id} not found in Products.cases`);
      }
    });

    // Process pins - map by product_id
    flagPins.forEach(item => {
      const index = Products.pins.flags.findIndex(p => p.id === item.product_id);
      if (index !== -1) {
        inventory.pins.flags[index] = item.qty_in_stock;
      }
    });

    colorfulPins.forEach(item => {
      const index = Products.pins.colorful.findIndex(p => p.id === item.product_id);
      if (index !== -1) {
        inventory.pins.colorful[index] = item.qty_in_stock;
      }
    });

    bronzePins.forEach(item => {
      const index = Products.pins.bronze.findIndex(p => p.id === item.product_id);
      if (index !== -1) {
        inventory.pins.bronze[index] = item.qty_in_stock;
      }
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
