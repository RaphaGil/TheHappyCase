/**
 * PRODUCTION Inventory Netlify Function
 * 
 * This function runs in PRODUCTION on Netlify and connects to PRODUCTION Supabase database.
 * 
 * Environment Variables Required (set in Netlify Dashboard):
 * - SUPABASE_URL: Production Supabase project URL (e.g., https://[project-id].supabase.co)
 * - SUPABASE_SERVICE_ROLE_KEY: Production Supabase service role key
 * 
 * This function fetches inventory from the PRODUCTION inventory_items table.
 * DO NOT use development/test Supabase credentials here.
 */

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
    // Check Supabase configuration for PRODUCTION
    // Note: Server-side Netlify functions use process.env, not import.meta.env
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('❌ PRODUCTION: Supabase credentials not configured in Netlify environment variables');
      console.error('   Missing: SUPABASE_URL and/or SUPABASE_SERVICE_ROLE_KEY');
      console.error('   Action: Set these in Netlify Dashboard → Site settings → Environment variables');
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

    // Validate that we're using PRODUCTION Supabase (not localhost or test URLs)
    const isProductionUrl = supabaseUrl.startsWith('https://') && 
                           !supabaseUrl.includes('localhost') && 
                           !supabaseUrl.includes('127.0.0.1') &&
                           supabaseUrl.includes('.supabase.co');
    
    if (!isProductionUrl) {
      console.error('❌ PRODUCTION: Invalid Supabase URL detected - must be a production Supabase URL');
      console.error(`   Current URL: ${supabaseUrl.substring(0, 50)}...`);
      console.error('   Expected format: https://[project-id].supabase.co');
      console.error('   Action: Update SUPABASE_URL in Netlify environment variables with production URL');
    }

    // Log which Supabase instance we're connecting to (safely, without exposing full URL)
    const urlParts = supabaseUrl.split('.');
    const projectId = urlParts.length > 0 ? urlParts[0].replace('https://', '') : 'unknown';
    console.log('✅ PRODUCTION: Connecting to Supabase inventory database');
    console.log(`   Project ID: ${projectId.substring(0, 8)}...`);
    console.log(`   URL: ${supabaseUrl.substring(0, 40)}...`);
    console.log(`   Service Role Key: ${supabaseKey ? '✅ Set' : '❌ Missing'} (${supabaseKey?.length || 0} chars)`);

    // Initialize Supabase client for PRODUCTION
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
    
    console.log(`[SUPABASE_INVENTORY] ✅ PRODUCTION: Successfully fetched ${items.length} items from PRODUCTION Supabase inventory_items table`);
    
    // Log summary of items by type
    const itemsByType = items.reduce((acc, item) => {
      acc[item.item_type] = (acc[item.item_type] || 0) + 1;
      return acc;
    }, {});
    console.log('[SUPABASE_INVENTORY] 📊 Items by type:', itemsByType);

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
    console.log('[SUPABASE_INVENTORY] 🔄 STEP 1: Starting to process case colors...');
    console.log(`[SUPABASE_INVENTORY] 📋 Found ${caseItems.length} case color items to process`);
    
    caseItems.forEach((item, itemIndex) => {
      const stock = item.qty_in_stock; // Read qty_in_stock from Supabase
      const caseIndex = Products.cases.findIndex(c => c.id === item.product_id);
      
      if (caseIndex !== -1) {
        const caseData = Products.cases[caseIndex];
        const colorIndex = caseData.colors.findIndex(c => c.color === item.color);
        if (colorIndex !== -1) {
          inventory.caseColors[caseIndex][colorIndex] = stock; // Use qty_in_stock value
        }
      }
    });
    
    console.log(`[SUPABASE_INVENTORY] 📊 Processed ${caseItems.length} case color items from Supabase`);

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
    
    console.log(`[SUPABASE_INVENTORY] 📊 Processed pins: ${flagPins.length} flags, ${colorfulPins.length} colorful, ${bronzePins.length} bronze`);
    
    console.log('[SUPABASE_INVENTORY] 🔄 STEP 2: Preparing response...');
    const responseBody = {
      success: true,
      inventory: inventory
    };
    
    // Return success response
    return sendResponse(200, responseBody);

  } catch (error) {
    console.error('\n❌ ========== PRODUCTION ERROR FETCHING INVENTORY ==========');
    console.error('Environment: PRODUCTION (Netlify Function)');
    console.error('Supabase URL:', process.env.SUPABASE_URL ? `${process.env.SUPABASE_URL.substring(0, 40)}...` : 'NOT SET');
    console.error('Error message:', error.message);
    console.error('Error name:', error.name);
    if (error.stack) {
      console.error('Error stack:', error.stack);
    }
    if (error.code) {
      console.error('Error code:', error.code);
    }
    console.error('==============================================================\n');

    return sendResponse(500, {
      success: false,
      error: error.message || 'Failed to fetch inventory',
      message: 'An error occurred while fetching inventory from Supabase.'
    });
  }
};
