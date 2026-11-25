import React from 'react';
import Link from 'next/link';

/**
 * Shop page header band: breadcrumb, brand title and an optional intro line.
 * `crumbs` is a list of { href, label }; the last crumb is the current page.
 */
const PageHeader = ({ title, subtitle, crumbs = [], children }) => (
  <div className="section-lemon border-b border-[#30279f]/10">
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
      {crumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="mb-3">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-[#30279f]/70 font-inter">
            {crumbs.map((c, i) => {
              const last = i === crumbs.length - 1;
              return (
                <li key={c.label} className="flex items-center gap-1.5">
                  {last ? (
                    <span aria-current="page" className="font-semibold text-[#30279f]">{c.label}</span>
                  ) : (
                    <Link href={c.href} className="hover:text-[#30279f] hover:underline">{c.label}</Link>
                  )}
                  {!last && <span aria-hidden="true">/</span>}
                </li>
              );
            })}
          </ol>
        </nav>
      )}
      <h1 className="text-h1 text-[#30279f]">{title}</h1>
      {subtitle && <p className="text-lead mt-2 max-w-2xl text-gray-600 font-inter">{subtitle}</p>}
      {children}
    </div>
  </div>
);

export default PageHeader;
