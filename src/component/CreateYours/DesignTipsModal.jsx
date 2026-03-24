'use client';

import React from 'react';

const DesignTipsModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md border border-gray-200 bg-white shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <h3 className="text-sm font-medium uppercase tracking-wider text-gray-900 font-inter">
            Quick Tip
          </h3>
          <button
            onClick={onClose}
            className="rounded-sm p-1 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-700"
            aria-label="Close tips modal"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-3 p-4">
          <p className="text-sm leading-relaxed text-gray-700 font-inter">
            You can move charms and text anywhere on the case.
          </p>
          <p className="text-sm leading-relaxed text-gray-700 font-inter">
            We will create your design exactly as you position it.
          </p>
        </div>

        <div className="border-t border-gray-200 p-4">
          <button
            onClick={onClose}
            className="w-full border border-btn-primary-blue-border bg-btn-primary-blue py-2 text-xs font-light uppercase tracking-wider text-btn-primary-blue-text transition-all duration-200 hover:border-btn-primary-blue-hover hover:bg-btn-primary-blue-hover font-inter"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};

export default DesignTipsModal;

