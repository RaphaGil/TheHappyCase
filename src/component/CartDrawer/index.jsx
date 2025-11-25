import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';
import CartDrawerHeader from './components/CartDrawerHeader';
import EmptyCart from './components/EmptyCart';
import CartItem from './components/CartItem';
import CartDrawerFooter from './components/CartDrawerFooter';

const CartDrawer = () => {
  const { cart, isDrawerOpen, closeCartDrawer, getTotalPrice, incrementItemQty, decrementItemQty, removeFromCart, updateItemNote } = useCart();
  const { formatPrice } = useCurrency();
  const [openNoteIndex, setOpenNoteIndex] = useState(null);
  const [noteTexts, setNoteTexts] = useState({});

  const handleToggleNote = (index) => {
    if (openNoteIndex === index) {
      setOpenNoteIndex(null);
    } else {
      setOpenNoteIndex(index);
      // Initialize note text if it doesn't exist
      if (!noteTexts[index] && cart[index]?.note) {
        setNoteTexts({ ...noteTexts, [index]: cart[index].note });
      } else if (!noteTexts[index]) {
        setNoteTexts({ ...noteTexts, [index]: '' });
      }
    }
  };

  const handleNoteChange = (index, value) => {
    setNoteTexts({ ...noteTexts, [index]: value });
  };

  const handleSaveNote = (index) => {
    updateItemNote(index, noteTexts[index] || '');
    setOpenNoteIndex(null);
  };

  const handleCancelNote = (index) => {
    setOpenNoteIndex(null);
    setNoteTexts({ ...noteTexts, [index]: cart[index]?.note || '' });
  };

  return (
    <div className={`fixed inset-0 z-50  ${isDrawerOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black  transition-opacity ${isDrawerOpen ? 'opacity-40' : 'opacity-0'}`}
        onClick={closeCartDrawer}
      />

      {/* Drawer */}
      <div
        className={`absolute right-0 top-0 h-full w-full sm:w-2/3 lg:w-1/4 bg-white shadow-2xl transform transition-transform duration-300 flex flex-col ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <CartDrawerHeader onClose={closeCartDrawer} />

        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
          {cart.length === 0 ? (
            <EmptyCart />
          ) : (
            cart.map((item, index) => (
              <CartItem
                key={item.id}
                item={item}
                index={index}
                formatPrice={formatPrice}
                onRemove={removeFromCart}
                onIncrement={incrementItemQty}
                onDecrement={decrementItemQty}
                openNoteIndex={openNoteIndex}
                noteTexts={noteTexts}
                onToggleNote={handleToggleNote}
                onNoteChange={handleNoteChange}
                onSaveNote={handleSaveNote}
                onCancelNote={handleCancelNote}
              />
            ))
          )}
        </div>

        {/* Footer */}
        <CartDrawerFooter
          totalPrice={getTotalPrice()}
          formatPrice={formatPrice}
          cartLength={cart.length}
          onClose={closeCartDrawer}
        />
      </div>
    </div>
  );
};

export default CartDrawer;


