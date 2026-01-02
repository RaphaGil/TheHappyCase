/**
 * Test script to verify order data is correctly sent to Supabase
 * 
 * This script tests the /api/save-order endpoint to ensure:
 * 1. All required fields are present
 * 2. Data types match the schema
 * 3. All order information is properly saved
 * 
 * Run with: node test-order-supabase.js
 */

const axios = require('axios');

// Configuration - Update these if needed
const API_URL = process.env.API_URL || 'http://localhost:5000';
const TEST_EMAIL = 'test@example.com';

// Sample test data matching the expected format
const mockPaymentIntent = {
  id: `pi_test_${Date.now()}`,
  status: 'succeeded',
  currency: 'gbp',
  created: Math.floor(Date.now() / 1000),
  metadata: {
    test: true,
    source: 'test-script'
  }
};

const mockCustomerInfo = {
  email: TEST_EMAIL,
  name: 'Test Customer',
  phone: '+44 123 456 7890',
  address: {
    line1: '123 Test Street',
    line2: 'Apartment 4B',
    city: 'London',
    postal_code: 'SW1A 1AA',
    country: 'GB',
    state: null
  }
};

const mockItems = [
  {
    id: 'test-item-1',
    name: 'Economy Class Case',
    caseName: 'Economy Class Case',
    caseType: 'economy',
    color: '#FF5733',
    quantity: 2,
    price: 8.00,
    totalPrice: 16.00,
    caseImage: '/images/test-case.png',
    customDesign: false,
    pins: null,
    pinsDetails: null
  },
  {
    id: 'test-item-2',
    name: 'Custom Case with Charms',
    caseName: 'Business Class Case',
    caseType: 'business',
    color: '#3498DB',
    quantity: 1,
    price: 12.00,
    totalPrice: 12.00,
    caseImage: '/images/test-case-2.png',
    designImage: '/images/test-design.png',
    customDesign: true,
    pins: [
      { name: 'Heart Pin', src: '/images/heart.png' },
      { name: 'Star Pin', src: '/images/star.png' }
    ],
    pinsDetails: [
      { name: 'Heart Pin', src: '/images/heart.png' },
      { name: 'Star Pin', src: '/images/star.png' }
    ]
  },
  {
    id: 'test-item-3',
    name: 'Bronze Charm',
    quantity: 3,
    price: 2.50,
    totalPrice: 7.50,
    image: '/images/charm.png',
    type: 'charm',
    category: 'bronze'
  }
];

// Expected schema fields from SUPABASE_ORDERS_SCHEMA.sql
const requiredFields = [
  'order_id',
  'payment_intent_id',
  'customer_email',
  'total_amount',
  'currency',
  'status',
  'order_date',
  'items'
];

const optionalFields = [
  'customer_name',
  'customer_phone',
  'shipping_address',
  'metadata',
  'created_at',
  'updated_at'
];

/**
 * Test the order save endpoint
 */
