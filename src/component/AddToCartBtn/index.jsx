import React from 'react';

const AddToCartButton = ({ product, onAdd, className, disabled = false }) => {
  const baseClasses =
    'btn-happy btn-sunny w-full py-3 text-sm font-inter';

  return (
    <button
      className={`${baseClasses} ${className || ''}`.trim()}
      onClick={() => !disabled && onAdd(product)}
      disabled={disabled}
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
