import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import Products from '../../products.json';
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

  const selectedCase = Products.cases.find(c => c.type === selectedCaseType);
  
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
          <h1 className="text-2xl font-light text-gray-900 mb-4" style={{fontFamily: "'Poppins', sans-serif"}}>Loading...</h1>
          <p className="text-gray-500" style={{fontFamily: "'Poppins', sans-serif"}}>Please wait while we load the passport cases.</p>
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
        '/TheHappyCase/images/BusinessClassCase/businessclassinside.png',
        '/TheHappyCase/images/BusinessClassCase/businessclassinside2.png'
      ];
    } else if (selectedCaseType === 'firstclass') {
      detailImages = [
        '/TheHappyCase/images/FirstClassCase/firstclassinside.jpg',
        '/TheHappyCase/images/FirstClassCase/firstclassinside1.jpg',
        '/TheHappyCase/images/FirstClassCase/firstclassinside2.jpg',
        '/TheHappyCase/images/FirstClassCase/firstclassinside3.jpg'
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
    const caseData = Products.cases.find(c => c.type === type);
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-3xl font-light text-gray-900 mb-2" style={{fontFamily: "'Poppins', sans-serif", letterSpacing: '0.05em'}}>
            PASSPORT CASES
          </h1>
          <div className="w-16 h-px bg-gray-300 mx-auto"></div>
        </div>

        {/* Case Type Selection - Minimalist Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-1 border-b border-gray-200">
            {Products.cases.map((caseItem) => (
              <button
                key={caseItem.type}
                onClick={() => handleCaseTypeChange(caseItem.type)}
                className={`px-6 py-3 text-xs uppercase tracking-wider transition-all duration-200 ${
                  selectedCaseType === caseItem.type
                    ? 'border-b-2 border-gray-900 text-gray-900 font-medium'
                    : 'border-b-2 border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
                }`}
                style={{fontFamily: "'Poppins', sans-serif"}}
              >
                {getCaseDisplayName(caseItem.type)}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 mb-16">
          
          {/* Left Side - Image Gallery */}
          <div className="">
            <div className="text-center mb-6">
              {/* <h2 className="text-2xl font-light text-gray-900 mb-2" style={{fontFamily: "'Poppins', sans-serif"}}>
                {selectedCase.name}
              </h2> */}
            </div>
              
            {/* Main Image Display */}
            <div className="relative group">
              <div className="relative overflow-hidden bg-gray-50 border border-gray-100 ">
                <img
                  src={currentImage}
                  alt={`${selectedCase.name} - View ${currentImageIndex + 1}`}
                  className="w-full h-[300px] lg:h-[400px] xl:h-[500px] object-contain transition-opacity duration-200"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    if (e.target.nextSibling) {
                      e.target.nextSibling.style.display = 'flex';
                    }
                  }}
                />
                <div className="hidden w-full h-[300px] lg:h-[400px] xl:h-[500px] items-center justify-center text-gray-400 bg-gray-50">
                  <div className="text-center">
                    <p className="text-gray-500" style={{fontFamily: "'Poppins', sans-serif"}}>Image not available</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Detail Images Gallery */}
            <div className="mt-6">
           
              <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-4">
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
          <div className="space-y-8">
            
            {/* Color Selection */}
            <div className="border-b border-gray-100 pb-8 mt-6">
              <h3 className="text-sm uppercase tracking-wider text-gray-900 mb-4 font-medium" style={{fontFamily: "'Poppins', sans-serif"}}>Colours Available</h3>
              <div className="grid grid-cols-8 gap-1">
                {selectedCase.colors.map((colorOption, index) => (
                  <button
                    key={index}
                    onClick={() => handleColorChange(colorOption.color)}
                    className={`md:w-8 md:h-8 w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                      selectedColor === colorOption.color
                        ? 'border-gray-900 ring-2 ring-gray-300 scale-110'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                    style={{ backgroundColor: colorOption.color }}
                    title={`Color ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Specifications - Dropdown */}
            {selectedCase.specifications && (
              <div className="border-b border-gray-100 pb-8">
                <button
                  onClick={() => setIsSpecificationsOpen(!isSpecificationsOpen)}
                  className="w-full flex items-center justify-between py-2 text-sm uppercase tracking-wider text-gray-900 font-medium hover:text-gray-700 transition-colors"
                  style={{fontFamily: "'Poppins', sans-serif"}}
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
                        <span className="text-sm text-gray-500" style={{fontFamily: "'Poppins', sans-serif"}}>Dimensions</span>
                        <span className="text-sm text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>{selectedCase.specifications.dimensions}</span>
                      </div>
                    )}
                    {selectedCase.specifications.weight && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-50">
                        <span className="text-sm text-gray-500" style={{fontFamily: "'Poppins', sans-serif"}}>Weight</span>
                        <span className="text-sm text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>{selectedCase.specifications.weight}</span>
                      </div>
                    )}
                    {selectedCase.specifications.material && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-50">
                        <span className="text-sm text-gray-500" style={{fontFamily: "'Poppins', sans-serif"}}>Material</span>
                        <span className="text-sm text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>{selectedCase.specifications.material}</span>
                      </div>
                    )}
                    {selectedCase.specifications.closure && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-50">
                        <span className="text-sm text-gray-500" style={{fontFamily: "'Poppins', sans-serif"}}>Closure</span>
                        <span className="text-sm text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>{selectedCase.specifications.closure}</span>
                      </div>
                    )}
                    {selectedCase.specifications.cardSlots && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-50">
                        <span className="text-sm text-gray-500" style={{fontFamily: "'Poppins', sans-serif"}}>Card Slots</span>
                        <span className="text-sm text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>{selectedCase.specifications.cardSlots}</span>
                      </div>
                    )}
                    {selectedCase.specifications.interior && (
                      <div className="flex justify-between items-start py-2 border-b border-gray-50">
                        <span className="text-sm text-gray-500" style={{fontFamily: "'Poppins', sans-serif"}}>Interior</span>
                        <span className="text-sm text-gray-900 text-right" style={{fontFamily: "'Poppins', sans-serif"}}>{selectedCase.specifications.interior}</span>
                      </div>
                    )}
                    {selectedCase.specifications.rfid && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-50">
                        <span className="text-sm text-gray-500" style={{fontFamily: "'Poppins', sans-serif"}}>RFID Protection</span>
                        <span className="text-sm text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>{selectedCase.specifications.rfid}</span>
                      </div>
                    )}
                    {selectedCase.specifications.features && (
                      <div className="flex justify-between items-start py-2 border-b border-gray-50">
                        <span className="text-sm text-gray-500" style={{fontFamily: "'Poppins', sans-serif"}}>Features</span>
                        <span className="text-sm text-gray-900 text-right" style={{fontFamily: "'Poppins', sans-serif"}}>{selectedCase.specifications.features}</span>
                      </div>
                    )}
                    {selectedCase.specifications.passportCapacity && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-50">
                        <span className="text-sm text-gray-500" style={{fontFamily: "'Poppins', sans-serif"}}>Capacity</span>
                        <span className="text-sm text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>{selectedCase.specifications.passportCapacity}</span>
                      </div>
                    )}
                    {selectedCase.specifications.care && (
                      <div className="flex justify-between items-start py-2 border-b border-gray-50">
                        <span className="text-sm text-gray-500" style={{fontFamily: "'Poppins', sans-serif"}}>Care Instructions</span>
                        <span className="text-sm text-gray-900 text-right" style={{fontFamily: "'Poppins', sans-serif"}}>{selectedCase.specifications.care}</span>
                      </div>
                    )}
                    {selectedCase.specifications.warranty && (
                      <div className="flex justify-between items-center py-2">
                        <span className="text-sm text-gray-500" style={{fontFamily: "'Poppins', sans-serif"}}>Warranty</span>
                        <span className="text-sm text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>{selectedCase.specifications.warranty}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Price and CTA */}
            <div className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-light text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>£{selectedCase.basePrice.toFixed(2)}</span>
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
                  onAdd={handleAddToCart}
                  className="bg-green-600 hover:bg-green-700 text-white border-green-600 hover:border-green-700"
                />
                <button
                  onClick={() => {
                    // Navigate to CreateYours with selected case and color
                    navigate(`/CreateYours?case=${selectedCaseType}&color=${selectedColor}`);
                  }}
                  className="w-full py-3 text-xs uppercase tracking-wider text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-400 transition-all duration-200"
                  style={{fontFamily: "'Poppins', sans-serif"}}
                >
                  Customize This Case
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* All Cases Overview */}
        <div className="mt-24 pt-16 border-t border-gray-100">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-2" style={{fontFamily: "'Poppins', sans-serif", letterSpacing: '0.05em'}}>
              All Collections
            </h2>
            <div className="w-16 h-px bg-gray-300 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Products.cases.map((caseItem) => (
              <div
                key={caseItem.type}
                className="text-center cursor-pointer group border border-gray-100 hover:border-gray-300 transition-all duration-200 p-6"
                onClick={() => handleCaseTypeChange(caseItem.type)}
              >
                <div className="relative mb-6">
                  <div className="w-40 h-40 mx-auto bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden">
                    <img
                      src={caseItem.images[0]}
                      alt={caseItem.name}
                      className="w-full h-full object-contain p-4 transition-opacity duration-200 group-hover:opacity-80"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        if (e.target.nextSibling) {
                          e.target.nextSibling.style.display = 'flex';
                        }
                      }}
                    />
                    <div className="hidden w-full h-full items-center justify-center text-gray-400">
                      <span className="text-4xl">📱</span>
                    </div>
                  </div>
                  {selectedCaseType === caseItem.type && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
                
                <h3 className="text-lg font-light text-gray-900 mb-4" style={{fontFamily: "'Poppins', sans-serif"}}>
                  {getCaseDisplayName(caseItem.type)}
                </h3>
                
                <div className="text-xs text-gray-500 space-y-2 mb-4">
                  <div className="flex justify-between items-center py-1 border-b border-gray-50">
                    <span style={{fontFamily: "'Poppins', sans-serif"}}>Colors:</span>
                    <span className="text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>{caseItem.colors.length} options</span>
                  </div>
                  {caseItem.specifications?.material && (
                    <div className="flex justify-between items-center py-1 border-b border-gray-50">
                      <span style={{fontFamily: "'Poppins', sans-serif"}}>Material:</span>
                      <span className="text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>{caseItem.specifications.material}</span>
                    </div>
                  )}
                  {caseItem.specifications?.dimensions && (
                    <div className="flex justify-between items-center py-1 border-b border-gray-50">
                      <span style={{fontFamily: "'Poppins', sans-serif"}}>Dimensions:</span>
                      <span className="text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>{caseItem.specifications.dimensions}</span>
                    </div>
                  )}
                  {caseItem.specifications?.cardSlots && (
                    <div className="flex justify-between items-center py-1 border-b border-gray-50">
                      <span style={{fontFamily: "'Poppins', sans-serif"}}>Card Slots:</span>
                      <span className="text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>{caseItem.specifications.cardSlots}</span>
                    </div>
                  )}
                  {caseItem.specifications?.rfid && (
                    <div className="flex justify-between items-center py-1">
                      <span style={{fontFamily: "'Poppins', sans-serif"}}>RFID:</span>
                      <span className="text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>{caseItem.specifications.rfid}</span>
                    </div>
                  )}
                </div>
                
                <div className="text-xl font-light text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>
                  £{caseItem.basePrice.toFixed(2)}
                </div>
              </div>
            ))}
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
