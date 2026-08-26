/**
 * Persist a Stripe PaymentIntent as an orders row when the success page never ran
 * (typical for Klarna / 3DS redirects).
 */
function orderNumberFromPaymentIntentId(id) {
  if (!id) return null;
  return String(id).slice(-8).toUpperCase();
}

function parseItemsFromPaymentIntent(pi) {
  try {
    const raw = JSON.parse(pi.metadata?.items || "[]");
    if (Array.isArray(raw) && raw.length > 0) {
      return raw.map((item) => {
        const quantity = parseInt(item.quantity ?? 1, 10) || 1;
        const unit = Number(item.price ?? item.unit_price ?? item.totalPrice ?? 0) || 0;
        return {
          name: item.name || item.caseName || "Item",
          type: item.type || null,
          case_type: item.case_type || item.caseType || null,
          quantity,
          unit_price: unit,
          total_price: unit * quantity,
        };
      });
    }
  } catch (_) {
    // truncated / invalid metadata
  }

  const amount = (pi.amount || 0) / 100;
  return [
    {
      name: pi.description || "Order",
      quantity: 1,
      unit_price: amount,
      total_price: amount,
    },
  ];
}

function joinCustomerName(first, surname) {
  return [first, surname]
    .map((v) => String(v || "").trim())
    .filter(Boolean)
    .join(" ")
    .trim();
}

function isPlaceholderName(name) {
  const value = String(name || "").trim().toLowerCase();
  return !value || value === "customer";
}

function customerFromPaymentIntent(pi) {
  const charge = pi.latest_charge && typeof pi.latest_charge === "object" ? pi.latest_charge : null;
  const billing = pi.payment_method?.billing_details || charge?.billing_details || {};
  const shipping = pi.shipping || charge?.shipping || null;
  const addr = shipping?.address || billing.address || null;

  let metadataCustomer = {};
  try {
    metadataCustomer = JSON.parse(pi.metadata?.customerInfo || "{}") || {};
  } catch (_) {
    metadataCustomer = {};
  }

  const metadataFullName =
    joinCustomerName(metadataCustomer.name, metadataCustomer.surname) ||
    String(pi.metadata?.customer_name || "").trim() ||
    null;

  // Prefer billing / metadata full name over shipping when shipping is still the
  // placeholder "Customer" set at payment-intent creation (before checkout form).
  const shippingName = String(shipping?.name || "").trim();
  const billingName = String(billing.name || "").trim();
  const fullName =
    (!isPlaceholderName(shippingName) && shippingName) ||
    billingName ||
    metadataFullName ||
    null;

  return {
    email:
      pi.receipt_email ||
      billing.email ||
      metadataCustomer.email ||
      pi.metadata?.customer_email ||
      null,
    name: fullName,
    firstName: metadataCustomer.name || null,
    surname: metadataCustomer.surname || null,
    phone: billing.phone || shipping?.phone || metadataCustomer.phone || null,
    address: addr
      ? {
          name: fullName,
          line1: addr.line1,
          line2: addr.line2 || null,
          city: addr.city,
          postal_code: addr.postal_code,
          country: addr.country,
          state: addr.state || null,
        }
      : metadataCustomer.address
        ? { ...metadataCustomer.address, name: fullName }
        : null,
  };
}

async function saveOrderFromPaymentIntent(supabase, pi) {
  if (!supabase || !pi?.id) {
    return { success: false, error: "Missing supabase or payment intent" };
  }

  const paymentIntentId = pi.id;
  const orderNumber = orderNumberFromPaymentIntentId(paymentIntentId);

  const { data: existing } = await supabase
    .from("orders")
    .select("order_id")
    .eq("payment_intent_id", paymentIntentId)
    .maybeSingle();

  if (existing) {
    return { success: true, alreadyExists: true, order_id: existing.order_id };
  }

  const customer = customerFromPaymentIntent(pi);
  if (!customer.email) {
    return { success: false, error: "Payment intent has no customer email" };
  }

  const orderData = {
    order_id: orderNumber,
    order_number: orderNumber,
    payment_intent_id: paymentIntentId,
    customer_email: customer.email,
    customer_name: customer.name,
    customer_phone: customer.phone,
    total_amount: parseFloat(((pi.amount || 0) / 100).toFixed(2)),
    currency: (pi.currency || "gbp").toLowerCase(),
    status: pi.status || "succeeded",
    order_date: new Date((pi.created || Math.floor(Date.now() / 1000)) * 1000).toISOString(),
    user_id: null,
    shipping_address: customer.address,
    items: parseItemsFromPaymentIntent(pi),
    metadata: {
      dispatched: false,
      dispatched_at: null,
      payment_method: pi.payment_method?.type || pi.payment_method_types?.[0] || null,
      saved_from: "stripe_webhook",
      customer_first_name: customer.firstName || null,
      customer_surname: customer.surname || null,
    },
  };

  const { data, error } = await supabase.from("orders").insert([orderData]).select("order_id").single();

  if (error) {
    if (error.code === "23505") {
      return { success: true, alreadyExists: true, order_id: orderNumber };
    }
    return { success: false, error: error.message };
  }

  return { success: true, order_id: data?.order_id || orderNumber };
}

module.exports = {
  saveOrderFromPaymentIntent,
  orderNumberFromPaymentIntentId,
};
