import React from 'react';
import SectionHeader from '../../WhatWeDo/components/SectionHeader';

const ReviewHeader = ({ summary, shopUrl }) => (
  <div className="text-center">
    <SectionHeader
      eyebrow="★★★★★ Reviews"
      title="Loved by travellers"
      subtitle={
        summary
          ? `Rated ${summary.average.toFixed(1)} out of 5 from ${summary.count} reviews on Etsy.`
          : undefined
      }
      align="center"
    />
    {shopUrl && (
      <a
        href={`${shopUrl}#reviews`}
        target="_blank"
        rel="noopener noreferrer"
        className="-mt-4 mb-10 inline-flex items-center gap-1.5 text-sm font-semibold text-[#30279f] font-inter"
      >
        <span className="border-b-2 border-[#ffd93d] pb-0.5">Read all reviews on Etsy</span>
        <span aria-hidden="true">↗</span>
      </a>
    )}
  </div>
);

export default ReviewHeader;
