import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const WhatsAppIcon = ({ isMobile = false }) => {
  const phoneNumber = '447450437243'; // +44 7450 437 243 without + and spaces
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${isMobile ? 'flex md:hidden' : 'hidden md:flex'} items-center p-2 text-gray-500 hover:text-green-600 font-thin transition-colors z-10`}
      aria-label="Contact us on WhatsApp"
    >
      <FontAwesomeIcon icon={faWhatsapp} className="w-6 h-6 opacity-75" />
    </a>
  );
};

export default WhatsAppIcon;

