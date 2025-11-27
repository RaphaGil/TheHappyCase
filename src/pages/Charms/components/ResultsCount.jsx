import React from 'react';

const ResultsCount = ({ count, currentPage, totalPages }) => {
  return (
    <div className="mb-8 flex items-center justify-between text-sm text-gray-500 font-inter">
      <p>
        {count} {count === 1 ? 'item' : 'items'}
      </p>
      {totalPages > 1 && (
        <p className="font-inter">
          {currentPage} / {totalPages}
        </p>
      )}
    </div>
  );
};

export default ResultsCount;

