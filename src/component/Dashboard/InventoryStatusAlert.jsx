import React from 'react';

const InventoryStatusAlert = ({ quantity, size = 'normal' }) => {
  const isSoldOut = quantity === 0;
  const isLowStock = quantity !== null && quantity > 0 && quantity <= 5;
  const isInStock = quantity !== null && quantity > 5;
  const isUnlimited = quantity === null || quantity === undefined;

  const paddingClass = size === 'small' ? 'p-1.5' : 'p-2';
  const textSizeClass = size === 'small' ? 'text-[10px]' : 'text-xs';
  const containerClass = size === 'small' ? 'mt-1 w-full' : '';

  if (isSoldOut) {
    return (
      <div className={`${paddingClass} bg-red-50 border border-red-200 rounded-sm ${containerClass}`}>
        <p className={`${textSizeClass} text-red-700 font-medium font-inter ${size === 'small' ? 'text-center' : ''}`}>
          OUT OF STOCK
        </p>
      </div>
    );
  }

  if (isLowStock) {
    return (
      <div className={`${paddingClass} bg-orange-50 border border-orange-200 rounded-sm ${containerClass}`}>
        <p className={`${textSizeClass} text-orange-700 font-medium font-inter ${size === 'small' ? 'text-center' : ''}`}>
          LOW STOCK ({quantity})
        </p>
      </div>
    );
  }

  if (isInStock) {
    return (
      <div className={`${paddingClass} bg-green-50 border border-green-200 rounded-sm ${containerClass}`}>
        <p className={`${textSizeClass} text-green-700 font-medium font-inter ${size === 'small' ? 'text-center' : ''}`}>
          IN STOCK ({quantity})
        </p>
      </div>
    );
  }

  if (isUnlimited) {
    return (
      <div className={`${paddingClass} bg-gray-50 border border-gray-200 rounded-sm ${containerClass}`}>
        <p className={`${textSizeClass} text-gray-600 font-medium font-inter ${size === 'small' ? 'text-center' : ''}`}>
          UNLIMITED
        </p>
      </div>
    );
  }

  return null;
};

export default InventoryStatusAlert;
