/**
 * Test utility for debugging inventory function
 * 
 * Usage in browser console:
 * import('./src/utils/testInventoryFunction.js').then(m => m.testInventoryFunction())
 * 
 * Or copy-paste the testInventoryFunction code directly into console
 */

import { getSupabaseClient } from "./supabaseClient";

export async function testInventory(filterType = null) {
  const supabase = getSupabaseClient();
  
  if (!supabase) {
    console.error("❌ Supabase client not initialized. Check your environment variables.");
    return { data: null, error: "Supabase client not initialized" };
  }

  let query = supabase.from("inventory_items").select("*");
  
  if (filterType) {
    query = query.eq("item_type", filterType);
  }

  const { data, error } = await query;

  if (error) {
    console.error("❌ Error fetching inventory:", error);
    return { data: null, error };
  }

  console.log(`\n📦 Inventory Data (${data?.length || 0} items${filterType ? ` - filtered by: ${filterType}` : ''}):`);
  console.log("=".repeat(80));
  
  // Group by item_type
  const grouped = {};
  data?.forEach(item => {
    const type = item.item_type || 'unknown';
    if (!grouped[type]) {
      grouped[type] = [];
    }
    grouped[type].push(item);
  });

  // Show summary by type
  console.log("\n📊 Summary by Item Type:");
  Object.keys(grouped).sort().forEach(type => {
    const items = grouped[type];
    const soldOut = items.filter(i => i.qty_in_stock === 0 || i.qty_in_stock === null).length;
    const available = items.filter(i => i.qty_in_stock !== null && i.qty_in_stock > 0).length;
    const unlimited = items.filter(i => i.qty_in_stock === null).length;
    console.log(`  ${type}: ${items.length} items (${available} available, ${soldOut} sold out, ${unlimited} unlimited)`);
  });

  // Show passport cases specifically
  if (grouped['case'] || grouped['case_color']) {
    console.log("\n🎒 Passport Cases Details:");
    const cases = grouped['case'] || [];
    const caseColors = grouped['case_color'] || [];
    
    cases.forEach(item => {
      const stock = item.qty_in_stock === null ? 'Unlimited' : item.qty_in_stock;
      const status = item.qty_in_stock === 0 ? '❌ SOLD OUT' : item.qty_in_stock === null ? '♾️ Unlimited' : '✅ Available';
      console.log(`  ${item.item_id}: ${item.name || 'N/A'} - Stock: ${stock} ${status}`);
    });
    
    caseColors.forEach(item => {
      const stock = item.qty_in_stock === null ? 'Unlimited' : item.qty_in_stock;
      const status = item.qty_in_stock === 0 ? '❌ SOLD OUT' : item.qty_in_stock === null ? '♾️ Unlimited' : '✅ Available';
      console.log(`  ${item.item_id}: ${item.name || 'N/A'} - Stock: ${stock} ${status}`);
    });
  }

  console.log("\n📋 Full Data:", data);
  console.log("=".repeat(80));
  
  return { data, error: null };
}

