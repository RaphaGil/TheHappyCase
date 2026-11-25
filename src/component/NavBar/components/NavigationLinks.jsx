'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/custom-passport', label: 'Create Yours' },
  { href: '/passport-cases', label: 'Passport Cases' },
  { href: '/charms', label: 'Charms' },
  { href: '/design-ideas', label: 'Design Ideas' },
];

const isActive = (pathname, href) =>
  href === '/' ? pathname === '/' : pathname === href || pathname?.startsWith(`${href}/`);

const NavigationLinks = ({ isMobile = false, onLinkClick }) => {
  const pathname = usePathname();

  if (isMobile) {
    return (
      <ul className="flex flex-col space-y-1 font-inter">
        {links.map((link) => {
          const active = isActive(pathname, link.href);
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onLinkClick}
                aria-current={active ? 'page' : undefined}
                className={`block px-4 py-3 text-base rounded-xl transition-colors ${
                  active
                    ? 'bg-[#eef0ff] text-[#30279f] font-semibold'
                    : 'text-gray-700 font-medium hover:bg-[#eef0ff] hover:text-[#30279f]'
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <ul className="hidden lg:flex lg:items-center lg:gap-1 flex-1 justify-center font-inter">
      {links.map((link) => {
        const active = isActive(pathname, link.href);
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={active ? 'page' : undefined}
              className={`relative block px-3.5 py-2 text-[15px] transition-colors duration-200 after:absolute after:left-3.5 after:right-3.5 after:-bottom-0.5 after:h-[3px] after:rounded-full after:transition-transform after:duration-200 after:origin-left after:bg-[#ffd93d] ${
                active
                  ? 'text-[#30279f] font-semibold after:scale-x-100'
                  : 'text-gray-700 font-medium hover:text-[#30279f] after:scale-x-0 hover:after:scale-x-100'
              }`}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavigationLinks;
