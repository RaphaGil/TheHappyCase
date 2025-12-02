import React from 'react';
import { CASE_OPTIONS } from '../../../data/constants';

const CaseSelector = ({ selectedCaseType, onSelect, Products, onDropdownToggle }) => {
  // Get image for a case type
  const getCaseImage = (caseType) => {
    // First try to get from Products.cases
    if (Products && Products.cases) {
      const caseData = Products.cases.find(c => c.type === caseType);
      if (caseData && caseData.colors && caseData.colors.length > 0) {
        return caseData.colors[0].image;
      }
    }
    
    // Fallback to predefined images from constants
    const caseOption = CASE_OPTIONS.find(opt => opt.value === caseType);
    if (caseOption && caseOption.image) {
      return caseOption.image;
    }
    
    return null;
  };

  return (
    <div className="w-full">
      <div className="flex flex-nowrap gap-2 xs:gap-2.5 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 justify-center items-start">
        {CASE_OPTIONS.map((opt) => {
          const caseImage = getCaseImage(opt.value);
          const caseData = Products && Products.cases ? Products.cases.find(c => c.type === opt.value) : null;
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
          const isSelected = selectedCaseType === opt.value;
          
          return (
            <div
              key={opt.value}
              className={`transition-all duration-200 md:duration-300 lg:duration-500 flex flex-col items-center p-1.5 xs:p-2 sm:p-2.5 md:p-3 rounded-lg flex-1 max-w-[120px] xs:max-w-[140px] sm:max-w-[160px] md:max-w-[180px] lg:max-w-[200px] xl:max-w-[220px] ${isSelected ? 'bg-gray-50' : ''} ${soldOut ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
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
              <div className="relative w-full">
                {caseImage && (
                  <div
                    className={`w-full aspect-square transition-all duration-200 md:duration-300 lg:duration-500 overflow-hidden flex items-center justify-center ${
                      isSelected
                        ? "  scale-110"
                        : ""
                    } ${soldOut ? 'opacity-50' : ''}`}
                  >
                    <img
                      src={caseImage}
                      alt={opt.label}
                      className="w-full h-full object-contain p-1 xs:p-1.5 sm:p-2 md:p-2.5 lg:p-3 xl:p-4"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                {isSelected && !soldOut && (
                  <div className="absolute top-0 right-0 md:top-1 md:right-4 lg:top-2 lg:right-4 xl:top-2.5 xl:right-4.5 w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 bg-gray-900 rounded-full flex items-center justify-center shadow-md z-10">
                    <svg className="w-3 h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 xl:w-5 xl:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex flex-col items-center mt-2 md:mt-3 lg:mt-4 text-center">
                <span className={`text-xs md:text-sm font-medium tracking-wider ${isSelected ? 'text-gray-700' : 'text-gray-500'}`} style={{fontFamily: "'Poppins', sans-serif"}}>
                  {opt.label.split(' - ')[0]}
                </span>
                <span className={`text-xs md:text-sm font-medium mt-0.5 ${isSelected ? 'text-gray-500' : 'text-gray-400'}`} style={{fontFamily: "'Poppins', sans-serif"}}>
                  {opt.label.split(' - ')[1]}
                </span>
              </div>
              {soldOut && (
                <span className="text-[10px] md:text-xs lg:text-sm text-red-600 font-medium mt-1 md:mt-2">Sold Out</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CaseSelector;



