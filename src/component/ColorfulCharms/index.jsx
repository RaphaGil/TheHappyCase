import React from 'react';
import Products from '../../data/products.json';
import CharmsPage from '../../pages/Charms/components/CharmsPage';
import { filterColorfulCharms } from '../../data/filterFunctions';

const ColorfulCharms = () => {
  const colorfulPins = Products.pins.colorful;

  return (
    <CharmsPage
      title="Colorful Charms"
      description="Create your case with charms glued, or buy charms separately and glue them yourself for the fun of doing it."
      pins={colorfulPins}
      categories={[
        { key: 'all', label: 'ALL' },
        { key: 'drinks', label: 'DRINKS' },
        { key: 'travel', label: 'TRAVEL' },
        { key: 'inspiration', label: 'INSPIRATION' },
        { key: 'flags', label: 'FLAGS' },
        { key: 'disney', label: 'DISNEY' }
      ]}
      filterFunction={filterColorfulCharms}
      defaultPrice={2.0}
      categoryName="colorful"
      searchPlaceholder="Search charms..."
      callToActionLinks={[
        { path: '/CreateYours', label: 'Start Creating' },
        { path: '/BronzeCharms', label: 'Bronze Charms' },
        { path: '/Flags', label: 'Flags' }
      ]}
    />
  );
};

export default ColorfulCharms;

