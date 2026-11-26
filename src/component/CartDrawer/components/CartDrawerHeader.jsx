import React from 'react';

const CartDrawerHeader = ({ onClose, itemCount = 0 }) => (
  <div className="flex flex-shrink-0 items-center justify-between border-b border-[#30279f]/10 px-5 py-4">
    <div className="flex items-baseline gap-2">
      <h2 id="cart-drawer-title" className="text-h3 text-[#30279f]">Your basket</h2>
      {itemCount > 0 && (
        <span className="rounded-full bg-[#eef0ff] px-2 py-0.5 text-xs font-semibold text-[#30279f] font-inter">
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </span>
      )}
    </div>
    <button
      onClick={onClose}
      className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-[#eef0ff] hover:text-[#30279f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#30279f]/40"
      aria-label="Close cart"
    >
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
);

export default CartDrawerHeader;
