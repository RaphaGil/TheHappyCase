import React from 'react';
import QuantityControls from './QuantityControls';

/**
 * Bottom row of a basket line: quantity stepper on the left, line total
 * (plus "each" price when qty > 1) on the right.
 */
const CartLineActions = ({ quantity, onIncrement, onDecrement, formatPrice, unitPrice, lineTotal }) => {
  const qty = quantity || 1;
  return (
    <div className="mt-3 flex items-center justify-between gap-3">
      <QuantityControls quantity={qty} onDecrement={onDecrement} onIncrement={onIncrement} />
      <div className="text-right">
        <p className="text-base font-semibold tabular-nums text-gray-900 font-inter">{formatPrice(lineTotal)}</p>
        {qty > 1 && (
          <p className="text-xs text-gray-500 font-inter">{formatPrice(unitPrice)} each</p>
        )}
      </div>
    </div>
  );
};

export default CartLineActions;
