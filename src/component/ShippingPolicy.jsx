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
            We ship to the United Kingdom only. Here&apos;s what you need to know about delivery times and shipping costs.
          </p>
        </div>

        <div className="max-w-4xl mx-auto md:px-6 py-16">
          <div className="space-y-8 font-inter">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Dispatch</h2>
              <p className="text-gray-600 font-light">
                We dispatch orders within 2–3 business days. We ship to the UK only with a flat £3 shipping rate.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Delivery Times</h2>
              <p className="text-gray-600 font-light">
                We deliver to addresses across the United Kingdom. Orders typically arrive within 3–5 business days after dispatch.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping Cost</h2>
              <p className="text-gray-600 font-light">
                Standard UK delivery is £3 per order. Shipping is calculated at checkout.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
