import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutHeader = ({ cartIconSrc }) => {
  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 lg:px-6 py-5">
        <Link to="/" className="hover:opacity-90 transition-opacity duration-300" aria-label="HappyCase home">
          <div
            className="flex flex-col cursor-pointer transition-all duration-300 text-gray-900 font-fredoka"
          >
            <span className="text-[10px] md:text-xs font-bold leading-tight tracking-[0.35em] text-blue-900 uppercase">
              THE
            </span>
            <span className="text-xl md:text-3xl font-bold leading-none flex items-center gap-0 text-blue-900 uppercase">
              {'HAPPY'.split('').map((letter, index) => (
                <span
                  key={index}
                  className="inline-block animate-smile-curve"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animationDuration: '2s',
                  }}
                >
                  {letter}
                </span>
              ))}
            </span>
            <span className="text-end text-[10px] md:text-xs font-bold leading-tight tracking-[0.35em] text-blue-900 uppercase">
              CASE
            </span>
          </div>
          <style>{`
            @keyframes smileCurve {
              0%, 100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(var(--curve-height));
              }
            }
            .animate-smile-curve {
              animation: smileCurve 2s ease-in-out infinite;
              display: inline-block;
            }
            .animate-smile-curve:nth-child(1) {
              --curve-height: 0px;
            }
            .animate-smile-curve:nth-child(2) {
              --curve-height: 4px;
            }
            .animate-smile-curve:nth-child(3) {
              --curve-height: 8px;
            }
            .animate-smile-curve:nth-child(4) {
              --curve-height: 4px;
            }
            .animate-smile-curve:nth-child(5) {
              --curve-height: 0px;
            }
          `}</style>
        </Link>
        <Link
          to="/cart"
          className="relative flex items-center justify-center p-2 rounded-full 0 hover:border-gray-400 transition"
          aria-label="View cart"
        >
          <img src={cartIconSrc} alt="Cart" className="h-6 w-6" loading="lazy" />
        </Link>
      </div>
    </div>
  );
};

export default CheckoutHeader;

