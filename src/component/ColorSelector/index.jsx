import React from "react";
import { getMaxAvailableQuantity } from '../../utils/inventory';
import { normalizeImagePath } from '../../utils/imagePath';
import {
  OPTION_FONT_STYLE,
  OPTION_ITEM_LABEL,
  OPTION_SOLD_OUT,
  getItemLabelColor,
} from '../CreateYours/designOptionStyles';

// Helper function to extract color name from image filename
const getColorName = (image) => {
  if (!image) return '';
  
  // Extract filename from path
  const filename = image.split('/').pop().replace('.webp', '').replace('.png', '').replace('.jpg', '').toLowerCase();
  
  // Remove case type prefixes (economycase, businessclasscase, firstclasscase, etc.)
  let colorPart = filename
    .replace(/^economycase/i, '')
    .replace(/^businessclasscase/i, '')
    .replace(/^firstclasscase/i, '')
    .replace(/^smartcase/i, '')
    .replace(/^premiumcase/i, '')
    .replace(/^firstclass/i, '');
  
  // Handle common color name patterns
  const colorMap = {
    'lightpink': 'Light Pink',
    'lightblue': 'Light Blue',
    'lightbrown': 'Light Brown',
    'darkbrown': 'Dark Brown',
    'darkblue': 'Dark Blue',
    'jeansblue': 'Jeans Blue',
    'brickred': 'Brick Red',
    'ligthpink': 'Light Pink', // Handle typo
    'navyblue': 'Navy Blue',
    'gray': 'Gray',
    'grey': 'Gray',
    'black': 'Black',
    'brown': 'Brown',
    'red': 'Red',
    'pink': 'Pink',
    'blue': 'Blue',
    'green': 'Green',
    'purple': 'Purple',
    'yellow': 'Yellow',
    'orange': 'Orange'
  };
  
  // Check if exact match exists
  if (colorMap[colorPart]) {
    return colorMap[colorPart];
  }
  
  // Try to split camelCase or find common patterns
  // Split on common word boundaries
  colorPart = colorPart
    .replace(/([a-z])([A-Z])/g, '$1 $2') // camelCase
    .replace(/(dark|light|navy|jeans|brick)([a-z]+)/g, '$1 $2') // prefixes
    .split(/(?=[A-Z])|(?=dark|light|navy|jeans|brick)/) // split on capitals or prefixes
    .filter(word => word.length > 0)
    .join(' ')
    .toLowerCase()
    .split(' ')
    .map(word => {
      // Check if word is in color map
      if (colorMap[word]) return colorMap[word];
      // Capitalize first letter
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
  
  return colorPart || 'Color';
};

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
      <div className="relative grid grid-cols-6 sm:grid-cols-7 md:grid-cols-8 gap-0 justify-items-center">
        {colors.map(({ color, image }) => {
          const colorName = getColorName(image);
          const isSelected = selectedColor === color;
          const isSoldOut = isColorSoldOut(color);

          return (
            <button
              key={color}
              type="button"
              disabled={isLoading || isSoldOut}
              className={`flex flex-col items-center justify-center text-center p-0 w-full min-h-[2.75rem] sm:min-h-[3rem] transition-colors touch-manipulation ${
                isLoading ? 'cursor-wait' : isSoldOut ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
              onClick={() => !isLoading && !isSoldOut && onSelect(color, image)}
              onMouseEnter={() => preloadImage(image)}
              onTouchStart={() => preloadImage(image)}
            >
              <div
                className={`h-8 w-8 sm:h-9 sm:w-9 shrink-0 rounded-full border-2 box-border transition-colors duration-200 ${
                  isSelected
                    ? 'border-gray-900 ring-2 ring-inset ring-gray-300'
                    : 'border-gray-200 hover:border-gray-400'
                } ${isSoldOut ? 'opacity-50' : ''}`}
                style={{ backgroundColor: color }}
              />
              {colorName && (
                <span
                  className={`${OPTION_ITEM_LABEL} mt-px transition-colors ${getItemLabelColor(isSelected)}`}
                  style={OPTION_FONT_STYLE}
                >
                  {colorName}
                </span>
              )}
              {isSoldOut && (
                <span className={OPTION_SOLD_OUT} style={OPTION_FONT_STYLE}>Sold Out</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ColorSelector;
