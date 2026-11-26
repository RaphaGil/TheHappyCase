'use client';

import React from 'react';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5 hover:opacity-90 transition-opacity duration-300"
      aria-label="The Happy Case home"
    >
      <img
        src="/assets/logo.webp"
        alt=""
        className="h-10 w-10 object-contain lg:hidden"
        width="44"
        height="44"
      />
      <span
        className="font-brand hidden lg:inline text-[1.75rem] leading-none text-[#30279f] whitespace-nowrap"
      >
        The Happy Case
      </span>
    </Link>
  );
};

export default Logo;
