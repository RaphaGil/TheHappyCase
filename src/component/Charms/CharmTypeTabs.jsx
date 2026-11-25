import React from 'react';

const CharmTypeTabs = ({ charmTypes, selectedType, onTypeChange }) => {
  // Map full labels to short labels for mobile
  const getShortLabel = (value) => {
    const shortLabels = {
      'colorful': 'Colourful',
      'bronze': 'Bronze',
      'flags': 'Flags'
    };
    return shortLabels[value] || value;
  };

  return (
    <div className="flex justify-center mb-6 px-6 md:mx-0 md:px-0">
      <div className="flex gap-2 flex-nowrap justify-center">
        {charmTypes.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onTypeChange(value)}
            className={`px-5 py-2.5 text-sm transition-all duration-200 font-inter ${
 selectedType === value
 ? 'rounded-full bg-[#30279f] text-white font-semibold shadow-md'
 : 'rounded-full bg-[#eef0ff] text-[#30279f] font-medium hover:bg-[#ffd93d]'
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

