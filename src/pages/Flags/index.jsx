import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Products from '../../products.json';

const Flags = () => {
  const navigate = useNavigate();
  const [selectedFlag, setSelectedFlag] = useState(null);

  // Get flags from the dedicated flags section in products.json
  const flagPins = Products.pins.flags || [];

  const handleFlagClick = (flag) => {
    setSelectedFlag(flag);
    // Navigate to CreateYours with the selected flag
    navigate('/CreateYours', { state: { selectedPin: flag, category: 'flags' } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-blue-50 to-sky-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold happy-text-gradient lazy-dog-title mb-4 "  style={{fontFamily: "'Fredoka One', cursive"}}>
            Flag Charms Collection
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto student-text">
            Show your love for different countries and cultures with our beautiful flag charms. 
            Perfect for travelers and world citizens! 
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-8">
          <div className="happy-card p-2">
            <div className="flex space-x-2">
              <button className="px-6 py-2 rounded-full text-sm bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 transform hover:scale-105 shadow-lg">
                All Flags
              </button>
              <button className="px-6 py-2 rounded-full text-sm bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 transform hover:scale-105 shadow-lg">
                European
              </button>
              <button className="px-6 py-2 rounded-full text-sm bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Americas
              </button>
              <button className="px-6 py-2 rounded-full text-sm bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Special
              </button>
            </div>
          </div>
        </div>

        {/* Flags Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-12">
          {flagPins.map((flag, index) => (
            <div
              key={index}
              className="happy-card p-4 cursor-pointer group hover:scale-105 transition-all duration-300"
              onClick={() => handleFlagClick(flag)}
            >
              <div className="aspect-square mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center overflow-hidden">
                <img
                  src={flag.src}
                  alt={flag.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden w-full h-full items-center justify-center text-gray-400">
                  <span className="text-4xl">🏳️</span>
                </div>
              </div>
              <h3 className="font-semibold text-gray-800 text-center mb-2 group-hover:text-purple-600 transition-colors">
                {flag.name}
              </h3>
              <div className="text-center">
                <span className="text-lg font-bold happy-text-gradient">£2.00</span>
                {/* <span className="text-sm text-gray-500 ml-2">Colorful Charm</span> */}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="happy-card p-8 text-center">
          <h2 className="text-3xl font-bold happy-text-gradient lazy-dog-title mb-4">
            Ready to Create Your Flag Design?
          </h2>
          <p className="text-gray-600 mb-6 text-lg student-text" style={{fontFamily: "'Poppins', sans-serif"}}>
            Click on any flag above to start designing your custom phone case, or explore our other charm collections!
          </p>
          <div className="flex justify-center space-x-4">
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
              View All Colorful Charms
            </button>
          </div>
        </div>

        {/* Selected Flag Modal */}
        {selectedFlag && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="happy-card p-8 max-w-md w-full">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center overflow-hidden">
                  <img
                    src={selectedFlag.src}
                    alt={selectedFlag.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden w-full h-full items-center justify-center text-gray-400">
                    <span className="text-6xl">🏳️</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold happy-text-gradient mb-2">
                  {selectedFlag.name}
                </h3>
                <p className="text-gray-600 mb-6">
                  Add this beautiful flag charm to your custom phone case design!
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleFlagClick(selectedFlag)}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-full hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Add to Design
                  </button>
                  <button
                    onClick={() => setSelectedFlag(null)}
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

export default Flags;
