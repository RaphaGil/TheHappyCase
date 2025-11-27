// Helper to group charm pins by unique key
export const groupPinsByKey = (pinsDetails = []) =>
  pinsDetails.reduce((acc, pin) => {
    const key = `${pin.src}|${pin.name}|${pin.price}`;
    if (!acc[key]) {
      acc[key] = { ...pin, count: 0 };
    }
    acc[key].count += 1;
    return acc;
  }, {});

// Helper to calculate item total (case + charms) and format with provided formatter
export const getItemTotal = (item, formatPrice) => {
  if (item.type === "charm") {
    const singlePrice = item.price || item.totalPrice || 0;
    return formatPrice(singlePrice * (item.quantity || 1));
  }

  const base =
    typeof item.basePrice === "number" ? item.basePrice : item.price || 0;

  const charmsTotal =
    item.pinsDetails && item.pinsDetails.length
      ? item.pinsDetails.reduce(
          (sum, pin) => sum + (pin.price || 0),
          0
        )
      : 0;

  return formatPrice((base + charmsTotal) * (item.quantity || 1));
};


