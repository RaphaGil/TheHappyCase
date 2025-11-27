import React from "react";

// Helper function to extract color name from image filename
const getColorName = (image) => {
  if (!image) return '';
  
  // Extract filename from path
  const filename = image.split('/').pop().replace('.png', '').replace('.jpg', '').toLowerCase();
  
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

const ColorSelector = ({ colors, selectedColor, onSelect }) => {
  const selectedColorData = colors.find(c => c.color === selectedColor);
  const selectedColorName = selectedColorData ? getColorName(selectedColorData.image) : '';

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {colors.map(({ color, image, quantity }) => {
          const colorName = getColorName(image);
          const isSelected = selectedColor === color;
          const isSoldOut = quantity !== undefined && quantity === 0;
          
          return (
            <div
              key={color}
              className={`transition-all duration-200 flex flex-col items-center ${isSoldOut ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={() => !isSoldOut && onSelect(color, image)}
            >
              <div className="relative">
                <div
                  className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                    isSelected
                      ? "border-gray-900 ring-2 ring-gray-300 scale-110"
                      : "border-gray-200 hover:border-gray-400"
                  } ${isSoldOut ? 'opacity-50' : ''}`}
                  style={{ backgroundColor: color }}
                />
                {isSelected && !isSoldOut && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gray-900 rounded-full flex items-center justify-center">
                    <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              {isSelected && colorName && (
                <span className="text-xs text-gray-700 font-medium mt-2 text-center font-inter">
                  {colorName}
                </span>
              )}
              {isSoldOut && (
                <span className="text-[10px] text-red-600 font-medium mt-1">Sold Out</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ColorSelector;
