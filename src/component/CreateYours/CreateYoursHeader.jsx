'use client';

import React from 'react';
import Link from 'next/link';

/**
 * Designer page title, styled like the shared PageHeader (yellow band, breadcrumb,
 * brand title) but kept compact so the designer still fits on one screen.
 */
const CreateYoursHeader = ({ isMobile = false, onClose }) => {
  return (
    <div className="section-lemon relative flex-shrink-0 border-b border-[#30279f]/10">
      <div className="mx-auto max-w-7xl px-4 py-4 md:px-8 md:py-5">
        <nav aria-label="Breadcrumb" className="mb-1.5 hidden md:block">
          <ol className="flex items-center gap-1.5 text-xs text-[#30279f]/70 font-inter">
            <li>
              <Link href="/" className="hover:text-[#30279f] hover:underline">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-semibold text-[#30279f]">Create yours</li>
          </ol>
        </nav>

        <h1 className="text-h2 pr-12 text-[#30279f] md:pr-0">Create yours</h1>
        <p className="mt-1 hidden text-sm text-gray-600 font-inter md:block">
          Design your perfect passport case: pick a case, add charms and finish it with a name.
        </p>
      </div>

      {isMobile && onClose && (
        <button
          onClick={onClose}
          className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-[#30279f] transition-colors hover:bg-[#30279f]/10"
          aria-label="Close"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default CreateYoursHeader;
