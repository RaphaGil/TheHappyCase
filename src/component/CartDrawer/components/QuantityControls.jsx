import React from 'react';

const QuantityControls = ({ quantity, onDecrement, onIncrement }) => {
  return (
    <div className="flex items-center gap-1 border border-btn-primary-blue/30 rounded-sm p-1">
      <button 
        onClick={onDecrement} 
        className="w-6 h-6 flex items-center justify-center text-btn-primary-blue hover:bg-btn-primary-blue/10 rounded transition-colors"
      >
        −
      </button>
      <div className="px-2 py-0.5 text-xs text-gray-900 font-light font-inter">
        {quantity || 1}
      </div>
      <button 
        onClick={onIncrement} 
        className="w-6 h-6 flex items-center justify-center text-btn-primary-blue hover:bg-btn-primary-blue/10 rounded transition-colors"
      >
        +
      </button>
    </div>
  );
};

export default QuantityControls;

