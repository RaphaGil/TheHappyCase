import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RefundPolicy = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-title text-gray-900 tracking-title mb-1 md:mb-2">
            REFUND POLICY
          </h1>
          <div className="w-16 sm:w-20 md:w-24 h-px bg-gray-200 mx-auto mb-4"></div>
        </div>

        <div className="max-w-4xl mx-auto md:px-6 py-16">
          <div className="bg-white rounded-lg  md:p-12">
            <div className="prose prose-lg max-w-none">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8 rounded">
                <p className="text-gray-700 text-body-lg leading-relaxed mb-4 font-inter">
                  <strong>No returns or refunds.</strong> We only offer returns/refunds if there has been a fault on our end. This is due to our stock being made-to-order.
                </p>
                <p className="text-gray-700 text-body-lg leading-relaxed font-inter">
                  Thanks for understanding!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;

