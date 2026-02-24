import React from 'react';
import PinSelector from '../PinSelector';

const CharmsSelectionSection = ({
  isOpen,
  onToggle,
  pins,
  selectedCategory,
  setSelectedCategory,
  selectedPins,
  onPinSelect,
  Products,
  cart
}) => {
  return (
    <div className="pb-6 border-b border-gray-100 mt-6 hidden md:block">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between mb-4"
      >
        <h3 className="text-sm uppercase tracking-wider text-gray-900 font-medium" style={{fontFamily: "'Poppins', sans-serif"}}>
          3. Choose Charms
        </h3>
        <svg 
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="relative z-10">
          <PinSelector
            pins={pins}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedPins={selectedPins}
            onSelect={onPinSelect}
            Products={Products}
            cart={cart}
          />
        </div>
      )}
    </div>
  );
};

export default CharmsSelectionSection;
