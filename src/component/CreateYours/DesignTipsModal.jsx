'use client';

import React, { useEffect, useRef } from 'react';

const TIPS = [
  {
    text: 'You can move charms and text anywhere on the case.',
    icon: (
      <>
        <path d="M12 3v18M3 12h18" />
        <path d="M9 6l3-3 3 3M9 18l3 3 3-3M6 9l-3 3 3 3M18 9l3 3-3 3" />
      </>
    ),
  },
  {
    text: 'We will create your design exactly as you position it.',
    icon: (
      <>
        <path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
  },
];

/** One-time tip shown the first time a charm or text is added in the designer. */
const DesignTipsModal = ({ show, onClose }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!show) return undefined;
    buttonRef.current?.focus();
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#140f4a]/40 p-4 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="design-tip-title"
        className="relative w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-2xl sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-[#eef0ff] hover:text-[#30279f]"
          aria-label="Close tip"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#ffd93d] text-[#30279f]">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 18h6M10 21h4" />
            <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1.1 1 1.9V16h5v-.2c0-.8.4-1.5 1-1.9A6 6 0 0 0 12 3z" />
          </svg>
        </span>

        <h3 id="design-tip-title" className="mt-4 text-h3 text-[#30279f]">Quick tip</h3>

        <ul className="mt-5 space-y-3 text-left">
          {TIPS.map((tip) => (
            <li key={tip.text} className="flex items-start gap-3 rounded-2xl bg-[#eef0ff] p-3.5">
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white text-[#30279f]">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {tip.icon}
                </svg>
              </span>
              <p className="pt-1.5 text-sm leading-snug text-gray-800 font-inter">{tip.text}</p>
            </li>
          ))}
        </ul>

        <button ref={buttonRef} onClick={onClose} className="btn-happy mt-6 w-full font-inter">
          Got it
        </button>
      </div>
    </div>
  );
};

export default DesignTipsModal;
