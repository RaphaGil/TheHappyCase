import React from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import QuantityControls from './QuantityControls';

/**
 * Shared row: quantity stepper, line total (and optional “each” when qty &gt; 1), remove.
 */
const CartLineActions = ({
  quantity,
  onIncrement,
  onDecrement,
  formatPrice,
  unitPrice,
  lineTotal,
  onRemove,
}) => {
  const qty = quantity || 1;
  const showEach = qty > 1;

  return (
    <div className="mt-3 flex flex-col gap-3 rounded-sm border border-gray-100 bg-gray-50/90 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <div className="flex items-center gap-3">
        <span className="text-[11px] font-medium uppercase tracking-wider text-gray-500">
          Qty
        </span>
        <QuantityControls
          quantity={qty}
          onDecrement={onDecrement}
          onIncrement={onIncrement}
        />
      </div>

      <div className="flex flex-wrap items-end justify-between gap-3 sm:flex-nowrap sm:items-center sm:justify-end sm:gap-6">
        <div className="min-w-0   px-3 py-2 text-right sm:text-right">
          <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
            Line total
          </p>
          <p className="text-lg font-semibold leading-tight text-gray-900 tabular-nums font-inter">
            {formatPrice(lineTotal)}
          </p>
          {showEach && (
            <p className="mt-0.5 text-xs text-gray-500 font-inter">
              {formatPrice(unitPrice)} each
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={onRemove}
          className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-sm border border-transparent px-3 text-sm font-medium text-red-600 transition-colors hover:border-red-100 hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300 focus-visible:ring-offset-2 font-inter"
          aria-label="Remove this item from cart"
        >
          <TrashIcon className="h-4 w-4 shrink-0" aria-hidden />
          <span>Remove</span>
        </button>
      </div>
    </div>
  );
};

export default CartLineActions;
