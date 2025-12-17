import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Products from '../../data/products.json';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';
import GlueInfoModal from '../../component/GlueInfoModal';

// Map filter values to charm types
const filterToType = {
  'colorful': 'colorful',
  'bronze': 'bronze',
  'flags': 'flags'
};

const Charms = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterParam = searchParams.get('filter');
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  
  const initialCharmType = filterParam && filterToType[filterParam.toLowerCase()] 
    ? filterToType[filterParam.toLowerCase()] 
    : 'colorful';
  
  const [selectedCharmType, setSelectedCharmType] = useState(initialCharmType);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('all');
  const [selectedBronzeCategory, setSelectedBronzeCategory] = useState('all');
  const [selectedColorfulCategory, setSelectedColorfulCategory] = useState('all');
  const [bronzeCurrentPage, setBronzeCurrentPage] = useState(1);
  const [colorfulCurrentPage, setColorfulCurrentPage] = useState(1);
  const [flagsCurrentPage, setFlagsCurrentPage] = useState(1);

  // Helper function to get products with quantities from localStorage
  const getProductsWithQuantities = () => {
    const savedQuantities = localStorage.getItem('productQuantities');
    if (!savedQuantities) return Products;
    
    try {
      const quantities = JSON.parse(savedQuantities);
      const mergedProducts = { ...Products };
      
      // Merge charm quantities
      if (quantities.pins) {
        ['flags', 'colorful', 'bronze'].forEach(category => {
          if (quantities.pins[category]) {
            mergedProducts.pins[category] = mergedProducts.pins[category].map((charm, index) => ({
              ...charm,
              quantity: quantities.pins[category][index] !== undefined ? quantities.pins[category][index] : charm.quantity
            }));
          }
        });
      }
      
      return mergedProducts;
    } catch (error) {
      console.error('Error loading saved quantities:', error);
      return Products;
    }
  };

  // Get charms based on selected type with quantities from localStorage
  const getAllCharms = () => {
    const productsWithQuantities = getProductsWithQuantities();
    if (selectedCharmType === 'colorful') {
      return productsWithQuantities.pins.colorful || [];
    } else if (selectedCharmType === 'bronze') {
      return productsWithQuantities.pins.bronze || [];
    } else if (selectedCharmType === 'flags') {
      return productsWithQuantities.pins.flags || [];
    }
    return [];
  };

  // Filter charms based on search, continent (for flags), and category (for bronze)
  const getFilteredCharms = () => {
    const allCharms = getAllCharms();
    let filtered = allCharms;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(charm => 
        charm.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply continent filter for flags
    if (selectedCharmType === 'flags' && selectedContinent !== 'all') {
      filtered = filtered.filter((flag) => {
        return flag.continent === selectedContinent;
      });
    }
    
    // Apply category filter for bronze charms
    if (selectedCharmType === 'bronze' && selectedBronzeCategory !== 'all') {
      filtered = filtered.filter((charm) => {
        const charmNameLower = charm.name.toLowerCase();
        
        if (selectedBronzeCategory === 'travel') {
          return (
            charmNameLower.includes('airplane') ||
            charmNameLower.includes('globe') ||
            charmNameLower.includes('passport') ||
            charmNameLower.includes('luggage') ||
            charmNameLower.includes('taxi') ||
            charmNameLower.includes('liberty') ||
            charmNameLower.includes('london') ||
            charmNameLower.includes('eiffel') ||
            charmNameLower.includes('bigben') ||
            charmNameLower.includes('pisa') ||
            charmNameLower.includes('pyramid') ||
            charmNameLower.includes('arc') ||
            charmNameLower.includes('triomphe') ||
            charmNameLower.includes('binoculars')
          );
        }
        
        if (selectedBronzeCategory === 'animals') {
          return (
            charmNameLower.includes('kangaroo') ||
            charmNameLower.includes('koala') ||
            charmNameLower.includes('llama') ||
            charmNameLower.includes('squirrel') ||
            charmNameLower.includes('paw') ||
            charmNameLower.includes('dog')
          );
        }
        
        if (selectedBronzeCategory === 'love') {
          return (
            charmNameLower.includes('heart') ||
            charmNameLower.includes('love')
          );
        }
        
        if (selectedBronzeCategory === 'nature') {
          return (
            charmNameLower.includes('leaf') ||
            charmNameLower.includes('butterfly') ||
            charmNameLower.includes('maple') ||
            charmNameLower.includes('flipflop')
          );
        }
        
        if (selectedBronzeCategory === 'symbols') {
          return (
            charmNameLower.includes('cardinal') ||
            charmNameLower.includes('hamsa') ||
            charmNameLower.includes('mummy') ||
            charmNameLower.includes('journey') ||
            charmNameLower.includes('jesus') ||
            charmNameLower.includes('camera') ||
            charmNameLower.includes('thailand') ||
            charmNameLower.includes('india') ||
            charmNameLower.includes('canada')
          );
        }
        
        return true;
      });
    }
    
    // Apply category filter for colorful charms
    if (selectedCharmType === 'colorful' && selectedColorfulCategory !== 'all') {
      filtered = filtered.filter((charm) => {
        const charmNameLower = charm.name.toLowerCase();
        
        if (selectedColorfulCategory === 'travel') {
          return (
            charmNameLower.includes('airplane') ||
            charmNameLower.includes('passport') ||
            charmNameLower.includes('suitcase') ||
            charmNameLower.includes('map') ||
            charmNameLower.includes('boarding') ||
            charmNameLower.includes('adventure') ||
            charmNameLower.includes('vacation') ||
            charmNameLower.includes('combi')
          );
        }
        
        if (selectedColorfulCategory === 'disney') {
          return (
            charmNameLower.includes('disney') ||
            charmNameLower.includes('pluto') ||
            charmNameLower.includes('minnie') ||
            charmNameLower.includes('mickey') ||
            charmNameLower.includes('daisy') ||
            charmNameLower.includes('duck') ||
            charmNameLower.includes('guufy')
          );
        }
        
        if (selectedColorfulCategory === 'drinks') {
          return (
            charmNameLower.includes('beer') ||
            charmNameLower.includes('wine') ||
            charmNameLower.includes('coffee')
          );
        }
        
        if (selectedColorfulCategory === 'inspiration') {
          return (
            charmNameLower.includes('be a good human') ||
            charmNameLower.includes('dream big') ||
            charmNameLower.includes('be kind') ||
            charmNameLower.includes('ticket to happiness') ||
            charmNameLower.includes('be happy')
          );
        }
        
        if (selectedColorfulCategory === 'hearts') {
          return (
            charmNameLower.includes('heart')
          );
        }
        
        if (selectedColorfulCategory === 'nature') {
          return (
            charmNameLower.includes('leaf') ||
            charmNameLower.includes('coconut') ||
            charmNameLower.includes('wave')
          );
        }
        
        if (selectedColorfulCategory === 'camera') {
          return (
            charmNameLower.includes('camera')
          );
        }
        
        return true;
      });
    }
    
    return filtered;
  };

  const filteredCharms = getFilteredCharms();
  
  // Pagination for all charm types: 5 rows x 4 columns = 20 items per page
  const itemsPerPage = 20; // 5 rows * 4 columns
  
  // Calculate total pages for each charm type
  const bronzeTotalPages = selectedCharmType === 'bronze' 
    ? Math.ceil(filteredCharms.length / itemsPerPage) 
    : 1;
  const colorfulTotalPages = selectedCharmType === 'colorful' 
    ? Math.ceil(filteredCharms.length / itemsPerPage) 
    : 1;
  const flagsTotalPages = selectedCharmType === 'flags' 
    ? Math.ceil(filteredCharms.length / itemsPerPage) 
    : 1;
  
  // Get current page and total pages based on selected charm type
  const getCurrentPage = () => {
    if (selectedCharmType === 'bronze') return bronzeCurrentPage;
    if (selectedCharmType === 'colorful') return colorfulCurrentPage;
    if (selectedCharmType === 'flags') return flagsCurrentPage;
    return 1;
  };
  
  const getTotalPages = () => {
    if (selectedCharmType === 'bronze') return bronzeTotalPages;
    if (selectedCharmType === 'colorful') return colorfulTotalPages;
    if (selectedCharmType === 'flags') return flagsTotalPages;
    return 1;
  };
  
  const setCurrentPage = (page) => {
    if (selectedCharmType === 'bronze') setBronzeCurrentPage(page);
    if (selectedCharmType === 'colorful') setColorfulCurrentPage(page);
    if (selectedCharmType === 'flags') setFlagsCurrentPage(page);
  };
  
  // Get paginated charms (show only current page)
  const getPaginatedCharms = () => {
    const currentPage = getCurrentPage();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredCharms.slice(startIndex, endIndex);
  };
  
  const displayedCharms = getPaginatedCharms();
  const currentPage = getCurrentPage();
  const totalPages = getTotalPages();

  // Update charm type when filter param changes
  useEffect(() => {
    if (filterParam && filterToType[filterParam.toLowerCase()]) {
      const newType = filterToType[filterParam.toLowerCase()];
      setSelectedCharmType(newType);
    }
  }, [filterParam]);

  const handleCharmTypeChange = (type) => {
    setSelectedCharmType(type);
    setSelectedContinent('all'); // Reset continent filter when changing charm type
    setSelectedBronzeCategory('all'); // Reset bronze category filter when changing charm type
    setSelectedColorfulCategory('all'); // Reset colorful category filter when changing charm type
    setBronzeCurrentPage(1); // Reset to first page when changing charm type
    setColorfulCurrentPage(1); // Reset to first page when changing charm type
    setFlagsCurrentPage(1); // Reset to first page when changing charm type
    // Update URL with filter parameter
    const typeToFilter = {
      'colorful': 'colorful',
      'bronze': 'bronze',
      'flags': 'flags'
    };
    const filterValue = typeToFilter[type] || 'colorful';
    setSearchParams({ filter: filterValue });
  };

  const [showGlueModal, setShowGlueModal] = useState(false);
  const [pendingCharm, setPendingCharm] = useState(null);

  const handleAddToCart = (charm) => {
    // Show modal first
    setPendingCharm(charm);
    setShowGlueModal(true);
  };

  const handleProceedToCart = () => {
    if (!pendingCharm) return;
    
    const getCharmCategory = () => {
      if (selectedCharmType === 'colorful') return 'colorful';
      if (selectedCharmType === 'bronze') return 'bronze';
      if (selectedCharmType === 'flags') return 'flags';
      return 'colorful';
    };

    const getCharmName = () => {
      if (selectedCharmType === 'flags') return `${pendingCharm.name} - Flag`;
      if (selectedCharmType === 'bronze') return `${pendingCharm.name} - Bronze Charm`;
      return `${pendingCharm.name} - Colorful Charm`;
    };

    const getCharmPrice = () => {
      if (selectedCharmType === 'bronze') return pendingCharm.price || 1.0;
      return pendingCharm.price || 2.0;
    };

    const product = {
      name: getCharmName(),
      price: getCharmPrice(),
      totalPrice: getCharmPrice(),
      image: pendingCharm.src,
      pin: pendingCharm,
      category: getCharmCategory(),
      type: 'charm'
    };
    addToCart(product);
    setShowGlueModal(false);
    setPendingCharm(null);
  };

  const pastelColors = ['bg-pink-50', 'bg-blue-50', 'bg-purple-50', 'bg-green-50', 'bg-yellow-50', 'bg-orange-50'];
  const pastelBorders = ['border-pink-100', 'border-blue-100', 'border-purple-100', 'border-green-100', 'border-yellow-100', 'border-orange-100'];

  const charmTypes = [
    { key: 'colorful', label: 'Colorful Charms' },
    { key: 'bronze', label: 'Bronze Charms' },
    { key: 'flags', label: 'Flags' }
  ];

  const getCharmPrice = (charm) => {
    if (selectedCharmType === 'bronze') return charm.price || 1.0;
    return charm.price || 2.0;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-title sm:text-title-lg font-light text-gray-900 mb-2 tracking-title">
          CHARMS
          </h1>
          <div className="w-16 sm:w-20 md:w-24 h-px bg-gray-200 mx-auto mb-3 sm:mb-4"></div>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto font-light px-4 font-inter">
            <Link to="/CreateYours" className="text-gray-900 hover:text-gray-700 underline transition-colors">Create</Link> your custom case with charms pre-glued, or buy the case and charms separately and enjoy gluing them yourself.
          </p>
        </div>

        {/* Filters Section - Organized Container */}
        <div className="pb-6">
          {/* Charm Type Selection - Main Tabs */}
          <div className="flex justify-center mb-6 overflow-x-auto -mx-4 px-6 md:mx-0 md:px-0">
            <div className="flex gap-0.5 border-b border-gray-200 flex-wrap justify-center">
              {charmTypes.map((type) => (
                <button
                  key={type.key}
                  onClick={() => handleCharmTypeChange(type.key)}
                  className={`px-6 py-2.5 text-sm uppercase tracking-wider transition-all duration-200  ${
                    selectedCharmType === type.key
                      ? 'border-b-2 border-blue-700 text-white bg-blue-600'
                      : 'border-b-2 border-transparent text-white hover:text-white hover:border-blue-300 hover:bg-blue-500 bg-blue-400'
                  } font-inter`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category Selection Tabs - Sub-filters */}
          {(selectedCharmType === 'flags' || selectedCharmType === 'bronze' || selectedCharmType === 'colorful') && (
            <div className="flex justify-center mb-6">
              <div className="flex gap-0.5  flex-wrap justify-center">
                {selectedCharmType === 'flags' && [
                  { key: 'all', label: 'ALL' },
                  { key: 'europe', label: 'EUROPE' },
                  { key: 'americas', label: 'AMERICAS' },
                  { key: 'africa', label: 'AFRICA' },
                  { key: 'asia', label: 'ASIA' },
                  { key: 'special', label: 'SPECIAL' }
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedContinent(key);
                      setFlagsCurrentPage(1);
                    }}
                    className={`px-3 py-2 text-xs uppercase tracking-wider transition-all duration-200 ${
                      selectedContinent === key
                        ? 'border-b-2 border-blue-600 text-blue-700 font-semibold bg-blue-50/50'
                        : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50/30'
                    } font-inter`}
                  >
                    {label}
                  </button>
                ))}
                {selectedCharmType === 'bronze' && [
                  { key: 'all', label: 'ALL' },
                  { key: 'travel', label: 'TRAVEL' },
                  { key: 'animals', label: 'ANIMALS' },
                  { key: 'love', label: 'LOVE' },
                  { key: 'nature', label: 'NATURE' },
                  { key: 'symbols', label: 'SYMBOLS' }
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedBronzeCategory(key);
                      setBronzeCurrentPage(1);
                    }}
                    className={`px-3 py-2 text-xs uppercase tracking-wider transition-all duration-200 ${
                      selectedBronzeCategory === key
                        ? 'border-b-2 border-blue-600 text-blue-700 font-semibold bg-blue-50/50'
                        : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50/30'
                    } font-inter`}
                  >
                    {label}
                  </button>
                ))}
                {selectedCharmType === 'colorful' && [
                  { key: 'all', label: 'ALL' },
                  { key: 'travel', label: 'TRAVEL' },
                  { key: 'disney', label: 'DISNEY' },
                  { key: 'drinks', label: 'DRINKS' },
                  { key: 'inspiration', label: 'INSPIRATION' },
                  { key: 'hearts', label: 'HEARTS' },
                  { key: 'nature', label: 'NATURE' },
                  { key: 'camera', label: 'CAMERA' }
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedColorfulCategory(key);
                      setColorfulCurrentPage(1);
                    }}
                    className={`px-3 py-2 text-xs uppercase tracking-wider transition-all duration-200 ${
                      selectedColorfulCategory === key
                        ? 'border-b-2 border-blue-600 text-blue-700 font-semibold bg-blue-50/50'
                        : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50/30'
                    } font-inter`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Search and Results Section - Organized Together */}
        <div className="mb-8 flex items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search charms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-10 text-sm rounded-sm focus:outline-none focus:border-gray-400 bg-white text-gray-900 placeholder-gray-400 font-light border border-gray-200 font-inter"
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center text-sm text-gray-500 font-inter whitespace-nowrap">
            <p>
              {filteredCharms.length} {filteredCharms.length === 1 ? 'item' : 'items'}
              {totalPages > 1 && (
                <span className="ml-2">
                  (Page {currentPage} of {totalPages})
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Charms Grid */}
        {filteredCharms.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 mb-12 min-h-[400px] sm:min-h-[600px]">
              {displayedCharms.map((charm, index) => {
              const colorIndex = index % pastelColors.length;
              return (
                <div
                  key={index}
                  className="flex flex-col group"
                >
                  <div className={`aspect-square mb-3 ${pastelColors[colorIndex]} flex items-center justify-center overflow-hidden md:border ${pastelBorders[colorIndex]} relative`}>
                    <img
                      src={charm.src}
                      alt={charm.name}
                      className={`w-full h-full object-contain p-4 transition-opacity duration-200 group-hover:opacity-80 ${(charm.quantity !== undefined && charm.quantity === 0) ? 'opacity-50' : ''}`}
                      loading="lazy"
                      style={{
                        transform: `scale(${charm.size !== undefined ? charm.size * 0.9 : 0.9})`
                      }}
                      onError={(e) => {
                        if (e.target) {
                          e.target.style.display = 'none';
                        }
                        if (e.target?.nextSibling) {
                          e.target.nextSibling.style.display = 'flex';
                        }
                      }}
                    />
                    <div className="hidden w-full h-full items-center justify-center text-gray-400">
                      <span className="text-4xl">🎁</span>
                    </div>
                    {/* Sold Out Overlay */}
                    {(charm.quantity !== undefined && charm.quantity === 0) && (
                      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-20">
                        <span className="text-white text-xl font-medium uppercase tracking-wider font-inter">
                          Sold Out
                        </span>
                      </div>
                    )}
                    {/* Add to Cart Button Overlay - Bottom right on mobile, bottom bar on desktop hover */}
                    {(!charm.quantity || charm.quantity > 0) && (
                      <button
                        onClick={() => handleAddToCart(charm)}
                        className="absolute bottom-2 right-2 md:bottom-0 md:left-0 md:right-0 md:top-auto py-2 px-2 md:py-2 md:px-0 text-gray-900 md:border-t md:border-gray-200 bg-white md:bg-white rounded-full md:rounded-none shadow-md md:shadow-none transition-all duration-200 text-xs uppercase tracking-wider flex items-center justify-center opacity-100 translate-y-0 md:opacity-0 md:translate-y-full md:group-hover:opacity-100 md:group-hover:translate-y-0 hover:bg-gray-50 z-10 font-inter"
                      >
                        {/* Bag Icon - Visible on mobile only, hidden on md screens and up */}
                        <svg className="w-5 h-5 md:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        {/* Button Text - Visible on desktop only */}
                        <span className="hidden md:inline">Add to Cart</span>
                      </button>
                    )}
                  </div>
                  <h3 className="text-sm text-gray-700 text-center mb-1 font-light font-inter">
                    {charm.name}
                  </h3>
                  <div className="text-center">
                    <span className="text-sm text-gray-900 font-medium font-inter">
                      {formatPrice(getCharmPrice(charm))}
                    </span>
                  </div>
                </div>
              );
            })}
            </div>
            
            {/* Pagination Navigation - For all charm types */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 text-xs uppercase tracking-wider border transition-all duration-200 flex items-center gap-2 ${
                    currentPage === 1
                      ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                      : 'border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-400'
                  } font-inter`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Previous</span>
                </button>
                
                <div className="flex items-center gap-1 sm:gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 text-xs uppercase tracking-wider border transition-all duration-200 ${
                        currentPage === page
                          ? 'border-gray-900 bg-gray-50 text-gray-900 font-medium'
                          : 'border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-400'
                      } font-inter`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 text-xs uppercase tracking-wider border transition-all duration-200 flex items-center gap-2 ${
                    currentPage === totalPages
                      ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                      : 'border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-400'
                  } font-inter`}
                >
                  <span>Next</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="py-12 sm:py-16 text-center">
            <p className="text-base text-gray-400 mb-4 font-inter">
              No charms found
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                if (selectedCharmType === 'flags') {
                  setSelectedContinent('all');
                  setFlagsCurrentPage(1);
                }
                if (selectedCharmType === 'bronze') {
                  setSelectedBronzeCategory('all');
                  setBronzeCurrentPage(1);
                }
                if (selectedCharmType === 'colorful') {
                  setSelectedColorfulCategory('all');
                  setColorfulCurrentPage(1);
                }
              }}
              className="text-sm uppercase tracking-wider text-gray-500 hover:text-gray-900 border-b border-transparent hover:border-gray-300 transition-all duration-200 font-inter"
            >
              Clear Filters
            </button>
          </div>
        )}

      </div>
      
      {/* Glue Info Modal */}
      <GlueInfoModal
        show={showGlueModal}
        onClose={() => {
          setShowGlueModal(false);
          setPendingCharm(null);
        }}
        onProceed={handleProceedToCart}
        productType="charm"
      />
    </div>
  );
};

export default Charms;
