import React from 'react';

const SubCategoryTabs = ({ categories, selectedCategory, onCategoryChange }) => {
  if (!categories || categories.length === 0) return null;

  return (
    <div className="flex justify-center mb-6">
      <div className="flex gap-0.5 flex-wrap justify-center">
        {categories.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onCategoryChange(key)}
            className={`px-3 py-2 text-xs uppercase tracking-wider transition-all duration-200 ${
              selectedCategory === key
                ? 'border-b-2 border-blue-600 text-blue-700 font-semibold bg-blue-50/50'
                : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50/30'
            } font-inter`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SubCategoryTabs;


