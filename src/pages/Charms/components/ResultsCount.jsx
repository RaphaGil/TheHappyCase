import React from 'react';

const ResultsCount = ({ count, currentPage, totalPages }) => {
  return (
    <div className="flex items-center text-sm text-gray-500 font-inter whitespace-nowrap">
      <p>
        {count} {count === 1 ? 'item' : 'items'}
        {totalPages > 1 && (
          <span className="ml-2">
            (Page {currentPage} of {totalPages})
          </span>
        )}
      </p>
    </div>
  );
};

export default ResultsCount;

