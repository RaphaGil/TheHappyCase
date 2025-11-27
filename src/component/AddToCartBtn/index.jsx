import React from 'react';

const AddToCartButton = ({ product, onAdd, className, disabled = false }) => {
  const baseClasses =
    'w-full py-3 text-sm uppercase tracking-wider font-inter bg-btn-success hover:bg-btn-success-hover text-btn-success-text border border-btn-success-border hover:border-btn-success-hover transition-all duration-200';

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
