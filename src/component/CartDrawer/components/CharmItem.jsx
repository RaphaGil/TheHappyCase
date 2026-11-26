import React from 'react';
import CartLineActions from './CartLineActions';
import RemoveButton from './RemoveButton';
import ErrorNote from './ErrorNote';
import { normalizeImagePath } from '../../../utils/imagePath';

// Strip suffixes like " Flag" or " - Colorful Charm" from charm names
const getBaseCharmName = (name) => {
  if (!name) return '';
  return name
    .replace(/\s*-\s*(Flag|Colorful Charm|Bronze Charm)$/i, '')
    .replace(/\s+Flag$/i, '')
    .trim();
};

const categoryLabel = (item) => {
  const c = (item.category || item.pin?.category || '').toLowerCase();
  if (c === 'bronze') return 'Bronze charm';
  if (c === 'flags' || c === 'flag') return 'Flag charm';
  return 'Colourful charm';
};

const CharmItem = ({ item, index, formatPrice, onRemove, onIncrement, onDecrement, errorMessage }) => {
  const displayName = getBaseCharmName(item.name || item.pin?.name) || 'Charm';
  const quantity = item.quantity || 1;
  const unit = item.price || item.totalPrice || 0;

  return (
    <div className="flex gap-4">
      <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl bg-[#fffbd6] p-2">
        {item.image ? (
          <img src={normalizeImagePath(item.image)} alt="" className="h-full w-full object-contain" loading="lazy" />
        ) : (
          <span className="text-xs text-gray-400">Image</span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[15px] font-semibold leading-snug text-gray-900 font-inter">{displayName}</p>
            <p className="mt-0.5 text-xs text-gray-500 font-inter">{categoryLabel(item)}</p>
          </div>
          <RemoveButton onClick={() => onRemove(index)} label={`Remove ${displayName} from basket`} />
        </div>
        {errorMessage && <ErrorNote>{errorMessage}</ErrorNote>}
        <CartLineActions
          quantity={quantity}
          onDecrement={() => onDecrement(item.id !== undefined ? item.id : index)}
          onIncrement={() => onIncrement(item.id !== undefined ? item.id : index)}
          formatPrice={formatPrice}
          unitPrice={unit}
          lineTotal={unit * quantity}
        />
      </div>
    </div>
  );
};

export default CharmItem;
