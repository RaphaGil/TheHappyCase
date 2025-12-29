import React, { useState } from 'react';
import SignInModal from './SignInModal';

const CustomerInfoForm = ({ customerInfo, onInputChange, isAuthenticated, authenticatedEmail, onSignIn, onSignOut }) => {
  const [showSignInModal, setShowSignInModal] = useState(false);
  return (
    <div className="space-y-4">
        <h3 className="text-md uppercase tracking-wider text-gray-900 mb-4 font-bold font-inter">
       Contact
      </h3>
      {!isAuthenticated ? (
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-sm text-gray-500 font-light font-inter">
              Email Address *
            </label>
            <button
              type="button"
              onClick={() => setShowSignInModal(true)}
              className="text-xs text-gray-600 hover:text-gray-900 font-light font-inter underline"
            >
              Sign In
            </button>
          </div>
          <input
            type="email"
            name="email"
            value={customerInfo.email}
            onChange={onInputChange}
            required
            placeholder="your.email@example.com"
            className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-100 focus:border-yellow-100 bg-white text-gray-900 placeholder-gray-400 font-light font-inter text-sm"
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
            value={customerInfo.name}
            onChange={onInputChange}
            required
            className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-100 focus:border-yellow-100 bg-white text-gray-900 placeholder-gray-400 font-light font-inter text-sm"
          />
          </div>
          <div>
           <label className="block text-sm text-gray-500 mb-1.5 font-light font-inter">
           Surname *
          </label>
          <input
            type="text"
            name="surname"
            value={customerInfo.surname}
            onChange={onInputChange}
            required
            className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-100 focus:border-yellow-100 bg-white text-gray-900 placeholder-gray-400 font-light font-inter text-sm"
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
          value={customerInfo.address.line1}
          onChange={onInputChange}
          required
          className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-100 focus:border-yellow-100 bg-white text-gray-900 placeholder-gray-400 font-light font-inter text-sm"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-500 mb-1.5 font-light font-inter">
          Address Line 2
        </label>
        <input
          type="text"
          name="address.line2"
          value={customerInfo.address.line2}
          onChange={onInputChange}
          className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-100 focus:border-yellow-100 bg-white text-gray-900 placeholder-gray-400 font-light font-inter text-base"
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
            value={customerInfo.address.city}
            onChange={onInputChange}
            required
            className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-100 focus:border-yellow-100 bg-white text-gray-900 placeholder-gray-400 font-light font-inter text-sm"
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-500 mb-1.5 font-light font-inter">
            Postal Code *
          </label>
          <input
            type="text"
            name="address.postal_code"
            value={customerInfo.address.postal_code}
            onChange={onInputChange}
            required
            className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-100 focus:border-yellow-100 bg-white text-gray-900 placeholder-gray-400 font-light font-inter text-sm"
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-500 mb-1.5 font-light font-inter">
            Country *
          </label>
          <select
            name="address.country"
            value={customerInfo.address.country}
            onChange={onInputChange}
            className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-100 focus:border-yellow-100 bg-white text-gray-900 font-light font-inter text-sm"
          >
            <option value="GB">United Kingdom</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="AU">Australia</option>
            <option value="DE">Germany</option>
            <option value="FR">France</option>
            <option value="ES">Spain</option>
            <option value="IT">Italy</option>
          </select>
        </div>
      </div>

      <SignInModal
        show={showSignInModal}
        onClose={() => setShowSignInModal(false)}
        initialEmail={customerInfo.email}
        onVerified={(email) => {
          onSignIn(email);
          setShowSignInModal(false);
          // Auto-fill email in customer info
          onInputChange({ target: { name: 'email', value: email } });
        }}
      />
    </div>
  );
};

export default CustomerInfoForm;

