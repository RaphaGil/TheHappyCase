'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import SocialMediaIcons from './SocialMediaIcons';
import CurrencySelector from './CurrencySelector';

const ETSY_SHOP_URL = 'https://www.etsy.com/shop/TheHappyCaseShop';

const BANNER_MESSAGES = [
  { id: 'uk', icon: '🌍', label: 'Ship within the UK' },
  {
    id: 'etsy',
    icon: '✈️',
    label: 'Worldwide shipping on our',
    link: { href: ETSY_SHOP_URL, text: 'Etsy shop' },
  },
  { id: 'secure', icon: '🔒', label: 'Secure checkout' },
  { id: 'love', icon: '❤️', label: 'Made with love' },
];

const ROTATE_MS = 5000;
const FADE_MS = 280;

const PromotionalBanner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const activeIndexRef = useRef(activeIndex);
  const fadeTimeoutRef = useRef(null);
  activeIndexRef.current = activeIndex;

  const showMessage = useCallback((nextIndex) => {
    const normalizedIndex =
      ((nextIndex % BANNER_MESSAGES.length) + BANNER_MESSAGES.length) % BANNER_MESSAGES.length;

    if (normalizedIndex === activeIndexRef.current) return;

    setIsVisible(false);
    if (fadeTimeoutRef.current) {
      clearTimeout(fadeTimeoutRef.current);
    }

    fadeTimeoutRef.current = setTimeout(() => {
      setActiveIndex(normalizedIndex);
      setIsVisible(true);
    }, FADE_MS);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener('change', updateMotionPreference);

    return () => {
      mediaQuery.removeEventListener('change', updateMotionPreference);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return undefined;

    const interval = setInterval(() => {
      showMessage(activeIndexRef.current + 1);
    }, ROTATE_MS);

    return () => clearInterval(interval);
  }, [isPaused, prefersReducedMotion, showMessage]);

  const message = BANNER_MESSAGES[activeIndex];

  return (
    <div
      className="relative bg-yellow-100 text-gray-800"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsPaused(false);
        }
      }}
      role="region"
      aria-label="Store announcements"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-2 py-2.5 sm:px-4">
        <div
          className="flex min-h-[1.375rem] min-w-0 flex-1 items-center justify-center overflow-hidden md:justify-center"
          aria-live="polite"
          aria-atomic="true"
        >
          <p
            className={`flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-[11px] font-medium tracking-wide transition-all duration-300 sm:text-xs font-inter ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
            }`}
          >
            <span
              className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/90 text-sm shadow-sm"
              aria-hidden="true"
            >
              {message.icon}
            </span>
            <span className="text-gray-800">{message.label}</span>
            {message.link && (
              <a
                href={message.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-gray-900 underline decoration-amber-300 underline-offset-2 transition-colors hover:text-btn-primary-blue hover:decoration-btn-primary-blue"
              >
                {message.link.text}
              </a>
            )}
          </p>
        </div>

        <div className="hidden items-center gap-3 md:flex lg:gap-4">
          <SocialMediaIcons />
          <CurrencySelector variant="desktop" />
        </div>
      </div>

      <div className="sr-only" aria-live="polite">
        Announcement {activeIndex + 1} of {BANNER_MESSAGES.length}
      </div>
    </div>
  );
};

export default PromotionalBanner;
