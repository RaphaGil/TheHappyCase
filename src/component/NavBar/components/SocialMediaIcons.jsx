import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTiktok, faFacebook, faEtsy } from '@fortawesome/free-brands-svg-icons';

const SocialMediaIcons = ({ isMobile = false }) => {
  const iconSize = isMobile ? 'text-sm' : 'text-md';
  const containerClass = isMobile 
    ? 'flex' 
    : 'hidden md:flex items-center gap-4';

  return (
    <div className={containerClass}>
      <a
        href="https://instagram.com/thehappycase.store"
        target="_blank"
        rel="noopener noreferrer"
        className={`${isMobile ? 'w-8 h-8 flex items-center justify-center' : ''} transition-opacity hover:opacity-80`}
        aria-label="Follow us on Instagram"
      >
        <FontAwesomeIcon icon={faInstagram} className={iconSize} style={{color: '#E4405F'}} />
      </a>
      <a
        href="https://tiktok.com/@thehappycase.store"
        target="_blank"
        rel="noopener noreferrer"
        className={`${isMobile ? 'w-8 h-8 flex items-center justify-center' : ''} transition-opacity hover:opacity-80`}
        aria-label="Follow us on TikTok"
      >
        <FontAwesomeIcon icon={faTiktok} className={iconSize} style={{color: '#000000'}} />
      </a>
      <a
        href="https://facebook.com/thehappycase"
        target="_blank"
        rel="noopener noreferrer"
        className={`${isMobile ? 'w-8 h-8 flex items-center justify-center' : ''} transition-opacity hover:opacity-80`}
        aria-label="Follow us on Facebook"
      >
        <FontAwesomeIcon icon={faFacebook} className={iconSize} style={{color: '#1877F2'}} />
      </a>
      <a
        href="https://www.etsy.com/shop/TheHappyCaseShop?ref=dashboard-header"
        target="_blank"
        rel="noopener noreferrer"
        className={`${isMobile ? 'w-8 h-8 flex items-center justify-center' : ''} transition-opacity hover:opacity-80`}
        aria-label="Visit our Etsy shop"
      >
        <FontAwesomeIcon icon={faEtsy} className={iconSize} style={{color: '#F45800'}} />
      </a>
    </div>
  );
};

export default SocialMediaIcons;

