'use client';

import { useEffect, useMemo, useState } from 'react';

function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function ScrollToTopButton({
  showAfterPx = 320,
  bottomOffsetClassName = 'bottom-6',
  rightOffsetClassName = 'right-6',
  zIndexClassName = 'z-50',
}) {
  const [isVisible, setIsVisible] = useState(false);
  const reduceMotion = useMemo(() => prefersReducedMotion(), []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset || 0;
      setIsVisible(y > showAfterPx);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [showAfterPx]);

  const onClick = () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Scroll to top"
      className={[
        'fixed',
        bottomOffsetClassName,
        rightOffsetClassName,
        zIndexClassName,
        'h-11 w-11',
        'rounded-full',
        'bg-white/90 backdrop-blur',
        'border border-gray-200',
        'shadow-lg shadow-black/10',
        'text-gray-900',
        'transition-all duration-200',
        'hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/15',
        'active:translate-y-0',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
        isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
      ].join(' ')}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="mx-auto"
      >
        <path
          d="M12 5l-7 7m7-7l7 7M12 5v14"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

