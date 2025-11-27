import React from 'react';

const InvalidPositionAlert = ({ show }) => {
  if (!show) return null;

  return (
    <div className="-mt-20 sm:-mt-4 w-full max-w-[450px] mx-auto z-50">
      <div 
        className="px-4 py-3 rounded-md shadow-lg border-2 bg-red-500"
      >
        <p className="text-sm font-semibold text-center text-white font-inter">
          Position is invalid, out of the edge limit
        </p>
      </div>
    </div>
  );
};

export default InvalidPositionAlert;

