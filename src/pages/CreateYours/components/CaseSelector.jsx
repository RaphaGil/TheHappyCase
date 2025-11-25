import React from 'react';
import { CASE_OPTIONS } from '../../../data/constants';

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
                className={`p-3 cursor-pointer transition-all duration-200 flex flex-col items-center gap-2 w-full ${
                  selectedCaseType === opt.value 
                    ? 'bg-gray-50 text-gray-900 font-medium ' 
                    : 'text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                } ${soldOut ? 'opacity-50 cursor-not-allowed' : ''}`}
                style={{fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"}}
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
                  <div className="relative w-full aspect-square overflow-hidden">
                    <img
                      src={caseImage}
                      alt={opt.label}
                      className={`w-full h-full object-contain p-2 ${soldOut ? 'opacity-50' : ''}`}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    {selectedCaseType === opt.value && !soldOut && (
                      <div className="absolute top-1 right-1 w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
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



