/**
 * PRODUCTION Inventory Netlify Function
 *
 * Reads inventory from Supabase table: inventory_items
 * and maps it into the same structure used by your frontend.
 *
 * Required Netlify env vars:
 * - SUPABASE_URL
 * - SUPABASE_SERVICE_ROLE_KEY
 */

const { createClient } = require("@supabase/supabase-js");
const { readFileSync, existsSync } = require("fs");
const { join } = require("path");

// --------------------
// Helper: Send JSON response
// --------------------
const sendResponse = (statusCode, body, headers = {}) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    ...headers,
  },
  body: JSON.stringify(body),
});

// --------------------
// Load products.json
// --------------------
const loadProductsJson = () => {
  const productsPath = join(__dirname, "data", "products.json");

  console.log("[API INVENTORY] Loading products.json from:", productsPath);

  if (!existsSync(productsPath)) {
    console.error("❌ products.json not found at:", productsPath);
    return null;
  }

  try {
    const raw = readFileSync(productsPath, "utf-8");
    const Products = JSON.parse(raw);

    console.log("✅ Loaded products.json");
    console.log("[API INVENTORY] Products structure:", {
      hasCases: !!Products.cases,
      casesLength: Products.cases?.length,
      hasPins: !!Products.pins,
      pinsFlags: Products.pins?.flags?.length,
      pinsColorful: Products.pins?.colorful?.length,
      pinsBronze: Products.pins?.bronze?.length,
    });

    return Products;
  } catch (err) {
    console.error("❌ Failed to parse products.json:", err.message);
    return null;
  }
};

// --------------------
// Main handler
// --------------------
exports.handler = async (event) => {
  // CORS preflight
  if (event.httpMethod === "OPTIONS") return sendResponse(200, {});

  // Only GET allowed
  if (event.httpMethod !== "GET") {
    return sendResponse(405, {
      success: false,
      error: "Method not allowed",
      message: "Only GET requests are allowed",
    });
  }

  try {
    // --------------------
    // 1) Check environment variables
    // --------------------
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error("❌ Missing Supabase credentials");
      return sendResponse(500, {
        success: false,
        error: "Supabase credentials missing in Netlify environment variables",
      });
    }

    // --------------------
    // 2) Load products.json
    // --------------------
    const Products = loadProductsJson();
    if (!Products) {
      return sendResponse(500, {
        success: false,
        error: "products.json missing",
        message:
          "products.json was not found in the deployed Netlify function bundle. Move it into netlify/functions/data/products.json.",
      });
    }
    if (!Array.isArray(Products.cases) || !Products.pins) {
      return sendResponse(500, {
        success: false,
        error: "products.json has invalid structure",
      });
    }

    // --------------------
    // 3) Init Supabase
    // --------------------
    console.log("[API INVENTORY] Initializing Supabase client...");
    const supabase = createClient(supabaseUrl, supabaseKey);

    // --------------------
    // 4) Fetch inventory from Supabase
    // --------------------
    console.log("[API INVENTORY] Fetching inventory from Supabase...");
    let items = [];
    try {
      const { data, error } = await supabase
        .from("inventory_items")
        .select("*")
        .order("item_type")
        .order("product_id");

      if (error) {
        console.error("[API INVENTORY] Supabase error:", error);
        // If table doesn't exist, return empty structure
        if (
          error.code === "PGRST116" ||
          error.code === "42P01" ||
          error.message?.includes("does not exist")
        ) {
          console.log("[API INVENTORY] Table missing, returning empty inventory");
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
              note: "inventory_items table does not exist",
            },
          });
        }

        throw new Error(error.message);
      }

      items = data || [];
    } catch (queryError) {
      console.error("[API INVENTORY] Supabase query exception:", queryError);
      return sendResponse(500, {
        success: false,
        error: "Supabase query exception",
        details: queryError.message || String(queryError),
      });
    }

    // --------------------
    // 5) Create empty inventory structure
    // --------------------
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

    // --------------------
    // 6) Map Supabase items into structure
    // --------------------
    for (const item of items) {
      const qty = item.qty_in_stock ?? null;

      if (item.item_type === "case_color") {
        const caseIndex = Products.cases.findIndex((c) => c.id === item.product_id);
        if (caseIndex === -1) continue;
        const caseData = Products.cases[caseIndex];
        if (!caseData || !Array.isArray(caseData.colors)) continue;
        const colorIndex = caseData.colors.findIndex((c) => c.color === item.color);
        if (colorIndex === -1) continue;
        inventory.caseColors[caseIndex][colorIndex] = qty;
      }

      if (item.item_type === "pin_flags") {
        const index = Products.pins.flags.findIndex((p) => p.id === item.product_id);
        if (index !== -1) inventory.pins.flags[index] = qty;
      }

      if (item.item_type === "pin_colorful") {
        const index = Products.pins.colorful.findIndex((p) => p.id === item.product_id);
        if (index !== -1) inventory.pins.colorful[index] = qty;
      }

      if (item.item_type === "pin_bronze") {
        const index = Products.pins.bronze.findIndex((p) => p.id === item.product_id);
        if (index !== -1) inventory.pins.bronze[index] = qty;
      }
    }

    // --------------------
    // 7) Return response
    // --------------------
    return sendResponse(200, {
      success: true,
      inventory,
      meta: {
        itemsFetched: items.length,
        casesCount: Products.cases.length,
      },
    });
  } catch (err) {
    console.error("❌ INVENTORY FUNCTION CRASH:", err);
    return sendResponse(500, {
      success: false,
      error: err.message || "Unknown server error",
      details: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
};
