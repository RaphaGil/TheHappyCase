'use client';

import React from 'react';
import Link from 'next/link';

const NavigationLinks = ({ isMobile = false, onLinkClick }) => {
  const linkClass = isMobile
    ? "px-4 py-3 hover:text-gray-900 hover:bg-gray-50 font-light block transition-colors text-sm uppercase tracking-wider hover:border-b-2 hover:border-blue-500"
    : "px-3 py-1.5 hover:text-gray-900 font-light block transition-all duration-200 text-sm uppercase tracking-wider text-gray-600 hover:border-b-2 hover:border-blue-500";

  const links = [
    { href: "/", label: "Home" },
    { href: "/CreateYours", label: "Create Yours" },
    { href: "/PassportCases", label: "Passport Cases" },
    { href: "/Charms", label: "Charms" },
  ];

  if (isMobile) {
    return (
      <ul
        className="flex flex-col space-y-1 font-inter"
      >
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={linkClass}
              style={{color: '#6b7280'}}
              onClick={onLinkClick}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul
      className="hidden lg:flex lg:items-center lg:space-x-1 flex-1 justify-center font-inter"
    >
      {links.map((link) => (
        <li key={link.href}>
          <Link href={link.href} className={linkClass}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavigationLinks;

