import React from 'react';
import NavigationLinks from './NavigationLinks';
import SocialMediaIcons from './SocialMediaIcons';
import CurrencySelector from './CurrencySelector';
import Logo from './Logo';

const MobileMenu = ({ isOpen, onClose }) => {

  if (!isOpen) return null;

  return (
    <ul
      className="flex flex-col fixed left-0 top-0 w-[70%] bg-white border-r border-gray-100 font-light space-y-1 z-50 overflow-y-auto shadow-lg"
      style={{
        fontFamily: "'Poppins', sans-serif",
        height: '100vh',
        maxHeight: '100vh',
        paddingTop: '0',
        paddingBottom: 'max(1.5rem, calc(1.5rem + env(safe-area-inset-bottom)))',
      }}
    >
      {/* Logo and Close Button at the top */}
      <li className="px-4 py-4 border-b border-gray-100 flex items-center justify-between">
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </li>
        
        <NavigationLinks isMobile={true} onLinkClick={onClose} />
      
      {/* Spacer to push bottom items down */}
      <li className="flex-1"></li>
      
      {/* Bottom section - Follow Us and Currency */}
      {/* Social Media Icons - Mobile */}
      <li className="pt-4 border-t border-gray-100">
        <div className="px-4">
          <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-3 font-thin" style={{fontFamily: "'Poppins', sans-serif"}}>
            Follow Us
          </h3>
          <SocialMediaIcons isMobile={true} />
        </div>
      </li>
      
      {/* Currency Selector - Mobile */}
      <li className="relative px-4 py-3 border-t border-gray-100">
        <CurrencySelector variant="mobile" onSelect={onClose} />
      </li>
    </ul>
  );
};

export default MobileMenu;


