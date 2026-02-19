'use client';

import React, { useState, useEffect } from 'react';
import PromotionalBanner from './components/PromotionalBanner';
import Logo from './components/Logo';
import NavigationLinks from './components/NavigationLinks';
import CartIcon from './components/CartIcon';
import LoginIcon from './components/LoginIcon';
import DashboardIcon from './components/DashboardIcon';
import WhatsAppIcon from './components/WhatsAppIcon';
import HamburgerButton from './components/HamburgerButton';
import MobileMenu from './components/MobileMenu';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      // Disable body scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        // Restore body scroll
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        // Restore scroll position
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  return (
    <>
      <PromotionalBanner />

      {/* Navbar */}
      <nav className="flex bg-white border-b border-gray-100 justify-between items-center px-4 py-2 relative">
        {/* Left side - Hamburger menu and Logo (mobile) */}
        <div className="flex items-center gap-3 lg:flex-none">
          <HamburgerButton isOpen={isOpen} onClick={toggleMenu} />
          <Logo />
        </div>
        
        {/* Navbar links - Desktop */}
        <NavigationLinks isMobile={false} />
        
        {/* Right side - Mobile Icons (Login, WhatsApp, Cart) */}
        <div className="flex items-center md:gap-2 md:hidden">
          <LoginIcon isMobile={true} />
          <WhatsAppIcon isMobile={true} />
          <CartIcon isMobile={true} />
        </div>

        {/* Dark Overlay - Only show when menu is open */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
            onClick={closeMenu}
            aria-label="Close menu"
          />
        )}

        {/* Mobile Menu */}
        <MobileMenu isOpen={isOpen} onClose={closeMenu} />

        {/* Desktop Icons (Login, Dashboard, WhatsApp, Cart) */}
        <div className="hidden md:flex items-center gap-2">
          <LoginIcon isMobile={false} />
          <DashboardIcon isMobile={false} />
          <WhatsAppIcon isMobile={false} />
          <CartIcon isMobile={false} />
        </div>
      </nav>
    </>
  );
};

export default NavBar;
