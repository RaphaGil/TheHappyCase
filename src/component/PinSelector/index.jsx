'use client';

import React, { useState, useMemo, useEffect } from "react";
import { CATEGORY_OPTIONS as CATEGORY_OPTIONS_WITH_IMAGES } from "../../data/constants";
import { getMaxAvailableQuantity } from "../../utils/inventory";
import { normalizeImagePath } from "../../utils/imagePath";

// -----------------------------
// Helpers
// -----------------------------

const filterPinsBySubCategory = (pins, selectedCategory, subCategory) => {
  if (!subCategory || subCategory === "all") return pins;

  return pins.filter((pin) => {
    if (selectedCategory === "colorful" || selectedCategory === "bronze") {
      return pin.subCategory === subCategory;
    }

    if (selectedCategory === "flags") {
      return pin.continent === subCategory;
    }

    return true;
  });
};

const CATEGORY_OPTIONS = [
  { value: "bronze", label: "Bronze Charms", price: "£1.50 each" },
  { value: "colorful", label: "Colorful Charms", price: "£2.00 each" },
  { value: "flags", label: "Flags Collection", price: "£2.00 each" },
];

const SUBCATEGORY_TABS = {
  colorful: [
    { key: "all", label: "ALL" },
    { key: "travel", label: "TRAVEL" },
    { key: "disney", label: "DISNEY" },
    { key: "drinks", label: "DRINKS" },
    { key: "food", label: "FOOD" },
    { key: "animal", label: "ANIMAL" },
    { key: "inspiration", label: "INSPIRATION" },
    { key: "hearts", label: "HEARTS" },
    { key: "nature", label: "NATURE" },
    { key: "camera", label: "CAMERA" },
  ],
  bronze: [
    { key: "all", label: "ALL" },
    { key: "travel", label: "TRAVEL" },
    { key: "animals", label: "ANIMALS" },
    { key: "love", label: "LOVE" },
    { key: "nature", label: "NATURE" },
    { key: "symbols", label: "SYMBOLS" },
  ],
  flags: [
    { key: "all", label: "ALL" },
    { key: "europe", label: "EUROPE" },
    { key: "americas", label: "AMERICAS" },
    { key: "africa", label: "AFRICA" },
    { key: "asia", label: "ASIA" },
    { key: "special", label: "SPECIAL" },
  ],
};

// -----------------------------
// Presentational components
// -----------------------------

const CategorySelector = ({
  selectedCategory,
  setSelectedCategory,
  onDropdownToggle,
  getPreviewImage,
}) => (
  <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mb-3 sm:mb-4">
    {CATEGORY_OPTIONS.map((opt) => {
      const previewImage = getPreviewImage(opt.value);
      const isActive = selectedCategory === opt.value;

      return (
        <button
          key={opt.value}
          type="button"
          role="option"
          aria-selected={isActive}
          className={`font-inter flex flex-col items-center p-2.5 rounded-lg transition-all duration-200 ${
            isActive ? "bg-gray-50 border-2 border-gray-900" : "hover:bg-gray-50 border-2 border-transparent"
          }`}
          onClick={() => {
            setSelectedCategory(opt.value);
            if (onDropdownToggle) {
              onDropdownToggle();
            }
          }}
        >
          {previewImage && (
            <div
              className="relative mb-2 flex items-center justify-center rounded overflow-visible"
              style={{ width: "4rem", height: "4rem" }}
            >
              <div className="w-full h-full flex items-center justify-center rounded overflow-hidden">
                <img
                  src={normalizeImagePath(previewImage)}
                  alt={opt.label}
                  className="max-w-full max-h-full object-contain p-1"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          )}
          <span
            className={`text-xs text-center font-light ${
              isActive ? "text-gray-900" : "text-gray-600"
            }`}
          >
            {opt.label}
          </span>
          <span className="text-[10px] text-gray-500 mt-0.5">
            {opt.price}
          </span>
        </button>
      );
    })}
  </div>
);

const SubCategoryTabs = ({
  selectedCategory,
  subCategory,
  setSubCategory,
  getSubCategoryCount,
}) => {
  if (!selectedCategory) return null;

  const tabs = SUBCATEGORY_TABS[selectedCategory];
  if (!tabs) return null;

  const baseClasses =
    "px-3 py-2 text-caption uppercase tracking-wider transition-all duration-200 font-inter";

  return (
    <div className="mb-4 flex flex-wrap gap-1 border-b border-gray-200 justify-center">
      {tabs.map(({ key, label }) => {
        const count = getSubCategoryCount(key);
        const isActive = subCategory === key;

        const activeClasses =
          selectedCategory === "flags"
            ? "text-gray-900 font-medium"
            : "border-b-2 border-gray-900 text-gray-900 font-medium";

        const inactiveClasses =
          selectedCategory === "flags"
            ? "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300"
            : "border-b-2 border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300";

        return (
          <button
            key={key}
            onClick={() => setSubCategory(key)}
            className={`${baseClasses} ${
              isActive ? activeClasses : inactiveClasses
            }`}
          >
            {label}{" "}
            <span className="text-gray-400 font-normal">({count})</span>
          </button>
        );
      })}
    </div>
  );
};

