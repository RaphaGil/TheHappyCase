/**
 * Generate a unique key for grouping identical items in the cart
 * @param {Object} item - The cart item
 * @returns {string} - Unique key for grouping
 */
export const getItemGroupKey = (item) => {
  // For custom cases with designs, keep them separate (they have unique designs)
  if (item.customDesign || item.designImage) {
    return `custom-${item.id || Date.now()}`;
  }
  
  // For regular cases, group by caseType and color
  if (item.caseType && item.color) {
    // If it has pins, include them in the key (different pin combinations = different items)
    if (item.pins && item.pins.length > 0) {
      const pinsKey = item.pins
        .map(pin => pin.name || pin.src)
        .sort()
        .join('-');
      return `case-${item.caseType}-${item.color}-pins-${pinsKey}`;
    }
    return `case-${item.caseType}-${item.color}`;
  }
  
  // For charms, group by category and pin name
  if (item.category && item.pin) {
    return `charm-${item.category}-${item.pin.name || item.pin.src}`;
  }
  
  // Fallback: use ID if available
  return item.id ? `item-${item.id}` : `item-${Date.now()}`;
};

/**
 * Check if two items are identical and should be grouped
 * @param {Object} item1 - First item
 * @param {Object} item2 - Second item
 * @returns {boolean} - True if items are identical
 */
export const areItemsIdentical = (item1, item2) => {
  return getItemGroupKey(item1) === getItemGroupKey(item2);
};


