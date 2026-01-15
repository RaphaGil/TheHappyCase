// Script to check if order images are stored as base64 or URLs
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

async function checkOrderImages() {
  console.log('\n🔍 Checking Order Images in Database...\n');

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials in .env file');
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // Get recent orders
    const { data: orders, error } = await supabase
      .from('orders')
      .select('order_id, customer_email, items, order_date')
      .order('order_date', { ascending: false })
      .limit(5);

    if (error) {
      console.error('❌ Error fetching orders:', error.message);
      return;
    }

    if (!orders || orders.length === 0) {
      console.log('ℹ️  No orders found in database');
      return;
    }

    console.log(`📦 Found ${orders.length} recent order(s):\n`);

    let hasBase64Images = false;
    let hasStorageUrls = false;
    let hasNoImages = false;

    orders.forEach((order, index) => {
      console.log(`\n--- Order ${index + 1}: ${order.order_id} ---`);
      console.log(`   Email: ${order.customer_email}`);
      console.log(`   Date: ${new Date(order.order_date).toLocaleString()}`);

      if (!order.items || !Array.isArray(order.items)) {
        console.log('   ⚠️  No items array found');
        hasNoImages = true;
        return;
      }

      console.log(`   Items: ${order.items.length}`);

      order.items.forEach((item, itemIndex) => {
        const caseImage = item.case_image;
        const designImage = item.design_image;

        if (caseImage) {
          if (caseImage.startsWith('data:image/')) {
            console.log(`   📷 Item ${itemIndex + 1} - case_image: BASE64 (${(caseImage.length / 1024).toFixed(2)}KB)`);
            hasBase64Images = true;
          } else if (caseImage.includes('supabase.co/storage')) {
            console.log(`   ✅ Item ${itemIndex + 1} - case_image: Storage URL`);
            hasStorageUrls = true;
          } else {
            console.log(`   📷 Item ${itemIndex + 1} - case_image: Other URL`);
          }
        }

        if (designImage) {
          if (designImage.startsWith('data:image/')) {
            console.log(`   📷 Item ${itemIndex + 1} - design_image: BASE64 (${(designImage.length / 1024).toFixed(2)}KB)`);
            hasBase64Images = true;
          } else if (designImage.includes('supabase.co/storage')) {
            console.log(`   ✅ Item ${itemIndex + 1} - design_image: Storage URL`);
            hasStorageUrls = true;
          } else {
            console.log(`   📷 Item ${itemIndex + 1} - design_image: Other URL`);
          }
        }

        if (!caseImage && !designImage) {
          console.log(`   ℹ️  Item ${itemIndex + 1}: No images`);
          hasNoImages = true;
        }
      });
    });

    console.log('\n\n📊 Summary:');
    if (hasBase64Images) {
      console.log('   ❌ Some images are stored as BASE64 (need to upload to Storage)');
    }
    if (hasStorageUrls) {
      console.log('   ✅ Some images are stored as Storage URLs (good!)');
    }
    if (hasNoImages) {
      console.log('   ℹ️  Some items have no images');
    }

    if (hasBase64Images) {
      console.log('\n💡 Next Steps:');
      console.log('   1. Create the storage bucket (run SUPABASE_STORAGE_SETUP.sql)');
      console.log('   2. Run migrate-images-to-storage.js to upload existing base64 images');
      console.log('   3. Future orders will automatically upload images');
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

checkOrderImages();
