import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="hover:opacity-90 transition-opacity duration-300" aria-label="HappyCase home">
      <div
        className="flex flex-col cursor-pointer transition-all duration-300 text-gray-900 font-inter"
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

