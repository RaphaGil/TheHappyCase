import React from 'react';
import Link from 'next/link';

/**
 * Shared homepage section heading: small eyebrow, brand title, optional subtitle,
 * and an optional "Shop all" link that sits on the right on larger screens.
 */
const SectionHeader = ({ eyebrow, title, subtitle, linkHref, linkLabel, align = 'between' }) => {
  const centered = align === 'center' || !linkHref;
  return (
    <div
      className={`mb-8 md:mb-10 flex flex-col gap-3 ${
        centered ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'
      }`}
    >
      <div className={centered ? 'max-w-2xl' : 'max-w-2xl'}>
        {eyebrow && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#30279f]/70 font-inter">
            {eyebrow}
          </p>
        )}
        <h2 className="text-h2 text-[#30279f]">{title}</h2>
        {subtitle && (
          <p className="text-lead mt-2 text-gray-600 font-inter">{subtitle}</p>
        )}
      </div>
      {linkHref && (
        <Link
          href={linkHref}
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#30279f] font-inter whitespace-nowrap"
        >
          <span className="border-b-2 border-[#ffd93d] pb-0.5">{linkLabel}</span>
          <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;
