import React from "react";
import { getMaxAvailableQuantity } from '../../utils/inventory';
import { normalizeImagePath } from '../../utils/imagePath';
import { useInventoryReady } from '../../hooks/useInventoryReady';
import {
  OPTION_CASE_COLOR_LABEL,
  OPTION_CASE_SOLD_OUT,
  OPTION_FONT_STYLE,
  getItemLabelColor,
} from '../CreateYours/designOptionStyles';
import { getColorNameFromImage } from '../../utils/colorNames';

const ColorSelector = ({ colors, selectedColor, onSelect, caseType, cart = [], isLoading = false }) => {
  const inventoryReady = useInventoryReady();

  const preloadImage = (imagePath) => {
    if (typeof window === 'undefined' || !imagePath) return;
    const normalizedPath = normalizeImagePath(imagePath);
    if (!normalizedPath) return;
    const img = new window.Image();
    img.decoding = 'async';
    img.src = normalizedPath;
  };

  // Helper function to check if a color is sold out (considering cart inventory)
  const getColorInventoryInfo = (color) => {
    if (!caseType || !color) {
      const colorData = colors.find(c => c.color === color);
      const qty = colorData?.quantity;
      return {
        isSoldOut: qty !== undefined && qty !== null && qty === 0,
        remainingAvailable: qty ?? null,
        isLowStock: qty != null && qty > 0 && qty < 3,
      };
    }

    const productForInventory = { caseType, color };
    const maxAvailable = getMaxAvailableQuantity(productForInventory, cart);

    if (maxAvailable === null) {
      return { isSoldOut: false, remainingAvailable: null, isLowStock: false };
    }

    return {
      isSoldOut: maxAvailable === 0,
      remainingAvailable: maxAvailable,
      isLowStock: maxAvailable > 0 && maxAvailable < 3,
    };
  };

  // inventoryReady in render deps ensures sold-out state updates once stock loads
  void inventoryReady;

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
          const { isSoldOut, remainingAvailable, isLowStock } = getColorInventoryInfo(color);

          return (
            <button
              key={color}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={
                isSoldOut
                  ? `${colorName} — sold out`
                  : isLowStock && remainingAvailable != null
                    ? `${colorName} — only ${remainingAvailable} left`
                    : colorName
              }
              disabled={isLoading || isSoldOut}
              className={`flex w-full max-w-[5rem] flex-col items-center justify-start text-center px-0.5 py-1 transition-colors touch-manipulation ${
                isLoading ? 'cursor-wait' : isSoldOut ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
              onClick={() => !isLoading && !isSoldOut && onSelect(color, image)}
              onMouseEnter={() => preloadImage(image)}
              onTouchStart={() => preloadImage(image)}
            >
              <div className="relative">
                <div
                  className={`h-9 w-9 sm:h-10 sm:w-10 shrink-0 rounded-full border-2 box-border transition-colors duration-200 ${
                    isSelected
                      ? 'border-gray-900 ring-2 ring-inset ring-gray-300'
                      : 'border-gray-200 hover:border-gray-400'
                  } ${isSoldOut ? 'opacity-50' : ''}`}
                  style={{ backgroundColor: color }}
                />
                {isLowStock && !isSoldOut && remainingAvailable != null && (
                  <span className="absolute -top-1 -right-2 whitespace-nowrap rounded bg-amber-500 px-1 py-0.5 text-[8px] font-medium text-white">
                    {remainingAvailable === 1 ? '1 left' : `${remainingAvailable} left`}
                  </span>
                )}
              </div>
              <div className="mt-1 flex min-h-[2.25rem] w-full flex-col items-center justify-start">
                {colorName && (
                  <span
                    className={`${OPTION_CASE_COLOR_LABEL} w-full px-0.5 transition-colors ${getItemLabelColor(isSelected)}`}
                    style={OPTION_FONT_STYLE}
                  >
                    {colorName}
                  </span>
                )}
                <span
                  className={`${OPTION_CASE_SOLD_OUT} ${isSoldOut ? '' : 'invisible'}`}
                  style={OPTION_FONT_STYLE}
                  aria-hidden={!isSoldOut}
                >
                  Sold Out
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ColorSelector;
