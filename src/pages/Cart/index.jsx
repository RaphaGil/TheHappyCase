import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useCurrency } from "../../context/CurrencyContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faArrowLeft, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

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

  return (
    <div className="min-h-screen bg-white py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-gray-600 hover:text-gray-900 px-4 py-2 text-xs uppercase tracking-wider font-light transition-colors duration-200 mb-6"
            style={{fontFamily: "'Poppins', sans-serif"}}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2 text-xs" />
            Continue Shopping
          </button>

          <div className="text-center mb-8">
            <h1
              className="text-3xl md:text-4xl font-light text-gray-900 mb-2"
              style={{ fontFamily: "'Poppins', sans-serif", letterSpacing: '0.05em' }}
            >
              Your Cart ({getTotalItems()})
            </h1>
            <div className="w-16 h-px bg-gray-300 mx-auto"></div>
          </div>
        </div>

        {cart.length === 0 ? (
          /* Empty Cart */
          <div className="text-center py-16 flex flex-col items-center justify-center">
            <div className="border border-gray-200 p-8 md:p-12 max-w-md mx-auto bg-white">
              <h2
                className="text-xl md:text-2xl font-light text-gray-900 mb-4"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Your cart is empty
              </h2>
              <p
                className="text-gray-500 mb-8 text-sm font-light"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Start creating your custom case to add items to your cart.
              </p>
            
              <button
                onClick={handleContinueShopping}
                className="px-6 py-2 text-xs uppercase tracking-wider text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-400 transition-all duration-200 font-light"
                style={{fontFamily: "'Poppins', sans-serif"}}
              >
                Create Your Case
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item, index) => (
                <div key={index} className="border border-gray-200 p-6 bg-white">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {/* Standalone Charm Item */}
                      {item.type === 'charm' ? (
                        <div className="mt-2 flex flex-col gap-2">
                          <div className="flex items-center justify-between px-2 py-2">
                            <div className="flex items-center gap-2">
                              {item.image ? (
                                <img
                                  src={item.image}
                                  alt={item.name || "Charm"}
                                  className="w-24 h-24 object-contain"
                                />
                              ) : item.pin?.src ? (
                                <img
                                  src={item.pin.src}
                                  alt={item.pin.name || "Charm"}
                                  className="w-24 h-24 object-contain"
                                />
                              ) : (
                                <div className="w-24 h-24 rounded bg-gray-50 border border-gray-200 flex items-center justify-center">
                                  <span className="text-gray-400 text-xs">Image</span>
                                </div>
                              )}
                              <div className="text-xs">
                                <div className="font-light text-gray-900 line-clamp-1 mb-1" style={{fontFamily: "'Poppins', sans-serif"}}>
                                  {item.name || item.pin?.name || "Charm"}
                                </div>
                                <div className="text-gray-500 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
                                  {item.category === 'bronze' ? 'Bronze Charm' : 
                                   item.category === 'flags' ? 'Flag' : 
                                   'Colorful Charm'}
                                </div>
                              </div>
                            </div>
                            <div className="text-xs font-medium text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>
                              {formatPrice(item.price || item.totalPrice || 0)}
                            </div>
                          </div>
                        </div>
                      ) : item.pinsDetails && item.pinsDetails.length > 0 ? (
                        /* Custom Case with Charms */
                        (() => {
                          const grouped = item.pinsDetails.reduce(
                            (acc, pin) => {
                              const key =
                                pin.src + "|" + pin.name + "|" + pin.price;
                              acc[key] = acc[key] || { ...pin, count: 0 };
                              acc[key].count += 1;
                              return acc;
                            },
                            {}
                          );
                          const groupedList = Object.values(grouped);
                          const base =
                            typeof item.basePrice === "number"
                              ? item.basePrice
                              : 8;
                          return (
                            <div className="mt-2 flex flex-col gap-2">
                              <div className="flex items-center justify-between  px-2 py-2">
                                <div className="flex items-center gap-2">
                                  {item.designImage ? (
                                    <img
                                      src={item.designImage}
                                      alt="Your Design"
                                      className="w-24 h-18 object-contain"
                                    />
                                  ) : item.caseImage || item.image ? (
                                    <img
                                      src={item.caseImage || item.image}
                                      alt="Case"
                                      className="w-24 h-18 object-contain"
                                    />
                                  ) : (
                                    <div
                                      className="w-8 h-8 rounded-full border-2 border-gray-300"
                                      style={{ backgroundColor: item.color }}
                                    />
                                  )}
                                  <div className="text-xs">
                                    <div className="font-light text-gray-900 line-clamp-1 mb-1" style={{fontFamily: "'Poppins', sans-serif"}}>
                                      {item.caseName || item.name}
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span
                                        className="text-gray-500 font-light"
                                        style={{
                                          fontFamily: "'Poppins', sans-serif",
                                        }}
                                      >
                                        Color:
                                      </span>
                                      <div
                                        className="w-4 h-4 rounded-full border border-gray-300"
                                        style={{ backgroundColor: item.color }}
                                      ></div>
                                    </div>
                                  </div>
                                </div>
                                <div className="text-xs font-medium text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>
                                  {formatPrice(base)}
                                </div>
                              </div>
                              {groupedList.map((pin, i) => (
                                <div
                                  key={i}
                                  className="flex items-center justify-between   px-2 py-2"
                                >
                                  <div className="flex items-center gap-2">
                                    <img
                                      src={pin.src}
                                      alt={pin.name}
                                      className="w-24 h-24 object-contain"
                                    />
                                    <div className="text-xs">
                                      <div className="font-light text-gray-900 line-clamp-1 mb-1" style={{fontFamily: "'Poppins', sans-serif"}}>
                                        {pin.name}{" "}
                                        {pin.count > 1
                                          ? `(x${pin.count})`
                                          : ""}
                                      </div>
                                      <div className="text-gray-500 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
                                        {formatPrice(pin.price)} each
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-xs font-medium text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>
                                    {formatPrice(pin.price * pin.count)}
                                  </div>
                                </div>
                              ))}
                            </div>
                          );
                        })()
                      ) : (
                        /* Standalone Passport Case (no charms) */
                        <div className="mt-2 flex flex-col gap-2">
                          <div className="flex items-center justify-between px-2 py-2">
                            <div className="flex items-center gap-2">
                              {item.designImage ? (
                                <img
                                  src={item.designImage}
                                  alt="Your Design"
                                  className="w-24 h-18 object-contain"
                                />
                              ) : item.caseImage || item.image ? (
                                <img
                                  src={item.caseImage || item.image}
                                  alt={item.caseName || item.name || "Case"}
                                  className="w-24 h-18 object-contain"
                                />
                              ) : (
                                <div
                                  className="w-8 h-8 rounded-full border-2 border-gray-300"
                                  style={{ backgroundColor: item.color }}
                                />
                              )}
                              <div className="text-xs">
                                <div className="font-light text-gray-900 line-clamp-1 mb-1" style={{fontFamily: "'Poppins', sans-serif"}}>
                                  {item.caseName || item.name || "Passport Case"}
                                </div>
                                {item.color && (
                                  <div className="flex items-center gap-2">
                                    <span
                                      className="text-gray-500 font-light"
                                      style={{
                                        fontFamily: "'Poppins', sans-serif",
                                      }}
                                    >
                                      Color:
                                    </span>
                                    <div
                                      className="w-4 h-4 rounded-full border border-gray-300"
                                      style={{ backgroundColor: item.color }}
                                    ></div>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="text-xs font-medium text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>
                              {formatPrice(item.basePrice || item.price || item.totalPrice || 0)}
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
                        <div>
                          <div className="text-xs text-gray-500 mb-2 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
                            Quantity:
                          </div>
                          <div className="flex items-center border border-gray-200 rounded-sm p-1 w-fit">
                            <button
                              onClick={() => decrementItemQty(item.id || index)}
                              className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
                              title="Decrease"
                            >
                              −
                            </button>
                            <div className="px-3 py-1 text-sm text-gray-900 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
                              {item.quantity || 1}
                            </div>
                            <button
                              onClick={() => incrementItemQty(item.id || index)}
                              className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
                              title="Add one more"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center justify-end">
                          <button
                            onClick={() => removeFromCart(index)}
                            className="flex items-center text-gray-500 hover:text-gray-900 px-4 py-2 text-xs uppercase tracking-wider font-light transition-colors"
                            style={{fontFamily: "'Poppins', sans-serif"}}
                          >
                            <FontAwesomeIcon icon={faTrash} className="mr-2 text-xs" />
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Note Dropdown */}
                      {openNoteIndex === index && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="text-xs text-gray-500 mb-2 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
                            Add a note for this item:
                          </div>
                          <textarea
                            value={noteTexts[index] !== undefined ? noteTexts[index] : (item.note || '')}
                            onChange={(e) => handleNoteChange(index, e.target.value)}
                            placeholder="Add any special instructions or notes..."
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 font-light resize-none"
                            style={{fontFamily: "'Poppins', sans-serif"}}
                            rows="3"
                          />
                          <div className="flex justify-end gap-2 mt-2">
                            <button
                              onClick={() => {
                                setOpenNoteIndex(null);
                                setNoteTexts({ ...noteTexts, [index]: item.note || '' });
                              }}
                              className="px-4 py-1.5 text-xs uppercase tracking-wider text-gray-600 hover:text-gray-900 font-light transition-colors"
                              style={{fontFamily: "'Poppins', sans-serif"}}
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleSaveNote(index)}
                              className="px-4 py-1.5 text-xs uppercase tracking-wider bg-gray-900 hover:bg-gray-800 text-white font-light transition-colors"
                              style={{fontFamily: "'Poppins', sans-serif"}}
                            >
                              Save Note
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Display saved note if exists and dropdown is closed */}
                      {item.note && openNoteIndex !== index && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="text-xs text-gray-500 mb-1 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
                            Note:
                          </div>
                          <div className="text-sm text-gray-700 font-light whitespace-pre-wrap" style={{fontFamily: "'Poppins', sans-serif"}}>
                            {item.note}
                          </div>
                        </div>
                      )}

                      {/* Add Note Button - Before Item Total */}
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <button
                          onClick={() => handleToggleNote(index)}
                          className="flex items-center text-gray-500 hover:text-gray-900 px-4 py-2 text-xs uppercase tracking-wider font-light transition-colors"
                          style={{fontFamily: "'Poppins', sans-serif"}}
                        >
                          {item.note ? 'Edit Note' : 'Add Note'}
                          <FontAwesomeIcon 
                            icon={openNoteIndex === index ? faChevronUp : faChevronDown} 
                            className="ml-2 text-xs" 
                          />
                        </button>
                      </div>
                      
                      {/* Item Total Price */}
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-light text-gray-700" style={{fontFamily: "'Poppins', sans-serif"}}>
                            Item Total:
                          </span>
                          <span className="text-sm font-medium text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>
                            {(() => {
                              if (item.type === 'charm') {
                                return formatPrice((item.price || item.totalPrice || 0) * (item.quantity || 1));
                              }
                              const base = typeof item.basePrice === "number" ? item.basePrice : (item.price || 0);
                              const charms = item.pinsDetails && item.pinsDetails.length
                                ? item.pinsDetails.reduce((s, p) => s + (p.price || 0), 0)
                                : 0;
                              return formatPrice((base + charms) * (item.quantity || 1));
                            })()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="border border-gray-200 p-6 bg-white sticky top-8">
                <div className="">
                  <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                    <span className="text-sm font-light text-gray-700 uppercase tracking-wider" style={{fontFamily: "'Poppins', sans-serif"}}>Subtotal:</span>
                    <span className="text-lg font-medium text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>
                      {formatPrice(getTotalPrice())}
                    </span>
                  </div>
                  <div>
                    <p
                      className="text-xs text-gray-500 text-center mb-4 font-light"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      <Link
                        to="/shipping"
                        className="text-gray-500 hover:text-gray-900 underline transition-colors"
                      >
                        Shipping
                      </Link>{" "}
                      and taxes calculated at checkout.
                    </p>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full py-3 text-xs uppercase tracking-wider bg-gray-900 hover:bg-gray-800 text-white transition-all duration-200 font-light"
                    style={{fontFamily: "'Poppins', sans-serif"}}
                  >
                    Checkout
                  </button>

                  <p className="text-xs text-gray-500 mt-4 text-center font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
                    Secure payment powered by Stripe
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
