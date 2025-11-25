import React from 'react';
import { trustFeatures, pastelColors, iconColors } from '../../data/data';
import TrustFeatureCard from './components/TrustFeatureCard';

const TrustFeatures = () => {
  return (
    <div className="bg-white py-8 md:py-12 px-4 border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8 md:gap-12">
          {trustFeatures.map((feature, index) => (
            <TrustFeatureCard
              key={index}
              feature={feature}
              index={index}
              pastelColors={pastelColors}
              iconColors={iconColors}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustFeatures;
