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
  onAddToCart
}) => {
  const router = useRouter();

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-light text-gray-900 font-inter">£{selectedCase.basePrice.toFixed(2)}</span>
      </div>
      
      {/* Quantity Controls and Add to Cart */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          {/* Quantity Controls */}
          <div className="flex items-center border border-gray-200 rounded-sm h-[42px]">
            <button
              onClick={onDecrementQuantity}
              disabled={quantity <= 1}
              className="h-full px-3 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Decrease quantity"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 12H4" />
              </svg>
            </button>
            <span className="text-sm font-medium text-gray-900 text-center font-inter min-w-[2.5rem] px-3 b flex items-center justify-center h-full">
              {quantity}
            </span>
            <button
              onClick={onIncrementQuantity}
              className="h-full px-3 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Increase quantity"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v16m8-8H4" />
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
              className="bg-btn-success hover:bg-btn-success-hover text-btn-success-text border border-btn-success-border hover:border-btn-success-hover transition-all duration-200"
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
          router.push(`/CreateYours?case=${selectedCaseType}&color=${selectedColor}`);
        }}
        className="w-full py-3 text-sm uppercase tracking-wider font-inter bg-btn-primary-blue hover:bg-btn-primary-blue-hover text-btn-primary-blue-text border border-btn-primary-blue-border hover:border-btn-primary-blue-hover transition-all duration-200"
      >
        PERSONALIZE
      </button>
    </div>
  );
};

export default PriceAndCTA;
