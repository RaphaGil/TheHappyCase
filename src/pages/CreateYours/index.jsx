import React, { useEffect, useRef, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";

import Canvas from "../../component/Canvas/index.jsx";
import ColorSelector from "../../component/ColorSelector/index.jsx";

import PinSelector from "../../component/PinSelector";
import AddToCartBtn from '../../component/AddToCartBtn'
import Products from "../../products.json";
import { useCart } from "../../context/CartContext";

const CreateYours = () => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [pins, setPins] = useState([]);
  const [selectedCaseType, setSelectedCaseType] = useState("economy");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedCaseImage, setSelectedCaseImage] = useState("");
  const [selectedPins, setSelectedPins] = useState([]);
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);
  const [isCaseDropdownOpen, setIsCaseDropdownOpen] = useState(false);
  const [saveImageFunction, setSaveImageFunction] = useState(null);
  const caseDropdownRef = useRef(null);
  const { addToCart } = useCart();

  // Handle case type selection
  const handleCaseTypeSelection = (caseType) => {
    setSelectedCaseType(caseType);
    const selectedCase = Products.cases.find(c => c.type === caseType);
    if (selectedCase && selectedCase.colors.length > 0) {
      const firstColor = selectedCase.colors[0];
      setSelectedColor(firstColor.color);
      setSelectedCaseImage(firstColor.image);
    }
  };

  // Handle color selection
  const handleColorSelection = (color, image) => {
    setSelectedColor(color);
    setSelectedCaseImage(image);
  };

  // Handle pin selection from PinSelector
  const handlePinSelection = useCallback((pin) => {
    // This will be handled by the Canvas component
    if (window.addPinToCanvas) {
      window.addPinToCanvas(pin);
    }
  }, []);

  // Handle navigation from other pages
  useEffect(() => {
    if (location.state?.selectedPin) {
      const selectedPin = location.state.selectedPin;
      setTimeout(() => {
        if (window.addPinToCanvas) {
          window.addPinToCanvas(selectedPin);
        }
      }, 1000);
      
      // Clear the navigation state
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // When category changes, update pins from Products
  useEffect(() => {
    if (selectedCategory) {
      if (selectedCategory === 'flags') {
        const flagPins = Products.pins.flags || [];
        setPins(flagPins);
      } else {
        setPins(Products.pins[selectedCategory] || []);
      }
    }
  }, [selectedCategory]);

  // Initialize default case and color
  useEffect(() => {
    if (Products.cases.length > 0) {
      const defaultCase = Products.cases.find(c => c.type === selectedCaseType) || Products.cases[0];
      if (defaultCase.colors.length > 0) {
        const defaultColor = defaultCase.colors[0];
        setSelectedColor(defaultColor.color);
        setSelectedCaseImage(defaultColor.image);
      }
    }
  }, [selectedCaseType]);

  // Calculate total price
  const selectedCase = Products.cases.find(c => c.type === selectedCaseType);
  const caseBasePrice = selectedCase?.basePrice || 0;
  const pinsPrice = selectedPins.reduce((total, { pin }) => total + (pin?.price || 0), 0);
  const totalPrice = (caseBasePrice + pinsPrice).toFixed(2);

  // Handle add to cart
  const handleAddToCart = () => {
    const product = {
      id: `custom-${Date.now()}`,
      name: `${selectedCase?.name || 'Custom Case'} with ${selectedPins.length} charms`,
      caseType: selectedCaseType,
      caseName: selectedCase?.name || 'Custom Case',
      color: selectedColor,
      pins: selectedPins.map(({ pin }) => pin),
      price: parseFloat(totalPrice),
      image: selectedCaseImage,
      customDesign: true
    };
    
    addToCart(product);
  };

  // Handle pin selection callback from Canvas
  const handlePinSelect = useCallback((imgInstance) => {
    if (imgInstance && imgInstance.pinData) {
      console.log('handlePinSelect called for:', imgInstance.pinData.name); // Debug log
      setSelectedPins(prev => {
        console.log('Current selectedPins count:', prev.length); // Debug log
        
        // Check if this pin is already in the array to prevent duplicates
        const isAlreadyAdded = prev.some(item => 
          item.imgInstance === imgInstance || 
          (item.pin && imgInstance.pinData && item.pin.src === imgInstance.pinData.src && item.pin.name === imgInstance.pinData.name)
        );
        
        if (isAlreadyAdded) {
          console.log('Pin already added, skipping duplicate'); // Debug log
          return prev; // Don't add duplicate
        }
        
        console.log('Adding new pin to selectedPins'); // Debug log
        return [...prev, { imgInstance, pin: imgInstance.pinData }];
      });
    }
  }, []);

  // Handle pin removal callback from Canvas
  const handlePinRemove = useCallback((removedPin) => {
    setSelectedPins(prev => prev.filter(p => p.imgInstance !== removedPin));
  }, []);

  // Handle save image function from Canvas
  const handleSaveImageFunction = useCallback((saveFunction) => {
    setSaveImageFunction(() => saveFunction);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const onDocClick = (e) => {
      if (caseDropdownRef.current && !caseDropdownRef.current.contains(e.target)) {
        setIsCaseDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-blue-50 to-sky-100 pt-4">
      <div className="w-full p-4">
        
        {/* MAIN SECTION - Canvas and Right Side */}
        <div className="flex flex-col xl:flex-row gap-6">
          
          {/* MIDDLE - Design Canvas */}
          <div className="w-full xl:w-1/2">
            <Canvas
              selectedCaseType={selectedCaseType}
              selectedColor={selectedColor}
              selectedPins={selectedPins}
              onPinSelect={handlePinSelect}
              onPinRemove={handlePinRemove}
              onSaveImage={handleSaveImageFunction}
              products={Products}
            />
          </div>

          {/* Right Side - Charms Selection */}
          <div className="w-full xl:w-1/2 space-y-6">
            {/* Passport Case Selection */}
            <div className="happy-card p-6">
              <h3 className="font-bold text-xl lazy-dog-title mb-4" style={{fontFamily: "'Fredoka One', cursive"}}>
                1) Choose Your Passport Case
              </h3>
              
              <div className="relative">
                <select
                  value={selectedCaseType}
                  onChange={(e) => handleCaseTypeSelection(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-full bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 student-text"
                  style={{fontFamily: "'Inter', sans-serif", fontWeight: 300}}
                >
                  <option value="economy">Economy - £8.00</option>
                  <option value="business">Business - £12.00</option>
                  <option value="firstclass">First Class - £12.00</option>
                </select>
              </div>
              
              {selectedColor && (
                <div className="mt-10">
                  <ColorSelector
                    colors={selectedCase?.colors || []}
                    selectedColor={selectedColor}
                    onSelect={handleColorSelection}
                  />
                </div>
              )}
            </div>

            {/* Charms Selection */}
            <div className="happy-card p-6">
              <h3 className="font-bold text-xl lazy-dog-title mb-4" style={{fontFamily: "'Fredoka One', cursive"}}>
                3) Choose Your Charms
              </h3>
              <PinSelector
                pins={pins}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedPins={selectedPins}
                onSelect={handlePinSelection}
              />
            </div>
            
            {/* Price Summary */}
            <div className="happy-card p-6">
              <div className="flex items-center mb-4">
                <h3 className="student-text text-lg" style={{fontFamily: "'Inter', sans-serif", fontWeight: 400}} >
                   Total: £{totalPrice}
                </h3>
                <button
                  onClick={() => setShowPriceBreakdown(!showPriceBreakdown)}
                  className="ml-4 text-sm text-black px-4 py-2 rounded-full border border-gray-400 transition-all duration-300 transform hover:scale-105 student-text" 
                  style={{fontFamily: "'Inter', sans-serif", fontWeight: 400}}
                >
                  {showPriceBreakdown ? 'Hide Details' : 'Details'}
                </button>
              </div>
              
              {/* Price Breakdown Dropdown */}
              {showPriceBreakdown && (
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Case:</span>
                    <span>£{caseBasePrice.toFixed(2)}</span>
                  </div>
                  {selectedPins.map(({ pin }, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{pin.name}:</span>
                      <span>£{pin.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-6 flex gap-3">
                <div className="flex-1">
                  <AddToCartBtn 
                    product={{
                      id: `custom-${Date.now()}`,
                      name: `${selectedCase?.name || 'Custom Case'} with ${selectedPins.length} charms`,
                      price: parseFloat(totalPrice),
                      image: selectedCaseImage,
                      customDesign: true
                    }}
                    onAdd={handleAddToCart}
                  />
                </div>
                
                {/* Save Your Design Button */}
                {saveImageFunction && (
                  <button
                    onClick={saveImageFunction}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full font-bold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-green-500/25 student-text text-sm flex items-center justify-center gap-2" 
                    style={{fontFamily: "'Inter', sans-serif", fontWeight: 400}} 
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Save Your Design
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateYours;