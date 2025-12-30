import React from 'react';
import CharmGridItem from './CharmGridItem';
import { useCharmSoldOut } from '../utils/useCharmSoldOut';

const CharmGridItemWithInventory = ({ charm, index, onAddToCart, charmType, cart, charmPrice }) => {
  const isSoldOut = useCharmSoldOut(charm, charmType, cart);

  return (
    <CharmGridItem
      charm={charm}
      index={index}
      onAddToCart={onAddToCart}
      isSoldOut={isSoldOut}
      charmPrice={charmPrice}
    />
  );
};

export default CharmGridItemWithInventory;



