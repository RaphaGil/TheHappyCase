/**
 * Pins attached to a cart row that is a passport case (not a standalone charm line).
 * Prefer pinsDetails; fall back to pins.
 */
export const getCaseLinePins = (item) => {
  if (!item || item.type === 'charm') return [];
  if (item.pinsDetails && item.pinsDetails.length > 0) return item.pinsDetails;
  if (item.pins && item.pins.length > 0) return item.pins;
  return [];
};

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

/**
 * Check if a charm is used in a Create Yours custom design (case with pins)
 * Create Yours adds case + charms with shared timestamp in IDs: case-{ts}-..., charm-{ts}-...
 * @param {Object} charmItem - The charm item to check
 * @param {Array} cart - The full cart
 * @param {number} charmIndex - Index of the charm in the cart
 * @returns {boolean} - True if the charm is used in a custom design
 */
export const isCharmUsedInCreateYoursItem = (charmItem, cart, charmIndex) => {
  // Match by shared timestamp: charm-{timestamp}-... links to case-{timestamp}-...
  const charmIdMatch = charmItem.id?.match(/^charm-(\d+)-/);
  if (!charmIdMatch) return false;

  const sharedTimestamp = charmIdMatch[1];
  return cart.some((cartItem, idx) => {
    if (idx === charmIndex) return false;
    if (!cartItem.customDesign && !cartItem.designImage) return false;
    if (!cartItem.id?.startsWith('case-')) return false;
    return cartItem.id.startsWith(`case-${sharedTimestamp}-`);
  });
};

/**
 * Get all indices to remove when deleting a Create Yours design (case + its charms)
 * @param {Array} cart - The full cart
 * @param {number} index - Index of the item being removed
 * @returns {number[]} - Indices to remove (case + associated charms), sorted descending
 */
export const getIndicesToRemoveWithDesign = (cart, index) => {
  const item = cart[index];
  if (!item) return [index];

  const isCreateYoursCase = (item.customDesign || item.designImage) && item.id?.startsWith('case-');
  if (!isCreateYoursCase) return [index];

  const caseIdMatch = item.id?.match(/^case-(\d+)-/);
  if (!caseIdMatch) return [index];

  const sharedTimestamp = caseIdMatch[1];
  const indicesToRemove = [index];

  cart.forEach((cartItem, idx) => {
    if (idx === index) return;
    if (cartItem.type === 'charm' && cartItem.id?.startsWith(`charm-${sharedTimestamp}-`)) {
      indicesToRemove.push(idx);
    }
  });

  return indicesToRemove.sort((a, b) => b - a);
};
