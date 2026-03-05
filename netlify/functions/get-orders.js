/**
 * Netlify Function: get-orders
 * Fetches orders from Supabase by email or user_id.
 *
 * Env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 *
 * Query params: email, user_id, limit, offset, status
 */

const { createClient } = require("@supabase/supabase-js");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: corsHeaders, body: "" };
  }

  if (event.httpMethod !== "GET") {
    return jsonResponse(405, { error: "Method not allowed" });
  }

  const supabase = getSupabase();
  if (!supabase) {
    const missing = [];
    if (!process.env.SUPABASE_URL) missing.push("SUPABASE_URL");
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) missing.push("SUPABASE_SERVICE_ROLE_KEY");
    return jsonResponse(503, {
      success: false,
      error: "Supabase not configured",
      message: "Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Netlify environment variables. Missing: " + missing.join(", ") + ".",
    });
  }

  const params = event.queryStringParameters || {};
  const { limit = 100, offset = 0, status, email, user_id } = params;

  try {
    let query = supabase
      .from("orders")
      .select("*")
      .order("order_date", { ascending: false })
      .range(parseInt(offset, 10), parseInt(offset, 10) + parseInt(limit, 10) - 1);

    if (status) query = query.eq("status", status);
    if (user_id) query = query.eq("user_id", user_id);
    else if (email) query = query.eq("customer_email", email);

    const { data, error } = await query;

    if (error) {
      const errMsg = error.message || "Failed to fetch orders from database";
      return jsonResponse(500, {
        success: false,
        error: errMsg,
        message: errMsg,
      });
    }

    const ordersData = Array.isArray(data) ? data : data ? [data] : [];

    // Fetch tracking data and merge
    let trackingMap = {};
    if (ordersData.length > 0) {
      const orderIds = ordersData.map((o) => o.order_id).filter(Boolean);
      const { data: trackingData } = await supabase
        .from("tracking")
        .select("*")
        .in("order_id", orderIds);
      (trackingData || []).forEach((t) => {
        trackingMap[t.order_id] = t;
      });
    }

    const sanitizedOrders = ordersData.map((order) => {
      const sanitizedMetadata = order.metadata && typeof order.metadata === "object"
        ? order.metadata
        : typeof order.metadata === "string"
          ? (() => { try { return JSON.parse(order.metadata); } catch { return {}; } })()
          : {};
      const sanitizedItems = Array.isArray(order.items)
        ? order.items
        : typeof order.items === "string"
          ? (() => { try { return JSON.parse(order.items); } catch { return []; } })()
          : [];
      const trackingData = trackingMap[order.order_id] || null;
      const trackingWithCarrier = trackingData
        ? { ...trackingData, carrier: trackingData.carrier || sanitizedMetadata?.carrier || null }
        : sanitizedMetadata?.carrier ? { carrier: sanitizedMetadata.carrier } : null;
      return {
        ...order,
        metadata: sanitizedMetadata,
        items: sanitizedItems,
        tracking: trackingWithCarrier,
      };
    });

    let totalCount = 0;
    try {
      const { count } = await supabase.from("orders").select("*", { count: "exact", head: true });
      totalCount = count || 0;
    } catch (_) {}

    return jsonResponse(200, {
      success: true,
      orders: sanitizedOrders,
      total: totalCount,
      limit: parseInt(limit, 10) || 100,
      offset: parseInt(offset, 10) || 0,
    });
  } catch (err) {
    console.error("get-orders error:", err);
    return jsonResponse(500, {
      success: false,
      error: err.message || "Failed to fetch orders",
      message: err.message || "An error occurred while fetching orders",
    });
  }
};
