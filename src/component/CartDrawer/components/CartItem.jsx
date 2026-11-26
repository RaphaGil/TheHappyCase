import React from 'react';
import CharmItem from './CharmItem';
import CaseItem from './CaseItem';

const CartItem = (props) => (
  <li className="border-b border-[#30279f]/10 py-5 first:pt-1 last:border-b-0">
    {props.item.type === 'charm' ? <CharmItem {...props} /> : <CaseItem {...props} />}
  </li>
);

export default CartItem;
