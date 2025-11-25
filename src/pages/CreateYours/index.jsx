import React, { useEffect, useState, useCallback, useRef, useMemo } from "react";
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
import { CUSTOM_TEXT_COLOR, CUSTOM_TEXT_SIZE, MAX_TEXT_LENGTH } from "../../data/constants.js";


const CreateYours = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [pins, setPins] = useState([]);
  const [mobileSubCategory, setMobileSubCategory] = useState('all');
  const textAddedRef = useRef(false);
  const lastTextRef = useRef(null);
  const [mobileCustomText, setMobileCustomText] = useState('');
  const [mobileTextError, setMobileTextError] = useState('');
  
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
  const [closePinSelectorDropdown, setClosePinSelectorDropdown] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileCurrentStep, setMobileCurrentStep] = useState(null); // null = showing passport case, 'case' = case selection, 'color' = color selection, 'charms' = charms selection
  const [quantity, setQuantity] = useState(1);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedModalImage, setSelectedModalImage] = useState(0);
  const [showDescriptionDropdown, setShowDescriptionDropdown] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [pendingAddToCart, setPendingAddToCart] = useState(false);
  const [showTermsError, setShowTermsError] = useState(false);
  const [hasTextAdded, setHasTextAdded] = useState(false);
  const caseDropdownRef = useRef(null);
  const { addToCart } = useCart();
  
  // Desktop step dropdown states
  const [openSteps, setOpenSteps] = useState({
    step1: true, // Case & Color - open by default
    step2: false, // Charms
    step3: false // Text
    // Step 4 (Review & Add to Cart) is always visible, not a dropdown
  });
  
  const toggleStep = (step) => {
    setOpenSteps(prev => {
      const newState = !prev[step];
      // If opening this step, close all other steps
      if (newState) {
        return {
          step1: step === 'step1',
          step2: step === 'step2',
          step3: step === 'step3'
        };
      } else {
        // If closing, just toggle this step
        return {
          ...prev,
          [step]: false
        };
      }
    });
    // Also close any open dropdowns when toggling steps
    setIsCaseDropdownOpen(false);
    setClosePinSelectorDropdown(prev => prev + 1);
  };

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
    // Close canvas controls if open
    if (typeof window !== 'undefined' && window.closeCanvasControls) {
      window.closeCanvasControls();
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
    // Close canvas controls if open
    if (typeof window !== 'undefined' && window.closeCanvasControls) {
      window.closeCanvasControls();
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
    
    // Handle text addition from AddText page
    if (location.state?.addText && location.state?.text) {
      const textToAdd = location.state.text;
      
      // Prevent duplicate additions - check if this is the same text we just added
      if (textAddedRef.current && lastTextRef.current === textToAdd) {
        // Already added this text, skip and clear state
        window.history.replaceState({}, document.title);
        return;
      }
      
      // Mark as processing immediately to prevent duplicate calls
      textAddedRef.current = true;
      lastTextRef.current = textToAdd;
      
      // Clear the navigation state immediately to prevent re-triggering
      window.history.replaceState({}, document.title);
      
      // Wait longer to ensure charms are restored first, then add text
      setTimeout(() => {
        if (window.addTextToCanvas) {
          window.addTextToCanvas(textToAdd, {
            fill: CUSTOM_TEXT_COLOR,
            fontSize: CUSTOM_TEXT_SIZE,
          });
          // Save state after adding text
          if (window.saveCanvasState) {
            setTimeout(() => {
              window.saveCanvasState();
            }, 500);
          }
        }
        // Reset after a delay to allow for new text additions
        setTimeout(() => {
          textAddedRef.current = false;
          lastTextRef.current = null;
        }, 2000);
      }, 1500); // Wait 1.5 seconds to ensure restoration completes
    } else {
      // Reset if no text in state
      if (!location.state?.addText) {
        textAddedRef.current = false;
        lastTextRef.current = null;
      }
    }
  }, [location.state]);

  // Helper function to get products with quantities from localStorage
  const getProductsWithQuantities = () => {
    const savedQuantities = localStorage.getItem('productQuantities');
    if (!savedQuantities) return Products;
    
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
      
      return mergedProducts;
    } catch (error) {
      console.error('Error loading saved quantities:', error);
      return Products;
    }
  };

  // Memoize productsWithQuantities to prevent infinite loops
  const productsWithQuantities = useMemo(() => getProductsWithQuantities(), []);

  // Reset subcategory when category changes
  useEffect(() => {
    if (selectedCategory) {
      setMobileSubCategory('all');
    }
  }, [selectedCategory]);

  // When category changes, update pins from productsWithQuantities
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
  const selectedCase = productsWithQuantities.cases.find(c => c.type === selectedCaseType);
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

  // Handle text added - make number 3 black
  const handleTextAdded = useCallback(() => {
    // Mark text as added to make number 3 black
    setHasTextAdded(true);
    // Close step 3 after text is added
    setOpenSteps(prev => ({ ...prev, step3: false }));
  }, []);

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

  // Prevent viewport changes when text modal opens on mobile
  useEffect(() => {
    if (isMobile && mobileCurrentStep === 'text') {
      // Lock viewport to prevent zoom and movement
      const viewport = document.querySelector('meta[name="viewport"]');
      const originalContent = viewport ? viewport.getAttribute('content') : '';
      
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
      }
      
      // Prevent body scroll
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        // Restore viewport
        if (viewport) {
          viewport.setAttribute('content', originalContent);
        }
        
        // Restore body scroll
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isMobile, mobileCurrentStep]);


  return (
    <section className={`min-h-screen bg-white relative ${isMobile ? 'overflow-hidden h-screen' : 'overflow-y-auto'}`} style={{width: '100vw', maxWidth: '100vw', overflowX: 'hidden'}}>
      {/* Text Input Modal - Mobile only */}
      {isMobile && mobileCurrentStep === 'text' && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center p-4">
          <div 
            className="bg-white rounded-sm shadow-lg w-full max-w-sm p-6"
            style={{
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm uppercase tracking-wider text-gray-900 font-medium" style={{fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"}}>
                Add Text
              </h2>
              <button
                onClick={() => {
                  setMobileCurrentStep(null);
                  setMobileCustomText('');
                  setMobileTextError('');
                }}
                className="p-1 hover:bg-gray-50 transition-colors rounded"
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  value={mobileCustomText}
                  onChange={(e) => {
                    setMobileCustomText(e.target.value);
                    setMobileTextError('');
                  }}
                  placeholder="e.g. Your name"
                  className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 bg-white text-gray-900 placeholder-gray-400 font-thin text-sm"
                  style={{
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                    fontSize: '16px' // Prevent zoom on iOS
                  }}
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
                    if (typeof window !== 'undefined' && window.addTextToCanvas) {
                      window.addTextToCanvas(mobileCustomText.trim(), {
                        fill: CUSTOM_TEXT_COLOR,
                        fontSize: CUSTOM_TEXT_SIZE,
                      });
                      setMobileCustomText('');
                      setMobileTextError('');
                      setMobileCurrentStep(null);
                    } else {
                      setMobileTextError('Canvas is still loading. Please try again in a moment.');
                    }
                  }}
                  className="flex-1 px-4 py-3 text-sm font-medium uppercase tracking-wider text-white bg-gray-900 hover:bg-gray-800 transition-colors rounded shadow-md"
                  style={{fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"}}
                >
                  Add Text
                </button>
                <button
                  onClick={() => {
                    setMobileCustomText('');
                    setMobileTextError('');
                  }}
                  className="px-4 py-3 text-sm font-medium uppercase tracking-wider text-gray-700 hover:text-gray-900 bg-white border-2 border-gray-300 hover:border-gray-400 transition-colors rounded shadow-sm"
                  style={{fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"}}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Hide main content when text modal is open on mobile */}
      {!(isMobile && mobileCurrentStep === 'text') && (
        <div className={`${isMobile ? 'pb-72' : 'container mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8'} relative z-10`}>
          {/* Mobile Layout */}
          {isMobile ? (
            <div className="flex flex-col h-full">
              {/* Close Button - Mobile only */}
              <button
                onClick={() => navigate('/')}
                className="fixed top-4 right-4 z-50 w-8 h-8 flex items-center justify-center bg-white rounded-full hover:bg-gray-100 transition-colors shadow-md"
                aria-label="Close and go back to home"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Header Section - Compact on mobile */}
              <div className="text-center pt-12 pb-3 px-4">
                <h1 className="text-2xl font-light text-gray-900 mb-1" 
                    style={{fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", letterSpacing: '0.05em'}}>
                  CREATE YOURS
                </h1>
                <div className="w-20 h-px bg-gray-200 mx-auto"></div>
              </div>
              
              {/* Canvas Section - Prominent on mobile */}
              <div className="flex-1 flex items-center justify-center px-4 py-2 min-h-0">
                <div className="w-full max-w-xs flex flex-col items-center">
                  <div className="w-full overflow-hidden" style={{touchAction: 'none'}}>
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
              </div>
              
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
          ) : (
            /* Desktop Layout */
            <>
              {/* Header Section */}
              <div className="text-center mb-6 md:mb-8">
                <h1 className="text-3xl font-light text-gray-900 mb-2" 
                    style={{fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", letterSpacing: '0.05em'}}>
                  CREATE YOURS
                </h1>
                <div className="w-24 h-px bg-gray-200 mx-auto mb-2"></div>
                <p className="text-sm text-gray-400 max-w-xl mx-auto font-light" 
                   style={{fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"}}>
                  Design your perfect passport case
                </p>
              </div>
              
              {/* MAIN SECTION - Canvas and Right Side */}
              <div className="flex flex-col lg:flex-row lg:gap-8 xl:gap-12">
                
                {/* LEFT - Design Canvas */}
                <div className="w-full lg:w-1/2 flex flex-col items-center lg:justify-start">
                  <div className="w-full max-w-lg flex flex-col items-center">
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
                    <div className="w-full flex flex-row gap-3 mt-6">
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
                <div className="w-full lg:w-1/2 flex flex-col">
              
                  {/* Desktop Steps Section - Dropdown Style */}
                  <div className="w-full space-y-2">
                {/* Step 1: Case & Color */}
                <div className="border border-gray-200 rounded-sm">
                  <button
                    onClick={() => toggleStep('step1')}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
                    style={{fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"}}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-medium flex-shrink-0">
                        1
                      </div>
                      <h3 className="text-xs uppercase tracking-wider text-gray-900 font-medium">
                        Choose Case & Color
              </h3>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${openSteps.step1 ? 'rotate-180' : ''}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  {openSteps.step1 && (
                    <div className="px-4 pb-4 pt-2 space-y-6 border-t border-gray-100">
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
                <div className="border border-gray-200 rounded-sm">
                  <button
                    onClick={() => toggleStep('step2')}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
                    style={{fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"}}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${selectedPins.length > 0 ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-400'}`}>
                        2
                      </div>
                      <h3 className="text-xs uppercase tracking-wider text-gray-900 font-medium">
                        Add Charms
                        {selectedPins.length > 0 && (
                          <span className="ml-2 text-gray-400 font-normal normal-case">({selectedPins.length} selected)</span>
                        )}
              </h3>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${openSteps.step2 ? 'rotate-180' : ''}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  {openSteps.step2 && (
                    <div className="px-4 pb-4 pt-2 border-t border-gray-100">
                <PinSelector
                  pins={pins}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedPins={selectedPins}
                  onSelect={handlePinSelection}
                  onRemove={handlePinRemove}
                  onDropdownToggle={() => setIsCaseDropdownOpen(false)}
                  closeOtherDropdowns={closePinSelectorDropdown}
                  Products={productsWithQuantities}
                />
              </div>
                  )}
            </div>
            
                {/* Step 3: Text */}
                <div className="border border-gray-200 rounded-sm">
                  <button
                    onClick={() => toggleStep('step3')}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
                    style={{fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"}}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${
                        hasTextAdded 
                          ? 'bg-gray-900 text-white' 
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        3
                      </div>
                      <h3 className="text-xs uppercase tracking-wider text-gray-900 font-medium">
                        Add Text
                        <span className="ml-2 text-gray-400 font-normal normal-case">(optional)</span>
                      </h3>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${openSteps.step3 ? 'rotate-180' : ''}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  {openSteps.step3 && (
                    <div className="px-4 pb-4 pt-2 border-t border-gray-100">
                      <CustomTextSection onTextAdded={handleTextAdded} />
                    </div>
                  )}
                </div>

                  </div>

                  {/* Step 4: Review & Add to Cart - Always visible, not a dropdown */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${
                    agreedToTerms 
                      ? 'bg-gray-900 text-white' 
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    4
                  </div>
                  <h3 className="text-xs uppercase tracking-wider text-gray-900 font-medium" style={{fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"}}>
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
        )}
        
        {/* Fixed Bottom Section - Mobile only */}
        {isMobile && (
          <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg">
            {/* Choose Options Section */}
            <div className="px-3 pt-2.5 pb-2 border-b border-gray-100">
              <MobileStepButtons
                mobileCurrentStep={mobileCurrentStep}
                setMobileCurrentStep={setMobileCurrentStep}
                selectedCaseType={selectedCaseType}
                selectedColor={selectedColor}
              />
            </div>
            
            {/* Price Summary and Add to Cart */}
            <div className="overflow-y-auto max-h-56">
              <div className="px-3 py-2.5">
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
    </section>
  );
};

export default CreateYours;