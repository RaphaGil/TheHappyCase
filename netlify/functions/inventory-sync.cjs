/**
 * Sync new products from products.json into inventory_items (insert only missing rows).
 * POST /api/inventory/sync
 */

const { createClient } = require("@supabase/supabase-js");
const { buildAllInventoryItems } = require("./utils/buildInventoryItems.cjs");

const sendResponse = (statusCode, body) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  },
  body: JSON.stringify(body),
});

const loadProductsJson = () => {
  try {
    return require("./products.json");
  } catch {
    return require("./data/products.json");
  }
};

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return sendResponse(200, {});

  if (event.httpMethod !== "POST") {
    return sendResponse(405, {
      success: false,
      error: "Method not allowed",
      message: "Only POST requests are allowed",
    });
  }

  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return sendResponse(500, {
        success: false,
        error: "Supabase credentials missing",
      });
    }

    const Products = loadProductsJson();
    if (!Products?.pins) {
      return sendResponse(500, {
        success: false,
        error: "products.json has invalid structure",
      });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const allItems = buildAllInventoryItems(Products);

    const { data: existing, error: fetchError } = await supabase
      .from("inventory_items")
      .select("item_id");

    if (fetchError) {
      if (fetchError.code === "PGRST116" || fetchError.code === "42P01") {
        return sendResponse(200, {
          success: true,
          inserted: 0,
          message: "inventory_items table does not exist yet",
        });
      }
      throw fetchError;
    }

    const existingIds = new Set((existing || []).map((row) => row.item_id));
    const missingItems = allItems.filter((item) => !existingIds.has(item.item_id));

    if (missingItems.length === 0) {
      return sendResponse(200, {
        success: true,
        inserted: 0,
        message: "All products already exist in inventory",
      });
    }

    const { error: insertError } = await supabase
      .from("inventory_items")
      .insert(missingItems);

    if (insertError) {
      throw insertError;
    }

    return sendResponse(200, {
      success: true,
      inserted: missingItems.length,
      items: missingItems.map((item) => ({
        item_id: item.item_id,
        name: item.name,
      })),
    });
  } catch (err) {
    console.error("inventory-sync error:", err);
    return sendResponse(500, {
      success: false,
      error: err.message || "Failed to sync inventory items",
    });
  }
};
