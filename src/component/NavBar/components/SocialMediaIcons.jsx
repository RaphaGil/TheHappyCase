import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTiktok, faFacebook, faEtsy } from '@fortawesome/free-brands-svg-icons';

const ETSY_SHOP_URL = 'https://www.etsy.com/shop/TheHappyCaseShop';

const SocialMediaIcons = ({ isMobile = false }) => {
  const iconSize = isMobile ? 'text-xl' : 'text-md';
  const containerClass = isMobile 
    ? 'flex gap-4' 
    : 'hidden md:flex items-center gap-4';

  return (
    <div className={containerClass}>
      <a
        href={ETSY_SHOP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`${isMobile ? 'w-10 h-10 flex items-center justify-center' : ''} transition-opacity hover:opacity-80`}
        aria-label="Visit our Etsy shop"
      >
        <FontAwesomeIcon icon={faEtsy} className={iconSize} style={{ color: '#F16521' }} />
      </a>
      <a
        href="https://instagram.com/thehappycase.store"
        target="_blank"
        rel="noopener noreferrer"
        className={`${isMobile ? 'w-10 h-10 flex items-center justify-center' : ''} transition-opacity hover:opacity-80`}
        aria-label="Follow us on Instagram"
      >
        <FontAwesomeIcon icon={faInstagram} className={iconSize} style={{color: '#E4405F'}} />
      </a>
      <a
        href="https://tiktok.com/@thehappycase.store"
        target="_blank"
        rel="noopener noreferrer"
        className={`${isMobile ? 'w-10 h-10 flex items-center justify-center' : ''} transition-opacity hover:opacity-80`}
        aria-label="Follow us on TikTok"
      >
        <FontAwesomeIcon icon={faTiktok} className={iconSize} style={{color: '#000000'}} />
      </a>
      <a
        href="https://facebook.com/thehappycase"
        target="_blank"
        rel="noopener noreferrer"
        className={`${isMobile ? 'w-10 h-10 flex items-center justify-center' : ''} transition-opacity hover:opacity-80`}
        aria-label="Follow us on Facebook"
      >
        <FontAwesomeIcon icon={faFacebook} className={iconSize} style={{color: '#1877F2'}} />
      </a>
    </div>
  );
};

export default SocialMediaIcons;

