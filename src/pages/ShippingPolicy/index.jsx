import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ShippingPolicy = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top when component mounts or route changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
            <h1 
             className="text-title md:text-title-lg font-light text-gray-900 mb-2 font-inter tracking-title"
            >
              Shipping and Processing Times
            </h1>
          <div className="w-16 h-px bg-gray-300 mx-auto mb-8"></div>
        </div>
        
        {/* Content */}
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-blue-50 rounded-lg p-6 md:p-8 border border-blue-100">
              <h2 
               className="text-heading-sm md:text-heading font-light text-gray-900 mb-4 font-inter"
              >
              Processing Time
            </h2>
             <p className="text-body-sm text-gray-700 leading-relaxed font-inter">
              All our products are made-to-order, which means we create them especially for you after you place your order. 
              Please allow <strong>2-3 business days</strong> for processing before your order ships.
            </p>
          </div>

          <div className="bg-yellow-50 rounded-lg p-6 md:p-8 border border-yellow-100">
              <h2 
               className="text-heading-sm md:text-heading font-light text-gray-900 mb-4 font-inter"
              >
              Shipping Times
            </h2>
            <p className="text-body-sm text-gray-700 leading-relaxed mb-4 font-inter">
              Once your order has been processed and shipped, delivery times vary by location:
            </p>
            <ul className="list-disc list-inside text-body-sm text-gray-700 leading-relaxed space-y-2 ml-4 mb-4 font-inter">
              <li><strong>UK:</strong> 3-4 business days</li>
              <li><strong>Europe:</strong> 7-14 business days</li>
              <li><strong>USA & Canada:</strong> 9-18 business days</li>
              {/* <li><strong>Rest of World:</strong> 10-21 business days</li> */}
            </ul>
            <p className="text-body-sm text-gray-700 leading-relaxed mt-4 font-inter">
              <strong>Please note:</strong> Unfortunately, delivery delays can happen due to the carrier. While we do our best to ensure timely delivery, factors beyond our control such as weather, customs processing, or carrier issues may cause delays. We appreciate your patience and understanding.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 md:p-8 border border-gray-100 mb-32">
              <h2 
               className="text-heading-sm md:text-heading font-light text-gray-900 mb-4 font-inter"
              >
              Tracking Your Order
            </h2>
             <p className="text-body-sm text-gray-700 leading-relaxed font-inter">
              Once your order ships, you'll receive a tracking number via email so you can follow your package's journey to your door.
            </p>
          </div>
        </div>
      </div>
 
    </div>
  );
};

export default ShippingPolicy;

