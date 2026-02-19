'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Products from '../../data/products.json';
import { useCart } from '../../context/CartContext';
import { getMaxAvailableQuantity } from '../../utils/inventory';
import { getProductsWithQuantities, getDefaultCaseAndColor } from '../../utils/createyours/helpers';
import { calculatePinsPrice, calculateTotalPrice, groupPinsForBreakdown } from '../../utils/createyours/priceCalculations';
import { getCaseImages } from '../../utils/createyours/caseImages';
import { normalizeImagePath } from '../../utils/imagePath';
import { useInventoryCheck } from './useInventoryCheck';
import { checkPinInventory, scrollToElement } from '../../utils/createyours/pinSelection';
import { 
  validateCaseInventory, 
  validateCharmInventory, 
  createDesignImage, 
  preparePinsDetails, 
  createCartProducts 
} from '../../utils/createyours/cartHelpers';
import { CUSTOM_TEXT_COLOR, CUSTOM_TEXT_SIZE, MAX_TEXT_LENGTH } from '../../data/constants';

export const useCreateYours = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addToCart, cart } = useCart();
  
  // State
  const [selectedCategory, setSelectedCategory] = useState("");
  const [pins, setPins] = useState([]);
  const [mobileSubCategory, setMobileSubCategory] = useState('all');
  
  const defaultValues = getDefaultCaseAndColor(searchParams);
  const [selectedCaseType, setSelectedCaseType] = useState(defaultValues.caseType);
  const [selectedColor, setSelectedColor] = useState(defaultValues.color);
  const [selectedCaseImage, setSelectedCaseImage] = useState(defaultValues.image);
  const [selectedPins, setSelectedPins] = useState([]);
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);
  const [isCaseDropdownOpen, setIsCaseDropdownOpen] = useState(false);
  const [isCharmsDropdownOpen, setIsCharmsDropdownOpen] = useState(false);
  const [isAddTextDropdownOpen, setIsAddTextDropdownOpen] = useState(false);
  // Initialize with safe default for SSR (assume desktop, will be updated on mount)
  const [isMobile, setIsMobile] = useState(false);
  const [mobileCurrentStep, setMobileCurrentStep] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [customText, setCustomText] = useState('');
  const [customTextError, setCustomTextError] = useState('');
  const [customTextAdded, setCustomTextAdded] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedModalImage, setSelectedModalImage] = useState(0);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [pendingAddToCart, setPendingAddToCart] = useState(false);
  const [showTermsError, setShowTermsError] = useState(false);
  const [showAddTextModal, setShowAddTextModal] = useState(false);
  const caseDropdownRef = useRef(null);
  
  const productsWithQuantities = getProductsWithQuantities();
  const selectedCase = productsWithQuantities.cases.find(c => c.type === selectedCaseType);
  
  // Use inventory check hook
  const {
    inventoryMessage,
    inventoryType,
    quantityError,
    charmInventoryError,
    setInventoryMessage,
    setInventoryType,
    setQuantityError,
    setCharmInventoryError,
    checkQuantityIncrement
  } = useInventoryCheck({
    selectedCaseType,
    selectedColor,
    selectedPins,
    quantity,
    cart,
    selectedCategory,
    selectedCase
  });

  // Scroll to top when component mounts or route changes (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname]);

  // Update case and color when URL params change
  useEffect(() => {
    const caseParam = searchParams?.get('case');
    const colorParam = searchParams?.get('color');
    
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

  // Handle case type selection
  const handleCaseTypeSelection = (caseType) => {
    setSelectedCaseType(caseType);
    const productsWithQuantities = getProductsWithQuantities();
    const selectedCase = productsWithQuantities.cases.find(c => c.type === caseType);
    if (selectedCase && selectedCase.colors.length > 0) {
      const availableColor = selectedCase.colors.find(c => 
        c.quantity === undefined || c.quantity > 0
      ) || selectedCase.colors[0];
      
      setSelectedColor(availableColor.color);
      setSelectedCaseImage(availableColor.image);
    }
    if (isMobile) {
      setMobileCurrentStep(null);
    }
  };

  // Handle color selection
  const handleColorSelection = (color, image) => {
    setSelectedColor(color);
    setSelectedCaseImage(image);
    if (isMobile) {
      setMobileCurrentStep(null);
    }
  };

  // Handle pin selection from PinSelector
  const handlePinSelection = useCallback((pin) => {
    const { canAdd, errorMessage, pinWithCategory } = checkPinInventory(
      pin, 
      cart, 
      selectedPins, 
      selectedCategory
    );
    
    if (!canAdd) {
      setInventoryMessage(errorMessage);
      setInventoryType('error');
      setCharmInventoryError(errorMessage.replace('Oops! We don\'t have any more ', '').replace(' in stock right now, so you can\'t add more to your basket.', ''));
      
      if (isMobile && typeof window !== 'undefined') {
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
    if (typeof window !== 'undefined' && window.addPinToCanvas) {
      window.addPinToCanvas(pinWithCategory);
    }
    
    setCharmInventoryError('');
    
    // Close mobile overlay after pin selection
    if (isMobile && typeof window !== 'undefined') {
      setMobileCurrentStep(null);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } else {
      scrollToElement('.happy-card', { block: 'center' });
    }
  }, [isMobile, cart, selectedPins, selectedCategory, setCharmInventoryError, setInventoryMessage, setInventoryType]);

  // Handle navigation from other pages
  // Note: Next.js doesn't support location.state like React Router
  // If you need to pass selectedPin, use query parameters or other state management
  useEffect(() => {
    // Check for selectedPin in query params as fallback
    const selectedPinParam = searchParams?.get('selectedPin');
    if (selectedPinParam) {
      try {
        const selectedPin = JSON.parse(decodeURIComponent(selectedPinParam));
        const pinWithCategory = {
          ...selectedPin,
          category: selectedPin.category || selectedCategory || 'colorful'
        };
        setTimeout(() => {
          if (typeof window !== 'undefined' && window.addPinToCanvas) {
            window.addPinToCanvas(pinWithCategory);
          }
        }, 1000);
        // Remove query param after processing
        const newSearchParams = new URLSearchParams(searchParams?.toString() || '');
        newSearchParams.delete('selectedPin');
        const newUrl = `${pathname}${newSearchParams.toString() ? '?' + newSearchParams.toString() : ''}`;
        router.replace(newUrl);
      } catch (e) {
        console.warn('Failed to parse selectedPin from query params:', e);
      }
    }
  }, [searchParams, selectedCategory, pathname, router]);

  // When category changes, update pins from Products
  useEffect(() => {
    if (selectedCategory) {
      if (selectedCategory === 'flags') {
        setPins(Products.pins.flags || []);
      } else {
        setPins(Products.pins[selectedCategory] || []);
      }
    }
    setMobileSubCategory('all');
  }, [selectedCategory]);

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

  // Handle quantity increment with inventory check
  const handleIncrementQuantity = () => {
    if (checkQuantityIncrement(quantity)) {
      setQuantity(quantity + 1);
      setQuantityError('');
      setCharmInventoryError('');
      setInventoryMessage('');
    }
  };

  // Handle quantity decrement
  const handleDecrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      setQuantityError('');
      setCharmInventoryError('');
      setInventoryMessage('');
    }
  };

  // Handle adding text on mobile
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

  // Calculate prices
  const caseBasePrice = selectedCase?.basePrice || 0;
  const selectedColorData = selectedCase?.colors?.find(c => c.color === selectedColor);
  const caseImages = getCaseImages(selectedColorData, selectedCase);
  const pinsPrice = calculatePinsPrice(selectedPins);
  const totalPrice = calculateTotalPrice(caseBasePrice, pinsPrice, quantity);
  const groupedPinsList = groupPinsForBreakdown(selectedPins);

  // Handle add to cart
  const handleAddToCart = () => {
    if (!agreedToTerms) {
      setShowTermsError(true);
      setPendingAddToCart(true);
      return;
    }
    
    setShowTermsError(false);
    executeAddToCart();
  };

  // Execute the actual add to cart action
  const executeAddToCart = async () => {
    const effectiveQuantity = Math.max(quantity, 1);
    
    // Validate case inventory
    const caseValidation = validateCaseInventory(
      selectedCaseType, 
      selectedColor, 
      cart, 
      effectiveQuantity, 
      selectedCase
    );
    
    if (!caseValidation.valid) {
      setInventoryMessage(caseValidation.errorMessage);
      setInventoryType('error');
      if (caseValidation.maxAvailable !== undefined) {
        setQuantity(caseValidation.maxAvailable > 0 ? caseValidation.maxAvailable : 0);
      }
      return;
    }
    
    // Validate charm inventory
    const charmValidation = validateCharmInventory(selectedPins, cart, effectiveQuantity, selectedCategory);
    if (!charmValidation.valid) {
      setInventoryMessage(charmValidation.errorMessage);
      setInventoryType('error');
      return;
    }
    
    // Get the case image
    const caseImageToUse = selectedCaseImage || selectedColorData?.image || selectedCase?.images?.[0];
    const finalCaseImage = caseImageToUse || '';
    const normalizedCaseImage = finalCaseImage ? normalizeImagePath(finalCaseImage) : '';
    
    // Get canvas image data URL
    let canvasImageDataURL = null;
    if (typeof window !== 'undefined' && window.getDesignImageDataURL) {
      canvasImageDataURL = window.getDesignImageDataURL();
    }
    
    // Create composite image
    const designImage = await createDesignImage(normalizedCaseImage, canvasImageDataURL);
    
    // Prepare pins details
    const pinsDetails = preparePinsDetails(selectedPins, selectedCategory);
    
    // Create cart products
    const { caseProduct, charmProducts } = createCartProducts({
      selectedCase,
      selectedCaseType,
      selectedColor,
      selectedCaseImage,
      selectedPins,
      caseBasePrice,
      quantity: effectiveQuantity,
      designImage,
      normalizedCaseImage,
      pinsDetails,
      selectedCategory
    });
    
    // Add to cart
    addToCart(caseProduct);
    charmProducts.forEach(charmProduct => {
      addToCart(charmProduct);
    });
    
    // Clear canvas and reset state
    if (typeof window !== 'undefined' && window.clearCanvas) {
      window.clearCanvas();
    }
    setSelectedPins([]);
    setQuantity(0);
  };

  // Handle pin selection callback from Canvas
  const handlePinSelect = useCallback((imgInstance) => {
    if (imgInstance && imgInstance.pinData) {
      setSelectedPins(prev => [...prev, { imgInstance, pin: imgInstance.pinData }]);
    }
  }, []);

  // Handle pin removal callback from Canvas
  const handlePinRemove = useCallback((removedPin) => {
    setSelectedPins(prev => prev.filter(p => p.imgInstance !== removedPin));
    setCharmInventoryError('');
  }, [setCharmInventoryError]);

  // Track screen size changes (client-side only)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Set initial mobile state on mount
    setIsMobile(window.innerWidth < 768);
    
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

  return {
    // State
    selectedCategory,
    setSelectedCategory,
    pins,
    mobileSubCategory,
    setMobileSubCategory,
    selectedCaseType,
    selectedColor,
    selectedCaseImage,
    selectedPins,
    showPriceBreakdown,
    setShowPriceBreakdown,
    isCaseDropdownOpen,
    setIsCaseDropdownOpen,
    isCharmsDropdownOpen,
    setIsCharmsDropdownOpen,
    isAddTextDropdownOpen,
    setIsAddTextDropdownOpen,
    isMobile,
    mobileCurrentStep,
    setMobileCurrentStep,
    quantity,
    setQuantity,
    customText,
    setCustomText,
    customTextError,
    setCustomTextError,
    customTextAdded,
    setCustomTextAdded,
    showImageModal,
    setShowImageModal,
    selectedModalImage,
    setSelectedModalImage,
    showDescriptionModal,
    setShowDescriptionModal,
    showTermsModal,
    setShowTermsModal,
    agreedToTerms,
    setAgreedToTerms,
    pendingAddToCart,
    setPendingAddToCart,
    showTermsError,
    setShowTermsError,
    showAddTextModal,
    setShowAddTextModal,
    
    // Computed values
    productsWithQuantities,
    selectedCase,
    caseBasePrice,
    selectedColorData,
    caseImages,
    pinsPrice,
    totalPrice,
    groupedPinsList,
    cart,
    
    // Inventory
    inventoryMessage,
    inventoryType,
    quantityError,
    charmInventoryError,
    
    // Handlers
    handleCaseTypeSelection,
    handleColorSelection,
    handlePinSelection,
    handleIncrementQuantity,
    handleDecrementQuantity,
    handleMobileAddText,
    handleAddToCart,
    executeAddToCart,
    handlePinSelect,
    handlePinRemove,
    
    // Navigation
    router,
  };
};
