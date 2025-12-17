import React, { useState, useEffect } from 'react';
import Products from '../../data/products.json';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('inventory');
  const [products, setProducts] = useState(Products);
  const [saved, setSaved] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [ordersError, setOrdersError] = useState(null);

  /* -------------------- LOAD INVENTORY -------------------- */
  useEffect(() => {
    const savedQuantities = localStorage.getItem('productQuantities');

    if (!savedQuantities) {
      setProducts(Products);
      return;
    }

    try {
      const quantities = JSON.parse(savedQuantities);
      const mergedProducts = structuredClone(Products);

      if (quantities.cases) {
        mergedProducts.cases = mergedProducts.cases.map((caseItem, index) => {
          const updatedCase = {
            ...caseItem,
            quantity:
              quantities.cases[index] !== undefined
                ? quantities.cases[index]
                : caseItem.quantity,
          };

          if (quantities.caseColors?.[index]) {
            updatedCase.colors = updatedCase.colors.map((colorItem, colorIndex) => ({
              ...colorItem,
              quantity:
                quantities.caseColors[index][colorIndex] !== undefined
                  ? quantities.caseColors[index][colorIndex]
                  : colorItem.quantity,
            }));
          }

          return updatedCase;
        });
      }

      if (quantities.pins) {
        ['flags', 'colorful', 'bronze'].forEach((category) => {
          if (quantities.pins[category]) {
            mergedProducts.pins[category] =
              mergedProducts.pins[category].map((charm, index) => ({
                ...charm,
                quantity:
                  quantities.pins[category][index] !== undefined
                    ? quantities.pins[category][index]
                    : charm.quantity,
              }));
          }
        });
      }

      setProducts(mergedProducts);
    } catch (err) {
      console.error(err);
      setProducts(Products);
    }
  }, []);

  /* -------------------- ORDERS -------------------- */
  useEffect(() => {
    if (activeTab === 'orders') fetchOrders();
  }, [activeTab]);

  const fetchOrders = async () => {
    setLoadingOrders(true);
    setOrdersError(null);

    try {
      const res = await fetch('/get-orders?limit=100');
      const data = await res.json();

      if (data.success) setOrders(data.orders || []);
      else setOrdersError(data.error || 'Failed to fetch orders');
    } catch {
      setOrdersError('Failed to fetch orders.');
    } finally {
      setLoadingOrders(false);
    }
  };

  const updateQuantity = (type, index, category, value, colorIndex = null) => {
    const next = structuredClone(products);

    if (type === 'case') {
      if (colorIndex !== null) {
        next.cases[index].colors[colorIndex].quantity = parseInt(value) || 0;
      } else {
        next.cases[index].quantity = parseInt(value) || 0;
      }
    }

    if (type === 'charm') {
      next.pins[category][index].quantity = parseInt(value) || 0;
    }

    setProducts(next);
    setSaved(false);
  };

  const saveQuantities = () => {
    const payload = {
      cases: products.cases.map((c) => c.quantity ?? null),
      caseColors: products.cases.map((c) =>
        c.colors?.map((col) => col.quantity ?? null)
      ),
      pins: {
        flags: products.pins.flags.map((c) => c.quantity ?? null),
        colorful: products.pins.colorful.map((c) => c.quantity ?? null),
        bronze: products.pins.bronze.map((c) => c.quantity ?? null),
      },
    };

    localStorage.setItem('productQuantities', JSON.stringify(payload));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  /* -------------------- UI -------------------- */
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <h1 className="text-3xl font-light mb-6 font-inter">Dashboard</h1>

        {/* Tabs */}
        <div className="mb-6 border-b">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`mr-6 pb-2 ${
              activeTab === 'inventory'
                ? 'border-b-2 border-black'
                : 'text-gray-400'
            }`}
          >
            Inventory
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-2 ${
              activeTab === 'orders'
                ? 'border-b-2 border-black'
                : 'text-gray-400'
            }`}
          >
            Orders
          </button>
        </div>

        {/* ---------------- INVENTORY ---------------- */}
        {activeTab === 'inventory' && (
          <>
            <div className="flex justify-end mb-6">
              <button
                onClick={saveQuantities}
                className={`font-inter px-6 py-2 uppercase text-sm ${
                  saved ? 'bg-green-600 text-white' : 'bg-black text-white'
                }`}
              >
                {saved ? '✓ Saved' : 'Save Changes'}
              </button>
            </div>

            <div className="bg-white border p-6 rounded-sm">
              <h2 className="text-xl mb-6 font-inter">Passport Cases</h2>

              {products.cases.map((caseItem, index) => (
                <div key={index} className="mb-8 border border-gray-200 rounded-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900 font-inter">
                      {caseItem.name}
                    </h3>
                    {caseItem.quantity === 0 && (
                      <span className="text-xs text-red-600 font-medium">SOLD OUT</span>
                    )}
                  </div>

                  {/* Overall Case Quantity (Optional) */}
                  <div className="mb-6 pb-4 border-b border-gray-100">
                    <label className="text-sm text-gray-600 font-medium mb-2 block font-inter">
                      Overall Quantity (Optional):
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={caseItem.quantity ?? ''}
                      onChange={(e) =>
                        updateQuantity('case', index, null, e.target.value)
                      }
                      className="w-24 px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-gray-400 font-inter"
                      placeholder="0"
                    />
                  </div>

                  {/* Color Quantities */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-4 font-inter">
                      Quantity per Color:
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {caseItem.colors.map((color, cIndex) => {
                        const isSoldOut = color.quantity !== undefined && color.quantity === 0;
                        return (
                          <div
                            key={cIndex}
                            className="flex flex-col items-center gap-2 p-3 border border-gray-200 rounded-sm hover:border-gray-300 transition-colors"
                          >
                            {/* Color Swatch */}
                            <div
                              className="w-12 h-12 rounded-full border-2 border-gray-300 shadow-sm"
                              style={{ backgroundColor: color.color }}
                              title={color.color}
                            />
                            
                            {/* Color Name (if available) */}
                            {color.name && (
                              <span className="text-xs text-gray-600 text-center font-inter">
                                {color.name}
                              </span>
                            )}
                            
                            {/* Quantity Input */}
                            <div className="w-full flex flex-col items-center gap-1">
                              <label className="text-xs text-gray-500 font-inter">
                                Qty:
                              </label>
                              <input
                                type="number"
                                min="0"
                                value={color.quantity ?? ''}
                                onChange={(e) =>
                                  updateQuantity(
                                    'case',
                                    index,
                                    null,
                                    e.target.value,
                                    cIndex
                                  )
                                }
                                className="w-full px-2 py-1 border border-gray-300 rounded-sm text-xs text-center focus:outline-none focus:border-gray-400 font-inter"
                                placeholder="0"
                              />
                            </div>
                            
                            {/* Sold Out Badge */}
                            {isSoldOut && (
                              <span className="text-[10px] text-red-600 font-medium font-inter">
                                SOLD OUT
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Charms Section */}
            <div className="bg-white border p-6 rounded-sm mt-8">
              <h2 className="text-xl mb-6 font-inter">Charms</h2>

              {/* Flags Charms */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4 font-inter">
                  Flags
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {products.pins.flags.map((charm, index) => {
                    const isSoldOut = charm.quantity !== undefined && charm.quantity === 0;
                    return (
                      <div
                        key={index}
                        className="flex flex-col items-center gap-2 p-3 border border-gray-200 rounded-sm hover:border-gray-300 transition-colors"
                      >
                        {/* Charm Image */}
                        {charm.image && (
                          <div className="w-16 h-16 flex items-center justify-center border border-gray-200 rounded-sm bg-white">
                            <img
                              src={charm.image}
                              alt={charm.name}
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                        )}
                        
                        {/* Charm Name */}
                        <span className="text-xs text-gray-700 text-center font-inter font-medium">
                          {charm.name}
                        </span>
                        
                        {/* Quantity Input */}
                        <div className="w-full flex flex-col items-center gap-1">
                          <label className="text-xs text-gray-500 font-inter">
                            Qty:
                          </label>
                          <input
                            type="number"
                            min="0"
                            value={charm.quantity ?? ''}
                            onChange={(e) =>
                              updateQuantity('charm', index, 'flags', e.target.value)
                            }
                            className="w-full px-2 py-1 border border-gray-300 rounded-sm text-xs text-center focus:outline-none focus:border-gray-400 font-inter"
                            placeholder="0"
                          />
                        </div>
                        
                        {/* Sold Out Badge */}
                        {isSoldOut && (
                          <span className="text-[10px] text-red-600 font-medium font-inter">
                            SOLD OUT
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Colorful Charms */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4 font-inter">
                  Colorful Charms
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {products.pins.colorful.map((charm, index) => {
                    const isSoldOut = charm.quantity !== undefined && charm.quantity === 0;
                    return (
                      <div
                        key={index}
                        className="flex flex-col items-center gap-2 p-3 border border-gray-200 rounded-sm hover:border-gray-300 transition-colors"
                      >
                        {/* Charm Image */}
                        {charm.image && (
                          <div className="w-16 h-16 flex items-center justify-center border border-gray-200 rounded-sm bg-white">
                            <img
                              src={charm.image}
                              alt={charm.name}
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                        )}
                        
                        {/* Charm Name */}
                        <span className="text-xs text-gray-700 text-center font-inter font-medium">
                          {charm.name}
                        </span>
                        
                        {/* Quantity Input */}
                        <div className="w-full flex flex-col items-center gap-1">
                          <label className="text-xs text-gray-500 font-inter">
                            Qty:
                          </label>
                          <input
                            type="number"
                            min="0"
                            value={charm.quantity ?? ''}
                            onChange={(e) =>
                              updateQuantity('charm', index, 'colorful', e.target.value)
                            }
                            className="w-full px-2 py-1 border border-gray-300 rounded-sm text-xs text-center focus:outline-none focus:border-gray-400 font-inter"
                            placeholder="0"
                          />
                        </div>
                        
                        {/* Sold Out Badge */}
                        {isSoldOut && (
                          <span className="text-[10px] text-red-600 font-medium font-inter">
                            SOLD OUT
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bronze Charms */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 font-inter">
                  Bronze Charms
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {products.pins.bronze.map((charm, index) => {
                    const isSoldOut = charm.quantity !== undefined && charm.quantity === 0;
                    return (
                      <div
                        key={index}
                        className="flex flex-col items-center gap-2 p-3 border border-gray-200 rounded-sm hover:border-gray-300 transition-colors"
                      >
                        {/* Charm Image */}
                        {charm.image && (
                          <div className="w-16 h-16 flex items-center justify-center border border-gray-200 rounded-sm bg-white">
                            <img
                              src={charm.image}
                              alt={charm.name}
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                        )}
                        
                        {/* Charm Name */}
                        <span className="text-xs text-gray-700 text-center font-inter font-medium">
                          {charm.name}
                        </span>
                        
                        {/* Quantity Input */}
                        <div className="w-full flex flex-col items-center gap-1">
                          <label className="text-xs text-gray-500 font-inter">
                            Qty:
                          </label>
                          <input
                            type="number"
                            min="0"
                            value={charm.quantity ?? ''}
                            onChange={(e) =>
                              updateQuantity('charm', index, 'bronze', e.target.value)
                            }
                            className="w-full px-2 py-1 border border-gray-300 rounded-sm text-xs text-center focus:outline-none focus:border-gray-400 font-inter"
                            placeholder="0"
                          />
                        </div>
                        
                        {/* Sold Out Badge */}
                        {isSoldOut && (
                          <span className="text-[10px] text-red-600 font-medium font-inter">
                            SOLD OUT
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ---------------- ORDERS ---------------- */}
        {activeTab === 'orders' && (
          <div className="bg-white border p-6">
            {loadingOrders && <p>Loading...</p>}
            {ordersError && <p className="text-red-600">{ordersError}</p>}
            {!loadingOrders && !ordersError && orders.length === 0 && (
              <p>No orders found.</p>
            )}
            {!loadingOrders &&
              orders.map((o) => (
                <div key={o.id} className="border-b py-4">
                  <p>{o.customer_email}</p>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
