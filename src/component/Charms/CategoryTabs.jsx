import React from 'react';

const CategoryTabs = ({ categories, selectedCategory, onCategoryChange, inline = false }) => {
  const containerClass = inline 
    ? "flex flex-wrap gap-2" 
    : "flex justify-center mb-12 w-full overflow-x-auto";
  
  const tabsClass = inline
    ? "flex gap-1 border-b border-gray-200 flex-wrap"
    : "flex gap-1 border-b border-gray-200 flex-wrap justify-center min-w-max";

  const buttonClass = inline
    ? "px-4 py-2 text-xs uppercase tracking-wider transition-all duration-200"
    : "px-6 py-3 text-xs uppercase tracking-wider transition-all duration-200 whitespace-nowrap";

  return (
    <div className={containerClass}>
      <div className={tabsClass}>
        {categories && categories.length > 0 ? (
          categories.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => onCategoryChange(key)}
              className={`${buttonClass} font-inter ${
                selectedCategory === key
                  ? 'border-b-2 border-gray-900 text-gray-900 font-medium'
                  : 'border-b-2 border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              {label}
            </button>
          ))
        ) : null}
      </div>
    </div>
  );
};

export default CategoryTabs;

