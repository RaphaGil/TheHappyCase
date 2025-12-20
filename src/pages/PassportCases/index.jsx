import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import Products from '../../data/products.json';
import { useCart } from '../../context/CartContext';
import AddToCartBtn from '../../component/AddToCartBtn';
import { getMaxAvailableQuantity } from '../../utils/inventory';

const PassportCases = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const filterParam = searchParams.get('filter');
  const { addToCart, cart } = useCart();
  
  // Map filter values to case types
  const filterToType = {
    'economy': 'economy',
    'business': 'business',
    'firstclass': 'firstclass',
    'first-class': 'firstclass',
    'business-class': 'business',
    'economy-class': 'economy'
  };
  
  const initialCaseType = filterParam && filterToType[filterParam.toLowerCase()] 
    ? filterToType[filterParam.toLowerCase()] 
    : 'economy';
  
  const [selectedCaseType, setSelectedCaseType] = useState(initialCaseType);
  const [selectedColor, setSelectedColor] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDetailImage, setSelectedDetailImage] = useState(null);
  const [isSpecificationsOpen, setIsSpecificationsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [quantityError, setQuantityError] = useState('');

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
  const selectedCase = productsWithQuantities.cases.find(c => c.type === selectedCaseType);
  
  // Helper function to check if selected color is sold out (considering cart inventory)
  const isSelectedColorSoldOut = () => {
    if (!selectedCase || !selectedColor) return false;
    
    // Check available inventory considering cart (items in basket)
    // getMaxAvailableQuantity returns how many MORE can be added to the basket
    const productForInventory = {
      caseType: selectedCaseType,
      color: selectedColor,
    };
    const maxAvailable = getMaxAvailableQuantity(productForInventory, cart);
    
    // If maxAvailable === 0, no more can be added (all in basket or sold out) - SOLD OUT
    // If maxAvailable is null (unlimited) or > 0, color is available
    return maxAvailable !== null && maxAvailable === 0;
  };
  
  // Helper function to check if a specific color is sold out (considering cart inventory)
  const isColorSoldOut = (color) => {
    if (!selectedCase || !color) return false;
    
    // Check available inventory considering cart (items in basket)
    const productForInventory = {
      caseType: selectedCaseType,
      color: color,
    };
    const maxAvailable = getMaxAvailableQuantity(productForInventory, cart);
    
    // If maxAvailable === 0, no more can be added (all in basket or sold out) - SOLD OUT
    // If maxAvailable is null (unlimited) or > 0, color is available
    return maxAvailable !== null && maxAvailable === 0;
  };
  
  // Helper function to check if a case type is sold out (all colors sold out or case-level quantity is 0)
  const isCaseTypeSoldOut = (caseType) => {
    // Get fresh data from products
    const caseData = Products.cases.find(c => c.type === caseType);
    if (!caseData) return false;
    
    // Note: We check inventory through getMaxAvailableQuantity below
    // which properly handles localStorage quantities, product data, and cart items
    // to determine if cases can be added to the basket
    
    // Check if all colors are sold out (considering cart inventory)
    // This uses getMaxAvailableQuantity which checks both color-level and case-level quantities
    if (caseData.colors && caseData.colors.length > 0) {
      // Check if at least one color has available inventory that can be added to basket
      // This considers items already in the basket/cart
      const hasAvailableColor = caseData.colors.some(color => {
        // Check available inventory considering cart (items in basket)
        // getMaxAvailableQuantity returns how many MORE can be added to the basket
        // It checks: color-level quantity -> case-level quantity -> product data
        // Returns: null (unlimited), > 0 (can add more), or 0 (cannot add any more)
        const productForInventory = {
          caseType: caseType,
          color: color.color,
        };
        const maxAvailable = getMaxAvailableQuantity(productForInventory, cart);
        
        // If maxAvailable is null, it means unlimited inventory (can add to basket)
        // If maxAvailable > 0, there's inventory available (can add to basket)
        // If maxAvailable === 0, no more can be added (all in basket or sold out) - SOLD OUT
        return maxAvailable === null || maxAvailable > 0;
      });
      
      // If no color has available inventory (maxAvailable === 0 for all colors), 
      // it means no cases can be added to the basket - show as SOLD OUT
      return !hasAvailableColor;
    }
    
    return false;
  };
  
  // Function to format case type to display name
  const getCaseDisplayName = (caseType) => {
    const caseTypeMap = {
      'economy': 'Economy Class',
      'business': 'Business Class',
      'firstclass': 'First Class'
    };
    return caseTypeMap[caseType] || caseType;
  };

  // Helper function to get color name from image filename
  const getColorName = (image) => {
    if (!image) return '';
    
    const filename = image.split('/').pop().replace('.png', '').replace('.jpg', '').toLowerCase();
    
    // Remove case type prefixes
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
    
    // Format the color name
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
  
  // Update case type when filter param changes
  useEffect(() => {
    if (filterParam && filterToType[filterParam.toLowerCase()]) {
      const newType = filterToType[filterParam.toLowerCase()];
      setSelectedCaseType(newType);
    }
  }, [filterParam]); // eslint-disable-line react-hooks/exhaustive-deps
  
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
  
  if (!selectedCase || !selectedCase.images || selectedCase.images.length === 0) {
    return (
      <div className="min-h-screen bg-white py-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light text-gray-900 mb-4 font-inter">Loading...</h1>
          <p className="text-gray-500 font-inter">Please wait while we load the passport cases.</p>
        </div>
      </div>
    );
  }

  // Get the image for the selected color
  const selectedColorData = selectedCase.colors.find(c => c.color === selectedColor);
  const currentImage = selectedDetailImage || selectedColorData?.image || selectedCase.images[currentImageIndex] || selectedCase.images[0];
  
  // Get detail images from SmartCase folder (same as CreateYours page)
  const getDetailImagesForColor = () => {
    // Get the main color image
    const colorImage = selectedColorData?.image || selectedCase.images[0] || '';
    
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
  
  const detailImages = getDetailImagesForColor();

  const handleCaseTypeChange = (type) => {
    // Prevent selecting sold out case types
    if (isCaseTypeSoldOut(type)) {
      return;
    }
    
    setSelectedCaseType(type);
    setCurrentImageIndex(0);
    setSelectedDetailImage(null); // Reset detail image when case type changes
    setQuantity(1); // Reset quantity when case type changes
    // Update URL with filter parameter
    const typeToFilter = {
      'economy': 'economy',
      'business': 'business',
      'firstclass': 'firstclass'
    };
    const filterValue = typeToFilter[type] || 'economy';
    setSearchParams({ filter: filterValue });
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
    setCurrentImageIndex(0); // Reset image index when color changes
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
      const itemName = currentCase?.name || getCaseDisplayName(selectedCaseType);
      
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


  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-title text-gray-900 tracking-title mb-1 md:mb-2">
            PASSPORT CASES
          </h1>
          <div className="w-16 sm:w-20 md:w-24 h-px bg-gray-200 mx-auto mb-4"></div>
        </div>

        {/* Case Type Selection - Minimalist Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-1 border-b border-gray-200">
            {productsWithQuantities.cases.map((caseItem) => {
              const isSoldOut = isCaseTypeSoldOut(caseItem.type);
              return (
                <button
                  key={caseItem.type}
                  onClick={() => handleCaseTypeChange(caseItem.type)}
                  disabled={isSoldOut}
                  className={`px-6 py-3 text-xs uppercase tracking-wider transition-all duration-200 relative ${
                    selectedCaseType === caseItem.type
                      ? 'border-b-2 border-blue-700 text-white bg-blue-600 font-medium'
                      : 'border-b-2 border-transparent text-white hover:text-white hover:border-blue-300 hover:bg-blue-500 bg-blue-400'
                  } ${isSoldOut ? 'opacity-60 cursor-not-allowed' : ''} font-inter`}
                >
                  <span className="flex items-center gap-2">
                    {getCaseDisplayName(caseItem.type)}
                    {isSoldOut && (
                      <span className="text-[10px] text-red-300 font-semibold bg-red-900 px-1.5 py-0.5 rounded">SOLD OUT</span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-16">
          
          {/* Left Side - Image Gallery */}
          <div className="">
            <div className="text-center mb-6">
              {/* <h2 className="text-2xl font-light text-gray-900 mb-2 font-inter">
                {selectedCase.name}
              </h2> */}
            </div>
              
            {/* Main Image Display */}
            <div className="relative group">
              <div 
                className={`relative overflow-hidden ${isSelectedColorSoldOut() ? 'pointer-events-none cursor-not-allowed' : ''}`}
                onClick={(e) => {
                  // Prevent any action when clicking on sold out images
                  if (isSelectedColorSoldOut()) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                  }
                }}
              >
                <img
                  src={currentImage}
                  alt={`${selectedCase.name} - View ${currentImageIndex + 1}`}
                  className={`w-full h-[300px] lg:h-[400px] xl:h-[500px] object-contain transition-opacity duration-200 ${isSelectedColorSoldOut() ? 'opacity-50 pointer-events-none cursor-not-allowed' : ''}`}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  width="500"
                  height="500"
                  onClick={(e) => {
                    // Prevent any action when clicking on sold out images
                    if (isSelectedColorSoldOut()) {
                      e.preventDefault();
                      e.stopPropagation();
                      return false;
                    }
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    if (e.target.nextSibling) {
                      e.target.nextSibling.style.display = 'flex';
                    }
                  }}
                />
                <div className="hidden w-full h-[300px] lg:h-[400px] xl:h-[500px] items-center justify-center text-gray-400 bg-gray-50">
                  <div className="text-center">
                    <p className="text-gray-500 font-inter">Image not available</p>
                  </div>
                </div>
                {/* Sold Out Overlay */}
                {isSelectedColorSoldOut() && (
                  <div 
                    className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-20 pointer-events-none"
                  >
                    <span className="text-white text-2xl font-medium uppercase tracking-wider font-inter">
                      Sold Out
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Detail Images Gallery */}
            <div className="mt-3">
           
              <div className="grid grid-cols-5 sm:grid-cols-4 lg:grid-cols-7  gap-2">
                {detailImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => handleDetailImageClick(image)}
                    disabled={isSelectedColorSoldOut()}
                    className={`relative aspect-square overflow-hidden bg-gray-50 border transition-all duration-200 max-w-[80px] mx-auto ${
                      selectedDetailImage === image || (!selectedDetailImage && index === 0 && currentImage === image)
                        ? 'border-gray-900 ring-2 ring-gray-300'
                        : 'border-gray-200 hover:border-gray-400'
                    } ${isSelectedColorSoldOut() ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <img
                      src={image}
                      alt={`${selectedCase.name} - Detail ${index + 1}`}
                      className="w-full h-full object-contain"
                      loading="lazy"
                      fetchPriority="low"
                      decoding="async"
                      width="80"
                      height="80"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        if (e.target.nextSibling) {
                          e.target.nextSibling.style.display = 'flex';
                        }
                      }}
                    />
                    <div className="hidden w-full h-full items-center justify-center text-gray-300">
                      <span className="text-2xl">📷</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Details and Selection */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            
            {/* Color Selection */}
            <div className="border-b border-gray-100 pb-4 sm:pb-6 mt-3">
              <h3 className="text-sm uppercase tracking-wider text-gray-900 mb-3 font-medium font-inter">Colours Available</h3>
              <div className="grid grid-cols-11 sm:grid-cols-7 md:grid-cols-8 gap-0.5 sm:gap-1.5 md:gap-2">
                {selectedCase.colors.map((colorOption, index) => {
                  const colorSoldOut = isColorSoldOut(colorOption.color);
                  return (
                    <div key={index} className="flex flex-col items-center sm:gap-1">
                      <button
                        onClick={() => {
                          if (!colorSoldOut) {
                            handleColorChange(colorOption.color);
                          }
                        }}
                        disabled={colorSoldOut}
                        className={`w-8 h-8 rounded-full border-2 transition-all duration-200 relative ${
                          selectedColor === colorOption.color
                            ? 'border-gray-900 ring-2 ring-gray-300 scale-110'
                            : 'border-gray-200 hover:border-gray-400'
                        } ${colorSoldOut ? 'opacity-50 cursor-not-allowed' : ''}`}
                        style={{ backgroundColor: colorOption.color }}
                        title={colorSoldOut ? 'Sold Out' : `Color ${index + 1}`}
                      />
                      {colorSoldOut && (
                        <span className="text-[9px] text-red-600 font-medium text-center">Sold Out</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Specifications - Dropdown */}
            {selectedCase.specifications && (
              <div className="border-b border-gray-100 pb-8">
                <button
                  onClick={() => setIsSpecificationsOpen(!isSpecificationsOpen)}
                  className="w-full flex items-center justify-between py-2 text-sm uppercase tracking-wider text-gray-900 font-medium hover:text-gray-700 transition-colors font-inter"
                >
                  <span>Specifications</span>
                  <FontAwesomeIcon 
                    icon={isSpecificationsOpen ? faChevronUp : faChevronDown} 
                    className="text-xs transition-transform duration-200"
                  />
                </button>
                {isSpecificationsOpen && (
                  <div className="flex flex-col gap-3 mt-4">
                    {selectedCase.specifications.dimensions && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-50">
                        <span className="text-sm text-gray-500 font-inter">Dimensions</span>
                        <span className="text-sm text-gray-900 font-inter">{selectedCase.specifications.dimensions}</span>
                      </div>
                    )}
                    {selectedCase.specifications.weight && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-50">
                        <span className="text-sm text-gray-500 font-inter">Weight</span>
                        <span className="text-sm text-gray-900 font-inter">{selectedCase.specifications.weight}</span>
                      </div>
                    )}
                    {selectedCase.specifications.material && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-50">
                        <span className="text-sm text-gray-500 font-inter">Material</span>
                        <span className="text-sm text-gray-900 font-inter">{selectedCase.specifications.material}</span>
                      </div>
                    )}
                    {selectedCase.specifications.closure && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-50">
                        <span className="text-sm text-gray-500 font-inter">Closure</span>
                        <span className="text-sm text-gray-900 font-inter">{selectedCase.specifications.closure}</span>
                      </div>
                    )}
                    {selectedCase.specifications.cardSlots && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-50">
                        <span className="text-sm text-gray-500 font-inter">Card Slots</span>
                        <span className="text-sm text-gray-900 font-inter">{selectedCase.specifications.cardSlots}</span>
                      </div>
                    )}
                    {selectedCase.specifications.interior && (
                      <div className="flex justify-between items-start py-2 border-b border-gray-50">
                        <span className="text-sm text-gray-500 font-inter">Interior</span>
                        <span className="text-sm text-gray-900 text-right font-inter">{selectedCase.specifications.interior}</span>
                      </div>
                    )}
                    {selectedCase.specifications.rfid && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-50">
                        <span className="text-sm text-gray-500 font-inter">RFID Protection</span>
                        <span className="text-sm text-gray-900 font-inter">{selectedCase.specifications.rfid}</span>
                      </div>
                    )}
                    {selectedCase.specifications.features && (
                      <div className="flex justify-between items-start py-2 border-b border-gray-50">
                        <span className="text-sm text-gray-500 font-inter">Features</span>
                        <span className="text-sm text-gray-900 text-right font-inter">{selectedCase.specifications.features}</span>
                      </div>
                    )}
                    {selectedCase.specifications.passportCapacity && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-50">
                        <span className="text-sm text-gray-500 font-inter">Capacity</span>
                        <span className="text-sm text-gray-900 font-inter">{selectedCase.specifications.passportCapacity}</span>
                      </div>
                    )}
                    {selectedCase.specifications.care && (
                      <div className="flex justify-between items-start py-2 border-b border-gray-50">
                        <span className="text-sm text-gray-500 font-inter">Care Instructions</span>
                        <span className="text-sm text-gray-900 text-right font-inter">{selectedCase.specifications.care}</span>
                      </div>
                    )}
                    {selectedCase.specifications.warranty && (
                      <div className="flex justify-between items-center py-2">
                        <span className="text-sm text-gray-500 font-inter">Warranty</span>
                        <span className="text-sm text-gray-900 font-inter">{selectedCase.specifications.warranty}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Price and CTA */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-light text-gray-900 font-inter">£{selectedCase.basePrice.toFixed(2)}</span>
              </div>
              
              {/* Quantity Controls and Add to Cart */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  {/* Quantity Controls */}
                  <div className="flex items-center border border-gray-200 rounded-sm h-[42px]">
                    <button
                      onClick={handleDecrementQuantity}
                      disabled={quantity <= 1}
                      className="h-full px-3 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Decrease quantity"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="text-sm font-medium text-gray-900 text-center font-inter min-w-[2.5rem] px-3 b flex items-center justify-center h-full">
                      {quantity}
                    </span>
                  <button
                    onClick={handleIncrementQuantity}
                    className="h-full px-3 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
                    aria-label="Increase quantity"
                  >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <div className="flex-1">
                    <AddToCartBtn
                      product={{
                        name: selectedCase?.name || 'Passport Case',
                        caseType: selectedCaseType,
                        caseName: selectedCase?.name || 'Passport Case',
                        color: selectedColor,
                        basePrice: selectedCase?.basePrice || 0,
                        casePrice: selectedCase?.basePrice || 0,
                        totalPrice: selectedCase?.basePrice || 0,
                        price: selectedCase?.basePrice || 0,
                        image: currentImage,
                        caseImage: currentImage,
                        quantity: quantity
                      }}
                      disabled={isSelectedColorSoldOut()}
                      onAdd={handleAddToCart}
                      className="bg-btn-success hover:bg-btn-success-hover text-btn-success-text border border-btn-success-border hover:border-btn-success-hover transition-all duration-200"
                    />
                  </div>
                </div>
                
                {/* Inline Error Message */}
                {quantityError && (
                  <p className="text-sm text-red-600 font-inter ml-1">
                    {quantityError}
                  </p>
                )}
              </div>

              <button
                onClick={() => {
                  // Navigate to CreateYours with selected case and color
                  navigate(`/CreateYours?case=${selectedCaseType}&color=${selectedColor}`);
                }}
                className="w-full py-3 text-sm uppercase tracking-wider font-inter bg-btn-primary-blue hover:bg-btn-primary-blue-hover text-btn-primary-blue-text border border-btn-primary-blue-border hover:border-btn-primary-blue-hover transition-all duration-200"
              >
                PERSONALIZE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassportCases;
