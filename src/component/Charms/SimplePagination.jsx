import React from 'react';

const SimplePagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const go = (page) => {
    onPageChange(page);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="mb-4 flex items-center justify-center gap-2" aria-label="Pagination">
      <button
        type="button"
        onClick={() => go(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-10 w-10 items-center justify-center rounded-full text-[#30279f] transition hover:bg-[#eef0ff] disabled:opacity-30 disabled:hover:bg-transparent"
        aria-label="Previous page"
      >
        ←
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          type="button"
          key={page}
          onClick={() => go(page)}
          aria-current={currentPage === page ? 'page' : undefined}
          className={`flex h-10 w-10 items-center justify-center rounded-full text-sm transition font-inter ${
            currentPage === page
              ? 'bg-[#30279f] font-semibold text-white shadow-md'
              : 'text-gray-700 hover:bg-[#eef0ff] hover:text-[#30279f]'
          }`}
          aria-label={`Go to page ${page}`}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        onClick={() => go(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-10 w-10 items-center justify-center rounded-full text-[#30279f] transition hover:bg-[#eef0ff] disabled:opacity-30 disabled:hover:bg-transparent"
        aria-label="Next page"
      >
        →
      </button>
    </nav>
  );
};

export default SimplePagination;
