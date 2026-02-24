'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const PrivacyPolicy = () => {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState({
    introduction: false,
    informationWeCollect: false,
    howWeUse: false,
    cookies: false,
    thirdParties: false,
    dataRetention: false,
    yourRights: false,
    contact: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const Section = ({ id, title, children }) => (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => toggleSection(id)}
        className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors text-left"
      >
        <h2 className="text-xl font-semibold text-gray-900 font-inter">{title}</h2>
        <svg
          className={`w-5 h-5 text-gray-600 transform transition-transform ${openSections[id] ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {openSections[id] && (
        <div className="p-6 bg-white border-t border-gray-200">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-title text-gray-900 tracking-title mb-1 md:mb-2 font-inter">
            Privacy Policy
          </h1>
          <div className="w-16 sm:w-20 md:w-24 h-px bg-gray-200 mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-3xl mx-auto mt-4 font-inter">
            The Happy Case respects your privacy. This policy explains how we collect, use, and protect your personal information when you use our website and services.
          </p>
        </div>

        <div className="max-w-4xl mx-auto md:px-6 py-16">
          <div className="bg-white rounded-lg md:p-12">
            <div className="space-y-4">
              <Section id="introduction" title="1. Introduction">
                <p className="text-gray-700 leading-relaxed mb-4 font-inter">
                  The Happy Case (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting your personal data. This privacy policy applies to our website thehappycase.com (and related domains), our custom passport case and charms shop, and any services we provide. By using our site or placing an order, you agree to this policy.
                </p>
              </Section>

              <Section id="informationWeCollect" title="2. Information We Collect">
                <p className="text-gray-700 leading-relaxed mb-3 font-inter">We may collect:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 font-inter ml-4">
                  <li><strong>Order information:</strong> name, email, billing and shipping address, phone number</li>
                  <li><strong>Account information:</strong> if you create an account or log in (e.g. email, password)</li>
                  <li><strong>Payment information:</strong> processed securely by our payment provider (Stripe); we do not store full card numbers</li>
                  <li><strong>Design choices:</strong> case type, colour, charms, and personalisation text you submit</li>
                  <li><strong>Technical data:</strong> IP address, browser type, device information, and how you use our site (e.g. cookies)</li>
                </ul>
              </Section>

              <Section id="howWeUse" title="3. How We Use Your Information">
                <p className="text-gray-700 leading-relaxed mb-3 font-inter">We use your data to:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 font-inter ml-4">
                  <li>Process and fulfil orders, and communicate about your order (e.g. shipping updates)</li>
                  <li>Provide customer support and respond to enquiries</li>
                  <li>Improve our website, products, and services</li>
                  <li>Send marketing communications only if you have opted in</li>
                  <li>Comply with legal obligations and prevent fraud</li>
                </ul>
              </Section>

              <Section id="cookies" title="4. Cookies and Similar Technologies">
                <p className="text-gray-700 leading-relaxed mb-3 font-inter">
                  We use cookies and similar technologies to run the site, remember your preferences (e.g. cart, language), and understand how visitors use our site. You can manage cookie settings in your browser. Disabling certain cookies may affect site functionality (e.g. shopping cart).
                </p>
              </Section>

              <Section id="thirdParties" title="5. Sharing with Third Parties">
                <p className="text-gray-700 leading-relaxed mb-3 font-inter">We may share your information with:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 font-inter ml-4">
                  <li><strong>Payment processors</strong> (e.g. Stripe) to process payments</li>
                  <li><strong>Shipping and fulfilment partners</strong> to deliver your order</li>
                  <li><strong>Email and analytics providers</strong> to send emails and analyse site use</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-4 font-inter">
                  We do not sell your personal data to third parties for their marketing.
                </p>
              </Section>

              <Section id="dataRetention" title="6. Data Retention">
                <p className="text-gray-700 leading-relaxed font-inter">
                  We keep your data only as long as needed for the purposes above (e.g. orders, legal, accounting). You can ask us to delete or correct your data where applicable (see &quot;Your Rights&quot;).
                </p>
              </Section>

              <Section id="yourRights" title="7. Your Rights">
                <p className="text-gray-700 leading-relaxed mb-3 font-inter">Depending on where you live, you may have the right to:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 font-inter ml-4">
                  <li>Access, correct, or delete your personal data</li>
                  <li>Object to or restrict certain processing</li>
                  <li>Data portability</li>
                  <li>Withdraw consent where we rely on it</li>
                  <li>Lodge a complaint with a supervisory authority</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-4 font-inter">
                  To exercise these rights, contact us at the email below.
                </p>
              </Section>

              <Section id="contact" title="8. Contact Us">
                <p className="text-gray-700 leading-relaxed font-inter">
                  For privacy-related questions or requests, contact us at{' '}
                  <a href="mailto:thehappycase.shop@gmail.com" className="text-blue-600 hover:text-blue-800 underline font-inter font-semibold">
                    thehappycase.shop@gmail.com
                  </a>
                  . We will respond within a reasonable time.
                </p>
              </Section>

              <section className="bg-gray-50 border-l-4 border-gray-400 p-6 rounded mt-8">
                <p className="text-gray-700 leading-relaxed font-inter text-sm">
                  This policy may be updated from time to time. The latest version will be posted on this page with an updated date. Continued use of our site after changes constitutes acceptance of the revised policy.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
