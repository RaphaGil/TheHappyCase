import React, { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

// Exchange rates (base currency: GBP)
const exchangeRates = {
  GBP: 1.0,
  USD: 1.27,
  EUR: 1.17,
  CAD: 1.72,
  AUD: 1.92,
  BRL: 6.35,
  // European non-EUR currencies
  PLN: 5.05,  // Polish Zloty
  CZK: 29.5,  // Czech Koruna
  HUF: 450,   // Hungarian Forint
  RON: 5.85,  // Romanian Leu
  BGN: 2.29,  // Bulgarian Lev
  DKK: 8.7,   // Danish Krone
  SEK: 13.2,  // Swedish Krona
  CHF: 1.12,  // Swiss Franc
  NOK: 13.5,  // Norwegian Krone
};

const currencySymbols = {
  GBP: '£',
  USD: '$',
  EUR: '€',
  CAD: 'C$',
  AUD: 'A$',
  BRL: 'R$',
  // European non-EUR currencies
  PLN: 'zł',
  CZK: 'Kč',
  HUF: 'Ft',
  RON: 'lei',
  BGN: 'лв',
  DKK: 'kr',
  SEK: 'kr',
  CHF: 'CHF',
  NOK: 'kr',
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(() => {
    // Get from localStorage or default to GBP
    const saved = localStorage.getItem('selectedCurrency');
    return saved || 'GBP';
  });

  useEffect(() => {
    // Save to localStorage when currency changes
    localStorage.setItem('selectedCurrency', currency);
  }, [currency]);

  const convertPrice = (priceInGBP) => {
    const rate = exchangeRates[currency] || 1.0;
    return priceInGBP * rate;
  };

  const formatPrice = (priceInGBP, decimals = 2) => {
    const convertedPrice = convertPrice(priceInGBP);
    const symbol = currencySymbols[currency] || '£';
    return `${symbol}${convertedPrice.toFixed(decimals)}`;
  };

  const value = {
    currency,
    setCurrency,
    convertPrice,
    formatPrice,
    currencySymbol: currencySymbols[currency] || '£',
    exchangeRates,
    currencySymbols,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

