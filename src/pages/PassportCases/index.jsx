import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import Products from '../../data/products.json';
import { useCart } from '../../context/CartContext';
import AddToCartBtn from '../../component/AddToCartBtn';
import GlueInfoModal from '../../component/GlueInfoModal';

const PassportCases = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const filterParam = searchParams.get('filter');
  const { addToCart } = useCart();
  
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
  const [showGlueModal, setShowGlueModal] = useState(false);
  const [pendingProduct, setPendingProduct] = useState(null);
  const [isSpecificationsOpen, setIsSpecificationsOpen] = useState(false);

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
  
  // Helper function to check if selected color is sold out
  const isSelectedColorSoldOut = () => {
    if (!selectedCase || !selectedColor) return false;
    const selectedColorData = selectedCase.colors.find(c => c.color === selectedColor);
    if (selectedColorData && selectedColorData.quantity !== undefined) {
      return selectedColorData.quantity === 0;
    }
    // Fallback to case-level quantity
    return selectedCase.quantity !== undefined && selectedCase.quantity === 0;
  };
  
  // Helper function to check if a case type is sold out (all colors sold out or case-level quantity is 0)
  const isCaseTypeSoldOut = (caseType) => {
    const caseData = productsWithQuantities.cases.find(c => c.type === caseType);
    if (!caseData) return false;
    
    // Check case-level quantity first
    if (caseData.quantity !== undefined && caseData.quantity === 0) {
      return true;
    }
    
    // Check if all colors are sold out
    if (caseData.colors && caseData.colors.length > 0) {
      const allColorsSoldOut = caseData.colors.every(color => 
        color.quantity !== undefined && color.quantity === 0
      );
      return allColorsSoldOut;
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
    setSelectedCaseType(type);
    setCurrentImageIndex(0);
    setSelectedDetailImage(null); // Reset detail image when case type changes
    // Update URL with filter parameter
    const typeToFilter = {
      'economy': 'economy',
      'business': 'business',
      'firstclass': 'firstclass'
    };
    const filterValue = typeToFilter[type] || 'economy';
    setSearchParams({ filter: filterValue });
    // Set first color as default
    const productsWithQuantities = getProductsWithQuantities();
    const caseData = productsWithQuantities.cases.find(c => c.type === type);
    if (caseData && caseData.colors.length > 0) {
      setSelectedColor(caseData.colors[0].color);
    }
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setCurrentImageIndex(0); // Reset image index when color changes
    setSelectedDetailImage(null); // Reset detail image when color changes
  };
  
  const handleDetailImageClick = (image) => {
    setSelectedDetailImage(image);
  };

  const handleAddToCart = (product) => {
    // Show modal first
    setPendingProduct(product);
    setShowGlueModal(true);
  };

  const handleProceedToCart = () => {
    if (!pendingProduct) return;
    
    // Ensure unique ID with timestamp
    const productWithId = {
      ...pendingProduct,
      id: `case-${selectedCaseType}-${selectedColor}-${Date.now()}`
    };
    addToCart(productWithId);
    setShowGlueModal(false);
    setPendingProduct(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-title font-light text-gray-900 mb-2 font-inter tracking-title">
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
                  className={`px-6 py-3 text-xs uppercase tracking-wider transition-all duration-200 relative ${
                    selectedCaseType === caseItem.type
                      ? 'border-b-2 border-gray-900 text-gray-900 font-medium'
                      : 'border-b-2 border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
                  } ${isSoldOut ? 'opacity-60' : ''} font-inter`}
                >
                  <span className="flex items-center gap-2">
                    {getCaseDisplayName(caseItem.type)}
                    {isSoldOut && (
                      <span className="text-[10px] text-red-600 font-medium">(Sold Out)</span>
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
              <div className="relative overflow-hidden  ">
                <img
                  src={currentImage}
                  alt={`${selectedCase.name} - View ${currentImageIndex + 1}`}
                  className={`w-full h-[300px] lg:h-[400px] xl:h-[500px] object-contain transition-opacity duration-200 ${isSelectedColorSoldOut() ? 'opacity-50' : ''}`}
                  loading="lazy"
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
                  <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-20">
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
                    className={`relative aspect-square overflow-hidden bg-gray-50 border transition-all duration-200 max-w-[80px] mx-auto ${
                      selectedDetailImage === image || (!selectedDetailImage && index === 0 && currentImage === image)
                        ? 'border-gray-900 ring-2 ring-gray-300'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${selectedCase.name} - Detail ${index + 1}`}
                      className="w-full h-full object-contain"
                      loading="lazy"
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
                  const isColorSoldOut = colorOption.quantity !== undefined && colorOption.quantity === 0;
                  return (
                    <div key={index} className="flex flex-col items-center sm:gap-1">
                      <button
                        onClick={() => handleColorChange(colorOption.color)}
                        disabled={isColorSoldOut}
                        className={`w-8 h-8 rounded-full border-2 transition-all duration-200 relative ${
                          selectedColor === colorOption.color
                            ? 'border-gray-900 ring-2 ring-gray-300 scale-110'
                            : 'border-gray-200 hover:border-gray-400'
                        } ${isColorSoldOut ? 'opacity-50 cursor-not-allowed' : ''}`}
                        style={{ backgroundColor: colorOption.color }}
                        title={isColorSoldOut ? 'Sold Out' : `Color ${index + 1}`}
                      />
                      {isColorSoldOut && (
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
              <div className="flex flex-col gap-3">
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
                    quantity: 1
                  }}
                  disabled={isSelectedColorSoldOut()}
                  onAdd={handleAddToCart}
                  className="bg-btn-success hover:bg-btn-success-hover text-btn-success-text border border-btn-success-border hover:border-btn-success-hover transition-all duration-200"
                />
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
      
      {/* Glue Info Modal */}
      <GlueInfoModal
        show={showGlueModal}
        onClose={() => {
          setShowGlueModal(false);
          setPendingProduct(null);
        }}
        onProceed={handleProceedToCart}
        productType="case"
      />
    </div>
  );
};

export default PassportCases;
