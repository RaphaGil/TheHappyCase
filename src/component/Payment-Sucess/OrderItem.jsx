import React from 'react';
import { normalizeImagePath } from '../../utils/imagePath';
import { getColorName } from '../../utils/createyours/helpers';
import { getCaseLinePins } from '../../utils/cartHelpers';

const OrderItem = ({ item }) => {
  // Handle both saved order format (with unit_price, total_price) and original format (price, totalPrice)
  const itemImage = item.design_image || item.designImage || item.case_image || item.caseImage || item.image;
  const itemName = item.caseName || item.name || 'Custom Case';
  
  // Calculate price - handle both formats
  let itemPrice = 0;
  if (item.total_price !== undefined) {
    // Saved order format: use total_price directly
    itemPrice = parseFloat(item.total_price) || 0;
  } else if (item.totalPrice !== undefined) {
    // Original format: totalPrice * quantity
    itemPrice = (parseFloat(item.totalPrice) || 0) * (item.quantity || 1);
  } else if (item.price !== undefined) {
    // Original format: price * quantity
    itemPrice = (parseFloat(item.price) || 0) * (item.quantity || 1);
  }
  
  // Get readable color name from hex code or image path
  const colorName = item.color ? getColorName(item.color, item.case_image || item.caseImage || item.image) : null;

  const caseQty = item.quantity || 1;
  const linePins = getCaseLinePins(item);
  const charmGroups =
    linePins.length > 0
      ? Object.values(
          linePins.reduce((acc, p) => {
            const key = `${p.src || ''}|${p.name || ''}`;
            if (!acc[key]) acc[key] = { name: p.name, src: p.src, count: 0 };
            acc[key].count += 1;
            return acc;
          }, {})
        )
      : [];

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
      <div className="flex items-start gap-4">
        {(itemImage ? (
          <img 
            src={normalizeImagePath(itemImage)} 
            alt={itemName}
            className="w-20 h-20 md:w-24 md:h-24 object-contain rounded border bg-white"
            loading="lazy"
          />
        ) : (
          <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-100 rounded border flex items-center justify-center flex-shrink-0">
            <span className="text-xs text-gray-400">No image</span>
          </div>
        ))}
        <div className="flex-1">
          <p className="font-semibold text-gray-900 mb-1 font-inter">
            {itemName}
          </p>
          {colorName && (
            <p className="text-sm text-gray-600 mb-1 font-inter">
              Color: <span className="font-medium">{colorName}</span>
            </p>
          )}
          {charmGroups.length > 0 && (
            <p className="text-sm text-gray-600 mb-1 font-inter">
              Charms:{' '}
              <span className="font-medium">
                {charmGroups.map((g, i) => {
                  const label = g.name || g.src || 'Charm';
                  const n = g.count * caseQty;
                  const text = n > 1 ? `${label} (×${n})` : label;
                  return (
                    <span key={`${g.src}-${i}`}>
                      {i > 0 ? ', ' : ''}
                      {text}
                    </span>
                  );
                })}
              </span>
            </p>
          )}
          {(item.customText || item.custom_text) && (
            <p className="text-sm text-gray-600 mb-1 font-inter">
              Text: <span className="font-medium">&quot;{item.customText || item.custom_text}&quot;</span>
            </p>
          )}
          {item.quantity > 1 && (
            <p className="text-sm text-gray-600 mb-1 font-inter">
              Quantity: <span className="font-medium">{item.quantity}</span>
            </p>
          )}
          <p className="text-sm font-semibold text-gray-900 mt-2 font-inter">
            £{itemPrice.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
