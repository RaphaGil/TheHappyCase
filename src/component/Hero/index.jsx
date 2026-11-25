'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { normalizeImagePath } from '../../utils/imagePath';
// Defer slick carousel CSS - load asynchronously if needed
// import 'slick-carousel/slick/slick.css'; 
// import 'slick-carousel/slick/slick-theme.css';

// Use normalizeImagePath utility for proper path resolution in both dev and production
const videoMp4Src = normalizeImagePath('/assets/videos/hero.mp4');
const videoWebmSrc = normalizeImagePath('/assets/videos/hero.webm');
const heroFallbackImage = normalizeImagePath('/images/heroimage.png');
const heroImageWebP = normalizeImagePath('/images/heroimage.webp');
const CHRISTMAS_CHARMS = [
  { src: '/images/ColorfulPins/christmas.webp', name: 'Christmas Tree' },
  { src: '/images/ColorfulPins/merrychristmas.webp', name: 'Merry Christmas' },
];

// Deterministic snowflakes (same on server and client, so no hydration mismatch)
const SNOWFLAKES = Array.from({ length: 40 }, (_, i) => ({
  left: (i * 37) % 100,
  size: 2 + ((i * 7) % 5),
  duration: 8 + ((i * 13) % 10),
  delay: -((i * 11) % 18),
  drift: ((i * 17) % 60) - 30,
}));

// TEMP: hide hero media for speed testing
const HIDE_HOME_IMAGES_FOR_TEST = false;

function Hero() {
  const videoRef = useRef(null);
  const router = useRouter();
  const [buttonVisible, setButtonVisible] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [mounted, setMounted] = useState(false);

  const handleStartDesigning = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    router.push('/custom-passport');
  };
  
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Start fade-in after title animations complete
    // Last title delay (300ms) + animation duration (1200ms) + small buffer (200ms) = 1700ms
    const timer = setTimeout(() => {
      setButtonVisible(true);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full overflow-hidden h-[86vh] min-h-[560px] max-h-[820px] md:h-[78vh]">
      {/* Video / image background (temporarily hidden for speed testing) */}
      <div className="absolute inset-0 w-full h-full">
        {!HIDE_HOME_IMAGES_FOR_TEST && mounted && (
          <>
            {/* Static hero image on small screens; video only on md+ */}
            <picture className="md:hidden absolute inset-0 block w-full h-full">
              <source
                type="image/webp"
                srcSet={heroImageWebP}
                sizes="(max-width: 768px) 100vw"
              />
              <img
                src={heroFallbackImage}
                alt="Custom passport cases with charms from The Happy Case"
                className="w-full h-full object-cover object-center"
                width={1600}
                height={900}
                fetchPriority="high"
              />
            </picture>
            {/* Video on md and up; fallback image if video errors */}
            <div className="hidden md:block absolute inset-0 w-full h-full">
              {!videoError ? (
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  loop
                  preload="metadata"
                  className="w-full h-full object-cover object-center"
                  onError={() => setVideoError(true)}
                >
                  <source src={videoMp4Src} type="video/mp4" />
                  <source src={videoWebmSrc} type="video/webm" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <picture className="absolute inset-0 block w-full h-full">
                  <source type="image/webp" srcSet={heroImageWebP} sizes="100vw" />
                  <img
                    src={heroFallbackImage}
                    alt="Custom passport cases with charms from The Happy Case"
                    className="w-full h-full object-cover object-center"
                    width={1600}
                    height={900}
                  />
                </picture>
              )}
            </div>
          </>
        )}
        {/* Readability: soft neutral shade behind the text (left on desktop, bottom on mobile) */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/35 to-transparent md:bg-gradient-to-r md:from-black/60 md:via-black/20 md:to-transparent"></div>
        {/* Falling snow */}
        <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden="true">
          {SNOWFLAKES.map((flake, i) => (
            <span
              key={i}
              className="hero-snowflake"
              style={{
                left: `${flake.left}%`,
                width: `${flake.size}px`,
                height: `${flake.size}px`,
                animationDuration: `${flake.duration}s`,
                animationDelay: `${flake.delay}s`,
                '--snow-drift': `${flake.drift}px`,
              }}
            />
          ))}
        </div>
        {/* String of Christmas lights along the top edge */}
        <div className="hero-garland absolute top-0 left-0 right-0 h-1.5 z-20" aria-hidden="true"></div>
      </div>

      {/* Hero content */}
      <div className="relative z-20 mx-auto flex h-full max-w-7xl items-end px-4 pb-10 md:items-center md:px-8 md:pb-0">
        <div
          className={`max-w-xl text-white transition-all duration-700 ease-out ${
            buttonVisible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
          }`}
        >
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-sm font-inter sm:text-sm">
            <span aria-hidden="true">🎄</span>
            The perfect Christmas gift
          </p>

          <h1 className="text-display" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.35)' }}>
            Create your own{' '}
            <span className="relative inline-block text-[#ffd93d]">
              passport case
              <svg className="absolute -bottom-2 left-0 h-3 w-full" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
                <path d="M2 9c40-6 120-8 196-3" fill="none" stroke="#ffd93d" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="text-lead mt-5 max-w-md text-white/90 font-inter">
            Pick your case, add charms and your name. A one-of-a-kind travel gift, made just for you.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={handleStartDesigning} className="btn-happy btn-sunny font-inter">
              Design yours
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
                <path d="M11 2.5l1.9 4.9 4.9 1.9-4.9 1.9L11 16.1l-1.9-4.9L4.2 9.3l4.9-1.9z" />
                <path d="M18.5 14l.9 2.3 2.3.9-2.3.9-.9 2.3-.9-2.3-2.3-.9 2.3-.9z" />
              </svg>
            </button>
            <Link
              href="/passport-cases"
              className="btn-happy btn-ghost font-inter"
            >
              Shop passport cases
            </Link>
          </div>

          <p className="mt-5 text-xs text-white/70 font-inter">
            UK orders only. Ordering from abroad? Visit our{' '}
            <a
              href="https://www.etsy.com/shop/TheHappyCaseShop"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white underline decoration-[#ffd93d] underline-offset-2 hover:text-[#ffd93d]"
            >
              Etsy shop
            </a>
            .
          </p>
        </div>

        {/* New Christmas charms card: floats bottom-right on desktop */}
        <button
          type="button"
          onClick={handleStartDesigning}
          aria-label="New Christmas charms – start designing your case"
          className={`absolute bottom-8 right-8 hidden items-center gap-4 rounded-2xl bg-white/95 p-3 pr-5 text-left shadow-2xl transition-all duration-700 ease-out hover:-translate-y-1 lg:flex ${
            buttonVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="hero-garland absolute left-3 right-3 top-0 h-1 rounded-full" aria-hidden="true"></span>
          <div className="flex gap-2">
            {CHRISTMAS_CHARMS.map((charm) => (
              <span key={charm.name} className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#fff6b8] p-1.5">
                <img src={normalizeImagePath(charm.src)} alt={charm.name} className="h-full w-full object-contain" width="56" height="56" decoding="async" />
              </span>
            ))}
          </div>
          <span>
            <span className="rounded-full bg-[#c81e3a] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white font-inter">New</span>
            <span className="mt-1 block text-sm font-semibold text-[#30279f] font-inter">Christmas charms ❄️</span>
            <span className="block text-xs text-gray-500 font-inter">Add them to your design →</span>
          </span>
        </button>
      </div>
    </section>
  );
}

export default Hero;
