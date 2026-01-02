import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Products from '../../data/products.json';

const DesignIdeas = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Sample design ideas with different combinations
  const designIdeas = {
    bronze: [
      {
        id: 1,
        title: "Travel Collection",
        description: "Classic bronze travel charms",
        caseColor: "#b0582c",
        caseImage: "/TheHappyCase/images/SmartCase/economycasebrown.png",
        pins: [
          Products.pins.bronze.find(p => p.name.toLowerCase().includes('airplane')),
          Products.pins.bronze.find(p => p.name.toLowerCase().includes('passport')),
          Products.pins.bronze.find(p => p.name.toLowerCase().includes('globe')),
        ].filter(Boolean)
      },
      {
        id: 2,
        title: "Landmarks Collection",
        description: "Iconic landmarks in bronze",
        caseColor: "#413f44",
        caseImage: "/TheHappyCase/images/SmartCase/economycaseblack.png",
        pins: [
          Products.pins.bronze.find(p => p.name.toLowerCase().includes('eiffel')),
          Products.pins.bronze.find(p => p.name.toLowerCase().includes('bigben')),
          Products.pins.bronze.find(p => p.name.toLowerCase().includes('liberty')),
        ].filter(Boolean)
      },
      {
        id: 3,
        title: "Nature & Symbols",
        description: "Elegant bronze nature charms",
        caseColor: "#59332e",
        caseImage: "/TheHappyCase/images/SmartCase/economycasedarkbrown.png",
        pins: [
          Products.pins.bronze.find(p => p.name.toLowerCase().includes('heart')),
          Products.pins.bronze.find(p => p.name.toLowerCase().includes('leaf')),
          Products.pins.bronze.find(p => p.name.toLowerCase().includes('maple')),
        ].filter(Boolean)
      }
    ],
    colorful: [
      {
        id: 4,
        title: "Adventure Vibes",
        description: "Colorful adventure-themed pins",
        caseColor: "#f49f90",
        caseImage: "/TheHappyCase/images/SmartCase/economycasepink.png",
        pins: [
          Products.pins.colorful.find(p => p.name.toLowerCase().includes('adventure')),
          Products.pins.colorful.find(p => p.name.toLowerCase().includes('airplane')),
          Products.pins.colorful.find(p => p.name.toLowerCase().includes('backpack')),
        ].filter(Boolean)
      },
      {
        id: 5,
        title: "Positive Energy",
        description: "Bright and happy colorful pins",
        caseColor: "#cb0025",
        caseImage: "/TheHappyCase/images/SmartCase/economycasered.png",
        pins: [
          Products.pins.colorful.find(p => p.name.toLowerCase().includes('be happy')),
          Products.pins.colorful.find(p => p.name.toLowerCase().includes('dream big')),
          Products.pins.colorful.find(p => p.name.toLowerCase().includes('be kind')),
        ].filter(Boolean)
      },
      {
        id: 6,
        title: "Travel Essentials",
        description: "Colorful travel accessories",
        caseColor: "#9cb4b8",
        caseImage: "/TheHappyCase/images/SmartCase/economycaselightblue.png",
        pins: [
          Products.pins.colorful.find(p => p.name.toLowerCase().includes('camera')),
          Products.pins.colorful.find(p => p.name.toLowerCase().includes('suitcase')),
          Products.pins.colorful.find(p => p.name.toLowerCase().includes('passport')),
        ].filter(Boolean)
      }
    ],
    flags: [
      {
        id: 7,
        title: "European Flags",
        description: "Show your European heritage",
        caseColor: "#1e40af",
        caseImage: "/TheHappyCase/images/FirstClassCase/firstclasscasebrown.png",
        pins: [
          Products.pins.flags.find(p => p.name.toLowerCase().includes('france')),
          Products.pins.flags.find(p => p.name.toLowerCase().includes('spain')),
          Products.pins.flags.find(p => p.name.toLowerCase().includes('italian')),
        ].filter(Boolean)
      },
      {
        id: 8,
        title: "World Traveler",
        description: "Flags from around the world",
        caseColor: "#955a3c",
        caseImage: "/TheHappyCase/images/FirstClassCase/firstclasscasebrown.png",
        pins: [
          Products.pins.flags.find(p => p.name.toLowerCase().includes('brazil')),
          Products.pins.flags.find(p => p.name.toLowerCase().includes('portugal')),
          Products.pins.flags.find(p => p.name.toLowerCase().includes('uk')),
        ].filter(Boolean)
      },
      {
        id: 9,
        title: "Pride & Unity",
        description: "Celebrate diversity with flags",
        caseColor: "#7c3aed",
        caseImage: "/TheHappyCase/images/BusinessClassCase/businessclasscasepink.png",
        pins: [
          Products.pins.flags.find(p => p.name.toLowerCase().includes('lgbtqia')),
          Products.pins.flags.find(p => p.name.toLowerCase().includes('rainbow')),
        ].filter(Boolean)
      }
    ],
    mixed: [
      {
        id: 10,
        title: "Traveler's Dream",
        description: "Mix of bronze and colorful travel pins",
        caseColor: "#b0582c",
        caseImage: "/TheHappyCase/images/SmartCase/economycasebrown.png",
        pins: [
          Products.pins.bronze.find(p => p.name.toLowerCase().includes('airplane')),
          Products.pins.colorful.find(p => p.name.toLowerCase().includes('adventure')),
          Products.pins.flags.find(p => p.name.toLowerCase().includes('france')),
        ].filter(Boolean)
      },
      {
        id: 11,
        title: "Nature & Culture",
        description: "Bronze nature with colorful accents",
        caseColor: "#413f44",
        caseImage: "/TheHappyCase/images/SmartCase/economycaseblack.png",
        pins: [
          Products.pins.bronze.find(p => p.name.toLowerCase().includes('heart')),
          Products.pins.colorful.find(p => p.name.toLowerCase().includes('heart')),
          Products.pins.bronze.find(p => p.name.toLowerCase().includes('leaf')),
        ].filter(Boolean)
      },
      {
        id: 12,
        title: "Global Explorer",
        description: "Flags, landmarks, and travel pins",
        caseColor: "#f49f90",
        caseImage: "/TheHappyCase/images/SmartCase/economycasepink.png",
        pins: [
          Products.pins.flags.find(p => p.name.toLowerCase().includes('brazil')),
          Products.pins.bronze.find(p => p.name.toLowerCase().includes('globe')),
          Products.pins.colorful.find(p => p.name.toLowerCase().includes('camera')),
        ].filter(Boolean)
      }
    ]
  };

  const getFilteredIdeas = () => {
    if (selectedCategory === 'all') {
      return [...designIdeas.bronze, ...designIdeas.colorful, ...designIdeas.flags, ...designIdeas.mixed];
    }
    return designIdeas[selectedCategory] || [];
  };

  const handleCreateDesign = (idea) => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    navigate('/CreateYours');
  };

  return (
    <div className="min-h-screen bg-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-2 font-inter tracking-title">
            Design Ideas
          </h1>
          <div className="w-16 h-px bg-gray-300 mx-auto mb-4"></div>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto font-light font-inter">
            Get inspired by our curated design collections. Mix and match to create your perfect personalized passport case!
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { key: 'all', label: 'All Ideas' },
            { key: 'bronze', label: 'Bronze Charms' },
            { key: 'colorful', label: 'Colorful Pins' },
            { key: 'flags', label: 'Flags' },
            { key: 'mixed', label: 'Mixed' }
          ].map((category) => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`px-4 py-2 text-xs uppercase tracking-wider transition-all duration-200 font-inter ${
                selectedCategory === category.key
                  ? 'border-b-2 border-gray-900 text-gray-900 font-medium'
                  : 'border-b-2 border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Design Ideas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {getFilteredIdeas().map((idea, ideaIndex) => {
            const pastelColors = ['bg-pink-50', 'bg-blue-50', 'bg-purple-50', 'bg-green-50', 'bg-yellow-50', 'bg-orange-50'];
            const pastelBorders = ['border-pink-100', 'border-blue-100', 'border-purple-100', 'border-green-100', 'border-yellow-100', 'border-orange-100'];
            const colorIndex = ideaIndex % pastelColors.length;
            return (
            <div
              key={idea.id}
              className="flex flex-col border border-gray-100 group"
            >
              {/* Case Preview */}
              <div className={`relative mb-4 ${pastelColors[colorIndex]} border-b ${pastelBorders[colorIndex]} p-4`}>
                <div className={`aspect-[3/4] ${pastelColors[colorIndex]} flex items-center justify-center overflow-hidden relative`}>
                  {idea.caseImage && (
                    <img
                      src={idea.caseImage}
                      alt={idea.title}
                      className="w-full h-full object-contain"
                      loading="lazy"
                      fetchPriority="low"
                      decoding="async"
                      width="300"
                      height="400"
                      onError={(e) => {
                        if (e.target) {
                          e.target.style.display = 'none';
                        }
                      }}
                    />
                  )}
                  {/* Pins Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center gap-2 flex-wrap p-4">
                    {idea.pins.slice(0, 3).map((pin, index) => {
                      const pastelColors = ['bg-pink-50', 'bg-blue-50', 'bg-purple-50', 'bg-green-50', 'bg-yellow-50', 'bg-orange-50'];
                      const pastelBorders = ['border-pink-100', 'border-blue-100', 'border-purple-100', 'border-green-100', 'border-yellow-100', 'border-orange-100'];
                      const colorIndex = index % pastelColors.length;
                      return pin && (
                        <div
                          key={index}
                          className={`w-12 h-12 ${pastelColors[colorIndex]} rounded-full p-1 border ${pastelBorders[colorIndex]}`}
                          style={{
                            position: 'absolute',
                            top: `${20 + index * 25}%`,
                            left: `${30 + index * 20}%`,
                            transform: `rotate(${index * 15}deg)`
                          }}
                        >
                          <img
                            src={pin.src}
                            alt={pin.name}
                            className="w-full h-full object-contain"
                            loading="lazy"
                            fetchPriority="low"
                            decoding="async"
                            width="48"
                            height="48"
                            onError={(e) => {
                              if (e.target) {
                                e.target.style.display = 'none';
                              }
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Idea Info */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-light text-gray-900 mb-2 font-inter">
                  {idea.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4 font-light font-inter">
                  {idea.description}
                </p>

                {/* Pins List */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {idea.pins.slice(0, 3).map((pin, index) => {
                    const pastelColors = ['bg-pink-50', 'bg-blue-50', 'bg-purple-50', 'bg-green-50', 'bg-yellow-50', 'bg-orange-50'];
                    const pastelBorders = ['border-pink-100', 'border-blue-100', 'border-purple-100', 'border-green-100', 'border-yellow-100', 'border-orange-100'];
                    const colorIndex = index % pastelColors.length;
                    return pin && (
                      <div
                        key={index}
                        className={`w-8 h-8 ${pastelColors[colorIndex]} rounded-full p-1 border ${pastelBorders[colorIndex]}`}
                        title={pin.name}
                      >
                        <img
                          src={pin.src}
                          alt={pin.name}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            if (e.target) {
                              e.target.style.display = 'none';
                            }
                          }}
                        />
                      </div>
                    );
                  })}
                  {idea.pins.length > 3 && (
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-xs font-light text-gray-600 border border-gray-200 font-inter">
                      +{idea.pins.length - 3}
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <button
                  className="w-full px-4 py-2 text-xs uppercase tracking-wider text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-400 transition-all duration-200 mt-auto font-inter"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCreateDesign(idea);
                  }}
                >
                  Create This Design
                </button>
              </div>
            </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="border border-gray-100 p-8 md:p-12 text-center bg-white mt-8">
          <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-2 font-inter tracking-title">
            Ready to Create Your Own?
          </h2>
          <div className="w-16 h-px bg-gray-300 mx-auto mb-4"></div>
          <p className="text-sm text-gray-500 mb-6 font-light max-w-2xl mx-auto font-inter">
            Start designing your custom passport case with our interactive creator!
          </p>
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'instant' });
              navigate('/CreateYours');
            }}
            className="px-6 py-2 text-xs uppercase tracking-wider text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-400 transition-all duration-200 font-inter"
          >
            Start Creating Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DesignIdeas;
