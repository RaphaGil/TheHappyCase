import React from 'react';
import InventoryBadge from './InventoryBadge';
import InventoryStatusAlert from './InventoryStatusAlert';

const CharmItem = ({ charm, index, category, onQuantityChange }) => {
  const quantity = charm.quantity !== undefined ? charm.quantity : null;
  const isSoldOut = quantity === 0;
  const isLowStock = quantity !== null && quantity > 0 && quantity <= 5;
  const isInStock = quantity !== null && quantity > 5;
  const isUnlimited = quantity === null || quantity === undefined;

  return (
    <div className="flex flex-col items-center gap-2 p-3 border border-gray-200 rounded-sm hover:border-gray-300 transition-colors relative">
      {/* Inventory Alert Badge */}
      {!isUnlimited && (
        <div className="absolute -top-1 -right-1 z-10">
          <InventoryBadge quantity={quantity} size="small" />
        </div>
      )}
      
      {/* Charm Image */}
      {charm.image && (
        <div className="w-16 h-16 flex items-center justify-center border border-gray-200 rounded-sm bg-white">
          <img
            src={charm.image}
            alt={charm.name}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
      
      {/* Charm Name */}
      <span className="text-xs text-gray-700 text-center font-inter font-medium">
        {charm.name}
      </span>
      
      {/* Quantity Input */}
      <div className="w-full flex flex-col items-center gap-1">
        <label className="text-xs text-gray-500 font-inter">
          Qty:
        </label>
        <input
          type="number"
          min="0"
          value={charm.quantity ?? ''}
          onChange={(e) => onQuantityChange('charm', index, category, e.target.value)}
          className="w-full px-2 py-1 border border-gray-300 rounded-sm text-xs text-center focus:outline-none focus:border-gray-400 font-inter"
          placeholder="0"
        />
      </div>
      
      {/* Inventory Status Alert */}
      <InventoryStatusAlert quantity={quantity} size="small" />
    </div>
  );
};

export default CharmItem;
