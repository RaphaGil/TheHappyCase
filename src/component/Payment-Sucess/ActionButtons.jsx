'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faShoppingBag } from '@fortawesome/free-solid-svg-icons';

const ActionButtons = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 md:mt-12">
      <button
        onClick={() => router.push('/')}
        className="px-6 py-3 rounded-md font-medium inline-flex items-center justify-center bg-gray-900 hover:bg-gray-800 text-white transition-all duration-200 font-inter"
      >
        <FontAwesomeIcon icon={faHome} className="mr-2" />
        Continue Shopping
      </button>
      
      <button
        onClick={() => window.print()}
        className="px-6 py-3 rounded-md font-medium inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 hover:border-gray-400 transition-all duration-200 font-inter"
      >
        <FontAwesomeIcon icon={faShoppingBag} className="mr-2" />
        Print Receipt
      </button>
    </div>
  );
};

export default ActionButtons;
