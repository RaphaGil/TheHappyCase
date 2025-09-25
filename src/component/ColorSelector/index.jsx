import React from "react";

const ColorSelector = ({ colors, selectedColor, onSelect }) => {
  return (
    <div>
      <p className="font-bold text-xl mb-4 lazy-dog-title" style={{fontFamily: "'Fredoka One', cursive"}}>2) Choose Your Colour</p>
      <div className="flex flex-wrap gap-3">
        {colors.map(({ color, image }) => (
          <div
            key={color}
            className="cursor-pointer hover:shadow-2xl hover:shadow-black transition-all duration-300 transform hover:scale-110"
            onClick={() => onSelect(color, image)}
          >
            <div className="relative">
              <div
                className={`w-12 h-12 rounded-full border-4 ${
                  selectedColor === color
                    ? "border-blue-500 shadow-lg"
                    : "border-gray-300 hover:border-blue-400"
                }`}
                style={{ backgroundColor: color }}
              />
              {selectedColor === color && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
