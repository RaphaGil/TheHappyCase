import React from 'react';

const ShippingInfo = ({ customerInfo }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 md:p-8">
      <h2 className="text-xl md:text-2xl font-semibold mb-6 text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>
        Shipping Information
      </h2>
      
      {customerInfo && customerInfo.name && (
        <div className="space-y-4 mb-6">
          <div className="py-2 border-b border-gray-100">
            <span className="text-gray-600 font-medium font-inter block mb-1">Name:</span>
            <p className="text-gray-900 font-inter">{customerInfo.name}</p>
          </div>
          {customerInfo.email && (
            <div className="py-2 border-b border-gray-100">
              <span className="text-gray-600 font-medium font-inter block mb-1">Email:</span>
              <p className="text-gray-900 font-inter">{customerInfo.email}</p>
            </div>
          )}
          {customerInfo.address && customerInfo.address.line1 && (
            <div className="py-2">
              <span className="text-gray-600 font-medium font-inter block mb-1">Address:</span>
              <p className="text-gray-900 font-inter">
                {customerInfo.address.line1}
                {customerInfo.address.line2 && <><br />{customerInfo.address.line2}</>}
                <br />
                {customerInfo.address.city} {customerInfo.address.postal_code}
                <br />
                {customerInfo.address.country}
              </p>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-4 md:p-5 bg-blue-50 rounded-lg border border-blue-100">
        <h3 className="font-semibold text-blue-900 mb-2 font-inter">What's Next?</h3>
        <p className="text-sm md:text-base text-blue-800 mb-3 font-inter">
          Your order will be processed within 1-2 business days. 
          You will receive a shipping confirmation email with tracking details 
          once your items are dispatched.
        </p>
        <p className="text-sm md:text-base text-blue-800 font-inter">
          <strong>Estimated delivery:</strong> 3-5 business days
        </p>
      </div>
    </div>
  );
};

export default ShippingInfo;
