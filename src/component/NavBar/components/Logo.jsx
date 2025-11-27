import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="hover:opacity-90 transition-opacity duration-300" aria-label="HappyCase home">
      <div
        className="flex flex-col cursor-pointer transition-all duration-300 text-gray-900 font-fredoka"
      >
        <span className="text-[7px] sm:text-[9px] md:text-[10px] lg:text-xs font-bold leading-tight tracking-[0.35em] text-blue-900 uppercase">
          THE
        </span>
        <span className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold leading-none text-blue-900 uppercase">
          HAPPY
        </span>
        <span className="text-end text-[7px] sm:text-[9px] md:text-[10px] lg:text-xs font-bold leading-tight tracking-[0.35em] text-blue-900 uppercase">
          CASE
        </span>
      </div>
    </Link>
  );
};

export default Logo;

