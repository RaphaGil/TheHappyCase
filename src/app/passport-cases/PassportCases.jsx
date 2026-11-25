'use client';

import React from 'react';
import PageHeader from '../../component/Shared/PageHeader';
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
  } = usePassportCases();

  // Show loading state only until case data is ready (inventory loads in background)
  if (!selectedCase || !selectedCase.images || selectedCase.images.length === 0) {
    return <LoadingState />;
  }


  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="Passport cases"
        crumbs={[{ href: '/', label: 'Home' }, { href: '/passport-cases', label: 'Passport cases' }]}
        subtitle="Three styles, lots of colours. Personalise yours with charms and your name."
      />
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-10">

        <CaseTypeTabs
          cases={productsWithQuantities.cases}
          selectedCaseType={selectedCaseType}
          onCaseTypeChange={handleCaseTypeChange}
          isCaseTypeSoldOut={isCaseTypeSoldOut}
          getCaseDisplayName={getCaseDisplayName}
        />

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 mb-16 items-start">
          {/* Left Side - Image Gallery */}
          <ImageGallery
            currentImage={currentImage}
            detailImages={detailImages}
            selectedDetailImage={selectedDetailImage}
            selectedCase={selectedCase}
            isSelectedColorSoldOut={isSelectedColorSoldOut}
            onDetailImageClick={handleDetailImageClick}
          />

          {/* Right Side - Details and Selection (Color + Specs before price summary) */}
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-h2 text-[#30279f]">
                {getCaseDisplayName(selectedCaseType)}
              </h2>
              <p className="mt-2 text-2xl font-semibold text-gray-900 font-inter">
                £{Number(selectedCase.basePrice).toFixed(2)}
              </p>
            </div>

            <ColorSelection
              colors={selectedCase.colors}
              selectedColor={selectedColor}
              onColorChange={handleColorChange}
              isColorSoldOut={isColorSoldOut}
              getColorName={getColorName}
            />

            <PriceAndCTA
              showPrice={false}
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

            <ProductInfo specifications={selectedCase.specifications} />
            <SpecificationsDropdown
              specifications={selectedCase.specifications}
              isOpen={isSpecificationsOpen}
              onToggle={() => setIsSpecificationsOpen(!isSpecificationsOpen)}
            />

          </div>
        </div>
      </div>
    </div>
  );
};

export default PassportCases;
