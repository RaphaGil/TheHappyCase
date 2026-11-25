'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTiktok, faEtsy } from '@fortawesome/free-brands-svg-icons';
import CurrencySelector from './CurrencySelector';
import etsyReviews from '../../../data/etsyReviews.json';

const ETSY_SHOP_URL = 'https://www.etsy.com/shop/TheHappyCaseShop';

const SOCIAL_LINKS = [
  { href: ETSY_SHOP_URL, icon: faEtsy, label: 'Visit our Etsy shop' },
  { href: 'https://instagram.com/thehappycase.store', icon: faInstagram, label: 'Follow us on Instagram' },
  { href: 'https://tiktok.com/@thehappycase.store', icon: faTiktok, label: 'Follow us on TikTok' },
];

const SocialLinks = () => (
  <div className="flex items-center gap-3 sm:gap-4">
    {SOCIAL_LINKS.map((link) => (
      <a
        key={link.label}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={link.label}
        className="flex h-6 w-6 items-center justify-center text-white transition-colors hover:text-[#ffd93d]"
      >
        <FontAwesomeIcon icon={link.icon} className="text-[15px]" />
      </a>
    ))}
  </div>
);

const Icon = ({ children }) => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4 flex-shrink-0 text-[#ffd93d]"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const TruckIcon = () => (
  <Icon>
    <path d="M3 7h11v9H3z" />
    <path d="M14 10h4l3 3v3h-7z" />
    <circle cx="7" cy="17.5" r="1.5" />
    <circle cx="17" cy="17.5" r="1.5" />
  </Icon>
);

const StarIcon = () => (
  <svg viewBox="0 0 20 20" className="h-4 w-4 flex-shrink-0 text-[#ffd93d]" aria-hidden="true">
    <path fill="currentColor" d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9z" />
  </svg>
);

const GlobeIcon = () => (
  <Icon>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
  </Icon>
);

const { average, count } = etsyReviews.summary;

const BANNER_MESSAGES = [
  { id: 'uk', icon: <TruckIcon />, label: 'UK delivery in 2–4 days' },
  {
    id: 'reviews',
    icon: <StarIcon />,
    label: `Rated ${average.toFixed(1)} from ${count} Etsy reviews`,
    short: `${average.toFixed(1)} from ${count} Etsy reviews`,
  },
  {
    id: 'etsy',
    icon: <GlobeIcon />,
    label: 'Outside the UK? Shop on',
    short: 'Outside UK? Shop on',
    link: { href: ETSY_SHOP_URL, text: 'Etsy' },
  },
];

const ROTATE_MS = 5000;
const FADE_MS = 280;

const Message = ({ message }) => (
  <span className="inline-flex items-center gap-2 whitespace-nowrap">
    {message.icon}
    {message.short ? (
      <>
        {/* Shorter wording on the smallest phones so nothing is cut off */}
        <span className="min-[360px]:hidden">{message.short}</span>
        <span className="hidden min-[360px]:inline">{message.label}</span>
      </>
    ) : (
      <span>{message.label}</span>
    )}
    {message.link && (
      <a
        href={message.link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="-ml-1 font-semibold text-[#ffd93d] underline decoration-[#ffd93d]/50 underline-offset-2 transition-colors hover:decoration-[#ffd93d]"
      >
        {message.link.text}
      </a>
    )}
  </span>
);

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
    if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    fadeTimeoutRef.current = setTimeout(() => {
      setActiveIndex(normalizedIndex);
      setIsVisible(true);
    }, FADE_MS);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPrefersReducedMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  useEffect(() => () => fadeTimeoutRef.current && clearTimeout(fadeTimeoutRef.current), []);

  // Rotate through the messages, one at a time
  useEffect(() => {
    if (isPaused || prefersReducedMotion) return undefined;
    const interval = setInterval(() => showMessage(activeIndexRef.current + 1), ROTATE_MS);
    return () => clearInterval(interval);
  }, [isPaused, prefersReducedMotion, showMessage]);

  return (
    <div
      className="relative bg-[#30279f] text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
      }}
      role="region"
      aria-label="Store announcements"
    >
      <div className="mx-auto flex h-10 max-w-[1440px] items-center gap-4 px-4 text-xs font-medium font-inter sm:text-[13px] lg:px-8">
        {/* Left: social links (all screens) */}
        <div className="flex flex-shrink-0 lg:flex-1">
          <SocialLinks />
        </div>

        {/* Centre: one rotating message on every screen size */}
        <div className="flex min-w-0 flex-1 justify-center overflow-hidden" aria-live="polite" aria-atomic="true">
          <p
            className={`transition-all duration-300 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
            }`}
          >
            <Message message={BANNER_MESSAGES[activeIndex]} />
          </p>
        </div>

        {/* Right: currency */}
        <div className="hidden flex-1 justify-end md:flex">
          <CurrencySelector variant="desktop" inverse />
        </div>
      </div>
    </div>
  );
};

export default PromotionalBanner;
