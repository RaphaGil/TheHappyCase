import React from 'react';
import { getMaxAvailableQuantity } from '../../../utils/inventory';
import CharmGridItem from './CharmGridItem';

const CharmGridItemWithInventory = ({ charm, index, onAddToCart, charmType, cart, charmPrice }) => {
  // Create a product object for inventory checking
  const product = {
    name: charm.name,
    price: charmPrice,
    totalPrice: charmPrice,
    image: charm.src,
    pin: charm,
    category: charmType,
    type: 'charm'
  };

  // Check inventory availability
  const maxAvailable = getMaxAvailableQuantity(product, cart);
  const isSoldOut = maxAvailable !== null && maxAvailable === 0;

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