const PinCard = ({ pin, isSelected, isSoldOut, onClick, isLowStock = false, remainingAvailable = null }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center space-y-1 sm:space-y-2 p-2 sm:p-3 h-full transition-colors group touch-manipulation ${
        isSoldOut ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={onClick}
    >
      <div className={`relative rounded-lg transition-all duration-200 ${isSelected && !isSoldOut ? "border-2 border-gray-900 p-0.5" : "border-2 border-transparent p-0.5"}`} style={{ overflow: "visible" }}>
        <div className="w-16 h-16 sm:w-20 sm:h-20 aspect-square flex items-center justify-center bg-transparent">
          <img
            src={normalizeImagePath(pin.src)}
            alt={pin.name}
            className={`w-full h-full object-contain transition-all duration-200 rounded ${
              isSoldOut ? "opacity-50" : ""
            }`}
            loading="lazy"
          />
        </div>
        {/* New badge - top right */}
        {pin.badge && !isSoldOut && !isSelected && (
          <div className="absolute top-0 right-0 bg-btn-primary-blue text-white text-[8px] font-medium px-1.5 py-0.5 rounded z-10 font-inter">
            {pin.badge}
          </div>
        )}
        {/* Low stock badge - top right, stacked below New when both show */}
        {isLowStock && !isSoldOut && remainingAvailable != null && (
          <div className={`absolute right-0 bg-amber-500 text-white text-[8px] font-medium px-1.5 py-0.5 rounded z-10 font-inter ${pin.badge && !isSelected ? 'top-5' : 'top-0'}`}>
            {remainingAvailable === 1 ? 'Only 1 left' : `${remainingAvailable} available`}
          </div>
        )}
      </div>
      <span className="text-xs text-center text-gray-700 transition-colors line-clamp-2 font-inter">
        {pin.name}
      </span>
      {isSoldOut && (
        <span className="text-[9px] text-red-600 font-medium">Sold Out</span>
      )}
    </div>
  );
};

const PinGrid = ({ filteredPins, selectedPins, onSelect, onRemove, cart, selectedCategory }) => {
  // Helper to get charm inventory info (sold out, remaining, low stock)
  const getCharmInventoryInfo = (pin) => {
    const charmCategory = pin.category || selectedCategory || 'colorful';
    const charmName = pin.name || pin.src || '';

    const product = {
      type: 'charm',
      category: charmCategory,
      pin: pin,
      name: charmName
    };

    const maxAvailable = getMaxAvailableQuantity(product, cart || []);

    // If no inventory limit
    if (maxAvailable === null) {
      return { isSoldOut: false, remainingAvailable: null, isLowStock: false };
    }

    // Count how many of this charm are already selected in the current design
    const charmCountInDesign = selectedPins.filter(p => {
      const pPin = p.pin || p;
      const pPinName = pPin.name || pPin.src;
      const pPinCategory = pPin.category || charmCategory;
      return (pPinName === charmName || pPinName === pin.src) &&
        pPinCategory === charmCategory;
    }).length;

    // Remaining = how many more can be added to this design
    const remainingAvailable = Math.max(0, maxAvailable - charmCountInDesign);
    const isSoldOut = maxAvailable === 0 || remainingAvailable === 0;
    const isLowStock = remainingAvailable > 0 && remainingAvailable < 3;

    return { isSoldOut, remainingAvailable, isLowStock };
  };

  // Helper function to check if a charm is sold out (legacy logic for compatibility)
  const checkCharmSoldOut = (pin) => {
    const { isSoldOut } = getCharmInventoryInfo(pin);
    if (isSoldOut) return true;

    const charmCategory = pin.category || selectedCategory || 'colorful';
    const charmName = pin.name || pin.src || '';

    const product = {
      type: 'charm',
      category: charmCategory,
      pin: pin,
      name: charmName
    };

    const maxAvailable = getMaxAvailableQuantity(product, cart || []);
    if (maxAvailable === null) return false;

    let standaloneCharmsInCart = 0;
    (cart || []).forEach(cartItem => {
      if (cartItem.type === 'charm') {
        const cartPin = cartItem.pin || cartItem;
        const cartPinName = cartPin.name || cartPin.src;
        const cartPinCategory = cartPin.category || cartItem.category || charmCategory;
        if ((cartPinName === charmName || cartPinName === pin.src) &&
          cartPinCategory === charmCategory) {
          standaloneCharmsInCart += (cartItem.quantity || 1);
        }
      }
    });

    let charmCountInCustomDesigns = 0;
    (cart || []).forEach(cartItem => {
      if (cartItem.pins && Array.isArray(cartItem.pins)) {
        cartItem.pins.forEach(cartPin => {
          const cartPinName = cartPin.name || cartPin.src;
          const cartPinCategory = cartPin.category || charmCategory;
          if ((cartPinName === charmName || cartPinName === pin.src) &&
            cartPinCategory === charmCategory) {
            charmCountInCustomDesigns += (cartItem.quantity || 1);
          }
        });
      }
    });

    const charmCountInDesign = selectedPins.filter(p => {
      const pPin = p.pin || p;
      const pPinName = pPin.name || pPin.src;
      const pPinCategory = pPin.category || charmCategory;
      return (pPinName === charmName || pPinName === pin.src) &&
        pPinCategory === charmCategory;
    }).length;

    const totalInventory = maxAvailable + standaloneCharmsInCart;
    const totalUsage = standaloneCharmsInCart + charmCountInCustomDesigns + charmCountInDesign;

    return maxAvailable === 0 || totalUsage >= totalInventory;
  };

  return (
    <div className="max-h-64 sm:max-h-72 overflow-y-auto hide-scrollbar p-2">
      <div className="grid grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-2 justify-items-center md:max-w-3xl mx-auto">
        {filteredPins.map((pin, index) => {
          const selectedPinEntry = selectedPins.find((p) => p.pin === pin);
          const isSelected = !!selectedPinEntry;
          const isSoldOut = checkCharmSoldOut(pin);
          const { remainingAvailable, isLowStock } = getCharmInventoryInfo(pin);
          const uniqueKey = pin.src
            ? `${pin.src}-${index}`
            : `${pin.name}-${index}`;

          const handleClick = () => {
            if (isSoldOut) return;
            if (isSelected && onRemove && selectedPinEntry) {
              onRemove(selectedPinEntry.imgInstance);
            } else {
              onSelect(pin);
            }
          };

          return (
            <PinCard
              key={uniqueKey}
              pin={pin}
              isSelected={isSelected}
              isSoldOut={isSoldOut}
              onClick={handleClick}
              isLowStock={isLowStock}
              remainingAvailable={remainingAvailable}
            />
          );
        })}
      </div>
    </div>
  );
};

