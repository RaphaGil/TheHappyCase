import React from 'react';
import { normalizeImagePath } from '../../utils/imagePath';

const OrderItem = ({ item }) => {
  const itemImage = item.designImage || item.caseImage || item.image;
  const itemName = item.caseName || item.name || 'Custom Case';
  const itemPrice = (item.totalPrice || item.price || 0) * (item.quantity || 1);

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
          {item.color && (
            <p className="text-sm text-gray-600 mb-1 font-inter">
              Color: <span className="font-medium">{item.color}</span>
            </p>
          )}
          {item.pinsDetails && item.pinsDetails.length > 0 && (
            <p className="text-sm text-gray-600 mb-1 font-inter">
              Charms: <span className="font-medium">{item.pinsDetails.length}</span>
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
