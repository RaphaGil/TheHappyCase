import React from 'react';

const CharmTypeTabs = ({ charmTypes, selectedType, onTypeChange }) => {
  return (
    <div className="flex justify-center mb-6 overflow-x-auto -mx-4 px-6 md:mx-0 md:px-0">
      <div className="flex gap-2 border-b border-gray-200 flex-nowrap justify-center">
        {charmTypes.map((type) => (
          <button
            key={type.key}
            onClick={() => onTypeChange(type.key)}
            className={`px-3 sm:px-6 py-2.5 text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
              selectedType === type.key
                ? 'border-b-2 border-blue-700 text-white bg-blue-600'
                : 'border-b-2 border-transparent text-white hover:text-white hover:border-blue-300 hover:bg-blue-500 bg-blue-400'
            } font-inter`}
          >
            {type.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CharmTypeTabs;

