/**
 * Format a Unix timestamp to a readable date string
 * @param {number} timestamp - Unix timestamp in seconds
 * @returns {string} Formatted date string
 */
export const formatDate = (timestamp) => {
  if (!timestamp) return 'N/A';
  return new Date(timestamp * 1000).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Calculate total amount from order items
 * @param {Array} items - Array of order items
 * @returns {number} Total amount
 */
export const calculateTotalAmount = (items) => {
  if (!items || items.length === 0) return 0;
  return items.reduce((sum, item) => {
    const itemPrice = item.totalPrice || item.price || 0;
    const quantity = item.quantity || 1;
    return sum + (itemPrice * quantity);
  }, 0);
};

/**
 * Generate a unique order number for the order summary (not derived from payment ID).
 * Format: THC- + 8 alphanumeric chars (e.g. THC-M3K9A2BX).
 */
export const generateOrderNumber = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  const bytes = typeof crypto !== 'undefined' && crypto.getRandomValues
    ? crypto.getRandomValues(new Uint8Array(8))
    : [];
  for (let i = 0; i < 8; i++) {
    code += chars[(bytes[i] || Math.floor(Math.random() * chars.length)) % chars.length];
  }
  return `THC-${code}`;
};

/**
 * Order # = last 8 chars of payment intent id (e.g. 0AHYE3CX). Same format everywhere.
 */
export const getOrderNumberFromPaymentIntentId = (paymentIntentId) => {
  if (!paymentIntentId || paymentIntentId === 'N/A') return 'N/A';
  return String(paymentIntentId).slice(-8).toUpperCase();
};

/**
 * Customer-facing order number. Uses last 8 chars of order id so payment success and My orders match.
 */
export const getDisplayOrderNumber = (orderId, _generatedOrderNumber) => {
  return getOrderNumberFromPaymentIntentId(orderId);
};

/**
 * Same order # as order summary – use for My orders / Dashboard.
 * Prefers order_number from DB, then last 8 chars of order_id.
 */
export const getOrderDisplayId = (order) => {
  if (!order) return 'N/A';
  return order.order_number || getOrderNumberFromPaymentIntentId(order.order_id) || 'N/A';
};
