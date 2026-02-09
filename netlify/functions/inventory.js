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

const sendResponse = (statusCode, body, headers = {}) => {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      ...headers,
    },
    body: JSON.stringify(body),
  };
};

/**
 * Load products.json safely.
 * IMPORTANT:
 * Netlify Functions bundle does not always include /src
 * unless explicitly configured.
 */
const loadProductsJson = () => {
  const possiblePaths = [
    // Best option: put products.json inside netlify/functions/data/
    join(__dirname, "data", "products.json"),

    // Fallbacks (may work locally)
    join(process.cwd(), "src", "data", "products.json"),
    join(__dirname, "../../src/data/products.json"),
    join(__dirname, "../../../src/data/products.json"),
  ];

  for (const filePath of possiblePaths) {
    try {
      if (!existsSync(filePath)) continue;
      const raw = readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(raw);

      console.log("✅ Loaded products.json from:", filePath);

      return parsed;
    } catch (err) {
      console.warn("⚠️ Failed loading products.json from:", filePath);
    }
  }

  return null;
};

exports.handler = async (event) => {
  // CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return sendResponse(200, {});
  }

  // Only allow GET
  if (event.httpMethod !== "GET") {
    return sendResponse(405, {
      success: false,
      error: "Method not allowed",
      message: "Only GET requests are allowed",
    });
  }

  try {
    // 1) ENV CHECK
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error("❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
      return sendResponse(500, {
        success: false,
        error: "Supabase credentials missing in Netlify environment variables",
      });
    }

    // 2) LOAD PRODUCTS.JSON
    const Products = loadProductsJson();

    if (!Products) {
      console.error("❌ products.json not found in function bundle.");
      console.error(
        "👉 Fix: Put it in netlify/functions/data/products.json"
      );

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

    // 3) INIT SUPABASE
    const supabase = createClient(supabaseUrl, supabaseKey);

    // 4) FETCH SUPABASE INVENTORY
    const { data: items, error } = await supabase
      .from("inventory_items")
      .select("*")
      .order("item_type", { ascending: true })
      .order("product_id", { ascending: true });

    console.log("[API INVENTORY] Supabase returned items:", items?.length || 0);

    if (error) {
      console.error("[API INVENTORY] Supabase error:", error);
      return sendResponse(500, {
        success: false,
        error: "Supabase query failed",
        details: error.message || error,
      });
    }

    // 5) CREATE EMPTY INVENTORY STRUCTURE (same shape as frontend expects)
    const inventory = {
      cases: Products.cases.map(() => null),

      caseColors: Products.cases.map((caseItem) => {
        if (!caseItem || !Array.isArray(caseItem.colors)) return [];
        return caseItem.colors.map(() => null);
      }),

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

    // 6) MAP SUPABASE ITEMS INTO STRUCTURE
    const safeItems = Array.isArray(items) ? items : [];

    for (const item of safeItems) {
      if (!item) continue;

      const qty = item.qty_in_stock ?? null;

      // CASE COLORS
      if (item.item_type === "case_color") {
        const caseIndex = Products.cases.findIndex((c) => c.id === item.product_id);
        if (caseIndex === -1) continue;

        const caseData = Products.cases[caseIndex];
        if (!caseData || !Array.isArray(caseData.colors)) continue;

        const colorIndex = caseData.colors.findIndex((c) => c.color === item.color);
        if (colorIndex === -1) continue;

        if (!Array.isArray(inventory.caseColors[caseIndex])) {
          inventory.caseColors[caseIndex] = [];
        }

        inventory.caseColors[caseIndex][colorIndex] = qty;
      }

      // PIN FLAGS
      if (item.item_type === "pin_flags") {
        const index = Products.pins.flags.findIndex((p) => p.id === item.product_id);
        if (index !== -1) inventory.pins.flags[index] = qty;
      }

      // PIN COLORFUL
      if (item.item_type === "pin_colorful") {
        const index = Products.pins.colorful.findIndex((p) => p.id === item.product_id);
        if (index !== -1) inventory.pins.colorful[index] = qty;
      }

      // PIN BRONZE
      if (item.item_type === "pin_bronze") {
        const index = Products.pins.bronze.findIndex((p) => p.id === item.product_id);
        if (index !== -1) inventory.pins.bronze[index] = qty;
      }
    }

    // 7) DONE
    return sendResponse(200, {
      success: true,
      inventory,
      meta: {
        itemsFetched: safeItems.length,
        casesCount: Products.cases.length,
      },
    });
  } catch (err) {
    console.error("❌ INVENTORY FUNCTION CRASH:", err);

    return sendResponse(500, {
      success: false,
      error: err.message || "Unknown server error",
    });
  }
};
