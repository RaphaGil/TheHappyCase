import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Products from '../../products.json';

const BronzeCharms = () => {
  const navigate = useNavigate();
  const [selectedCharm, setSelectedCharm] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const bronzePins = Products.pins.bronze;

  // Filter charms based on search and category
  const filteredPins = bronzePins.filter(pin => {
    const matchesSearch = pin.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedCategory === 'all') return matchesSearch;
    if (selectedCategory === 'travel') {
      return matchesSearch && (
        pin.name.toLowerCase().includes('airplane') ||
        pin.name.toLowerCase().includes('passport') ||
        pin.name.toLowerCase().includes('luggage') ||
        pin.name.toLowerCase().includes('taxi') ||
        pin.name.toLowerCase().includes('bus') ||
        pin.name.toLowerCase().includes('globe')
      );
    }
    if (selectedCategory === 'landmarks') {
      return matchesSearch && (
        pin.name.toLowerCase().includes('bigben') ||
        pin.name.toLowerCase().includes('eiffel') ||
        pin.name.toLowerCase().includes('pisa') ||
        pin.name.toLowerCase().includes('pyramid') ||
        pin.name.toLowerCase().includes('liberty') ||
        pin.name.toLowerCase().includes('arc')
      );
    }
    if (selectedCategory === 'animals') {
      return matchesSearch && (
        pin.name.toLowerCase().includes('kangaroo') ||
        pin.name.toLowerCase().includes('koala') ||
        pin.name.toLowerCase().includes('llama')
      );
    }
    if (selectedCategory === 'symbols') {
      return matchesSearch && (
        pin.name.toLowerCase().includes('heart') ||
        pin.name.toLowerCase().includes('leaf') ||
        pin.name.toLowerCase().includes('hamsa') ||
        pin.name.toLowerCase().includes('cardinal')
      );
    }
    
    return matchesSearch;
  });

  const handleCharmClick = (charm) => {
    setSelectedCharm(charm);
  };

  const handleAddToDesign = () => {
    if (selectedCharm) {
      navigate('/CreateYours', { state: { selectedPin: selectedCharm, category: 'bronze' } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-blue-50 to-sky-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold happy-text-gradient lazy-dog-title mb-4"  style={{fontFamily: "'Fredoka One', cursive"}}>
            Bronze Charms Collection
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto student-text">
            Classic, elegant, and timeless! Our bronze charms add a sophisticated touch to your phone case. 
            Perfect for the refined traveler and classic style lover! 
          </p>
        </div>

        {/* Search and Filter */}
        <div className="happy-card p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search bronze charms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </span>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {['all', 'travel', 'landmarks', 'animals', 'symbols'].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg'
                      : 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:from-blue-600 hover:to-cyan-500 shadow-lg'
                  }`}
                >
                  {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredPins.length} of {bronzePins.length} bronze charms
          </p>
        </div>

        {/* Charms Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-12">
          {filteredPins.map((charm, index) => (
            <div
              key={index}
              className="happy-card p-4 cursor-pointer group hover:scale-105 transition-all duration-300"
              onClick={() => handleCharmClick(charm)}
            >
              <div className="aspect-square mb-4 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center overflow-hidden">
                <img
                  src={charm.src}
                  alt={charm.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
             
              </div>
              <h3 className="font-semibold text-gray-800 text-center mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                {charm.name}
              </h3>
              <div className="text-center">
                <span className="text-lg font-bold happy-text-gradient">£1.50</span>
   
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredPins.length === 0 && (
          <div className="happy-card p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold happy-text-gradient mb-4">No charms found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms or category filter to find the perfect bronze charm!
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="happy-button-secondary px-6 py-3"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="happy-card p-8 text-center">
          <h2 className="text-3xl font-bold happy-text-gradient lazy-dog-title mb-4" style={{fontFamily: "'Fredoka One', cursive"}}>
            Ready to Create Your Bronze Design?
          </h2>
          <p className="text-gray-600 mb-6 text-lg student-text" style={{fontFamily: "'Poppins', sans-serif"}}>
            Click on any charm above to start designing your custom phone case, or explore our other collections!
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => navigate('/CreateYours')}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-full hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
            >
              Start Creating
            </button>
            <button
              onClick={() => navigate('/ColorfulCharms')}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-full hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
            >
              View Colorful Charms
            </button>
            <button
              onClick={() => navigate('/Flags')}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-full hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
            >
              View Flags
            </button>
          </div>
        </div>

        {/* Selected Charm Modal */}
        {selectedCharm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="happy-card p-8 max-w-md w-full">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center overflow-hidden">
                  <img
                    src={selectedCharm.src}
                    alt={selectedCharm.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden w-full h-full items-center justify-center text-amber-400">
                    <span className="text-6xl">🥉</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold happy-text-gradient mb-2">
                  {selectedCharm.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  An elegant bronze charm to add sophistication to your phone case!
                </p>
                <div className="mb-6">
                  <span className="text-3xl font-bold happy-text-gradient">£1.50</span>
                  <span className="text-gray-500 ml-2">Bronze Charm</span>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={handleAddToDesign}
                    className="happy-button-secondary flex-1"
                  >
                    Add to Design
                  </button>
                  <button
                    onClick={() => setSelectedCharm(null)}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BronzeCharms;
