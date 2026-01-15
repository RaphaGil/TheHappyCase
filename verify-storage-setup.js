// Verification script to check if Supabase Storage bucket is set up correctly
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

async function verifyStorageSetup() {
  console.log('\n🔍 Verifying Supabase Storage Setup...\n');

  // Check environment variables
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials in .env file:');
    console.error('   - SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
    console.error('   - SUPABASE_SERVICE_ROLE_KEY:', supabaseKey ? '✅ Set' : '❌ Missing');
    console.error('\n💡 Add these to your .env file and restart the server.');
    return;
  }

  console.log('✅ Supabase credentials found');
  
  // Initialize Supabase client
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // Check if bucket exists - try both listBuckets and direct access
    console.log('\n📦 Checking for "order-images" bucket...');
    
    let bucketExists = false;
    let bucketInfo = null;
    
    // First, try to list buckets
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (!bucketsError && buckets) {
      // Show all buckets found (for debugging)
      if (buckets.length > 0) {
        console.log(`📋 Found ${buckets.length} bucket(s) via listBuckets():`);
        buckets.forEach(bucket => {
          console.log(`   - ${bucket.id} (public: ${bucket.public ? 'yes' : 'no'})`);
        });
      }
      
      bucketInfo = buckets.find(b => b.id === 'order-images');
      if (bucketInfo) {
        bucketExists = true;
        console.log('✅ Bucket "order-images" found in list');
        console.log('   - Public:', bucketInfo.public ? '✅ Yes' : '❌ No (should be public)');
        console.log('   - File size limit:', bucketInfo.file_size_limit ? `${bucketInfo.file_size_limit / 1024 / 1024}MB` : 'No limit');
      }
    } else if (bucketsError) {
      console.log('⚠️  Could not list buckets:', bucketsError.message);
      console.log('   (This might be a permissions issue, trying direct access...)');
    }
    
    // If not found in list, try direct access
    if (!bucketExists) {
      console.log('\n💡 Trying direct bucket access...');
      const { data: directTest, error: directError } = await supabase.storage
        .from('order-images')
        .list('', { limit: 1 });
      
      if (directError) {
        console.error('❌ Cannot access bucket "order-images":', directError.message);
        console.error('\n📝 Possible solutions:');
        console.error('   1. Verify bucket name is exactly "order-images" (case-sensitive)');
        console.error('   2. Check bucket exists in Supabase Dashboard → Storage');
        console.error('   3. Run ADD_STORAGE_POLICIES.sql to add policies for existing bucket');
        console.error('   4. Or run SUPABASE_STORAGE_SETUP.sql (it handles existing buckets too)');
        console.error('   4. Verify service role key has storage access');
        return;
      } else {
        bucketExists = true;
        console.log('✅ Bucket exists and is accessible!');
        if (!bucketInfo) {
          console.log('   (listBuckets() might not show it due to permissions, but direct access works)');
        }
      }
    }

    // Check if bucket is accessible
    console.log('\n🔐 Testing bucket access...');
    // Create a tiny 1x1 PNG image for testing (minimal valid PNG)
    // PNG signature + IHDR + IDAT + IEND
    const tinyPngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
    const tinyPng = Buffer.from(tinyPngBase64, 'base64');
    const testFilename = `test-${Date.now()}.png`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('order-images')
      .upload(testFilename, tinyPng, {
        contentType: 'image/png',
        upsert: false
      });

    if (uploadError) {
      console.error('❌ Cannot upload to bucket:', uploadError.message);
      console.error('\n💡 Possible issues:');
        console.error('   - Storage policies not set correctly');
        console.error('   - Service role key doesn\'t have storage access');
        console.error('   - Run ADD_STORAGE_POLICIES.sql to add policies for existing bucket');
        console.error('   - Or run SUPABASE_STORAGE_SETUP.sql (it handles existing buckets too)');
      return;
    }

    console.log('✅ Successfully uploaded test file');

    // Clean up test file
    const { error: deleteError } = await supabase.storage
      .from('order-images')
      .remove([testFilename]);

    if (deleteError) {
      console.warn('⚠️ Could not delete test file:', deleteError.message);
    } else {
      console.log('✅ Test file cleaned up');
    }

    // Check existing images
    console.log('\n🖼️ Checking existing images in bucket...');
    const { data: files, error: listError } = await supabase.storage
      .from('order-images')
      .list('', {
        limit: 10,
        sortBy: { column: 'created_at', order: 'desc' }
      });

    if (listError) {
      console.warn('⚠️ Could not list files:', listError.message);
    } else {
      if (files && files.length > 0) {
        console.log(`✅ Found ${files.length} file(s) in bucket:`);
        files.forEach((file, index) => {
          console.log(`   ${index + 1}. ${file.name} (${(file.metadata?.size / 1024).toFixed(2)}KB)`);
        });
      } else {
        console.log('ℹ️  Bucket is empty (no images uploaded yet)');
        console.log('   This is normal if you haven\'t placed any orders with custom designs');
      }
    }

    console.log('\n✅ Storage setup verified successfully!');
    console.log('\n📝 Next steps:');
    console.log('   1. Place a test order with a custom design');
    console.log('   2. Check server logs for upload messages');
    console.log('   3. Verify images appear in Supabase Dashboard → Storage → order-images');

  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
    console.error(error);
  }
}

verifyStorageSetup();
