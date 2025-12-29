import React from 'react';

const EmptyState = ({ message = "No items found", onClearFilters }) => {
  return (
    <div className="py-12 sm:py-16 text-center">
      <p className="text-base text-gray-400 mb-4 font-inter">
        {message}
      </p>
      {onClearFilters && (
        <button
          onClick={onClearFilters}
          className="text-sm uppercase tracking-wider text-gray-500 hover:text-gray-900 border-b border-transparent hover:border-gray-300 transition-all duration-200 font-inter"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default EmptyState;

