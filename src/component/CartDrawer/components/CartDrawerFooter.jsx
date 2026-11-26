'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

const CartDrawerFooter = ({ totalPrice, formatPrice, cartLength, onClose }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleContinueShopping = () => {
    onClose();
    // If on Create Yours page, refresh it
    if (pathname === '/custom-passport-holder' || pathname === '/custom-passport') {
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  };

  const handleCheckout = () => {
    onClose();
    router.push('/checkout');
  };

  const handleShippingClick = (event) => {
    event.preventDefault();
    onClose();
    router.push('/shipping');
  };

  // Nothing to summarise when the basket is empty; the empty state has its own buttons
  if (cartLength === 0) return null;

  return (
    <div className="flex-shrink-0 border-t border-[#30279f]/10 bg-white px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 shadow-[0_-8px_24px_rgba(48,39,159,0.06)]">
      <div className="flex items-baseline justify-between">
        <span className="text-base font-semibold text-gray-900 font-inter">Subtotal</span>
        <span className="text-xl font-semibold tabular-nums text-gray-900 font-inter">{formatPrice(totalPrice)}</span>
      </div>
      <p className="mt-1 text-xs text-gray-500 font-inter">
        <Link href="/shipping" className="underline underline-offset-2 hover:text-[#30279f]" onClick={handleShippingClick}>
          Shipping
        </Link>{' '}
        calculated at checkout. UK delivery in 2–4 days.
      </p>

      <div className="mt-4 flex flex-col gap-2.5">
        <button
          className="btn-happy w-full py-3.5 text-[15px] font-inter"
          disabled={cartLength === 0}
          onClick={handleCheckout}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="5" y="11" width="14" height="9" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
          Checkout securely
        </button>
        <button className="btn-happy btn-soft w-full py-3 text-sm font-inter" onClick={handleContinueShopping}>
          Continue shopping
        </button>
      </div>
    </div>
  );
};

export default CartDrawerFooter;

