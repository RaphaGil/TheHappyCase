import React from 'react';
import CharmItem from './CharmItem';
import CaseItem from './CaseItem';

const CartItem = ({ 
  item, 
  index, 
  formatPrice, 
  onRemove, 
  onIncrement, 
  onDecrement,
  errorMessage,
  charmErrors
}) => {
  return (
    <div className="border-b border-gray-100 pb-5 last:border-b-0 last:pb-0">
      <div className="flex-1">
        {item.type === 'charm' ? (
          <CharmItem
            item={item}
            index={index}
            formatPrice={formatPrice}
            onRemove={onRemove}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            errorMessage={errorMessage}
          />
        ) : (
          <CaseItem
            item={item}
            index={index}
            formatPrice={formatPrice}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            onRemove={onRemove}
            errorMessage={errorMessage}
            charmErrors={charmErrors}
          />
        )}
      </div>
    </div>
  );
};

export default CartItem;

