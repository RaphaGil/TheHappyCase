#!/usr/bin/env node
/**
 * Quick script to check if Supabase environment variables are configured
 * Run with: node check-supabase-config.js
 */

require("dotenv").config();

console.log("\n🔍 Checking Supabase Configuration...\n");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  console.log("❌ SUPABASE_URL is not set in .env file");
} else if (supabaseUrl.includes("your-project") || supabaseUrl.includes("placeholder")) {
  console.log("⚠️  SUPABASE_URL appears to be a placeholder value:", supabaseUrl);
} else {
  console.log("✅ SUPABASE_URL is set:", supabaseUrl.substring(0, 30) + "...");
}

if (!supabaseKey) {
  console.log("❌ SUPABASE_SERVICE_ROLE_KEY is not set in .env file");
} else if (supabaseKey.includes("your_service_role_key") || supabaseKey.includes("placeholder")) {
  console.log("⚠️  SUPABASE_SERVICE_ROLE_KEY appears to be a placeholder value");
} else {
  console.log("✅ SUPABASE_SERVICE_ROLE_KEY is set (length:", supabaseKey.length, "characters)");
}

if (supabaseUrl && supabaseKey && 
    !supabaseUrl.includes("your-project") && 
    !supabaseKey.includes("your_service_role_key")) {
  console.log("\n✅ All Supabase variables are configured correctly!");
  console.log("\n📝 Next steps:");
  console.log("   1. Make sure your backend server is running: npm run server");
  console.log("   2. You should see '✅ Supabase client initialized' in the server logs");
  console.log("   3. If you just added these variables, restart your server");
} else {
  console.log("\n❌ Supabase is not properly configured");
  console.log("\n📝 To fix this:");
  console.log("   1. Open your .env file in the project root");
  console.log("   2. Add these two lines:");
  console.log("      SUPABASE_URL=https://your-project.supabase.co");
  console.log("      SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here");
  console.log("   3. Replace with your actual Supabase credentials");
  console.log("   4. Get them from: Supabase Dashboard → Settings → API");
  console.log("   5. Restart your backend server after adding them");
}

console.log("\n");



















