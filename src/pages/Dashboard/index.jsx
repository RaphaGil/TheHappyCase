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

              {products.cases.map((caseItem, index) => {
                const overallQuantity = caseItem.quantity !== undefined ? caseItem.quantity : null;
                const isOverallSoldOut = overallQuantity === 0;
                const isOverallLowStock = overallQuantity !== null && overallQuantity > 0 && overallQuantity <= 5;
                const isOverallInStock = overallQuantity !== null && overallQuantity > 5;
                const isOverallUnlimited = overallQuantity === null || overallQuantity === undefined;
                
                return (
                <div key={index} className="mb-8 border border-gray-200 rounded-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900 font-inter">
                      {caseItem.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      {/* Overall Inventory Alert Badge */}
                      {!isOverallUnlimited && (
                        <div>
                          {isOverallSoldOut ? (
                            <div className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </div>
                          ) : isOverallLowStock ? (
                            <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </div>
                          ) : isOverallInStock ? (
                            <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </div>
                          ) : null}
                        </div>
                      )}
                      {isOverallSoldOut && (
                        <span className="text-xs text-red-600 font-medium">SOLD OUT</span>
                      )}
                    </div>
                  </div>

                  {/* Overall Case Quantity (Optional) */}
                  <div className="mb-6 pb-4 border-b border-gray-100">
                    <label className="text-sm text-gray-600 font-medium mb-2 block font-inter">
                      Overall Quantity (Optional):
                    </label>
                    <div className="flex items-center gap-3">
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
                      {/* Overall Inventory Status Alert */}
                      {isOverallSoldOut && (
                        <div className="p-2 bg-red-50 border border-red-200 rounded-sm">
                          <p className="text-xs text-red-700 font-medium font-inter">
                            OUT OF STOCK
                          </p>
                        </div>
                      )}
                      {isOverallLowStock && (
                        <div className="p-2 bg-orange-50 border border-orange-200 rounded-sm">
                          <p className="text-xs text-orange-700 font-medium font-inter">
                            LOW STOCK ({overallQuantity})
                          </p>
                        </div>
                      )}
                      {isOverallInStock && (
                        <div className="p-2 bg-green-50 border border-green-200 rounded-sm">
                          <p className="text-xs text-green-700 font-medium font-inter">
                            IN STOCK ({overallQuantity})
                          </p>
                        </div>
                      )}
                      {isOverallUnlimited && (
                        <div className="p-2 bg-gray-50 border border-gray-200 rounded-sm">
                          <p className="text-xs text-gray-600 font-medium font-inter">
                            UNLIMITED
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Color Quantities */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-4 font-inter">
                      Quantity per Color:
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {caseItem.colors.map((color, cIndex) => {
                        const quantity = color.quantity !== undefined ? color.quantity : null;
                        const isSoldOut = quantity === 0;
                        const isLowStock = quantity !== null && quantity > 0 && quantity <= 5;
                        const isInStock = quantity !== null && quantity > 5;
                        const isUnlimited = quantity === null || quantity === undefined;
                        
                        return (
                          <div
                            key={cIndex}
                            className="flex flex-col items-center gap-2 p-3 border border-gray-200 rounded-sm hover:border-gray-300 transition-colors relative"
                          >
                            {/* Inventory Alert Badge */}
                            {!isUnlimited && (
                              <div className="absolute -top-1 -right-1 z-10">
                                {isSoldOut ? (
                                  <div className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                ) : isLowStock ? (
                                  <div className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                ) : isInStock ? (
                                  <div className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                ) : null}
                              </div>
                            )}
                            
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
                            
                            {/* Inventory Status Alert */}
                            {isSoldOut && (
                              <div className="mt-1 p-1.5 bg-red-50 border border-red-200 rounded-sm w-full">
                                <p className="text-[10px] text-red-700 font-medium font-inter text-center">
                                  OUT OF STOCK
                                </p>
                              </div>
                            )}
                            {isLowStock && (
                              <div className="mt-1 p-1.5 bg-orange-50 border border-orange-200 rounded-sm w-full">
                                <p className="text-[10px] text-orange-700 font-medium font-inter text-center">
                                  LOW STOCK ({quantity})
                                </p>
                              </div>
                            )}
                            {isInStock && (
                              <div className="mt-1 p-1.5 bg-green-50 border border-green-200 rounded-sm w-full">
                                <p className="text-[10px] text-green-700 font-medium font-inter text-center">
                                  IN STOCK ({quantity})
                                </p>
                              </div>
                            )}
                            {isUnlimited && (
                              <div className="mt-1 p-1.5 bg-gray-50 border border-gray-200 rounded-sm w-full">
                                <p className="text-[10px] text-gray-600 font-medium font-inter text-center">
                                  UNLIMITED
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                );
              })}
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
                    const quantity = charm.quantity !== undefined ? charm.quantity : null;
                    const isSoldOut = quantity === 0;
                    const isLowStock = quantity !== null && quantity > 0 && quantity <= 5;
                    const isInStock = quantity !== null && quantity > 5;
                    const isUnlimited = quantity === null || quantity === undefined;
                    
                    return (
                      <div
                        key={index}
                        className="flex flex-col items-center gap-2 p-3 border border-gray-200 rounded-sm hover:border-gray-300 transition-colors relative"
                      >
                        {/* Inventory Alert Badge */}
                        {!isUnlimited && (
                          <div className="absolute -top-1 -right-1 z-10">
                            {isSoldOut ? (
                              <div className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                              </div>
                            ) : isLowStock ? (
                              <div className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                              </div>
                            ) : isInStock ? (
                              <div className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                              </div>
                            ) : null}
                          </div>
                        )}
                        
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
                        
                        {/* Inventory Status Alert */}
                        {isSoldOut && (
                          <div className="mt-1 p-1.5 bg-red-50 border border-red-200 rounded-sm w-full">
                            <p className="text-[10px] text-red-700 font-medium font-inter text-center">
                              OUT OF STOCK
                            </p>
                          </div>
                        )}
                        {isLowStock && (
                          <div className="mt-1 p-1.5 bg-orange-50 border border-orange-200 rounded-sm w-full">
                            <p className="text-[10px] text-orange-700 font-medium font-inter text-center">
                              LOW STOCK ({quantity})
                            </p>
                          </div>
                        )}
                        {isInStock && (
                          <div className="mt-1 p-1.5 bg-green-50 border border-green-200 rounded-sm w-full">
                            <p className="text-[10px] text-green-700 font-medium font-inter text-center">
                              IN STOCK ({quantity})
                            </p>
                          </div>
                        )}
                        {isUnlimited && (
                          <div className="mt-1 p-1.5 bg-gray-50 border border-gray-200 rounded-sm w-full">
                            <p className="text-[10px] text-gray-600 font-medium font-inter text-center">
                              UNLIMITED
                            </p>
                          </div>
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
                    const quantity = charm.quantity !== undefined ? charm.quantity : null;
                    const isSoldOut = quantity === 0;
                    const isLowStock = quantity !== null && quantity > 0 && quantity <= 5;
                    const isInStock = quantity !== null && quantity > 5;
                    const isUnlimited = quantity === null || quantity === undefined;
                    
                    return (
                      <div
                        key={index}
                        className="flex flex-col items-center gap-2 p-3 border border-gray-200 rounded-sm hover:border-gray-300 transition-colors relative"
                      >
                        {/* Inventory Alert Badge */}
                        {!isUnlimited && (
                          <div className="absolute -top-1 -right-1 z-10">
                            {isSoldOut ? (
                              <div className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                              </div>
                            ) : isLowStock ? (
                              <div className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                              </div>
                            ) : isInStock ? (
                              <div className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                              </div>
                            ) : null}
                          </div>
                        )}
                        
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
                        
                        {/* Inventory Status Alert */}
                        {isSoldOut && (
                          <div className="mt-1 p-1.5 bg-red-50 border border-red-200 rounded-sm w-full">
                            <p className="text-[10px] text-red-700 font-medium font-inter text-center">
                              OUT OF STOCK
                            </p>
                          </div>
                        )}
                        {isLowStock && (
                          <div className="mt-1 p-1.5 bg-orange-50 border border-orange-200 rounded-sm w-full">
                            <p className="text-[10px] text-orange-700 font-medium font-inter text-center">
                              LOW STOCK ({quantity})
                            </p>
                          </div>
                        )}
                        {isInStock && (
                          <div className="mt-1 p-1.5 bg-green-50 border border-green-200 rounded-sm w-full">
                            <p className="text-[10px] text-green-700 font-medium font-inter text-center">
                              IN STOCK ({quantity})
                            </p>
                          </div>
                        )}
                        {isUnlimited && (
                          <div className="mt-1 p-1.5 bg-gray-50 border border-gray-200 rounded-sm w-full">
                            <p className="text-[10px] text-gray-600 font-medium font-inter text-center">
                              UNLIMITED
                            </p>
                          </div>
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
                    const quantity = charm.quantity !== undefined ? charm.quantity : null;
                    const isSoldOut = quantity === 0;
                    const isLowStock = quantity !== null && quantity > 0 && quantity <= 5;
                    const isInStock = quantity !== null && quantity > 5;
                    const isUnlimited = quantity === null || quantity === undefined;
                    
                    return (
                      <div
                        key={index}
                        className="flex flex-col items-center gap-2 p-3 border border-gray-200 rounded-sm hover:border-gray-300 transition-colors relative"
                      >
                        {/* Inventory Alert Badge */}
                        {!isUnlimited && (
                          <div className="absolute -top-1 -right-1 z-10">
                            {isSoldOut ? (
                              <div className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                              </div>
                            ) : isLowStock ? (
                              <div className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                              </div>
                            ) : isInStock ? (
                              <div className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                              </div>
                            ) : null}
                          </div>
                        )}
                        
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
                        
                        {/* Inventory Status Alert */}
                        {isSoldOut && (
                          <div className="mt-1 p-1.5 bg-red-50 border border-red-200 rounded-sm w-full">
                            <p className="text-[10px] text-red-700 font-medium font-inter text-center">
                              OUT OF STOCK
                            </p>
                          </div>
                        )}
                        {isLowStock && (
                          <div className="mt-1 p-1.5 bg-orange-50 border border-orange-200 rounded-sm w-full">
                            <p className="text-[10px] text-orange-700 font-medium font-inter text-center">
                              LOW STOCK ({quantity})
                            </p>
                          </div>
                        )}
                        {isInStock && (
                          <div className="mt-1 p-1.5 bg-green-50 border border-green-200 rounded-sm w-full">
                            <p className="text-[10px] text-green-700 font-medium font-inter text-center">
                              IN STOCK ({quantity})
                            </p>
                          </div>
                        )}
                        {isUnlimited && (
                          <div className="mt-1 p-1.5 bg-gray-50 border border-gray-200 rounded-sm w-full">
                            <p className="text-[10px] text-gray-600 font-medium font-inter text-center">
                              UNLIMITED
                            </p>
                          </div>
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
