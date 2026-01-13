import React from 'react';

const CharmTypeTabs = ({ charmTypes, selectedType, onTypeChange }) => {
  // Map full labels to short labels for mobile
  const getShortLabel = (value) => {
    const shortLabels = {
      'colorful': 'colorful',
      'bronze': 'bronze',
      'flags': 'flags'
    };
    return shortLabels[value] || value;
  };

  return (
    <div className="flex justify-center mb-6  px-6 md:mx-0 md:px-0">
      <div className="flex gap-2 border-b border-gray-200 flex-nowrap justify-center">
        {charmTypes.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onTypeChange(value)}
            className={`px-6 py-3 text-xs uppercase tracking-wider transition-all duration-200 font-inter ${
              selectedType === value
                ? 'border-b-2 border-blue-700 text-white bg-blue-600 font-medium'
                : 'border-b-2 border-transparent text-white hover:text-white hover:border-blue-300 hover:bg-blue-500 bg-blue-400'
            }`}
          >
            <span className="md:hidden">{getShortLabel(value)}</span>
            <span className="hidden md:inline">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CharmTypeTabs;

