'use client';

import React, { useState, useEffect } from 'react';
import { quotes } from '../../../data/data';

const ROTATE_INTERVAL_MS = 4500;

const QuoteSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % quotes.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full my-20 md:my-28 py-16 md:py-20 bg-btn-light-blue border-y border-blue-100">
      <style>{`
        @keyframes quote-fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .quote-fade-in {
          animation: quote-fade-in 0.5s ease-out forwards;
        }
      `}</style>
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className="w-16 h-0.5 bg-btn-primary-blue mx-auto mb-8" />
        <blockquote className="min-h-[4.5rem] md:min-h-[5rem] lg:min-h-[5.5rem] flex items-center justify-center">
          <p
            key={index}
            className="text-gray-800 text-2xl md:text-3xl lg:text-4xl font-light font-inter tracking-tight leading-snug quote-fade-in"
          >
            {quotes[index]}
          </p>
        </blockquote>
        <div className="w-16 h-0.5 bg-btn-primary-blue mx-auto mt-8" />
        <div className="flex justify-center gap-1.5 mt-6" aria-hidden="true">
          {quotes.map((_, i) => (
            <span
              key={i}
              className={`inline-block w-2 h-2 rounded-full transition-colors ${
                i === index ? 'bg-btn-primary-blue' : 'bg-blue-200'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuoteSection;
