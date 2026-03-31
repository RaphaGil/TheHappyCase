import React from "react";
import { getMaxAvailableQuantity } from '../../utils/inventory';
import { normalizeImagePath } from '../../utils/imagePath';

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

const ColorSelector = ({ colors, selectedColor, onSelect, caseType, cart = [] }) => {
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
    <div className="overflow-visible">
      <div className="flex flex-wrap gap-2 sm:gap-3 overflow-visible justify-center">
        {colors.map(({ color, image, quantity }) => {
          const colorName = getColorName(image);
          const isSelected = selectedColor === color;
          // Check if sold out considering cart inventory
          const isSoldOut = isColorSoldOut(color);
          
          return (
            <div
              key={color}
              className={`transition-all duration-200 flex flex-col items-center overflow-visible ${isSoldOut ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={() => !isSoldOut && onSelect(color, image)}
              onMouseEnter={() => preloadImage(image)}
              onTouchStart={() => preloadImage(image)}
            >
              <div className="relative overflow-visible">
                <div
                  className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                    isSelected
                      ? "border-gray-900 ring-2 ring-gray-300 scale-110"
                      : "border-gray-200 hover:border-gray-400"
                  } ${isSoldOut ? 'opacity-50' : ''}`}
                  style={{ backgroundColor: color }}
                />
              </div>
              {colorName && (
                <span className={`text-xs font-medium mt-2 text-center font-inter ${
                  isSelected ? 'text-gray-900' : 'text-gray-700'
                } ${isSoldOut ? 'text-white ' : ''}`}>
                  {colorName}
                </span>
              )}
              {isSoldOut && (
                <span className="text-[10px] -mt-4 text-red-600 font-medium ">Sold Out</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ColorSelector;