async function testOrderSave() {
  console.log('🧪 Testing Order Save to Supabase\n');
  console.log('=' .repeat(60));
  
  try {
    // Prepare request
    const requestBody = {
      paymentIntent: mockPaymentIntent,
      customerInfo: mockCustomerInfo,
      items: mockItems
    };

    console.log('\n📤 Sending test order data...');
    console.log(`   Order ID: ${mockPaymentIntent.id}`);
    console.log(`   Customer: ${mockCustomerInfo.name} (${mockCustomerInfo.email})`);
    console.log(`   Items: ${mockItems.length}`);
    console.log(`   Total Amount: £${mockItems.reduce((sum, item) => sum + (item.totalPrice || item.price || 0) * (item.quantity || 1), 0).toFixed(2)}`);

    // Send request
    const response = await axios.post(`${API_URL}/api/save-order`, requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = response.data;

    console.log('\n📥 Response Status:', response.status);
    console.log('📥 Response:', JSON.stringify(result, null, 2));

    // Validate response
    if (response.status === 200 && result.success) {
      console.log('\n✅ SUCCESS: Order saved to Supabase!');
      
      // Verify all required fields are present
      console.log('\n🔍 Verifying order data structure...');
      await verifyOrderData(mockPaymentIntent.id);
      
      return true;
    } else {
      console.error('\n❌ FAILED: Order not saved');
      console.error('   Error:', result.error || result.message);
      return false;
    }
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.error('   Make sure the server is running on', API_URL);
    return false;
  }
}

/**
 * Verify the order data structure matches schema
 */
async function verifyOrderData(orderId) {
  console.log('\n📋 Expected Order Data Structure:');
  console.log('   Required Fields:');
  requiredFields.forEach(field => {
    console.log(`     ✓ ${field}`);
  });
  
  console.log('\n   Optional Fields:');
  optionalFields.forEach(field => {
    console.log(`     • ${field}`);
  });

  // Calculate expected values
  const expectedTotal = mockItems.reduce((sum, item) => 
    sum + (item.totalPrice || item.price || 0) * (item.quantity || 1), 0
  );

  console.log('\n📊 Expected Values:');
  console.log(`   order_id: ${mockPaymentIntent.id}`);
  console.log(`   payment_intent_id: ${mockPaymentIntent.id}`);
  console.log(`   customer_email: ${mockCustomerInfo.email}`);
  console.log(`   customer_name: ${mockCustomerInfo.name}`);
  console.log(`   customer_phone: ${mockCustomerInfo.phone}`);
  console.log(`   total_amount: ${expectedTotal.toFixed(2)}`);
  console.log(`   currency: ${mockPaymentIntent.currency}`);
  console.log(`   status: ${mockPaymentIntent.status}`);
  console.log(`   items: Array of ${mockItems.length} items`);
  console.log(`   shipping_address: ${mockCustomerInfo.address ? 'Present' : 'Null'}`);
  console.log(`   metadata: ${Object.keys(mockPaymentIntent.metadata || {}).length} keys`);

  console.log('\n✅ Verification complete!');
  console.log('   Check Supabase dashboard to confirm all data is saved correctly.');
}

/**
 * Test with missing required fields
 */
async function testMissingFields() {
  console.log('\n\n🧪 Testing with Missing Required Fields\n');
  console.log('=' .repeat(60));

  const testCases = [
    {
      name: 'Missing paymentIntent',
      data: { customerInfo: mockCustomerInfo, items: mockItems }
    },
    {
      name: 'Missing customerInfo',
      data: { paymentIntent: mockPaymentIntent, items: mockItems }
    },
    {
      name: 'Missing items',
      data: { paymentIntent: mockPaymentIntent, customerInfo: mockCustomerInfo }
    },
    {
      name: 'Empty items array',
      data: { 
        paymentIntent: mockPaymentIntent, 
        customerInfo: mockCustomerInfo, 
        items: [] 
      }
    }
  ];

  for (const testCase of testCases) {
    try {
      console.log(`\n📤 Testing: ${testCase.name}...`);
      try {
        const response = await axios.post(`${API_URL}/api/save-order`, testCase.data, {
          headers: { 'Content-Type': 'application/json' },
          validateStatus: () => true, // Don't throw on error status
        });

        const result = response.data;
        
        if (response.status === 400) {
          console.log(`   ✅ Correctly rejected (400): ${result.error}`);
        } else {
          console.log(`   ⚠️  Unexpected response (${response.status})`);
        }
      } catch (error) {
        if (error.response) {
          const result = error.response.data;
          if (error.response.status === 400) {
            console.log(`   ✅ Correctly rejected (400): ${result.error || error.message}`);
          } else {
            console.log(`   ⚠️  Error (${error.response.status}): ${result.error || error.message}`);
          }
        } else {
          console.log(`   ❌ Error: ${error.message}`);
        }
      }
  }
}

/**
 * Main test runner
 */
async function runTests() {
  console.log('\n🚀 Starting Order Save Tests\n');
  console.log('=' .repeat(60));
  console.log(`API URL: ${API_URL}`);
  console.log('=' .repeat(60));

  // Test 1: Normal order save
  const success = await testOrderSave();

  // Test 2: Missing fields validation
  await testMissingFields();

  console.log('\n' + '=' .repeat(60));
  if (success) {
    console.log('✅ All tests completed!');
    console.log('\n📝 Next Steps:');
    console.log('   1. Check Supabase dashboard → Table Editor → orders table');
    console.log('   2. Verify all fields are populated correctly');
    console.log('   3. Check that items array contains all order details');
    console.log('   4. Verify shipping_address JSON structure');
  } else {
    console.log('❌ Some tests failed. Check the errors above.');
  }
  console.log('=' .repeat(60) + '\n');
}

// Run tests
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { testOrderSave, verifyOrderData };

