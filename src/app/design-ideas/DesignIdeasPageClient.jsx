'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { normalizeImagePath } from '@/utils/imagePath';
import PageHeader from '@/component/Shared/PageHeader';
import SectionHeader from '@/component/WhatWeDo/components/SectionHeader';

const STEPS = [
  { n: 1, title: 'Pick your case', text: 'Choose a style and your favourite colour.' },
  { n: 2, title: 'Add your charms', text: 'Colourful, bronze or flags: mix and match.' },
  { n: 3, title: 'Add a name', text: 'Finish it with a name or initials.' },
];

const OCCASIONS = [
  'Weddings',
  'Anniversary',
  'Bride',
  'Friends',
  "Mother's Day",
  "Valentine's Day",
  'Birthday',
  'Graduation',
  'Honeymoon',
  'Travellers',
];

/** Full-screen photo viewer with arrows, keyboard and swipe support. */
const Lightbox = ({ images, index, onClose, onChange }) => {
  const touchX = useRef(null);
  const closeRef = useRef(null);
  const count = images.length;
  const go = useCallback((dir) => onChange((index + dir + count) % count), [index, count, onChange]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [go, onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Design idea ${index + 1} of ${count}`}
      onClick={onClose}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <img
        src={normalizeImagePath(images[index])}
        alt={`Design idea ${index + 1}`}
        className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />

      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/30"
        aria-label="Close"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
      </button>
      {[-1, 1].map((dir) => (
        <button
          key={dir}
          type="button"
          onClick={(e) => { e.stopPropagation(); go(dir); }}
          className={`absolute top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-[#ffd93d] hover:text-[#30279f] sm:flex ${dir < 0 ? 'left-4' : 'right-4'}`}
          aria-label={dir < 0 ? 'Previous photo' : 'Next photo'}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d={dir < 0 ? 'M15 18l-6-6 6-6' : 'M9 6l6 6-6 6'} />
          </svg>
        </button>
      ))}
      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/15 px-3 py-1 text-sm text-white font-inter">
        {index + 1} / {count}
      </p>
    </div>
  );
};

const DesignIdeasPageClient = ({ designImages }) => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="Design ideas"
        crumbs={[{ href: '/', label: 'Home' }, { href: '/design-ideas', label: 'Design ideas' }]}
        subtitle="Get inspired by passport cases our customers have designed, then create your own one-of-a-kind case."
      >
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/custom-passport" className="btn-happy font-inter">Design yours</Link>
          <Link href="/charms" className="btn-happy btn-soft font-inter">Browse charms</Link>
        </div>
      </PageHeader>

      {/* Gallery: masonry wall that keeps each photo's real shape */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16" aria-label="Design ideas gallery">
        <ul className="columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4 lg:gap-5">
          {designImages.map((image, index) => (
            <li key={`design-${index}`} className="mb-3 break-inside-avoid sm:mb-4 lg:mb-5">
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                className="group relative block w-full overflow-hidden rounded-2xl bg-[#eef0ff] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#30279f]/40"
                aria-label={`View design idea ${index + 1} larger`}
              >
                <img
                  src={normalizeImagePath(image)}
                  className="block h-auto w-full transition-transform duration-500 group-hover:scale-105"
                  alt={`Custom passport case design idea ${index + 1}`}
                  loading={index < 4 ? 'eager' : 'lazy'}
                  decoding="async"
                />
                <span className="absolute inset-0 flex items-end justify-end bg-black/0 p-3 transition-colors duration-300 group-hover:bg-black/15" aria-hidden="true">
                  <span className="flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-white/95 text-[#30279f] opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* How it works */}
      <section className="section-lavender">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
          <SectionHeader eyebrow="Easy as 1, 2, 3" title="Design yours in minutes" align="center" />
          <ol className="grid gap-4 sm:grid-cols-3 md:gap-6">
            {STEPS.map((step) => (
              <li key={step.n} className="card-happy flex flex-col items-center p-6 text-center md:p-8">
                <span className="font-brand flex h-12 w-12 items-center justify-center rounded-full bg-[#ffd93d] text-xl text-[#30279f]">
                  {step.n}
                </span>
                <p className="mt-4 text-lg font-semibold text-gray-900 font-inter">{step.title}</p>
                <p className="mt-1 text-sm text-gray-600 font-inter">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Gift occasions */}
      <section className="mx-auto max-w-4xl px-4 py-14 text-center md:px-8 md:py-20">
        <SectionHeader
          eyebrow="Gift ideas"
          title="The perfect gift for…"
          subtitle="Weddings, honeymoons and every milestone in between. Make it personal."
          align="center"
        />
        <div className="flex flex-wrap justify-center gap-2.5 md:gap-3">
          {OCCASIONS.map((occasion) => (
            <Link
              key={occasion}
              href="/custom-passport"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#eef0ff] px-5 py-2.5 text-sm font-semibold text-[#30279f] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#ffd93d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#30279f] focus-visible:ring-offset-2 font-inter"
            >
              {occasion}
            </Link>
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-500 font-inter">…and every adventure in between.</p>
      </section>

      {/* Closing call to action */}
      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-8 md:pb-20">
        <div className="flex flex-col items-center gap-5 rounded-3xl bg-[#30279f] px-6 py-10 text-center md:flex-row md:justify-between md:px-12 md:text-left">
          <div>
            <p className="font-brand text-h3 text-white">Ready to create yours?</p>
            <p className="mt-1 text-sm text-white/80 font-inter">Pick a case, add charms and your name. We&apos;ll do the rest.</p>
          </div>
          <Link href="/custom-passport" className="btn-happy btn-sunny flex-shrink-0 font-inter">
            Start designing
          </Link>
        </div>
      </section>

      {openIndex !== null && (
        <Lightbox images={designImages} index={openIndex} onChange={setOpenIndex} onClose={() => setOpenIndex(null)} />
      )}
    </div>
  );
};

export default DesignIdeasPageClient;
