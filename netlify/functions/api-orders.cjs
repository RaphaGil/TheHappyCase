/**
 * Netlify Function: api-orders
 * Fetches a single order from Supabase by payment_intent_id or order_id.
 *
 * Query params: payment_intent_id, order_id (one required)
 *
 * Env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
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
    return jsonResponse(503, {
      success: false,
      error: "Supabase not configured",
      message: "Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Netlify environment variables.",
    });
  }

  const params = event.queryStringParameters || {};
  const { payment_intent_id, order_id } = params;

  if (!payment_intent_id && !order_id) {
    return jsonResponse(400, {
      success: false,
      error: "payment_intent_id or order_id query parameter is required",
    });
  }

  try {
    let query = supabase.from("orders").select("*");
    if (payment_intent_id) query = query.eq("payment_intent_id", payment_intent_id);
    else if (order_id) query = query.eq("order_id", order_id);

    const { data, error } = await query;

    if (error) {
      return jsonResponse(500, {
        success: false,
        error: error.message || "Failed to fetch order",
      });
    }

    if (!data || data.length === 0) {
      return jsonResponse(200, { success: false, order: null, message: "Order not found" });
    }

    const order = data[0];
    let trackingData = null;
    if (order.order_id) {
      const { data: tracking } = await supabase
        .from("tracking")
        .select("*")
        .eq("order_id", order.order_id)
        .single();
      trackingData = tracking;
    }

    return jsonResponse(200, {
      success: true,
      order: { ...order, tracking: trackingData },
    });
  } catch (err) {
    console.error("api-orders error:", err);
    return jsonResponse(500, {
      success: false,
      error: err.message || "Failed to fetch order",
    });
  }
};
