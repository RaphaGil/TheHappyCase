'use client';

import React from 'react';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className="hover:opacity-90 transition-opacity duration-300" aria-label="HappyCase home">
      {/* Mobile: Logo Image */}
      <img 
        src="/assets/logo.webp" 
        alt="The Happy Case Logo" 
        className="h-10 w-auto lg:hidden"
        loading="lazy"
      />
      
      {/* Desktop: Text Logo */}
      <div
        className="hidden lg:flex flex-col cursor-pointer transition-all duration-300 text-gray-900 font-inter"
      >
        <span className="text-[9px] font-light leading-tight text-gray-900 font-inter tracking-title uppercase">
          THE
        </span>
        <span className="text-2xl md:text-3xl lg:text-4xl font-bold  text-blue-900">
          HAPPY
        </span>
        <span className="text-end text-[10px] font-light leading-tight text-gray-900 font-inter tracking-title uppercase">
          CASE
        </span>
      </div>
    </Link>
  );
};

export default Logo;

