import React, { useEffect, useState, useCallback, useRef } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faPalette, faPlane, faFont } from '@fortawesome/free-solid-svg-icons';

import Canvas from "../../component/Canvas/index.jsx";
import ColorSelector from "../../component/ColorSelector/index.jsx";
import PinSelector from "../../component/PinSelector";
import Products from "../../data/products.json";
import { useCart } from "../../context/CartContext";
import { getMaxAvailableQuantity } from "../../utils/inventory";
import { createCompositeDesignImage } from "../../component/Canvas/utils/imageExport";

// Utils
import { getProductsWithQuantities, getDefaultCaseAndColor } from "./utils/helpers";
import { calculatePinsPrice, calculateTotalPrice, groupPinsForBreakdown } from "./utils/priceCalculations";
import { getCaseImages } from "./utils/caseImages";

// Hooks
import { useInventoryCheck } from "./hooks/useInventoryCheck";

// Components
import ViewMoreImagesButton from "./components/ViewMoreImagesButton";
import ItemDescriptionDropdown from "./components/ItemDescriptionDropdown";
import ItemDescriptionModal from "./components/ItemDescriptionModal";
import ImageModal from "../../component/ImageModal";
import MobileOverlay from "./components/MobileOverlay";
import CustomTextSection from "./components/CustomTextSection";
import PriceSummary from "./components/PriceSummary";
import CaseSelector from "./components/CaseSelector";
import TermsOfUseModal from "./components/TermsOfUseModal";
import AddTextModal from "./components/AddTextModal";
import { CUSTOM_TEXT_COLOR, CUSTOM_TEXT_SIZE, MAX_TEXT_LENGTH } from "../../data/constants";


