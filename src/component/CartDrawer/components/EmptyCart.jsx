'use client';

import React from 'react';
import Link from 'next/link';

const EmptyCart = ({ onClose }) => (
  <div className="flex h-full flex-col items-center justify-center px-6 py-12 text-center">
    <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[#fff6b8] text-[#30279f]">
      <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 8h12l-1 12H7L6 8z" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      </svg>
    </span>
    <p className="mt-5 text-h3 text-[#30279f] font-brand">Your basket is empty</p>
    <p className="mt-2 max-w-xs text-sm text-gray-600 font-inter">
      Design a passport case that&apos;s all yours, or pick some charms to get started.
    </p>
    <div className="mt-6 flex w-full max-w-xs flex-col gap-3">
      <Link href="/custom-passport" onClick={onClose} className="btn-happy w-full font-inter">Design yours</Link>
      <Link href="/charms" onClick={onClose} className="btn-happy btn-soft w-full font-inter">Browse charms</Link>
    </div>
  </div>
);

export default EmptyCart;
