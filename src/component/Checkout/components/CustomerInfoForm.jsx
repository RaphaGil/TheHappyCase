'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const CustomerInfoForm = ({ customerInfo, onInputChange, isAuthenticated, authenticatedEmail, onSignIn, onSignOut }) => {
  const router = useRouter();
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const dropdownRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowLoginDropdown(false);
      }
    };

    if (showLoginDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLoginDropdown]);
  
  const handleSignInClick = () => {
    setShowLoginDropdown(true);
  };

  const handleConfirmLogin = () => {
    setShowLoginDropdown(false);
    // Navigate to login page with return URL to come back to checkout
    router.push('/login?redirect=/checkout');
  };

  const handleCancelLogin = () => {
    setShowLoginDropdown(false);
  };

  const sanitizeName = (value) => value.replace(/[^A-Za-zÀ-ÿ\s'-]/g, '');
  const sanitizeAddress = (value) => value.replace(/[^A-Za-z0-9À-ÿ\s.,#'/-]/g, '');

  const handleSanitizedChange = (event, sanitizer) => {
    const { name, value } = event.target;
    const sanitized = sanitizer(value);
    if (sanitized === customerInfo[name]?.toString()) return;
    onInputChange({
      ...event,
      target: {
        ...event.target,
        name,
        value: sanitized,
      },
    });
  };
  
  return (
    <div className="space-y-4 ">
        <h3 className="text-md uppercase tracking-wider text-gray-900 mb-4 font-bold font-inter">
       Contact
      </h3>
      {!isAuthenticated ? (
        <div>
          <div className="flex items-center justify-between mb-1.5 relative">
            <label className="block text-sm text-gray-500 font-light font-inter">
              Email Address *
            </label>
            <div ref={dropdownRef} className="relative">
              <button
                type="button"
                onClick={handleSignInClick}
                className="text-xs text-gray-600 hover:text-gray-900 font-light font-inter underline"
              >
                Sign In
              </button>
              
              {/* Login Confirmation Dropdown */}
              {showLoginDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-sm shadow-lg z-50">
                  <div className="p-3">
                    <p className="text-sm text-gray-700 font-light font-inter mb-3">
                      Do you want to sign in?
                    </p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleConfirmLogin}
                        className="flex-1 px-3 py-1.5 text-xs uppercase tracking-wider font-light font-inter bg-black text-white hover:bg-gray-800 transition-colors"
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelLogin}
                        className="flex-1 px-3 py-1.5 text-xs uppercase tracking-wider font-light font-inter border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <input
            type="email"
            name="email"
            value={customerInfo.email}
            onChange={onInputChange}
            required
            placeholder="your.email@example.com"
            className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-100 focus:border-yellow-100 bg-white text-gray-900 placeholder-gray-400 font-light font-inter text-base"
            style={{ fontSize: '16px' }}
          />
          <p className="mt-1 text-xs text-gray-500 font-light font-inter">
            We'll send your order confirmation to this email
          </p>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-sm text-gray-500 font-light font-inter">
              Email Address *
            </label>
            <button
              type="button"
              onClick={onSignOut}
              className="text-xs text-gray-600 hover:text-gray-900 font-light font-inter underline"
            >
              Sign Out
            </button>
          </div>
          <div className="w-full px-3 py-2 border border-gray-200 rounded-sm bg-gray-50 text-gray-900 font-light font-inter text-sm">
            {authenticatedEmail}
          </div>
          <p className="mt-1 text-xs text-gray-500 font-light font-inter">
            Signed in as {authenticatedEmail}
          </p>
        </div>
      )}
      <h3 className="text-md uppercase tracking-wider text-gray-900 mb-4 font-bold font-inter">
        Delivery
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
   
          <div>
          <label className="block text-sm text-gray-500 mb-1.5 font-light font-inter">
            Name *
          </label>
          <input
            type="text"
            name="name"
            value={customerInfo.name ?? ''}
            onChange={(e) => handleSanitizedChange(e, sanitizeName)}
            required
            maxLength={15}
            className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-100 focus:border-yellow-100 bg-white text-gray-900 placeholder-gray-400 font-light font-inter text-base"
            style={{ fontSize: '16px' }}
          />
          </div>
          <div>
           <label className="block text-sm text-gray-500 mb-1.5 font-light font-inter">
           Surname *
          </label>
          <input
            type="text"
            name="surname"
            value={customerInfo.surname ?? ''}
            onChange={(e) => handleSanitizedChange(e, sanitizeName)}
            required
            maxLength={15}
            className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-100 focus:border-yellow-100 bg-white text-gray-900 placeholder-gray-400 font-light font-inter text-base"
            style={{ fontSize: '16px' }}
          />
          </div>
    
        
      
      </div>

      <div>
        <label className="block text-sm text-gray-500 mb-1.5 font-light font-inter">
          Address Line 1 *
        </label>
        <input
          type="text"
          name="address.line1"
          value={customerInfo.address?.line1 ?? ''}
          onChange={(e) => handleSanitizedChange(e, sanitizeAddress)}
          required
          className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-100 focus:border-yellow-100 bg-white text-gray-900 placeholder-gray-400 font-light font-inter text-base"
          style={{ fontSize: '16px' }}
        />
      </div>

      <div>
        <label className="block text-sm text-gray-500 mb-1.5 font-light font-inter">
          Address Line 2
        </label>
        <input
          type="text"
          name="address.line2"
          value={customerInfo.address?.line2 ?? ''}
          onChange={(e) => handleSanitizedChange(e, sanitizeAddress)}
          className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-100 focus:border-yellow-100 bg-white text-gray-900 placeholder-gray-400 font-light font-inter text-base"
          style={{ fontSize: '16px' }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-gray-500 mb-1.5 font-light font-inter">
            City *
          </label>
          <input
            type="text"
            name="address.city"
            value={customerInfo.address?.city ?? ''}
            onChange={(e) => handleSanitizedChange(e, sanitizeAddress)}
            required
            className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-100 focus:border-yellow-100 bg-white text-gray-900 placeholder-gray-400 font-light font-inter text-base"
            style={{ fontSize: '16px' }}
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-500 mb-1.5 font-light font-inter">
            Postcode *
          </label>
          <input
            type="text"
            name="address.postal_code"
            value={customerInfo.address?.postal_code ?? ''}
            onChange={(e) => handleSanitizedChange(e, sanitizeAddress)}
            required
            className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-100 focus:border-yellow-100 bg-white text-gray-900 placeholder-gray-400 font-light font-inter text-base"
            style={{ fontSize: '16px' }}
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-500 mb-1.5 font-light font-inter">
            Country *
          </label>
          <div className="w-full px-3 py-2 border border-gray-200 rounded-sm bg-gray-50 text-gray-900 font-light font-inter text-base">
            United Kingdom
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfoForm;

