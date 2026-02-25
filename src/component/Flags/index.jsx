'use client';

import React from 'react';
import Products from '../../data/products.json';
import CharmsPage from '../Charms/CharmsPage';
import { filterFlags } from '../../data/filterFunctions';

const Flags = () => {
  const flagPins = Products.pins.flags || [];

  return (
    <CharmsPage
      title="Flag Charms"
      description="Create your case with charms glued, or buy charms separately and glue them yourself for the fun of doing it."
      pins={flagPins}
      categories={[
        { key: 'all', label: 'ALL' },
        { key: 'europe', label: 'EUROPE' },
        { key: 'americas', label: 'AMERICAS' },
        { key: 'special', label: 'SPECIAL' }
      ]}
      filterFunction={filterFlags}
      defaultPrice={2.0}
      categoryName="flags"
      searchPlaceholder="Search flags..."
      callToActionLinks={[
        { path: '/custom-passport-holder', label: 'Start Creating' },
        { path: '/ColorfulCharms', label: 'Colorful Charms' },
        { path: '/BronzeCharms', label: 'Bronze Charms' }
      ]}
    />
  );
};

export default Flags;

