import React from 'react';
import PinSelector from '../PinSelector';
import SelectedCharmsList from './SelectedCharmsList';

const CharmsSelectionSection = ({
  isOpen,
  onToggle,
  pins,
  selectedCategory,
  setSelectedCategory,
  selectedPins,
  onPinSelect,
  onPinRemove,
  Products,
  cart,
  showOnMobile = false,
  panelMode = false,
}) => {
  const showContent = panelMode || isOpen;

  return (
    <div className={`pb-3 sm:pb-4 pt-2 sm:pt-3 bg-white rounded-lg pl-0 ${panelMode ? '' : 'border-b border-gray-100'} ${showOnMobile ? 'block' : 'hidden md:block'}`}>
      {!panelMode && (
        <button
          onClick={onToggle}
          className="w-full flex justify-between mb-2 py-1 -my-1 rounded-md transition-colors duration-200"
        >
          <h3 className="text-sm uppercase tracking-wider text-gray-900 font-medium flex items-center gap-2" style={{fontFamily: "'Poppins', sans-serif"}}>
            2. Charms
            {selectedPins && selectedPins.length > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-100 text-green-600" aria-hidden="true">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
            )}
          </h3>
          <svg
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}

      {showContent && (
        <div className={`relative z-0 bg-white rounded-lg ${panelMode ? 'p-0 pr-1' : 'p-3 sm:p-4 -mx-2 sm:-mx-3 mt-1'}`}>
          <SelectedCharmsList
            selectedPins={selectedPins}
            onRemove={onPinRemove}
          />
          <PinSelector
            pins={pins}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedPins={selectedPins}
            onSelect={onPinSelect}
            onRemove={onPinRemove}
            Products={Products}
            cart={cart}
          />
        </div>
      )}
    </div>
  );
};

export default CharmsSelectionSection;