// Test the API endpoint to see how it maps the data
export async function testInventoryAPI() {
  const { getApiUrl } = await import('./apiConfig');
  const apiUrl = getApiUrl('/api/inventory');
  
  console.log(`\n🔍 Testing Inventory API: ${apiUrl}`);
  console.log("=".repeat(80));
  
  try {
    const response = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      console.error(`❌ API returned status ${response.status}`);
      return;
    }
    
    const data = await response.json();
    
    if (data.success && data.inventory) {
      console.log("\n✅ API Response Structure:");
      console.log("  cases:", data.inventory.cases);
      console.log("  caseColors:", data.inventory.caseColors);
      
      // Show Economy Case (index 0) colors
      if (data.inventory.caseColors && data.inventory.caseColors[0]) {
        console.log("\n🎒 Economy Case Colors (index 0):");
        data.inventory.caseColors[0].forEach((qty, index) => {
          console.log(`  Color ${index}: qty_in_stock = ${qty === null ? 'null (unlimited)' : qty}`);
        });
      }
      
      // Check if #cb0025 is mapped correctly
      console.log("\n🔍 Checking for color #cb0025:");
      console.log("  Looking for Economy Case (product_id: 1) with color #cb0025");
      
      // Import Products to check color index
      const Products = await import('../data/products.json').then(m => m.default);
      const economyCase = Products.cases.find(c => c.id === 1);
      if (economyCase) {
        const colorIndex = economyCase.colors.findIndex(c => c.color === "#cb0025");
        if (colorIndex !== -1 && data.inventory.caseColors[0]) {
          const qty = data.inventory.caseColors[0][colorIndex];
          console.log(`  ✅ Found at caseColors[0][${colorIndex}] = ${qty === null ? 'null (unlimited)' : qty}`);
        } else {
          console.log(`  ⚠️ Color #cb0025 not found in Economy Case colors array`);
        }
      }
    } else {
      console.error("❌ API response format error:", data);
    }
  } catch (error) {
    console.error("❌ Error fetching API:", error);
    console.error("   Error details:", {
      message: error.message,
      name: error.name,
      stack: error.stack
    });
    
    // Try fallback to direct Netlify function URL
    console.log("\n🔄 Trying fallback: Direct Netlify function URL");
    try {
      const fallbackUrl = getApiUrl('/.netlify/functions/inventory');
      console.log(`   Fallback URL: ${fallbackUrl}`);
      const fallbackResponse = await fetch(fallbackUrl, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (fallbackResponse.ok) {
        const fallbackData = await fallbackResponse.json();
        console.log("✅ Fallback succeeded!");
        console.log("   Response:", fallbackData);
      } else {
        console.error(`❌ Fallback also failed: ${fallbackResponse.status}`);
      }
    } catch (fallbackError) {
      console.error("❌ Fallback also failed:", fallbackError.message);
    }
  }
  
  console.log("=".repeat(80));
}

export const testInventoryFunction = async () => {
  console.log('🧪 Testing Inventory Function...\n');
  
  const baseUrl = window.location.origin;
  const endpoints = [
    { name: 'API Endpoint', url: `${baseUrl}/api/inventory` },
    { name: 'Direct Function', url: `${baseUrl}/.netlify/functions/inventory` }
  ];
  
  for (const endpoint of endpoints) {
    console.log(`\n📡 Testing: ${endpoint.name}`);
    console.log(`   URL: ${endpoint.url}`);
    
    try {
      const startTime = Date.now();
      const response = await fetch(endpoint.url, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const duration = Date.now() - startTime;
      
      console.log(`   Status: ${response.status} ${response.statusText}`);
      console.log(`   Duration: ${duration}ms`);
      console.log(`   Content-Type: ${response.headers.get('content-type')}`);
      
      const text = await response.text();
      const isHTML = text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html');
      
      if (isHTML) {
        console.log(`   ❌ Response is HTML (not JSON)`);
        console.log(`   Preview: ${text.substring(0, 200)}...`);
      } else {
        try {
          const data = JSON.parse(text);
          console.log(`   ✅ Response is valid JSON`);
          console.log(`   Data:`, data);
          
          if (data.success) {
            console.log(`   ✅ Function is working correctly!`);
          } else {
            console.log(`   ⚠️ Function returned error:`, data.error || data.message);
          }
        } catch (parseError) {
          console.log(`   ❌ Response is not valid JSON`);
          console.log(`   Preview: ${text.substring(0, 200)}...`);
        }
      }
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
    }
  }
  
  console.log('\n\n📋 Summary:');
  console.log('1. If API Endpoint returns HTML → Redirect rule not working (check _redirects file)');
  console.log('2. If Direct Function returns HTML → Function not deployed');
  console.log('3. If both return JSON → Function is working, routing issue may be resolved');
  console.log('4. Check Netlify Dashboard → Functions tab to verify deployment');
};

// Auto-run if in browser console
if (typeof window !== 'undefined') {
  window.testInventoryFunction = testInventoryFunction;
  window.testInventory = testInventory;
  window.testInventoryAPI = testInventoryAPI;
  console.log('✅ Test functions loaded!');
  console.log('   - testInventoryFunction() - Test API endpoints');
  console.log('   - testInventory() - Direct Supabase query (all items)');
  console.log('   - testInventory("case") - Filter by case type');
  console.log('   - testInventory("case_color") - Filter by case colors');
  console.log('   - testInventory("pin_colorful") - Filter by colorful pins');
  console.log('   - testInventory("pin_bronze") - Filter by bronze pins');
  console.log('   - testInventoryAPI() - Test how API maps Supabase data');
}
