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
        className="h-10 w-10 lg:h-11 lg:w-11 object-contain"
        width="44"
        height="44"
      />
      <span
        className="font-brand hidden lg:inline text-2xl leading-none text-[#30279f] whitespace-nowrap"
      >
        The Happy Case
      </span>
    </Link>
  );
};

export default Logo;
