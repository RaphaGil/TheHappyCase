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
        className="btn-happy px-6 py-3 inline-flex items-center justify-center font-inter"
      >
        <FontAwesomeIcon icon={faHome} className="mr-2" />
        Continue Shopping
      </button>
      
      <button
        onClick={() => window.print()}
        className="btn-happy btn-soft px-6 py-3 inline-flex items-center justify-center font-inter"
      >
        <FontAwesomeIcon icon={faShoppingBag} className="mr-2" />
        Print Receipt
      </button>
    </div>
  );
};

export default ActionButtons;
