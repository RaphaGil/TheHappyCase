/**
 * Calculate pins price from selected pins
 */
export const calculatePinsPrice = (selectedPins) => {
  return selectedPins.reduce((total, { pin }) => total + (pin?.price || 0), 0);
};

/**
 * Calculate total price
 */
export const calculateTotalPrice = (caseBasePrice, pinsPrice, quantity) => {
  const displayQuantity = Math.max(quantity, 1);
  return ((caseBasePrice + pinsPrice) * displayQuantity).toFixed(2);
};

/**
 * Group pins for price breakdown display
 */
export const groupPinsForBreakdown = (selectedPins) => {
  const groupedPins = selectedPins.reduce((acc, { pin }) => {
    if (!pin) return acc;
    const key = `${pin.src}|${pin.name}|${pin.price}`;
    if (!acc[key]) {
      acc[key] = { ...pin, count: 0 };
    }
    acc[key].count += 1;
    return acc;
  }, {});
  return Object.values(groupedPins);
};












