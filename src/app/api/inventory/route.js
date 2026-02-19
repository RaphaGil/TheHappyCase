import { createClient } from '@supabase/supabase-js';
import Products from '../../../data/products.json';

/**
 * Next.js API Route for Inventory
 * 
 * Reads inventory from Supabase table: inventory_items
 * and maps it into the same structure used by your frontend.
 * 
 * In development: Can proxy to Express server if running, or call Supabase directly
 * In production: Calls Supabase directly (Netlify function also available)
 * 
 * Note: This route is handled by Netlify Functions in production.
 * During static export, this directory is temporarily moved to prevent build errors.
 */

// Helper to send JSON response
const sendResponse = (statusCode, body, headers = {}) => {
  return new Response(JSON.stringify(body), {
    status: statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      ...headers,
    },
  });
};

export async function GET(request) {
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return sendResponse(200, {});
  }

  try {
    // Check environment variables
    // Use service role key for server-side access (bypasses RLS)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('❌ Missing Supabase credentials');
      return sendResponse(500, {
        success: false,
        error: 'Supabase credentials missing in environment variables',
      });
    }

    // Validate Products structure
    if (!Array.isArray(Products.cases) || !Products.pins) {
      return sendResponse(500, {
        success: false,
        error: 'products.json has invalid structure',
      });
    }

    // Initialize Supabase client
    console.log('[API INVENTORY] Initializing Supabase client...');
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch inventory from Supabase
    console.log('[API INVENTORY] Fetching inventory from Supabase...');
    let items = [];
    try {
      const { data, error } = await supabase
        .from('inventory_items')
        .select('*')
        .order('item_type')
        .order('product_id');

      if (error) {
        console.error('[API INVENTORY] Supabase error:', error);
        // If table doesn't exist, return empty structure
        if (
          error.code === 'PGRST116' ||
          error.code === '42P01' ||
          error.message?.includes('does not exist')
        ) {
          console.log('[API INVENTORY] Table missing, returning empty inventory');
          return sendResponse(200, {
            success: true,
            inventory: {
              cases: Products.cases.map(() => null),
              caseColors: Products.cases.map((c) =>
                Array.isArray(c.colors) ? c.colors.map(() => null) : []
              ),
              pins: {
                flags: Array.isArray(Products.pins.flags)
                  ? Products.pins.flags.map(() => null)
                  : [],
                colorful: Array.isArray(Products.pins.colorful)
                  ? Products.pins.colorful.map(() => null)
                  : [],
                bronze: Array.isArray(Products.pins.bronze)
                  ? Products.pins.bronze.map(() => null)
                  : [],
              },
            },
            meta: {
              itemsFetched: 0,
              casesCount: Products.cases.length,
              note: 'inventory_items table does not exist',
            },
          });
        }
        return sendResponse(500, {
          success: false,
          error: 'Failed to fetch inventory from Supabase',
          message: error.message,
        });
      }

      items = data || [];
      console.log(`[API INVENTORY] Fetched ${items.length} inventory items from Supabase`);
    } catch (fetchError) {
      console.error('[API INVENTORY] Error fetching from Supabase:', fetchError);
      return sendResponse(500, {
        success: false,
        error: 'Failed to fetch inventory',
        message: fetchError.message,
      });
    }

    // Create empty inventory structure - match Netlify function logic
    const inventory = {
      cases: Products.cases.map(() => null),
      caseColors: Products.cases.map((c) =>
        Array.isArray(c.colors) ? c.colors.map(() => null) : []
      ),
      pins: {
        flags: Array.isArray(Products.pins.flags)
          ? Products.pins.flags.map(() => null)
          : [],
        colorful: Array.isArray(Products.pins.colorful)
          ? Products.pins.colorful.map(() => null)
          : [],
        bronze: Array.isArray(Products.pins.bronze)
          ? Products.pins.bronze.map(() => null)
          : [],
      },
    };

    // Process inventory items - match Netlify function logic
    for (const item of items) {
      const qty = item.qty_in_stock ?? null;

      if (item.item_type === 'case_color') {
        const caseIndex = Products.cases.findIndex((c) => c.id === item.product_id);
        if (caseIndex === -1) continue;
        const caseData = Products.cases[caseIndex];
        if (!caseData || !Array.isArray(caseData.colors)) continue;
        const colorIndex = caseData.colors.findIndex((c) => c.color === item.color);
        if (colorIndex === -1) continue;
        inventory.caseColors[caseIndex][colorIndex] = qty;
      }

      if (item.item_type === 'pin_flags') {
        const index = Products.pins.flags.findIndex((p) => p.id === item.product_id);
        if (index !== -1) inventory.pins.flags[index] = qty;
      }

      if (item.item_type === 'pin_colorful') {
        const index = Products.pins.colorful.findIndex((p) => p.id === item.product_id);
        if (index !== -1) inventory.pins.colorful[index] = qty;
      }

      if (item.item_type === 'pin_bronze') {
        const index = Products.pins.bronze.findIndex((p) => p.id === item.product_id);
        if (index !== -1) inventory.pins.bronze[index] = qty;
      }
    }

    console.log('[API INVENTORY] ✅ Inventory mapped successfully');
    console.log('[API INVENTORY] Structure:', {
      cases: inventory.cases.length,
      caseColors: inventory.caseColors.length,
      pinsFlags: inventory.pins.flags.length,
      pinsColorful: inventory.pins.colorful.length,
      pinsBronze: inventory.pins.bronze.length,
    });

    return sendResponse(200, {
      success: true,
      inventory,
      meta: {
        itemsFetched: items.length,
        casesCount: Products.cases.length,
      },
    });
  } catch (error) {
    console.error('[API INVENTORY] Unexpected error:', error);
    return sendResponse(500, {
      success: false,
      error: 'Internal server error',
      message: error.message,
    });
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return sendResponse(200, {});
}
