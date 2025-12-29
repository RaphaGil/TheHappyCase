import React from 'react';
import { useCurrency } from '../../../context/CurrencyContext';

const CharmGridItem = ({ charm, index, onAddToCart, isSelected, onSelect, isSoldOut = false, charmPrice }) => {
  const { formatPrice } = useCurrency();
  const pastelColors = ['bg-pink-50', 'bg-blue-50', 'bg-purple-50', 'bg-green-50', 'bg-yellow-50', 'bg-orange-50'];
  const pastelBorders = ['border-pink-100', 'border-blue-100', 'border-purple-100', 'border-green-100', 'border-yellow-100', 'border-orange-100'];
  const colorIndex = index % pastelColors.length;

  return (
    <div
      className="flex flex-col group"
    >
      <div className={`aspect-square mb-3 ${pastelColors[colorIndex]} flex items-center justify-center overflow-hidden md:border ${pastelBorders[colorIndex]} relative`}>
        <img
          src={charm.src}
          alt={charm.name}
          className={`w-full h-full object-contain p-4 transition-opacity duration-200 group-hover:opacity-80 ${isSoldOut ? 'opacity-50' : ''}`}
          loading="lazy"
          style={{
            transform: `scale(${charm.size !== undefined ? charm.size * 0.9 : 0.9})`
          }}
          onError={(e) => {
            if (e.target) {
              e.target.style.display = 'none';
            }
            if (e.target?.nextSibling) {
              e.target.nextSibling.style.display = 'flex';
            }
          }}
        />
        <div className="hidden w-full h-full items-center justify-center text-gray-400">
          <span className="text-4xl">🎁</span>
        </div>
        {/* Sold Out Overlay */}
        {isSoldOut && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-20">
            <span className="text-white text-xl font-medium uppercase tracking-wider font-inter">
              Sold Out
            </span>
          </div>
        )}
        {isSelected && !isSoldOut && (
          <div className="absolute -top-2 -right-2 bg-gray-900 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">
            ✓
          </div>
        )}
        {/* Add to Cart Button Overlay - Bottom right on mobile, bottom bar on desktop hover */}
        {onAddToCart && !isSoldOut && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(charm);
            }}
            className="absolute bottom-2 right-2 md:bottom-0 md:left-0 md:right-0 md:top-auto py-2 px-2 md:py-2 md:px-0 text-gray-900 md:border-t md:border-gray-200 bg-white md:bg-white rounded-full md:rounded-none shadow-md md:shadow-none transition-all duration-200 text-xs uppercase tracking-wider flex items-center justify-center opacity-100 translate-y-0 md:opacity-0 md:translate-y-full md:group-hover:opacity-100 md:group-hover:translate-y-0 hover:bg-gray-50 z-10 font-inter"
          >
            {/* Bag Icon - Visible on mobile only, hidden on md screens and up */}
            <svg className="w-5 h-5 md:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {/* Button Text - Visible on desktop only */}
            <span className="hidden md:inline">Add to Cart</span>
          </button>
        )}
      </div>
      <h3 className={`text-sm text-center mb-1 font-light font-inter ${isSoldOut ? 'text-gray-500' : 'text-gray-700'}`}>
        {charm.name}
      </h3>
      <div className="text-center">
        <span className={`text-sm font-medium font-inter ${isSoldOut ? 'text-gray-500' : 'text-gray-900'}`}>
          {formatPrice(charmPrice)}
        </span>
      </div>
    </div>
  );
};

export default CharmGridItem;

