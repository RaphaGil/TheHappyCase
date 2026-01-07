import React, { useState, useEffect } from 'react';
import PromotionalBanner from './components/PromotionalBanner';
import Logo from './components/Logo';
import NavigationLinks from './components/NavigationLinks';
import CartIcon from './components/CartIcon';
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
        
        {/* Right side - Mobile Icons (Cart) */}
        <CartIcon isMobile={true} />

        {/* Mobile Menu */}
        <MobileMenu isOpen={isOpen} onClose={closeMenu} />

        {/* Cart Link - Desktop */}
        <CartIcon isMobile={false} />
      </nav>
    </>
  );
};

export default NavBar;
