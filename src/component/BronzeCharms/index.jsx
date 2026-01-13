import React from 'react';
import Products from '../../data/products.json';
import CharmsPage from '../Charms/CharmsPage';
import { filterBronzeCharms } from '../../data/filterFunctions';

const BronzeCharms = () => {
  const bronzePins = Products.pins.bronze;

  return (
    <CharmsPage
      title="Bronze Charms"
      description="Create your case with charms glued, or buy charms separately and glue them yourself for the fun of doing it."
      pins={bronzePins}
      categories={[
        { key: 'all', label: 'ALL' },
        { key: 'travel', label: 'TRAVEL' },
        { key: 'landmarks', label: 'LANDMARKS' },
        { key: 'animals', label: 'ANIMALS' },
        { key: 'symbols', label: 'SYMBOLS' }
      ]}
      filterFunction={filterBronzeCharms}
      defaultPrice={1.0}
      categoryName="bronze"
      searchPlaceholder="Search charms..."
      inlineTabs={true}
      callToActionLinks={[
        { path: '/CreateYours', label: 'Start Creating' },
        { path: '/ColorfulCharms', label: 'Colorful Charms' },
        { path: '/Flags', label: 'Flags' }
      ]}
    />
  );
};

export default BronzeCharms;

