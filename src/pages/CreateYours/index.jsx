import React, { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";

// Components
import Canvas from "../../component/Canvas/index.jsx";
import ColorSelector from "../../component/ColorSelector/index.jsx";
import PinSelector from "../../component/PinSelector";
import ImageModal from "../../component/ImageModal";
import ViewMoreImagesButton from "./components/ViewMoreImagesButton";
import ItemDescriptionDropdown from "./components/ItemDescriptionDropdown";
import CustomTextSection from "./components/CustomTextSection";
import PriceSummary from "./components/PriceSummary";
import CaseSelector from "./components/CaseSelector";
import TermsOfUseModal from "./components/TermsOfUseModal";
import MobileOverlay from "./components/MobileOverlay";
import MobileStepButtons from "./components/MobileStepButtons";

// Data & Context
import Products from "../../data/products.json";
import { useCart } from "../../context/CartContext";
import { CUSTOM_TEXT_COLOR, CUSTOM_TEXT_SIZE, MAX_TEXT_LENGTH } from "../../data/constants.js";

const CreateYours = () => {
  // ==========================================
  // HOOKS & ROUTING
  // ==========================================
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // ==========================================
  // STATE - Case & Color Selection
  // ==========================================
  const getDefaultCaseAndColor = () => {
    const caseParam = searchParams.get('case');
    const colorParam = searchParams.get('color');
    
    if (caseParam) {
      const caseFromParam = Products.cases.find(c => c.type === caseParam);
      if (caseFromParam) {
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
        if (caseFromParam.colors && caseFromParam.colors.length > 0) {
          return {
            caseType: caseFromParam.type,
            color: caseFromParam.colors[0].color,
            image: caseFromParam.colors[0].image
          };
        }
      }
    }
    
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

  // ==========================================
  // STATE - Pins & Customization
  // ==========================================
  const [selectedPins, setSelectedPins] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [pins, setPins] = useState([]);
  const [mobileSubCategory, setMobileSubCategory] = useState('all');
  const [hasTextAdded, setHasTextAdded] = useState(false);

  // ==========================================
  // STATE - Mobile UI
  // ==========================================
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileCurrentStep, setMobileCurrentStep] = useState(null);
  const [mobileCustomText, setMobileCustomText] = useState('');
  const [mobileTextError, setMobileTextError] = useState('');

  // ==========================================
  // STATE - Desktop UI
  // ==========================================
  const [openSteps, setOpenSteps] = useState({
    step1: true,
    step2: false,
    step3: false
  });
  const [closePinSelectorDropdown, setClosePinSelectorDropdown] = useState(0);

  // ==========================================
  // STATE - Modals & UI
  // ==========================================
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedModalImage, setSelectedModalImage] = useState(0);
  const [showDescriptionDropdown, setShowDescriptionDropdown] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showTermsError, setShowTermsError] = useState(false);
  const [pendingAddToCart, setPendingAddToCart] = useState(false);

  // ==========================================
  // STATE - Cart & Pricing
  // ==========================================
  const [quantity, setQuantity] = useState(1);
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);

  // ==========================================
  // REFS
  // ==========================================
  const textAddedRef = useRef(false);
  const lastTextRef = useRef(null);

  // ==========================================
  // HELPER FUNCTIONS
  // ==========================================
  const getProductsWithQuantities = () => {
    const savedQuantities = localStorage.getItem('productQuantities');
    if (!savedQuantities) return Products;
    
    try {
      const quantities = JSON.parse(savedQuantities);
      const mergedProducts = { ...Products };
      
      if (quantities.cases) {
        mergedProducts.cases = mergedProducts.cases.map((caseItem, index) => {
          const updatedCase = {
            ...caseItem,
            quantity: quantities.cases[index] !== undefined ? quantities.cases[index] : caseItem.quantity
          };
          
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
      
      return mergedProducts;
    } catch (error) {
      console.error('Error loading saved quantities:', error);
      return Products;
    }
  };

  const getCaseImages = () => {
  const selectedCase = productsWithQuantities.cases.find(c => c.type === selectedCaseType);
  const selectedColorData = selectedCase?.colors?.find(c => c.color === selectedColor);
    const colorImage = selectedColorData?.image || selectedCase?.images?.[0] || '';
    
    const smartCaseImages = [];
    if (colorImage) {
      smartCaseImages.push(colorImage);
    }
    
    let detailImages = [];
    if (selectedCaseType === 'economy') {
      detailImages = [
      '/TheHappyCase/images/SmartCase/economycaseinside.jpg',
      '/TheHappyCase/images/SmartCase/economycaseclosure.jpg',
      '/TheHappyCase/images/SmartCase/economycaseclosureinside.jpg'
    ];
    } else if (selectedCaseType === 'business') {
      detailImages = ['/TheHappyCase/images/BusinessClassCase/businessclass.png'];
    } else if (selectedCaseType === 'firstclass') {
      detailImages = ['/TheHappyCase/images/FirstClassCase/firstclass.jpg'];
    }
    
    detailImages.forEach(img => {
      if (img) {
        smartCaseImages.push(img);
      }
    });
    
    return smartCaseImages.length > 0 ? smartCaseImages : (colorImage ? [colorImage] : []);
  };
  
  // ==========================================
  // COMPUTED VALUES
  // ==========================================
  const productsWithQuantities = useMemo(() => getProductsWithQuantities(), []);
  const selectedCase = productsWithQuantities.cases.find(c => c.type === selectedCaseType);
  const selectedColorData = selectedCase?.colors?.find(c => c.color === selectedColor);
  const caseImages = getCaseImages();
  const caseBasePrice = selectedCase?.basePrice || 0;
  const pinsPrice = selectedPins.reduce((total, { pin }) => total + (pin?.price || 0), 0);
  const totalPrice = ((caseBasePrice + pinsPrice) * quantity).toFixed(2);

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

  // ==========================================
  // EVENT HANDLERS - Case & Color
  // ==========================================
  const handleCaseTypeSelection = (caseType) => {
    setSelectedCaseType(caseType);
    const selectedCase = Products.cases.find(c => c.type === caseType);
    if (selectedCase && selectedCase.colors.length > 0) {
      const firstColor = selectedCase.colors[0];
      setSelectedColor(firstColor.color);
      setSelectedCaseImage(firstColor.image);
    }
    if (isMobile) {
      setMobileCurrentStep(null);
    }
    if (typeof window !== 'undefined' && window.closeCanvasControls) {
      window.closeCanvasControls();
    }
  };

  const handleColorSelection = (color, image) => {
    setSelectedColor(color);
    setSelectedCaseImage(image);
    if (isMobile) {
      setMobileCurrentStep(null);
    }
    if (typeof window !== 'undefined' && window.closeCanvasControls) {
      window.closeCanvasControls();
    }
  };

  // ==========================================
  // EVENT HANDLERS - Pins
  // ==========================================
  const handlePinSelect = useCallback((imgInstance) => {
    if (imgInstance && imgInstance.pinData) {
      setSelectedPins(prev => [...prev, { imgInstance, pin: imgInstance.pinData }]);
    }
  }, []);

  const handlePinRemove = useCallback((removedPin) => {
    setSelectedPins(prev => prev.filter(p => p.imgInstance !== removedPin));
  }, []);

  const handlePinSelection = useCallback((pin) => {
    if (window.addPinToCanvas) {
      window.addPinToCanvas(pin);
    }
    if (isMobile) {
      setMobileCurrentStep(null);
    }
    setTimeout(() => {
      const canvasElement = document.querySelector('.happy-card');
      if (canvasElement) {
        canvasElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
    }, 100);
  }, [isMobile]);

  // ==========================================
  // EVENT HANDLERS - Cart
  // ==========================================
  const executeAddToCart = () => {
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
      pinsDetails: selectedPins.map(({ pin }) => pin),
      basePrice: caseBasePrice,
      casePrice: caseBasePrice,
      pinsPrice: pinsPrice,
      totalPrice: parseFloat(totalPrice),
      price: parseFloat(totalPrice),
      image: selectedCaseImage,
      caseImage: selectedCaseImage,
      designImage,
      customDesign: true,
      quantity: quantity
    };
    
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const handleAddToCart = () => {
    if (!agreedToTerms) {
      setShowTermsError(true);
      setPendingAddToCart(true);
      return;
    }
    setShowTermsError(false);
    executeAddToCart();
  };

  // ==========================================
  // EVENT HANDLERS - UI
  // ==========================================
  const toggleStep = (step) => {
    setOpenSteps(prev => {
      const newState = !prev[step];
      if (newState) {
        return {
          step1: step === 'step1',
          step2: step === 'step2',
          step3: step === 'step3'
        };
      } else {
        return {
          ...prev,
          [step]: false
        };
      }
    });
    setClosePinSelectorDropdown(prev => prev + 1);
  };

  const handleTextAdded = useCallback(() => {
    setHasTextAdded(true);
    setOpenSteps(prev => ({ ...prev, step3: false }));
  }, []);

  const handleSaveImageFunction = useCallback(() => {
    // Canvas save function handler
  }, []);

  // ==========================================
  // EFFECTS - URL Params & Navigation
  // ==========================================
  useEffect(() => {
    const caseParam = searchParams.get('case');
    const colorParam = searchParams.get('color');
    
    if (caseParam) {
      const caseFromParam = Products.cases.find(c => c.type === caseParam);
      if (caseFromParam) {
        setSelectedCaseType(caseFromParam.type);
        
        if (colorParam) {
          const colorData = caseFromParam.colors.find(c => c.color === colorParam);
          if (colorData) {
            setSelectedColor(colorData.color);
            setSelectedCaseImage(colorData.image);
            return;
          }
        }
        
        if (caseFromParam.colors && caseFromParam.colors.length > 0) {
          const firstColor = caseFromParam.colors[0];
          setSelectedColor(firstColor.color);
          setSelectedCaseImage(firstColor.image);
        }
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (location.state?.selectedPin) {
      const selectedPin = location.state.selectedPin;
      setTimeout(() => {
        if (window.addPinToCanvas) {
          window.addPinToCanvas(selectedPin);
        }
      }, 1000);
      window.history.replaceState({}, document.title);
    }
    
    if (location.state?.addText && location.state?.text) {
      const textToAdd = location.state.text;
      
      if (textAddedRef.current && lastTextRef.current === textToAdd) {
        window.history.replaceState({}, document.title);
        return;
      }
      
      textAddedRef.current = true;
      lastTextRef.current = textToAdd;
      window.history.replaceState({}, document.title);
      
      setTimeout(() => {
        if (window.addTextToCanvas) {
          window.addTextToCanvas(textToAdd, {
            fill: CUSTOM_TEXT_COLOR,
            fontSize: CUSTOM_TEXT_SIZE,
          });
          if (window.saveCanvasState) {
            setTimeout(() => {
              window.saveCanvasState();
            }, 500);
          }
        }
        setTimeout(() => {
          textAddedRef.current = false;
          lastTextRef.current = null;
        }, 2000);
      }, 1500);
    } else {
      if (!location.state?.addText) {
        textAddedRef.current = false;
        lastTextRef.current = null;
      }
    }
  }, [location.state]);

  // ==========================================
  // EFFECTS - Case Type & Color Updates
  // ==========================================
  useEffect(() => {
    if (Products.cases.length > 0) {
      const defaultCase = Products.cases.find(c => c.type === selectedCaseType) || Products.cases[0];
      if (defaultCase && defaultCase.colors.length > 0) {
        const defaultColor = defaultCase.colors[0];
        setSelectedColor(defaultColor.color);
        setSelectedCaseImage(defaultColor.image);
      }
    }
  }, [selectedCaseType]);

  // ==========================================
  // EFFECTS - Pins & Categories
  // ==========================================
  useEffect(() => {
    if (selectedCategory) {
      setMobileSubCategory('all');
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedCategory) {
      if (selectedCategory === 'flags') {
        const flagPins = productsWithQuantities.pins.flags || [];
        setPins(flagPins);
      } else {
        setPins(productsWithQuantities.pins[selectedCategory] || []);
      }
    }
  }, [selectedCategory, productsWithQuantities]);

  // ==========================================
  // EFFECTS - Mobile UI
  // ==========================================
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  return (
    <section
      className={`create-yours-page relative`}
    >
      {/* Text Input Modal - Mobile only */}
      {isMobile && mobileCurrentStep === 'text' && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4">
          <div 
            className="bg-white rounded-lg shadow-lg flex flex-col w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center px-4 py-3 flex-shrink-0">
              <h2 className="text-sm uppercase tracking-wider text-gray-900 font-light font-inter">
                Add Text
              </h2>
              <button
                onClick={() => {
                  setMobileCurrentStep(null);
                  setMobileCustomText('');
                  setMobileTextError('');
                }}
                className="p-1.5 hover:bg-gray-50 rounded transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              <div>
                <input
                  type="text"
                  value={mobileCustomText}
                  onChange={(e) => {
                    setMobileCustomText(e.target.value);
                    setMobileTextError('');
                  }}
                  placeholder="e.g. Your name"
                  className="w-full px-3 py-2 rounded-sm focus:outline-none focus:border-gray-400 bg-white text-gray-900 placeholder-gray-400 font-thin text-sm font-inter"
                  style={{ fontSize: '16px' }}
                  maxLength={MAX_TEXT_LENGTH}
                  autoFocus
                />
                {mobileTextError && (
                  <div className="text-xs text-red-600 border border-red-200 bg-red-50 px-3 py-2 rounded mt-2">
                    {mobileTextError}
                  </div>
                )}
              </div>
              
              <div className="flex flex-row gap-2">
                <button
                  onClick={() => {
                    if (!mobileCustomText.trim()) {
                      setMobileTextError('Please enter the text you want to add.');
                      return;
                    }
                    const addTextWithRetry = (attempt = 0) => {
                      const maxAttempts = 5;
                      const delay = 200 * (attempt + 1); // Increasing delay: 200ms, 400ms, 600ms, 800ms, 1000ms
                      
                      // Debug log
                      console.log('Mobile: Attempting to add text', {
                        attempt,
                        addTextToCanvasExists: typeof window !== 'undefined' && !!window.addTextToCanvas,
                        isFunction: typeof window !== 'undefined' && typeof window.addTextToCanvas === 'function'
                      });
                      
                      if (typeof window !== 'undefined' && window.addTextToCanvas && typeof window.addTextToCanvas === 'function') {
                        try {
                      window.addTextToCanvas(mobileCustomText.trim(), {
                        fill: CUSTOM_TEXT_COLOR,
                        fontSize: CUSTOM_TEXT_SIZE,
                      });
                      setMobileCustomText('');
                      setMobileTextError('');
                      setMobileCurrentStep(null);
                        } catch (error) {
                          console.error('Error adding text:', error);
                          setMobileTextError('Error adding text. Please try again.');
                        }
                      } else if (attempt < maxAttempts) {
                        setTimeout(() => addTextWithRetry(attempt + 1), delay);
                    } else {
                        console.error('Mobile: Failed to add text after', maxAttempts, 'attempts');
                      setMobileTextError('Canvas is still loading. Please try again in a moment.');
                    }
                    };
                    
                    addTextWithRetry();
                  }}
                  className="flex-1 px-4 py-3 text-sm font-medium uppercase tracking-wider rounded shadow-md font-inter bg-btn-primary hover:bg-btn-primary-hover text-btn-primary-text border border-btn-primary-border hover:border-btn-primary-hover transition-all duration-200"
                >
                  Add Text
                </button>
                <button
                  onClick={() => {
                    setMobileCustomText('');
                    setMobileTextError('');
                  }}
                  className="px-4 py-3 text-sm font-medium uppercase tracking-wider text-gray-700 hover:text-gray-900 bg-white border-2 border-gray-300 hover:border-gray-400 transition-colors rounded shadow-sm font-inter"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Always render Canvas (hidden when text modal is open on mobile) */}
      <div className={`${isMobile && mobileCurrentStep === 'text' ? 'hidden' : ''} ${isMobile ? '' : 'container mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8'} relative z-10`}>
        {/* Mobile Layout */}
        {isMobile ? (
            <div className="flex flex-col h-screen overflow-hidden">
              {/* Close Button - Mobile only */}
              <button
                onClick={() => navigate('/')}
                className="fixed top-4 right-4 z-50 w-10 h-10 flex items-center justify-center"
                aria-label="Close and go back to home"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Header Section - Compact on mobile */}
              <div className="flex-shrink-0 text-center pt-12 pb-2 px-4">
                <h1 className="text-title font-light text-gray-900 mb-1 tracking-title">
                  CREATE YOURS
                </h1>
                <div className="w-20 h-px bg-gray-200 mx-auto"></div>
              </div>
              
              {/* Canvas Section - Prominent on mobile */}
              <div className="flex-1 flex items-center justify-center min-h-0 overflow-hidden z-50">
                <div className="w-full max-w-[240px] flex items-center justify-center" style={{touchAction: 'none'}}>
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
              
              {/* Buttons Section */}
              <div className="flex-shrink-0 bg-white px-4 py-3">
                <MobileStepButtons
                  mobileCurrentStep={mobileCurrentStep}
                  setMobileCurrentStep={setMobileCurrentStep}
                  selectedCaseType={selectedCaseType}
                  selectedColor={selectedColor}
                />
                
                {/* Mobile Step Content Overlay */}
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
                  Products={productsWithQuantities}
                />
              </div>
              
              {/* Add to Cart Area - At bottom */}
              <div className="flex-shrink-0 bg-white border-t border-gray-200 shadow-lg">
                <div className="px-3 sm:px-4 py-3 sm:py-4">
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
          ) : (
            /* Desktop Layout */
            <>
              {/* Header Section */}
              <div className="text-center mb-4 sm:mb-6 md:mb-8">
                <h1 className="text-title sm:text-title-lg font-light text-gray-900 mb-2 sm:mb-3 font-inter tracking-title">
                  CREATE YOURS
                </h1>
                <div className="w-20 sm:w-24 h-px bg-gray-200 mx-auto mb-2 sm:mb-3"></div>
                <p className="text-sm sm:text-body-sm text-gray-400 max-w-xl mx-auto px-4 sm:px-0 font-light font-inter">
                  Design your perfect passport case
                </p>
              </div>
              
              {/* MAIN SECTION - Canvas and Right Side */}
              <div className="flex flex-col md:flex-row md:gap-6 lg:gap-8 xl:gap-12">
                
                {/* LEFT - Design Canvas */}
                <div className="w-full md:w-1/2 flex flex-col items-center md:justify-start mb-6 md:mb-0">
                  <div className="w-full max-w-md sm:max-w-lg flex flex-col items-center">
                    <div className="w-full overflow-hidden" style={{touchAction: 'auto'}}>
                      <Canvas
                        selectedCaseType={selectedCaseType}
                        selectedColor={selectedColor}
                        onPinSelect={handlePinSelect}
                        onPinRemove={handlePinRemove}
                        onSaveImage={handleSaveImageFunction}
                        products={Products}
                      />
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="w-full flex flex-row gap-2 sm:gap-3 mt-4 sm:mt-6">
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
                </div>

                {/* Right Side - Steps Section */}
                <div className="w-full md:w-1/2 flex flex-col">
              
                  {/* Desktop Steps Section - Dropdown Style */}
                  <div className="w-full space-y-2 sm:space-y-3">
                {/* Step 1: Case & Color */}
                    <div className="rounded-sm border border-gray-100 sm:border-0">
                  <button
                    onClick={() => toggleStep('step1')}
                        className="w-full flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-gray-50 transition-colors font-inter"
                  >
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-[10px] sm:text-xs font-medium flex-shrink-0">
                        1
                      </div>
                          <h3 className="text-xs sm:text-caption uppercase tracking-wider text-gray-900 font-medium">
                        Choose Case & Color
              </h3>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                          className={`h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 transition-transform duration-200 ${openSteps.step1 ? 'rotate-180' : ''}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  {openSteps.step1 && (
                        <div className="px-3 sm:px-4 pb-3 sm:pb-4 pt-2 space-y-4 sm:space-y-6 border-t border-gray-100">
              <CaseSelector
                selectedCaseType={selectedCaseType}
                onSelect={handleCaseTypeSelection}
                Products={productsWithQuantities}
                onDropdownToggle={() => setClosePinSelectorDropdown(prev => prev + 1)}
              />
              
              {selectedColor && (
                  <ColorSelector
                    colors={selectedCase?.colors || []}
                    selectedColor={selectedColor}
                    onSelect={handleColorSelection}
                  />
                      )}
                </div>
              )}
            </div>

                {/* Step 2: Charms */}
                    <div className="rounded-sm border border-gray-100 sm:border-0">
                  <button
                    onClick={() => toggleStep('step2')}
                        className="w-full flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-gray-50 transition-colors font-inter"
                  >
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-medium flex-shrink-0 ${selectedPins.length > 0 ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-400'}`}>
                        2
                      </div>
                          <h3 className="text-xs sm:text-caption uppercase tracking-wider text-gray-900 font-medium">
                        Add Charms
                        {selectedPins.length > 0 && (
                              <span className="ml-1 sm:ml-2 text-gray-400 font-normal normal-case text-[10px] sm:text-xs">({selectedPins.length} selected)</span>
                        )}
              </h3>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                          className={`h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 transition-transform duration-200 ${openSteps.step2 ? 'rotate-180' : ''}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  {openSteps.step2 && (
                        <div className="px-3 sm:px-4 pb-3 sm:pb-4 pt-2 border-t border-gray-100">
                <PinSelector
                  pins={pins}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedPins={selectedPins}
                  onSelect={handlePinSelection}
                  onRemove={handlePinRemove}
                            onDropdownToggle={() => setClosePinSelectorDropdown(prev => prev + 1)}
                  closeOtherDropdowns={closePinSelectorDropdown}
                  Products={productsWithQuantities}
                />
              </div>
                  )}
            </div>
            
                {/* Step 3: Text */}
                    <div className="rounded-sm border border-gray-100 sm:border-0">
                  <button
                    onClick={() => toggleStep('step3')}
                        className="w-full flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-gray-50 transition-colors font-inter"
                  >
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-medium flex-shrink-0 ${
                        hasTextAdded 
                          ? 'bg-gray-900 text-white' 
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        3
                      </div>
                          <h3 className="text-xs sm:text-caption uppercase tracking-wider text-gray-900 font-medium">
                        Add Text
                            <span className="ml-1 sm:ml-2 text-gray-400 font-normal normal-case text-[10px] sm:text-xs">(optional)</span>
                      </h3>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                          className={`h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 transition-transform duration-200 ${openSteps.step3 ? 'rotate-180' : ''}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  {openSteps.step3 && (
                        <div className="px-3 sm:px-4 pb-3 sm:pb-4 pt-2 border-t border-gray-100">
                      <CustomTextSection onTextAdded={handleTextAdded} />
                    </div>
                  )}
                </div>
                  </div>

                  {/* Step 4: Review & Add to Cart - Always visible, not a dropdown */}
                  <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200">
                    <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                      <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-medium flex-shrink-0 ${
                    agreedToTerms 
                      ? 'bg-gray-900 text-white' 
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    4
                  </div>
                      <h3 className="text-xs sm:text-caption uppercase tracking-wider text-gray-900 font-medium font-inter">
                    Review & Add to Cart
                  </h3>
                </div>
                
                <div className="pl-9">
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
                </div>
              </div>
                </div>
              </div>
            </>
          )}
        </div>
        
      {/* Modals */}
        <ImageModal
          show={showImageModal}
          selectedCase={selectedCase}
          selectedColorData={selectedColorData}
          caseImages={caseImages}
          selectedModalImage={selectedModalImage}
          setSelectedModalImage={setSelectedModalImage}
          onClose={() => setShowImageModal(false)}
        />

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
            if (pendingAddToCart) {
              setPendingAddToCart(false);
              executeAddToCart();
            }
          }}
        />
    </section>
  );
};

export default CreateYours;
