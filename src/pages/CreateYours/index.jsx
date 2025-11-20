import React, { useEffect, useState, useCallback, useRef } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";

import Canvas from "../../component/Canvas/index.jsx";
import ColorSelector from "../../component/ColorSelector/index.jsx";
import PinSelector from "../../component/PinSelector";
import Products from "../../products.json";
import { useCart } from "../../context/CartContext";

// Components
import MobileStepButtons from "./components/MobileStepButtons";
import ViewMoreImagesButton from "./components/ViewMoreImagesButton";
import ItemDescriptionDropdown from "./components/ItemDescriptionDropdown";
import ImageModal from "./components/ImageModal";
// import SaveDesignButton from "./components/SaveDesignButton";
import MobileOverlay from "./components/MobileOverlay";
import CustomTextSection from "./components/CustomTextSection";
import PriceSummary from "./components/PriceSummary";
import CaseSelector from "./components/CaseSelector";
import TermsOfUseModal from "./components/TermsOfUseModal";
import AddTextModal from "./components/AddTextModal";


const CreateYours = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [pins, setPins] = useState([]);
  const [mobileSubCategory, setMobileSubCategory] = useState('all');
  
  // Initialize default case and color from URL params or defaults
  const getDefaultCaseAndColor = () => {
    const caseParam = searchParams.get('case');
    const colorParam = searchParams.get('color');
    
    // If URL params exist, use them
    if (caseParam) {
      const caseFromParam = Products.cases.find(c => c.type === caseParam);
      if (caseFromParam) {
        // If color param exists and is valid for this case, use it
        if (colorParam) {
          const colorData = caseFromParam.colors.find(c => c.color === colorParam);
          if (colorData) {
            return {
              caseType: caseFromParam.type,
              color: colorData.color,
              image: colorData.image
            };
          }
        }
        // Otherwise use first color of the case
        if (caseFromParam.colors && caseFromParam.colors.length > 0) {
          return {
            caseType: caseFromParam.type,
            color: caseFromParam.colors[0].color,
            image: caseFromParam.colors[0].image
          };
        }
      }
    }
    
    // Fallback to default
    if (Products.cases.length > 0) {
      const defaultCase = Products.cases.find(c => c.type === "economy") || Products.cases[0];
      if (defaultCase && defaultCase.colors.length > 0) {
        return {
          caseType: defaultCase.type,
          color: defaultCase.colors[0].color,
          image: defaultCase.colors[0].image
        };
      }
    }
    return { caseType: "economy", color: "", image: "" };
  };

  const defaultValues = getDefaultCaseAndColor();
  const [selectedCaseType, setSelectedCaseType] = useState(defaultValues.caseType);
  const [selectedColor, setSelectedColor] = useState(defaultValues.color);
  const [selectedCaseImage, setSelectedCaseImage] = useState(defaultValues.image);
  const [selectedPins, setSelectedPins] = useState([]);
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);
  const [saveImageFunction, setSaveImageFunction] = useState(null);
  const [isCaseDropdownOpen, setIsCaseDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileCurrentStep, setMobileCurrentStep] = useState(null); // null = showing passport case, 'case' = case selection, 'color' = color selection, 'charms' = charms selection
  const [quantity, setQuantity] = useState(1);
  const [customText, setCustomText] = useState('');
  const [customTextError, setCustomTextError] = useState('');
  const [customTextAdded, setCustomTextAdded] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedModalImage, setSelectedModalImage] = useState(0);
  const [showDescriptionDropdown, setShowDescriptionDropdown] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [pendingAddToCart, setPendingAddToCart] = useState(false);
  const [showTermsError, setShowTermsError] = useState(false);
  const [showAddTextModal, setShowAddTextModal] = useState(false);
  const caseDropdownRef = useRef(null);
  const { addToCart } = useCart();

  // Update case and color when URL params change
  useEffect(() => {
    const caseParam = searchParams.get('case');
    const colorParam = searchParams.get('color');
    
    if (caseParam) {
      const caseFromParam = Products.cases.find(c => c.type === caseParam);
      if (caseFromParam) {
        setSelectedCaseType(caseFromParam.type);
        
        // If color param exists and is valid for this case, use it
        if (colorParam) {
          const colorData = caseFromParam.colors.find(c => c.color === colorParam);
          if (colorData) {
            setSelectedColor(colorData.color);
            setSelectedCaseImage(colorData.image);
            return;
          }
        }
        
        // Otherwise use first color of the case
        if (caseFromParam.colors && caseFromParam.colors.length > 0) {
          const firstColor = caseFromParam.colors[0];
          setSelectedColor(firstColor.color);
          setSelectedCaseImage(firstColor.image);
        }
      }
    }
  }, [searchParams]);

  // Handle case type selection
  const handleCaseTypeSelection = (caseType) => {
    setSelectedCaseType(caseType);
    const selectedCase = Products.cases.find(c => c.type === caseType);
    if (selectedCase && selectedCase.colors.length > 0) {
      const firstColor = selectedCase.colors[0];
      setSelectedColor(firstColor.color);
      setSelectedCaseImage(firstColor.image);
    }
    // Close mobile step after selection
    if (isMobile) {
      setMobileCurrentStep(null);
    }
  };

  // Handle color selection
  const handleColorSelection = (color, image) => {
    setSelectedColor(color);
    setSelectedCaseImage(image);
    // Close mobile step after selection
    if (isMobile) {
      setMobileCurrentStep(null);
    }
  };

  // Handle pin selection from PinSelector
  const handlePinSelection = useCallback((pin) => {
    // This will be handled by the Canvas component
    if (window.addPinToCanvas) {
      window.addPinToCanvas(pin);
    }
    
    // Close mobile overlay after pin selection
    if (isMobile) {
      setMobileCurrentStep(null);
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
  }, [isMobile]);

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
    // Reset subcategory when category changes
    setMobileSubCategory('all');
  }, [selectedCategory]);

  // Prevent horizontal and vertical scrolling on mobile, maintain page size, hide scrollbar
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      // Set body and html overflow constraints - prevent both horizontal and vertical scrolling on mobile
      document.body.style.overflowX = 'hidden';
      document.body.style.overflowY = 'hidden';
      document.body.style.width = '100%';
      document.body.style.maxWidth = '100vw';
      document.body.style.height = '100vh';
      document.body.style.maxHeight = '100vh';
      // Hide scrollbar
      document.body.style.scrollbarWidth = 'none'; // Firefox
      document.body.style.msOverflowStyle = 'none'; // IE and Edge
      document.documentElement.style.overflowX = 'hidden';
      document.documentElement.style.overflowY = 'hidden';
      document.documentElement.style.width = '100%';
      document.documentElement.style.maxWidth = '100vw';
      document.documentElement.style.height = '100vh';
      document.documentElement.style.maxHeight = '100vh';
      // Hide scrollbar
      document.documentElement.style.scrollbarWidth = 'none'; // Firefox
      document.documentElement.style.msOverflowStyle = 'none'; // IE and Edge
    } else {
      // Desktop: only prevent horizontal scrolling
      document.body.style.overflowX = 'hidden';
      document.body.style.width = '100%';
      document.body.style.maxWidth = '100vw';
      document.documentElement.style.overflowX = 'hidden';
      document.documentElement.style.width = '100%';
      document.documentElement.style.maxWidth = '100vw';
    }
    
    return () => {
      // Cleanup on unmount
      document.body.style.overflowX = '';
      document.body.style.overflowY = '';
      document.body.style.width = '';
      document.body.style.maxWidth = '';
      document.body.style.height = '';
      document.body.style.maxHeight = '';
      document.body.style.scrollbarWidth = '';
      document.body.style.msOverflowStyle = '';
      document.documentElement.style.overflowX = '';
      document.documentElement.style.overflowY = '';
      document.documentElement.style.width = '';
      document.documentElement.style.maxWidth = '';
      document.documentElement.style.height = '';
      document.documentElement.style.maxHeight = '';
      document.documentElement.style.scrollbarWidth = '';
      document.documentElement.style.msOverflowStyle = '';
    };
  }, []);


  // Update color when case type changes
  useEffect(() => {
    if (Products.cases.length > 0) {
      const defaultCase = Products.cases.find(c => c.type === selectedCaseType) || Products.cases[0];
      if (defaultCase && defaultCase.colors.length > 0) {
        const defaultColor = defaultCase.colors[0];
        // Always update when case type changes to ensure correct color is shown
        setSelectedColor(defaultColor.color);
        setSelectedCaseImage(defaultColor.image);
      }
    }
  }, [selectedCaseType]); // Run when selectedCaseType changes

  // Calculate total price
  const selectedCase = Products.cases.find(c => c.type === selectedCaseType);
  const caseBasePrice = selectedCase?.basePrice || 0;
  
  // Get images for the selected case and color
  const selectedColorData = selectedCase?.colors?.find(c => c.color === selectedColor);
  
  // Get detail images from SmartCase folder
  const getCaseImages = () => {
    // Get the main color image
    const colorImage = selectedColorData?.image || selectedCase?.images?.[0] || '';
    
    // Build images array from SmartCase folder
    const smartCaseImages = [];
    
    // Add the main color image
    if (colorImage) {
      smartCaseImages.push(colorImage);
    }
    
    // Add detail images based on case type
    let detailImages = [];
    
    if (selectedCaseType === 'economy') {
      detailImages = [
        '/TheHappyCase/images/SmartCase/economycaseinside.jpg',
        '/TheHappyCase/images/SmartCase/economycaseclosure.jpg',
        '/TheHappyCase/images/SmartCase/economycaseclosureinside.jpg'
      ];
    } else if (selectedCaseType === 'business') {
      detailImages = [
        '/TheHappyCase/images/BusinessClassCase/businessclass.png'
      ];
    } else if (selectedCaseType === 'firstclass') {
      detailImages = [
        '/TheHappyCase/images/FirstClassCase/firstclass.jpg'
      
      ];
    }
    
    // Add detail images if they exist
    detailImages.forEach(img => {
      if (img) {
        smartCaseImages.push(img);
      }
    });
    
    // If we have at least one image, return them; otherwise return empty array
    return smartCaseImages.length > 0 ? smartCaseImages : (colorImage ? [colorImage] : []);
  };
  
  const caseImages = getCaseImages();
  const pinsPrice = selectedPins.reduce((total, { pin }) => total + (pin?.price || 0), 0);
  const totalPrice = ((caseBasePrice + pinsPrice) * quantity).toFixed(2);

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
    // Check if terms are agreed
    if (!agreedToTerms) {
      // Show error message only
      setShowTermsError(true);
      setPendingAddToCart(true);
      return;
    }
    
    // Clear any error message and proceed with adding to cart
    setShowTermsError(false);
    executeAddToCart();
  };

  // Execute the actual add to cart action
  const executeAddToCart = () => {
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
      customDesign: true,
      quantity: quantity
    };
    
    // Add to cart with quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
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
    <section className="min-h-screen py-0 sm:py-1 md:py-2 lg:py-4 relative bg-white overflow-hidden" style={{width: '100vw', maxWidth: '100vw', overflowX: 'hidden', overflowY: isMobile ? 'hidden' : 'auto', height: isMobile ? '100vh' : 'auto', maxHeight: isMobile ? '100vh' : 'none', scrollbarWidth: isMobile ? 'none' : 'auto', msOverflowStyle: isMobile ? 'none' : 'auto'}}>
      <div className={`lg:container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 relative z-10 ${isMobile ? 'pb-48 xs:pb-56 sm:pb-64' : 'pb-2 sm:pb-24'} ${isMobile ? 'min-h-screen' : 'h-screen md:h-auto'} flex flex-col ${isMobile ? 'overflow-hidden' : 'overflow-hidden'} ${isMobile ? 'pt-0' : 'pt-1 sm:pt-1.5 md:pt-2'}`} style={{width: '100%', maxWidth: '100%', overflowX: 'hidden', overflowY: isMobile ? 'hidden' : 'auto', height: isMobile ? '100vh' : 'auto', maxHeight: isMobile ? '100vh' : 'none', scrollbarWidth: isMobile ? 'none' : 'auto', msOverflowStyle: isMobile ? 'none' : 'auto'}}>
        {/* Close Button - Mobile only */}
        {isMobile && (
          <button
            onClick={() => navigate('/')}
            className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 z-50 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-white rounded-full hover:bg-gray-100 transition-colors shadow-md"
            aria-label="Close and go back to home"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        
        {/* Header Section - Fixed at top, never overlaps */}
        <div className={`text-center flex-shrink-0 ${isMobile ? 'mb-0 mt-1' : 'mb-1 sm:mb-1.5 md:mb-2 lg:mb-1 mt-2 sm:mt-3 md:mt-4'}`}>
          <h1 className={`text-lg sm:text-xl md:text-3xl font-light text-gray-900 ${isMobile ? 'mb-0 mt-4' : 'mb-0.5 sm:mb-0.5 md:mb-1 lg:mb-0.5'}`} 
              style={{fontFamily: "'Poppins', sans-serif", letterSpacing: '0.05em'}}>
            CREATE YOURS
          </h1>
          <div className={`w-12 sm:w-16 md:w-20 h-px bg-gray-300 mx-auto ${isMobile ? 'mb-0' : 'mb-0.5 sm:mb-1 md:mb-1.5 lg:mb-1'}`}></div>
          <p className="lg:block hidden text-sm text-gray-500 max-w-2xl mx-auto font-light mb-2" 
             style={{fontFamily: "'Poppins', sans-serif"}}>
            Design your perfect passport case with our interactive creator
          </p>
        </div>
        
        {/* MAIN SECTION - Canvas and Right Side */}
        <div className={`flex flex-col  lg:flex-row ${isMobile ? 'gap-0' : 'gap-1 sm:gap-1.5 md:gap-4 lg:gap-6'} flex-1 min-h-0 ${isMobile ? '-mt-1' : 'overflow-hidden mt-8'}`}>
          
          {/* LEFT - Design Canvas - Centered */}
          <div className={`w-full lg:w-1/2 flex flex-col  items-center lg:justify-start justify-center flex-1  ${isMobile ? 'overflow-x-hidden' : 'overflow-hidden'}`}>

            <div className="w-full max-w-[320px] xs:max-w-[380px] sm:max-w-[580px] md:max-w-[580px] lg:max-w-[800px] xl:max-w-[900px] 2xl:max-w-[1000px] flex flex-col sm:mt-0 overflow-x-hidden">
              <div className="flex-shrink-0 w-full overflow-x-hidden">
                <div className="w-full overflow-x-hidden" style={{aspectRatio: isMobile ? (window.innerWidth < 375 ? '1/1.1' : '1/1.2') : '1'}}>
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

              {/* Action Buttons - Under canvas on big screens */}
              {!isMobile && (
                <div className="w-full flex flex-row gap-2 flex-shrink-0 mt-4">
                  <ViewMoreImagesButton
                    caseImages={caseImages}
                    onOpenModal={() => {
                      setShowImageModal(true);
                      setSelectedModalImage(0);
                    }}
                  />
                  
                  <ItemDescriptionDropdown
                    selectedCase={selectedCase}
                    showDescriptionDropdown={showDescriptionDropdown}
                    setShowDescriptionDropdown={setShowDescriptionDropdown}
                  />
                </div>
              )}
              
            </div>
            
            {/* Save Your Design Button - Hidden for now */}
            {/* <SaveDesignButton saveImageFunction={saveImageFunction} /> */}
          </div>

          {/* Right Side - Charms Selection */}
          <div className="w-full lg:w-1/2 flex flex-col space-y-4 sm:space-y-6 order-1 lg:order-2">
            
            {/* Mobile Step Content Overlay */}
            {isMobile && (
              <MobileOverlay
                mobileCurrentStep={mobileCurrentStep}
                setMobileCurrentStep={setMobileCurrentStep}
                selectedCaseType={selectedCaseType}
                selectedColor={selectedColor}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                mobileSubCategory={mobileSubCategory}
                setMobileSubCategory={setMobileSubCategory}
                pins={pins}
                selectedPins={selectedPins}
                handleCaseTypeSelection={handleCaseTypeSelection}
                handleColorSelection={handleColorSelection}
                handlePinSelection={handlePinSelection}
                Products={Products}
              />
            )}
            {/* Passport Case Selection - Hidden on mobile */}
            <div className={`pb-6 border-b border-gray-100 flex-shrink-0 ${isMobile ? 'hidden' : ''}`}>
              <h3 className="text-xs uppercase tracking-wider text-gray-900 mb-4 font-medium" style={{fontFamily: "'Poppins', sans-serif"}}>
                1. Choose Case
              </h3>

              <CaseSelector
                selectedCaseType={selectedCaseType}
                onSelect={handleCaseTypeSelection}
                isCaseDropdownOpen={isCaseDropdownOpen}
                setIsCaseDropdownOpen={setIsCaseDropdownOpen}
                Products={Products}
              />
              
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

            {/* Charms Selection - Hidden on mobile */}
            <div className={`pb-6 border-b border-gray-100 ${isMobile ? 'hidden' : 'block'}`}>
              <h3 className="text-xs uppercase tracking-wider text-gray-900 mb-4 font-medium" style={{fontFamily: "'Poppins', sans-serif"}}>
                3. Choose Charms
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
            
            {/* Personalized Text - Hidden on mobile */}
            {!isMobile && (
              <CustomTextSection
                customText={customText}
                setCustomText={setCustomText}
                customTextError={customTextError}
                setCustomTextError={setCustomTextError}
                customTextAdded={customTextAdded}
                setCustomTextAdded={setCustomTextAdded}
              />
            )}

            {/* Price Summary - Hidden on mobile */}
            {!isMobile && (
              <PriceSummary
                totalPrice={totalPrice}
                caseBasePrice={caseBasePrice}
                groupedPinsList={groupedPinsList}
                showPriceBreakdown={showPriceBreakdown}
                setShowPriceBreakdown={setShowPriceBreakdown}
                quantity={quantity}
                setQuantity={setQuantity}
                selectedCase={selectedCase}
                selectedCaseType={selectedCaseType}
                selectedColor={selectedColor}
                selectedPins={selectedPins}
                selectedCaseImage={selectedCaseImage}
                pinsPrice={pinsPrice}
                onAddToCart={handleAddToCart}
                onShowTerms={() => setShowTermsModal(true)}
                agreedToTerms={agreedToTerms}
                setAgreedToTerms={(value) => {
                  setAgreedToTerms(value);
                  if (value) {
                    setShowTermsError(false);
                  }
                }}
                showTermsError={showTermsError}
              />
            )}
          </div>
        </div>

        {/* Fixed Bottom Section - Mobile only */}
        {isMobile && (
          <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg md:hidden">
            {/* Choose Options Section */}
            <div className="px-2 sm:px-3 pt-2 pb-1 border-b border-gray-100">
              <p className="text-[10px] xs:text-xs text-gray-600 mb-1 sm:mb-2 text-center font-thin" style={{fontFamily: "'Poppins', sans-serif"}}>
                Choose the options below:
              </p>
              <MobileStepButtons
                mobileCurrentStep={mobileCurrentStep}
                setMobileCurrentStep={setMobileCurrentStep}
                selectedCaseType={selectedCaseType}
                selectedColor={selectedColor}
                onOpenAddText={() => setShowAddTextModal(true)}
              />
            </div>
            
            {/* Price Summary and Add to Cart */}
            <div className="max-h-[40vh] overflow-y-auto">
              <div className="px-2 sm:px-3 py-2 sm:py-2.5">
                <PriceSummary
                  totalPrice={totalPrice}
                  caseBasePrice={caseBasePrice}
                  groupedPinsList={groupedPinsList}
                  showPriceBreakdown={showPriceBreakdown}
                  setShowPriceBreakdown={setShowPriceBreakdown}
                  quantity={quantity}
                  setQuantity={setQuantity}
                  selectedCase={selectedCase}
                  selectedCaseType={selectedCaseType}
                  selectedColor={selectedColor}
                  selectedPins={selectedPins}
                  selectedCaseImage={selectedCaseImage}
                  pinsPrice={pinsPrice}
                  onAddToCart={handleAddToCart}
                  onShowTerms={() => setShowTermsModal(true)}
                  agreedToTerms={agreedToTerms}
                  setAgreedToTerms={(value) => {
                    setAgreedToTerms(value);
                    if (value) {
                      setShowTermsError(false);
                    }
                  }}
                  showTermsError={showTermsError}
                  isMobile={true}
                />
              </div>
            </div>
          </div>
        )}

        {/* Image Modal */}
        <ImageModal
          show={showImageModal}
          selectedCase={selectedCase}
          selectedColorData={selectedColorData}
          caseImages={caseImages}
          selectedModalImage={selectedModalImage}
          setSelectedModalImage={setSelectedModalImage}
          onClose={() => setShowImageModal(false)}
        />

        {/* Terms of Use Modal */}
        <TermsOfUseModal
          show={showTermsModal}
          onClose={() => {
            setShowTermsModal(false);
            setPendingAddToCart(false);
          }}
          onAgree={() => {
            setAgreedToTerms(true);
            setShowTermsError(false);
            setShowTermsModal(false);
            // If there was a pending add to cart, execute it
            if (pendingAddToCart) {
              setPendingAddToCart(false);
              executeAddToCart();
            }
          }}
        />

        {/* Add Text Modal - Mobile only */}
        {isMobile && (
          <AddTextModal
            show={showAddTextModal}
            onClose={() => setShowAddTextModal(false)}
            customText={customText}
            setCustomText={setCustomText}
            customTextError={customTextError}
            setCustomTextError={setCustomTextError}
            customTextAdded={customTextAdded}
            setCustomTextAdded={setCustomTextAdded}
          />
        )}
      </div>
    </section>
  );
};

export default CreateYours;