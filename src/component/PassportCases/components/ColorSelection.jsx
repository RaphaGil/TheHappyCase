import React from 'react';

const ColorSelection = ({ 
  colors, 
  selectedColor, 
  onColorChange, 
  isColorSoldOut,
  getColorName 
}) => {
  return (
    <div>
      <h3 className="mb-4 text-sm text-gray-600 font-inter">
        Colour:{' '}
        <span className="font-semibold text-gray-900">
          {getColorName(colors.find((c) => c.color === selectedColor)?.image) || ''}
        </span>
      </h3>
      <div className="grid grid-cols-6 sm:grid-cols-7 md:grid-cols-6 lg:grid-cols-8 gap-x-2 gap-y-3">
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
                aria-label={colorSoldOut ? `${colorName || 'Colour'} (sold out)` : colorName || `Colour ${index + 1}`}
                aria-pressed={selectedColor === colorOption.color}
                className={`w-10 h-10 rounded-full border-2 border-white transition-all duration-200 relative shadow-sm ${
 selectedColor === colorOption.color
 ? 'ring-2 ring-[#30279f] ring-offset-1'
 : 'ring-1 ring-gray-200 hover:ring-[#30279f]/50'
 } ${colorSoldOut ? 'cursor-not-allowed opacity-40' : ''}`}
                style={{ backgroundColor: colorOption.color }}
                title={colorSoldOut ? 'Sold Out' : colorName || `Color ${index + 1}`}
              />
              {colorSoldOut ? (
                <span className="text-xs mt-1 text-red-600 font-medium text-center font-inter">Sold out</span>
              ) : (
                colorName && (
                  <span className="text-xs text-gray-600 text-center mt-1 font-inter leading-tight">
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
