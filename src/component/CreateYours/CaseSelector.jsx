import React from 'react';
import Image from 'next/image';
import { CASE_OPTIONS } from '../../data/constants';
import { getMaxAvailableQuantity } from '../../utils/inventory';
import { normalizeImagePath } from '../../utils/imagePath';

const CaseSelector = ({ selectedCaseType, onSelect, Products, onDropdownToggle, cart = [] }) => {
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

  // Helper function to check if a case type is sold out (considering cart inventory)
  // Shows "Sold Out" if no more items can be added to the basket
  const isCaseTypeSoldOut = (caseType) => {
    const caseData = Products && Products.cases ? Products.cases.find(c => c.type === caseType) : null;
    if (!caseData) return false;
    
    // Note: We check inventory through getMaxAvailableQuantity below
    // which properly handles localStorage quantities, product data, and cart items
    // to determine if cases can be added to the basket
    
    // Check if all colors are sold out (considering cart inventory)
    // This uses getMaxAvailableQuantity which checks both color-level and case-level quantities
    if (caseData.colors && caseData.colors.length > 0) {
      // Check if at least one color has available inventory that can be added to basket
      // This considers items already in the basket/cart
      const hasAvailableColor = caseData.colors.some(color => {
        // Check available inventory considering cart (items in basket)
        // getMaxAvailableQuantity returns how many MORE can be added to the basket
        // It checks: color-level quantity -> case-level quantity -> product data
        // Returns: null (unlimited), > 0 (can add more), or 0 (cannot add any more)
        const productForInventory = {
          caseType: caseType,
          color: color.color,
        };
        const maxAvailable = getMaxAvailableQuantity(productForInventory, cart);
        
        // If maxAvailable is null, it means unlimited inventory (can add to basket)
        // If maxAvailable > 0, there's inventory available (can add to basket)
        // If maxAvailable === 0, no more can be added (all in basket or sold out) - SOLD OUT
        return maxAvailable === null || maxAvailable > 0;
      });
      
      // If no color has available inventory (maxAvailable === 0 for all colors), 
      // it means no cases can be added to the basket - show as SOLD OUT
      return !hasAvailableColor;
    }
    
    return false;
  };

  return (
    <div className="w-full">
      <div className="flex flex-nowrap gap-1.5 xs:gap-2 sm:gap-2.5 md:gap-3 lg:gap-4 justify-center items-start">
        {CASE_OPTIONS.map((opt) => {
          const caseImage = getCaseImage(opt.value);
          const soldOut = isCaseTypeSoldOut(opt.value);
          const isSelected = selectedCaseType === opt.value;
          
          return (
            <div
              key={opt.value}
              className={`transition-all duration-200 md:duration-300 lg:duration-500 flex flex-col items-center p-1.5 xs:p-2 sm:p-2 md:p-2.5 rounded-lg flex-1 max-w-[100px] xs:max-w-[120px] sm:max-w-[140px] md:max-w-[150px] lg:max-w-[170px] xl:max-w-[190px] ${isSelected ? 'border-2 border-gray-900 bg-gray-50' : 'border-2 border-transparent'} ${soldOut ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
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
                    <Image
                      src={normalizeImagePath(caseImage)}
                      alt={opt.label}
                      width={190}
                      height={190}
                      sizes="(max-width: 480px) 80px, (max-width: 768px) 120px, 190px"
                      className="w-full h-full object-contain p-1 xs:p-1.5 sm:p-2 md:p-2 lg:p-2.5"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-col items-center mt-1.5 md:mt-2 text-center">
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



