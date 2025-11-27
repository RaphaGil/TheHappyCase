import React from "react";

const EmptyCartState = ({ onContinueShopping }) => (
  <div className="text-center py-16 flex flex-col items-center justify-center">
    <div className="border border-gray-200 p-8 md:p-12 max-w-md mx-auto bg-white">
      <h2 className="text-xl md:text-2xl font-light text-gray-900 mb-4 font-inter">
        Your cart is empty
      </h2>
      <p className="text-gray-500 mb-8 text-sm font-light font-inter">
        Start creating your custom case to add items to your cart.
      </p>

      <button
        onClick={onContinueShopping}
        className="px-6 py-2 text-xs uppercase tracking-wider font-light font-inter bg-btn-primary-blue hover:bg-btn-primary-blue-hover text-btn-primary-blue-text border border-btn-primary-blue-border hover:border-btn-primary-blue-hover transition-all duration-200"
      >
        Create Your Case
      </button>
    </div>
  </div>
);

export default EmptyCartState;



