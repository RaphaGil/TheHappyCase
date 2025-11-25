import React from 'react';

const EmptyState = ({ message = "No items found", onClearFilters }) => {
  return (
    <div className="py-16 text-center">
      <p className="text-gray-400 mb-4" 
         style={{fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"}}>
        {message}
      </p>
      {onClearFilters && (
        <button
          onClick={onClearFilters}
          className="text-xs uppercase tracking-wider text-gray-500 hover:text-gray-900 border-b border-transparent hover:border-gray-300 transition-all duration-200"
          style={{fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"}}
        >
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default EmptyState;

