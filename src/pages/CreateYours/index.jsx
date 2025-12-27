import React, { useEffect, useState, useCallback, useRef } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";

import Products from "../../data/products.json";
import { useCart } from "../../context/CartContext";
import { getMaxAvailableQuantity } from "../../utils/inventory";
import { createCompositeDesignImage } from "../../component/Canvas/utils/imageExport";
import { CUSTOM_TEXT_COLOR, CUSTOM_TEXT_SIZE } from "../../data/constants";

// Utils & Helpers
import { 
  getDefaultCaseAndColor, 
  getColorName, 
  getProductsWithQuantities, 
  countCharmInCart,
  canAddCharm,
  scrollToElement,
  getCaseImages
} from "./utils/createYoursHelpers";

// Hooks
import { useURLParams } from "./hooks/useURLParams";
import { useInventoryCheck } from "./hooks/useInventoryCheck";

// Components
import CanvasSection from "./components/CanvasSection";
import DesktopControls from "./components/DesktopControls";
import MobileControls from "./components/MobileControls";
import MobileOverlay from "./components/MobileOverlay";
import ImageModal from "../../component/ImageModal";
import ItemDescriptionModal from "./components/ItemDescriptionModal";
import TermsOfUseModal from "./components/TermsOfUseModal";
import AddTextModal from "./components/AddTextModal";

