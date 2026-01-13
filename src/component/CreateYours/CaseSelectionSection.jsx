import React from 'react';
import CaseSelector from './CaseSelector';
import ColorSelector from '../ColorSelector';

const CaseSelectionSection = ({
  isOpen,
  onToggle,
  selectedCaseType,
  selectedColor,
  selectedCase,
  onCaseSelect,
  onColorSelect,
  setIsCaseDropdownOpen,
  Products,
  cart
}) => {
  return (
    <div className="pb-6 border-b border-gray-100 flex-shrink-0 mt-6 overflow-visible hidden md:block">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between mb-4"
      >
        <h3 className="text-sm uppercase tracking-wider text-gray-900 font-medium" style={{fontFamily: "'Poppins', sans-serif"}}>
          1. Choose Case
        </h3>
        <svg 
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="space-y-6 overflow-visible">
          <CaseSelector
            selectedCaseType={selectedCaseType}
            onSelect={onCaseSelect}
            Products={Products}
            isCaseDropdownOpen={isOpen}
            setIsCaseDropdownOpen={setIsCaseDropdownOpen}
            cart={cart}
          />
          
          {selectedColor && (
            <div className="mt-10 overflow-visible">
              <ColorSelector
                colors={selectedCase?.colors || []}
                selectedColor={selectedColor}
                onSelect={onColorSelect}
                caseType={selectedCaseType}
                cart={cart}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CaseSelectionSection;
