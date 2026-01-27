import React from 'react';

const ColorSelection = ({ 
  colors, 
  selectedColor, 
  onColorChange, 
  isColorSoldOut,
  getColorName 
}) => {
  return (
    <div className="pb-2 sm:pb-3 mt-3">
      <h3 className="text-sm uppercase tracking-wider text-gray-900 mt-6 mb-6 font-medium font-inter">Colours Available</h3>
      <div className="grid grid-cols-6 sm:grid-cols-7 md:grid-cols-8 gap-2 sm:gap-1.5 md:gap-2">
        {colors.map((colorOption, index) => {
          const colorSoldOut = isColorSoldOut(colorOption.color);
          const colorName = getColorName(colorOption.image);
          return (
            <div key={index} className="flex flex-col items-center sm:gap-1">
              <button
                onClick={() => {
                  if (!colorSoldOut) {
                    onColorChange(colorOption.color);
                  }
                }}
                disabled={colorSoldOut}
                className={`w-9 h-9 sm:w-8 sm:h-8 rounded-full border-2 transition-all duration-200 relative ${
                  selectedColor === colorOption.color
                    ? 'border-gray-900 ring-2 ring-gray-300 scale-110'
                    : 'border-gray-200 hover:border-gray-400'
                } ${colorSoldOut ? 'opacity-50 cursor-not-allowed' : ''}`}
                style={{ backgroundColor: colorOption.color }}
                title={colorSoldOut ? 'Sold Out' : colorName || `Color ${index + 1}`}
              />
              {colorSoldOut ? (
                <span className="text-[9px] mt-1 text-red-600 font-medium text-center">Sold Out</span>
              ) : (
                colorName && (
                  <span className="text-[10px] sm:text-[9px] text-gray-700 font-medium text-center mt-1 font-inter leading-tight">
                    {colorName}
                  </span>
                )
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ColorSelection;
