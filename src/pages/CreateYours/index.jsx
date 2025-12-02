import React, { useEffect, useState, useCallback, useRef } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";

import Canvas from "../../component/Canvas/index.jsx";
import ColorSelector from "../../component/ColorSelector/index.jsx";
import PinSelector from "../../component/PinSelector";
import Products from "../../data/products.json";
import { useCart } from "../../context/CartContext";

// Components
import MobileStepButtons from "./components/MobileStepButtons";
import ViewMoreImagesButton from "./components/ViewMoreImagesButton";
import ItemDescriptionDropdown from "./components/ItemDescriptionDropdown";
import ImageModal from "../../component/ImageModal";
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
  const [isCharmsDropdownOpen, setIsCharmsDropdownOpen] = useState(false);
  const [isAddTextDropdownOpen, setIsAddTextDropdownOpen] = useState(false);
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
    
    // Extract the filename from the color image path to match SmartCase images
    let imageBaseName = '';
    if (colorImage) {
      const imagePath = colorImage.split('/').pop(); // Get filename
      // For economy case, images are like "economycasepink.png"
      // Extract the color part (e.g., "pink", "red", etc.)
      if (imagePath.includes('economycase')) {
        imageBaseName = imagePath.replace('economycase', '').replace('.png', '');
      }
    }
    
    // Build images array from SmartCase folder
    const smartCaseImages = [];
    
    // Add the main color image
    if (colorImage) {
      smartCaseImages.push(colorImage);
    }
    
    // Add detail images from SmartCase folder
    // These are common detail images that apply to all colors
    const detailImages = [
      '/TheHappyCase/images/SmartCase/economycaseinside.jpg',
      '/TheHappyCase/images/SmartCase/economycaseclosure.jpg',
      '/TheHappyCase/images/SmartCase/economycaseclosureinside.jpg'
    ];
    
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
    <section className={`w-full py-1 md:py-12 bg-white ${isMobile ? 'h-screen fixed inset-0 overflow-hidden' : 'min-h-screen'}`}>
      <div className={`lg:container mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 relative z-10 mt-4 ${isMobile ? 'pb-40 xs:pb-44 sm:pb-48 h-full flex flex-col overflow-hidden' : 'pb-2 sm:pb-24 flex flex-col'}`}>
        {/* Close Button - Mobile only */}
        {isMobile && (
          <button
            onClick={() => navigate('/')}
            className="absolute top-2 xs:top-3 right-2 xs:right-3 sm:right-4 z-50 w-7 h-7 xs:w-8 xs:h-8 flex items-center justify-center transition-colors"
            aria-label="Close and go back to home"
          >
            <svg className="w-12 h-12 xs:w-5 xs:h-5 mt-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        
        {/* Header Section - Fixed at top, never overlaps */}
        <div className="text-center mb-1 xs:mb-1.5 sm:mb-2 md:mb-6 flex-shrink-0">
          <h1 className="text-title text-gray-900 tracking-title mt-2 xs:mt-3 sm:mt-4 md:mt-0">
            CREATE YOURS
          </h1>
          <div className="w-12 xs:w-14 sm:w-16 h-px bg-gray-300 mx-auto mb-1 xs:mb-1.5 md:mb-4"></div>
          <p className="lg:block hidden text-sm text-gray-500 max-w-2xl mx-auto font-light" 
             style={{fontFamily: "'Poppins', sans-serif"}}>
            Design your perfect passport case with our interactive creator
          </p>
        </div>
        
        {/* MAIN SECTION - Canvas and Right Side */}
        <div className="flex flex-col lg:flex-row gap-2 xs:gap-3 sm:gap-4 md:gap-6 lg:gap-12 flex-1 overflow-hidden">
          
          {/* LEFT - Design Canvas - Centered */}
          <div className="w-full lg:w-1/2 flex flex-col items-start xs:items-center xs:justify-center flex-1 overflow-hidden px-2 xs:px-3 sm:px-4 md:px-0 py-0 xs:py-2 sm:py-3 md:py-0">

            <div className="w-full flex flex-col items-center">
              <div className="flex-shrink-0 w-[400px] h-[400px] relative mt-0 sm:mt-auto lg:mt-4" style={{isolation: 'isolate'}}>
                {/* Background Case Image - Always behind canvas */}
                {selectedCaseImage && (
                  <div 
                    className="absolute inset-0 w-full h-full bg-contain bg-no-repeat"
                    style={{
                      backgroundImage: `url(${selectedCaseImage})`,
                      zIndex: 0,
                      pointerEvents: 'none',
                      backgroundSize: '260px',
                      backgroundPosition: 'center 45%',
                    }}
                    key={`case-bg-${selectedCaseType}-${selectedColor}`}
                  />
                )}
                {/* Canvas Overlay - Always on top */}
                <div className="w-full h-full absolute inset-0 " style={{zIndex: 10, pointerEvents: 'auto', width: '350px', height: '400px'}}>
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
              
              {/* Action Buttons - Bottom - Hidden on mobile */}
              <div className="mt-4 mb-4 hidden md:flex flex-row gap-2 xs:gap-2.5 sm:gap-3 flex-shrink-0 w-full max-w-full xs:max-w-[calc(100vw-2rem)] sm:max-w-[400px] lg:max-w-[480px]">
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
            <div className={`pb-6 border-b border-gray-100 flex-shrink-0 mt-6 overflow-visible ${isMobile ? 'hidden' : ''}`}>
              <button
                onClick={() => setIsCaseDropdownOpen(!isCaseDropdownOpen)}
                className="w-full flex items-center justify-between mb-4"
              >
                <h3 className="text-xs uppercase tracking-wider text-gray-900 font-medium" style={{fontFamily: "'Poppins', sans-serif"}}>
                  1. Choose Case
                </h3>
                <svg 
                  className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isCaseDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isCaseDropdownOpen && (
                <div className="space-y-6 overflow-visible">
                  <CaseSelector
                    selectedCaseType={selectedCaseType}
                    onSelect={handleCaseTypeSelection}
                    Products={Products}
                    isCaseDropdownOpen={isCaseDropdownOpen}
                    setIsCaseDropdownOpen={setIsCaseDropdownOpen}
                  />
                  
                  {selectedColor && (
                    <div className="mt-10 overflow-visible">
                      <ColorSelector
                        colors={selectedCase?.colors || []}
                        selectedColor={selectedColor}
                        onSelect={handleColorSelection}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Charms Selection - Hidden on mobile */}
            <div className={`pb-6 border-b border-gray-100 mt-6 ${isMobile ? 'hidden' : 'block'}`}>
              <button
                onClick={() => setIsCharmsDropdownOpen(!isCharmsDropdownOpen)}
                className="w-full flex items-center justify-between mb-4"
              >
                <h3 className="text-xs uppercase tracking-wider text-gray-900 font-medium" style={{fontFamily: "'Poppins', sans-serif"}}>
                  3. Choose Charms
                </h3>
                <svg 
                  className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isCharmsDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isCharmsDropdownOpen && (
                <div className="relative z-10">
                  <PinSelector
                    pins={pins}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    selectedPins={selectedPins}
                    onSelect={handlePinSelection}
                    Products={Products}
                  />
                </div>
              )}
            </div>
            
            {/* Personalized Text - Hidden on mobile */}
            {!isMobile && (
              <div className="pb-6 border-b border-gray-100 mt-6">
                <button
                  onClick={() => setIsAddTextDropdownOpen(!isAddTextDropdownOpen)}
                  className="w-full flex items-center justify-between mb-4"
                >
                  <h3 className="text-xs uppercase tracking-wider text-gray-900 font-medium" style={{fontFamily: "'Poppins', sans-serif"}}>
                    4. Add Text
                  </h3>
                  <svg 
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isAddTextDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isAddTextDropdownOpen && (
                  <CustomTextSection
                    customText={customText}
                    setCustomText={setCustomText}
                    customTextError={customTextError}
                    setCustomTextError={setCustomTextError}
                    customTextAdded={customTextAdded}
                    setCustomTextAdded={setCustomTextAdded}
                  />
                )}
              </div>
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

        {/* Fixed Mobile Step Buttons - Above Price Summary */}
        {isMobile && (
          <div className="fixed left-0 right-0 z-0 bg-white md:hidden w-full" style={{bottom: '120px'}}>
            <div className="px-2 xs:px-3 sm:px-4 py-2 xs:py-2.5 sm:py-3 mb-0 pb-0">
              <p className="text-[9px] xs:text-[10px] sm:text-[11px] text-gray-400 mb-2 xs:mb-2.5 text-center" style={{fontFamily: "'Poppins', sans-serif"}}>
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
          </div>
        )}

        {/* Fixed Price Summary - Mobile only */}
        {isMobile && (
          <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg md:hidden max-h-[50vh] xs:max-h-[45vh] overflow-y-auto w-full safe-area-inset-bottom" style={{paddingBottom: 'env(safe-area-inset-bottom)'}}>
            <div className="px-2 xs:px-2.5 sm:px-3 py-1.5 xs:py-2 sm:py-2.5">
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