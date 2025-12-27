import React, { useState } from "react";
import { Link } from "react-router-dom";
import Products from '../../data/products.json';
import { useCurrency } from '../../context/CurrencyContext';

const Items = () => {
  const { formatPrice } = useCurrency();
  
  // Map case types to display names
  const caseDisplayNames = {
    economy: "Economy Case",
    business: "Business Class Case",
    firstclass: "First Class Case"
  };

  return (
    <section className="bg-white relative items-center justify-center py-20 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 ">
        {/* Header Section */}
        <div className="text-center">
          <h2 className="text-title md:text-title-lg font-light text-gray-900 mb-3 font-inter tracking-title">
            Our Cases
          </h2>
        </div>
      
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-12 md:gap-16 w-full xl:max-w-7xl mx-auto items-stretch">
          {Products.cases.map((item, index) => (
            <ProductCard key={index} item={item} displayName={caseDisplayNames[item.type] || item.name} formatPrice={formatPrice} />
          ))}
        </div>

        {/* Bottom decoration */}
      
      </div>
    </section>
  );
};

const ProductCard = ({ item, displayName, formatPrice }) => {
  const [selectedColorData, setSelectedColorData] = useState(item.colors[0] || null);
  const [isHovered, setIsHovered] = useState(false);
  const selectedImage = selectedColorData?.image || item.images[0];
  
  // For all case types, show inside image on hover - using same images as PassportCases page
  const getHoverImage = () => {
    if (item.type === 'firstclass') {
      return '/TheHappyCase/images/FirstClassCase/firstclass.jpg';
    } else if (item.type === 'economy') {
      return '/TheHappyCase/images/SmartCase/economycaseinside.jpg';
    } else if (item.type === 'business') {
      return '/TheHappyCase/images/BusinessClassCase/businessclass.png';
    }
    
    return null;
  };
  
  const hoverImage = getHoverImage();

  return (
    <div className="group flex flex-col h-full">
      {/* Product Image */}
      <div className="relative mt-8">
        <div 
          className="aspect-square overflow-hidden w-full max-w-2xl mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-3xl transition-all duration-300 hover:border-gray-300 h-[250px] sm:h-[300px] md:h-[350px] relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main image - no zoom */}
          <img
            src={selectedImage}
            alt={displayName}
            className={`w-full h-full object-contain transition-opacity duration-300 ${isHovered && hoverImage ? 'opacity-0' : 'opacity-100'}`}
            style={{ display: isHovered && hoverImage ? 'none' : 'block' }}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            width="400"
            height="400"
          />
          
          {/* Hover image - with zoom out effect (appears further away) */}
          {hoverImage && (
            <img
              src={hoverImage}
              alt={`${displayName} - Inside view`}
              className={`absolute inset-0 w-full h-full object-contain transition-all duration-300 ${isHovered ? 'opacity-100 scale-90' : 'opacity-0 scale-100'}`}
              style={{ display: isHovered ? 'block' : 'none' }}
              loading="lazy"
              fetchPriority="low"
              decoding="async"
              width="400"
              height="400"
            />
          )}
        </div>
      </div>

      {/* Color Selector */}
      {item.colors && item.colors.length > 0 && (
        <div className="col-span-2 text-center flex justify-center flex-wrap gap-1.5 sm:gap-2 mt-1 md:mt-4">
          {item.colors.map((colorData, i) => (
            <button
              key={i}
              onClick={() => {
                setSelectedColorData(colorData);
              }}
              className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 transition-all duration-200 ${
                selectedColorData?.color === colorData.color 
                  ? 'border-gray-900 ring-2 ring-gray-300 scale-110' 
                  : 'border-gray-200 hover:border-gray-400 hover:scale-105'
              }`}
              style={{ backgroundColor: colorData.color }}
              title={colorData.color}
            ></button>
          ))}
        </div>
      )}

      {/* Product Info */}
      <div className="text-center flex flex-col flex-grow">
        <h3 className="text-heading-sm font-light text-gray-800 mb-2 mt-4 font-inter">
          {displayName}
        </h3>
        <p className="text-body-md text-gray-700 mb-6 font-bold font-inter">
          {formatPrice(item.basePrice || 0)}
        </p>
        
        {/* Create Now Button */}
        <div className="mt-auto">
          <Link
            to="/CreateYours"
            className="inline-block w-full py-3 text-sm uppercase tracking-wider text-center shadow-lg font-inter bg-btn-primary-blue hover:bg-btn-primary-blue-hover text-btn-primary-blue-text border border-btn-primary-blue-border hover:border-btn-primary-blue-hover transition-all duration-200"
          >
           PERSONALIZE
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Items;
