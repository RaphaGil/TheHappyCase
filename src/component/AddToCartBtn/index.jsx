import React from 'react';

const AddToCartButton = ({ product, onAdd }) => (
  <button
    className="w-56 h-12 text-lg student-text-bold relative overflow-hidden group transform transition-all duration-300 hover:scale-105 active:scale-95 rounded-full shadow-xl"
    style={{
      background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 190%)',
      color: 'white',
      fontFamily: "'Fredoka One', cursive",
      fontWeight: 400,
      textShadow: '0 2px 4px rgba(0,0,0,0.3)'
    }}
    onClick={() => onAdd(product)}
  >
    {/* Animated background effect */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-white" />
    
    {/* Button content */}
    <span className="relative z-10 flex items-center justify-center font-bold ">
      <span>Add to Happy Basket</span>

    </span>
    
 
  </button>
);

export default AddToCartButton;
