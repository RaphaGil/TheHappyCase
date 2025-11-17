import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShieldAlt, 
  faShippingFast, 
  faLock, 
  faAward, 
  faHeart
} from '@fortawesome/free-solid-svg-icons';

const TrustFeatures = () => {
  const features = [
    {
      icon: faShieldAlt,
      title: "Safe Website",
      description: "Secure & encrypted checkout"
    },
    {
      icon: faShippingFast,
      title: "Ship Worldwide",
      description: "Free shipping on orders over $50"
    },
    {
      icon: faLock,
      title: "Secure Payment",
      description: "100% secure payment processing"
    },
    {
      icon: faAward,
      title: "Premium Quality",
      description: "High-quality materials & craftsmanship"
    },
    {
      icon: faHeart,
      title: "Made with Love",
      description: "Handcrafted with attention to detail"
    },
  ];

  const pastelColors = ['bg-pink-50', 'bg-blue-50', 'bg-purple-50', 'bg-green-50', 'bg-yellow-50'];
  const iconColors = ['text-pink-300', 'text-blue-300', 'text-purple-300', 'text-green-300', 'text-yellow-300'];

  return (
    <div className="bg-white py-8 md:py-12 px-4 border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8 md:gap-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center"
            >
              {/* Icon */}
              <div className={`mb-3 p-4 rounded-full ${pastelColors[index % pastelColors.length]} transition-all duration-300 hover:scale-110`}>
                <FontAwesomeIcon 
                  icon={feature.icon} 
                  className={`text-xl sm:text-2xl md:text-3xl ${iconColors[index % iconColors.length]}`}
                />
              </div>

              {/* Title */}
              <h3 
                className="text-xs uppercase tracking-wider font-light text-gray-700 leading-tight"
                style={{fontFamily: "'Poppins', sans-serif"}}
              >
                {feature.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustFeatures;
