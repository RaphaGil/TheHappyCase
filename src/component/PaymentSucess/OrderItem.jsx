import React from 'react';
import { normalizeImagePath } from '../../utils/imagePath';
import { getColorName } from '../../utils/createyours/helpers';

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

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
      <div className="flex items-start gap-4">
        {itemImage && (
          <img 
            src={normalizeImagePath(itemImage)} 
            alt={itemName}
            className="w-16 h-16 md:w-20 md:h-20 object-contain rounded"
            loading="lazy"
          />
        )}
        <div className="flex-1">
          <p className="font-semibold text-gray-900 mb-1 font-inter">
            {itemName}
          </p>
          {colorName && (
            <p className="text-sm text-gray-600 mb-1 font-inter">
              Color: <span className="font-medium">{colorName}</span>
            </p>
          )}
          {((item.pinsDetails && item.pinsDetails.length > 0) || (item.pins && Array.isArray(item.pins) && item.pins.length > 0)) && (
            <p className="text-sm text-gray-600 mb-1 font-inter">
              Charms: <span className="font-medium">{(item.pinsDetails || item.pins || []).length}</span>
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
