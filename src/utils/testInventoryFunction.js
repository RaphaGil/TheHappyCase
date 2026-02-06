/**
 * Test utility for debugging inventory function
 * 
 * Usage in browser console:
 * import('./src/utils/testInventoryFunction.js').then(m => m.testInventoryFunction())
 * 
 * Or copy-paste the testInventoryFunction code directly into console
 */

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
  console.log('✅ Test function loaded! Run: testInventoryFunction()');
}
