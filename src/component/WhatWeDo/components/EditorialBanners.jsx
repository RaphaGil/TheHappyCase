'use client';

import React from 'react';
import Link from 'next/link';
import { normalizeImagePath } from '../../../utils/imagePath';
import { designIdeasImages, carouselImages } from '../../../data/data';

const BANNERS = [
  {
    title: 'Design your own',
    text: 'Pick your case, add your favourite charms and finish it with your name.',
    cta: 'Start designing',
    href: '/custom-passport',
    image: carouselImages[6],
    variant: 'btn-happy btn-sunny',
  },
  {
    title: 'The perfect gift',
    text: 'For birthdays, honeymoons, graduations and every adventure in between.',
    cta: 'Find gift ideas',
    href: '/design-ideas',
    image: designIdeasImages[4],
    variant: 'btn-happy btn-sunny',
  },
];

const EditorialBanners = () => (
  <section className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
    <div className="grid gap-4 md:grid-cols-2 md:gap-6">
      {BANNERS.map((b) => (
        <Link
          key={b.title}
          href={b.href}
          className="group relative block overflow-hidden rounded-3xl bg-[#eef0ff]"
        >
          <div className="aspect-[4/5] sm:aspect-[4/3] md:aspect-[4/5] lg:aspect-[5/6] overflow-hidden">
            <img
              src={normalizeImagePath(b.image)}
              alt=""
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              decoding="async"
              width="700"
              height="840"
            />
          </div>
          {/* Even, see-through black layer over the whole photo so the text reads clearly */}
          <div className="absolute inset-0 bg-black/40 transition-colors duration-300 group-hover:bg-black/30" aria-hidden="true" />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center md:p-10">
            <h3 className="font-brand text-h2 text-white">{b.title}</h3>
            <p className="mt-2 max-w-sm text-sm text-white/95 font-inter md:text-base">{b.text}</p>
            <span className={`${b.variant} mt-5 font-inter`}>{b.cta}</span>
          </div>
        </Link>
      ))}
    </div>
  </section>
);

export default EditorialBanners;
