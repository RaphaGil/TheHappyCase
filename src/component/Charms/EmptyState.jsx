import React from 'react';

const EmptyState = ({ message = "No items found", onClearFilters }) => (
  <div className="mx-auto my-12 max-w-md rounded-3xl bg-[#eef0ff] px-6 py-14 text-center">
    <p className="font-brand text-2xl text-[#30279f]">{message}</p>
    <p className="mt-2 text-sm text-gray-600 font-inter">Try a different word or another category.</p>
    {onClearFilters && (
      <button type="button" onClick={onClearFilters} className="btn-happy btn-soft mt-6 px-6 py-2.5 text-sm font-inter">
        Clear filters
      </button>
    )}
  </div>
);

export default EmptyState;
