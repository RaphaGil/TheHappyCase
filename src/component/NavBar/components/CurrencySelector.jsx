import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useCurrency } from '../../../context/CurrencyContext';
import { currencyToCountry, currencyToFlag, mainCurrencies, europeanCountries } from '../../../data/currencyConstants';

const CurrencySelector = ({ variant = 'desktop', onSelect }) => {
  const { currency, setCurrency, currencySymbol } = useCurrency();
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [showEuropeanCountries, setShowEuropeanCountries] = useState(false);
  const currencyDropdownRef = useRef(null);

  const getCurrencyDisplayWithFlag = () => {
    const flag = currencyToFlag[currency] || '';
    const country = currencyToCountry[currency] || currency;
    return `${flag} ${currencySymbol} ${currency} - ${country}`;
  };

  const handleCurrencySelect = (currencyCode) => {
    setCurrency(currencyCode);
    setIsCurrencyDropdownOpen(false);
    setShowEuropeanCountries(false);
    if (onSelect) {
      onSelect();
    }
  };

  const toggleCurrencyDropdown = () => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isCurrencyDropdownOpen && currencyDropdownRef.current && !currencyDropdownRef.current.contains(event.target)) {
        setIsCurrencyDropdownOpen(false);
        setShowEuropeanCountries(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCurrencyDropdownOpen]);

  const isMobile = variant === 'mobile';
  const isEuropeanCurrency = ['PLN', 'CZK', 'HUF', 'RON', 'BGN', 'DKK', 'SEK', 'CHF', 'NOK'].includes(currency);

  if (isMobile) {
    return (
      <div className="relative" ref={currencyDropdownRef}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleCurrencyDropdown();
          }}
          className={`w-full text-left hover:text-gray-900 font-light transition-all duration-200 flex items-center justify-between text-sm uppercase tracking-wider font-inter ${isCurrencyDropdownOpen ? 'bg-gray-50' : ''}`}
          style={{color: '#6b7280'}}
        >
          <span>{getCurrencyDisplayWithFlag()}</span>
          <FontAwesomeIcon icon={faChevronDown} className={`ml-2 text-base transition-transform duration-200 ${isCurrencyDropdownOpen ? 'rotate-180' : ''}`} />
        </button>
        {isCurrencyDropdownOpen && (
          <div className="bg-gray-50 border-t border-gray-100 transition-all duration-200 max-h-[70vh] overflow-y-auto w-full mt-1" onClick={(e) => e.stopPropagation()}>
            {mainCurrencies.map((curr) => (
              <button
                key={curr.code}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCurrencySelect(curr.code);
                }}
                className={`w-full text-left px-8 py-2.5 text-sm transition-colors font-light font-inter ${currency === curr.code ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
                style={{color: currency === curr.code ? '#111827' : '#374151'}}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{curr.flag}</span>
                    <span>{curr.symbol} {curr.code}</span>
                  </div>
                  {curr.name !== 'Euro' && <span className="text-sm text-gray-500 font-light">{curr.name}</span>}
                </div>
              </button>
            ))}
            
            {/* Other European Countries Dropdown */}
            <div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowEuropeanCountries(!showEuropeanCountries);
                }}
                className={`w-full text-left px-8 py-2.5 text-sm transition-colors font-light font-inter ${isEuropeanCurrency ? 'bg-gray-100' : 'hover:bg-gray-100'} flex items-center justify-between`}
                style={{color: isEuropeanCurrency ? '#111827' : '#374151'}}
              >
                <div className="flex items-center justify-between flex-1">
                  <span className="text-sm text-gray-500 font-light">Other European Countries</span>
                </div>
                <FontAwesomeIcon icon={faChevronDown} className={`ml-2 text-base transition-transform duration-200 ${showEuropeanCountries ? 'rotate-180' : ''}`} />
              </button>
              {showEuropeanCountries && (
                <div className="pl-8 max-h-64 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                  {europeanCountries.map((country) => (
                    <button
                      key={country.code}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCurrencySelect(country.code);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors font-light font-inter ${currency === country.code ? 'bg-gray-100' : 'hover:bg-gray-100'} flex items-center justify-between`}
                      style={{color: currency === country.code ? '#111827' : '#374151'}}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{country.flag}</span>
                        <span>{country.symbol} {country.code}</span>
                      </div>
                      <span className="text-sm text-gray-500 font-light">{country.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Desktop variant
  return (
    <div className="relative" ref={currencyDropdownRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleCurrencyDropdown();
        }}
        className="px-2 md:px-3 py-1 text-gray-700 hover:text-gray-900 focus:outline-none transition-colors flex items-center text-[12px] md:text-xs font-inter"
        aria-label="Select currency"
      >
        <span className="mr-1 whitespace-nowrap">{getCurrencyDisplayWithFlag()}</span>
        <FontAwesomeIcon icon={faChevronDown} className={`text-[6px] md:text-xs transition-transform ml-1 ${isCurrencyDropdownOpen ? 'rotate-180' : ''}`} />
      </button>
      {isCurrencyDropdownOpen && (
        <div className="absolute right-0 mt-2 bg-white min-w-40 max-h-[80vh] overflow-y-auto" style={{zIndex: 9999}} onClick={(e) => e.stopPropagation()}>
          {mainCurrencies.map((curr) => (
            <button
              key={curr.code}
              onClick={(e) => {
                e.stopPropagation();
                handleCurrencySelect(curr.code);
              }}
              className={`w-full text-left px-4 py-2 text-xs transition-colors font-inter ${currency === curr.code ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
              style={{color: currency === curr.code ? '#111827' : '#6b7280'}}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>{curr.flag}</span>
                  <span>{curr.symbol} {curr.code}</span>
                </div>
                {curr.name !== 'Euro' && <span className="text-xs text-gray-500">{curr.name}</span>}
              </div>
            </button>
          ))}
          
          {/* Other European Countries Dropdown */}
          <div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowEuropeanCountries(!showEuropeanCountries);
              }}
              className={`w-full text-left px-4 py-2 text-xs transition-colors font-inter ${isEuropeanCurrency ? 'bg-gray-50 font-medium' : 'hover:bg-gray-50'} flex items-center justify-between`}
              style={{color: isEuropeanCurrency ? '#111827' : '#6b7280'}}
            >
              <div className="flex items-center justify-between flex-1">
                <span className="text-xs text-gray-500">Other European Countries</span>
              </div>
              <FontAwesomeIcon icon={faChevronDown} className={`ml-2 text-xs transition-transform ${showEuropeanCountries ? 'rotate-180' : ''}`} />
            </button>
            {showEuropeanCountries && (
              <div className="pl-4 ml-2 max-h-64 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                {europeanCountries.map((country) => (
                  <button
                    key={country.code}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCurrencySelect(country.code);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs transition-colors font-inter ${currency === country.code ? 'bg-gray-50 font-medium' : 'hover:bg-gray-50'} flex items-center justify-between`}
                    style={{color: currency === country.code ? '#111827' : '#6b7280'}}
                  >
                    <div className="flex items-center gap-2">
                      <span>{country.flag}</span>
                      <span>{country.symbol} {country.code}</span>
                    </div>
                    <span className="text-xs text-gray-500">{country.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencySelector;


