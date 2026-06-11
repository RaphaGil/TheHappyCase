import React from 'react';
import Image from 'next/image';
import { CASE_OPTIONS } from '../../data/constants';
import { getMaxAvailableQuantity } from '../../utils/inventory';
import { normalizeImagePath } from '../../utils/imagePath';
import {
  OPTION_CASE_CATEGORY_LABEL,
  OPTION_CASE_SOLD_OUT,
  OPTION_CATEGORY_CARD_MIN_H,
  OPTION_CATEGORY_IMAGE,
  OPTION_FONT_STYLE,
  OPTION_SELECTION_CARD_ACTIVE,
  OPTION_SELECTION_CARD_INACTIVE,
  getCategoryLabelColor,
} from './designOptionStyles';

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
      <div className="grid grid-cols-3 gap-1 sm:gap-1.5 mb-2">
        {CASE_OPTIONS.map((opt) => {
          const caseImage = getCaseImage(opt.value);
          const soldOut = isCaseTypeSoldOut(opt.value);
          const isSelected = selectedCaseType === opt.value;

          return (
            <button
              key={opt.value}
              type="button"
              disabled={soldOut}
              className={`${OPTION_CATEGORY_CARD_MIN_H} w-full flex flex-col items-center justify-center px-1 py-1.5 rounded-lg transition-all duration-200 ${
                isSelected ? OPTION_SELECTION_CARD_ACTIVE : OPTION_SELECTION_CARD_INACTIVE
              } ${soldOut ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={() => {
                if (!soldOut) {
                  onSelect(opt.value);
                  if (onDropdownToggle) {
                    onDropdownToggle();
                  }
                }
              }}
            >
              {caseImage && (
                <div className={OPTION_CATEGORY_IMAGE}>
                  <div
                    className={`flex h-full w-full items-center justify-center overflow-hidden rounded ${
                      soldOut ? 'opacity-50' : ''
                    }`}
                  >
                    <Image
                      src={normalizeImagePath(caseImage)}
                      alt={opt.label}
                      className="max-h-full max-w-full object-contain p-0.5"
                      loading="lazy"
                      width={128}
                      height={128}
                      sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 128px"
                    />
                  </div>
                </div>
              )}
              <span
                className={`${OPTION_CASE_CATEGORY_LABEL} ${getCategoryLabelColor(isSelected)}`}
                style={OPTION_FONT_STYLE}
              >
                {opt.label}
              </span>
              {soldOut && (
                <span className={OPTION_CASE_SOLD_OUT} style={OPTION_FONT_STYLE}>Sold Out</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CaseSelector;



