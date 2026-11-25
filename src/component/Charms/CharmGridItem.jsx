import React from 'react';
import { normalizeImagePath } from '../../utils/imagePath';

const CharmGridItem = ({ charm, index, onAddToCart, isSelected, onSelect, isSoldOut = false, maxAvailable = null, isLowStock = false, charmPrice }) => {
  // Lazy loading: all charm images use lazy to defer off-screen loading
  const loadingStrategy = 'lazy';
  const fetchPriority = index < 4 ? 'high' : 'low';

  // Calculate scale to prevent layout shift
  const scale = charm.size !== undefined ? charm.size * 0.9 : 0.9;

  return (
    <div className="card-happy group flex h-full flex-col overflow-hidden">
      <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-white">
        <img
          src={normalizeImagePath(charm.src)}
          alt={charm.name}
          className={`w-full h-full object-contain p-5 transition-transform duration-300 group-hover:scale-105 ${isSoldOut ? 'opacity-40' : ''}`}
          loading={loadingStrategy}
          fetchPriority={fetchPriority}
          decoding="async"
          width="200"
          height="200"
          style={{
            transform: `scale(${scale})`,
            willChange: index < 4 ? 'transform' : 'auto',
            backgroundColor: 'transparent',
          }}
          onError={(e) => {
            if (e.target) {
              e.target.style.display = 'none';
            }
            if (e.target?.nextSibling) {
              e.target.nextSibling.style.display = 'flex';
            }
          }}
          onLoad={(e) => {
            // Force Safari to display the image
            if (e.target) {
              e.target.style.visibility = 'visible';
            }
          }}
        />
        <div className="hidden w-full h-full items-center justify-center text-gray-400">
          <span className="text-4xl">🎁</span>
        </div>
        {/* Sold Out Overlay */}
        {isSoldOut && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/60">
            <span className="rounded-full bg-gray-900/80 px-3.5 py-1 text-xs font-semibold text-white font-inter">
              Sold out
            </span>
          </div>
        )}
        {/* New badge */}
        {charm.badge && !isSoldOut && (
          <div className="absolute top-3 left-3 z-10 rounded-full bg-[#30279f] px-2.5 py-0.5 text-[11px] font-semibold text-[#ffd93d] font-inter">
            {charm.badge}
          </div>
        )}
        {/* Low stock badge - show available quantity when 1-2 units */}
        {isLowStock && !isSoldOut && maxAvailable != null && (
          <div className="absolute top-3 right-3 z-10 rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-semibold text-amber-800 font-inter">
            {maxAvailable === 1 ? 'Only 1 left' : `${maxAvailable} available`}
          </div>
        )}
        {isSelected && !isSoldOut && (
          <div className="absolute top-2 right-2 bg-[#30279f] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">
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
            className="absolute bottom-2.5 right-2.5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#ffd93d] text-[#30279f] shadow-md transition-all duration-200 hover:bg-[#f5c400] md:bottom-3 md:left-3 md:right-3 md:h-auto md:w-auto md:py-2.5 md:text-sm md:font-semibold md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 md:focus-visible:opacity-100 md:focus-visible:translate-y-0 font-inter"
            aria-label={`Add ${charm.name} to cart`}
          >
            {/* Bag Icon - Visible on mobile only, hidden on md screens and up */}
            <svg className="w-5 h-5 md:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {/* Button Text - Visible on desktop only */}
            <span className="hidden md:inline">Add to Cart</span>
          </button>
        )}
      </div>
      <div className="flex flex-1 flex-col border-t border-[#30279f]/5 px-3.5 py-3">
        <p className={`text-sm font-medium font-inter line-clamp-2 ${isSoldOut ? 'text-gray-400' : 'text-gray-900'}`}>
          {charm.name}
        </p>
      </div>
    </div>
  );
};

export default CharmGridItem;

