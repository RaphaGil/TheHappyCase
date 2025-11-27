import React from 'react';

const CartDrawerHeader = ({ onClose }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-100 flex-shrink-0">
      <h3 className="text-sm font-light uppercase tracking-wider text-gray-900 font-inter">
        Your Cart
      </h3>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-900 transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default CartDrawerHeader;

