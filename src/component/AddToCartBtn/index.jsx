import React from 'react';

const AddToCartButton = ({ product, onAdd }) => (
  <button
    className="w-full px-6 py-3 bg-green-400 hover:bg-green-500 text-white rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm flex items-center justify-center gap-2 relative group"
    style={{fontFamily: "'Poppins', sans-serif", fontWeight: 600}}
    onClick={() => onAdd(product)}
  >
    {/* Animated background effect */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-white rounded-2xl" />
    
    {/* Button content */}
    <span className="relative flex items-center gap-2" 
          style={{fontFamily: "'Poppins', sans-serif", fontWeight: 600}}> 
     
      <span>Add to Happy Basket</span>
      
    </span>
  </button>
);

export default AddToCartButton;
