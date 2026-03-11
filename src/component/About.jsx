'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const About = () => {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-title text-gray-900 tracking-title mb-1 md:mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
            About The Happy Case
          </h1>
          <div className="w-16 sm:w-20 md:w-24 h-px bg-gray-200 mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-3xl mx-auto mt-4 font-inter">
            Our story creating custom passport cases with personalized charms. Founded by a travel enthusiast, we design RFID-protected passport holders that combine style, functionality, and personalization.
          </p>
        </div>

        <div className="max-w-4xl mx-auto md:px-6 py-16">
          <div className="space-y-8 font-inter">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Our Story</h2>
              <p className="text-gray-600 font-light">
                The Happy Case was born from a love of travel and a desire to create passport holders that are both practical and personal. We believe every journey deserves a case that reflects your unique style.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">What We Offer</h2>
              <p className="text-gray-600 font-light">
                Choose from Economy, First Class, and Business Class passport cases. Personalize with 40+ travel-themed charms, bronze pins, colorful designs, and custom text. All our cases are RFID-protected and water-resistant.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Get Started</h2>
              <p className="text-gray-600 font-light mb-4">
                Ready to create your custom passport case?
              </p>
              <Link
                href="/custom-passport"
                className="inline-block px-6 py-3 bg-gray-900 text-white hover:bg-gray-800 transition-colors font-inter"
              >
                Create Yours
              </Link>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
