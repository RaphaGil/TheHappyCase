'use client';

import React from 'react';
import Link from 'next/link';
import SectionHeader from './SectionHeader';
import { charmsBestSellers } from '../../../data/data';
import { normalizeImagePath } from '../../../utils/imagePath';

const collectionFor = (src) =>
  src.includes('/BronzePins/') ? 'Bronze' : src.includes('/Flags/') ? 'Flag' : 'Colourful';

const CharmsBestSellers = () => (
  <section className="section-lemon">
    <div className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
      <SectionHeader
        eyebrow="Customer favourites"
        title="Best selling charms"
        subtitle="The charms our travellers pick again and again."
        linkHref="/charms"
        linkLabel="View all charms"
      />
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:gap-6 xl:grid-cols-6">
        {charmsBestSellers.map((charm, i) => {
          return (
            <li key={`${charm.src}-${i}`}>
              <Link
                href={charm.href}
                className="card-happy group flex h-full flex-col overflow-hidden"
                aria-label={`Shop ${charm.name} charm`}
              >
                <div className="relative aspect-square bg-white">
                  {i < 3 && (
                    <span className="absolute left-2.5 top-2.5 z-10 rounded-full bg-[#30279f] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#ffd93d] font-inter sm:left-3 sm:top-3 sm:px-2.5">
                      Bestseller
                    </span>
                  )}
                  <img
                    src={normalizeImagePath(charm.src)}
                    alt={charm.name}
                    className="absolute inset-0 m-auto h-[62%] w-[62%] object-contain transition-transform duration-300 group-hover:scale-110 sm:h-[50%] sm:w-[50%] xl:h-[66%] xl:w-[66%]"
                    loading="lazy"
                    decoding="async"
                    width="160"
                    height="160"
                  />
                </div>
                <div className="flex flex-1 flex-col border-t border-[#30279f]/5 px-3.5 py-3">
                  <p className="text-xs font-medium text-gray-500 font-inter">{collectionFor(charm.src)} charm</p>
                  <p className="text-sm font-medium leading-snug text-gray-900 font-inter line-clamp-2">{charm.name}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  </section>
);

export default CharmsBestSellers;
