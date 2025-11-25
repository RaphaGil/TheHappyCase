import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faTiktok, faFacebook } from '@fortawesome/free-brands-svg-icons';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [showEuropeanCountries, setShowEuropeanCountries] = useState(false);
  const { getTotalItems } = useCart();
  const { currency, setCurrency, currencySymbol, formatPrice } = useCurrency();
  const currencyDropdownRef = useRef(null);
  
  // Currency to country name mapping
  const currencyToCountry = {
    'GBP': 'UK',
    'USD': 'USA',
    'EUR': 'Euro',
    'BRL': 'Brazil',
    'CAD': 'Canada',
    'AUD': 'Australia',
    'PLN': 'Poland',
    'CZK': 'Czech Republic',
    'HUF': 'Hungary',
    'RON': 'Romania',
    'BGN': 'Bulgaria',
    'DKK': 'Denmark',
    'SEK': 'Sweden',
    'CHF': 'Switzerland',
    'NOK': 'Norway',
  };
  
  // Currency to flag emoji mapping
  const currencyToFlag = {
    'GBP': '🇬🇧',
    'USD': '🇺🇸',
    'EUR': '🇪🇺',
    'BRL': '🇧🇷',
    'CAD': '🇨🇦',
    'AUD': '🇦🇺',
    'PLN': '🇵🇱',
    'CZK': '🇨🇿',
    'HUF': '🇭🇺',
    'RON': '🇷🇴',
    'BGN': '🇧🇬',
    'DKK': '🇩🇰',
    'SEK': '🇸🇪',
    'CHF': '🇨🇭',
    'NOK': '🇳🇴',
  };

  const getCurrencyDisplayWithFlag = () => {
    const flag = currencyToFlag[currency] || '';
    const country = currencyToCountry[currency] || currency;
    return `${flag} ${currencySymbol} ${currency} - ${country}`;
  };
  
  // Promotional banner messages - reactive to currency changes
  const bannerMessages = useMemo(() => [
    "🌍 SHIP WORLDWIDE FROM THE UK",
    // "🚚 FREE DELIVERY WHEN YOU SPEND " + formatPrice(50),
    "🔒 WEBSITE 100% SAFE",
    "❤️ MADE WITH LOVE ",


  ], [formatPrice]); // eslint-disable-line react-hooks/exhaustive-deps
  
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  
  // Cycle through banner messages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => 
        (prevIndex + 1) % bannerMessages.length
      );
    }, 3000);
    
    return () => clearInterval(interval);
  }, [bannerMessages.length]);
  
  const toggleCurrencyDropdown = () => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      // Disable body scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        // Restore body scroll
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        // Restore scroll position
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  return (
    <>
      {/* Promotional Banner */}
      <div className="text-gray-700 text-center py-2 px-4 relative bg-yellow-100 border-b border-gray-100">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Left side - empty for balance */}
          <div className="lg:w-20"></div>
          
          {/* Center - Banner message */}
          <div className="flex-1 flex items-center justify-center">
          <div 
            key={currentBannerIndex}
              className="text-xs font-light"
            style={{fontFamily: "'Poppins', sans-serif"}}
          >
            {bannerMessages[currentBannerIndex]}
            </div>
          </div>
          
          {/* Right side - Currency Selector and Social Media */}
          <div className="hidden md:flex items-center justify-end gap-2 md:gap-3">
            {/* Social Media Icons */}
            <div className="flex items-center gap-2">
              <a
                href="https://instagram.com/thehappycase.store"
                target="_blank"
                rel="noopener noreferrer"
                className=" hover:text-gray-700 transition-colors"
                aria-label="Follow us on Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} className="text-md" />
              </a>
              <a
                href="https://tiktok.com/@thehappycase.store"
                target="_blank"
                rel="noopener noreferrer"
                className=" hover:text-gray-700 transition-colors"
                aria-label="Follow us on TikTok"
              >
                <FontAwesomeIcon icon={faTiktok} className="text-md" />
              </a>
              <a
                href="https://facebook.com/thehappycase"
                target="_blank"
                rel="noopener noreferrer"
                className=" hover:text-gray-700 transition-colors"
                aria-label="Follow us on Facebook"
              >
                <FontAwesomeIcon icon={faFacebook} className="text-md" />
              </a>
            </div>
            
            {/* Currency Selector */}
            <div className="relative" ref={currencyDropdownRef}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCurrencyDropdown();
                }}
                className="px-2 md:px-3 py-1 text-gray-700 hover:text-gray-900 focus:outline-none transition-colors flex items-center text-[12px] md:text-xs"
                aria-label="Select currency"
                style={{fontFamily: "'Poppins', sans-serif"}}
              >
                <span className="mr-1 whitespace-nowrap">{getCurrencyDisplayWithFlag()}</span>
                <FontAwesomeIcon icon={faChevronDown} className={`text-[6px] md:text-xs transition-transform ml-1 ${isCurrencyDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isCurrencyDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white  min-w-40 max-h-[80vh] overflow-y-auto" style={{zIndex: 9999}} onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={(e) => { 
                      e.stopPropagation();
                      setCurrency('GBP'); 
                      setIsCurrencyDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs transition-colors ${currency === 'GBP' ? 'bg-gray-50 ' : 'hover:bg-gray-50'}`}
                    style={{fontFamily: "'Poppins', sans-serif", color: currency === 'GBP' ? '#111827' : '#6b7280'}}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span>🇬🇧</span>
                        <span>£ GBP</span>
                      </div>
                      <span className="text-xs text-gray-500">UK</span>
                    </div>
                  </button>
                  <button
                    onClick={(e) => { 
                      e.stopPropagation();
                      setCurrency('USD'); 
                      setIsCurrencyDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs transition-colors ${currency === 'USD' ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                    style={{fontFamily: "'Poppins', sans-serif", color: currency === 'USD' ? '#111827' : '#6b7280'}}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span>🇺🇸</span>
                        <span>$ USD</span>
                      </div>
                      <span className="text-xs text-gray-500">USA</span>
                    </div>
                  </button>
                  {/* EUR Option */}
                  <button
                    onClick={(e) => { 
                      e.stopPropagation();
                      setCurrency('EUR'); 
                      setIsCurrencyDropdownOpen(false);
                      setShowEuropeanCountries(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs transition-colors ${currency === 'EUR' ? 'bg-gray-50' : 'hover:bg-gray-50'} flex items-center justify-between`}
                    style={{fontFamily: "'Poppins', sans-serif", color: currency === 'EUR' ? '#111827' : '#6b7280'}}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span>🇪🇺</span>
                        <span>€ EUR</span>
                      </div>
                    </div>
                  </button>
                  
                  {/* Other European Countries Dropdown */}
                  <div>
                    <button
                      onClick={(e) => { 
                        e.stopPropagation();
                        setShowEuropeanCountries(!showEuropeanCountries);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs transition-colors ${['PLN', 'CZK', 'HUF', 'RON', 'BGN', 'DKK', 'SEK', 'CHF', 'NOK'].includes(currency) ? 'bg-gray-50 font-medium' : 'hover:bg-gray-50'} flex items-center justify-between`}
                      style={{fontFamily: "'Poppins', sans-serif", color: ['PLN', 'CZK', 'HUF', 'RON', 'BGN', 'DKK', 'SEK', 'CHF', 'NOK'].includes(currency) ? '#111827' : '#6b7280'}}
                    >
                      <div className="flex items-center justify-between flex-1">
                        <span className="text-xs text-gray-500">Other European Countries</span>
                      </div>
                      <FontAwesomeIcon icon={faChevronDown} className={`ml-2 text-xs transition-transform ${showEuropeanCountries ? 'rotate-180' : ''}`} />
                    </button>
                    {showEuropeanCountries && (
                      <div className="pl-4 ml-2 max-h-64 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        {[
                          { code: 'PLN', symbol: 'zł', name: 'Poland', flag: '🇵🇱' },
                          { code: 'CZK', symbol: 'Kč', name: 'Czech Republic', flag: '🇨🇿' },
                          { code: 'HUF', symbol: 'Ft', name: 'Hungary', flag: '🇭🇺' },
                          { code: 'RON', symbol: 'lei', name: 'Romania', flag: '🇷🇴' },
                          { code: 'BGN', symbol: 'лв', name: 'Bulgaria', flag: '🇧🇬' },
                          { code: 'DKK', symbol: 'kr', name: 'Denmark', flag: '🇩🇰' },
                          { code: 'SEK', symbol: 'kr', name: 'Sweden', flag: '🇸🇪' },
                          { code: 'CHF', symbol: 'Fr', name: 'Switzerland', flag: '🇨🇭' },
                          { code: 'NOK', symbol: 'kr', name: 'Norway', flag: '🇳🇴' },
                        ].map((country) => (
                          <button
                            key={country.code}
                            onClick={(e) => { 
                              e.stopPropagation();
                              setCurrency(country.code); 
                              setIsCurrencyDropdownOpen(false);
                              setShowEuropeanCountries(false);
                            }}
                            className={`w-full text-left px-3 py-1.5 text-xs transition-colors ${currency === country.code ? 'bg-gray-50 font-medium' : 'hover:bg-gray-50'} flex items-center justify-between`}
                            style={{fontFamily: "'Poppins', sans-serif", color: currency === country.code ? '#111827' : '#6b7280'}}
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
                  <button
                    onClick={(e) => { 
                      e.stopPropagation();
                      setCurrency('BRL'); 
                      setIsCurrencyDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs transition-colors ${currency === 'BRL' ? 'bg-gray-50 ' : 'hover:bg-gray-50'}`}
                    style={{fontFamily: "'Poppins', sans-serif", color: currency === 'BRL' ? '#111827' : '#6b7280'}}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span>🇧🇷</span>
                        <span>R$ BRL</span>
                      </div>
                      <span className="text-xs text-gray-500">Brazil</span>
                    </div>
                  </button>
                  <button
                    onClick={(e) => { 
                      e.stopPropagation();
                      setCurrency('CAD'); 
                      setIsCurrencyDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs transition-colors ${currency === 'CAD' ? 'bg-gray-50 font-medium' : 'hover:bg-gray-50'}`}
                    style={{fontFamily: "'Poppins', sans-serif", color: currency === 'CAD' ? '#111827' : '#6b7280'}}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span>🇨🇦</span>
                        <span>C$ CAD</span>
                      </div>
                      <span className="text-xs text-gray-500">Canada</span>
                    </div>
                  </button>
                  <button
                    onClick={(e) => { 
                      e.stopPropagation();
                      setCurrency('AUD'); 
                      setIsCurrencyDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs transition-colors ${currency === 'AUD' ? 'bg-gray-50 font-medium' : 'hover:bg-gray-50'}`}
                    style={{fontFamily: "'Poppins', sans-serif", color: currency === 'AUD' ? '#111827' : '#6b7280'}}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span>🇦🇺</span>
                        <span>A$ AUD</span>
                      </div>
                      <span className="text-xs text-gray-500">Australia</span>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="flex bg-white border-b border-gray-100 justify-between items-center px-4 py-2 relative">
        {/* Left side - Hamburger menu and Logo (mobile) */}
        <div className="flex items-center gap-3 lg:flex-none">
          <button
            onClick={toggleMenu}
            className="lg:hidden text-gray-600 hover:text-gray-900 focus:outline-none transition-colors"
            aria-label="Toggle menu"
          >
            {!isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
          
          {/* Logo - Next to burger on mobile, left on desktop */}
          <Link to="/" className="hover:opacity-90 transition-opacity duration-300" aria-label="HappyCase home">
            <div
              className="flex flex-col cursor-pointer transition-all duration-300 text-gray-900"
              style={{ fontFamily: "'Fredoka One', cursive" }}
            >
              <span className="text-[7px] sm:text-[9px] md:text-[10px] lg:text-xs font-bold leading-tight tracking-[0.35em] text-blue-900 uppercase">
                THE
              </span>
              <span className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold leading-none text-blue-900 uppercase">
                HAPPY
              </span>
              <span className="text-end text-[7px] sm:text-[9px] md:text-[10px] lg:text-xs font-bold leading-tight tracking-[0.35em] text-blue-900 uppercase">
                CASE
              </span>
            </div>
          </Link>
        </div>
        
        {/* Navbar links - Desktop */}
        <ul
          className="hidden lg:flex lg:items-center lg:space-x-1 flex-1 justify-center"
          style={{fontFamily: "'Poppins', sans-serif"}}
        >
          <li>
            <Link to="/" className="px-3 py-1.5 hover:text-gray-900 hover:bg-gray-50 block transition-colors text-xs uppercase tracking-wider font-light text-gray-600">
              Home
            </Link>
          </li>
          <li>
            <Link to="/CreateYours" className="px-3 py-1.5 hover:text-gray-900 hover:bg-gray-50 font-light block transition-colors text-xs uppercase tracking-wider text-gray-600">
              Create Yours
            </Link>
          </li>
          <li>
            <Link 
              to="/PassportCases" 
              className="px-3 py-1.5 hover:text-gray-900 hover:bg-gray-50 font-light transition-colors text-xs uppercase tracking-wider block text-gray-600"
            >
              Passport Cases
            </Link>
          </li>
          <li>
            <Link 
              to="/Charms" 
              className="px-3 py-1.5 hover:text-gray-900 hover:bg-gray-50 font-light transition-colors text-xs uppercase tracking-wider block text-gray-600"
            >
              Charms
            </Link>
          </li>
        </ul>
        
        {/* Right side - Mobile Icons (Cart) */}
        <div className="md:hidden flex items-center gap-3">
          {/* Cart Icon - Mobile */}
          <Link
            to="/cart"
            className="relative flex items-center p-2 text-gray-900 hover:text-gray-700 transition-colors"
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
            {getTotalItems() > 0 && (
              <span className="absolute top-0 right-0 bg-gray-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                {getTotalItems()}
              </span>
            )}
          </Link>
        </div>
          
      {/* Navbar links - Mobile */}
      <ul
        className={`${
            isOpen
            ? 'flex flex-col fixed left-0 top-[88px] w-full h-[calc(100vh-88px)] bg-white border-r border-gray-100 pt-6 pb-6 font-light space-y-1 z-50 overflow-y-auto shadow-lg'
              : 'hidden'
          }`}
        style={{fontFamily: "'Poppins', sans-serif"}}
        >
    
          <li>
          <Link to="/" className="px-4 py-2 hover:text-gray-900 hover:bg-gray-50 block transition-colors text-xs uppercase tracking-wider font-light" style={{color: isOpen ? '#6b7280' : '#6b7280'}} onClick={closeMenu}>
           Home
            </Link>
          </li>
          <li>
          <Link to="/CreateYours" className="px-4 py-2 hover:text-gray-900 hover:bg-gray-50 font-light block transition-colors text-xs uppercase tracking-wider" style={{color: isOpen ? '#6b7280' : '#6b7280'}} onClick={closeMenu}>
             Create Yours
            </Link>
          </li>
          <li>
            <Link 
              to="/PassportCases" 
              className="px-4 py-2 hover:text-gray-900 hover:bg-gray-50 font-light transition-colors text-xs uppercase tracking-wider block"
              style={{color: isOpen ? '#6b7280' : '#6b7280'}}
              onClick={closeMenu}
            >
              Passport Cases
            </Link>
          </li>
          <li>
            <Link 
              to="/Charms" 
              className="px-4 py-2 hover:text-gray-900 hover:bg-gray-50 font-light transition-colors text-xs uppercase tracking-wider block"
              style={{color: isOpen ? '#6b7280' : '#6b7280'}}
              onClick={closeMenu}
            >
              Charms
            </Link>
          </li>
          {/* Design Ideas link hidden */}
        {isOpen && (
          <>
          {/* Spacer to push bottom items down */}
          <li className="flex-1"></li>
          {/* Bottom section - Follow Us and Currency */}
          {/* Social Media Icons - Mobile - Moved to bottom */}
          <li className="pt-4 border-t border-gray-100">
              <div className="px-4">
                <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-3 font-thin" style={{fontFamily: "'Poppins', sans-serif"}}>
                Follow Us
              </h3>
                <div className="flex">
                <a
                  href="https://instagram.com/thehappycase.store"
                  target="_blank"
                  rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
                  aria-label="Instagram"
                >
                    <FontAwesomeIcon icon={faInstagram} className="text-sm" />
                </a>
                <a
                  href="https://tiktok.com/@thehappycase.store"
                  target="_blank"
                  rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
                  aria-label="TikTok"
                >
                    <FontAwesomeIcon icon={faTiktok} className="text-sm" />
                </a>
                <a
                  href="https://facebook.com/thehappycase"
                  target="_blank"
                  rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center hover:text-gray-900 transition-colors"
                  aria-label="Facebook"
                >
                    <FontAwesomeIcon icon={faFacebook} className="text-sm" />
                </a>
              </div>
            </div>
          </li>
          
            {/* Currency Selector - Mobile - Moved to bottom */}
            <li className="relative px-4 py-3 border-t border-gray-100" ref={currencyDropdownRef}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCurrencyDropdown();
                }}
                className={`w-full text-left hover:text-gray-900 font-light transition-all duration-200 flex items-center justify-between text-xs uppercase tracking-wider ${isCurrencyDropdownOpen ? 'bg-gray-50' : ''}`}
                style={{fontFamily: "'Poppins', sans-serif", color: '#6b7280'}}
              >
                <span> {getCurrencyDisplayWithFlag()}</span>
                <FontAwesomeIcon icon={faChevronDown} className={`ml-2 text-xs transition-transform duration-200 ${isCurrencyDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isCurrencyDropdownOpen && (
                <div className="bg-gray-50 border-t border-gray-100 transition-all duration-200 max-h-[70vh] overflow-y-auto w-full" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={(e) => { 
                    e.stopPropagation();
                    setCurrency('GBP'); 
                    setIsCurrencyDropdownOpen(false);
                    closeMenu();
                  }}
                    className={`w-full text-left px-8 py-2.5 text-xs transition-colors ${currency === 'GBP' ? 'bg-gray-100 font-medium' : 'hover:bg-gray-100'}`}
                    style={{fontFamily: "'Poppins', sans-serif", color: currency === 'GBP' ? '#111827' : '#374151'}}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>🇬🇧</span>
                      <span>£ GBP</span>
                    </div>
                    <span className="text-xs text-gray-500">UK</span>
                  </div>
                </button>
                <button
                  onClick={(e) => { 
                    e.stopPropagation();
                    setCurrency('USD'); 
                    setIsCurrencyDropdownOpen(false);
                    closeMenu();
                  }}
                    className={`w-full text-left px-8 py-2.5 text-xs transition-colors ${currency === 'USD' ? 'bg-gray-100 font-medium' : 'hover:bg-gray-100'}`}
                    style={{fontFamily: "'Poppins', sans-serif", color: currency === 'USD' ? '#111827' : '#374151'}}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>🇺🇸</span>
                      <span>$ USD</span>
                    </div>
                    <span className="text-xs text-gray-500">USA</span>
                  </div>
                </button>
                {/* EUR Option */}
                <button
                  onClick={(e) => { 
                    e.stopPropagation();
                    setCurrency('EUR'); 
                    setIsCurrencyDropdownOpen(false);
                    setShowEuropeanCountries(false);
                    closeMenu();
                  }}
                  className={`w-full text-left px-8 py-2.5 text-xs transition-colors ${currency === 'EUR' ? 'bg-gray-100 font-medium' : 'hover:bg-gray-100'} flex items-center justify-between`}
                  style={{fontFamily: "'Poppins', sans-serif", color: currency === 'EUR' ? '#111827' : '#374151'}}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>🇪🇺</span>
                      <span>€ EUR</span>
                    </div>
            
                  </div>
                </button>
                
                {/* Other European Countries Dropdown */}
                <div>
                  <button
                    onClick={(e) => { 
                      e.stopPropagation();
                      setShowEuropeanCountries(!showEuropeanCountries);
                    }}
                    className={`w-full text-left px-8 py-2.5 text-xs transition-colors ${['PLN', 'CZK', 'HUF', 'RON', 'BGN', 'DKK', 'SEK', 'CHF', 'NOK'].includes(currency) ? 'bg-gray-100 font-medium' : 'hover:bg-gray-100'} flex items-center justify-between`}
                    style={{fontFamily: "'Poppins', sans-serif", color: ['PLN', 'CZK', 'HUF', 'RON', 'BGN', 'DKK', 'SEK', 'CHF', 'NOK'].includes(currency) ? '#111827' : '#374151'}}
                  >
                    <div className="flex items-center justify-between flex-1">
                      <span className="text-xs text-gray-500">Other European Countries</span>
                    </div>
                    <FontAwesomeIcon icon={faChevronDown} className={`ml-2 text-xs transition-transform duration-200 ${showEuropeanCountries ? 'rotate-180' : ''}`} />
                  </button>
                  {showEuropeanCountries && (
                    <div className="pl-8 max-h-64 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                      {[
                        { code: 'PLN', symbol: 'zł', name: 'Poland', flag: '🇵🇱' },
                        { code: 'CZK', symbol: 'Kč', name: 'Czech Republic', flag: '🇨🇿' },
                        { code: 'HUF', symbol: 'Ft', name: 'Hungary', flag: '🇭🇺' },
                        { code: 'RON', symbol: 'lei', name: 'Romania', flag: '🇷🇴' },
                        { code: 'BGN', symbol: 'лв', name: 'Bulgaria', flag: '🇧🇬' },
                        { code: 'DKK', symbol: 'kr', name: 'Denmark', flag: '🇩🇰' },
                        { code: 'SEK', symbol: 'kr', name: 'Sweden', flag: '🇸🇪' },
                        { code: 'CHF', symbol: 'Fr', name: 'Switzerland', flag: '🇨🇭' },
                        { code: 'NOK', symbol: 'kr', name: 'Norway', flag: '🇳🇴' },
                      ].map((country) => (
                        <button
                          key={country.code}
                          onClick={(e) => { 
                            e.stopPropagation();
                            setCurrency(country.code); 
                            setIsCurrencyDropdownOpen(false);
                            setShowEuropeanCountries(false);
                            closeMenu();
                          }}
                          className={`w-full text-left px-4 py-2 text-xs transition-colors ${currency === country.code ? 'bg-gray-100 font-medium' : 'hover:bg-gray-100'} flex items-center justify-between`}
                          style={{fontFamily: "'Poppins', sans-serif", color: currency === country.code ? '#111827' : '#374151'}}
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
                <button
                  onClick={(e) => { 
                    e.stopPropagation();
                    setCurrency('BRL'); 
                    setIsCurrencyDropdownOpen(false);
                    closeMenu();
                  }}
                    className={`w-full text-left px-8 py-2.5 text-xs transition-colors ${currency === 'BRL' ? 'bg-gray-100 font-medium' : 'hover:bg-gray-100'}`}
                    style={{fontFamily: "'Poppins', sans-serif", color: currency === 'BRL' ? '#111827' : '#374151'}}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>🇧🇷</span>
                      <span>R$ BRL</span>
                    </div>
                    <span className="text-xs text-gray-500">Brazil</span>
                  </div>
                </button>
                <button
                  onClick={(e) => { 
                    e.stopPropagation();
                    setCurrency('CAD'); 
                    setIsCurrencyDropdownOpen(false);
                    closeMenu();
                  }}
                    className={`w-full text-left px-8 py-2.5 text-xs transition-colors ${currency === 'CAD' ? 'bg-gray-100 font-medium' : 'hover:bg-gray-100'}`}
                    style={{fontFamily: "'Poppins', sans-serif", color: currency === 'CAD' ? '#111827' : '#374151'}}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>🇨🇦</span>
                      <span>C$ CAD</span>
                    </div>
                    <span className="text-xs text-gray-500">Canada</span>
                  </div>
                </button>
                <button
                  onClick={(e) => { 
                    e.stopPropagation();
                    setCurrency('AUD'); 
                    setIsCurrencyDropdownOpen(false);
                    closeMenu();
                  }}
                    className={`w-full text-left px-8 py-2.5 text-xs transition-colors ${currency === 'AUD' ? 'bg-gray-100 font-medium' : 'hover:bg-gray-100'}`}
                    style={{fontFamily: "'Poppins', sans-serif", color: currency === 'AUD' ? '#111827' : '#374151'}}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>🇦🇺</span>
                      <span>A$ AUD</span>
                    </div>
                    <span className="text-xs text-gray-500">Australia</span>
                  </div>
                </button>
              </div>
            )}
          </li>
          </>
        )}
        </ul>

      {/* Cart Link - Desktop */}
          <Link
            to="/cart"
        className="hidden md:flex items-center p-2 text-gray-900 hover:text-gray-700 relative transition-colors"
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
            {getTotalItems() > 0 && (
          <span className="absolute top-0 right-0 bg-gray-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                {getTotalItems()}
              </span>
            )}
          </Link>
      </nav>
    </>
  );
};

export default NavBar;