const CreateYours = () => {
  // ============================================================================
  // ROUTING & NAVIGATION
  // ============================================================================
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // ============================================================================
  // STATE - Product Selection
  // ============================================================================
  const defaultValues = getDefaultCaseAndColor(searchParams);
  const [selectedCaseType, setSelectedCaseType] = useState(defaultValues.caseType);
  const [selectedColor, setSelectedColor] = useState(defaultValues.color);
  const [selectedCaseImage, setSelectedCaseImage] = useState(defaultValues.image);
  const [selectedPins, setSelectedPins] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [pins, setPins] = useState([]);
  
  // ============================================================================
  // STATE - UI Controls
  // ============================================================================
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileCurrentStep, setMobileCurrentStep] = useState(null);
  const [mobileSubCategory, setMobileSubCategory] = useState('all');
  const [isCaseDropdownOpen, setIsCaseDropdownOpen] = useState(false);
  const [isCharmsDropdownOpen, setIsCharmsDropdownOpen] = useState(false);
  const [isAddTextDropdownOpen, setIsAddTextDropdownOpen] = useState(false);
  
  // ============================================================================
  // STATE - Modals & Overlays
  // ============================================================================
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedModalImage, setSelectedModalImage] = useState(0);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showAddTextModal, setShowAddTextModal] = useState(false);
  
  // ============================================================================
  // STATE - Custom Text
  // ============================================================================
  const [customText, setCustomText] = useState('');
  const [customTextError, setCustomTextError] = useState('');
  const [customTextAdded, setCustomTextAdded] = useState(false);
  
  // ============================================================================
  // STATE - Cart & Inventory
  // ============================================================================
  const [quantity, setQuantity] = useState(0);
  const [inventoryMessage, setInventoryMessage] = useState('');
  const [inventoryType, setInventoryType] = useState('warning');
  const [quantityError, setQuantityError] = useState('');
  const [charmInventoryError, setCharmInventoryError] = useState('');
  
  // ============================================================================
  // STATE - Terms & Cart Actions
  // ============================================================================
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [pendingAddToCart, setPendingAddToCart] = useState(false);
  const [showTermsError, setShowTermsError] = useState(false);
  
  // ============================================================================
  // STATE - Other
  // ============================================================================
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [saveImageFunction, setSaveImageFunction] = useState(null);
  const caseDropdownRef = useRef(null);
  
  // ============================================================================
  // CONTEXT & DATA
  // ============================================================================
  const { addToCart, cart } = useCart();
  const productsWithQuantities = getProductsWithQuantities();
  const selectedCase = productsWithQuantities.cases.find(c => c.type === selectedCaseType);
  const caseBasePrice = selectedCase?.basePrice || 0;
  const selectedColorData = selectedCase?.colors?.find(c => c.color === selectedColor);
  
  // ============================================================================
  // COMPUTED VALUES
  // ============================================================================
  const pinsPrice = selectedPins.reduce((total, { pin }) => total + (pin?.price || 0), 0);
  const displayQuantity = Math.max(quantity, 1);
  const totalPrice = ((caseBasePrice + pinsPrice) * displayQuantity).toFixed(2);
  
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
  
  // ============================================================================
  // CUSTOM HOOKS
  // ============================================================================
  
  // Handle URL params
  useURLParams(searchParams, setSelectedCaseType, setSelectedColor, setSelectedCaseImage, selectedCategory);
  
  // Handle inventory checking
  useInventoryCheck({
    selectedCaseType,
    selectedColor,
    selectedPins,
    quantity,
    cart,
    selectedCategory,
    inventoryMessage,
    setInventoryMessage,
    setInventoryType,
    setQuantityError,
    setCharmInventoryError,
    setQuantity
  });
  
  // ============================================================================
  // EFFECTS - Initialization & Data Loading
  // ============================================================================
  
  // Update color when case type changes
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
  
  // Handle navigation from other pages
  useEffect(() => {
    if (location.state?.selectedPin) {
      const selectedPin = location.state.selectedPin;
      const pinWithCategory = {
        ...selectedPin,
        category: selectedPin.category || selectedCategory || 'colorful'
      };
      setTimeout(() => {
        if (window.addPinToCanvas) {
          window.addPinToCanvas(pinWithCategory);
        }
      }, 1000);
      window.history.replaceState({}, document.title);
    }
  }, [location.state, selectedCategory]);
  
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
    setMobileSubCategory('all');
  }, [selectedCategory]);
  
  // ============================================================================
  // EFFECTS - UI Behavior
  // ============================================================================
  
  // Track screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Close add text dropdown when mobile step overlays are opened
  useEffect(() => {
    if (isMobile && mobileCurrentStep !== null) {
      setIsAddTextDropdownOpen(false);
    }
  }, [mobileCurrentStep, isMobile]);
  
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
  
  // ============================================================================
  // HANDLERS - Case & Color Selection
  // ============================================================================
  
  const handleCaseTypeSelection = (caseType) => {
    setSelectedCaseType(caseType);
    const selectedCase = productsWithQuantities.cases.find(c => c.type === caseType);
    if (selectedCase && selectedCase.colors.length > 0) {
      const availableColor = selectedCase.colors.find(c => 
        c.quantity === undefined || c.quantity > 0
      ) || selectedCase.colors[0];
      
      const productForInventory = {
        caseType: caseType,
        color: availableColor.color,
      };
      const maxAvailable = getMaxAvailableQuantity(productForInventory, cart);
      
      if (maxAvailable !== null && maxAvailable > 0) {
        setInventoryMessage('');
      }
      
      setSelectedColor(availableColor.color);
      setSelectedCaseImage(availableColor.image);
    }
    
    if (isMobile) {
      setMobileCurrentStep(null);
    }
  };
  
  const handleColorSelection = (color, image) => {
    if (selectedCaseType && color) {
      const productForInventory = {
        caseType: selectedCaseType,
        color: color,
      };
      const maxAvailable = getMaxAvailableQuantity(productForInventory, cart);
      
      if (maxAvailable !== null && maxAvailable > 0) {
        setInventoryMessage('');
      }
    }
    
    setSelectedColor(color);
    setSelectedCaseImage(image);
    
    if (isMobile) {
      setMobileCurrentStep(null);
    }
  };
  
  // ============================================================================
  // HANDLERS - Pin/Charm Selection
  // ============================================================================
  
  const handlePinSelection = useCallback((pin) => {
    const getCharmCategory = () => {
      if (pin.category) return pin.category;
      if (selectedCategory) return selectedCategory;
      return 'colorful';
    };
    
    const charmCategory = getCharmCategory();
    const charmName = pin.name || pin.src || '';
    const charmSrc = pin.src || '';
    
    const pinWithCategory = {
      ...pin,
      category: charmCategory
    };
    
    const product = {
      name: charmName,
      price: pin.price || 2.0,
      totalPrice: pin.price || 2.0,
      image: charmSrc,
      pin: pinWithCategory,
      category: charmCategory,
      type: 'charm'
    };
    
    const maxAvailable = getMaxAvailableQuantity(product, cart);
    
    // If no inventory limit, allow adding
    if (maxAvailable === null) {
      if (window.addPinToCanvas) {
        window.addPinToCanvas(pinWithCategory);
      }
      
      if (isMobile) {
        setMobileCurrentStep(null);
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
      } else {
        scrollToElement('.happy-card');
      }
      return;
    }
    
    // Check inventory
    const checkResult = canAddCharm(pin, selectedCategory, selectedPins, quantity, cart);
    
    if (!checkResult.canAdd) {
      const charmDisplayName = pin.name || pin.src || 'this charm';
      setInventoryMessage(checkResult.message || `Oops! We don't have any more ${charmDisplayName} in stock right now, so you can't add more to your basket.`);
      setInventoryType('error');
      setCharmInventoryError(`We don't have any more ${charmDisplayName} in stock.`);
      
      if (isMobile) {
        setMobileCurrentStep(null);
        setTimeout(() => {
          window.scrollTo({ 
            top: document.body.scrollHeight, 
            behavior: 'smooth' 
          });
        }, 300);
      } else {
        scrollToElement('[class*="PriceSummary"]', { block: 'center' });
      }
      return;
    }
    
    // Add pin to canvas
    if (window.addPinToCanvas) {
      window.addPinToCanvas(pinWithCategory);
    }
    
    setCharmInventoryError('');
    
    if (isMobile) {
      setMobileCurrentStep(null);
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    } else {
      scrollToElement('.happy-card');
    }
  }, [isMobile, cart, selectedPins, selectedCategory, quantity]);
  
  const handlePinSelect = useCallback((imgInstance) => {
    if (imgInstance && imgInstance.pinData) {
      setSelectedPins(prev => [...prev, { imgInstance, pin: imgInstance.pinData }]);
    }
  }, []);
  
  const handlePinRemove = useCallback((removedPin) => {
    setSelectedPins(prev => prev.filter(p => p.imgInstance !== removedPin));
    setCharmInventoryError('');
  }, []);
  
  const handleSaveImageFunction = useCallback((saveFunction) => {
    setSaveImageFunction(() => saveFunction);
  }, []);
  
  // ============================================================================
  // HANDLERS - Quantity Management
  // ============================================================================
  
  const handleIncrementQuantity = () => {
    const productForInventory = {
      caseType: selectedCaseType,
      color: selectedColor,
    };
    const maxAvailable = getMaxAvailableQuantity(productForInventory, cart);
    
    // Check case inventory
    if (maxAvailable !== null && (maxAvailable <= 0 || quantity + 1 > maxAvailable)) {
      const itemName = selectedCase?.name || 'Passport Case';
      const colorName = selectedColorData?.image ? getColorName(selectedColorData.image) : '';
      const colorText = colorName ? ` in ${colorName}` : '';
      const errorMessage = `Oops! We don't have any more ${itemName}${colorText} in stock right now, so you can't add more to your basket.`;
      setQuantityError(`We don't have any more ${itemName}${colorText} in stock to be added anymore.`);
      setInventoryMessage(errorMessage);
      setInventoryType('error');
      return;
    }
    
    // Check charm inventory for all charms in the design
    if (selectedPins.length > 0) {
      for (const { pin } of selectedPins) {
        if (!pin) continue;
        
        const charmCategory = pin?.category || selectedCategory || 'colorful';
        const charmName = pin.name || pin.src || '';
        const charmSrc = pin.src || '';
        
        const charmProduct = {
          name: charmName,
          price: pin.price || 2.0,
          totalPrice: pin.price || 2.0,
          image: charmSrc,
          pin: pin,
          category: charmCategory,
          type: 'charm'
        };
        
        const charmMaxAvailable = getMaxAvailableQuantity(charmProduct, cart);
        if (charmMaxAvailable === null) continue;
        
        const { standaloneCount, inCustomDesignsCount } = countCharmInCart(
          charmName, 
          charmSrc, 
          charmCategory, 
          cart
        );
        
        const charmCountInDesign = selectedPins.filter(p => {
          const pPin = p.pin || p;
          const pPinName = pPin.name || pPin.src;
          const pPinCategory = pPin.category || charmCategory;
          return (pPinName === charmName || pPinName === charmSrc) && 
                 pPinCategory === charmCategory;
        }).length;
        
        const totalInventory = charmMaxAvailable + standaloneCount;
        const currentUsage = standaloneCount + inCustomDesignsCount + (charmCountInDesign * quantity);
        const newUsage = currentUsage + charmCountInDesign;
        
        if (charmMaxAvailable === 0 || newUsage > totalInventory) {
          const errorMessage = `Oops! We don't have any more ${pin.name || 'this charm'} in stock right now, so you can't add more to your basket.`;
          setCharmInventoryError(errorMessage);
          setInventoryMessage(errorMessage);
          setInventoryType('error');
          return;
        }
      }
    }
    
    setQuantity(quantity + 1);
    setQuantityError('');
    setCharmInventoryError('');
    setInventoryMessage('');
  };
  
  const handleDecrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      setQuantityError('');
      setCharmInventoryError('');
      setInventoryMessage('');
    }
  };
  
  // ============================================================================
  // HANDLERS - Custom Text
  // ============================================================================
  
  const handleMobileAddText = () => {
    if (!customText.trim()) {
      setCustomTextError('Please enter the text you want to add.');
      return;
    }
    
    if (typeof window !== 'undefined' && window.addTextToCanvas) {
      window.addTextToCanvas(customText.trim(), {
        fill: CUSTOM_TEXT_COLOR,
        fontSize: CUSTOM_TEXT_SIZE,
      });
      setCustomTextAdded(true);
      setCustomTextError('');
      setTimeout(() => {
        setIsAddTextDropdownOpen(false);
      }, 500);
    } else {
      setCustomTextError('Canvas is still loading. Please try again in a moment.');
    }
  };
  
  // ============================================================================
  // HANDLERS - Add to Cart
  // ============================================================================
  
  const handleAddToCart = () => {
    if (!agreedToTerms) {
      setShowTermsError(true);
      setPendingAddToCart(true);
      return;
    }
    
    setShowTermsError(false);
    executeAddToCart();
  };
  
  const executeAddToCart = async () => {
    const effectiveQuantity = Math.max(quantity, 1);
    
    // Check case inventory
    const productForInventory = {
      caseType: selectedCaseType,
      color: selectedColor,
    };
    const maxAvailableCase = getMaxAvailableQuantity(productForInventory, cart);
    
    const caseName = selectedCase?.name || 'Passport Case';
    const colorData = selectedCase?.colors?.find(c => c.color === selectedColor);
    const colorName = colorData?.color || selectedColor || '';
    
    if (maxAvailableCase !== null && maxAvailableCase === 0) {
      const colorText = colorName ? ` in ${colorName}` : '';
      setInventoryMessage(`Oops! We don't have any more ${caseName}${colorText} in stock right now, so you can't add more to your basket.`);
      setInventoryType('error');
      return;
    }
    
    if (maxAvailableCase !== null && effectiveQuantity > maxAvailableCase) {
      const colorText = colorName ? ` in ${colorName}` : '';
      setInventoryMessage(`Oops! We don't have any more ${caseName}${colorText} in stock right now, so you can't add more to your basket.`);
      setInventoryType('error');
      if (maxAvailableCase > 0) {
        setQuantity(maxAvailableCase);
      } else {
        setQuantity(0);
      }
      return;
    }
    
    // Check charm inventory
    for (const { pin } of selectedPins) {
      const charmCategory = pin?.category || selectedCategory || 'colorful';
      const charmName = pin?.name || 'charm';
      
      const charmProduct = {
        type: 'charm',
        category: charmCategory,
        pin: pin,
        name: charmName
      };
      
      const maxAvailableCharm = getMaxAvailableQuantity(charmProduct, cart);
      
      if (maxAvailableCharm !== null && maxAvailableCharm === 0) {
        setInventoryMessage(`Oops! We don't have any more ${charmName} in stock right now, so you can't add more to your basket.`);
        setInventoryType('error');
        return;
      }
      
      if (maxAvailableCharm !== null && effectiveQuantity > maxAvailableCharm) {
        setInventoryMessage(`Oops! We don't have any more ${charmName} in stock right now, so you can't add more to your basket.`);
        setInventoryType('error');
        return;
      }
    }
    
    // Get images
    const caseImageToUse = selectedCaseImage || colorData?.image || selectedCase?.images?.[0];
    const finalCaseImage = caseImageToUse || '';
    
    let canvasImageDataURL = null;
    if (window.getDesignImageDataURL) {
      canvasImageDataURL = window.getDesignImageDataURL();
    }
    
    // Create composite image
    let designImage = finalCaseImage;
    if (finalCaseImage && canvasImageDataURL) {
      try {
        designImage = await createCompositeDesignImage(finalCaseImage, canvasImageDataURL, 300, 350);
      } catch (error) {
        console.error('Error creating composite design image:', error);
        designImage = finalCaseImage;
      }
    } else if (canvasImageDataURL) {
      designImage = canvasImageDataURL;
    }
    
    // Prepare pins details
    const pinsDetails = selectedPins.map(({ pin }) => {
      const pinCategory = (pin?.category && pin.category.trim() !== '') 
        ? pin.category 
        : (selectedCategory && selectedCategory.trim() !== '') 
          ? selectedCategory 
          : 'colorful';
      return {
        ...pin,
        name: pin?.name || 'Charm',
        src: pin?.src || '',
        price: pin?.price || 0,
        category: pinCategory
      };
    });
    
    // Generate unique timestamp
    const uniqueTimestamp = Date.now();
    
    // Add case to cart
    const caseProduct = {
      id: `case-${uniqueTimestamp}-${Math.random().toString(36).substr(2, 9)}`,
      name: caseName,
      caseType: selectedCaseType,
      caseName: caseName,
      color: selectedColor,
      basePrice: caseBasePrice,
      casePrice: caseBasePrice,
      totalPrice: caseBasePrice,
      price: caseBasePrice,
      image: designImage,
      designImage: designImage,
      caseImage: finalCaseImage,
      customDesign: true,
      quantity: effectiveQuantity
    };
    
    addToCart(caseProduct);
    
    // Add each charm to cart
    pinsDetails.forEach((pin, index) => {
      const charmCategory = pin.category || selectedCategory || 'colorful';
      const charmName = pin.name || 'Charm';
      const charmPrice = pin.price || 2.0;
      
      const charmProduct = {
        id: `charm-${uniqueTimestamp}-${index}-${Math.random().toString(36).substr(2, 9)}`,
        name: charmName,
        price: charmPrice,
        totalPrice: charmPrice,
        image: pin.src || '',
        pin: pin,
        category: charmCategory,
        type: 'charm',
        quantity: effectiveQuantity
      };
      
      addToCart(charmProduct);
    });
    
    // Clear canvas and reset state
    if (window.clearCanvas) {
      window.clearCanvas();
    }
    setSelectedPins([]);
    setQuantity(0);
  };
  
  // ============================================================================
  // RENDER
  // ============================================================================
  
  return (
    <section className={`w-full pt-4 pb-1 md:pb-8 bg-white ${isMobile ? 'h-screen fixed inset-0 overflow-hidden' : 'min-h-screen'}`}>
      <div className={`max-w-7xl mx-auto px-3 xs:px-4 sm:px-4 md:px-8 relative z-10 ${isMobile ? 'pb-32 xs:pb-36 sm:pb-40 h-full flex flex-col overflow-hidden' : 'pb-2 sm:pb-24 flex flex-col'}`}>
        {/* Close Button - Mobile only */}
        {isMobile && (
          <button
            onClick={() => navigate('/')}
            className="absolute right-3 top-3 z-50 w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900"
            aria-label="Close and go back to home"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        
        {/* Header Section */}
        <div className={`text-center flex-shrink-0 ${isMobile ? 'mt-3 mb-4' : 'mt-4 md:mt-6'}`}>
          <h1 className={`${isMobile ? 'text-xl' : 'text-title'} text-gray-900 tracking-title mb-2`} style={{fontFamily: "'Poppins', sans-serif"}}>
            CREATE YOURS
          </h1>
          <div className={`${isMobile ? 'w-16' : 'w-16 sm:w-20 md:w-24'} h-px bg-gray-200 mx-auto ${isMobile ? 'mb-3' : 'mb-2 md:mb-4'}`}></div>
          <p className="md:block hidden text-sm text-gray-500 max-w-2xl mx-auto font-light" 
             style={{fontFamily: "'Poppins', sans-serif"}}>
            Design your perfect passport case with our interactive creator
          </p>
        </div>
        
        {/* Main Content Container */}
        <div className={`flex flex-col ${isMobile ? '' : 'md:flex-row md:gap-8 lg:gap-12'} flex-1 overflow-hidden mt-0 ${isMobile ? '' : 'md:mt-6'}`}>
          {/* Canvas Section */}
          <CanvasSection
            selectedCaseType={selectedCaseType}
            selectedColor={selectedColor}
            selectedCaseImage={selectedCaseImage}
            selectedCase={selectedCase}
            selectedColorData={selectedColorData}
            isMobile={isMobile}
            isCaseDropdownOpen={isCaseDropdownOpen}
            isCharmsDropdownOpen={isCharmsDropdownOpen}
            isAddTextDropdownOpen={isAddTextDropdownOpen}
            onPinSelect={handlePinSelect}
            onPinRemove={handlePinRemove}
            onSaveImage={handleSaveImageFunction}
            onOpenImageModal={() => {
              setShowImageModal(true);
              setSelectedModalImage(0);
            }}
            onOpenDescriptionModal={() => setShowDescriptionModal(true)}
          />
          
          {/* Right Side Content */}
          <div className={`flex flex-col ${isMobile ? '' : 'md:w-1/2 md:flex-1'} gap-2 xs:gap-3 sm:gap-4 overflow-hidden`}>
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
                Products={productsWithQuantities}
                cart={cart}
              />
            )}
            
            {/* Desktop Controls */}
            {!isMobile && (
              <DesktopControls
                isCaseDropdownOpen={isCaseDropdownOpen}
                isCharmsDropdownOpen={isCharmsDropdownOpen}
                isAddTextDropdownOpen={isAddTextDropdownOpen}
                setIsCaseDropdownOpen={setIsCaseDropdownOpen}
                setIsCharmsDropdownOpen={setIsCharmsDropdownOpen}
                setIsAddTextDropdownOpen={setIsAddTextDropdownOpen}
                selectedCaseType={selectedCaseType}
                selectedColor={selectedColor}
                selectedCase={selectedCase}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                pins={pins}
                selectedPins={selectedPins}
                customText={customText}
                setCustomText={setCustomText}
                customTextError={customTextError}
                setCustomTextError={setCustomTextError}
                customTextAdded={customTextAdded}
                setCustomTextAdded={setCustomTextAdded}
                handleCaseTypeSelection={handleCaseTypeSelection}
                handleColorSelection={handleColorSelection}
                handlePinSelection={handlePinSelection}
                productsWithQuantities={productsWithQuantities}
                cart={cart}
                totalPrice={totalPrice}
                caseBasePrice={caseBasePrice}
                groupedPinsList={groupedPinsList}
                showPriceBreakdown={showPriceBreakdown}
                setShowPriceBreakdown={setShowPriceBreakdown}
                quantity={quantity}
                setQuantity={setQuantity}
                onIncrementQuantity={handleIncrementQuantity}
                onDecrementQuantity={handleDecrementQuantity}
                quantityError={quantityError}
                charmInventoryError={charmInventoryError}
                selectedCaseImage={selectedCaseImage}
                pinsPrice={pinsPrice}
                onAddToCart={handleAddToCart}
                onShowTerms={() => setShowTermsModal(true)}
                inventoryMessage={inventoryMessage}
                inventoryType={inventoryType}
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
        
        {/* Mobile Controls */}
        {isMobile && (
          <MobileControls
            mobileCurrentStep={mobileCurrentStep}
            setMobileCurrentStep={setMobileCurrentStep}
            selectedCaseType={selectedCaseType}
            selectedColor={selectedColor}
            isAddTextDropdownOpen={isAddTextDropdownOpen}
            setIsAddTextDropdownOpen={setIsAddTextDropdownOpen}
            customText={customText}
            setCustomText={setCustomText}
            customTextError={customTextError}
            setCustomTextError={setCustomTextError}
            customTextAdded={customTextAdded}
            setCustomTextAdded={setCustomTextAdded}
            handleMobileAddText={handleMobileAddText}
            totalPrice={totalPrice}
            caseBasePrice={caseBasePrice}
            groupedPinsList={groupedPinsList}
            showPriceBreakdown={showPriceBreakdown}
            setShowPriceBreakdown={setShowPriceBreakdown}
            quantity={quantity}
            setQuantity={setQuantity}
            onIncrementQuantity={handleIncrementQuantity}
            onDecrementQuantity={handleDecrementQuantity}
            quantityError={quantityError}
            charmInventoryError={charmInventoryError}
            selectedCase={selectedCase}
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
            setShowTermsError={setShowTermsError}
            inventoryMessage={inventoryMessage}
            inventoryType={inventoryType}
          />
        )}
        
        {/* Modals */}
        <ImageModal
          show={showImageModal}
          selectedCase={selectedCase}
          selectedColorData={selectedColorData}
          caseImages={getCaseImages(selectedColorData, selectedCase)}
          selectedModalImage={selectedModalImage}
          setSelectedModalImage={setSelectedModalImage}
          onClose={() => setShowImageModal(false)}
        />
        
        <ItemDescriptionModal
          show={showDescriptionModal}
          onClose={() => setShowDescriptionModal(false)}
          selectedCase={selectedCase}
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
