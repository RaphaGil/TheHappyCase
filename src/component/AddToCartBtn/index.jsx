import React from 'react';

const AddToCartButton = ({ product, onAdd, className, disabled = false }) => (
  <button
    className={`w-full py-3 text-sm uppercase tracking-wider transition-all duration-200 ${className || 'text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-400'}`}
    style={{fontFamily: "'Poppins', sans-serif"}}
    onClick={() => !disabled && onAdd(product)}
    disabled={disabled}
  >
    Add to Cart
  </button>
);

export default AddToCartButton;
