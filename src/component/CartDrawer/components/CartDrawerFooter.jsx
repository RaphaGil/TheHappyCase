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

  return (
    <div className="p-4 border-t border-gray-100 bg-white flex-shrink-0">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
        <div className="text-sm font-normal text-gray-700 font-inter">
          Subtotal:
        </div>
        <div className="text-lg font-medium text-gray-900 font-inter">
          {formatPrice(totalPrice)}
        </div>
      </div>
     
      <p className="text-xs text-gray-500 text-center mb-4 font-normal font-inter">
        <Link
          href="/shipping"
          className="text-gray-500 hover:text-gray-900 underline transition-colors"
          onClick={handleShippingClick}
        >
          Shipping
        </Link> calculated at checkout.
      </p>
      
      <div className="flex flex-col gap-3">
        <button
          className="btn-happy btn-soft w-full py-3 text-sm font-inter"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </button>
        <button
          className="btn-happy w-full py-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed font-inter"
          disabled={cartLength === 0}
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartDrawerFooter;