const CreateYours = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileCurrentStep, setMobileCurrentStep] = useState(null); // null = showing passport case, 'case' = case selection, 'color' = color selection, 'charms' = charms selection
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
  const { addToCart, cart } = useCart();
  const productsWithQuantities = getProductsWithQuantities();
  
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
    selectedCase: productsWithQuantities.cases.find(c => c.type === selectedCaseType)
  });

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
    const productsWithQuantities = getProductsWithQuantities();
    const selectedCase = productsWithQuantities.cases.find(c => c.type === caseType);
    if (selectedCase && selectedCase.colors.length > 0) {
      // Find first available (not sold out) color, or fallback to first color
      const availableColor = selectedCase.colors.find(c => 
        c.quantity === undefined || c.quantity > 0
      ) || selectedCase.colors[0];
      
      // Check inventory for the selected case type and available color
      const productForInventory = {
        caseType: caseType,
        color: availableColor.color,
      };
      const maxAvailable = getMaxAvailableQuantity(productForInventory, cart);
      
      // Don't show alert here - only show when clicking +/- buttons
      // Clear inventory message if case is in stock
      if (maxAvailable !== null && maxAvailable > 0) {
        setInventoryMessage('');
      }
      
      setSelectedColor(availableColor.color);
      setSelectedCaseImage(availableColor.image);
    }
    // Close mobile step after selection
    if (isMobile) {
      setMobileCurrentStep(null);
    }
  };

  // Handle color selection
  const handleColorSelection = (color, image) => {
    // Check inventory for the selected case and color before setting
    if (selectedCaseType && color) {
      const productForInventory = {
        caseType: selectedCaseType,
        color: color,
      };
      const maxAvailable = getMaxAvailableQuantity(productForInventory, cart);
      
      // Don't show alert here - only show when clicking +/- buttons
      // Clear inventory message if color is in stock
      if (maxAvailable !== null && maxAvailable > 0) {
        setInventoryMessage('');
      }
    }
    
    setSelectedColor(color);
    setSelectedCaseImage(image);
    // Close mobile step after selection
    if (isMobile) {
      setMobileCurrentStep(null);
    }
  };

  // Handle pin selection from PinSelector
  const handlePinSelection = useCallback((pin) => {
    // Check inventory before adding charm
    const getCharmCategory = () => {
      if (pin.category) return pin.category;
      // Try to infer category from selectedCategory
      if (selectedCategory) return selectedCategory;
      return 'colorful'; // Default fallback
    };

    const charmCategory = getCharmCategory();
    const charmName = pin.name || pin.src || '';
    const charmSrc = pin.src || '';

    // Ensure pin object has category property for cart tracking
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

    // Check inventory for standalone charms in cart
    // maxAvailable tells us how many MORE standalone charms can be added
    const maxAvailable = getMaxAvailableQuantity(product, cart);
    
    // If no inventory limit, allow adding
    if (maxAvailable === null) {
      // This will be handled by the Canvas component
      // Pass pin with category property so it's preserved
      if (window.addPinToCanvas) {
        window.addPinToCanvas(pinWithCategory);
      }
      
      // Close mobile overlay after pin selection
      if (isMobile) {
        setMobileCurrentStep(null);
        // Scroll to top on small screens
        setTimeout(() => {
          window.scrollTo({ 
            top: 0, 
            behavior: 'smooth' 
          });
        }, 100);
      } else {
        // Scroll to the canvas area on larger screens
        setTimeout(() => {
          const canvasElement = document.querySelector('.happy-card');
          if (canvasElement) {
            canvasElement.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center' 
            });
          }
        }, 100);
      }
      return;
    }
    
    // Count standalone charms already in cart
    let standaloneCharmsInCart = 0;
    cart.forEach(cartItem => {
      if (cartItem.type === 'charm') {
        const cartPin = cartItem.pin || cartItem;
        const cartPinName = cartPin.name || cartPin.src;
        const cartPinCategory = cartPin.category || cartItem.category || charmCategory;
        if ((cartPinName === charmName || cartPinName === charmSrc) && 
            cartPinCategory === charmCategory) {
          standaloneCharmsInCart += (cartItem.quantity || 1);
        }
      }
    });
    
    // Count how many of this charm are in custom designs already in cart
    // (getMaxAvailableQuantity only counts standalone charms, not charms in custom designs)
    let charmCountInCustomDesigns = 0;
    cart.forEach(cartItem => {
      // Count charms in custom designs
      if (cartItem.pins && Array.isArray(cartItem.pins)) {
        cartItem.pins.forEach(cartPin => {
          const cartPinName = cartPin.name || cartPin.src;
          const cartPinCategory = cartPin.category || charmCategory;
          if ((cartPinName === charmName || cartPinName === charmSrc) && 
              cartPinCategory === charmCategory) {
            charmCountInCustomDesigns += (cartItem.quantity || 1);
          }
        });
      }
    });
    
    // Count how many of this charm are already selected in the current design
    const charmCountInDesign = selectedPins.filter(p => {
      const pPin = p.pin || p;
      const pPinName = pPin.name || pPin.src;
      const pPinCategory = pPin.category || charmCategory;
      return (pPinName === charmName || pPinName === charmSrc) && 
             pPinCategory === charmCategory;
    }).length;
    
    // Calculate total inventory: maxAvailable + standalone charms in cart
    // This gives us the total available inventory for this charm
    const totalInventory = maxAvailable + standaloneCharmsInCart;
    
    // Calculate total usage: standalone + in custom designs + in current design + 1 (new one)
    const totalUsage = standaloneCharmsInCart + charmCountInCustomDesigns + charmCountInDesign + 1;
    
    // If maxAvailable is 0, no more charms can be added (standalone or in designs)
    // Also check if total usage would exceed total inventory
    if (maxAvailable === 0 || totalUsage > totalInventory) {
      const charmDisplayName = pin.name || pin.src || 'this charm';
      const errorMessage = `Oops! We don't have any more ${charmDisplayName} in stock right now, so you can't add more to your basket.`;
      
      // Set inventory message immediately
      setInventoryMessage(errorMessage);
      setInventoryType('error');
      setCharmInventoryError(`We don't have any more ${charmDisplayName} in stock.`);
      
      // Close mobile overlay if open so user can see the alert
      if (isMobile) {
        setMobileCurrentStep(null);
        // Scroll to show the alert message
        setTimeout(() => {
          window.scrollTo({ 
            top: document.body.scrollHeight, 
            behavior: 'smooth' 
          });
        }, 300);
      } else {
        // Scroll to price summary area on desktop to show alert
        setTimeout(() => {
          const priceSummaryElement = document.querySelector('[class*="PriceSummary"]') || 
                                     document.querySelector('.price-summary');
          if (priceSummaryElement) {
            priceSummaryElement.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center' 
            });
          }
        }, 300);
      }
      
      return;
    }
    
    // This will be handled by the Canvas component
    // Pass pin with category property so it's preserved
    if (window.addPinToCanvas) {
      window.addPinToCanvas(pinWithCategory);
    }
    
    // Clear charm inventory error when successfully adding a charm
    setCharmInventoryError('');
    
    // Clear inventory message only if it's a warning (not an error from this action)
    // Don't clear immediately - let the useEffect handle it based on current state
    
    // Close mobile overlay after pin selection
    if (isMobile) {
      setMobileCurrentStep(null);
      // Scroll to top on small screens
      setTimeout(() => {
        window.scrollTo({ 
          top: 0, 
          behavior: 'smooth' 
        });
      }, 100);
    } else {
      // Scroll to the canvas area on larger screens
      setTimeout(() => {
        const canvasElement = document.querySelector('.happy-card');
        if (canvasElement) {
          canvasElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }
      }, 100);
    }
  }, [isMobile, cart, selectedPins, selectedCategory, setCharmInventoryError, setInventoryMessage, setInventoryType]);

  // Handle navigation from other pages
  useEffect(() => {
    if (location.state?.selectedPin) {
      const selectedPin = location.state.selectedPin;
      // Ensure pin has category property - use selectedPin.category or infer from context
      const pinWithCategory = {
        ...selectedPin,
        category: selectedPin.category || selectedCategory || 'colorful'
      };
      setTimeout(() => {
        if (window.addPinToCanvas) {
          window.addPinToCanvas(pinWithCategory);
        }
      }, 1000);
      
      // Clear the navigation state
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


  // Handle quantity increment with inventory check
  const handleIncrementQuantity = () => {
    // Clamp quantity to max available first
    const productForInventory = {
      caseType: selectedCaseType,
      color: selectedColor,
    };
    const maxAvailable = getMaxAvailableQuantity(productForInventory, cart);
    if (maxAvailable !== null && quantity >= maxAvailable) {
      return; // Can't increment
    }
    
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
      setQuantityError(''); // Clear error when decrementing
      setCharmInventoryError(''); // Clear charm inventory error when decrementing
      setInventoryMessage(''); // Clear inventory message when decrementing
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
      // Close dropdown after adding text
      setTimeout(() => {
        setIsAddTextDropdownOpen(false);
      }, 500);
    } else {
      setCustomTextError('Canvas is still loading. Please try again in a moment.');
    }
  };

  // Calculate total price
  const selectedCase = productsWithQuantities.cases.find(c => c.type === selectedCaseType);
  const caseBasePrice = selectedCase?.basePrice || 0;
  
  // Get images for the selected case and color
  const selectedColorData = selectedCase?.colors?.find(c => c.color === selectedColor);
  const caseImages = getCaseImages(selectedColorData, selectedCase);
  
  // Calculate prices
  const pinsPrice = calculatePinsPrice(selectedPins);
  const totalPrice = calculateTotalPrice(caseBasePrice, pinsPrice, quantity);
  const groupedPinsList = groupPinsForBreakdown(selectedPins);

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
  const executeAddToCart = async () => {
    // Ensure quantity is at least 1 (since display shows 1 when quantity is 0)
    const effectiveQuantity = Math.max(quantity, 1);
    
    // Check case inventory first
    const productForInventory = {
      caseType: selectedCaseType,
      color: selectedColor,
    };
    const maxAvailableCase = getMaxAvailableQuantity(productForInventory, cart);
    
    // Get case name and color name for better error messages
    const caseName = selectedCase?.name || 'Passport Case';
    const colorData = selectedCase?.colors?.find(c => c.color === selectedColor);
    const colorName = colorData?.color || selectedColor || '';
    
    // Validate case quantity against inventory
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
    
    // Check charm inventory for each selected charm
    // Since we're adding charms separately, we need to check if we can add quantity of each charm
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
      
      // Check if charm is out of stock
      if (maxAvailableCharm !== null && maxAvailableCharm === 0) {
        setInventoryMessage(`Oops! We don't have any more ${charmName} in stock right now, so you can't add more to your basket.`);
        setInventoryType('error');
        return;
      }
      
      // Check if we can add the requested quantity of this charm
      if (maxAvailableCharm !== null && effectiveQuantity > maxAvailableCharm) {
        setInventoryMessage(`Oops! We don't have any more ${charmName} in stock right now, so you can't add more to your basket.`);
        setInventoryType('error');
        return;
      }
    }
    
    // Get the case image
    const caseImageToUse = selectedCaseImage || colorData?.image || selectedCase?.images?.[0];
    const finalCaseImage = caseImageToUse || '';
    
    // Get canvas image data URL (contains the charms/design)
    let canvasImageDataURL = null;
    if (window.getDesignImageDataURL) {
      canvasImageDataURL = window.getDesignImageDataURL();
    }
    
    // Create composite image combining case background with canvas design
    let designImage = finalCaseImage; // Fallback to case image if composite fails
    if (finalCaseImage && canvasImageDataURL) {
      try {
        designImage = await createCompositeDesignImage(finalCaseImage, canvasImageDataURL, 300, 350);
      } catch (error) {
        console.error('Error creating composite design image:', error);
        // Fallback to case image if composite creation fails
        designImage = finalCaseImage;
      }
    } else if (canvasImageDataURL) {
      // If no case image but we have canvas content, use canvas image
      designImage = canvasImageDataURL;
    }
    
    // Ensure pins have all required properties including name and category
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
    
    // Generate unique timestamp for this add-to-cart action to ensure all items are independent
    const uniqueTimestamp = Date.now();
    
    // Add items separately to cart
    // 1. Add the case (quantity times)
    const caseProduct = {
      id: `case-${uniqueTimestamp}-${Math.random().toString(36).substr(2, 9)}`, // Unique ID for this case
      name: caseName,
      caseType: selectedCaseType,
      caseName: caseName,
      color: selectedColor,
      basePrice: caseBasePrice,
      casePrice: caseBasePrice,
      totalPrice: caseBasePrice,
      price: caseBasePrice,
      image: designImage, // Use the composite design image
      designImage: designImage, // Also set designImage property for cart display
      caseImage: finalCaseImage, // Keep original case image reference
      customDesign: true, // Mark as custom design to prevent grouping
      quantity: effectiveQuantity
    };
    
    console.log('🛒 CreateYours - Adding case to cart separately:', {
      caseName: caseProduct.caseName,
      caseType: caseProduct.caseType,
      color: caseProduct.color,
      quantity: caseProduct.quantity,
      price: caseProduct.price,
      id: caseProduct.id
    });
    
    addToCart(caseProduct);
    
    // 2. Add each charm separately (quantity times for each charm)
    pinsDetails.forEach((pin, index) => {
      const charmCategory = pin.category || selectedCategory || 'colorful';
      const charmName = pin.name || 'Charm';
      const charmPrice = pin.price || 2.0;
      
      const charmProduct = {
        id: `charm-${uniqueTimestamp}-${index}-${Math.random().toString(36).substr(2, 9)}`, // Unique ID for each charm
        name: charmName,
        price: charmPrice,
        totalPrice: charmPrice,
        image: pin.src || '',
        pin: pin,
        category: charmCategory,
        type: 'charm',
        quantity: effectiveQuantity
      };
      
      console.log(`🛒 CreateYours - Adding charm ${index + 1} to cart separately:`, {
        charmName: charmProduct.name,
        category: charmProduct.category,
        quantity: charmProduct.quantity,
        price: charmProduct.price,
        id: charmProduct.id
      });
      
      addToCart(charmProduct);
    });
    
    // Log summary of what was added
    console.log('🛒 CreateYours - All items added separately to cart:', {
      case: {
        name: caseProduct.caseName,
        quantity: caseProduct.quantity,
        price: caseProduct.price
      },
      charms: pinsDetails.map((pin, idx) => ({
        charmNumber: idx + 1,
        name: pin.name,
        category: pin.category,
        quantity: effectiveQuantity,
        price: pin.price
      })),
      totalItems: 1 + pinsDetails.length, // 1 case + N charms
      totalQuantity: effectiveQuantity
    });

    // Clear canvas after successfully adding to cart
    if (window.clearCanvas) {
      window.clearCanvas();
    }
    
    // Clear selected pins state
    setSelectedPins([]);
    
    // Reset quantity to 0 after adding to cart
    setQuantity(0);
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
    // Clear charm inventory error when removing a charm
    setCharmInventoryError('');
  }, [setCharmInventoryError]);


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


  return (
    <section className={`w-full pt-4  pb-1 md:pb-8 bg-white ${isMobile ? 'h-screen fixed inset-0 overflow-hidden' : 'min-h-screen'}`}>
      <div className={`max-w-7xl mx-auto px-2 xs:px-3 sm:px-4 md:px-8 relative z-10 ${isMobile ? 'pb-40 xs:pb-44 sm:pb-48 h-full flex flex-col overflow-hidden' : 'pb-2 sm:pb-24 flex flex-col'}`}>
        {/* Close Button - Mobile only */}
        {isMobile && (
          <button
            onClick={() => navigate('/')}
            className="absolute right-2 xs:right-3 sm:right-4 z-50 w-7 h-7 xs:w-8 xs:h-8 flex items-center justify-center transition-colors"
            aria-label="Close and go back to home"
          >
            <svg className="w-12 h-12 xs:w-5 xs:h-5 mt-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        
        {/* Header Section - At the top */}
        <div className="text-center flex-shrink-0 mt-4 md:mt-6">
          <h1 className="text-title text-gray-900 tracking-title mb-1 md:mb-2">
            CREATE YOURS
          </h1>
          <div className="w-16 sm:w-20 md:w-24 h-px bg-gray-200 mx-auto mb-2 md:mb-4"></div>
          <p className="md:block hidden text-sm text-gray-500 max-w-2xl mx-auto font-light" 
             style={{fontFamily: "'Poppins', sans-serif"}}>
            Design your perfect passport case with our interactive creator
          </p>
        </div>
        
        {/* Main Content Container - Side by side on desktop */}
        <div className={`flex flex-col ${isMobile ? '' : 'md:flex-row md:gap-8 lg:gap-12'} flex-1 overflow-hidden mt-0 ${isMobile ? '' : 'md:mt-6'}`}>
          {/* Canvas Section - Mobile: Top, Desktop: Left */}
          <div className={`flex flex-col flex-shrink-0 ${isMobile ? 'flex-1 justify-center' : 'md:w-1/2 md:flex-1 md:overflow-hidden md:px-0 md:py-0'} px-2 xs:px-3 sm:px-4 py-0 xs:py-1 sm:py-2 ${
              isCaseDropdownOpen || isCharmsDropdownOpen || isAddTextDropdownOpen
                ? 'md:sticky md:top-0 md:self-start'
                : ''
            }`}>

            <div className="w-full h-full flex flex-col justify-center items-center md:justify-between">
              <div className="w-[300px] h-[350px] md:h-[350px] relative md:mt-2" style={{isolation: 'isolate'}}>
                {/* Background Case Image - Always behind canvas */}
                {selectedCaseImage && (
                  <div 
                    className="absolute inset-0 w-full h-full bg-contain bg-no-repeat"
                    style={{
                      backgroundImage: `url(${selectedCaseImage})`,
                      zIndex: 0,
                      pointerEvents: 'none',
                      backgroundSize: '270px',
                      backgroundPosition: 'center 45%',
                    }}
                    key={`case-bg-${selectedCaseType}-${selectedColor}`}
                  />
                )}
                {/* Canvas Overlay - Always on top */}
                <div className="w-full h-full absolute inset-0 " style={{zIndex: 10, pointerEvents: 'auto', width: '100%', height: '100%'}}>
                  <Canvas
                    selectedCaseType={selectedCaseType}
                    selectedColor={selectedColor}
                    onPinSelect={handlePinSelect}
                    onPinRemove={handlePinRemove}
                    products={Products}
                  />
                </div>
              </div>
              
              {/* Action Buttons - Bottom - Hidden on mobile */}
              <div className="mt-8 md:mt-8 mb-0 hidden md:flex flex-row gap-2 md:gap-2.5 lg:gap-3 flex-shrink-0 w-full max-w-full md:max-w-[480px] lg:max-w-[520px] relative z-0">
                <ViewMoreImagesButton
                  caseImages={caseImages}
                  onOpenModal={() => {
                    setShowImageModal(true);
                    setSelectedModalImage(0);
                  }}
                />
                
                <ItemDescriptionDropdown
                  selectedCase={selectedCase}
                  onOpenModal={() => setShowDescriptionModal(true)}
                />
              </div>
            </div>
            
          </div>
          
          {/* MAIN SECTION - Right Side Content */}
          <div className={`flex flex-col ${isMobile ? '' : 'md:w-1/2 md:flex-1'} gap-2 xs:gap-3 sm:gap-4 overflow-hidden`}>
            {/* Right Side - Charms Selection */}
            <div 
              className={`w-full flex flex-col space-y-4 sm:space-y-6 hide-scrollbar ${
              isCaseDropdownOpen || isCharmsDropdownOpen || isAddTextDropdownOpen
                ? 'md:max-h-none md:overflow-visible'
                : 'md:max-h-[calc(100vh-200px)] md:overflow-y-auto'
            }`}
            style={{
              scrollbarWidth: 'none', /* Firefox */
              msOverflowStyle: 'none', /* IE and Edge */
            }}
          >
            
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
            {/* Passport Case Selection - Hidden on mobile */}
            <div className={`pb-6 border-b border-gray-100 flex-shrink-0 mt-6 overflow-visible ${isMobile ? 'hidden' : ''}`}>
              <button
                onClick={() => {
                  setIsCharmsDropdownOpen(false);
                  setIsAddTextDropdownOpen(false);
                  setIsCaseDropdownOpen(!isCaseDropdownOpen);
                }}
                className="w-full flex items-center justify-between mb-4"
              >
                <h3 className="text-sm uppercase tracking-wider text-gray-900 font-medium" style={{fontFamily: "'Poppins', sans-serif"}}>
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
                    cart={cart}
                  />
                  
                  {selectedColor && (
                    <div className="mt-10 overflow-visible">
                      <ColorSelector
                        colors={selectedCase?.colors || []}
                        selectedColor={selectedColor}
                        onSelect={handleColorSelection}
                        caseType={selectedCaseType}
                        cart={cart}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Charms Selection - Hidden on mobile */}
            <div className={`pb-6 border-b border-gray-100 mt-6 ${isMobile ? 'hidden' : 'block'}`}>
              <button
                onClick={() => {
                  setIsCaseDropdownOpen(false);
                  setIsAddTextDropdownOpen(false);
                  setIsCharmsDropdownOpen(!isCharmsDropdownOpen);
                }}
                className="w-full flex items-center justify-between mb-4"
              >
                <h3 className="text-sm uppercase tracking-wider text-gray-900 font-medium" style={{fontFamily: "'Poppins', sans-serif"}}>
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
                    cart={cart}
                  />
                </div>
              )}
            </div>
            
            {/* Personalized Text - Hidden on mobile */}
            {!isMobile && (
              <div className="pb-6 border-b border-gray-100 mt-6">
                <button
                  onClick={() => {
                    setIsCaseDropdownOpen(false);
                    setIsCharmsDropdownOpen(false);
                    setIsAddTextDropdownOpen(!isAddTextDropdownOpen);
                  }}
                  className="w-full flex items-center justify-between mb-4"
                >
                  <h3 className="text-sm uppercase tracking-wider text-gray-900 font-medium" style={{fontFamily: "'Poppins', sans-serif"}}>
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
                onIncrementQuantity={handleIncrementQuantity}
                onDecrementQuantity={handleDecrementQuantity}
                quantityError={quantityError}
                charmInventoryError={charmInventoryError}
                selectedCase={selectedCase}
                selectedCaseType={selectedCaseType}
                selectedColor={selectedColor}
                selectedPins={selectedPins}
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
        </div>

        {/* Fixed Mobile Step Buttons - Above Price Summary */}
        {isMobile && (
          <div className="fixed left-0 right-0 z-0 bg-white md:hidden w-full" style={{bottom: 'calc(80px + 0.75rem)'}}>
            <div className="px-2 xs:px-3 sm:px-4 py-2 xs:py-2.5 sm:py-3 mb-0 pb-0">
              <p className="text-[14px] text-gray-700 mb-2 xs:mb-2.5 text-center font-thin" style={{fontFamily: "'Poppins', sans-serif"}}>
                Choose the options below:
              </p>
              <div className="mb-4 flex justify-center">
                <div className="grid grid-cols-4 gap-1.5 xs:gap-2 sm:gap-2.5 max-w-fit">
                  {/* Choose Case Button */}
                  <button
                    onClick={() => setMobileCurrentStep('case')}
                    className="py-2.5 flex flex-row items-center justify-center gap-1.5 xs:gap-2 transition-all duration-200 touch-manipulation bg-btn-primary-blue text-btn-primary-blue-text border border-btn-primary-blue-border hover:bg-btn-primary-blue-hover px-3 xs:px-4"
                  >
                    <FontAwesomeIcon 
                      icon={faBriefcase} 
                      className="w-4 h-4 text-btn-primary-blue-text"
                    />
                    <span className="text-sm font-medium uppercase tracking-wide leading-tight text-btn-primary-blue-text" style={{fontFamily: "'Poppins', sans-serif"}}>
                      Case
                    </span>
                  </button>

                  {/* Choose Color Button */}
                  <button
                    onClick={() => setMobileCurrentStep('color')}
                    disabled={!selectedCaseType}
                    className={`py-2.5 flex flex-row items-center justify-center gap-1.5 xs:gap-2 transition-all duration-200 touch-manipulation px-3 xs:px-4 ${
                      !selectedCaseType
                        ? 'bg-gray-50 text-gray-400 border border-gray-200 cursor-not-allowed opacity-50'
                        : 'bg-btn-primary-blue text-btn-primary-blue-text border border-btn-primary-blue-border hover:bg-btn-primary-blue-hover'
                    }`}
                  >
                    <FontAwesomeIcon 
                      icon={faPalette} 
                      className={`w-4 h-4 ${
                        !selectedCaseType 
                          ? 'text-gray-400' 
                          : 'text-btn-primary-blue-text'
                      }`}
                    />
                    <span className={`text-sm font-medium uppercase tracking-wide leading-tight ${
                      !selectedCaseType 
                        ? 'text-gray-400' 
                        : 'text-btn-primary-blue-text'
                    }`} style={{fontFamily: "'Poppins', sans-serif"}}>
                      Color
                    </span>
                  </button>

                  {/* Choose Charms Button */}
                  <button
                    onClick={() => {
                      setMobileCurrentStep('charms');
                      window.scrollTo({ 
                        top: 0, 
                        behavior: 'smooth' 
                      });
                    }}
                    disabled={!selectedCaseType || !selectedColor}
                    className={`py-2.5 flex flex-row items-center justify-center gap-1.5 xs:gap-2 transition-all duration-200 touch-manipulation px-3 xs:px-4 ${
                      !selectedCaseType || !selectedColor
                        ? 'bg-gray-50 text-gray-400 border border-gray-200 cursor-not-allowed opacity-50'
                        : 'bg-btn-primary-blue text-btn-primary-blue-text border border-btn-primary-blue-border hover:bg-btn-primary-blue-hover'
                    }`}
                  >
                    <FontAwesomeIcon 
                      icon={faPlane} 
                      className={`w-4 h-4 ${
                        !selectedCaseType || !selectedColor 
                          ? 'text-gray-400' 
                          : 'text-btn-primary-blue-text'
                      }`}
                    />
                    <span className={`text-sm font-medium uppercase tracking-wide leading-tight ${
                      !selectedCaseType || !selectedColor 
                        ? 'text-gray-400' 
                        : 'text-btn-primary-blue-text'
                    }`} style={{fontFamily: "'Poppins', sans-serif"}}>
                      Charms
                    </span>
                  </button>
                  
                  {/* Add Text Button - Mobile only */}
                  <button
                    onClick={() => {
                      setIsCaseDropdownOpen(false);
                      setIsCharmsDropdownOpen(false);
                      setIsAddTextDropdownOpen(!isAddTextDropdownOpen);
                    }}
                    className="py-2.5 flex flex-row items-center justify-center gap-1.5 xs:gap-2 transition-all duration-200 touch-manipulation bg-btn-primary-blue text-btn-primary-blue-text border border-btn-primary-blue-border hover:bg-btn-primary-blue-hover px-3 xs:px-4"
                  >
                    <FontAwesomeIcon 
                      icon={faFont} 
                      className="w-4 h-4 text-btn-primary-blue-text"
                    />
                    <span className="text-sm font-medium uppercase tracking-wide leading-tight text-btn-primary-blue-text" style={{fontFamily: "'Poppins', sans-serif"}}>
                      Text
                    </span>
                  </button>
                </div>
              </div>
              
              {/* Add Text Dropdown Content - Mobile only */}
              {isAddTextDropdownOpen && (
                <div className="px-2 xs:px-3 sm:px-4 space-y-2 pt-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={customText}
                        onChange={(e) => {
                          setCustomText(e.target.value);
                          setCustomTextError('');
                          setCustomTextAdded(false);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && customText.trim()) {
                            handleMobileAddText();
                          }
                        }}
                        placeholder="e.g. Your name"
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 bg-white text-gray-900 placeholder-gray-400 font-thin text-sm font-inter"
                        style={{ fontSize: '16px' }}
                        maxLength={MAX_TEXT_LENGTH}
                      />
                      <button
                        onClick={handleMobileAddText}
                        disabled={!customText.trim()}
                        className="px-4 py-2 text-xs font-medium uppercase tracking-wider disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed disabled:border-gray-100 rounded-sm active:scale-95 disabled:scale-100 focus:outline-none font-inter bg-btn-light-blue hover:bg-btn-light-blue-hover text-btn-light-blue-text border border-btn-light-blue-border hover:border-btn-light-blue-hover transition-all duration-200"
                      >
                        Add
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 font-inter">
                      Up to {MAX_TEXT_LENGTH} characters. Double-click the text on the case to edit or move it.
                    </p>
                    {customTextError && (
                      <div className="text-xs text-gray-600 border border-gray-200 bg-gray-50 px-3 py-2 rounded">
                        {customTextError}
                      </div>
                    )}
                    {customTextAdded && (
                      <div className="text-xs text-green-700  bg-green-50 px-1  py-2 ">
                        Text added to your design! You can drag it to reposition it.
                      </div>
                    )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Fixed Price Summary - Mobile only */}
        {isMobile && (
          <div className="fixed left-0 right-0 z-40 bg-gray-100 border-t border-gray-200 shadow-lg md:hidden max-h-[50vh] xs:max-h-[45vh] overflow-y-auto w-full safe-area-inset-bottom" style={{bottom: '0', paddingBottom: 'calc(env(safe-area-inset-bottom) + 0.75rem)'}}>
            <div className="px-2 xs:px-2.5 sm:px-3 py-1.5 xs:py-2 sm:py-2.5">
              <PriceSummary
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
                inventoryMessage={inventoryMessage}
                inventoryType={inventoryType}
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

        {/* Item Description Modal */}
        <ItemDescriptionModal
          show={showDescriptionModal}
          onClose={() => setShowDescriptionModal(false)}
          selectedCase={selectedCase}
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