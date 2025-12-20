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
  
  // For charms, always group by category and pin name (ignore unique IDs for grouping)
  // This ensures the same charm shows as one item with quantity, regardless of where it came from
  if (item.type === 'charm' || (item.category && item.pin)) {
    const category = item.category || (item.pin && item.pin.category) || 'colorful';
    const pinName = item.pin?.name || item.pin?.src || item.name || '';
    return `charm-${category}-${pinName}`;
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
  
  // If item has a unique ID (from custom design), treat it as unique
  // IDs starting with "case-" followed by timestamp are from CreateYours custom cases
  if (item.id && item.id.startsWith('case-')) {
    return `unique-${item.id}`;
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


