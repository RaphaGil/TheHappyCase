import React from 'react';

const CustomerInfoForm = ({ customerInfo, onInputChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xs uppercase tracking-wider text-gray-900 mb-4 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
        Delivery
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-gray-500 mb-1.5 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            value={customerInfo.name}
            onChange={onInputChange}
            required
            className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 bg-white text-gray-900 placeholder-gray-400 font-light"
            style={{fontFamily: "'Poppins', sans-serif"}}
          />
        </div>
        
        <div>
          <label className="block text-xs text-gray-500 mb-1.5 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={customerInfo.email}
            onChange={onInputChange}
            required
            className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 bg-white text-gray-900 placeholder-gray-400 font-light"
            style={{fontFamily: "'Poppins', sans-serif"}}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-1.5 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
          Address Line 1 *
        </label>
        <input
          type="text"
          name="address.line1"
          value={customerInfo.address.line1}
          onChange={onInputChange}
          required
          className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 bg-white text-gray-900 placeholder-gray-400 font-light"
          style={{fontFamily: "'Poppins', sans-serif"}}
        />
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-1.5 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
          Address Line 2
        </label>
        <input
          type="text"
          name="address.line2"
          value={customerInfo.address.line2}
          onChange={onInputChange}
          className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 bg-white text-gray-900 placeholder-gray-400 font-light"
          style={{fontFamily: "'Poppins', sans-serif"}}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs text-gray-500 mb-1.5 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
            City *
          </label>
          <input
            type="text"
            name="address.city"
            value={customerInfo.address.city}
            onChange={onInputChange}
            required
            className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 bg-white text-gray-900 placeholder-gray-400 font-light"
            style={{fontFamily: "'Poppins', sans-serif"}}
          />
        </div>
        
        <div>
          <label className="block text-xs text-gray-500 mb-1.5 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
            Postal Code *
          </label>
          <input
            type="text"
            name="address.postal_code"
            value={customerInfo.address.postal_code}
            onChange={onInputChange}
            required
            className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 bg-white text-gray-900 placeholder-gray-400 font-light"
            style={{fontFamily: "'Poppins', sans-serif"}}
          />
        </div>
        
        <div>
          <label className="block text-xs text-gray-500 mb-1.5 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
            Country *
          </label>
          <select
            name="address.country"
            value={customerInfo.address.country}
            onChange={onInputChange}
            className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 bg-white text-gray-900 font-light"
            style={{fontFamily: "'Poppins', sans-serif"}}
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

