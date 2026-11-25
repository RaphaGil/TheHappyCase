import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm, placeholder = "Search charms..." }) => {
  return (
    <div className="relative flex-1 max-w-md w-full">
      <label htmlFor="charm-search" className="sr-only">{placeholder}</label>
      <input
        id="charm-search"
        type="search"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full rounded-full border border-[#30279f]/15 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 placeholder-gray-400 shadow-sm transition focus:border-[#30279f] focus:outline-none focus:ring-4 focus:ring-[#30279f]/10 font-inter"
      />
      <svg className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#30279f]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
  );
};

export default SearchBar;
