'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const ShippingPolicy = () => {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-title text-gray-900 tracking-title mb-1 md:mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Shipping Information
          </h1>
          <div className="w-16 sm:w-20 md:w-24 h-px bg-gray-200 mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-3xl mx-auto mt-4 font-inter">
            We ship worldwide. Here&apos;s what you need to know about delivery times and shipping costs.
          </p>
        </div>

        <div className="max-w-4xl mx-auto md:px-6 py-16">
          <div className="space-y-8 font-inter">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Dispatch</h2>
              <p className="text-gray-600 font-light">
                We dispatch orders within 2–3 business days. Shipping costs depend on your delivery country.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Delivery Times</h2>
              <ul className="text-gray-600 font-light space-y-2">
                <li><strong>UK:</strong> 3–4 business days</li>
                <li><strong>Europe:</strong> 5–10 business days</li>
                <li><strong>USA & Canada:</strong> 7–14 business days</li>
                <li><strong>Rest of World:</strong> 10–21 business days</li>
              </ul>
              <p className="text-gray-600 font-light mt-4">
                We ship to Ireland, Europe, Asia, North America, South America, Canada, Australia and New Zealand. Shipping charges are calculated at checkout based on your location and parcel size.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Import Duties & Taxes</h2>
              <p className="text-gray-600 font-light">
                Orders delivered outside of the UK may be subject to import duties and taxes. These are levied when the delivery reaches its destination, and you will be responsible for payment. For more information, please contact your local customs office.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
