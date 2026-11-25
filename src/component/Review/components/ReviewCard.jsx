import React from 'react';

export const Stars = ({ rating = 5, className = '' }) => (
  <span className={`inline-flex gap-0.5 ${className}`} aria-label={`${rating} out of 5 stars`} role="img">
    {Array.from({ length: 5 }, (_, i) => (
      <svg key={i} viewBox="0 0 20 20" className="h-[1.1em] w-[1.1em]" aria-hidden="true">
        <path
          fill={i < rating ? 'currentColor' : '#e5e7eb'}
          d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9z"
        />
      </svg>
    ))}
  </span>
);

const formatDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }) : '';

const ReviewCard = ({ review }) => (
  <article className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(48,39,159,0.08)] ring-1 ring-[#30279f]/5">
    <header className="flex flex-wrap items-center gap-x-3 gap-y-1">
      <p className="text-base font-semibold text-gray-900 font-inter">{review.name}</p>
      <Stars rating={review.rating} className="text-[#30279f]" />
    </header>

    <p className="mt-2 flex items-center gap-1.5 text-sm text-gray-600 font-inter">
      <svg viewBox="0 0 20 20" className="h-4 w-4 text-[#30279f]" aria-hidden="true">
        <path fill="currentColor" d="M10 1l2.2 1.6 2.7-.1.8 2.6 2.2 1.6-.9 2.5.9 2.5-2.2 1.6-.8 2.6-2.7-.1L10 19l-2.2-1.6-2.7.1-.8-2.6-2.2-1.6.9-2.5-.9-2.5 2.2-1.6.8-2.6 2.7.1z" />
        <path fill="#fff" d="M8.7 12.6L6.2 10.1l1.1-1.1 1.4 1.4 4-4 1.1 1.1z" />
      </svg>
      Verified Etsy buyer
    </p>

    {review.product && (
      <p className="mt-2 text-sm italic text-gray-600 font-inter">{review.product}</p>
    )}

    <p className="mt-2 text-[15px] leading-relaxed text-gray-800 font-inter line-clamp-6">{review.text}</p>

    <p className="mt-auto pt-5 text-right text-sm text-gray-500 font-inter">{formatDate(review.date)}</p>
  </article>
);

export default ReviewCard;
