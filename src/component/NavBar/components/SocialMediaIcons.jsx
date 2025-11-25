import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTiktok, faFacebook } from '@fortawesome/free-brands-svg-icons';

const SocialMediaIcons = ({ isMobile = false }) => {
  const iconSize = isMobile ? 'text-sm' : 'text-md';
  const containerClass = isMobile 
    ? 'flex' 
    : 'hidden md:flex items-center gap-2';

  return (
    <div className={containerClass}>
      <a
        href="https://instagram.com/thehappycase.store"
        target="_blank"
        rel="noopener noreferrer"
        className={`${isMobile ? 'w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900' : 'hover:text-gray-700'} transition-colors`}
        aria-label="Follow us on Instagram"
      >
        <FontAwesomeIcon icon={faInstagram} className={iconSize} />
      </a>
      <a
        href="https://tiktok.com/@thehappycase.store"
        target="_blank"
        rel="noopener noreferrer"
        className={`${isMobile ? 'w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900' : 'hover:text-gray-700'} transition-colors`}
        aria-label="Follow us on TikTok"
      >
        <FontAwesomeIcon icon={faTiktok} className={iconSize} />
      </a>
      <a
        href="https://facebook.com/thehappycase"
        target="_blank"
        rel="noopener noreferrer"
        className={`${isMobile ? 'w-8 h-8 flex items-center justify-center hover:text-gray-900' : 'hover:text-gray-700'} transition-colors`}
        aria-label="Follow us on Facebook"
      >
        <FontAwesomeIcon icon={faFacebook} className={iconSize} />
      </a>
    </div>
  );
};

export default SocialMediaIcons;

