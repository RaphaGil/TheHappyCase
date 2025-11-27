import React from 'react';
import { useCurrency } from '../../../context/CurrencyContext';

const CharmGridItem = ({ charm, index, onAddToCart, isSelected, onSelect }) => {
  const { formatPrice } = useCurrency();
  const pastelColors = ['bg-pink-50', 'bg-blue-50', 'bg-purple-50', 'bg-green-50', 'bg-yellow-50', 'bg-orange-50'];
  const pastelBorders = ['border-pink-100', 'border-blue-100', 'border-purple-100', 'border-green-100', 'border-yellow-100', 'border-orange-100'];
  const colorIndex = index % pastelColors.length;

  return (
    <div
      className={`flex flex-col group ${onSelect ? 'cursor-pointer' : ''}`}
      onClick={onSelect}
    >
      <div className={`aspect-square mb-3 ${pastelColors[colorIndex]} flex items-center justify-center overflow-hidden border ${pastelBorders[colorIndex]} relative`}>
        <img
          src={charm.src}
          alt={charm.name}
          className="w-full h-full object-contain p-4 transition-opacity duration-200 group-hover:opacity-80"
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
        {isSelected && (
          <div className="absolute -top-2 -right-2 bg-gray-900 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">
            ✓
          </div>
        )}
        {/* Add to Cart Button Overlay */}
        {onAddToCart && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(charm);
            }}
            className="absolute bottom-0 left-0 right-0 py-2 text-gray-900 border-t border-gray-200 bg-white transition-all duration-200 text-xs uppercase tracking-wider flex items-center justify-center opacity-100 translate-y-0 md:opacity-0 md:translate-y-full md:group-hover:opacity-100 md:group-hover:translate-y-0 hover:bg-gray-50 font-inter"
          >
            <svg className="w-4 h-4 md:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="hidden md:inline">Add to Cart</span>
          </button>
        )}
      </div>
      <h3 className="text-sm text-gray-700 text-center mb-1 font-light font-inter">
        {charm.name}
      </h3>
      <div className="text-center">
        <span className="text-sm text-gray-900 font-medium font-inter">
          {formatPrice(charm.price || 2.0)}
        </span>
      </div>
    </div>
  );
};

export default CharmGridItem;

