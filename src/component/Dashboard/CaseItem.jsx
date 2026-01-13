import React from 'react';
import InventoryBadge from './InventoryBadge';
import InventoryStatusAlert from './InventoryStatusAlert';

const CaseItem = ({ caseItem, index, onQuantityChange }) => {
  const overallQuantity = caseItem.quantity !== undefined ? caseItem.quantity : null;
  const isOverallSoldOut = overallQuantity === 0;
  const isOverallLowStock = overallQuantity !== null && overallQuantity > 0 && overallQuantity <= 5;
  const isOverallInStock = overallQuantity !== null && overallQuantity > 5;
  const isOverallUnlimited = overallQuantity === null || overallQuantity === undefined;

  return (
    <div className="mb-8 border border-gray-200 rounded-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900 font-inter">
          {caseItem.name}
        </h3>
        <div className="flex items-center gap-2">
          {/* Overall Inventory Alert Badge */}
          {!isOverallUnlimited && (
            <div>
              <InventoryBadge quantity={overallQuantity} size="large" />
            </div>
          )}
          {isOverallSoldOut && (
            <span className="text-xs text-red-600 font-medium">SOLD OUT</span>
          )}
        </div>
      </div>

      {/* Overall Case Quantity (Optional) */}
      <div className="mb-6 pb-4 border-b border-gray-100">
        <label className="text-sm text-gray-600 font-medium mb-2 block font-inter">
          Overall Quantity (Optional):
        </label>
        <div className="flex items-center gap-3">
          <input
            type="number"
            min="0"
            value={caseItem.quantity ?? ''}
            onChange={(e) => onQuantityChange('case', index, null, e.target.value)}
            className="w-24 px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-gray-400 font-inter"
            placeholder="0"
          />
          {/* Overall Inventory Status Alert */}
          <InventoryStatusAlert quantity={overallQuantity} size="normal" />
        </div>
      </div>

      {/* Color Quantities */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-4 font-inter">
          Quantity per Color:
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {caseItem.colors.map((color, cIndex) => {
            const quantity = color.quantity !== undefined ? color.quantity : null;
            const isUnlimited = quantity === null || quantity === undefined;
            
            return (
              <div
                key={cIndex}
                className="flex flex-col items-center gap-2 p-3 border border-gray-200 rounded-sm hover:border-gray-300 transition-colors relative"
              >
                {/* Inventory Alert Badge */}
                {!isUnlimited && (
                  <div className="absolute -top-1 -right-1 z-10">
                    <InventoryBadge quantity={quantity} size="small" />
                  </div>
                )}
                
                {/* Color Swatch */}
                <div
                  className="w-12 h-12 rounded-full border-2 border-gray-300 shadow-sm"
                  style={{ backgroundColor: color.color }}
                  title={color.color}
                />
                
                {/* Color Name (if available) */}
                {color.name && (
                  <span className="text-xs text-gray-600 text-center font-inter">
                    {color.name}
                  </span>
                )}
                
                {/* Quantity Input */}
                <div className="w-full flex flex-col items-center gap-1">
                  <label className="text-xs text-gray-500 font-inter">
                    Qty:
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={color.quantity ?? ''}
                    onChange={(e) =>
                      onQuantityChange(
                        'case',
                        index,
                        null,
                        e.target.value,
                        cIndex
                      )
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded-sm text-xs text-center focus:outline-none focus:border-gray-400 font-inter"
                    placeholder="0"
                  />
                </div>
                
                {/* Inventory Status Alert */}
                <InventoryStatusAlert quantity={quantity} size="small" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CaseItem;
