import React, { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

// Default exchange rates (fallback if API fails)
const defaultExchangeRates = {
  GBP: 1.0,
  EUR: 1.17,
};

const currencySymbols = {
  GBP: '£',
  EUR: '€',
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(() => {
    // Get from localStorage or default to GBP
    // If USD is saved, reset to GBP since USD is no longer available
    const saved = localStorage.getItem('selectedCurrency');
    return (saved && saved !== 'USD') ? saved : 'GBP';
  });

  const [exchangeRates, setExchangeRates] = useState(defaultExchangeRates);
  const [ratesLoading, setRatesLoading] = useState(false);

  // Fetch exchange rates from backend API (which uses Stripe-compatible rates)
  useEffect(() => {
    // Helper function to fetch rates directly from external API
    const fetchDirectRates = async () => {
      const directResponse = await fetch('https://api.exchangerate-api.com/v4/latest/GBP');
      if (directResponse.ok) {
        const contentType = directResponse.headers.get('content-type');
        const isJson = contentType && contentType.includes('application/json');
        
        if (isJson) {
          try {
            const directData = await directResponse.json();
            const rates = {
              GBP: 1.0,
              EUR: directData.rates?.EUR || defaultExchangeRates.EUR,
            };
            setExchangeRates(rates);
            console.log('✅ Exchange rates fetched from direct API:', rates);
          } catch (jsonError) {
            throw new Error(`Failed to parse direct API response: ${jsonError.message}`);
          }
        } else {
          throw new Error('Direct API returned non-JSON response');
        }
      } else {
        throw new Error(`Failed to fetch rates: ${directResponse.status}`);
      }
    };

    const fetchExchangeRates = async () => {
      setRatesLoading(true);
      try {
        // Check if we should try the backend endpoint
        // Only try backend if VITE_API_URL is set or we're on localhost (Express server)
        const apiUrl = import.meta.env.VITE_API_URL || '';
        const isLocalhost = window.location.origin.includes('localhost') || window.location.origin.includes('127.0.0.1');
        const shouldTryBackend = apiUrl || isLocalhost;
        
        if (shouldTryBackend) {
          const baseUrl = apiUrl || 'http://localhost:3001';
          const endpoint = `${baseUrl}/api/exchange-rates`;
          
          try {
            const response = await fetch(endpoint);
            
            // Check if response is JSON before parsing
            const contentType = response.headers.get('content-type');
            const isJson = contentType && contentType.includes('application/json');
            
            if (response.ok && isJson) {
              try {
                const data = await response.json();
                if (data.success && data.rates) {
                  setExchangeRates(data.rates);
                  console.log('✅ Exchange rates fetched from backend:', data.rates);
                  return; // Success, exit early
                }
              } catch (jsonError) {
                // If JSON parsing fails, fallback to direct API
                // This is expected if backend returns invalid JSON
                if (import.meta.env.DEV && response.status === 200) {
                  // Only log in dev if we got a 200 but couldn't parse it
                  console.debug('ℹ️ Failed to parse backend response as JSON, using direct API:', jsonError.message);
                }
              }
            } else if (!response.ok) {
              // Backend returned an error status (404, 500, etc.) - silently fallback
              // This is expected when backend endpoint doesn't exist or server is down
            } else if (!isJson) {
              // Backend returned non-JSON (e.g., HTML error page) - silently fallback
              // This is expected in production when using Netlify Functions or if backend is unavailable
            }
          } catch (backendError) {
            // Backend fetch failed (network error, CORS, etc.) - silently fallback
            // This is expected in production when backend isn't available
            // Only log network errors in development
            if (import.meta.env.DEV && backendError.name !== 'AbortError') {
              console.debug('ℹ️ Backend endpoint unavailable, using direct API:', backendError.message);
            }
          }
        }
        
        // Fallback to direct API (either backend not available or backend failed)
        await fetchDirectRates();
      } catch (error) {
        console.error('❌ Error fetching exchange rates:', error);
        console.log('⚠️ Using default exchange rates:', defaultExchangeRates);
        setExchangeRates(defaultExchangeRates);
      } finally {
        setRatesLoading(false);
      }
    };

    // Fetch rates on mount and refresh every hour
    fetchExchangeRates();
    const interval = setInterval(fetchExchangeRates, 60 * 60 * 1000); // 1 hour

    return () => clearInterval(interval);
  }, []);

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
    ratesLoading,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

