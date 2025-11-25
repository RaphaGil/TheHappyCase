import React, { useState, useMemo, useEffect } from "react";

const PinSelector = ({ pins, selectedCategory, setSelectedCategory, selectedPins, onSelect, onRemove, onDropdownToggle, Products }) => {
  const [subCategory, setSubCategory] = useState('all');

  // Reset subCategory when selectedCategory changes
  useEffect(() => {
    setSubCategory('all');
  }, [selectedCategory]);

  const filteredPins = useMemo(() => {
    if (subCategory === 'all') return pins;

    return pins.filter((pin) => {
      const n = pin.name.toLowerCase();
      
      // Filter for colorful charms
      if (selectedCategory === 'colorful') {
        if (subCategory === 'travel') {
          return (
            n.includes('airplane') ||
            n.includes('passport') ||
            n.includes('suitcase') ||
            n.includes('map') ||
            n.includes('boarding') ||
            n.includes('adventure') ||
            n.includes('vacation') ||
            n.includes('combi')
          );
        }
        
        if (subCategory === 'disney') {
          return (
            n.includes('disney') ||
            n.includes('pluto') ||
            n.includes('minnie') ||
            n.includes('mickey') ||
            n.includes('daisy') ||
            n.includes('duck') ||
            n.includes('roundminnie') ||
            n.includes('roundmickey') ||
            n.includes('guufy')
          );
        }
        
        if (subCategory === 'drinks') {
          return (
            n.includes('beer') ||
            n.includes('wine') ||
            n.includes('coffee')
          );
        }
        
        if (subCategory === 'inspiration') {
          return (
            n.includes('be a good human') ||
            n.includes('dream big') ||
            n.includes('be kind') ||
            n.includes('ticket to happiness') ||
            n.includes('be happy')
          );
        }
        
        if (subCategory === 'hearts') {
          return n.includes('heart');
        }
        
        if (subCategory === 'nature') {
          return (
            n.includes('leaf') ||
            n.includes('coconut') ||
            n.includes('wave')
          );
        }
        
        if (subCategory === 'camera') {
          return n.includes('camera');
        }
      }
      
      // Filter for bronze charms
      if (selectedCategory === 'bronze') {
        if (subCategory === 'travel') {
          return (
            n.includes('airplane') ||
            n.includes('globe') ||
            n.includes('passport') ||
            n.includes('luggage') ||
            n.includes('taxi') ||
            n.includes('liberty') ||
            n.includes('london') ||
            n.includes('eiffel') ||
            n.includes('bigben') ||
            n.includes('pisa') ||
            n.includes('pyramid') ||
            n.includes('arc') ||
            n.includes('triomphe') ||
            n.includes('binoculars')
          );
        }
        
        if (subCategory === 'animals') {
          return (
            n.includes('kangaroo') ||
            n.includes('koala') ||
            n.includes('llama') ||
            n.includes('squirrel') ||
            n.includes('paw') ||
            n.includes('dog')
          );
        }
        
        if (subCategory === 'love') {
          return (
            n.includes('heart') ||
            n.includes('love')
          );
        }
        
        if (subCategory === 'nature') {
          return (
            n.includes('leaf') ||
            n.includes('butterfly') ||
            n.includes('maple') ||
            n.includes('flipflop')
          );
        }
        
        if (subCategory === 'symbols') {
          return (
            n.includes('cardinal') ||
            n.includes('hamsa') ||
            n.includes('mummy') ||
            n.includes('journey') ||
            n.includes('jesus') ||
            n.includes('camera') ||
            n.includes('thailand') ||
            n.includes('india') ||
            n.includes('canada')
          );
        }
      }
      
      // Filter for flags
      if (selectedCategory === 'flags') {
        return pin.continent === subCategory;
      }
      
      return true;
    });
  }, [pins, selectedCategory, subCategory]);

  // Get preview image for each category
  const getPreviewImage = (categoryValue) => {
    if (!Products || !Products.pins) return null;
    if (categoryValue === 'bronze' && Products.pins.bronze && Products.pins.bronze.length > 0) {
      return Products.pins.bronze[0].src;
    }
    if (categoryValue === 'colorful' && Products.pins.colorful && Products.pins.colorful.length > 0) {
      return Products.pins.colorful[0].src;
    }
    if (categoryValue === 'flags' && Products.pins.flags && Products.pins.flags.length > 0) {
      return Products.pins.flags[0].src;
    }
    return null;
  };

  // Count charms for a specific subcategory
  const getSubCategoryCount = (subCat) => {
    if (subCat === 'all') return pins.length;

    return pins.filter((pin) => {
      const n = pin.name.toLowerCase();
      
      // Filter for colorful charms
      if (selectedCategory === 'colorful') {
        if (subCat === 'travel') {
          return (
            n.includes('airplane') ||
            n.includes('passport') ||
            n.includes('suitcase') ||
            n.includes('map') ||
            n.includes('boarding') ||
            n.includes('adventure') ||
            n.includes('vacation') ||
            n.includes('combi')
          );
        }
        
        if (subCat === 'disney') {
          return (
            n.includes('disney') ||
            n.includes('pluto') ||
            n.includes('minnie') ||
            n.includes('mickey') ||
            n.includes('daisy') ||
            n.includes('duck') ||
            n.includes('roundminnie') ||
            n.includes('roundmickey') ||
            n.includes('guufy')
          );
        }
        
        if (subCat === 'drinks') {
          return (
            n.includes('beer') ||
            n.includes('wine') ||
            n.includes('coffee')
          );
        }
        
        if (subCat === 'inspiration') {
          return (
            n.includes('be a good human') ||
            n.includes('dream big') ||
            n.includes('be kind') ||
            n.includes('ticket to happiness') ||
            n.includes('be happy')
          );
        }
        
        if (subCat === 'hearts') {
          return n.includes('heart');
        }
        
        if (subCat === 'nature') {
          return (
            n.includes('leaf') ||
            n.includes('coconut') ||
            n.includes('wave')
          );
        }
        
        if (subCat === 'camera') {
          return n.includes('camera');
        }
      }
      
      // Filter for bronze charms
      if (selectedCategory === 'bronze') {
        if (subCat === 'travel') {
          return (
            n.includes('airplane') ||
            n.includes('globe') ||
            n.includes('passport') ||
            n.includes('luggage') ||
            n.includes('taxi') ||
            n.includes('liberty') ||
            n.includes('london') ||
            n.includes('eiffel') ||
            n.includes('bigben') ||
            n.includes('pisa') ||
            n.includes('pyramid') ||
            n.includes('arc') ||
            n.includes('triomphe') ||
            n.includes('binoculars')
          );
        }
        
        if (subCat === 'animals') {
          return (
            n.includes('kangaroo') ||
            n.includes('koala') ||
            n.includes('llama') ||
            n.includes('squirrel') ||
            n.includes('paw') ||
            n.includes('dog')
          );
        }
        
        if (subCat === 'love') {
          return (
            n.includes('heart') ||
            n.includes('love')
          );
        }
        
        if (subCat === 'nature') {
          return (
            n.includes('leaf') ||
            n.includes('butterfly') ||
            n.includes('maple') ||
            n.includes('flipflop')
          );
        }
        
        if (subCat === 'symbols') {
          return (
            n.includes('cardinal') ||
            n.includes('hamsa') ||
            n.includes('mummy') ||
            n.includes('journey') ||
            n.includes('jesus') ||
            n.includes('camera') ||
            n.includes('thailand') ||
            n.includes('india') ||
            n.includes('canada')
          );
        }
      }
      
      // Filter for flags
      if (selectedCategory === 'flags') {
        return pin.continent === subCat;
      }
      
      return false;
    }).length;
  };

  return (
    <div>
    
      
      {/* Show charm categories directly with images */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { value: 'bronze', label: 'Bronze Charms', price: '£1.50 each' },
          { value: 'colorful', label: 'Colorful Charms', price: '£2.00 each' },
          { value: 'flags', label: 'Flags Collection', price: '£2.00 each' },
        ].map((opt) => {
          const previewImage = getPreviewImage(opt.value);
          return (
            <button
              key={opt.value}
              type="button"
              role="option"
              aria-selected={selectedCategory === opt.value}
              className={`flex flex-col items-center p-2.5 rounded-lg transition-colors ${
                selectedCategory === opt.value
                  ? 'bg-gray-50'
                  : 'hover:bg-gray-50'
              }`}
              style={{fontFamily: "'Poppins', sans-serif"}}
              onClick={() => {
                setSelectedCategory(opt.value);
                // Close other dropdowns when selecting a category
                if (onDropdownToggle) {
                  onDropdownToggle();
                }
              }}
            >
              {previewImage && (
                <div className="relative mb-2 flex items-center justify-center rounded overflow-visible" style={{ width: '4rem', height: '4rem' }}>
                  <div className="w-full h-full flex items-center justify-center rounded overflow-hidden">
                    <img
                      src={previewImage}
                      alt={opt.label}
                      className="max-w-full max-h-full object-contain p-1"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  {selectedCategory === opt.value && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center z-20 shadow-sm">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              )}
              <span className={`text-xs text-center font-light ${
                selectedCategory === opt.value
                  ? 'text-gray-900'
                  : 'text-gray-600'
              }`}>
                {opt.label}
              </span>
              <span className="text-[10px] text-gray-500 mt-0.5">{opt.price}</span>
            </button>
          );
        })}
      </div>

      {selectedCategory && (
        <div className="mt-4 pb-4">
          {/* Colorful Charms Filter Tabs */}
          {selectedCategory === 'colorful' && (
            <div className="mb-4 flex flex-wrap gap-1 border-b border-gray-200 justify-center">
              {[
                { key: 'all', label: 'ALL' },
                { key: 'travel', label: 'TRAVEL' },
                { key: 'disney', label: 'DISNEY' },
                { key: 'drinks', label: 'DRINKS' },
                { key: 'inspiration', label: 'INSPIRATION' },
                { key: 'hearts', label: 'HEARTS' },
                { key: 'nature', label: 'NATURE' },
                { key: 'camera', label: 'CAMERA' }
              ].map(({ key, label }) => {
                const count = getSubCategoryCount(key);
                return (
                  <button
                    key={key}
                    onClick={() => setSubCategory(key)}
                    className={`px-3 py-2 text-xs uppercase tracking-wider transition-all duration-200 ${
                      subCategory === key 
                        ? 'border-b-2 border-gray-900 text-gray-900 font-medium' 
                        : 'border-b-2 border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
                    }`}
                    style={{fontFamily: "'Poppins', sans-serif"}}
                  >
                    {label} <span className="text-gray-400 font-normal">({count})</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Bronze Charms Filter Tabs */}
          {selectedCategory === 'bronze' && (
            <div className="mb-4 flex flex-wrap gap-1 border-b border-gray-200 justify-center">
              {[
                { key: 'all', label: 'ALL' },
                { key: 'travel', label: 'TRAVEL' },
                { key: 'animals', label: 'ANIMALS' },
                { key: 'love', label: 'LOVE' },
                { key: 'nature', label: 'NATURE' },
                { key: 'symbols', label: 'SYMBOLS' }
              ].map(({ key, label }) => {
                const count = getSubCategoryCount(key);
                return (
                  <button
                    key={key}
                    onClick={() => setSubCategory(key)}
                    className={`px-3 py-2 text-xs uppercase tracking-wider transition-all duration-200 ${
                      subCategory === key 
                        ? 'border-b-2 border-gray-900 text-gray-900 font-medium' 
                        : 'border-b-2 border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
                    }`}
                    style={{fontFamily: "'Poppins', sans-serif"}}
                  >
                    {label} <span className="text-gray-400 font-normal">({count})</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Flags Filter Tabs */}
          {selectedCategory === 'flags' && (
            <div className="mb-4 flex flex-wrap gap-1 border-b border-gray-200 justify-center">
              {[
                { key: 'all', label: 'ALL' },
                { key: 'europe', label: 'EUROPE' },
                { key: 'americas', label: 'AMERICAS' },
                { key: 'africa', label: 'AFRICA' },
                { key: 'asia', label: 'ASIA' },
                { key: 'special', label: 'SPECIAL' }
              ].map(({ key, label }) => {
                const count = getSubCategoryCount(key);
                return (
                  <button
                    key={key}
                    onClick={() => setSubCategory(key)}
                    className={`px-3 py-2 text-xs uppercase tracking-wider transition-all duration-200 ${
                      subCategory === key 
                        ? ' text-gray-900 font-medium' 
                        : ' border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
                    }`}
                    style={{fontFamily: "'Poppins', sans-serif"}}
                  >
                    {label} <span className="text-gray-400 font-normal">({count})</span>
                  </button>
                );
              })}
            </div>
          )}
          <div className="max-h-80 sm:max-h-96 overflow-y-auto p-2">
            <div className="grid grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-2">
              {filteredPins.map((pin, index) => {
                const selectedPinEntry = selectedPins.find((p) => p.pin === pin);
                const isSelected = !!selectedPinEntry;
                const isSoldOut = pin.quantity !== undefined && pin.quantity === 0;
                // Use src as key since it's unique for each pin (even if names are the same)
                const uniqueKey = pin.src ? `${pin.src}-${index}` : `${pin.name}-${index}`;
                
                const handleClick = () => {
                  if (isSoldOut) return;
                  if (isSelected && onRemove && selectedPinEntry) {
                    // If already selected, remove it
                    onRemove(selectedPinEntry.imgInstance);
                  } else {
                    // If not selected, add it
                    onSelect(pin);
                  }
                };
                
                return (
                  <div
                    key={uniqueKey}
                    className={`flex flex-col items-center space-y-1 sm:space-y-2 p-2 sm:p-3 transition-colors group touch-manipulation ${isSoldOut ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    onClick={handleClick}
                  >
                    <div className={`relative ${isSelected ? '' : ''}`} style={{ overflow: 'visible' }}>
                      <div className="w-16 h-16 sm:w-20 sm:h-20 aspect-square flex items-center justify-center bg-transparent">
                        <img
                          src={pin.src}
                          alt={pin.name}
                          className={`w-full h-full object-contain transition-all duration-200 rounded ${isSoldOut ? 'opacity-50' : ''}`}
                        />
                      </div>
                      {isSelected && !isSoldOut && (
                        <div className="absolute -top-1 -right-1 bg-black text-white w-6 h-6 flex items-center justify-center text-xs rounded-full z-10 shadow-md">
                          ✓
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-center text-gray-700 transition-colors line-clamp-2" style={{fontFamily: "'Poppins', sans-serif"}}>
                      {pin.name}
                    </span>
                    {/* Show charm size */}
                  
                    {isSoldOut && (
                      <span className="text-[9px] text-red-600 font-medium">Sold Out</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PinSelector;
