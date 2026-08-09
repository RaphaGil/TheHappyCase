import React from 'react';
import { getMaxAvailableQuantity, isPinSoldOutInWarehouse } from '../../utils/inventory';
import { useInventoryReady } from '../../hooks/useInventoryReady';
import CharmGridItem from './CharmGridItem';

const CharmGridItemWithInventory = ({ charm, index, onAddToCart, charmType, cart, charmPrice }) => {
  useInventoryReady();

  const product = {
    name: charm.name,
    price: charmPrice,
    totalPrice: charmPrice,
    image: charm.src,
    pin: charm,
    category: charmType,
    type: 'charm',
  };

  const maxAvailable = getMaxAvailableQuantity(product, cart);
  // Match dashboard: Sold Out only when warehouse qty is 0
  const isSoldOut = isPinSoldOutInWarehouse(charmType, charm.id);
  const isUnavailable = isSoldOut || (maxAvailable !== null && maxAvailable === 0);
  const isLowStock = maxAvailable !== null && maxAvailable > 0 && maxAvailable < 3;

  return (
    <CharmGridItem
      charm={charm}
      index={index}
      onAddToCart={isUnavailable ? undefined : onAddToCart}
      isSoldOut={isSoldOut}
      maxAvailable={maxAvailable}
      isLowStock={isLowStock}
      charmPrice={charmPrice}
    />
  );
};

export default CharmGridItemWithInventory;
