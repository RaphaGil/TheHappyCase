import React from 'react';

const SimplePagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-1 mb-12">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 text-xs transition-all duration-200 font-inter ${
            currentPage === page
              ? 'border-b-2 border-gray-900 text-gray-900 font-medium'
              : 'border-b-2 border-transparent text-gray-400 hover:text-gray-700 hover:border-gray-300'
          }`}
          aria-label={`Go to page ${page}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default SimplePagination;






