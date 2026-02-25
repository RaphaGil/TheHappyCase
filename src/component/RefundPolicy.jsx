'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const RefundPolicy = () => {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState({
    customised: false,
    nonCustomised: false,
    howToReturn: false,
    refunds: false,
    notEligible: false,
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

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-title text-gray-900 tracking-title mb-1 md:mb-2" style={{fontFamily: "'Poppins', sans-serif"}}>
             Returns & Exchanges (UK)
          </h1>
          <div className="w-16 sm:w-20 md:w-24 h-px bg-gray-200 mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-3xl mx-auto mt-4 font-inter">
            Your satisfaction matters! Here's what you need to know about returns and exchanges when shopping with The Happy Case.
          </p>
        </div>

        <div className="max-w-4xl mx-auto md:px-6 py-16">
          <div className="bg-white rounded-lg md:p-12">
            <div className="space-y-4">
              
              {/* Section 1: Customised Products */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection('customised')}
                  className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                >
                  <h2 className="text-xl font-semibold text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>
                    1. Customised Products
                  </h2>
                  <svg
                    className={`w-5 h-5 text-gray-600 transform transition-transform ${
                      openSections.customised ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openSections.customised && (
                  <div className="p-6 bg-white border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed mb-4 font-inter">
                      Customised or made-to-order products cannot be returned or cancelled once the order is placed.
                    </p>
                    
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4 rounded">
                      <p className="text-gray-800 font-semibold mb-2 font-inter">Exceptions: Returns may be accepted if:</p>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 font-inter ml-4">
                        <li>The product has a manufacturing fault</li>
                        <li>The product delivered is different from the confirmed design due to our error</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 border-l-4 border-gray-400 p-4 mb-4 rounded">
                      <p className="text-gray-800 font-semibold mb-2 font-inter">Not eligible:</p>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 font-inter ml-4">
                        <li>Errors in text, name, colour, size, or personalisation details by the customer</li>
                        <li>Change of mind after ordering</li>
                        <li>Minor variations in finish due to the handcrafted process</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Section 2: Non-Customised Products */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection('nonCustomised')}
                  className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                >
                  <h2 className="text-xl font-semibold text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>
                    2. Non-Customised Products
                  </h2>
                  <svg
                    className={`w-5 h-5 text-gray-600 transform transition-transform ${
                      openSections.nonCustomised ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openSections.nonCustomised && (
                  <div className="p-6 bg-white border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed mb-4 font-inter">
                      You have the legal right to cancel within 14 days of receiving your order.
                    </p>
                    
                    <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4 rounded">
                      <p className="text-gray-800 font-semibold mb-2 font-inter">Returns accepted for:</p>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 font-inter ml-4">
                        <li>Change of mind</li>
                        <li>Incorrect or defective items</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 border-l-4 border-gray-400 p-4 mb-4 rounded">
                      <p className="text-gray-800 font-semibold mb-2 font-inter">Conditions:</p>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 font-inter ml-4">
                        <li>Items must be unused, in original packaging, with all accessories</li>
                        <li>Faulty items must be reported within 30 days</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Section 3: How to Return or Exchange */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection('howToReturn')}
                  className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                >
                  <h2 className="text-xl font-semibold text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>
                    3. How to Return or Exchange
                  </h2>
                  <svg
                    className={`w-5 h-5 text-gray-600 transform transition-transform ${
                      openSections.howToReturn ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openSections.howToReturn && (
                  <div className="p-6 bg-white border-t border-gray-200">
                    <div className="space-y-4">
                      <div>
                        <p className="text-gray-700 leading-relaxed mb-3 font-inter">
                          <strong>Contact us first:</strong> email{' '}
                          <a 
                            href="mailto:thehappycase.shop@gmail.com" 
                            className="text-blue-600 hover:text-blue-800 underline font-inter"
                          >
                            thehappycase.shop@gmail.com
                          </a>
                          {' '}with:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 font-inter ml-4">
                          <li>Order number</li>
                          <li>Reason for return/exchange</li>
                          <li>Photos of the product, packaging, and any defect</li>
                        </ul>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded">
                        <p className="text-gray-800 font-semibold mb-2 font-inter">Return timeframe:</p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 font-inter ml-4">
                          <li>Customised faulty products: within 90 days</li>
                          <li>Non-customised items: within 14 days of delivery</li>
                        </ul>
                      </div>
                      
                      <p className="text-gray-700 leading-relaxed font-inter">
                        <strong>Return shipping:</strong> We will provide instructions or a postage label. Send items within 14 days of approval.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Section 4: Refunds */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection('refunds')}
                  className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                >
                  <h2 className="text-xl font-semibold text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>
                    4. Refunds
                  </h2>
                  <svg
                    className={`w-5 h-5 text-gray-600 transform transition-transform ${
                      openSections.refunds ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openSections.refunds && (
                  <div className="p-6 bg-white border-t border-gray-200">
                    <div className="space-y-4">
                      <p className="text-gray-700 leading-relaxed font-inter">
                        Refunds issued after approval and inspection of the returned item.
                      </p>
                      
                      <div className="bg-gray-50 p-4 rounded">
                        <p className="text-gray-800 font-semibold mb-2 font-inter">Method:</p>
                        <p className="text-gray-700 font-inter ml-4">Same as payment method (card, bank transfer, or PayPal)</p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded">
                        <p className="text-gray-800 font-semibold mb-2 font-inter">Timeline:</p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 font-inter ml-4">
                          <li>Bank/PayPal: 5 working days</li>
                          <li>Card: 10 working days</li>
                        </ul>
                      </div>
                      
                      <p className="text-gray-700 leading-relaxed font-inter">
                        Postage costs refunded only if the item was faulty or sent incorrectly.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Section 5: Items Not Eligible */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection('notEligible')}
                  className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                >
                  <h2 className="text-xl font-semibold text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>
                    5. Items Not Eligible
                  </h2>
                  <svg
                    className={`w-5 h-5 text-gray-600 transform transition-transform ${
                      openSections.notEligible ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openSections.notEligible && (
                  <div className="p-6 bg-white border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed mb-3 font-inter">
                      Returns or exchanges are not accepted for:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 font-inter ml-4">
                      <li>Used, damaged, or altered items</li>
                      <li>Missing packaging or accessories</li>
                      <li>Requests outside the timeframes above</li>
                      <li>Change of mind for customised products</li>
                      <li>Errors in customer-provided personalisation details</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* UK Legal Notes */}
              <section className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4" style={{fontFamily: "'Poppins', sans-serif"}}>
                  UK Legal Notes:
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700 font-inter ml-4">
                  <li><strong>Standard orders:</strong> right to cancel within 14 days (Consumer Contracts Regulations 2013)</li>
                  <li><strong>Faulty products:</strong> must be reported within 30 days (Consumer Rights Act 2015)</li>
                  <li><strong>Customised products:</strong> cancellation right does not apply</li>
                </ul>
              </section>

              {/* Contact Information */}
              <section className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded mt-8">
                <p className="text-gray-700 leading-relaxed mb-2 font-inter">
                  If you find there is an issue with your item, please contact us at{' '}
                  <a 
                    href="mailto:thehappycase.shop@gmail.com" 
                    className="text-blue-600 hover:text-blue-800 underline font-inter font-semibold"
                  >
                    thehappycase.shop@gmail.com
                  </a>
                  .
                </p>
                <p className="text-gray-700 leading-relaxed font-inter">
                  Please allow us to reply in 5 working days and we will do our best to assist you.
                </p>
                <p className="text-gray-700 mt-3 font-semibold font-inter">
                  Thanks for understanding!
                </p>
              </section>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
