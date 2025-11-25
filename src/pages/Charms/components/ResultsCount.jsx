import React from 'react';

const ResultsCount = ({ count, currentPage, totalPages }) => {
  return (
    <div className="mb-8 flex items-center justify-between text-sm text-gray-500">
      <p style={{fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"}}>
        {count} {count === 1 ? 'item' : 'items'}
      </p>
      {totalPages > 1 && (
        <p style={{fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"}}>
          {currentPage} / {totalPages}
        </p>
      )}
    </div>
  );
};

export default ResultsCount;

