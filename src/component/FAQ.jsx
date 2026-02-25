'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const FAQ_ITEMS = [
  {
    id: 'products',
    question: 'What products does The Happy Case offer?',
    answer: 'We offer custom passport cases in three styles: Economy (slim and lightweight), First Class (extra space for stamps and visas), and Business Class (premium luxury design). Firts and Business class cases are RFID-protected, water-resistant. All cases can be personalized with charms, flags and custom text. We also sell travel-themed charms in bronze and colorful designs.',
  },
  {
    id: 'separately',
    question: 'Is it possible to get a passport case or charms separately?',
    answer: 'Yes! You can order a passport case on its own, or charms alone. Use Create Yours to design a case with or without charms, or browse our Charms pages to add charms to an existing case. Charms can be purchased separately if you already have a case and want to refresh your look.',
  },
  {
    id: 'customization',
    question: 'How does customization work?',
    answer: 'Use our Create Yours designer to build your passport case. Choose your case style and color from our collection (bronze, colorful, or flags), and add custom text (name, initials, or a short phrase). Preview your design before adding to cart. Customised products are made to order and cannot be returned unless faulty.',
  },
  {
    id: 'shipping',
    question: 'How long does shipping take?',
    answer: 'Processing time is typically 3–5 business days. Delivery times vary by destination: UK orders usually arrive within 5–7 business days; international orders can take 7–14 business days depending on location. You\'ll receive tracking information once your order ships. See our Shipping page for full details.',
  },
  {
    id: 'returns',
    question: 'Can I return or exchange my order?',
    answer: 'Customised products generally cannot be returned unless there is a manufacturing fault or we sent the wrong design. Non-customised items can be returned within 14 days of delivery if unused and in original packaging. Contact us at thehappycase.shop@gmail.com with your order number and reason before returning. See our Returns & Refund Policy for full details.',
  },
  {
    id: 'payment',
    question: 'What payment methods do you accept?',
    answer: 'We accept Visa, Mastercard, American Express, PayPal, and Klarna. All payments are processed securely through Stripe. Your card details are never stored on our servers.',
  },
  {
    id: 'passport-size',
    question: 'Will my passport fit?',
    answer: 'Our cases are designed for standard passport sizes (e.g. UK, US, EU). If you have an unusual passport size, please contact us before ordering. We can advise on fit for specific passport types.',
  },
  {
    id: 'leather',
    question: 'Is the passport holder made of real leather?',
    answer: 'Yes, the Business and First Class are made by genuine leather.Economy class is made by PU leather',
  },
  {
    id: 'care',
    question: 'How do I care for my passport case?',
    answer: 'Wipe with a damp cloth if needed. Avoid submerging in water or using harsh chemicals. Keep away from direct heat. Charms are durable but may tarnish over time with heavy use—this is normal for metallic finishes.',
  },
  {
    id: 'change-address',
    question: 'Can I change my address after ordering?',
    answer: 'Contact us as soon as possible at thehappycase.shop@gmail.com with your order number and the correct address. If your order hasn\'t been dispatched yet, we\'ll do our best to update it. Once an order has shipped, we cannot change the delivery address. Please double-check your address before completing checkout.',
  },
  {
    id: 'order-status',
    question: 'How can I track my order?',
    answer: 'After placing your order, you\'ll receive a confirmation email. When your order ships, we\'ll send tracking information. You can also log in to My Orders (if you have an account) to view order status and tracking.',
  },
  {
    id: 'contact',
    question: 'How do I contact you?',
    answer: 'Email us at thehappycase.shop@gmail.com. We aim to reply within 5 working days. Include your order number and any photos if you\'re reporting an issue. We\'re happy to help with design questions, sizing, or any concerns.',
  },
];

const FAQ = () => {
  const pathname = usePathname();
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const toggle = (id) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-title text-gray-900 tracking-title mb-1 md:mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Frequently Asked Questions
          </h1>
          <div className="w-16 sm:w-20 md:w-24 h-px bg-gray-200 mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-3xl mx-auto mt-4 font-inter">
            Find answers to common questions about our custom passport cases, ordering, shipping, and more.
          </p>
        </div>

        <div className="max-w-4xl mx-auto md:px-6 py-16">
          <div className="bg-white rounded-lg md:p-12">
            <div className="space-y-4">
              {FAQ_ITEMS.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggle(item.id)}
                    className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                  >
                    <h2 className="text-lg font-semibold text-gray-900 pr-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      {item.question}
                    </h2>
                    <svg
                      className={`w-5 h-5 text-gray-600 flex-shrink-0 transform transition-transform ${
                        openId === item.id ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openId === item.id && (
                    <div className="p-6 bg-white border-t border-gray-200">
                      <p className="text-gray-700 leading-relaxed font-inter">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Contact CTA */}
            <section className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded mt-8">
              <p className="text-gray-700 leading-relaxed mb-2 font-inter">
                Still have questions? Reach out at{' '}
                <a
                  href="mailto:thehappycase.shop@gmail.com"
                  className="text-blue-600 hover:text-blue-800 underline font-inter font-semibold"
                >
                  thehappycase.shop@gmail.com
                </a>
                . We&apos;re here to help!
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default FAQ;
