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
