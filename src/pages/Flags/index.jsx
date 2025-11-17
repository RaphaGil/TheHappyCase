import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Products from '../../products.json';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';

const Flags = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16; // 4 columns × 4 rows

  // Get flags from the dedicated flags section in products.json
  const flagPins = Products.pins.flags || [];

  // Filter flags by search term and continent
  const filteredFlags = flagPins.filter((flag) => {
    const matchesSearch = flag.name.toLowerCase().includes(searchTerm.toLowerCase());
    const flagNameLower = flag.name.toLowerCase();
    
    if (selectedContinent === 'all') return matchesSearch;
    
    if (selectedContinent === 'europe') {
      return matchesSearch && (
        flagNameLower.includes('france') ||
        flagNameLower.includes('portugal') ||
        flagNameLower.includes('spain') ||
        flagNameLower.includes('italian') ||
        flagNameLower.includes('italy') ||
        flagNameLower.includes('united kingdom') ||
        flagNameLower.includes('uk') ||
        flagNameLower.includes('dublin') ||
        flagNameLower.includes('ireland')
      );
    }
    
    if (selectedContinent === 'americas') {
      return matchesSearch && (
        flagNameLower.includes('brazil')
      );
    }
    
    if (selectedContinent === 'special') {
      return matchesSearch && (
        flagNameLower.includes('lgbtqia') ||
        flagNameLower.includes('rainbow')
      );
    }
    
    return matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredFlags.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFlags = filteredFlags.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedContinent]);

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1));
  };

  const handleAddToCart = (flag) => {
    const product = {
      name: `${flag.name} - Flag`,
      price: flag.price || 2.0,
      totalPrice: flag.price || 2.0,
      image: flag.src,
      pin: flag,
      category: 'flags',
      type: 'charm'
    };
    addToCart(product);
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-2" style={{fontFamily: "'Poppins', sans-serif", letterSpacing: '0.05em'}}>
            Flag Charms
          </h1>
          <div className="w-16 h-px bg-gray-300 mx-auto mb-4"></div>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
            Create your case with charms glued, or buy charms separately and glue them yourself for the fun of doing it.
          </p>
        </div>

        

        {/* Search */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md w-full">
              <input
                type="text"
                placeholder="Search flags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 bg-white text-gray-900 placeholder-gray-400"
                style={{fontFamily: "'Poppins', sans-serif"}}
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
{/* Continent Selection - Minimalist Tabs */}
<div className="flex justify-center mb-12">
          <div className="flex gap-1 border-b border-gray-200 flex-wrap justify-center">
            {[
              { key: 'all', label: 'ALL' },
              { key: 'europe', label: 'EUROPE' },
              { key: 'americas', label: 'AMERICAS' },
              { key: 'special', label: 'SPECIAL' }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setSelectedContinent(key)}
                className={`px-6 py-3 text-xs uppercase tracking-wider transition-all duration-200 ${
                  selectedContinent === key
                    ? 'border-b-2 border-gray-900 text-gray-900 font-medium'
                    : 'border-b-2 border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
                }`}
                style={{fontFamily: "'Poppins', sans-serif"}}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        {/* Results Count */}
        <div className="mb-8 flex items-center justify-between text-sm text-gray-500">
          <p style={{fontFamily: "'Poppins', sans-serif"}}>
            {filteredFlags.length} {filteredFlags.length === 1 ? 'item' : 'items'}
          </p>
          {totalPages > 1 && (
            <p style={{fontFamily: "'Poppins', sans-serif"}}>
              {currentPage} / {totalPages}
            </p>
          )}
        </div>

        {/* Navigation and Flags Grid */}
        <div className="relative">
          {/* Previous Button */}
          {totalPages > 1 && currentPage > 1 && (
            <button
              onClick={handlePreviousPage}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 md:-translate-x-12 z-10 bg-white rounded-full p-2 md:p-3 border border-gray-200 hover:border-gray-400 transition-all duration-200"
              aria-label="Previous page"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Flags Grid - 4 columns on large screens, responsive on smaller */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 mb-12">
            {currentFlags.map((flag, index) => {
              const pastelColors = ['bg-pink-50', 'bg-blue-50', 'bg-purple-50', 'bg-green-50', 'bg-yellow-50', 'bg-orange-50'];
              const pastelBorders = ['border-pink-100', 'border-blue-100', 'border-purple-100', 'border-green-100', 'border-yellow-100', 'border-orange-100'];
              const colorIndex = index % pastelColors.length;
              return (
            <div
              key={index}
              className="flex flex-col group"
            >
              <div className={`aspect-square mb-3 ${pastelColors[colorIndex]} flex items-center justify-center overflow-hidden border ${pastelBorders[colorIndex]} relative`}>
                <img
                  src={flag.src}
                  alt={flag.name}
                  className="w-full h-full object-contain p-2 transition-opacity duration-200 group-hover:opacity-80"
                  onError={(e) => {
                    if (e.target) {
                      e.target.style.display = 'none';
                    }
                    if (e.target?.nextSibling) {
                      e.target.nextSibling.style.display = 'flex';
                    }
                  }}
                />
                {/* Add to Cart Button Overlay - Always visible on mobile, shows on hover on desktop */}
                <button
                  onClick={() => handleAddToCart(flag)}
                  className="absolute bottom-0 left-0 right-0 py-2 text-gray-900 border-t border-gray-200 bg-white transition-all duration-200 text-xs uppercase tracking-wider flex items-center justify-center opacity-100 translate-y-0 md:opacity-0 md:translate-y-full md:group-hover:opacity-100 md:group-hover:translate-y-0 hover:bg-gray-50"
                  style={{fontFamily: "'Poppins', sans-serif"}}
                >
                  {/* Bag Icon - Visible on mobile */}
                  <svg className="w-4 h-4 md:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {/* Button Text - Visible on desktop */}
                  <span className="hidden md:inline">Add to Cart</span>
                </button>
              </div>
              <h3 className="text-sm text-gray-700 text-center mb-1 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
                {flag.name}
              </h3>
              <div className="text-center">
                <span className="text-sm text-gray-900 font-medium" style={{fontFamily: "'Poppins', sans-serif"}}>{formatPrice(flag.price || 2.0)}</span>
              </div>
            </div>
            );
            })}
          </div>

          {/* Next Button */}
          {totalPages > 1 && currentPage < totalPages && (
            <button
              onClick={handleNextPage}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 md:translate-x-12 z-10 bg-white rounded-full p-2 md:p-3 border border-gray-200 hover:border-gray-400 transition-all duration-200"
              aria-label="Next page"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        {/* Pagination Numbers */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-1 mb-12">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 text-xs transition-all duration-200 ${
                  currentPage === page
                    ? 'border-b-2 border-gray-900 text-gray-900 font-medium'
                    : 'border-b-2 border-transparent text-gray-400 hover:text-gray-700 hover:border-gray-300'
                }`}
                style={{fontFamily: "'Poppins', sans-serif"}}
                aria-label={`Go to page ${page}`}
              >
                {page}
              </button>
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredFlags.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-gray-400 mb-4" style={{fontFamily: "'Poppins', sans-serif"}}>
              No flags found
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedContinent('all');
              }}
              className="text-xs uppercase tracking-wider text-gray-500 hover:text-gray-900 border-b border-transparent hover:border-gray-300 transition-all duration-200"
              style={{fontFamily: "'Poppins', sans-serif"}}
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Call to Action */}
        {filteredFlags.length > 0 && (
          <div className="pt-12 pb-8 text-center border-t border-gray-100">
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigate('/CreateYours')}
                className="px-6 py-2 text-xs uppercase tracking-wider text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-400 transition-all duration-200"
                style={{fontFamily: "'Poppins', sans-serif"}}
              >
                Start Creating
              </button>
              <button
                onClick={() => navigate('/ColorfulCharms')}
                className="px-6 py-2 text-xs uppercase tracking-wider text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-400 transition-all duration-200"
                style={{fontFamily: "'Poppins', sans-serif"}}
              >
                Colorful Charms
              </button>
              <button
                onClick={() => navigate('/BronzeCharms')}
                className="px-6 py-2 text-xs uppercase tracking-wider text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-400 transition-all duration-200"
                style={{fontFamily: "'Poppins', sans-serif"}}
              >
                Bronze Charms
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Flags;
