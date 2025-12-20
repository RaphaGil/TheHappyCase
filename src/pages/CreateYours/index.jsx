import React, { useEffect, useState, useCallback, useRef } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";

import Canvas from "../../component/Canvas/index.jsx";
import ColorSelector from "../../component/ColorSelector/index.jsx";
import PinSelector from "../../component/PinSelector";
import Products from "../../data/products.json";
import { useCart } from "../../context/CartContext";
import { getMaxAvailableQuantity } from "../../utils/inventory";
import { createCompositeDesignImage } from "../../component/Canvas/utils/imageExport";

// Components
import MobileStepButtons from "./components/MobileStepButtons";
import ViewMoreImagesButton from "./components/ViewMoreImagesButton";
import ItemDescriptionDropdown from "./components/ItemDescriptionDropdown";
import ItemDescriptionModal from "./components/ItemDescriptionModal";
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
  const [inventoryMessage, setInventoryMessage] = useState('');
  const [inventoryType, setInventoryType] = useState('warning');
  const [quantityError, setQuantityError] = useState('');
  const [charmInventoryError, setCharmInventoryError] = useState('');
  const caseDropdownRef = useRef(null);
  const { addToCart, cart } = useCart();

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

  // Auto-dismiss inventory message after 3 seconds
  useEffect(() => {
    if (inventoryMessage) {
      const timer = setTimeout(() => {
        setInventoryMessage('');
      }, 3000); // 3 seconds

      return () => clearTimeout(timer);
    }
  }, [inventoryMessage]);


  // Check inventory when case/color or charms change
  useEffect(() => {
    // Check case inventory
    if (selectedCaseType && selectedColor) {
      const productForInventory = {
        caseType: selectedCaseType,
        color: selectedColor,
      };
      const maxAvailable = getMaxAvailableQuantity(productForInventory, cart);
      
      // Don't show alert here - only show when clicking +/- buttons
      // Clear any existing inventory messages when case/color changes
      if (maxAvailable !== null && maxAvailable > 0) {
        // Clear message if case is in stock
        setInventoryMessage('');
      }
    }

    // Check charm inventory for selected charms
    if (selectedPins.length > 0) {
      let outOfStockCharm = null;
      
      for (const { pin } of selectedPins) {
        if (!pin) continue;
        
        const charmCategory = pin?.category || selectedCategory || 'colorful';
        const charmName = pin?.name || 'charm';
        const charmSrc = pin?.src || '';
        
        const charmProduct = {
          type: 'charm',
          category: charmCategory,
          pin: pin,
          name: charmName
        };
        
        const maxAvailableCharm = getMaxAvailableQuantity(charmProduct, cart);
        
        // Skip if no inventory limit
        if (maxAvailableCharm === null) continue;
        
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
        let charmCountInCustomDesigns = 0;
        cart.forEach(cartItem => {
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
        
        // Calculate total inventory and usage
        const totalInventory = maxAvailableCharm + standaloneCharmsInCart;
        const totalUsage = standaloneCharmsInCart + charmCountInCustomDesigns + (charmCountInDesign * quantity);
        
        // Check if charm is out of stock or would exceed inventory
        if (maxAvailableCharm === 0 || totalUsage > totalInventory) {
          outOfStockCharm = charmName;
          break; // Exit early if any charm is out of stock
        }
      }
      
      // Set or clear inventory message based on findings
      if (outOfStockCharm) {
        setInventoryMessage(`Oops! We don't have any more ${outOfStockCharm} in stock right now.`);
        setInventoryType('warning');
      } else {
        // Clear warning messages if all charms are in stock (but keep error messages from add to cart)
        setInventoryMessage(prev => {
          if (prev && prev.includes("can't add more to your basket")) {
            return prev; // Keep error messages
          }
          // Only clear if it's a warning about charms
          if (prev && !prev.includes("Passport Case") && !prev.includes("Case")) {
            return '';
          }
          return prev;
        });
      }
    } else {
      // If no charms selected, clear charm-related inventory messages (but keep error messages)
      setInventoryMessage(prev => {
        if (prev && prev.includes("can't add more to your basket")) {
          return prev; // Keep error messages
        }
        // Only clear charm warnings, not case warnings
        if (prev && !prev.includes("Passport Case") && !prev.includes("Case")) {
          return '';
        }
        return prev;
      });
    }
  }, [selectedCaseType, selectedColor, selectedPins, quantity, cart, selectedCategory, isMobile]);

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
  }, [isMobile, cart, selectedPins, selectedCategory]);

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

  // Helper function to get color name from image filename
  const getColorName = (image) => {
    if (!image) return '';
    
    const filename = image.split('/').pop().replace('.png', '').replace('.jpg', '').toLowerCase();
    
    let colorPart = filename
      .replace(/^economycase/i, '')
      .replace(/^businessclasscase/i, '')
      .replace(/^firstclasscase/i, '')
      .replace(/^smartcase/i, '')
      .replace(/^premiumcase/i, '')
      .replace(/^firstclass/i, '');
    
    const colorMap = {
      'lightpink': 'Light Pink',
      'lightblue': 'Light Blue',
      'lightbrown': 'Light Brown',
      'darkbrown': 'Dark Brown',
      'darkblue': 'Dark Blue',
      'jeansblue': 'Jeans Blue',
      'brickred': 'Brick Red',
      'navyblue': 'Navy Blue',
      'gray': 'Gray',
      'grey': 'Gray',
      'black': 'Black',
      'brown': 'Brown',
      'red': 'Red',
      'pink': 'Pink',
      'blue': 'Blue',
      'green': 'Green',
      'purple': 'Purple',
      'yellow': 'Yellow',
      'orange': 'Orange'
    };
    
    if (colorMap[colorPart]) {
      return colorMap[colorPart];
    }
    
    colorPart = colorPart
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/(dark|light|navy|jeans|brick)([a-z]+)/g, '$1 $2')
      .split(/(?=[A-Z])|(?=dark|light|navy|jeans|brick)/)
      .filter(word => word.length > 0)
      .join(' ')
      .toLowerCase()
      .split(' ')
      .map(word => {
        if (colorMap[word]) return colorMap[word];
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
    
    return colorPart || 'Color';
  };

  // Clamp quantity to max available inventory
  useEffect(() => {
    const productForInventory = {
      caseType: selectedCaseType,
      color: selectedColor,
    };
    const maxAvailable = getMaxAvailableQuantity(productForInventory, cart);
    
    if (maxAvailable !== null && quantity > maxAvailable) {
      setQuantity(maxAvailable);
    }
    // Clear error when case type or color changes
    setQuantityError('');
  }, [selectedCaseType, selectedColor, cart, quantity]);

  // Handle quantity increment with inventory check
  const handleIncrementQuantity = () => {
    const productForInventory = {
      caseType: selectedCaseType,
      color: selectedColor,
    };
    const maxAvailable = getMaxAvailableQuantity(productForInventory, cart);
    
    // Check case inventory first
    // maxAvailable is how many MORE can be added, so if it's 0 or less, or if incrementing would exceed it, we can't add any more
    if (maxAvailable !== null && (maxAvailable <= 0 || quantity + 1 > maxAvailable)) {
      // Get item name and color for error message
      const itemName = selectedCase?.name || 'Passport Case';
      const selectedColorData = selectedCase?.colors?.find(c => c.color === selectedColor);
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
        
        const getCharmCategory = () => {
          if (pin.category) return pin.category;
          if (selectedCategory) return selectedCategory;
          return 'colorful';
        };
        
        const charmCategory = getCharmCategory();
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
        
        // If no inventory limit for this charm, skip check
        if (charmMaxAvailable === null) continue;
        
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
        let charmCountInCustomDesigns = 0;
        cart.forEach(cartItem => {
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
        
        // Count how many of this charm are in the current design (per design)
        const charmCountInDesign = selectedPins.filter(p => {
          const pPin = p.pin || p;
          const pPinName = pPin.name || pPin.src;
          const pPinCategory = pPin.category || charmCategory;
          return (pPinName === charmName || pPinName === charmSrc) && 
                 pPinCategory === charmCategory;
        }).length;
        
        // Calculate total inventory and usage
        const totalInventory = charmMaxAvailable + standaloneCharmsInCart;
        // Already used: standalone + in other custom designs + in current design with current quantity
        // New usage if we increment: current usage + charmCountInDesign (one more design)
        const currentUsage = standaloneCharmsInCart + charmCountInCustomDesigns + (charmCountInDesign * quantity);
        const newUsage = currentUsage + charmCountInDesign;
        
        // Check if adding one more design would exceed inventory
        if (charmMaxAvailable === 0 || newUsage > totalInventory) {
          const errorMessage = `Oops! We don't have any more ${pin.name || 'this charm'} in stock right now, so you can't add more to your basket.`;
          setCharmInventoryError(errorMessage);
          // Show alert modal for charms when out of stock
          setInventoryMessage(errorMessage);
          setInventoryType('error');
          return;
        }
      }
    }
    
    // All checks passed, increment quantity
    setQuantity(quantity + 1);
    setQuantityError(''); // Clear error when successfully incrementing
    setCharmInventoryError(''); // Clear charm inventory error when successfully incrementing
    setInventoryMessage(''); // Clear inventory message when successfully incrementing
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
      
      return mergedProducts;
    } catch (error) {
      console.error('Error loading saved quantities:', error);
      return Products;
    }
  };

  const productsWithQuantities = getProductsWithQuantities();
  
  // Calculate total price
  const selectedCase = productsWithQuantities.cases.find(c => c.type === selectedCaseType);
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
  // Use Math.max to ensure we show price for at least 1 item (since quantity starts at 0 but displays as 1)
  const displayQuantity = Math.max(quantity, 1);
  const totalPrice = ((caseBasePrice + pinsPrice) * displayQuantity).toFixed(2);

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
        
        {/* MAIN SECTION - Canvas and Right Side */}
        <div className="flex flex-col mt-6 md:flex-row gap-2 xs:gap-3 sm:gap-4 md:gap-12 flex-1 overflow-hidden md:items-center">
          
          {/* LEFT - Design Canvas - Centered */}
          <div className={`md:w-1/2 flex flex-col flex-1 overflow-hidden px-2 xs:px-3 sm:px-4 md:px-0 py-0 xs:py-1 sm:py-2 md:py-0 order-1 md:order-1 ${
            isCaseDropdownOpen || isCharmsDropdownOpen || isAddTextDropdownOpen
              ? 'md:sticky md:top-0 md:self-start'
              : ''
          }`}>

            <div className="w-full h-full flex flex-col justify-start xs:justify-center items-center md:justify-center">
              <div className="w-[300px] h-[350px] md:h-[350px] relative mt-0 md:mt-2" style={{isolation: 'isolate'}}>
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
                    onSaveImage={handleSaveImageFunction}
                    products={Products}
                  />
                </div>
              </div>
              
              {/* Action Buttons - Bottom - Hidden on mobile */}
              <div className="mt-8 md:mt-24 mb-4 hidden md:flex flex-col lg:flex-row gap-2 xs:gap-2.5 sm:gap-3 flex-shrink-0 w-full max-w-full xs:max-w-[calc(100vw-2rem)] sm:max-w-[400px] md:max-w-[480px] relative z-0">
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
            
            {/* Save Your Design Button - Hidden for now */}
            {/* <SaveDesignButton saveImageFunction={saveImageFunction} /> */}
          </div>

          {/* Right Side - Charms Selection */}
          <div 
            className={`w-full md:w-1/2 flex flex-col space-y-4 sm:space-y-6 order-2 md:order-2 hide-scrollbar ${
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

        {/* Fixed Mobile Step Buttons - Above Price Summary */}
        {isMobile && (
          <div className="fixed left-0 right-0 z-0 bg-white md:hidden w-full" style={{bottom: 'calc(80px + 0.75rem)'}}>
            <div className="px-2 xs:px-3 sm:px-4 py-2 xs:py-2.5 sm:py-3 mb-0 pb-0">
              <p className="text-[14px] text-gray-700 mb-2 xs:mb-2.5 text-center font-thin" style={{fontFamily: "'Poppins', sans-serif"}}>
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
          <div className="fixed left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg md:hidden max-h-[50vh] xs:max-h-[45vh] overflow-y-auto w-full safe-area-inset-bottom" style={{bottom: '0', paddingBottom: 'calc(env(safe-area-inset-bottom) + 0.75rem)'}}>
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