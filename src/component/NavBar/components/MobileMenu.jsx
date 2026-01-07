import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import NavigationLinks from './NavigationLinks';
import SocialMediaIcons from './SocialMediaIcons';
import CurrencySelector from './CurrencySelector';
import Logo from './Logo';

const MobileMenu = ({ isOpen, onClose }) => {

  if (!isOpen) return null;

  return (
    <div
      className="flex flex-col fixed left-0 top-0 w-[70%] bg-white border-r border-gray-100 font-light z-50 shadow-lg font-inter"
      style={{
        height: '100vh',
        maxHeight: '100vh',
      }}
    >
      {/* Scrollable content section */}
      <div 
        className="flex-1 overflow-y-auto min-h-0"
        style={{
          WebkitOverflowScrolling: 'touch',
          scrollBehavior: 'smooth',
        }}
      >
        <ul className="flex flex-col space-y-1 pb-4">
          {/* Logo and Close Button at the top */}
          <li className="px-4 py-4 flex items-center justify-between flex-shrink-0">
            <div onClick={onClose} className="scale-125">
              <Logo />
            </div>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-900 focus:outline-none transition-colors"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </li>
          
          {/* Login Link */}
          <li>
            <Link
              to="/login"
              onClick={onClose}
              className="px-4 py-3 hover:text-gray-900 hover:bg-gray-50 font-light transition-colors text-sm bg-yellow-100 tracking-wider border-b border-gray-100 flex items-center gap-3"
              style={{color: '#6b7280'}}
            >
              <FontAwesomeIcon icon={faUser} className="text-sm" />
              <span className="font-inter">
                Log in or create an account
              </span>
            </Link>
          </li>
            
          <NavigationLinks isMobile={true} onLinkClick={onClose} />
        </ul>
      </div>
      
      {/* Fixed bottom section - Follow Us and Currency */}
      <div 
        className="flex-shrink-0 bg-white " 
        style={{
          paddingBottom: 'max(1.5rem, calc(1.5rem + env(safe-area-inset-bottom)))',
          position: 'sticky',
          bottom: 0,
        }}
      >
        {/* Social Media Icons - Mobile */}
        <div className="pt-4">
          <div className="px-4">
            <p className="py-3 hover:text-gray-900 font-light text-sm uppercase">
              Follow Us
            </p>
            <SocialMediaIcons isMobile={true} />
          </div>
        </div>
      
        {/* Currency Selector - Mobile */}
        <div className="relative px-4 py-3 border-t border-gray-100">
          <CurrencySelector variant="mobile" onSelect={onClose} />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;


