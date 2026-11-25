'use client';

import React from 'react';
import Link from 'next/link';
import SectionHeader from './SectionHeader';
import { normalizeImagePath } from '../../../utils/imagePath';
import { designIdeasImages } from '../../../data/data';

const COLLECTIONS = [
  { label: 'Colourful charms', sub: 'Bright & playful', href: '/charms/colorful', image: designIdeasImages[0] },
  { label: 'Bronze charms', sub: 'Timeless & elegant', href: '/charms/bronze', image: designIdeasImages[1] },
  { label: 'Flag charms', sub: 'Every place you love', href: '/charms/flags', image: designIdeasImages[3] },
  { label: 'Design ideas', sub: 'Get inspired', href: '/design-ideas', image: designIdeasImages[2] },
];

const ShopByCollection = () => (
  <section className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
    <SectionHeader
      eyebrow="Find your style"
      title="Shop by collection"
      linkHref="/charms"
      linkLabel="Shop all charms"
    />
    <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:-mx-8 md:px-8 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {COLLECTIONS.map((c) => (
        <Link
          key={c.label}
          href={c.href}
          className="group relative w-[70%] flex-shrink-0 snap-start overflow-hidden rounded-3xl bg-[#eef0ff] sm:w-[45%] md:w-[38%] lg:w-auto"
        >
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src={normalizeImagePath(c.image)}
              alt={c.label}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              decoding="async"
              width="400"
              height="500"
            />
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-5 pt-16">
            <p className="text-xs font-medium text-white/85 font-inter">{c.sub}</p>
            <p className="font-brand mt-0.5 flex items-center justify-between text-[clamp(1.125rem,1rem+0.5vw,1.375rem)] text-white">
              {c.label}
              <span
                aria-hidden="true"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ffd93d] text-sm text-[#30279f] transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </p>
          </div>
        </Link>
      ))}
    </div>
  </section>
);

export default ShopByCollection;
