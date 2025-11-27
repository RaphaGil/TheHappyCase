import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useCurrency } from "../../context/CurrencyContext";
import { useNavigate } from "react-router-dom";
import CartHeader from "./components/CartHeader";
import EmptyCartState from "./components/EmptyCartState";
import CartItem from "./components/CartItem";
import OrderSummary from "./components/OrderSummary";

const CartPage = () => {
  const {
    cart,
    removeFromCart,
    getTotalPrice,
    getTotalItems,
    incrementItemQty,
    decrementItemQty,
    updateItemNote,
  } = useCart();
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();
  const [openNoteIndex, setOpenNoteIndex] = useState(null);
  const [noteTexts, setNoteTexts] = useState({});

  const handleCheckout = () => {
    if (cart.length > 0) {
      navigate("/checkout");
    }
  };

  const handleContinueShopping = () => {
    navigate("/CreateYours");
  };

  const handleNoteChange = (index, value) => {
    setNoteTexts({ ...noteTexts, [index]: value });
  };

  const handleSaveNote = (index) => {
    updateItemNote(index, noteTexts[index] || "");
    setOpenNoteIndex(null);
  };

  const formattedTotalPrice = formatPrice(getTotalPrice());

  return (
    <div className="min-h-screen bg-white py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <CartHeader
          totalItems={getTotalItems()}
          onBack={() => navigate("/")}
        />

        {cart.length === 0 ? (
          <EmptyCartState onContinueShopping={handleContinueShopping} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item, index) => (
                <CartItem
                  key={index}
                  item={item}
                  index={index}
                  formatPrice={formatPrice}
                  incrementItemQty={incrementItemQty}
                  decrementItemQty={decrementItemQty}
                  removeFromCart={removeFromCart}
                  openNoteIndex={openNoteIndex}
                  setOpenNoteIndex={setOpenNoteIndex}
                  noteTexts={noteTexts}
                  setNoteTexts={setNoteTexts}
                  handleNoteChange={handleNoteChange}
                  handleSaveNote={handleSaveNote}
                />
              ))}
            </div>

            <OrderSummary
              totalPrice={formattedTotalPrice}
              onCheckout={handleCheckout}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
