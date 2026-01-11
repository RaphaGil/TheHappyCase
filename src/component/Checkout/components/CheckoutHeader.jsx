import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';

const CheckoutHeader = () => {
  const { getTotalQuantity } = useCart();
  const totalQuantity = getTotalQuantity();

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
          className="relative flex items-center justify-center p-2 text-gray-900 hover:text-gray-700 transition-colors z-10"
          aria-label="Go to cart"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            className="w-6 h-6"
            fill="currentColor"
          >
            <path d="M8 64C3.6 64 0 67.6 0 72C0 76.4 3.6 80 8 80L53.7 80C65.1 80 75 88.1 77.2 99.4L136.6 402.8C141.7 429.1 164.8 448 191.6 448L488 448C492.4 448 496 444.4 496 440C496 435.6 492.4 432 488 432L191.5 432C172.4 432 155.9 418.5 152.2 399.7L142.9 352L461.2 352C494.7 352 523.7 328.9 531.3 296.4L566.6 145.1C572.5 120 553.4 96 527.7 96L92.8 96C89 77.4 72.7 64 53.7 64L8 64zM96 112L527.7 112C543.2 112 554.6 126.4 551.1 141.5L515.8 292.7C509.9 318 487.3 336 461.3 336L139.8 336L96 112zM176 528C176 510.3 190.3 496 208 496C225.7 496 240 510.3 240 528C240 545.7 225.7 560 208 560C190.3 560 176 545.7 176 528zM256 528C256 501.5 234.5 480 208 480C181.5 480 160 501.5 160 528C160 554.5 181.5 576 208 576C234.5 576 256 554.5 256 528zM432 496C449.7 496 464 510.3 464 528C464 545.7 449.7 560 432 560C414.3 560 400 545.7 400 528C400 510.3 414.3 496 432 496zM432 576C458.5 576 480 554.5 480 528C480 501.5 458.5 480 432 480C405.5 480 384 501.5 384 528C384 554.5 405.5 576 432 576z"/>
          </svg>
          {totalQuantity > 0 && (
            <span className="absolute top-0 right-0 bg-gray-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-light">
              {totalQuantity}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
};

export default CheckoutHeader;

