import React, { useCallback, useLayoutEffect, useRef } from 'react';
import DesignOptionsSteps from './DesignOptionsSteps';
import CaseSelectionSection from './CaseSelectionSection';
import CharmsSelectionSection from './CharmsSelectionSection';
import AddTextSection from './AddTextSection';
import MobileAddTextSection from './MobileAddTextSection';

const DesignOptionsPanel = ({
  activeStep,
  onStepChange,
  isMobile,
  selectedCaseType,
  selectedColor,
  selectedCase,
  selectedPins,
  customTextAdded,
  selectedCategory,
  setSelectedCategory,
  pins,
  customText,
  setCustomText,
  customTextError,
  setCustomTextError,
  setCustomTextAdded,
  onCaseSelect,
  onColorSelect,
  onPinSelect,
  onPinRemove,
  onTextAdded,
  onMobileAddText,
  Products,
  cart,
  isCaseImageLoading,
}) => {
  const scrollRef = useRef(null);
  const preservedScrollTopRef = useRef(null);

  const handleColorSelect = useCallback((color, image) => {
    if (scrollRef.current) {
      preservedScrollTopRef.current = scrollRef.current.scrollTop;
    }
    onColorSelect(color, image);
  }, [onColorSelect]);

  useLayoutEffect(() => {
    if (preservedScrollTopRef.current === null || !scrollRef.current) return;
    scrollRef.current.scrollTop = preservedScrollTopRef.current;
    preservedScrollTopRef.current = null;
  }, [selectedColor]);

  const canLeaveCaseStep = Boolean(selectedCaseType && selectedColor);

  return (
    <div className="flex flex-col min-h-0 h-full w-full overflow-hidden">
      <div className="relative z-30 flex-shrink-0 bg-white shadow-[0_2px_6px_-2px_rgba(0,0,0,0.06)]">
        <DesignOptionsSteps
          activeStep={activeStep}
          onStepChange={onStepChange}
          selectedCaseType={selectedCaseType}
          selectedColor={selectedColor}
          selectedPins={selectedPins}
          customTextAdded={customTextAdded}
        />
      </div>

      <div
        ref={scrollRef}
        data-design-options-scroll
        className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain relative z-0 [scrollbar-gutter:stable]"
      >
        {activeStep === 'case' && (
          <CaseSelectionSection
            panelMode
            showOnMobile={isMobile}
            isOpen
            selectedCaseType={selectedCaseType}
            selectedColor={selectedColor}
            selectedCase={selectedCase}
            onCaseSelect={onCaseSelect}
            onColorSelect={handleColorSelect}
            Products={Products}
            cart={cart}
            isCaseImageLoading={isCaseImageLoading}
          />
        )}

        {activeStep === 'charms' && (
          canLeaveCaseStep ? (
            <CharmsSelectionSection
              panelMode
              showOnMobile={isMobile}
              isOpen
              pins={pins}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedPins={selectedPins}
              onPinSelect={onPinSelect}
              onPinRemove={onPinRemove}
              Products={Products}
              cart={cart}
            />
          ) : (
            <div className="pt-4 text-center text-sm text-gray-500" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Select a case and color first to choose charms.
            </div>
          )
        )}

        {activeStep === 'name' && (
          isMobile ? (
            <div className="pt-2">
              <MobileAddTextSection
                customText={customText}
                setCustomText={setCustomText}
                customTextError={customTextError}
                setCustomTextError={setCustomTextError}
                customTextAdded={customTextAdded}
                setCustomTextAdded={setCustomTextAdded}
                onAddText={onMobileAddText}
              />
            </div>
          ) : (
            <AddTextSection
              alwaysVisible
              panelMode
              customText={customText}
              setCustomText={setCustomText}
              customTextError={customTextError}
              setCustomTextError={setCustomTextError}
              customTextAdded={customTextAdded}
              setCustomTextAdded={setCustomTextAdded}
              onTextAdded={onTextAdded}
            />
          )
        )}
      </div>
    </div>
  );
};

export default DesignOptionsPanel;
