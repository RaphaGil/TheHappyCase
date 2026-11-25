'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import AddToCartBtn from '../../AddToCartBtn';

const PriceAndCTA = ({
  selectedCase,
  selectedCaseType,
  selectedColor,
  quantity,
  quantityError,
  currentImage,
  isSelectedColorSoldOut,
  onIncrementQuantity,
  onDecrementQuantity,
  onAddToCart,
  showPrice = true,
}) => {
  const router = useRouter();

  return (
    <div className="space-y-3 sm:space-y-4">
      {showPrice && (
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-semibold text-gray-900 font-inter">£{selectedCase.basePrice.toFixed(2)}</span>
        </div>
      )}
      
      {/* Quantity Controls and Add to Cart */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          {/* Quantity Controls */}
          <div className="flex items-center rounded-full border border-[#30279f]/20 h-[46px] px-1">
            <button
              onClick={onDecrementQuantity}
              disabled={quantity <= 1}
              className="h-9 w-9 rounded-full flex items-center justify-center text-[#30279f] hover:bg-[#eef0ff] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Decrease quantity"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <span className="text-sm font-semibold text-gray-900 text-center font-inter min-w-[2rem] flex items-center justify-center h-full">
              {quantity}
            </span>
            <button
              onClick={onIncrementQuantity}
              className="h-9 w-9 rounded-full flex items-center justify-center text-[#30279f] hover:bg-[#eef0ff] transition-colors"
              aria-label="Increase quantity"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          {/* Add to Cart Button */}
          <div className="flex-1">
            <AddToCartBtn
              product={{
                name: selectedCase?.name || 'Passport Case',
                caseType: selectedCaseType,
                caseName: selectedCase?.name || 'Passport Case',
                color: selectedColor,
                basePrice: selectedCase?.basePrice || 0,
                casePrice: selectedCase?.basePrice || 0,
                totalPrice: selectedCase?.basePrice || 0,
                price: selectedCase?.basePrice || 0,
                image: currentImage,
                caseImage: currentImage,
                quantity: quantity
              }}
              disabled={isSelectedColorSoldOut()}
              onAdd={onAddToCart}
              className=""
            />
          </div>
        </div>
        
        {/* Inline Error Message */}
        {quantityError && (
          <p className="text-sm text-red-600 font-inter ml-1">
            {quantityError}
          </p>
        )}
      </div>

      <button
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'instant' });
          router.push(`/custom-passport?case=${selectedCaseType}&color=${selectedColor}`);
        }}
        className="btn-happy w-full py-3 text-sm font-inter"
      >
        Personalise
      </button>
    </div>
  );
};

export default PriceAndCTA;
