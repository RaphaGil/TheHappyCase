import React from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const CartPage = () => {
  const { cart, removeFromCart, getTotalPrice, getTotalItems, incrementItemQty, decrementItemQty } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cart.length > 0) {
      navigate('/checkout');
    }
  };

  const handleContinueShopping = () => {
    navigate('/CreateYours');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-blue-50 to-sky-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg mb-4"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Continue Shopping
          </button>
          
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold happy-text-gradient lazy-dog-title flex items-center" style={{fontFamily: "'Fredoka One', cursive"}}>
              🛒 Your Happy Basket ({getTotalItems()})
            </h1>
          </div>
        </div>

        {cart.length === 0 ? (
          /* Empty Cart */
          <div className="text-center py-16">
            <div className="happy-card p-8 max-w-md mx-auto">
              <div className="text-8xl mb-6">🛒</div>
              <h2 className="text-3xl font-bold happy-text-gradient lazy-dog-title mb-4" style={{fontFamily: "'Fredoka One', cursive"}}>Your basket is empty</h2>
              <p className="text-gray-600 mb-8 text-lg student-text" style={{fontFamily: "'Inter', sans-serif", fontWeight: 300}}>
                Start creating your custom phone case to add items to your happy basket! ✨
              </p>
              <button
                onClick={handleContinueShopping}
                className="happy-button text-lg px-8 py-4"
              >
                🎨 Create Your Happy Case
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, index) => (
                <div key={index} className="happy-card p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {/* <h3 className="text-xl font-bold happy-text-gradient lazy-dog-title mb-1" style={{fontFamily: "'Fredoka One', cursive"}}>
                        Custom Happy Case
                      </h3> */}
                  
                     
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="mt-2">
                            <span className="font-medium text-gray-600 student-text" style={{fontFamily: "'Inter', sans-serif", fontWeight: 300}}>Selected Case:</span>
                            <div className="mt-2 w-20 h-24 bg-white rounded border flex items-center justify-center overflow-hidden">
                              {item.caseImage ? (
                                <img src={item.caseImage} alt="Selected case" className="w-full h-full object-contain" />
                              ) : (
                                <div 
                                  className="w-8 h-8 rounded-full border-2 border-gray-300"
                                  style={{ backgroundColor: item.color }}
                                />
                              )}
                            </div>
                            <span className="font-medium text-gray-600 student-text" style=
                            {{fontFamily: "'Inter', sans-serif", fontWeight: 300}}
                            >Selected Color:</span>
                            <div 
                              className="w-8 h-8 rounded-full border-2 border-gray-300 
                              inline-block ml-2"
                              style={{ backgroundColor: item.color }}
                            ></div>
                          </div>
                          <div className="mt-3 text-sm text-gray-600 flex items-center gap-3">
                            <span className="font-medium">Quantity:</span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => decrementItemQty(item.id)}
                                className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300"
                                title="Decrease"
                              >
                                −
                              </button>
                              <div className="px-3 py-1 border rounded-md text-sm bg-white">
                                {item.quantity || 1}
                              </div>
                              <button
                                onClick={() => incrementItemQty(item.id)}
                                className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300"
                                title="Add one more"
                              >
                                +
                              </button>
                            </div>
                          </div>
                         
                        </div>
                        
                        <div>
                          {/*  */}
                          {item.pinsDetails && item.pinsDetails.length > 0 && (() => {
                            const grouped = item.pinsDetails.reduce((acc, pin) => {
                              const key = pin.src + '|' + pin.name + '|' + pin.price;
                              acc[key] = acc[key] || { ...pin, count: 0 };
                              acc[key].count += 1;
                              return acc;
                            }, {});
                            const groupedList = Object.values(grouped);
                            const base = typeof item.basePrice === 'number' ? item.basePrice : 8;
                            return (
                              <div className="mt-2 flex flex-col gap-2">
                                <div className="flex items-center justify-between bg-white border rounded-lg px-2 py-2">
                                  <div className="flex items-center gap-2">
                                    {item.caseImage ? (
                                      <img src={item.caseImage} alt="Case" className="w-8 h-8 object-contain" />
                                    ) : (
                                      <div className="w-8 h-8 rounded-full border-2 border-gray-300" style={{ backgroundColor: item.color }} />
                                    )}
                                    <div className="text-xs">
                                      <div className="font-medium line-clamp-1">Case</div>
                                    </div>
                                  </div>
                                  <div className="text-xs font-semibold">£{base.toFixed(2)}</div>
                                </div>
                                {groupedList.map((pin, i) => (
                                  <div key={i} className="flex items-center justify-between bg-gray-50 border rounded-lg px-2 py-2">
                                    <div className="flex items-center gap-2">
                                      <img src={pin.src} alt={pin.name} className="w-8 h-8 object-contain" />
                                      <div className="text-xs">
                                        <div className="font-medium line-clamp-1">{pin.name} {pin.count > 1 ? `(x${pin.count})` : ''}</div>
                                        <div className="text-gray-500">£{pin.price.toFixed(2)} each</div>
                                      </div>
                                    </div>
                                    <div className="text-xs font-semibold">£{(pin.price * pin.count).toFixed(2)}</div>
                                  </div>
                                ))}
                              </div>
                            );
                          })()}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        {(() => {
                          const qty = item.quantity || 1;
                          const base = typeof item.basePrice === 'number' ? item.basePrice : 8;
                          const charms = item.pinsDetails && item.pinsDetails.length
                            ? item.pinsDetails.reduce((s, p) => s + (p.price || 0), 0)
                            : Math.max(0, (item.totalPrice || 0) - base);
                          const unit = base + charms;
                          const total = unit * qty;
                          return (
                            <div className="text-right">
                             
                              <p className="text-2xl font-bold happy-text-gradient lazy-dog-title" style={{fontFamily: "'Fredoka One', cursive"}}>
                                £{total.toFixed(2)}
                              </p>
                            </div>
                          );
                        })()}
                        <button
                          onClick={() => removeFromCart(index)}
                          className="flex items-center bg-pink-400 hover:bg-pink-500 text-white px-4 py-2 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
                        >
                          <FontAwesomeIcon icon={faTrash} className="mr-2" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="happy-card p-6 sticky top-8">
                <h3 className="text-xl font-bold happy-text-gradient mb-4 flex items-center">
                  Order Summary
                </h3>
                
                <div className="space-y-3 mb-6">
                  {cart.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>Custom Case x{item.quantity || 1} ({item.pinsDetails?.length || 0} charms)</span>
                      <span>£{(item.totalPrice * (item.quantity || 1)).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-xl font-bold text-blue-800">£{getTotalPrice().toFixed(2)}</span>
                  </div>
                  
                  <button
                    onClick={handleCheckout}
                    className="w-full text-lg py-4 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
                  >
                    <span>Checkout</span>
                    <span className="text-2xl animate-bounce">🎉</span>
                  </button>
                  
                  <p className="text-xs text-gray-500 mt-3 text-center">
                    🔒 Secure payment powered by Stripe
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
