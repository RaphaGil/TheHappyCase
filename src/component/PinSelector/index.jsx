import React, { useState, useMemo, useRef, useEffect } from "react";

const PinSelector = ({ pins, selectedCategory, setSelectedCategory, selectedPins, onSelect }) => {
  const [subCategory, setSubCategory] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Reset subCategory when selectedCategory changes
  useEffect(() => {
    setSubCategory('all');
  }, [selectedCategory]);

  useEffect(() => {
    const onDocClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

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

  return (
    <div>
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          className={`w-full px-4 py-3 border rounded-sm bg-white text-gray-900 flex items-center justify-between focus:outline-none focus:border-gray-400 transition-all duration-200 text-sm ${
            isDropdownOpen 
              ? 'border-gray-400 bg-gray-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
          style={{fontFamily: "'Poppins', sans-serif"}}
          onClick={() => setIsDropdownOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={isDropdownOpen}
        >
          <span>
            {selectedCategory === 'bronze' && 'Bronze Charms (£1.50 each)'}
            {selectedCategory === 'colorful' && 'Colorful Charms (£2.00 each)'}
            {selectedCategory === 'flags' && 'Flags Collection (£2.00 each)'}
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.216l3.71-3.0a.75.75 0 111.06 1.06l-4.24 3.43a.75.75 0 01-.96 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
          </svg>
        </button>
        {isDropdownOpen && (
          <ul
            className="absolute z-50 mt-1 w-full max-h-64 overflow-auto bg-white border border-gray-200 shadow-lg focus:outline-none"
            role="listbox"
          >
            {[
              { value: 'bronze', label: 'Bronze Charms (£1.50 each)' },
              { value: 'colorful', label: 'Colorful Charms (£2.00 each)' },
              { value: 'flags', label: 'Flags Collection (£2.00 each)' },
            ].map((opt) => (
              <li
                key={opt.value || 'all'}
                role="option"
                aria-selected={selectedCategory === opt.value}
                className={`px-4 py-2 cursor-pointer transition-colors duration-200 border-b border-gray-50 last:border-b-0 ${
                  selectedCategory === opt.value 
                    ? 'bg-gray-50 text-gray-900 font-medium' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                style={{fontFamily: "'Poppins', sans-serif"}}
                onClick={() => {
                  setSelectedCategory(opt.value);
                  setIsDropdownOpen(false);
                }}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        )}
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
              ].map(({ key, label }) => (
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
                  {label}
                </button>
              ))}
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
              ].map(({ key, label }) => (
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
                  {label}
                </button>
              ))}
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
              ].map(({ key, label }) => (
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
                  {label}
                </button>
              ))}
            </div>
          )}
          <div className="max-h-80 sm:max-h-96 overflow-y-auto p-2">
            <div className="grid grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-2">
              {filteredPins.map((pin) => {
                const isSelected = selectedPins.some((p) => p.pin === pin);
                const isSoldOut = pin.quantity !== undefined && pin.quantity === 0;
                return (
                  <div
                    key={pin.name}
                    className={`flex flex-col items-center space-y-1 sm:space-y-2 p-2 sm:p-3 transition-colors group touch-manipulation ${isSoldOut ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    onClick={() => !isSoldOut && onSelect(pin)}
                  >
                    <div className={`relative ${isSelected ? 'border-2 border-gray-900 rounded' : ''}`}>
                      <img
                        src={pin.src}
                        alt={pin.name}
                        className={`w-16 h-16 sm:w-20 sm:h-20 object-contain bg-gray-50 transition-all duration-200 ${isSoldOut ? 'opacity-50' : ''}`}
                      />
                      {isSelected && !isSoldOut && (
                        <div className="absolute -top-1 -right-1 bg-gray-900 text-white w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-xs rounded-full">
                          ✓
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-center text-gray-700 transition-colors line-clamp-2" style={{fontFamily: "'Poppins', sans-serif"}}>
                      {pin.name}
                    </span>
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
