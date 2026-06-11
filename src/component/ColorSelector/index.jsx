import React from "react";
import { getMaxAvailableQuantity } from '../../utils/inventory';
import { normalizeImagePath } from '../../utils/imagePath';
import {
  OPTION_CASE_COLOR_LABEL,
  OPTION_CASE_SOLD_OUT,
  OPTION_FONT_STYLE,
  getItemLabelColor,
} from '../CreateYours/designOptionStyles';
import { getColorNameFromImage } from '../../utils/colorNames';

const ColorSelector = ({ colors, selectedColor, onSelect, caseType, cart = [], isLoading = false }) => {
  const preloadImage = (imagePath) => {
    if (typeof window === 'undefined' || !imagePath) return;
    const normalizedPath = normalizeImagePath(imagePath);
    if (!normalizedPath) return;
    const img = new window.Image();
    img.decoding = 'async';
    img.src = normalizedPath;
  };

  // Helper function to check if a color is sold out (considering cart inventory)
  const isColorSoldOut = (color) => {
    if (!caseType || !color) {
      // Fallback to checking quantity property if caseType not provided
      const colorData = colors.find(c => c.color === color);
      return colorData?.quantity !== undefined && colorData.quantity === 0;
    }
    
    // Check available inventory considering cart (items in basket)
    const productForInventory = {
      caseType: caseType,
      color: color,
    };
    const maxAvailable = getMaxAvailableQuantity(productForInventory, cart);
    
    // If maxAvailable === 0, no more can be added (all in basket or sold out) - SOLD OUT
    // If maxAvailable is null (unlimited) or > 0, color is available
    return maxAvailable !== null && maxAvailable === 0;
  };

  return (
    <div className="relative overflow-visible rounded-xl" aria-busy={isLoading}>
      {isLoading && (
        <>
          <div className="absolute inset-0 z-10 rounded-xl bg-gray-50/50 pointer-events-none" aria-hidden="true" />
          <div className="absolute inset-0 z-10 rounded-xl bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse pointer-events-none" aria-hidden="true" />
        </>
      )}
      <div
        className="relative grid w-full gap-x-2 gap-y-2.5 sm:gap-x-2.5 sm:gap-y-3 justify-items-center [grid-template-columns:repeat(auto-fill,minmax(min(100%,3.75rem),1fr))] sm:[grid-template-columns:repeat(auto-fill,minmax(min(100%,4.25rem),1fr))]"
        role="radiogroup"
        aria-label="Case colors"
      >
        {colors.map(({ color, image }) => {
          const colorName = getColorNameFromImage(image);
          const isSelected = selectedColor === color;
          const isSoldOut = isColorSoldOut(color);

          return (
            <button
              key={color}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={isSoldOut ? `${colorName} — sold out` : colorName}
              disabled={isLoading || isSoldOut}
              className={`flex w-full max-w-[5rem] flex-col items-center justify-start text-center px-0.5 py-1 transition-colors touch-manipulation ${
                isLoading ? 'cursor-wait' : isSoldOut ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
              onClick={() => !isLoading && !isSoldOut && onSelect(color, image)}
              onMouseEnter={() => preloadImage(image)}
              onTouchStart={() => preloadImage(image)}
            >
              <div
                className={`h-9 w-9 sm:h-10 sm:w-10 shrink-0 rounded-full border-2 box-border transition-colors duration-200 ${
                  isSelected
                    ? 'border-gray-900 ring-2 ring-inset ring-gray-300'
                    : 'border-gray-200 hover:border-gray-400'
                } ${isSoldOut ? 'opacity-50' : ''}`}
                style={{ backgroundColor: color }}
              />
              {colorName && (
                <span
                  className={`${OPTION_CASE_COLOR_LABEL} mt-1 w-full px-0.5 transition-colors ${getItemLabelColor(isSelected)}`}
                  style={OPTION_FONT_STYLE}
                >
                  {colorName}
                </span>
              )}
              {isSoldOut && (
                <span className={OPTION_CASE_SOLD_OUT} style={OPTION_FONT_STYLE}>Sold Out</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ColorSelector;
