import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange, onPrevious, onNext }) => {
  if (totalPages <= 1) return null;

  return (
    <>
      {/* Previous/Next Buttons */}
      <div className="relative mb-12">
        {currentPage > 1 && (
          <button
            onClick={onPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 md:-translate-x-12 z-10 bg-transparent rounded-full p-2 md:p-3 border border-gray-200 hover:border-gray-400 transition-all duration-200"
            aria-label="Previous page"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {currentPage < totalPages && (
          <button
            onClick={onNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 md:translate-x-12 z-10 bg-transparent rounded-full p-2 md:p-3 border border-gray-200 hover:border-gray-400 transition-all duration-200"
            aria-label="Next page"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* Pagination Numbers */}
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
    </>
  );
};

export default Pagination;

