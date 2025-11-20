import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Products from '../../products.json';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';
import AddToCartBtn from '../../component/AddToCartBtn';

const ColorfulCharms = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCharmIndex, setSelectedCharmIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const colorfulPins = Products.pins.colorful;

  // Filter charms based on search and category
  const getFilteredPins = () => {
    return colorfulPins.filter(pin => {
      const matchesSearch = pin.name.toLowerCase().includes(searchTerm.toLowerCase());
      const pinNameLower = pin.name.toLowerCase();
      
      if (selectedCategory === 'all') return matchesSearch;
      
      if (selectedCategory === 'drinks') {
        return matchesSearch && (
          pinNameLower.includes('beer') ||
          pinNameLower.includes('wine') ||
          pinNameLower.includes('coffee') ||
          pinNameLower.includes('aperol')
        );
      }
      
      if (selectedCategory === 'travel') {
        return matchesSearch && (
          pinNameLower.includes('airplane') ||
          pinNameLower.includes('passport') ||
          pinNameLower.includes('suitcase') ||
          pinNameLower.includes('map') ||
          pinNameLower.includes('vacation') ||
          pinNameLower.includes('adventure') ||
          pinNameLower.includes('boarding') ||
          pinNameLower.includes('ticket') ||
          pinNameLower.includes('heart globe') ||
          pinNameLower.includes('combi') ||
          pinNameLower.includes('telephone') ||
          pinNameLower.includes('london phone')
        );
      }
      
      if (selectedCategory === 'inspiration') {
        return matchesSearch && (
          pinNameLower.includes('be a good human') ||
          pinNameLower.includes('be kind') ||
          pinNameLower.includes('be happy') ||
          pinNameLower.includes('dream big') ||
          pinNameLower.includes('life is good') ||
          pinNameLower.includes('stay pawsitive')
        );
      }
      
      if (selectedCategory === 'flags') {
        return matchesSearch && (
          pinNameLower.includes('flag') ||
          pinNameLower.includes('france') ||
          pinNameLower.includes('portugal') ||
          pinNameLower.includes('spain') ||
          pinNameLower.includes('italian') ||
          pinNameLower.includes('dublin') ||
          pinNameLower.includes('brazil') ||
          pinNameLower.includes('united kingdom') ||
          pinNameLower.includes('uk') ||
          pinNameLower.includes('rainbow') ||
          pinNameLower.includes('lgbtqia')
        );
      }
      
      if (selectedCategory === 'disney') {
        return matchesSearch && (
          pinNameLower.includes('disney') ||
          pinNameLower.includes('mickey') ||
          pinNameLower.includes('minnie') ||
          pinNameLower.includes('pluto') ||
          pinNameLower.includes('goofy') ||
          pinNameLower.includes('guufy') ||
          pinNameLower.includes('daisy duck') ||
          pinNameLower.includes('duck')
        );
      }
      
      return matchesSearch;
    });
  };

  const filteredPins = getFilteredPins();
  const selectedCharm = filteredPins[selectedCharmIndex] || filteredPins[0];

  // Reset to first charm when category or search changes
  useEffect(() => {
    setSelectedCharmIndex(0);
  }, [selectedCategory, searchTerm]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedCharmIndex(0);
  };

  const handlePreviousCharm = () => {
    setSelectedCharmIndex(prev => (prev - 1 + filteredPins.length) % filteredPins.length);
  };

  const handleNextCharm = () => {
    setSelectedCharmIndex(prev => (prev + 1) % filteredPins.length);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const pastelColors = ['bg-pink-50', 'bg-blue-50', 'bg-purple-50', 'bg-green-50', 'bg-yellow-50', 'bg-orange-50'];
  const pastelBorders = ['border-pink-100', 'border-blue-100', 'border-purple-100', 'border-green-100', 'border-yellow-100', 'border-orange-100'];
  const colorIndex = selectedCharmIndex % pastelColors.length;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-2" style={{fontFamily: "'Poppins', sans-serif", letterSpacing: '0.05em'}}>
            Colorful Charms
          </h1>
          <div className="w-16 h-px bg-gray-300 mx-auto mb-4"></div>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
            Create your case with charms glued, or buy charms separately and glue them yourself for the fun of doing it.
          </p>
        </div>

        {/* Category Selection - Minimalist Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-1 border-b border-gray-200 flex-wrap justify-center">
            {[
              { key: 'all', label: 'ALL' },
              { key: 'drinks', label: 'DRINKS' },
              { key: 'travel', label: 'TRAVEL' },
              { key: 'inspiration', label: 'INSPIRATION' },
              { key: 'flags', label: 'FLAGS' },
              { key: 'disney', label: 'DISNEY' }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => handleCategoryChange(key)}
                className={`px-6 py-3 text-xs uppercase tracking-wider transition-all duration-200 ${
                  selectedCategory === key
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

        {/* Search Bar */}
        {filteredPins.length > 0 && (
          <div className="mb-8 max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search charms..."
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
        )}

        {/* Main Content */}
        {filteredPins.length > 0 && selectedCharm ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 mb-16">
            
            {/* Left Side - Image Gallery */}
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-light text-gray-900 mb-2" style={{fontFamily: "'Poppins', sans-serif"}}>
                  {selectedCharm.name}
                </h2>
              </div>
                
              {/* Image Display */}
              <div className="relative group">
                <div className={`relative overflow-hidden ${pastelColors[colorIndex]} border ${pastelBorders[colorIndex]} p-8`}>
                  <img
                    src={selectedCharm.src}
                    alt={selectedCharm.name}
                    className="w-full h-80 object-contain transition-opacity duration-200"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      if (e.target.nextSibling) {
                        e.target.nextSibling.style.display = 'flex';
                      }
                    }}
                  />
                  <div className="hidden w-full h-80 items-center justify-center text-gray-400">
                    <div className="text-center">
                      <p className="text-gray-500" style={{fontFamily: "'Poppins', sans-serif"}}>Image not available</p>
                    </div>
                  </div>
                </div>

                {/* Navigation Arrows */}
                {filteredPins.length > 1 && (
                  <>
                    <button
                      onClick={handlePreviousCharm}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 border border-gray-200 hover:border-gray-400 transition-all duration-200 opacity-0 group-hover:opacity-100"
                      aria-label="Previous charm"
                    >
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={handleNextCharm}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 border border-gray-200 hover:border-gray-400 transition-all duration-200 opacity-0 group-hover:opacity-100"
                      aria-label="Next charm"
                    >
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
              </div>

              {/* Charm Counter */}
              {filteredPins.length > 1 && (
                <div className="text-center text-sm text-gray-500" style={{fontFamily: "'Poppins', sans-serif"}}>
                  {selectedCharmIndex + 1} / {filteredPins.length}
                </div>
              )}
            </div>

            {/* Right Side - Details */}
            <div className="space-y-8">
              
              {/* Price and CTA */}
              <div className="space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-light text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>
                    {formatPrice(selectedCharm.price || 2.0)}
                  </span>
                </div>
                <AddToCartBtn
                  product={{
                    name: `${selectedCharm.name} - Colorful Charm`,
                    price: selectedCharm.price || 2.0,
                    totalPrice: selectedCharm.price || 2.0,
                    image: selectedCharm.src,
                    pin: selectedCharm,
                    category: 'colorful',
                    type: 'charm'
                  }}
                  onAdd={handleAddToCart}
                  className="bg-green-600 hover:bg-green-700 text-white border-green-600 hover:border-green-700"
                />
              </div>

              {/* Description */}
              <div className="border-t border-gray-100 pt-8">
                <h3 className="text-sm uppercase tracking-wider text-gray-900 mb-4 font-medium" style={{fontFamily: "'Poppins', sans-serif"}}>Description</h3>
                <p className="text-sm text-gray-600 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
                  Beautiful colorful charm perfect for personalizing your passport case. This charm can be glued to your case or used separately.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-gray-400 mb-4" style={{fontFamily: "'Poppins', sans-serif"}}>
              No charms found
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="text-xs uppercase tracking-wider text-gray-500 hover:text-gray-900 border-b border-transparent hover:border-gray-300 transition-all duration-200"
              style={{fontFamily: "'Poppins', sans-serif"}}
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* All Charms Overview */}
        {filteredPins.length > 0 && (
          <div className="mt-24 pt-16 border-t border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-light text-gray-900 mb-2" style={{fontFamily: "'Poppins', sans-serif", letterSpacing: '0.05em'}}>
                All {selectedCategory === 'all' ? 'Charms' : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Charms
              </h2>
              <div className="w-16 h-px bg-gray-300 mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {filteredPins.map((charm, index) => {
                const itemColorIndex = index % pastelColors.length;
                return (
                  <div
                    key={index}
                    className="text-center cursor-pointer group border border-gray-100 hover:border-gray-300 transition-all duration-200 p-6"
                    onClick={() => setSelectedCharmIndex(index)}
                  >
                    <div className="relative mb-4">
                      <div className={`w-32 h-32 mx-auto ${pastelColors[itemColorIndex]} border ${pastelBorders[itemColorIndex]} flex items-center justify-center overflow-hidden`}>
                        <img
                          src={charm.src}
                          alt={charm.name}
                          className="w-full h-full object-contain p-4 transition-opacity duration-200 group-hover:opacity-80"
                          style={{
                            transform: `scale(${charm.size !== undefined ? charm.size : 1.0})`
                          }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            if (e.target.nextSibling) {
                              e.target.nextSibling.style.display = 'flex';
                            }
                          }}
                        />
                        <div className="hidden w-full h-full items-center justify-center text-gray-400">
                          <span className="text-4xl">🎁</span>
                        </div>
                      </div>
                      {selectedCharmIndex === index && (
                        <div className="absolute -top-2 -right-2 bg-gray-900 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">
                          ✓
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-sm font-light text-gray-900 mb-2" style={{fontFamily: "'Poppins', sans-serif"}}>
                      {charm.name}
                    </h3>
                    
                    <div className="text-sm font-medium text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>
                      {formatPrice(charm.price || 2.0)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Call to Action */}
        {filteredPins.length > 0 && (
          <div className="pt-12 pb-8 text-center border-t border-gray-100 mt-16">
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigate('/CreateYours')}
                className="px-6 py-2 text-xs uppercase tracking-wider text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-400 transition-all duration-200"
                style={{fontFamily: "'Poppins', sans-serif"}}
              >
                Start Creating
              </button>
              <button
                onClick={() => navigate('/BronzeCharms')}
                className="px-6 py-2 text-xs uppercase tracking-wider text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-400 transition-all duration-200"
                style={{fontFamily: "'Poppins', sans-serif"}}
              >
                Bronze Charms
              </button>
              <button
                onClick={() => navigate('/Flags')}
                className="px-6 py-2 text-xs uppercase tracking-wider text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-400 transition-all duration-200"
                style={{fontFamily: "'Poppins', sans-serif"}}
              >
                Flags
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ColorfulCharms;
