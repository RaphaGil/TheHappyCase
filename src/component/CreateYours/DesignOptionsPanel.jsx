import React from 'react';
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
  onTextAdded,
  onMobileAddText,
  Products,
  cart,
  isCaseImageLoading,
}) => {
  return (
    <div className="flex flex-col min-h-0 w-full">
      <DesignOptionsSteps
        activeStep={activeStep}
        onStepChange={onStepChange}
        selectedCaseType={selectedCaseType}
        selectedColor={selectedColor}
        selectedPins={selectedPins}
        customTextAdded={customTextAdded}
      />

      <div className={`min-h-0 ${isMobile ? '' : 'flex-1 overflow-y-auto overflow-x-hidden hide-scrollbar'}`}>
        {activeStep === 'case' && (
          <CaseSelectionSection
            panelMode
            showOnMobile={isMobile}
            isOpen
            selectedCaseType={selectedCaseType}
            selectedColor={selectedColor}
            selectedCase={selectedCase}
            onCaseSelect={onCaseSelect}
            onColorSelect={onColorSelect}
            Products={Products}
            cart={cart}
            isCaseImageLoading={isCaseImageLoading}
          />
        )}

        {activeStep === 'charms' && (
          <CharmsSelectionSection
            panelMode
            showOnMobile={isMobile}
            isOpen
            pins={pins}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedPins={selectedPins}
            onPinSelect={onPinSelect}
            Products={Products}
            cart={cart}
          />
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
                showHeading
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
