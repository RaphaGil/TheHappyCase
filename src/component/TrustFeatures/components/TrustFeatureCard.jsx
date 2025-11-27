import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TrustFeatureCard = ({ feature, index, pastelColors, iconColors }) => {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Icon */}
      <div className={`mb-3 p-4 rounded-full ${pastelColors[index % pastelColors.length]} transition-all duration-300 hover:scale-110`}>
        <FontAwesomeIcon 
          icon={feature.icon} 
          className={`text-xl sm:text-2xl md:text-3xl ${iconColors[index % iconColors.length]}`}
        />
      </div>

      {/* Title */}
      <h3 
        className="text-xs uppercase tracking-wider font-light text-gray-700 leading-tight font-inter"
      >
        {feature.title}
      </h3>
    </div>
  );
};

export default TrustFeatureCard;

