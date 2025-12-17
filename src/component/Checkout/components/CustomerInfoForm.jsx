import React from 'react';

const CustomerInfoForm = ({ customerInfo, onInputChange }) => {
  return (
    <div className="space-y-4">
        <h3 className="text-xs uppercase tracking-wider text-gray-900 mb-4 font-light font-inter">
       Contact
      </h3>
      <div>
          <label className="block text-sm text-gray-500 mb-1.5 font-light font-inter">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={customerInfo.email}
            onChange={onInputChange}
            required
            placeholder="your.email@example.com"
            className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 bg-white text-gray-900 placeholder-gray-400 font-light font-inter text-md"
          />
          <p className="mt-1 text-xs text-gray-500 font-light font-inter">
            We'll send your order confirmation to this email
          </p>
        </div>
      <h3 className="text-xs uppercase tracking-wider text-gray-900 mb-4 font-light font-inter">
        Delivery
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
   
          <div>
          <label className="block text-xs text-gray-500 mb-1.5 font-light font-inter">
            Name *
          </label>
          <input
            type="text"
            name="name"
            value={customerInfo.name}
            onChange={onInputChange}
            required
            className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 bg-white text-gray-900 placeholder-gray-400 font-light font-inter"
          />
          </div>
          <div>
           <label className="block text-xs text-gray-500 mb-1.5 font-light font-inter">
           Surname *
          </label>
          <input
            type="text"
            name="surname"
            value={customerInfo.surname}
            onChange={onInputChange}
            required
            className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 bg-white text-gray-900 placeholder-gray-400 font-light font-inter"
          />
          </div>
    
        
      
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-1.5 font-light font-inter">
          Address Line 1 *
        </label>
        <input
          type="text"
          name="address.line1"
          value={customerInfo.address.line1}
          onChange={onInputChange}
          required
          className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 bg-white text-gray-900 placeholder-gray-400 font-light font-inter"
        />
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-1.5 font-light font-inter">
          Address Line 2
        </label>
        <input
          type="text"
          name="address.line2"
          value={customerInfo.address.line2}
          onChange={onInputChange}
          className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 bg-white text-gray-900 placeholder-gray-400 font-light font-inter"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs text-gray-500 mb-1.5 font-light font-inter">
            City *
          </label>
          <input
            type="text"
            name="address.city"
            value={customerInfo.address.city}
            onChange={onInputChange}
            required
            className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 bg-white text-gray-900 placeholder-gray-400 font-light font-inter"
          />
        </div>
        
        <div>
          <label className="block text-xs text-gray-500 mb-1.5 font-light font-inter">
            Postal Code *
          </label>
          <input
            type="text"
            name="address.postal_code"
            value={customerInfo.address.postal_code}
            onChange={onInputChange}
            required
            className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 bg-white text-gray-900 placeholder-gray-400 font-light font-inter"
          />
        </div>
        
        <div>
          <label className="block text-xs text-gray-500 mb-1.5 font-light font-inter">
            Country *
          </label>
          <select
            name="address.country"
            value={customerInfo.address.country}
            onChange={onInputChange}
            className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 bg-white text-gray-900 font-light font-inter text-md"
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
    </div>
  );
};

export default CustomerInfoForm;

