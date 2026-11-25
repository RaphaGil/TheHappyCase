import React from 'react';

const SubCategoryTabs = ({ categories, selectedCategory, onCategoryChange }) => {
  if (!categories || categories.length === 0) return null;

  return (
    <div className="flex justify-center mb-6">
      <div className="flex gap-2 flex-wrap justify-center">
        {categories.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onCategoryChange(key)}
            aria-pressed={selectedCategory === key}
            className={`rounded-full px-4 py-1.5 text-sm transition-all duration-200 font-inter ${
              selectedCategory === key
                ? 'bg-[#ffd93d] text-[#30279f] font-semibold'
                : 'bg-white text-gray-600 ring-1 ring-inset ring-[#30279f]/15 hover:text-[#30279f] hover:ring-[#30279f]/40'
            }`}
          >
            {label === label.toUpperCase() ? label.charAt(0) + label.slice(1).toLowerCase() : label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SubCategoryTabs;