const PinSelector = ({
  pins,
  selectedCategory,
  setSelectedCategory,
  selectedPins,
  onSelect,
  onRemove,
  onDropdownToggle,
  Products,
  cart,
}) => {
  const [subCategory, setSubCategory] = useState("all");

  // Reset subCategory when selectedCategory changes
  useEffect(() => {
    setSubCategory("all");
  }, [selectedCategory]);

  const filteredPins = useMemo(
    () => filterPinsBySubCategory(pins, selectedCategory, subCategory),
    [pins, selectedCategory, subCategory]
  );

  // Get preview image for each category
  const getPreviewImage = (categoryValue) => {
    // First try to get from Products.pins
    if (Products && Products.pins) {
      if (
        categoryValue === "bronze" &&
        Products.pins.bronze &&
        Products.pins.bronze.length > 0
      ) {
        return Products.pins.bronze[0].src;
      }
      if (
        categoryValue === "colorful" &&
        Products.pins.colorful &&
        Products.pins.colorful.length > 0
      ) {
        return Products.pins.colorful[0].src;
      }
      if (
        categoryValue === "flags" &&
        Products.pins.flags &&
        Products.pins.flags.length > 0
      ) {
        return Products.pins.flags[0].src;
      }
    }
    
    // Fallback to predefined images from constants
    const categoryOption = CATEGORY_OPTIONS_WITH_IMAGES.find(opt => opt.value === categoryValue);
    if (categoryOption && categoryOption.image) {
      return categoryOption.image;
    }
    
    return null;
  };

  // Count charms for a specific subcategory
  const getSubCategoryCount = (subCat) =>
    filterPinsBySubCategory(pins, selectedCategory, subCat).length;

  return (
    <div>
      <CategorySelector
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onDropdownToggle={onDropdownToggle}
        getPreviewImage={getPreviewImage}
      />

      {selectedCategory && (
        <div className="mt-4 pb-4">
          <SubCategoryTabs
            selectedCategory={selectedCategory}
            subCategory={subCategory}
            setSubCategory={setSubCategory}
            getSubCategoryCount={getSubCategoryCount}
          />

          <PinGrid
            filteredPins={filteredPins}
            selectedPins={selectedPins}
            onSelect={onSelect}
            onRemove={onRemove}
            cart={cart}
            selectedCategory={selectedCategory}
          />
        </div>
      )}
    </div>
  );
};

export default PinSelector;
