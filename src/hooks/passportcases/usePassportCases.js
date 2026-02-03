import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { getMaxAvailableQuantity } from '../../utils/inventory';
import { normalizeImagePath } from '../../utils/imagePath';
import { 
  getProductsWithQuantities, 
  getDetailImagesForColor,
  getColorName,
  isSelectedColorSoldOut as checkSelectedColorSoldOut,
  isColorSoldOut as checkColorSoldOut,
  isCaseTypeSoldOut as checkCaseTypeSoldOut
} from '../../utils/passportcases/helpers';

// Map URL path parameter to internal case type
const PATH_TO_TYPE = {
  'Economy': 'economy',
  'Business': 'business',
  'FirstClass': 'firstclass',
  'economy': 'economy',
  'business': 'business',
  'firstclass': 'firstclass'
};

// Map internal case type to URL path parameter
const TYPE_TO_PATH = {
  'economy': 'Economy',
  'business': 'Business',
  'firstclass': 'FirstClass'
};

export const usePassportCases = () => {
  const { type: pathType } = useParams();
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();
  
  // Convert URL path parameter to internal case type
  const initialCaseType = pathType && PATH_TO_TYPE[pathType] 
    ? PATH_TO_TYPE[pathType] 
    : 'economy';
  
  const [selectedCaseType, setSelectedCaseType] = useState(initialCaseType);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedDetailImage, setSelectedDetailImage] = useState(null);
  const [isSpecificationsOpen, setIsSpecificationsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [quantityError, setQuantityError] = useState('');
  const [inventoryRefreshKey, setInventoryRefreshKey] = useState(0);

  // Make productsWithQuantities reactive - re-compute when inventoryRefreshKey changes
  // This ensures it updates when localStorage cache is refreshed
  // Also read timestamp directly to trigger updates
  const cacheTimestamp = typeof window !== 'undefined' 
    ? localStorage.getItem('productQuantitiesTimestamp') 
    : null;
  
  const productsWithQuantities = useMemo(() => {
    console.log('🔄 Re-computing productsWithQuantities, refreshKey:', inventoryRefreshKey, 'timestamp:', cacheTimestamp);
    return getProductsWithQuantities();
  }, [inventoryRefreshKey, cacheTimestamp]);
  
  const selectedCase = productsWithQuantities.cases.find(c => c.type === selectedCaseType);
  
  // Listen for inventory updates and refresh
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'productQuantities' || e.key === null) {
        // Inventory cache was updated, force re-render
        console.log('🔄 Storage event detected, refreshing products...');
        setInventoryRefreshKey(prev => prev + 1);
      }
    };

    // Listen for storage events (from other tabs/windows)
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom inventory update event
    const handleInventoryUpdate = (event) => {
      console.log('🔄 Inventory update event received, refreshing products...', event.detail);
      setInventoryRefreshKey(prev => prev + 1);
    };
    window.addEventListener('inventoryUpdated', handleInventoryUpdate);
    
    // Poll localStorage timestamp to catch updates (fallback for same-tab updates)
    // Storage events only fire for cross-tab updates, not same-tab
    let lastKnownTimestamp = localStorage.getItem('productQuantitiesTimestamp');
    const pollInterval = setInterval(() => {
      const currentTimestamp = localStorage.getItem('productQuantitiesTimestamp');
      if (currentTimestamp && currentTimestamp !== lastKnownTimestamp) {
        console.log('🔄 Cache timestamp changed, refreshing products...', {
          old: lastKnownTimestamp,
          new: currentTimestamp
        });
        lastKnownTimestamp = currentTimestamp;
        setInventoryRefreshKey(prev => prev + 1);
      }
    }, 2000); // Check every 2 seconds (less aggressive)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('inventoryUpdated', handleInventoryUpdate);
      clearInterval(pollInterval);
    };
  }, []);
  
  // Helper functions for inventory checks
  const isSelectedColorSoldOut = () => {
    return checkSelectedColorSoldOut(selectedCase, selectedCaseType, selectedColor, cart);
  };
  
  const isColorSoldOut = (color) => {
    return checkColorSoldOut(selectedCase, selectedCaseType, color, cart);
  };
  
  const isCaseTypeSoldOut = (caseType) => {
    return checkCaseTypeSoldOut(caseType, cart);
  };
  
  // Update case type when URL path parameter changes
  useEffect(() => {
    if (pathType && PATH_TO_TYPE[pathType]) {
      const newType = PATH_TO_TYPE[pathType];
      setSelectedCaseType(newType);
    } else if (!pathType) {
      // If no path type, default to economy
      setSelectedCaseType('economy');
    }
  }, [pathType]); // eslint-disable-line react-hooks/exhaustive-deps
  
  // Initialize selectedColor on component mount
  useEffect(() => {
    if (!selectedColor && selectedCase && selectedCase.colors && selectedCase.colors.length > 0) {
      setSelectedColor(selectedCase.colors[0].color);
    }
  }, [selectedCaseType, selectedColor, selectedCase]);

  // Clamp quantity to max available inventory
  useEffect(() => {
    if (!selectedCaseType || !selectedColor) return;
    
    const productForInventory = {
      caseType: selectedCaseType,
      color: selectedColor,
    };
    const maxAvailable = getMaxAvailableQuantity(productForInventory, cart);
    
    if (maxAvailable !== null && quantity > maxAvailable) {
      setQuantity(Math.max(1, maxAvailable));
    }
    // Clear error when case type or color changes
    setQuantityError('');
  }, [selectedCaseType, selectedColor, cart, quantity]); // eslint-disable-line react-hooks/exhaustive-deps
  
  // Get the image for the selected color (normalized)
  const selectedColorData = selectedCase?.colors?.find(c => c.color === selectedColor);
  const currentImage = normalizeImagePath(selectedDetailImage || selectedColorData?.image || selectedCase?.images?.[0]);
  
  // Get detail images
  const detailImages = getDetailImagesForColor(selectedCaseType, selectedColorData, selectedCase);

  const handleCaseTypeChange = (type) => {
    // Prevent selecting sold out case types
    if (isCaseTypeSoldOut(type)) {
      return;
    }
    
    setSelectedCaseType(type);
    setSelectedDetailImage(null); // Reset detail image when case type changes
    setQuantity(1); // Reset quantity when case type changes
    // Navigate to the new path based on the case type
    const pathType = TYPE_TO_PATH[type] || 'Economy';
    navigate(`/PassportCases/${pathType}`, { replace: true });
    // Set first available color as default (prefer non-sold-out colors)
    const productsWithQuantities = getProductsWithQuantities();
    const caseData = productsWithQuantities.cases.find(c => c.type === type);
    if (caseData && caseData.colors.length > 0) {
      // Try to find first available (not sold out) color
      const availableColor = caseData.colors.find(color => {
        const productForInventory = {
          caseType: type,
          color: color.color,
        };
        const maxAvailable = getMaxAvailableQuantity(productForInventory, cart);
        return maxAvailable === null || maxAvailable > 0;
      }) || caseData.colors[0]; // Fallback to first color if all are sold out
      
      setSelectedColor(availableColor.color);
    }
  };

  const handleColorChange = (color) => {
    // Check if the color is sold out before changing
    const colorData = selectedCase?.colors?.find(c => c.color === color);
    const isColorSoldOut = colorData?.quantity !== undefined && colorData.quantity === 0;
    
    // Don't change to sold out colors
    if (isColorSoldOut) {
      return;
    }
    
    setSelectedColor(color);
    setSelectedDetailImage(null); // Reset detail image when color changes
    setQuantity(1); // Reset quantity when color changes
  };
  
  const handleDetailImageClick = (image) => {
    // Don't allow clicking on detail images when color is sold out
    if (isSelectedColorSoldOut()) {
      return;
    }
    setSelectedDetailImage(image);
  };

  const handleAddToCart = (product) => {
    // Prevent adding sold out items
    if (isSelectedColorSoldOut()) {
      return;
    }
    
    // Add quantity to product
    const productWithQuantity = {
      ...product,
      quantity: quantity
    };
    // Ensure unique ID with timestamp
    const productWithId = {
      ...productWithQuantity,
      id: `case-${selectedCaseType}-${selectedColor}-${Date.now()}`
    };
    console.log('💼 PassportCases page - Adding case to cart:', {
      caseName: product.caseName || product.name,
      caseType: product.caseType,
      color: product.color,
      quantity: quantity,
      product: productWithId
    });
    addToCart(productWithId);
  };

  const handleIncrementQuantity = () => {
    if (isSelectedColorSoldOut()) return;
    
    const productForInventory = {
      caseType: selectedCaseType,
      color: selectedColor,
    };
    const maxAvailable = getMaxAvailableQuantity(productForInventory, cart);
    
    if (maxAvailable === null || maxAvailable > quantity) {
      setQuantity(quantity + 1);
      setQuantityError(''); // Clear error when successfully incrementing
    } else {
      // Get item name and color for the alert message
      const productsWithQuantities = getProductsWithQuantities();
      const currentCase = productsWithQuantities.cases.find(c => c.type === selectedCaseType);
      const itemName = currentCase?.name || 'Passport Case';
      
      // Get color name from selected color data
      const selectedColorData = currentCase?.colors?.find(c => c.color === selectedColor);
      const colorName = selectedColorData?.image ? getColorName(selectedColorData.image) : '';
      
      const colorText = colorName ? ` in ${colorName}` : '';
      setQuantityError(`We don't have any more ${itemName}${colorText} in stock to be added anymore.`);
    }
  };

  const handleDecrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setQuantityError(''); // Clear error when decrementing
    }
  };

  return {
    // State
    selectedCaseType,
    selectedColor,
    selectedDetailImage,
    isSpecificationsOpen,
    quantity,
    quantityError,
    productsWithQuantities,
    selectedCase,
    currentImage,
    detailImages,
    cart,
    
    // Setters
    setIsSpecificationsOpen,
    
    // Handlers
    handleCaseTypeChange,
    handleColorChange,
    handleDetailImageClick,
    handleAddToCart,
    handleIncrementQuantity,
    handleDecrementQuantity,
    
    // Helpers
    isSelectedColorSoldOut,
    isColorSoldOut,
    isCaseTypeSoldOut,
  };
};
