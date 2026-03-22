import React from 'react';

const QuantityControls = ({ quantity, onDecrement, onIncrement }) => {
  const qty = quantity || 1;

  return (
    <div
      className="inline-flex items-stretch overflow-hidden rounded-SM border border-gray-200 bg-white shadow-sm"
      role="group"
      aria-label="Change quantity"
    >
      <button
        type="button"
        onClick={onDecrement}
        className="flex min-h-[44px] min-w-[44px] items-center justify-center text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 active:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-btn-primary-blue/40"
        aria-label="Decrease quantity"
      >
        <span className="text-lg font-light leading-none" aria-hidden>
          −
        </span>
      </button>
      <div className="flex min-w-[2.75rem] items-center justify-center border-x border-gray-200 bg-white px-2">
        <span className="text-sm font-semibold tabular-nums text-gray-900 font-inter">{qty}</span>
      </div>
      <button
        type="button"
        onClick={onIncrement}
        className="flex min-h-[44px] min-w-[44px] items-center justify-center text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 active:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-btn-primary-blue/40"
        aria-label="Increase quantity"
      >
        <span className="text-lg font-light leading-none" aria-hidden>
          +
        </span>
      </button>
    </div>
  );
};

export default QuantityControls;
