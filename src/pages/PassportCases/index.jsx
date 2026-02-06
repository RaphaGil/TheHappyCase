import React from 'react';
import PassportCasesHeader from '../../component/PassportCases/components/PassportCasesHeader';
import LoadingState from '../../component/PassportCases/components/LoadingState';
import CaseTypeTabs from '../../component/PassportCases/components/CaseTypeTabs';
import ImageGallery from '../../component/PassportCases/components/ImageGallery';
import ColorSelection from '../../component/PassportCases/components/ColorSelection';
import SpecificationsDropdown from '../../component/PassportCases/components/SpecificationsDropdown';
import ProductInfo from '../../component/PassportCases/components/ProductInfo';
import PriceAndCTA from '../../component/PassportCases/components/PriceAndCTA';
import { usePassportCases } from '../../hooks/passportcases/usePassportCases';
import { getCaseDisplayName, getColorName } from '../../utils/passportcases/helpers';

const PassportCases = () => {
  const {
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
    setIsSpecificationsOpen,
    handleCaseTypeChange,
    handleColorChange,
    handleDetailImageClick,
    handleAddToCart,
    handleIncrementQuantity,
    handleDecrementQuantity,
    isSelectedColorSoldOut,
    isColorSoldOut,
    isCaseTypeSoldOut,
    inventoryLoaded,
  } = usePassportCases();

  // Show loading state until inventory is loaded and case data is ready
  if (!inventoryLoaded || !selectedCase || !selectedCase.images || selectedCase.images.length === 0) {
    return <LoadingState />;
    
  }


  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PassportCasesHeader />

        <CaseTypeTabs
          cases={productsWithQuantities.cases}
          selectedCaseType={selectedCaseType}
          onCaseTypeChange={handleCaseTypeChange}
          isCaseTypeSoldOut={isCaseTypeSoldOut}
          getCaseDisplayName={getCaseDisplayName}
        />

        {/* Main Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-16">
          {/* Left Side - Image Gallery */}
          <ImageGallery
            currentImage={currentImage}
            detailImages={detailImages}
            selectedDetailImage={selectedDetailImage}
            selectedCase={selectedCase}
            isSelectedColorSoldOut={isSelectedColorSoldOut}
            onDetailImageClick={handleDetailImageClick}
          />

          {/* Right Side - Details and Selection */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8 flex flex-col justify-between">
            <ColorSelection
              colors={selectedCase.colors}
              selectedColor={selectedColor}
              onColorChange={handleColorChange}
              isColorSoldOut={isColorSoldOut}
              getColorName={getColorName}
            />

            <SpecificationsDropdown
              specifications={selectedCase.specifications}
              isOpen={isSpecificationsOpen}
              onToggle={() => setIsSpecificationsOpen(!isSpecificationsOpen)}
            />

            <ProductInfo specifications={selectedCase.specifications} />

            <PriceAndCTA
              selectedCase={selectedCase}
              selectedCaseType={selectedCaseType}
              selectedColor={selectedColor}
              quantity={quantity}
              quantityError={quantityError}
              currentImage={currentImage}
              isSelectedColorSoldOut={isSelectedColorSoldOut}
              onIncrementQuantity={handleIncrementQuantity}
              onDecrementQuantity={handleDecrementQuantity}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassportCases;
