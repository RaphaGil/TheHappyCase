'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '../../../context/CartContext';

const CartIcon = ({ isMobile = false }) => {
  const { getTotalQuantity } = useCart();
  const totalQuantity = getTotalQuantity();

  return (
    <Link
      href="/Cart"
      className={`${isMobile ? 'flex md:hidden' : 'hidden md:flex'} items-center p-2 text-gray-900 hover:text-gray-700 relative transition-colors z-10`}
      aria-label="Go to cart"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
      >
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
      {totalQuantity > 0 && (
        <span className={`absolute top-0 right-0 bg-gray-900 text-white ${isMobile ? 'text-sm' : 'text-xs'} rounded-full ${isMobile ? 'h-6 w-6' : 'h-5 w-5'} flex items-center justify-center font-light`}>
          {totalQuantity}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;

