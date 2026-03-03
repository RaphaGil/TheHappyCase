'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const PrivacyPolicy = () => {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-title text-gray-900 tracking-title mb-1 md:mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Privacy Policy
          </h1>
          <div className="w-16 sm:w-20 md:w-24 h-px bg-gray-200 mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-3xl mx-auto mt-4 font-inter">
            How we collect, use, and protect your personal information when you shop for custom passport cases and charms.
          </p>
        </div>

        <div className="max-w-4xl mx-auto md:px-6 py-16">
          <div className="space-y-8 font-inter">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
              <p className="text-gray-600 font-light">
                When you place an order or create an account, we collect your name, email address, shipping address, and payment information. This information is used to process your order and communicate with you about your purchase.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
              <p className="text-gray-600 font-light">
                We use your information to process orders, send order confirmations, provide customer support, and improve our services. We do not sell your personal information to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Data Security</h2>
              <p className="text-gray-600 font-light">
                We take the security of your personal information seriously. Payment processing is handled securely through Stripe. We use industry-standard measures to protect your data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact</h2>
              <p className="text-gray-600 font-light">
                If you have questions about our privacy policy, please contact us at{' '}
                <a href="mailto:thehappycase.shop@gmail.com" className="text-gray-900 hover:underline">
                  thehappycase.shop@gmail.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
