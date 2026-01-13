import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const CartHeader = ({ totalItems = 0, onBack }) => {
  const itemCount = totalItems || 0;
  return (
    <div className="mb-8">
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-gray-900 px-4 py-2 text-xs uppercase tracking-wider font-light transition-colors duration-200 mb-6 font-inter"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2 text-xs" />
        Continue Shopping
      </button>

      <div className="text-center mb-12">
        <h1 className="text-title text-gray-900 tracking-title mb-2 font-inter">
         YOUR CART ({itemCount} {itemCount === 1 })
        </h1>
        <div className="w-16 sm:w-20 md:w-24 h-px bg-gray-200 mx-auto mb-4" />
      </div>
    </div>
  );
};

export default CartHeader;



