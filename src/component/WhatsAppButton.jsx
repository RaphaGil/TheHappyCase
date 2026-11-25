'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const PHONE_NUMBER = '447450437243'; // +44 7450 437243, digits only for wa.me

/** Floating WhatsApp chat button, pinned to the bottom-right corner. */
export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${PHONE_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1ebe5b] hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
      style={{ bottom: 'max(1.5rem, calc(1rem + env(safe-area-inset-bottom)))' }}
    >
      <FontAwesomeIcon icon={faWhatsapp} className="text-[30px]" />
    </a>
  );
}
