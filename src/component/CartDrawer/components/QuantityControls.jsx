import React from 'react';

const QuantityControls = ({ quantity, onDecrement, onIncrement }) => {
  const qty = quantity || 1;
  const btn =
    'flex h-9 w-9 items-center justify-center rounded-full text-[#30279f] transition-colors hover:bg-[#eef0ff] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#30279f]/40';

  return (
    <div
      className="inline-flex items-center rounded-full border border-[#30279f]/20 bg-white p-0.5"
      role="group"
      aria-label="Change quantity"
    >
      <button type="button" onClick={onDecrement} className={btn} aria-label="Decrease quantity">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M5 12h14" /></svg>
      </button>
      <span className="min-w-[1.75rem] text-center text-sm font-semibold tabular-nums text-gray-900 font-inter" aria-live="polite">
        {qty}
      </span>
      <button type="button" onClick={onIncrement} className={btn} aria-label="Increase quantity">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
      </button>
    </div>
  );
};

export default QuantityControls;
