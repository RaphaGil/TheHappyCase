import React from 'react';
import { CASE_OPTIONS } from '../constants';

const CaseSelector = ({ selectedCaseType, onSelect, Products, onDropdownToggle }) => {
  // Get image for a case type
  const getCaseImage = (caseType) => {
    if (!Products || !Products.cases) return null;
    const caseData = Products.cases.find(c => c.type === caseType);
    if (caseData && caseData.colors && caseData.colors.length > 0) {
      return caseData.colors[0].image;
    }
    return null;
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-3">
        {CASE_OPTIONS.map((opt) => {
          const caseImage = getCaseImage(opt.value);
          const caseData = Products.cases.find(c => c.type === opt.value);
          const isCaseSoldOut = () => {
            if (!caseData) return false;
            // Check case-level quantity
            if (caseData.quantity !== undefined && caseData.quantity === 0) {
              return true;
            }
            // Check if all colors are sold out
            if (caseData.colors && caseData.colors.length > 0) {
              return caseData.colors.every(color => 
                color.quantity !== undefined && color.quantity === 0
              );
            }
            return false;
          };
          const soldOut = isCaseSoldOut();
          
          return (
            <div key={opt.value} className="flex flex-col items-center gap-1">
              <button
                role="option"
                aria-selected={selectedCaseType === opt.value}
                disabled={soldOut}
                className={`p-3 cursor-pointer transition-all duration-200 border rounded flex flex-col items-center gap-2 w-full ${
                  selectedCaseType === opt.value 
                    ? 'bg-gray-50 text-gray-900 font-medium ring-2 ring-gray-300' 
                    : 'text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                } ${soldOut ? 'opacity-50 cursor-not-allowed' : ''}`}
                style={{fontFamily: "'Poppins', sans-serif"}}
                onClick={() => {
                  if (!soldOut) {
                    onSelect(opt.value);
                    // Close other dropdowns when selecting a case
                    if (onDropdownToggle) {
                      onDropdownToggle();
                    }
                  }
                }}
              >
                {caseImage && (
                  <div className="w-full aspect-square overflow-hidden">
                    <img
                      src={caseImage}
                      alt={opt.label}
                      className={`w-full h-full object-contain p-2 ${soldOut ? 'opacity-50' : ''}`}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <span className="text-xs text-center">{opt.label}</span>
              </button>
              {soldOut && (
                <span className="text-[10px] text-red-600 font-medium">Sold Out</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CaseSelector;



