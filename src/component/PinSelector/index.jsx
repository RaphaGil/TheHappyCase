import React, { useState, useMemo, useRef, useEffect } from "react";

const PinSelector = ({ pins, selectedCategory, setSelectedCategory, selectedPins, onSelect }) => {
  const [subCategory, setSubCategory] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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
    if (selectedCategory !== 'colorful') return pins;
    if (subCategory === 'all') return pins;

    return pins.filter((pin) => {
      const n = pin.name.toLowerCase();
      if (subCategory === 'travel') {
        return (
          n.includes('airplane') ||
          n.includes('passport') ||
          n.includes('luggage') ||
          n.includes('adventure') ||
          n.includes('travel') ||
          n.includes('boarding') ||
          n.includes('ticket') ||
          n.includes('map') ||
          n.includes('kombi') ||
          n.includes('london') ||
          n.includes('rome') ||
          n.includes('paris')
        );
      }
      if (subCategory === 'inspiration') {
        return (
          n.includes('happy') ||
          n.includes('kind') ||
          n.includes('good') ||
          n.includes('dream') ||
          n.includes('life') ||
          n.includes('incredible') ||
          n.includes('be ')
        );
      }
      if (subCategory === 'flags') {
        return n.includes('flag');
      }
      return true;
    });
  }, [pins, selectedCategory, subCategory]);

  return (
    <div className="happy-card">
      {/* <h3 className="happy-text-gradient lazy-dog-title text-xl mb-4 flex items-center" style={{fontFamily: "'Fredoka One', cursive"}}>
      Choose Your Charms
      </h3> */}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-full bg-white text-gray-800 shadow-sm flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-purple-500 student-text"
          style={{fontFamily: "'Inter', sans-serif", fontWeight: 300}}
          onClick={() => setIsDropdownOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={isDropdownOpen}
        >
          <span>
            {selectedCategory === 'bronze' && 'Bronze Charms (£1.50 each)'}
            {selectedCategory === 'colorful' && 'Colorful Charms (£2.00 each)'}
            {selectedCategory === 'flags' && 'Flags Collection (£2.00 each)'}
            {!selectedCategory && 'Select a Category'}
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.216l3.71-3.0a.75.75 0 111.06 1.06l-4.24 3.43a.75.75 0 01-.96 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
          </svg>
        </button>
        {isDropdownOpen && (
          <ul
            className="absolute z-50 mt-2 w-full max-h-64 overflow-auto rounded-xl border border-gray-200 bg-white shadow-xl focus:outline-none"
            role="listbox"
          >
            {[
              { value: '', label: 'Select a Category' },
              { value: 'bronze', label: 'Bronze Charms (£1.50 each)' },
              { value: 'colorful', label: 'Colorful Charms (£2.00 each)' },
              { value: 'flags', label: 'Flags Collection (£2.00 each)' },
            ].map((opt) => (
              <li
                key={opt.value || 'all'}
                role="option"
                aria-selected={selectedCategory === opt.value}
                className={`px-4 py-2 cursor-pointer student-text ${selectedCategory === opt.value ? 'bg-purple-50 text-purple-700' : 'text-gray-700 hover:bg-gray-50'}`}
                style={{fontFamily: "'Inter', sans-serif", fontWeight: 300}}
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
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-3 student-text" style={{fontFamily: "'Inter', sans-serif", fontWeight: 300}}>
            💡 Click on any charm below to add it to your design
          </p>
          {selectedCategory === 'colorful' && (
            <div className="mb-3 flex flex-wrap gap-2">
              {['all', 'travel', 'inspiration', 'flags'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSubCategory(cat)}
                  className={`px-3 py-2 rounded-full text-xs font-medium transition-colors ${
                    subCategory === cat ? 'happy-button' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          )}
          <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-gray-200 rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filteredPins.map((pin) => (
                <div
                  key={pin.name}
                  className="cursor-pointer flex flex-col items-center space-y-2 p-2 rounded-lg hover:bg-purple-50 transition-colors group"
                  onClick={() => onSelect(pin)}
                >
                  <div className="relative">
                    <img
                      src={pin.src}
                      alt={pin.name}
                      className={`w-24 h-24 rounded-xl object-contain ${
                        selectedPins.some((p) => p.pin === pin)
                          ? "border-3 border-purple-500 shadow-lg ring-2 ring-purple-200"
                          : "border border-gray-300 group-hover:border-purple-300"
                      } transition-all duration-200`}
                    />
                    {selectedPins.some((p) => p.pin === pin) && (
                      <div className="absolute -top-1 -right-1 bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                        ✓
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-center text-gray-700 group-hover:text-purple-600 transition-colors line-clamp-2 student-text" style={{fontFamily: "'Inter', sans-serif", fontWeight: 300}}>
                    {pin.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PinSelector;
