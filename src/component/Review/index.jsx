'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import etsyReviews from '../../data/etsyReviews.json';
import ReviewCard, { Stars } from './components/ReviewCard';

const AUTOPLAY_MS = 5000;

// Detailed 5-star reviews from the Etsy shop (full list kept in data/etsyReviews.json)
const reviews = etsyReviews.reviews.filter((r) => r.featured);
const { summary, shopUrl } = etsyReviews;

const ratingLabel = (avg) => (avg >= 4.5 ? 'Excellent' : avg >= 4 ? 'Great' : 'Good');

const Reviews = () => {
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Scroll by one card; wraps around at either end
  const step = useCallback((dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('li');
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const amount = card ? card.getBoundingClientRect().width + gap : track.clientWidth;
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    const atStart = track.scrollLeft <= 4;
    if (dir > 0 && atEnd) track.scrollTo({ left: 0, behavior: 'smooth' });
    else if (dir < 0 && atStart) track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
    else track.scrollBy({ left: dir * amount, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (paused || hovering || reducedMotion) return undefined;
    const id = setInterval(() => step(1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, hovering, reducedMotion, step]);

  const autoplayOn = !paused && !reducedMotion;

  return (
    <section className="bg-white py-14 md:py-20" aria-labelledby="reviews-heading">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 md:px-8 lg:grid-cols-[minmax(240px,1fr)_3fr] lg:gap-8">
        {/* Summary panel */}
        <div className="flex flex-col items-center justify-center rounded-3xl bg-[#ffd93d] px-6 py-7 text-center text-[#30279f] lg:py-10">
          <h2 id="reviews-heading" className="text-h3">{ratingLabel(summary.average)}</h2>
          <Stars rating={Math.round(summary.average)} className="mt-3 text-2xl text-[#30279f]" />
          <p className="mt-3 text-lg font-inter">{summary.average.toFixed(1)} average</p>
          <p className="text-lg font-inter">{summary.count} reviews</p>
          <a
            href={`${shopUrl}#reviews`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-1 text-sm font-semibold underline decoration-[#30279f]/40 underline-offset-4 hover:decoration-[#30279f] font-inter"
          >
            Read them on Etsy <span aria-hidden="true">↗</span>
          </a>
        </div>

        {/* Review slider */}
        <div
          className="relative min-w-0"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onFocus={() => setHovering(true)}
          onBlur={() => setHovering(false)}
        >
          <ul
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth py-3 md:gap-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Customer reviews"
          >
            {reviews.map((review) => (
              <li
                key={review.id}
                className="w-[85%] flex-shrink-0 snap-start sm:w-[calc((100%-1rem)/2)] md:w-[calc((100%-1.5rem)/2)] xl:w-[calc((100%-3rem)/3)]"
              >
                <ReviewCard review={review} />
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => step(-1)}
            className="absolute -left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#30279f] shadow-md transition hover:bg-[#ffd93d] lg:flex lg:-left-5"
            aria-label="Previous reviews"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            className="absolute -right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#30279f] shadow-md transition hover:bg-[#ffd93d] lg:flex lg:-right-5"
            aria-label="Next reviews"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
          </button>

          {!reducedMotion && (
            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-[#eef0ff] hover:text-[#30279f] font-inter"
                aria-pressed={!autoplayOn}
              >
                {autoplayOn ? (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M7 5h3v14H7zM14 5h3v14h-3z" /></svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
                )}
                {autoplayOn ? 'Pause' : 'Play'}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
