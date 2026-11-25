import React from "react";

const EmptyCartState = ({ onContinueShopping }) => (
  <div className="text-center py-16 flex flex-col items-center justify-center">
    <div className="border border-gray-200 p-8 md:p-12 max-w-md mx-auto bg-white">
      <h2 className="text-xl md:text-2xl font-light text-gray-900 mb-4 font-inter">
        Your cart is empty
      </h2>
      <p className="text-gray-500 mb-8 text-sm font-normal font-inter">
        Start creating your custom case to add items to your cart.
      </p>

      <button
        onClick={onContinueShopping}
        className="btn-happy px-6 py-3 text-sm font-inter"
      >
        Create Your Case
      </button>
    </div>
  </div>
);

export default EmptyCartState;



