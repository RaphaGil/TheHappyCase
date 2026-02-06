import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { getMaxAvailableQuantity, getCachedInventory, refreshInventoryFromSupabase } from '../../utils/inventory';
import { normalizeImagePath } from '../../utils/imagePath';
import Products from '../../data/products.json';
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
  const [inventoryLoaded, setInventoryLoaded] = useState(false);

  const productsWithQuantities = getProductsWithQuantities();
  const selectedCase = productsWithQuantities.cases.find(c => c.type === selectedCaseType);
  
  // Initialize inventory on mount (like charms page does)
  useEffect(() => {
    const initializeInventory = async () => {
      try {
        console.log('🔄 PassportCases: Initializing inventory from Supabase...');
        const quantities = await refreshInventoryFromSupabase();
        
        if (quantities) {
          console.log('✅ PassportCases: Inventory initialized successfully');
          console.log('   Cases:', quantities.cases ? 'Loaded' : 'Unlimited');
          console.log('   Case Colors:', quantities.caseColors ? 'Loaded' : 'Unlimited');
        } else {
          console.warn('⚠️ PassportCases: Inventory fetch returned null/undefined');
        }
        
        // Verify cache is populated
        const cached = getCachedInventory();
        if (cached) {
          console.log('✅ PassportCases: Cache verified - inventory data available');
          setInventoryLoaded(true);
        } else {
          console.warn('⚠️ PassportCases: Cache is empty after fetch - inventory may not be configured');
          // Still mark as loaded to allow page to render
          setInventoryLoaded(true);
        }
      } catch (error) {
        console.error('❌ PassportCases: Error initializing inventory:', error);
        console.error('   Error details:', {
          message: error.message,
          name: error.name,
          stack: error.stack
        });
        // Mark as loaded even on error to allow page to render
        setInventoryLoaded(true);
      }
    };
    
    initializeInventory();
  }, []);
  
  // Helper functions for inventory checks (like charms page)
  const isSelectedColorSoldOut = useCallback(() => {
    return checkSelectedColorSoldOut(selectedCase, selectedCaseType, selectedColor, cart);
  }, [selectedCase, selectedCaseType, selectedColor, cart]);
  
  const isColorSoldOut = useCallback((color) => {
    return checkColorSoldOut(selectedCase, selectedCaseType, color, cart);
  }, [selectedCase, selectedCaseType, cart]);
  
  const isCaseTypeSoldOut = useCallback((caseType) => {
    return checkCaseTypeSoldOut(caseType, cart);
  }, [cart]);
  
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

  // Log inventory quantities for all passport case items (only after inventory is loaded)
  useEffect(() => {
    if (!inventoryLoaded) {
      console.log('📦 Passport Cases Inventory: Waiting for inventory to load...');
      return;
    }
    
    const quantities = getCachedInventory();
    if (quantities) {
      console.log('📦 Passport Cases Inventory Quantities:');
      console.log('=====================================');
      
      Products.cases.forEach((caseItem, caseIndex) => {
        console.log(`\n${caseItem.name} (${caseItem.type}):`);
        
        // Log case-level quantity if available
        if (quantities.cases && quantities.cases[caseIndex] !== null && quantities.cases[caseIndex] !== undefined) {
          console.log(`  Case-level quantity: ${quantities.cases[caseIndex]}`);
        } else {
          console.log(`  Case-level quantity: Unlimited`);
        }
        
        // Log color-level quantities
        if (quantities.caseColors && quantities.caseColors[caseIndex]) {
          console.log(`  Color quantities:`);
          caseItem.colors.forEach((color, colorIndex) => {
            const colorQty = quantities.caseColors[caseIndex][colorIndex];
            const productForInventory = {
              caseType: caseItem.type,
              color: color.color,
            };
            const maxAvailable = getMaxAvailableQuantity(productForInventory, cart);
            const status = maxAvailable === null ? 'Unlimited' : maxAvailable === 0 ? 'SOLD OUT' : `${maxAvailable} available`;
            console.log(`    - ${color.color}: ${colorQty !== null && colorQty !== undefined ? colorQty : 'Unlimited'} (${status})`);
          });
        } else {
          console.log(`  Color quantities: Unlimited for all colors`);
        }
      });
      
      console.log('\n=====================================');
    } else {
      console.warn('⚠️ Passport Cases Inventory: Cache is empty - inventory may not be configured in Supabase');
      console.warn('   This means all items will show as "Unlimited" stock');
    }
  }, [cart, inventoryLoaded]); // Re-log when cart changes or inventory loads
  
  // Get the image for the selected color (normalized)
  const selectedColorData = selectedCase?.colors?.find(c => c.color === selectedColor);
  const currentImage = normalizeImagePath(selectedDetailImage || selectedColorData?.image || selectedCase?.images?.[0]);
  
  // Get detail images
  const detailImages = getDetailImagesForColor(selectedCaseType, selectedColorData, selectedCase);

  const handleCaseTypeChange = (type) => {
    // Don't allow selecting sold out case types
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
    // Don't change to sold out colors
    if (isColorSoldOut(color)) {
      return;
    }
    
    const productForInventory = {
      caseType: selectedCaseType,
      color: color,
    };
    const maxAvailable = getMaxAvailableQuantity(productForInventory, cart);
    
    console.log(`🎨 Color changed - ${selectedCase?.name || 'Passport Case'} (${selectedCaseType}, ${color}):`);
    console.log(`   Max available (considering cart): ${maxAvailable === null ? 'Unlimited' : maxAvailable}`);
    
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
    // Check stock availability from Supabase inventory_items table (like charms page)
    const productForInventory = {
      caseType: selectedCaseType,
      color: selectedColor,
    };
    const maxAvailable = getMaxAvailableQuantity(productForInventory, cart);
    
    console.log(`🛒 Adding to cart - ${selectedCase?.name || 'Passport Case'} (${selectedCaseType}, ${selectedColor}):`);
    console.log(`   Requested quantity: ${quantity}`);
    console.log(`   Max available (considering cart): ${maxAvailable === null ? 'Unlimited' : maxAvailable}`);
    
    // Check if this case already exists in cart
    const existingItemIndex = cart.findIndex(item => 
      item.caseType === selectedCaseType && item.color === selectedColor
    );
    
    if (existingItemIndex !== -1) {
      // Item already in cart - check if we can add more
      if (maxAvailable === null) {
        // Unlimited stock - allow adding
        const productWithQuantity = {
          ...product,
          quantity: quantity
        };
        const productWithId = {
          ...productWithQuantity,
          id: `case-${selectedCaseType}-${selectedColor}-${Date.now()}`
        };
        addToCart(productWithId);
        return;
      }
      
      if (maxAvailable > 0) {
        // Can add more - allow adding
        const productWithQuantity = {
          ...product,
          quantity: quantity
        };
        const productWithId = {
          ...productWithQuantity,
          id: `case-${selectedCaseType}-${selectedColor}-${Date.now()}`
        };
        addToCart(productWithId);
        return;
      } else {
        // Can't add more - already at maximum qty_in_stock
        const itemName = product.caseName || product.name || 'Passport Case';
        const errorMessage = `Oops! We don't have any more ${itemName} in stock right now, so you can't add more to your basket.`;
        setQuantityError(errorMessage);
        return;
      }
    } else {
      // New item - check if we can add it
      const requestedQty = quantity;
      
      if (maxAvailable === null) {
        // Unlimited stock - allow adding
        const productWithQuantity = {
          ...product,
          quantity: quantity
        };
        const productWithId = {
          ...productWithQuantity,
          id: `case-${selectedCaseType}-${selectedColor}-${Date.now()}`
        };
        addToCart(productWithId);
        return;
      }
      
      if (maxAvailable >= requestedQty) {
        // Can add the requested quantity
        const productWithQuantity = {
          ...product,
          quantity: quantity
        };
        const productWithId = {
          ...productWithQuantity,
          id: `case-${selectedCaseType}-${selectedColor}-${Date.now()}`
        };
        addToCart(productWithId);
        return;
      } else {
        // Can't add requested quantity - show error with available amount
        const itemName = product.caseName || product.name || 'Passport Case';
        const errorMessage = `Oops! We only have ${maxAvailable} ${itemName}${maxAvailable === 1 ? '' : 's'} in stock right now.`;
        setQuantityError(errorMessage);
        return;
      }
    }
  };

  const handleIncrementQuantity = () => {
    if (isSelectedColorSoldOut()) return;
    
    const productForInventory = {
      caseType: selectedCaseType,
      color: selectedColor,
    };
    const maxAvailable = getMaxAvailableQuantity(productForInventory, cart);
    
    console.log(`➕ Increment quantity - ${selectedCase?.name || 'Passport Case'} (${selectedCaseType}, ${selectedColor}):`);
    console.log(`   Current quantity: ${quantity}`);
    console.log(`   Max available (considering cart): ${maxAvailable === null ? 'Unlimited' : maxAvailable}`);
    
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
    inventoryLoaded,
    
    // Setters
    setIsSpecificationsOpen,
    
    // Handlers
    handleCaseTypeChange,
    handleColorChange,
    handleDetailImageClick,
    handleAddToCart,
    handleIncrementQuantity,
    handleDecrementQuantity,
    
    // Inventory helpers (like charms page)
    isSelectedColorSoldOut,
    isColorSoldOut,
    isCaseTypeSoldOut,
  };
};
