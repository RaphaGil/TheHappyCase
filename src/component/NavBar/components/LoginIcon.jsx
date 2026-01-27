import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingBag, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

const LoginIcon = ({ isMobile = false }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dropdownRef = useRef(null);

  // Check if user is logged in
  useEffect(() => {
    const emailFromStorage = typeof window !== 'undefined' ? localStorage.getItem('userEmail') : null;
    const loggedInFromStorage = typeof window !== 'undefined' ? localStorage.getItem('isLoggedIn') === 'true' : false;
    
    if (emailFromStorage && loggedInFromStorage) {
      setUserEmail(emailFromStorage);
      setIsLoggedIn(true);
    }

    // Also check Supabase auth if available
    if (supabase) {
      supabase.auth.getUser().then(({ data, error }) => {
        if (!error && data?.user) {
          const email = data.user?.email || emailFromStorage;
          setUserEmail(email);
          setIsLoggedIn(true);
        }
      });
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

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
    setIsDropdownOpen(false);
    
    // Navigate to home
    navigate('/');
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Mobile version - simple link
  if (isMobile) {
    const linkTo = (isLoggedIn && userEmail) ? '/my-orders' : '/login';
    return (
      <Link
        to={linkTo}
        className="hidden lg:flex items-center p-1.5 text-gray-800 hover:text-gray-600 transition-colors z-10"
        aria-label={isLoggedIn && userEmail ? 'View my orders' : 'Log in or create an account'}
      >
        <FontAwesomeIcon 
          icon={faUser} 
          className="w-5 h-5" 
          style={{ 
            filter: 'opacity(0.85)',
            transform: 'scale(0.9)'
          }}
        />
      </Link>
    );
  }

  // Desktop version - with dropdown
  if (isLoggedIn && userEmail) {
    return (
      <div className="hidden lg:block relative" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="flex items-center p-1.5 text-gray-800 hover:text-gray-600 transition-colors z-10"
          aria-label="User menu"
        >
          <FontAwesomeIcon 
            icon={faUser} 
            className="w-5 h-5" 
            style={{ 
              filter: 'opacity(0.85)',
              transform: 'scale(0.9)'
            }}
          />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
            {/* User Email */}
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900 font-inter truncate">
                {userEmail}
              </p>
            </div>

            {/* My Orders Link */}
            <Link
              to="/my-orders"
              onClick={() => setIsDropdownOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors font-inter"
            >
              <FontAwesomeIcon icon={faShoppingBag} className="w-4 h-4" />
              <span>My Orders</span>
            </Link>

            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors font-inter text-left"
            >
              <FontAwesomeIcon icon={faRightFromBracket} className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  // Not logged in - simple link to login
  return (
    <Link
      to="/login"
      className="hidden lg:flex items-center p-1.5 text-gray-800 hover:text-gray-600 transition-colors z-10"
      aria-label="Log in or create an account"
    >
      <FontAwesomeIcon 
        icon={faUser} 
        className="w-5 h-5" 
        style={{ 
          filter: 'opacity(0.85)',
          transform: 'scale(0.9)'
        }}
      />
    </Link>
  );
};

export default LoginIcon;

