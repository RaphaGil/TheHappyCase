import React, { useState, useEffect } from 'react';
import Products from '../../data/products.json';

const Dashboard = () => {
  const [products, setProducts] = useState(Products);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load products from JSON file and merge with localStorage quantities
    const savedQuantities = localStorage.getItem('productQuantities');
    if (savedQuantities) {
      try {
        const quantities = JSON.parse(savedQuantities);
        const mergedProducts = { ...Products };
        
        // Merge case quantities and color quantities
        if (quantities.cases) {
          mergedProducts.cases = mergedProducts.cases.map((caseItem, index) => {
            const updatedCase = {
              ...caseItem,
              quantity: quantities.cases[index] !== undefined ? quantities.cases[index] : caseItem.quantity
            };
            
            // Merge color quantities if they exist
            if (quantities.caseColors && quantities.caseColors[index]) {
              updatedCase.colors = updatedCase.colors.map((colorItem, colorIndex) => ({
                ...colorItem,
                quantity: quantities.caseColors[index][colorIndex] !== undefined 
                  ? quantities.caseColors[index][colorIndex] 
                  : colorItem.quantity
              }));
            }
            
            return updatedCase;
          });
        }
        
        // Merge charm quantities
        if (quantities.pins) {
          ['flags', 'colorful', 'bronze'].forEach(category => {
            if (quantities.pins[category]) {
              mergedProducts.pins[category] = mergedProducts.pins[category].map((charm, index) => ({
                ...charm,
                quantity: quantities.pins[category][index] !== undefined ? quantities.pins[category][index] : charm.quantity
              }));
            }
          });
        }
        
        setProducts(mergedProducts);
      } catch (error) {
        console.error('Error loading saved quantities:', error);
        setProducts(Products);
      }
    } else {
      setProducts(Products);
    }
  }, []);

  const updateQuantity = (type, index, subIndex, value, colorIndex = null) => {
    const newProducts = { ...products };
    
    if (type === 'case') {
      if (colorIndex !== null) {
        // Update color quantity
        if (!newProducts.cases[index].colors[colorIndex].quantity) {
          newProducts.cases[index].colors[colorIndex].quantity = 0;
        }
        newProducts.cases[index].colors[colorIndex].quantity = parseInt(value) || 0;
      } else {
        // Update case quantity
        if (!newProducts.cases[index].quantity) {
          newProducts.cases[index].quantity = 0;
        }
        newProducts.cases[index].quantity = parseInt(value) || 0;
      }
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
    // Save quantities to localStorage
    const quantitiesToSave = {
      cases: products.cases.map(c => c.quantity !== undefined ? c.quantity : null),
      caseColors: products.cases.map(c => 
        c.colors ? c.colors.map(color => color.quantity !== undefined ? color.quantity : null) : []
      ),
      pins: {
        flags: products.pins.flags.map(c => c.quantity !== undefined ? c.quantity : null),
        colorful: products.pins.colorful.map(c => c.quantity !== undefined ? c.quantity : null),
        bronze: products.pins.bronze.map(c => c.quantity !== undefined ? c.quantity : null)
      }
    };
    
    localStorage.setItem('productQuantities', JSON.stringify(quantitiesToSave));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    
    console.log('Quantities saved to localStorage:', quantitiesToSave);
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
          <div className="space-y-8">
            {products.cases.map((caseItem, index) => (
              <div key={index} className="border border-gray-200 rounded-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>
                    {caseItem.name}
                  </h3>
                  {caseItem.quantity === 0 && (
                    <span className="text-xs text-red-600 font-medium">SOLD OUT</span>
                  )}
                </div>
                
                {/* Case-level quantity (optional) */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                  <label className="text-sm text-gray-600 font-medium" style={{fontFamily: "'Poppins', sans-serif"}}>
                    Overall Quantity:
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
                
                {/* Color quantities */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3" style={{fontFamily: "'Poppins', sans-serif"}}>
                    Color Quantities:
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {caseItem.colors && caseItem.colors.map((colorItem, colorIndex) => (
                      <div key={colorIndex} className="flex flex-col items-center gap-2 p-3 border border-gray-200 rounded-sm">
                        <div 
                          className="w-12 h-12 rounded-full border-2 border-gray-300 shadow-sm"
                          style={{ backgroundColor: colorItem.color }}
                          title={colorItem.color}
                        />
                        <div className="flex items-center gap-2 w-full">
                          <input
                            type="number"
                            min="0"
                            value={colorItem.quantity !== undefined ? colorItem.quantity : ''}
                            onChange={(e) => updateQuantity('case', index, null, e.target.value, colorIndex)}
                            className="w-full px-2 py-1 border border-gray-300 rounded-sm text-xs focus:outline-none focus:border-gray-400 text-center"
                            style={{fontFamily: "'Poppins', sans-serif"}}
                          />
                        </div>
                        {colorItem.quantity === 0 && (
                          <span className="text-[10px] text-red-600 font-medium">SOLD OUT</span>
                        )}
                      </div>
                    ))}
                  </div>
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

