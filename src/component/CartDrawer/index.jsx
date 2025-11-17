import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const CartDrawer = () => {
  const { cart, isDrawerOpen, closeCartDrawer, getTotalPrice, incrementItemQty, decrementItemQty, removeFromCart, updateItemNote } = useCart();
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();
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
        <div className="flex items-center justify-between p-4 border-b border-gray-100 flex-shrink-0">
          <h3 className="text-sm font-light uppercase tracking-wider text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>Your Cart</h3>
          <button onClick={closeCartDrawer} className="text-gray-400 hover:text-gray-900 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
          {cart.length === 0 && (
            <div className="text-center text-gray-500 text-sm font-light" style={{fontFamily: "'Poppins', sans-serif"}}>Your cart is empty.</div>
          )}

          {cart.map((item, index) => (
            <div key={item.id} className="border-b border-gray-100 pb-4 flex items-start gap-3">
              <div className="flex-1">
                <div className="flex justify-end items-end mb-2">
                  <button onClick={() => removeFromCart(index)} className="text-xs text-gray-500 hover:text-gray-900 uppercase tracking-wider font-light transition-colors" style={{fontFamily: "'Poppins', sans-serif"}}>Remove</button>
                </div>

                {/* Standalone Charm Display */}
                {item.type === 'charm' ? (
                  <div className="mt-2">
                    <div className="flex items-center justify-between px-2 py-1">
                      <div className="flex items-center gap-2">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-contain rounded"
                          />
                        ) : (
                          <div className="w-20 h-20 rounded bg-gray-50 border border-gray-200 flex items-center justify-center">
                            <span className="text-gray-400 text-xs">Image</span>
                          </div>
                        )}
                        <div className="flex flex-col">
                          <span className="text-sm font-light text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>{item.name}</span>
                          <span className="text-xs text-gray-500 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>{item.category ? `${item.category.charAt(0).toUpperCase() + item.category.slice(1)} Charm` : 'Charm'}</span>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>{formatPrice(item.price || item.totalPrice || 0)}</span>
                    </div>

                    {/* Qty and price for charm */}
                    <div className="mt-3 flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-1 border border-gray-200 rounded-sm p-1">
                        <button onClick={() => decrementItemQty(item.id)} className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors">−</button>
                        <div className="px-2 py-0.5 text-xs text-gray-900 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>{item.quantity || 1}</div>
                        <button onClick={() => incrementItemQty(item.id)} className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors">+</button>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>{formatPrice((item.price || item.totalPrice || 0) * (item.quantity || 1))}</div>
                      </div>
                    </div>

                    {/* Note Dropdown for charm */}
                    {openNoteIndex === index && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="text-xs text-gray-500 mb-2 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
                          Add a note for this item:
                        </div>
                        <textarea
                          value={noteTexts[index] !== undefined ? noteTexts[index] : (item.note || '')}
                          onChange={(e) => handleNoteChange(index, e.target.value)}
                          placeholder="Add any special instructions or notes..."
                          className="w-full px-3 py-2 text-xs border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 font-light resize-none"
                          style={{fontFamily: "'Poppins', sans-serif"}}
                          rows="3"
                        />
                        <div className="flex justify-end gap-2 mt-2">
                          <button
                            onClick={() => {
                              setOpenNoteIndex(null);
                              setNoteTexts({ ...noteTexts, [index]: item.note || '' });
                            }}
                            className="px-3 py-1 text-xs uppercase tracking-wider text-gray-600 hover:text-gray-900 font-light transition-colors"
                            style={{fontFamily: "'Poppins', sans-serif"}}
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSaveNote(index)}
                            className="px-3 py-1 text-xs uppercase tracking-wider bg-gray-900 hover:bg-gray-800 text-white font-light transition-colors"
                            style={{fontFamily: "'Poppins', sans-serif"}}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Display saved note if exists and dropdown is closed */}
                    {item.note && openNoteIndex !== index && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="text-xs text-gray-500 mb-1 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
                          Note:
                        </div>
                        <div className="text-xs text-gray-700 font-light whitespace-pre-wrap" style={{fontFamily: "'Poppins', sans-serif"}}>
                          {item.note}
                        </div>
                      </div>
                    )}

                    {/* Add Note Button - Before Item Ends */}
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <button 
                        onClick={() => handleToggleNote(index)} 
                        className="text-xs text-gray-500 hover:text-gray-900 uppercase tracking-wider font-light transition-colors flex items-center gap-1" 
                        style={{fontFamily: "'Poppins', sans-serif"}}
                      >
                        {item.note ? 'Edit Note' : 'Add Note'}
                        <FontAwesomeIcon 
                          icon={openNoteIndex === index ? faChevronUp : faChevronDown} 
                          className="text-xs" 
                        />
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Case and charms list or standalone case */
                  (() => {
                    const base = typeof item.basePrice === 'number' ? item.basePrice : (item.price || 0);
                    const groupedPins = Object.values(
                      (item.pinsDetails || []).reduce((acc, pin) => {
                        const key = pin.src || pin.name;
                        acc[key] = acc[key] || { ...pin, quantity: 0 };
                        acc[key].quantity += 1;
                        return acc;
                      }, {})
                    );
                    const basePreview = item.designImage || item.caseImage || item.image;

                    return (
                      <div className="mt-2">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-between  px-2 py-1">
                            <div className="flex items-center gap-2">
                              {basePreview ? (
                                <img
                                  src={basePreview}
                                  alt="Case preview"
                                  className="w-20 h-22 object-contain rounded"
                                />
                              ) : item.color ? (
                                <div
                                  className="w-8 h-8 rounded-full border-2 border-gray-300"
                                  style={{ backgroundColor: item.color }}
                                />
                              ) : (
                                <div className="w-20 h-22 rounded bg-gray-50 border border-gray-200 flex items-center justify-center">
                                  <span className="text-gray-400 text-xs">Image</span>
                                </div>
                              )}
                              <div className="flex flex-col">
                                <span className="text-sm font-light text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>{item.caseName || item.name || 'Passport Case'}</span>
                                {item.color && (
                                  <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className="text-xs text-gray-500 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>Color:</span>
                                    <div className="w-3 h-3 rounded-full border border-gray-300" style={{backgroundColor: item.color}}></div>
                                  </div>
                                )}
                              </div>
                            </div>
                            <span className="text-sm font-medium text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>{formatPrice(base)}</span>
                          </div>

                          {groupedPins.length > 0 && groupedPins.map((groupedPin, i) => (
                            <div
                              key={i}
                              className="flex items-center justify-between px-2 py-1"
                            >
                              <div className="flex items-center gap-2">
                                {groupedPin.src ? (
                                  <img
                                    src={groupedPin.src}
                                    alt={groupedPin.name}
                                    className="w-16 h-16 object-contain"
                                  />
                                ) : (
                                  <div className="w-8 h-8 rounded bg-gray-200" />
                                )}
                                <span className="text-sm font-light text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>
                                  {groupedPin.name} (x{groupedPin.quantity})
                                </span>
                              </div>
                              <span className="text-sm font-medium text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>
                                {formatPrice((groupedPin.price || 0) * groupedPin.quantity)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()
                )}

                {/* Qty and price for case items */}
                {item.type !== 'charm' && (
                  <>
                    <div className="mt-3 flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-1 border border-gray-200 rounded-sm p-1">
                        <button onClick={() => decrementItemQty(item.id)} className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors">−</button>
                        <div className="px-2 py-0.5 text-xs text-gray-900 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>{item.quantity || 1}</div>
                        <button onClick={() => incrementItemQty(item.id)} className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors">+</button>
                      </div>
                      {(() => {
                        const base = typeof item.basePrice === 'number' ? item.basePrice : 8;
                        const charms = item.pinsDetails && item.pinsDetails.length
                          ? item.pinsDetails.reduce((s, p) => s + (p.price || 0), 0)
                          : Math.max(0, (item.totalPrice || 0) - base);
                        const unit = base + charms;
                        const qty = item.quantity || 1;
                        return (
                          <div className="text-right">
                            <div className="text-sm font-medium text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>{formatPrice(unit * qty)}</div>
                          </div>
                        );
                      })()}
                    </div>

                    {/* Note Dropdown for case items */}
                    {openNoteIndex === index && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="text-xs text-gray-500 mb-2 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
                          Add a note for this item:
                        </div>
                        <textarea
                          value={noteTexts[index] !== undefined ? noteTexts[index] : (item.note || '')}
                          onChange={(e) => handleNoteChange(index, e.target.value)}
                          placeholder="Add any special instructions or notes..."
                          className="w-full px-3 py-2 text-xs border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 font-light resize-none"
                          style={{fontFamily: "'Poppins', sans-serif"}}
                          rows="3"
                        />
                        <div className="flex justify-end gap-2 mt-2">
                          <button
                            onClick={() => {
                              setOpenNoteIndex(null);
                              setNoteTexts({ ...noteTexts, [index]: item.note || '' });
                            }}
                            className="px-3 py-1 text-xs uppercase tracking-wider text-gray-600 hover:text-gray-900 font-light transition-colors"
                            style={{fontFamily: "'Poppins', sans-serif"}}
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSaveNote(index)}
                            className="px-3 py-1 text-xs uppercase tracking-wider bg-gray-900 hover:bg-gray-800 text-white font-light transition-colors"
                            style={{fontFamily: "'Poppins', sans-serif"}}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Display saved note if exists and dropdown is closed */}
                    {item.note && openNoteIndex !== index && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="text-xs text-gray-500 mb-1 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
                          Note:
                        </div>
                        <div className="text-xs text-gray-700 font-light whitespace-pre-wrap" style={{fontFamily: "'Poppins', sans-serif"}}>
                          {item.note}
                        </div>
                      </div>
                    )}

                    {/* Add Note Button - Before Item Ends */}
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <button 
                        onClick={() => handleToggleNote(index)} 
                        className="text-xs text-gray-500 hover:text-gray-900 uppercase tracking-wider font-light transition-colors flex items-center gap-1" 
                        style={{fontFamily: "'Poppins', sans-serif"}}
                      >
                        {item.note ? 'Edit Note' : 'Add Note'}
                        <FontAwesomeIcon 
                          icon={openNoteIndex === index ? faChevronUp : faChevronDown} 
                          className="text-xs" 
                        />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-white flex-shrink-0">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
            <div className="text-sm font-light text-gray-700 uppercase tracking-wider" style={{fontFamily: "'Poppins', sans-serif"}}>Subtotal:</div>
            <div className="text-lg font-medium text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>{formatPrice(getTotalPrice())}</div>
          </div>
         
          <p className="text-xs text-gray-500 text-center mb-4 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
           <Link to="/shipping" className="text-gray-500 hover:text-gray-900 underline transition-colors">Shipping</Link> calculated at checkout.
          </p>
          <div className="flex flex-col gap-3">
            <button
              className="w-full py-2.5 text-xs uppercase tracking-wider text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-400 transition-all duration-200 font-light"
              style={{fontFamily: "'Poppins', sans-serif"}}
              onClick={() => closeCartDrawer()}
            >
              Continue Shopping
            </button>
            <button
              className="w-full py-2.5 text-xs uppercase tracking-wider bg-gray-900 hover:bg-gray-800 text-white transition-all duration-200 font-light disabled:opacity-50 disabled:cursor-not-allowed"
              style={{fontFamily: "'Poppins', sans-serif"}}
              disabled={cart.length === 0}
              onClick={() => {
                closeCartDrawer();
                navigate('/checkout');
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;


