import React from 'react';

const SubCategoryTabs = ({ categories, selectedCategory, onCategoryChange }) => {
  if (!categories || categories.length === 0) return null;

  return (
    <div className="flex justify-center mb-6">
      <div className="flex gap-1 border-b border-gray-200 flex-wrap justify-center">
        {categories.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onCategoryChange(key)}
            className={`px-4 py-2 text-[10px] uppercase tracking-wider transition-all duration-200 font-inter ${
              selectedCategory === key
                ? 'border-b-2 border-blue-700 text-gray-900 font-medium'
                : 'border-b-2 border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SubCategoryTabs;

