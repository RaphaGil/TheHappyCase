'use client';

import React from "react";
import { useCart } from "../../context/CartContext";
import { useCurrency } from "../../context/CurrencyContext";
import { useRouter } from "next/navigation";
import { useCartErrors } from "../../hooks/cart/useCartErrors";
import { useCartNotes } from "../../hooks/cart/useCartNotes";
import { useCartQuantity } from "../../hooks/cart/useCartQuantity";
import CartHeader from "../../component/Cart/CartHeader";
import EmptyCartState from "../../component/Cart/EmptyCartState";
import CartItem from "../../component/Cart/CartItem";
import OrderSummary from "../../component/Cart/OrderSummary";

const CartPage = () => {
  const {
    cart,
    removeFromCart,
    getTotalPrice,
    getTotalQuantity,
    updateItemNote,
  } = useCart();
  const { formatPrice } = useCurrency();
  const router = useRouter();

  // Error handling
  const errorHandlers = useCartErrors(cart);

  // Note handling
  const noteHandlers = useCartNotes(updateItemNote);

  // Quantity handling with inventory checks
  const quantityHandlers = useCartQuantity(cart, errorHandlers);

  const handleCheckout = () => {
    if (cart.length > 0) {
      router.push("/Checkout");
    }
  };

  const handleContinueShopping = () => {
    router.push("/custom-passport-holder");
  };

  const formattedTotalPrice = formatPrice(getTotalPrice());

  return (
    <div className="min-h-screen bg-white py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <CartHeader
          totalItems={getTotalQuantity()}
          onBack={() => router.push("/")}
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
                  incrementItemQty={(id) => quantityHandlers.handleIncrementWithCheck(id, index)}
                  decrementItemQty={(id) => quantityHandlers.handleDecrementWithCheck(id, index)}
                  removeFromCart={removeFromCart}
                  openNoteIndex={noteHandlers.openNoteIndex}
                  setOpenNoteIndex={noteHandlers.setOpenNoteIndex}
                  noteTexts={noteHandlers.noteTexts}
                  setNoteTexts={noteHandlers.setNoteTexts}
                  handleNoteChange={noteHandlers.handleNoteChange}
                  handleSaveNote={noteHandlers.handleSaveNote}
                  errorMessage={typeof errorHandlers.itemErrors[item.id || index] === 'string' 
                    ? errorHandlers.itemErrors[item.id || index] 
                    : errorHandlers.itemErrors[item.id || index]?.case}
                  charmErrors={errorHandlers.itemErrors[item.id || index]?.charms || {}}
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
