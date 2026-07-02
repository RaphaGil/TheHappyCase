/**
 * Build inventory_items rows from products.json (cases + all pin categories).
 */
function buildAllInventoryItems(Products) {
  const items = [];

  if (!Products?.cases || !Products?.pins) {
    return items;
  }

  Products.cases.forEach((caseItem) => {
    (caseItem.colors || []).forEach((color) => {
      items.push({
        item_id: `case-${caseItem.id}-color-${color.color}`,
        item_type: "case_color",
        product_id: caseItem.id,
        name: `${caseItem.name} - ${color.color}`,
        color: color.color,
        price: caseItem.basePrice,
        qty_in_stock: null,
        case_type: caseItem.type,
        category: null,
      });
    });
  });

  const pinCategories = [
    { key: "flags", itemType: "pin_flags", category: "flags" },
    { key: "colorful", itemType: "pin_colorful", category: "colorful" },
    { key: "bronze", itemType: "pin_bronze", category: "bronze" },
  ];

  pinCategories.forEach(({ key, itemType, category }) => {
    (Products.pins[key] || []).forEach((pin) => {
      items.push({
        item_id: `pin-${category}-${pin.id}`,
        item_type: itemType,
        product_id: pin.id,
        name: pin.name,
        color: null,
        price: pin.price,
        qty_in_stock: null,
        category,
        case_type: null,
      });
    });
  });

  return items;
}

module.exports = { buildAllInventoryItems };
