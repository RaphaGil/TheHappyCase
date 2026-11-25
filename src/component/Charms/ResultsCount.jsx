import React from 'react';

const ResultsCount = ({ count, currentPage, totalPages }) => (
  <p className="whitespace-nowrap text-sm text-gray-500 font-inter">
    <span className="font-semibold text-gray-900">{count}</span> {count === 1 ? 'charm' : 'charms'}
    {totalPages > 1 && <span className="ml-1.5">· page {currentPage} of {totalPages}</span>}
  </p>
);

export default ResultsCount;
