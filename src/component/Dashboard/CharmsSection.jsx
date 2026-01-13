import React from 'react';
import CharmItem from './CharmItem';

const CharmsSection = ({ charms, onQuantityChange }) => {
  return (
    <div className="bg-white border p-6 rounded-sm mt-8">
      <h2 className="text-xl mb-6 font-inter">Charms</h2>

      {/* Flags Charms */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4 font-inter">
          Flags
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {charms.flags.map((charm, index) => (
            <CharmItem
              key={index}
              charm={charm}
              index={index}
              category="flags"
              onQuantityChange={onQuantityChange}
            />
          ))}
        </div>
      </div>

      {/* Colorful Charms */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4 font-inter">
          Colorful Charms
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {charms.colorful.map((charm, index) => (
            <CharmItem
              key={index}
              charm={charm}
              index={index}
              category="colorful"
              onQuantityChange={onQuantityChange}
            />
          ))}
        </div>
      </div>

      {/* Bronze Charms */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4 font-inter">
          Bronze Charms
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {charms.bronze.map((charm, index) => (
            <CharmItem
              key={index}
              charm={charm}
              index={index}
              category="bronze"
              onQuantityChange={onQuantityChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharmsSection;
