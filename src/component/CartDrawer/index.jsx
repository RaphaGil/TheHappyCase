import React from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartDrawer = () => {
  const { cart, isDrawerOpen, closeCartDrawer, getTotalPrice, incrementItemQty, decrementItemQty, removeFromCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className={`fixed inset-0 z-50 ${isDrawerOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black transition-opacity ${isDrawerOpen ? 'opacity-40' : 'opacity-0'}`}
        onClick={closeCartDrawer}
      />

      {/* Drawer */}
      <div
        className={`absolute right-0 top-0 h-full w-full sm:w-2/3 lg:w-1/2 bg-white shadow-2xl transform transition-transform duration-300 ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-xl font-bold" style={{fontFamily: "'Fredoka One', cursive"}}>Your Happy Basket</h3>
          <button onClick={closeCartDrawer} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        <div className="h-[calc(100%-160px)] overflow-y-auto p-4 space-y-4">
          {cart.length === 0 && (
            <div className="text-center text-gray-500">Your basket is empty.</div>
          )}

          {cart.map((item, index) => (
            <div key={item.id} className="border rounded-xl p-3 flex items-start gap-3">
              {/* Case preview */}
              <div className="w-20 h-24 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                {item.caseImage ? (
                  <img src={item.caseImage} alt="Custom Case" className="w-14 h-20 object-contain" />
                ) : (
                  <div className="w-10 h-16 rounded" style={{ background: item.color }} />
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold">Custom Passport Case</div>
                    <div className="text-xs text-gray-500">Color: {item.color}</div>
                  </div>
                  <button onClick={() => removeFromCart(index)} className="text-sm text-red-500 hover:underline">Remove</button>
                </div>

                {/* Price breakdown */}
                {(() => {
                  const base = typeof item.basePrice === 'number' ? item.basePrice : 8;
                  const charms = item.pinsDetails && item.pinsDetails.length
                    ? item.pinsDetails.reduce((s, p) => s + (p.price || 0), 0)
                    : Math.max(0, (item.totalPrice || 0) - base);
                  const unit = base + charms;
                  return (
                    <div className="mt-2 text-xs text-gray-600">
                      <div><span className="font-medium">Case price:</span> £{base.toFixed(2)}</div>
                      <div><span className="font-medium">Charms total:</span> £{charms.toFixed(2)}</div>
                      {/* <div><span className="font-medium">Unit price:</span> £{unit.toFixed(2)}</div> */}
                    </div>
                  );
                })()}

                {/* Pins list */}
                {item.pinsDetails && item.pinsDetails.length > 0 && (
                  <div className="mt-2">
                    <div className="text-xs text-gray-500 mb-1">Charms:</div>
                    <div className="flex flex-col gap-2">
                      {Object.values(item.pinsDetails.reduce((acc, pin) => {
                        acc[pin.src] = acc[pin.src] || { ...pin, quantity: 0 };
                        acc[pin.src].quantity++;
                        return acc;
                      }, {})).map((groupedPin, i) => (
                        <div key={i} className="flex items-center justify-between bg-gray-50 border rounded-lg px-2 py-1">
                          <div className="flex items-center gap-2">
                            <img src={groupedPin.src} alt={groupedPin.name} className="w-8 h-8 object-contain" />
                            <span className="text-sm">{groupedPin.name} (x{groupedPin.quantity})</span>
                          </div>
                          <span className="text-sm font-medium">£{(groupedPin.price * groupedPin.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Qty and price */}
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button onClick={() => decrementItemQty(item.id)} className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300">−</button>
                    <div className="px-3 py-1 border rounded-md text-sm">{item.quantity || 1}</div>
                    <button onClick={() => incrementItemQty(item.id)} className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300">+</button>
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
                        <div className="text-xs text-gray-500">(£{unit.toFixed(2)} × {qty})</div>
                        <div className="font-bold">£{(unit * qty).toFixed(2)}</div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t">
          <div className="flex items-center justify-between mb-3">
            <div className="text-lg font-semibold">Total</div>
            <div className="text-2xl font-bold" style={{fontFamily: "'Fredoka One', cursive"}}>£{getTotalPrice().toFixed(2)}</div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              className="flex-1 bg-white border border-gray-300 rounded-full py-3 text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => {
                closeCartDrawer();
                navigate('/cart');
              }}
              disabled={cart.length === 0}
            >
              View Shopping Bag
            </button>
            <button
              className="flex-1 bg-gray-900 text-white rounded-full py-3 hover:bg-black transition-colors"
              onClick={() => closeCartDrawer()}
            >
              Continue Shopping
            </button>
            <button
              className="happy-button flex-1 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
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


