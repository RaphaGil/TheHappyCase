#!/usr/bin/env node
/**
 * Migration script to populate inventory_items table from products.json
 * Run with: node migrate-inventory-to-items.js
 */

require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");
const Products = require("./src/data/products.json");

// Initialize Supabase
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error("❌ ERROR: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env");
  process.exit(1);
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function migrateInventory() {
  console.log("🚀 Starting inventory migration...\n");

  const itemsToInsert = [];

  // Process Cases
  console.log("Processing cases...");
  Products.cases.forEach((caseItem) => {
    // Add overall case item (if needed)
    // For now, we'll focus on color-specific items
    
    // Add each color variant
    caseItem.colors.forEach((color) => {
      const itemId = `case-${caseItem.id}-color-${color.color}`;
      itemsToInsert.push({
        item_id: itemId,
        item_type: "case_color",
        product_id: caseItem.id,
        name: `${caseItem.name} - ${color.color}`,
        color: color.color,
        price: caseItem.basePrice,
        qty_in_stock: null, // Will be set via Dashboard
        case_type: caseItem.type,
        category: null,
      });
    });
  });
  console.log(`  ✓ Added ${Products.cases.length} cases with ${itemsToInsert.length} color variants`);

  // Process Pins - Flags
  console.log("Processing flag pins...");
  Products.pins.flags.forEach((pin) => {
    const itemId = `pin-flags-${pin.id}`;
    itemsToInsert.push({
      item_id: itemId,
      item_type: "pin_flags",
      product_id: pin.id,
      name: pin.name,
      color: null,
      price: pin.price,
      qty_in_stock: null, // Will be set via Dashboard
      category: "flags",
      case_type: null,
    });
  });
  console.log(`  ✓ Added ${Products.pins.flags.length} flag pins`);

  // Process Pins - Colorful
  console.log("Processing colorful pins...");
  Products.pins.colorful.forEach((pin) => {
    const itemId = `pin-colorful-${pin.id}`;
    itemsToInsert.push({
      item_id: itemId,
      item_type: "pin_colorful",
      product_id: pin.id,
      name: pin.name,
      color: null,
      price: pin.price,
      qty_in_stock: null, // Will be set via Dashboard
      category: "colorful",
      case_type: null,
    });
  });
  console.log(`  ✓ Added ${Products.pins.colorful.length} colorful pins`);

  // Process Pins - Bronze
  console.log("Processing bronze pins...");
  Products.pins.bronze.forEach((pin) => {
    const itemId = `pin-bronze-${pin.id}`;
    itemsToInsert.push({
      item_id: itemId,
      item_type: "pin_bronze",
      product_id: pin.id,
      name: pin.name,
      color: null,
      price: pin.price,
      qty_in_stock: null, // Will be set via Dashboard
      category: "bronze",
      case_type: null,
    });
  });
  console.log(`  ✓ Added ${Products.pins.bronze.length} bronze pins`);

  console.log(`\n📦 Total items to insert: ${itemsToInsert.length}\n`);

  // Insert into Supabase (upsert to handle duplicates)
  console.log("Inserting into Supabase...");
  const { data, error } = await supabase
    .from("inventory_items")
    .upsert(itemsToInsert, {
      onConflict: "item_id",
      ignoreDuplicates: false, // Update existing items
    })
    .select();

  if (error) {
    console.error("❌ Error inserting items:", error);
    process.exit(1);
  }

  console.log(`✅ Successfully migrated ${data.length} items to inventory_items table!`);
  console.log("\n📝 Next steps:");
  console.log("   1. Go to Dashboard and set quantities for each item");
  console.log("   2. Click 'Save Changes' to update inventory in Supabase");
}

migrateInventory().catch((error) => {
  console.error("❌ Migration failed:", error);
  process.exit(1);
});









