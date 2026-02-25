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
    router.push('/Login?redirect=/Checkout');
  };

  const handleCancelLogin = () => {
    setShowLoginDropdown(false);
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
            onChange={onInputChange}
            required
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
            onChange={onInputChange}
            required
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
          onChange={onInputChange}
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
          onChange={onInputChange}
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
            onChange={onInputChange}
            required
            className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-100 focus:border-yellow-100 bg-white text-gray-900 placeholder-gray-400 font-light font-inter text-base"
            style={{ fontSize: '16px' }}
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-500 mb-1.5 font-light font-inter">
            {(customerInfo.address?.country ?? '') === 'GB' ? 'Postcode' : 'Postal Code'} *
          </label>
          <input
            type="text"
            name="address.postal_code"
            value={customerInfo.address?.postal_code ?? ''}
            onChange={onInputChange}
            required
            className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-100 focus:border-yellow-100 bg-white text-gray-900 placeholder-gray-400 font-light font-inter text-base"
            style={{ fontSize: '16px' }}
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-500 mb-1.5 font-light font-inter">
            Country/Region *
          </label>
          <select
            name="address.country"
            value={customerInfo.address?.country ?? ''}
            onChange={onInputChange}
            className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-100 focus:border-yellow-100 bg-white text-gray-900 font-light font-inter text-base"
            style={{ fontSize: '16px' }}
          >
            <option value="GB">England</option>
            <optgroup label="Europe">
              <option value="AL">Albania</option>
              <option value="AD">Andorra</option>
              <option value="AT">Austria</option>
              <option value="BE">Belgium</option>
              <option value="BA">Bosnia and Herzegovina</option>
              <option value="BG">Bulgaria</option>
              <option value="HR">Croatia</option>
              <option value="CY">Cyprus</option>
              <option value="CZ">Czech Republic</option>
              <option value="DK">Denmark</option>
              <option value="EE">Estonia</option>
              <option value="FI">Finland</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
              <option value="GR">Greece</option>
              <option value="HU">Hungary</option>
              <option value="IS">Iceland</option>
              <option value="IE">Ireland</option>
              <option value="IT">Italy</option>
              <option value="LV">Latvia</option>
              <option value="LI">Liechtenstein</option>
              <option value="LT">Lithuania</option>
              <option value="LU">Luxembourg</option>
              <option value="MT">Malta</option>
              <option value="MC">Monaco</option>
              <option value="ME">Montenegro</option>
              <option value="NL">Netherlands</option>
              <option value="MK">North Macedonia</option>
              <option value="NO">Norway</option>
              <option value="PL">Poland</option>
              <option value="PT">Portugal</option>
              <option value="RO">Romania</option>
              <option value="SM">San Marino</option>
              <option value="RS">Serbia</option>
              <option value="SK">Slovakia</option>
              <option value="SI">Slovenia</option>
              <option value="ES">Spain</option>
              <option value="SE">Sweden</option>
              <option value="CH">Switzerland</option>
            </optgroup>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfoForm;

