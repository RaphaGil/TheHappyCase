import React from 'react';
import { Link } from 'react-router-dom';
import { useCurrency } from '../../../context/CurrencyContext';
import AddToCartBtn from '../../../component/AddToCartBtn';

const PriceSummary = ({ 
  totalPrice, 
  caseBasePrice, 
  groupedPinsList, 
  showPriceBreakdown, 
  setShowPriceBreakdown,
  quantity,
  setQuantity,
  selectedCase,
  selectedCaseType,
  selectedColor,
  selectedPins,
  selectedCaseImage,
  pinsPrice,
  onAddToCart,
  onShowTerms,
  agreedToTerms,
  setAgreedToTerms,
  showTermsError,
  isMobile = false
}) => {
  const { formatPrice } = useCurrency();

  return (
      <div className={`${isMobile ? 'pt-0' : 'pt-6'} flex-shrink-0 relative z-0 ${isMobile ? '' : 'mt-auto'}`}>
        <div className={`flex flex-row justify-between items-center gap-2 ${isMobile ? 'mb-2' : 'mb-4'}`}>
          <h3 className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-900 font-medium`} style={{fontFamily: "'Poppins', sans-serif"}}>
            Subtotal: {formatPrice(totalPrice)}
          </h3>
        
        <button
          onClick={() => setShowPriceBreakdown(!showPriceBreakdown)}
          className={`${isMobile ? 'text-[10px]' : 'text-xs'} uppercase tracking-wider text-gray-500 hover:text-gray-900 border-b border-transparent hover:border-gray-300 transition-all duration-200`} 
          style={{fontFamily: "'Poppins', sans-serif"}}
        >
          {showPriceBreakdown ? 'Hide' : 'Details'}
        </button>
      </div>
      
      {/* Price Breakdown Dropdown */}
      {showPriceBreakdown && (
        <div className={`space-y-1 ${isMobile ? 'text-[10px] mb-2 pt-2' : 'text-xs mb-4 pt-4'} text-gray-600 border-t border-gray-100`}>
          <div className="flex justify-between">
            <span style={{fontFamily: "'Poppins', sans-serif"}}>Case:</span>
            <span style={{fontFamily: "'Poppins', sans-serif"}}>{formatPrice(caseBasePrice)}</span>
          </div>
          {groupedPinsList.map((pin, index) => (
            <div key={index} className="flex justify-between">
              <span style={{fontFamily: "'Poppins', sans-serif"}}>{pin.name}{pin.count > 1 ? ` (x${pin.count})` : ''}:</span>
              <span style={{fontFamily: "'Poppins', sans-serif"}}>{formatPrice(pin.price * pin.count)}</span>
            </div>
          ))}
        </div>
      )}
      
      {/* Terms Agreement Checkbox */}
      <div className={`${isMobile ? 'mt-2 mb-2' : 'mt-4 mb-4'}`}>
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="mt-0.5 w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900 focus:ring-2"
          />
          {/* Mobile: Simplified text */}
          <span className="text-[10px] md:text-xs text-gray-700 leading-relaxed md:hidden" style={{fontFamily: "'Poppins', sans-serif"}}>
            <button
              type="button"
              onClick={onShowTerms}
              className="text-gray-900 underline hover:text-gray-700 transition-colors"
            >
              Terms of Use
            </button>
          </span>
          {/* Desktop: Full text */}
          <span className="hidden md:block text-sm text-gray-700 leading-relaxed" style={{fontFamily: "'Poppins', sans-serif"}}>
            I agree to the{' '}
            <button
              type="button"
              onClick={onShowTerms}
              className="text-gray-900 underline hover:text-gray-700 transition-colors text-sm"
            >
              Terms of Use
            </button>
            {' '}and understand that it is my responsibility to create the passport case design, and that as items are handmade, they may vary.
          </span>
        </label>
        {/* Error message when trying to add to cart without accepting terms */}
        {showTermsError && (
          <div className="mt-2 text-[10px] md:text-xs text-red-600" style={{fontFamily: "'Poppins', sans-serif"}}>
            You must accept the terms to add items to cart.
          </div>
        )}
      </div>

      <div className={`${isMobile ? 'mt-2' : 'mt-4'} flex flex-row gap-2`}>
        <div className={`flex items-center border border-gray-200 rounded-sm ${isMobile ? 'p-0.5' : 'p-1'}`}>
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} flex items-center justify-center text-gray-600 hover:text-gray-900 transition-all duration-200`}
            aria-label="Decrease quantity"
          > 
            <svg className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 12H4" />
            </svg>
          </button>
          <span className={`${isMobile ? 'text-xs min-w-[1.5rem]' : 'text-sm min-w-[2rem]'} font-medium text-gray-900 text-center`} style={{fontFamily: "'Poppins', sans-serif"}}>
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} flex items-center justify-center text-gray-600 hover:text-gray-900 transition-all duration-200`}
            aria-label="Increase quantity"
          >
            <svg className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
       
        <div className="flex-1">
          <AddToCartBtn 
            product={{
              id: `custom-${Date.now()}`,
              name: `${selectedCase?.name || 'Custom Case'} with ${selectedPins.length} charms`,
              caseType: selectedCaseType,
              caseName: selectedCase?.name || 'Custom Case',
              color: selectedColor,
              pins: selectedPins.map(({ pin }) => pin),
              pinsDetails: selectedPins.map(({ pin }) => pin),
              basePrice: caseBasePrice,
              casePrice: caseBasePrice,
              pinsPrice: pinsPrice,
              totalPrice: parseFloat(totalPrice),
              price: parseFloat(totalPrice),
              image: selectedCaseImage,
              caseImage: selectedCaseImage,
              customDesign: true,
              quantity: quantity
            }}
            onAdd={onAddToCart}
            className="bg-green-600 hover:bg-green-700 text-white border-green-600 hover:border-green-700 cursor-pointer"
            disabled={false}
          />
        </div>
      </div>
      {!isMobile && (
        <p className="text-xs text-gray-500 text-center mt-4" style={{fontFamily: "'Poppins', sans-serif"}}>
          <Link to="/shipping" className="text-gray-600 hover:text-gray-900 underline">Shipping</Link> calculated at checkout.
        </p>
      )}
    </div>
  );
};

export default PriceSummary;

