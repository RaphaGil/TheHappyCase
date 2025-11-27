import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const CartHeader = ({ totalItems, onBack }) => (
  <div className="mb-8">
    <button
      onClick={onBack}
      className="flex items-center text-gray-600 hover:text-gray-900 px-4 py-2 text-xs uppercase tracking-wider font-light transition-colors duration-200 mb-6 font-inter"
    >
      <FontAwesomeIcon icon={faArrowLeft} className="mr-2 text-xs" />
      Continue Shopping
    </button>

    <div className="text-center mb-8">
      <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-2 font-inter tracking-title">
        Your Cart ({totalItems})
      </h1>
      <div className="w-16 h-px bg-gray-300 mx-auto" />
    </div>
  </div>
);

export default CartHeader;



