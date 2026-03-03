'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChartLine, faShoppingBag, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import NavigationLinks from './NavigationLinks';
import SocialMediaIcons from './SocialMediaIcons';
import CurrencySelector from './CurrencySelector';
import Logo from './Logo';
import { getSupabaseClient } from '../../../utils/supabaseClient';

// Get shared Supabase client instance
const supabase = getSupabaseClient();

const AUTHORIZED_EMAIL = 'thehappycase.shop@gmail.com';

const MobileMenu = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [userEmail, setUserEmail] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSignOut = () => {
    // Clear localStorage
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId'); // Clear user ID
    
    // Sign out from Supabase if available
    if (supabase) {
      supabase.auth.signOut().catch(err => {
        console.error('Error signing out from Supabase:', err);
      });
    }
    
    // Reset state
    setIsLoggedIn(false);
    setUserEmail(null);
    setIsAuthorized(false);
    
    // Close menu and navigate to home
    onClose();
    router.push('/');
  };

  // Check login state whenever menu opens or component mounts
  useEffect(() => {
    const checkLoginState = () => {
      // Check localStorage for logged-in user
      const emailFromStorage = typeof window !== 'undefined' ? localStorage.getItem('userEmail') : null;
      const loggedInFromStorage = typeof window !== 'undefined' ? localStorage.getItem('isLoggedIn') === 'true' : false;
      
      if (emailFromStorage && loggedInFromStorage) {
        setUserEmail(emailFromStorage);
        setIsLoggedIn(true);
      } else {
        setUserEmail(null);
        setIsLoggedIn(false);
      }

      if (!supabase) {
        setCheckingAuth(false);
        setIsAuthorized(false);
        return;
      }

      // Check if user is authenticated with authorized email
      supabase.auth.getUser().then(({ data, error }) => {
        setCheckingAuth(false);
        
        if (!error && data?.user) {
          // Use Supabase email if available, otherwise use localStorage
          const email = data.user?.email || emailFromStorage;
          setUserEmail(email);
          setIsLoggedIn(true);

          const userEmailLower = email?.toLowerCase().trim();
          const authorizedEmail = AUTHORIZED_EMAIL.toLowerCase().trim();
          
          setIsAuthorized(userEmailLower === authorizedEmail);
        } else if (emailFromStorage && loggedInFromStorage) {
          // Fallback to localStorage email
          const emailLower = emailFromStorage.toLowerCase().trim();
          const authorizedEmail = AUTHORIZED_EMAIL.toLowerCase().trim();
          setIsAuthorized(emailLower === authorizedEmail);
        } else {
          setIsAuthorized(false);
        }
      });
    };

    // Check on mount and whenever menu opens
    checkLoginState();

    // Also listen for storage changes (when user logs in/out in another tab)
    const handleStorageChange = (e) => {
      if (e.key === 'userEmail' || e.key === 'isLoggedIn') {
        checkLoginState();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [isOpen]); // Re-check when menu opens

  if (!isOpen) return null;

  return (
    <div
      className="flex flex-col fixed left-0 top-0 w-[70%] bg-white border-r border-gray-100 font-light z-50 shadow-xl font-inter"
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </li>
          
          {/* Login/User Area - Yellow background */}
          <li>
            {isLoggedIn && userEmail ? (
              // Logged in: Show email, My Orders, and Sign Out in yellow area
              <div className="bg-yellow-100 border-b border-gray-100">
                {/* User Email */}
                <div className="px-4 py-3 flex items-center gap-3">
                  <FontAwesomeIcon icon={faUser} className="text-sm" style={{color: '#6b7280'}} />
                  <span className="font-inter text-sm" style={{color: '#6b7280'}}>
                    {userEmail}
                  </span>
                </div>
                
                {/* My Orders Link */}
                <Link
                  href="/my-orders"
                  onClick={onClose}
                  className="px-4 py-3 hover:underline font-light transition-colors text-sm tracking-wider flex items-center gap-3 border-t border-yellow-200"
                  style={{color: '#6b7280'}}
                >
                  <FontAwesomeIcon icon={faShoppingBag} className="text-sm" />
                  <span className="font-inter">
                    My Orders
                  </span>
                </Link>
                
                {/* Sign Out Button */}
                <button
                  onClick={handleSignOut}
                  className="w-full px-4 py-3 hover:underline font-light transition-colors text-sm tracking-wider flex items-center gap-3 text-left"
                  style={{color: '#6b7280'}}
                >
                  <FontAwesomeIcon icon={faRightFromBracket} className="text-sm" />
                  <span className="font-inter">
                    Sign Out
                  </span>
                </button>
              </div>
            ) : (
              // Not logged in: Show login link
              <Link
                href="/login"
                onClick={onClose}
                className="px-4 py-3 hover:text-gray-900 hover:bg-gray-50 font-light transition-colors text-sm bg-yellow-100 tracking-wider border-b border-gray-100 flex items-center gap-3"
                style={{color: '#6b7280'}}
              >
                <FontAwesomeIcon icon={faUser} className="text-sm" />
                <span className="font-inter">
                  Log in or create an account
                </span>
              </Link>
            )}
          </li>

          {/* Dashboard Link - Only show if authorized */}
          {!checkingAuth && isAuthorized && (
            <li>
              <Link
                href="/dashboard"
                onClick={onClose}
                className="px-4 py-3 hover:text-gray-900 hover:bg-gray-50 font-light transition-colors text-sm bg-blue-100 tracking-wider border-b border-gray-100 flex items-center gap-3"
                style={{color: '#6b7280'}}
              >
                <FontAwesomeIcon icon={faChartLine} className="text-sm" />
                <span className="font-inter">
                  Dashboard
                </span>
              </Link>
            </li>
          )}
            
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


