import React, { useEffect, useState, useCallback, useRef } from "react";
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
  const [saveImageFunction, setSaveImageFunction] = useState(null);
  const [isCaseDropdownOpen, setIsCaseDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
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
    
    // Scroll to the canvas area to show the passport case with the new charm
    setTimeout(() => {
      const canvasElement = document.querySelector('.happy-card');
      if (canvasElement) {
        canvasElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
    }, 100); // Small delay to ensure the charm is added first
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

  // Group pins for price breakdown display
  const groupedPins = selectedPins.reduce((acc, { pin }) => {
    if (!pin) return acc;
    const key = `${pin.src}|${pin.name}|${pin.price}`;
    if (!acc[key]) {
      acc[key] = { ...pin, count: 0 };
    }
    acc[key].count += 1;
    return acc;
  }, {});
  const groupedPinsList = Object.values(groupedPins);

  // Handle add to cart
  const handleAddToCart = () => {
    // Capture composed design image from canvas if available
    let designImage = null;
    try {
      if (window.getDesignImageDataURL) {
        designImage = window.getDesignImageDataURL();
      }
    } catch {}
    const product = {
      id: `custom-${Date.now()}`,
      name: `${selectedCase?.name || 'Custom Case'} with ${selectedPins.length} charms`,
      caseType: selectedCaseType,
      caseName: selectedCase?.name || 'Custom Case',
      color: selectedColor,
      pins: selectedPins.map(({ pin }) => pin),
      pinsDetails: selectedPins.map(({ pin }) => pin), // Add this for cart display
      basePrice: caseBasePrice,
      casePrice: caseBasePrice,
      pinsPrice: pinsPrice,
      totalPrice: parseFloat(totalPrice),
      price: parseFloat(totalPrice), // Keep for compatibility
      image: selectedCaseImage,
      caseImage: selectedCaseImage, // Add this for cart display
      designImage,
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

        // Always allow adding multiple instances of the same charm
        console.log('Adding pin instance to selectedPins'); // Debug log
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

  // Track screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full ">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-28 h-28 bg-green-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-10 w-20 h-20 bg-pink-200 rounded-full opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="lg:container mx-auto px-4 sm:px-6 relative z-10 pt-4 sm:pt-8">
        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 sm:mb-6 tracking-tight" 
              style={{fontFamily: "'Fredoka One', cursive"}}>
            Create Yours
          </h1>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-orange-400 to-pink-400 mx-auto rounded-full"></div>
          <p className="text-base sm:text-lg text-gray-600 mt-4 sm:mt-6 max-w-2xl mx-auto leading-relaxed px-4" 
             style={{fontFamily: "'Poppins', sans-serif"}}>
            Design your perfect passport case with our interactive creator
          </p>
        </div>
        
        {/* MAIN SECTION - Canvas and Right Side */}
        <div className="flex  flex-col lg:flex-row gap-6 lg:gap-12 ">
          
          {/* LEFT - Design Canvas - Centered */}
          <div className="w-full lg:w-1/2 flex justify-center  ">
            <div className="w-full max-w-[400px] sm:max-w-[500px] lg:max-w-[600px]">
              <Canvas
                selectedCaseType={selectedCaseType}
                selectedColor={selectedColor}
                onPinSelect={handlePinSelect}
                onPinRemove={handlePinRemove}
                onSaveImage={handleSaveImageFunction}
                products={Products}
              />
            </div>
          </div>

          {/* Right Side - Charms Selection */}
          <div className="w-full lg:w-1/2 flex flex-col space-y-4 sm:space-y-6 order-1 lg:order-2">
            {/* Passport Case Selection */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 flex-shrink-0">
              <h3 className="font-bold text-lg sm:text-xl text-gray-800 mb-4" style={{fontFamily: "'Fredoka One', cursive"}}>
                1) Choose Your Passport Case
              </h3>
              
              {/* Visual indicator when dropdown is open */}
              {isCaseDropdownOpen && (
                <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200 rounded-2xl animate-pulse">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-orange-400 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-bounce delay-200"></div>
                    <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce delay-300"></div>
                    <span className="text-sm font-semibold text-gray-700 ml-2" style={{fontFamily: "'Poppins', sans-serif"}}>
                      Select your perfect passport case! ✨
                    </span>
                  </div>
                </div>
              )}

              <div className="relative" ref={caseDropdownRef}>
                <button
                  type="button"
                  className={`w-full px-3 sm:px-4 py-3 border-2 rounded-full bg-white text-gray-800 shadow-sm flex items-center justify-between focus:outline-none focus:ring-2 transition-all duration-300 text-sm sm:text-base ${
                    isCaseDropdownOpen 
                      ? 'border-blue-400 ring-blue-200 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-300 focus:ring-blue-200'
                  }`}
                  style={{fontFamily: "'Poppins', sans-serif", fontWeight: 400}}
                  onClick={() => setIsCaseDropdownOpen((o) => !o)}
                  aria-haspopup="listbox"
                  aria-expanded={isCaseDropdownOpen}
                >
                  <span>
                    {selectedCaseType === 'economy' && 'Economy - £8.00'}
                    {selectedCaseType === 'business' && 'Business - £12.00'}
                    {selectedCaseType === 'firstclass' && 'First Class - £12.00'}
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-gray-500 transition-transform ${isCaseDropdownOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.216l3.71-3.0a.75.75 0 111.06 1.06l-4.24 3.43a.75.75 0 01-.96 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                  </svg>
                </button>
                {isCaseDropdownOpen && (
                  <ul
                    className="absolute z-50 mt-2 w-full max-h-64 overflow-auto rounded-xl border-2 border-blue-200 bg-white shadow-xl focus:outline-none"
                    role="listbox"
                  >
                    {[
                      { value: 'economy', label: 'Economy - £8.00' },
                      { value: 'business', label: 'Business - £12.00' },
                      { value: 'firstclass', label: 'First Class - £12.00' },
                    ].map((opt) => (
                      <li
                        key={opt.value}
                        role="option"
                        aria-selected={selectedCaseType === opt.value}
                        className={`px-4 py-2 cursor-pointer transition-colors duration-200 ${
                          selectedCaseType === opt.value 
                            ? 'bg-blue-50 text-blue-700 font-semibold' 
                            : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                        }`}
                        style={{fontFamily: "'Poppins', sans-serif", fontWeight: 400}}
                        onClick={() => {
                          handleCaseTypeSelection(opt.value);
                          setIsCaseDropdownOpen(false);
                        }}
                      >
                        {opt.label}
                      </li>
                    ))}
                  </ul>
                )}
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

            {/* Charms Selection - Only show after case selection on mobile */}
            {/* On mobile, only show charms section after case and color are selected */}
            <div className={`${isMobile ? (selectedCaseType && selectedColor ? 'block' : 'hidden') : 'block'}`}>
              <div className={`bg-white rounded-2xl p-4 sm:p-6 shadow-sm border relative z-10 ${
                selectedCategory 
                  ? 'border-orange-300 hover:border-orange-400 min-h-96' 
                  : 'border-gray-200 hover:border-gray-300 min-h-32'
              }`}>
                <h3 className="font-bold text-lg sm:text-xl text-gray-800 mb-4" style={{fontFamily: "'Fredoka One', cursive"}}>
                  2) Choose Your Charms
                </h3>
                <div className="relative z-10">
                  <PinSelector
                    pins={pins}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    selectedPins={selectedPins}
                    onSelect={handlePinSelection}
                  />
                </div>
              </div>
            </div>
            
            {/* Price Summary - Only show after case selection on mobile */}
            <div className={`${isMobile ? (selectedCaseType && selectedColor ? 'block' : 'hidden') : 'block'} bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 flex-shrink-0 relative z-0 mt-auto`}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 mb-4">
                <h3 className="text-base sm:text-lg text-gray-800 font-semibold" style={{fontFamily: "'Poppins', sans-serif"}} >
                   Total: £{totalPrice}
                </h3>
                <button
                  onClick={() => setShowPriceBreakdown(!showPriceBreakdown)}
                  className="text-xs sm:text-sm text-orange-600 px-3 sm:px-4 py-2 rounded-full border border-orange-300 hover:border-orange-400 hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 self-start sm:ml-4" 
                  style={{fontFamily: "'Poppins', sans-serif", fontWeight: 400}}
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
                  {groupedPinsList.map((pin, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{pin.name}{pin.count > 1 ? ` (x${pin.count})` : ''}:</span>
                      <span>£{(pin.price * pin.count).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <AddToCartBtn 
                    product={{
                      id: `custom-${Date.now()}`,
                      name: `${selectedCase?.name || 'Custom Case'} with ${selectedPins.length} charms`,
                      caseType: selectedCaseType,
                      caseName: selectedCase?.name || 'Custom Case',
                      color: selectedColor,
                      pins: selectedPins.map(({ pin }) => pin),
                      pinsDetails: selectedPins.map(({ pin }) => pin),
                      basePrice: caseBasePrice,
                      casePrice: caseBasePrice,
                      pinsPrice: pinsPrice,
                      totalPrice: parseFloat(totalPrice),
                      price: parseFloat(totalPrice),
                      image: selectedCaseImage,
                      caseImage: selectedCaseImage,
                      customDesign: true
                    }}
                    onAdd={handleAddToCart}
                  />
                </div>
                
                {/* Save Your Design Button */}
                {saveImageFunction && (
                  <button
                    onClick={saveImageFunction}
                    className="flex-1 sm:flex-none px-4 sm:px-6 py-3 bg-pink-400 hover:bg-pink-500 text-white rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-xs sm:text-sm flex items-center justify-center gap-2" 
                    style={{fontFamily: "'Poppins', sans-serif", fontWeight: 600}} 
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="hidden sm:inline">Save Your Design</span>
                    <span className="sm:hidden">Save</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="text-center mt-8 sm:mt-16 pb-4 sm:pb-8">
          <div className="inline-flex items-center space-x-2 text-gray-500">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce delay-200"></div>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateYours;