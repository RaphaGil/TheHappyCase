import React, { useState, useEffect } from 'react';
import Products from '../../products.json';

const Dashboard = () => {
  const [products, setProducts] = useState(Products);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load products from JSON file
    setProducts(Products);
  }, []);

  const updateQuantity = (type, index, subIndex, value) => {
    const newProducts = { ...products };
    
    if (type === 'case') {
      // Update case quantity
      if (!newProducts.cases[index].quantity) {
        newProducts.cases[index].quantity = 0;
      }
      newProducts.cases[index].quantity = parseInt(value) || 0;
    } else if (type === 'charm') {
      // Update charm quantity (flags, colorful, or bronze)
      const category = subIndex === 'flags' ? 'flags' : subIndex === 'colorful' ? 'colorful' : 'bronze';
      if (!newProducts.pins[category][index].quantity) {
        newProducts.pins[category][index].quantity = 0;
      }
      newProducts.pins[category][index].quantity = parseInt(value) || 0;
    }
    
    setProducts(newProducts);
    setSaved(false);
  };

  const saveQuantities = () => {
    // In a real app, you'd save to a backend API
    // For now, we'll just show a success message
    // The quantities are stored in state and will persist during the session
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    
    // Note: To persist to products.json, you'd need a backend API
    // This is a frontend-only solution for demonstration
    console.log('Updated products:', products);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-light text-gray-900 mb-2" style={{fontFamily: "'Poppins', sans-serif"}}>
            Inventory Dashboard
          </h1>
          <div className="w-24 h-px bg-gray-300"></div>
          <p className="mt-4 text-sm text-gray-600" style={{fontFamily: "'Poppins', sans-serif"}}>
            Manage quantities for passport cases and charms. Set quantity to 0 to show "Sold Out".
          </p>
        </div>

        {/* Save Button */}
        <div className="mb-6 flex justify-end">
          <button
            onClick={saveQuantities}
            className={`px-6 py-2 text-sm uppercase tracking-wider transition-colors ${
              saved
                ? 'bg-green-600 text-white'
                : 'bg-gray-900 text-white hover:bg-gray-800'
            }`}
            style={{fontFamily: "'Poppins', sans-serif"}}
          >
            {saved ? '✓ Saved' : 'Save Changes'}
          </button>
        </div>

        {/* Passport Cases Section */}
        <div className="bg-white rounded-sm shadow-sm border border-gray-200 mb-8 p-6">
          <h2 className="text-xl font-light text-gray-900 mb-6" style={{fontFamily: "'Poppins', sans-serif"}}>
            Passport Cases
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.cases.map((caseItem, index) => (
              <div key={index} className="border border-gray-200 rounded-sm p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>
                    {caseItem.name}
                  </h3>
                  {caseItem.quantity === 0 && (
                    <span className="text-xs text-red-600 font-medium">SOLD OUT</span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-xs text-gray-600" style={{fontFamily: "'Poppins', sans-serif"}}>
                    Quantity:
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={caseItem.quantity || ''}
                    onChange={(e) => updateQuantity('case', index, null, e.target.value)}
                    className="w-20 px-2 py-1 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-gray-400"
                    style={{fontFamily: "'Poppins', sans-serif"}}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Charms Section */}
        <div className="bg-white rounded-sm shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-light text-gray-900 mb-6" style={{fontFamily: "'Poppins', sans-serif"}}>
            Charms
          </h2>

          {/* Flags */}
          <div className="mb-8">
            <h3 className="text-lg font-light text-gray-800 mb-4" style={{fontFamily: "'Poppins', sans-serif"}}>
              Flags
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.pins.flags.map((charm, index) => (
                <div key={index} className="border border-gray-200 rounded-sm p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-700 truncate" style={{fontFamily: "'Poppins', sans-serif"}}>
                      {charm.name}
                    </span>
                    {charm.quantity === 0 && (
                      <span className="text-xs text-red-600 font-medium ml-2">SOLD OUT</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      value={charm.quantity || ''}
                      onChange={(e) => updateQuantity('charm', index, 'flags', e.target.value)}
                      className="w-16 px-2 py-1 border border-gray-300 rounded-sm text-xs focus:outline-none focus:border-gray-400"
                      style={{fontFamily: "'Poppins', sans-serif"}}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Colorful Charms */}
          <div className="mb-8">
            <h3 className="text-lg font-light text-gray-800 mb-4" style={{fontFamily: "'Poppins', sans-serif"}}>
              Colorful Charms
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.pins.colorful.map((charm, index) => (
                <div key={index} className="border border-gray-200 rounded-sm p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-700 truncate" style={{fontFamily: "'Poppins', sans-serif"}}>
                      {charm.name}
                    </span>
                    {charm.quantity === 0 && (
                      <span className="text-xs text-red-600 font-medium ml-2">SOLD OUT</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      value={charm.quantity || ''}
                      onChange={(e) => updateQuantity('charm', index, 'colorful', e.target.value)}
                      className="w-16 px-2 py-1 border border-gray-300 rounded-sm text-xs focus:outline-none focus:border-gray-400"
                      style={{fontFamily: "'Poppins', sans-serif"}}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bronze Charms */}
          <div>
            <h3 className="text-lg font-light text-gray-800 mb-4" style={{fontFamily: "'Poppins', sans-serif"}}>
              Bronze Charms
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.pins.bronze.map((charm, index) => (
                <div key={index} className="border border-gray-200 rounded-sm p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-700 truncate" style={{fontFamily: "'Poppins', sans-serif"}}>
                      {charm.name}
                    </span>
                    {charm.quantity === 0 && (
                      <span className="text-xs text-red-600 font-medium ml-2">SOLD OUT</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      value={charm.quantity || ''}
                      onChange={(e) => updateQuantity('charm', index, 'bronze', e.target.value)}
                      className="w-16 px-2 py-1 border border-gray-300 rounded-sm text-xs focus:outline-none focus:border-gray-400"
                      style={{fontFamily: "'Poppins', sans-serif"}}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

