import React from "react";
import Products from "../../data/products.json";

// Components
import CreateYoursHeader from "../../component/CreateYours/CreateYoursHeader";
import CloseButton from "../../component/CreateYours/CloseButton";
import CanvasSection from "../../component/CreateYours/CanvasSection";
import CaseSelectionSection from "../../component/CreateYours/CaseSelectionSection";
import CharmsSelectionSection from "../../component/CreateYours/CharmsSelectionSection";
import AddTextSection from "../../component/CreateYours/AddTextSection";
import MobileOverlay from "../../component/CreateYours/MobileOverlay";
import MobileStepButtons from "../../component/CreateYours/MobileStepButtons";
import MobileAddTextSection from "../../component/CreateYours/MobileAddTextSection";
import PriceSummary from "../../component/CreateYours/PriceSummary";
import ImageModal from "../../component/ImageModal";
import ItemDescriptionModal from "../../component/CreateYours/ItemDescriptionModal";
import TermsOfUseModal from "../../component/CreateYours/TermsOfUseModal";
import AddTextModal from "../../component/CreateYours/AddTextModal";

// Hooks
import { useCreateYours } from "../../hooks/createyours/useCreateYours";


const CreateYours = () => {
  const {
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
    navigate,
  } = useCreateYours();


  return (
    <section className={`w-full pt-4 pb-1 md:pb-8 bg-white ${isMobile ? 'h-screen fixed inset-0 overflow-hidden' : 'min-h-screen'}`}>
      <div className={`max-w-7xl mx-auto px-2 xs:px-3 sm:px-4 md:px-8 relative z-10 ${isMobile ? 'pb-40 xs:pb-44 sm:pb-48 h-full flex flex-col overflow-hidden' : 'pb-2 sm:pb-24 flex flex-col'}`}>
        {/* Close Button - Mobile only */}
        {isMobile && <CloseButton onClose={() => navigate('/')} />}
        
        <CreateYoursHeader />
        
        {/* Main Content Container - Side by side on desktop */}
        <div className={`flex flex-col ${isMobile ? '' : 'md:flex-row md:gap-8 lg:gap-12'} flex-1 overflow-hidden mt-0 ${isMobile ? '' : 'md:mt-12'}`}>
          {/* Canvas Section - Mobile: Top, Desktop: Left */}
          <CanvasSection
            selectedCaseType={selectedCaseType}
            selectedColor={selectedColor}
            selectedCaseImage={selectedCaseImage}
            selectedCase={selectedCase}
            caseImages={caseImages}
            isCaseDropdownOpen={isCaseDropdownOpen}
            isCharmsDropdownOpen={isCharmsDropdownOpen}
            isAddTextDropdownOpen={isAddTextDropdownOpen}
            isMobile={isMobile}
            onPinSelect={handlePinSelect}
            onPinRemove={handlePinRemove}
            onOpenImageModal={() => {
              setShowImageModal(true);
              setSelectedModalImage(0);
            }}
            onOpenDescriptionModal={() => setShowDescriptionModal(true)}
            Products={Products}
          />
          
          {/* MAIN SECTION - Right Side Content */}
          <div className={`flex flex-col ${isMobile ? '' : 'md:w-1/2 md:flex-1'} gap-2 xs:gap-3 sm:gap-4 overflow-hidden`}>
            <div 
              className={`w-full flex flex-col space-y-4 sm:space-y-6 hide-scrollbar ${
                isCaseDropdownOpen || isCharmsDropdownOpen || isAddTextDropdownOpen
                  ? 'md:max-h-none md:overflow-visible'
                  : 'md:max-h-[calc(100vh-200px)] md:overflow-y-auto'
              }`}
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
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
              <CaseSelectionSection
                isOpen={isCaseDropdownOpen}
                onToggle={() => {
                  setIsCharmsDropdownOpen(false);
                  setIsAddTextDropdownOpen(false);
                  setIsCaseDropdownOpen(!isCaseDropdownOpen);
                }}
                selectedCaseType={selectedCaseType}
                selectedColor={selectedColor}
                selectedCase={selectedCase}
                onCaseSelect={handleCaseTypeSelection}
                onColorSelect={handleColorSelection}
                setIsCaseDropdownOpen={setIsCaseDropdownOpen}
                Products={Products}
                cart={cart}
              />

              {/* Charms Selection - Hidden on mobile */}
              <CharmsSelectionSection
                isOpen={isCharmsDropdownOpen}
                onToggle={() => {
                  setIsCaseDropdownOpen(false);
                  setIsAddTextDropdownOpen(false);
                  setIsCharmsDropdownOpen(!isCharmsDropdownOpen);
                }}
                pins={pins}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedPins={selectedPins}
                onPinSelect={handlePinSelection}
                Products={Products}
                cart={cart}
              />
            
              {/* Personalized Text - Hidden on mobile */}
              <AddTextSection
                isOpen={isAddTextDropdownOpen}
                onToggle={() => {
                  setIsCaseDropdownOpen(false);
                  setIsCharmsDropdownOpen(false);
                  setIsAddTextDropdownOpen(!isAddTextDropdownOpen);
                }}
                customText={customText}
                setCustomText={setCustomText}
                customTextError={customTextError}
                setCustomTextError={setCustomTextError}
                customTextAdded={customTextAdded}
                setCustomTextAdded={setCustomTextAdded}
              />

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
            <MobileStepButtons
              selectedCaseType={selectedCaseType}
              selectedColor={selectedColor}
              onCaseClick={() => setMobileCurrentStep('case')}
              onColorClick={() => setMobileCurrentStep('color')}
              onCharmsClick={() => {
                setMobileCurrentStep('charms');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onTextClick={() => {
                setIsCaseDropdownOpen(false);
                setIsCharmsDropdownOpen(false);
                setIsAddTextDropdownOpen(!isAddTextDropdownOpen);
              }}
              isAddTextDropdownOpen={isAddTextDropdownOpen}
            />
            
            {/* Add Text Dropdown Content - Mobile only */}
            {isAddTextDropdownOpen && (
              <MobileAddTextSection
                customText={customText}
                setCustomText={setCustomText}
                customTextError={customTextError}
                setCustomTextError={setCustomTextError}
                customTextAdded={customTextAdded}
                setCustomTextAdded={setCustomTextAdded}
                onAddText={handleMobileAddText}
              />
            )}
          </div>
        </div>
      )}

        {/* Fixed Price Summary - Mobile only */}
        {isMobile && (
          <div className="fixed left-0 right-0 z-40 bg-gray-100 border-t border-gray-200 shadow-lg md:hidden max-h-[50vh] xs:max-h-[45vh] overflow-y-auto w-full safe-area-inset-bottom" style={{bottom: '0', paddingBottom: 'calc(env(safe-area-inset-bottom) + 0.75rem)'}}>
            <div className="px-2 xs:px-2.5 sm:px-3 py-1.5 xs:py-2 sm:py-2.5 ">
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