import React from 'react';
import CartLineActions from './CartLineActions';
import { normalizeImagePath } from '../../../utils/imagePath';

// Helper function to extract base charm name (remove suffixes like " Flag", " - Flag", etc.)
const getBaseCharmName = (name) => {
  if (!name) return '';
  let baseName = name;
  // Remove common suffixes
  baseName = baseName.replace(/\s*-\s*(Flag|Colorful Charm|Bronze Charm)$/i, '');
  baseName = baseName.replace(/\s+Flag$/i, '');
  return baseName.trim();
};

const CharmItem = ({ 
  item, 
  index, 
  formatPrice, 
  onRemove, 
  onIncrement, 
  onDecrement,
  errorMessage
}) => {
  const displayName = getBaseCharmName(item.name || item.pin?.name);
  const quantity = item.quantity || 1;
  const unit = item.price || item.totalPrice || 0;
  const lineTotal = unit * quantity;
  
  return (
    <div className="mt-2">
      <div className="flex items-start gap-3 px-1 py-1">
        <div className="relative flex-shrink-0">
          {item.image ? (
            <img
              src={normalizeImagePath(item.image)}
              alt={displayName || 'Charm'}
              className="h-20 w-20 rounded-md object-contain"
              loading="lazy"
              sizes="80px"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-md border border-gray-200 bg-gray-50">
              <span className="text-xs text-gray-400">Image</span>
            </div>
          )}
          {errorMessage && (
            <div className={`absolute ${quantity > 1 ? '-bottom-1 -right-1' : '-top-1 -right-1'} z-10 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white shadow-lg`}>
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-sm font-medium text-gray-900 font-inter">
            {displayName || 'Charm'}
          </span>
          {errorMessage && (
            <div className="mt-2 rounded-md border border-red-200 bg-red-50 p-2">
              <p className="text-xs leading-tight text-red-700 font-inter">
                {errorMessage}
              </p>
            </div>
          )}
        </div>
      </div>

      <CartLineActions
        quantity={quantity}
        onDecrement={() => onDecrement(item.id !== undefined ? item.id : index)}
        onIncrement={() => onIncrement(item.id !== undefined ? item.id : index)}
        formatPrice={formatPrice}
        unitPrice={unit}
        lineTotal={lineTotal}
        onRemove={() => onRemove(index)}
      />
    </div>
  );
};

export default CharmItem;
