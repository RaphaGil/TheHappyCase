// Script to migrate existing base64 images in orders to Supabase Storage
// Run this AFTER creating the storage bucket
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

async function uploadImageToStorage(supabase, imageData, orderId, itemId, imageType) {
  if (!imageData || !imageData.startsWith('data:image/')) {
    return imageData; // Already a URL or no image
  }

  try {
    const matches = imageData.match(/^data:image\/(\w+);base64,(.+)$/);
    if (!matches) {
      console.warn(`⚠️ Invalid base64 format: ${imageType}`);
      return imageData;
    }

    const imageFormat = matches[1];
    const base64Data = matches[2];
    const imageBuffer = Buffer.from(base64Data, 'base64');

    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 9);
    const filename = `${orderId}/${itemId}-${imageType}-${timestamp}-${randomStr}.${imageFormat}`;

    const { data, error } = await supabase.storage
      .from('order-images')
      .upload(filename, imageBuffer, {
        contentType: `image/${imageFormat}`,
        upsert: false,
      });

    if (error) {
      console.error(`❌ Error uploading ${imageType}:`, error.message);
      return imageData; // Return original
    }

    const { data: urlData } = supabase.storage
      .from('order-images')
      .getPublicUrl(filename);

    console.log(`   ✅ Uploaded ${imageType} image`);
    return urlData.publicUrl;
  } catch (error) {
    console.error(`❌ Exception uploading ${imageType}:`, error.message);
    return imageData;
  }
}

async function migrateImages() {
  console.log('\n🔄 Migrating Base64 Images to Supabase Storage...\n');

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials in .env file');
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Check bucket exists
  const { data: buckets } = await supabase.storage.listBuckets();
  const bucketExists = buckets?.some(b => b.id === 'order-images');

  if (!bucketExists) {
    console.error('❌ Storage bucket "order-images" does not exist!');
    console.error('\n📝 Please run SUPABASE_STORAGE_SETUP.sql first in Supabase SQL Editor');
    return;
  }

  console.log('✅ Storage bucket found\n');

  try {
    // Get all orders with base64 images
    const { data: orders, error } = await supabase
      .from('orders')
      .select('order_id, items')
      .order('order_date', { ascending: false });

    if (error) {
      console.error('❌ Error fetching orders:', error.message);
      return;
    }

    if (!orders || orders.length === 0) {
      console.log('ℹ️  No orders found');
      return;
    }

    console.log(`📦 Found ${orders.length} order(s) to check\n`);

    let migratedCount = 0;
    let skippedCount = 0;

    for (const order of orders) {
      if (!order.items || !Array.isArray(order.items)) {
        continue;
      }

      let needsUpdate = false;
      const updatedItems = await Promise.all(
        order.items.map(async (item, index) => {
          const itemId = item.id || `item-${index}`;
          let caseImage = item.case_image;
          let designImage = item.design_image;

          // Check and upload case image
          if (caseImage && caseImage.startsWith('data:image/')) {
            console.log(`\n📤 Order ${order.order_id}, Item ${index + 1}: Uploading case_image...`);
            caseImage = await uploadImageToStorage(supabase, caseImage, order.order_id, itemId, 'case');
            needsUpdate = true;
          }

          // Check and upload design image
          if (designImage && designImage.startsWith('data:image/')) {
            console.log(`📤 Order ${order.order_id}, Item ${index + 1}: Uploading design_image...`);
            designImage = await uploadImageToStorage(supabase, designImage, order.order_id, itemId, 'design');
            needsUpdate = true;
          }

          return {
            ...item,
            case_image: caseImage,
            design_image: designImage,
          };
        })
      );

      if (needsUpdate) {
        // Update order in database
        const { error: updateError } = await supabase
          .from('orders')
          .update({ items: updatedItems })
          .eq('order_id', order.order_id);

        if (updateError) {
          console.error(`❌ Error updating order ${order.order_id}:`, updateError.message);
        } else {
          console.log(`✅ Updated order ${order.order_id}`);
          migratedCount++;
        }
      } else {
        skippedCount++;
      }
    }

    console.log('\n\n📊 Migration Complete:');
    console.log(`   ✅ Migrated: ${migratedCount} order(s)`);
    console.log(`   ⏭️  Skipped: ${skippedCount} order(s) (already using URLs or no images)`);

  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
    console.error(error);
  }
}

migrateImages();
