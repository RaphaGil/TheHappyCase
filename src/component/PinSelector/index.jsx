'use client';

import React, { useState, useMemo, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { CATEGORY_OPTIONS as CATEGORY_OPTIONS_WITH_IMAGES } from "../../data/constants";
import { getMaxAvailableQuantity } from "../../utils/inventory";
import { normalizeImagePath } from "../../utils/imagePath";
import { getCaseLinePins } from "../../utils/cartHelpers";
import {
  OPTION_CHARM_CATEGORY_CARD_MIN_H,
  OPTION_CHARM_CATEGORY_IMAGE,
  OPTION_CATEGORY_LABEL,
  OPTION_FILTER_TAB,
  OPTION_FONT_STYLE,
  OPTION_ITEM_LABEL,
  OPTION_SOLD_OUT,
  getCategoryLabelColor,
  getFilterTabClasses,
  getItemLabelColor,
} from "../CreateYours/designOptionStyles";

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
  { value: "bronze", label: "Bronze Charms" },
  { value: "colorful", label: "Colorful Charms" },
  { value: "flags", label: "Flags Collection" },
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
  <div className="grid grid-cols-3 gap-1 sm:gap-1.5 mb-2">
    {CATEGORY_OPTIONS.map((opt) => {
      const previewImage = getPreviewImage(opt.value);
      const isActive = selectedCategory === opt.value;

      return (
        <button
          key={opt.value}
          type="button"
          role="option"
          aria-selected={isActive}
          className={`${OPTION_CHARM_CATEGORY_CARD_MIN_H} w-full flex flex-col items-center justify-center px-1 py-1.5 rounded-md transition-all duration-200 ${
            isActive ? "bg-gray-50 border border-gray-900" : "hover:bg-gray-50 border border-transparent"
          }`}
          onClick={() => {
            setSelectedCategory(opt.value);
            if (onDropdownToggle) {
              onDropdownToggle();
            }
          }}
        >
          {previewImage && (
            <div className={OPTION_CHARM_CATEGORY_IMAGE}>
              <div className="flex h-full w-full items-center justify-center overflow-hidden rounded">
                <Image
                  src={normalizeImagePath(previewImage)}
                  alt={opt.label}
                  className="max-h-full max-w-full object-contain p-0.5"
                  loading="lazy"
                  width={64}
                  height={64}
                  sizes="(max-width: 640px) 56px, 64px"
                />
              </div>
            </div>
          )}
          <span
            className={`${OPTION_CATEGORY_LABEL} ${getCategoryLabelColor(isActive)}`}
            style={OPTION_FONT_STYLE}
          >
            {opt.label}
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

  return (
    <div className="mb-2 flex flex-wrap gap-0.5 justify-center">
      {tabs.map(({ key, label }) => {
        const count = getSubCategoryCount(key);
        const isActive = subCategory === key;

        return (
          <button
            key={key}
            onClick={() => setSubCategory(key)}
            className={`${OPTION_FILTER_TAB} ${getFilterTabClasses(isActive)}`}
            style={OPTION_FONT_STYLE}
          >
            {label}
            <span className="text-gray-400 font-normal text-xs"> ({count})</span>
          </button>
        );
      })}
    </div>
  );
};

const scrollToFirstCharmRow = (gridContainer) => {
  if (!gridContainer) return false;

  const scrollParent = gridContainer.closest('[data-design-options-scroll]');
  if (!scrollParent) return false;

  const firstPin = gridContainer.querySelector('[data-first-pin]');
  const stickyHeader = gridContainer.previousElementSibling;
  const headerBottom = stickyHeader
    ? stickyHeader.getBoundingClientRect().bottom
    : scrollParent.getBoundingClientRect().top;

  const targetRect = (firstPin || gridContainer).getBoundingClientRect();
  const offset = targetRect.top - headerBottom;
  scrollParent.scrollTop = Math.max(0, scrollParent.scrollTop + offset);
  return true;
};

const PinCard = ({ pin, isSelected, isSoldOut, onClick, isLowStock = false, remainingAvailable = null, isFirst = false }) => {
  return (
    <div
      data-first-pin={isFirst ? true : undefined}
      className={`flex flex-col items-center justify-center text-center space-y-0.5 p-1 sm:p-1.5 h-full transition-colors group touch-manipulation ${
        isSoldOut ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={onClick}
    >
      <div className={`relative rounded-md transition-all duration-200 p-0.5 ${isSelected && !isSoldOut ? "bg-gray-50 border border-gray-900" : "border border-transparent hover:bg-gray-50"}`} style={{ overflow: "visible" }}>
        <div className="w-14 h-14 sm:w-16 sm:h-16 aspect-square flex items-center justify-center bg-transparent">
          <Image
            src={normalizeImagePath(pin.src)}
            alt={pin.name}
            className={`w-full h-full object-contain transition-all duration-200 rounded ${
              isSoldOut ? "opacity-50" : ""
            }`}
            loading="lazy"
            width={80}
            height={80}
            sizes="(max-width: 640px) 64px, 80px"
          />
        </div>
        {/* New badge - top right */}
        {pin.badge && !isSoldOut && !isSelected && (
          <div className="absolute top-0 right-0 bg-btn-primary-blue text-white text-[10px] font-medium px-1.5 py-0.5 rounded z-[1]">
            {pin.badge}
          </div>
        )}
        {/* Low stock badge - top right, stacked below New when both show */}
        {isLowStock && !isSoldOut && remainingAvailable != null && (
          <div className={`absolute right-0 bg-amber-500 text-white text-[10px] font-medium px-1.5 py-0.5 rounded z-[1] ${pin.badge && !isSelected ? 'top-5' : 'top-0'}`}>
            {remainingAvailable === 1 ? 'Only 1 left' : `${remainingAvailable} available`}
          </div>
        )}
      </div>
      <span
        className={`${OPTION_ITEM_LABEL} mt-1.5 md:mt-2 transition-colors ${getItemLabelColor(isSelected)}`}
        style={OPTION_FONT_STYLE}
      >
        {pin.name}
      </span>
      {isSoldOut && (
        <span className={OPTION_SOLD_OUT} style={OPTION_FONT_STYLE}>Sold Out</span>
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
    (cart || []).forEach((cartItem) => {
      getCaseLinePins(cartItem).forEach((cartPin) => {
        const cartPinName = cartPin.name || cartPin.src;
        const cartPinCategory = cartPin.category || charmCategory;
        if (
          (cartPinName === charmName || cartPinName === pin.src) &&
          cartPinCategory === charmCategory
        ) {
          charmCountInCustomDesigns += cartItem.quantity || 1;
        }
      });
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
    <div className="relative z-0 p-1 pb-4">
      <div className="relative z-0 grid grid-cols-3 gap-1 sm:gap-1.5 justify-items-center pr-1">
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
              isFirst={index === 0}
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
  const [searchQuery, setSearchQuery] = useState("");
  const gridScrollRef = useRef(null);

  const runScrollToFirstCharm = useCallback(() => {
    scrollToFirstCharmRow(gridScrollRef.current);
  }, []);

  const filteredPins = useMemo(
    () => filterPinsBySubCategory(pins, selectedCategory, subCategory),
    [pins, selectedCategory, subCategory]
  );

  const searchedPins = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return filteredPins;
    return filteredPins.filter((pin) =>
      (pin.name || "").toLowerCase().includes(query)
    );
  }, [filteredPins, searchQuery]);

  // Reset subCategory when selectedCategory changes
  useEffect(() => {
    setSubCategory("all");
    setSearchQuery("");
  }, [selectedCategory]);

  // Show the first charm row at the top when category or filter changes
  useLayoutEffect(() => {
    if (!selectedCategory) return;

    runScrollToFirstCharm();
    const raf = requestAnimationFrame(() => {
      runScrollToFirstCharm();
      requestAnimationFrame(runScrollToFirstCharm);
    });
    return () => cancelAnimationFrame(raf);
  }, [selectedCategory, subCategory, filteredPins, runScrollToFirstCharm]);

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
    <div className="relative z-0">
      <div className="sticky top-0 z-30 bg-white pb-1 border-b border-gray-100 shadow-[0_2px_6px_-2px_rgba(0,0,0,0.06)]">
        <CategorySelector
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onDropdownToggle={onDropdownToggle}
          getPreviewImage={getPreviewImage}
        />

        {selectedCategory && (
          <SubCategoryTabs
            selectedCategory={selectedCategory}
            subCategory={subCategory}
            setSubCategory={setSubCategory}
            getSubCategoryCount={getSubCategoryCount}
          />
        )}

        {selectedCategory && (
          <div className="mt-1 mb-2 px-0.5">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search charms..."
              className="w-full px-3 py-2 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 bg-white text-gray-900 placeholder-gray-400"
              style={OPTION_FONT_STYLE}
              aria-label="Search charms"
            />
          </div>
        )}
      </div>

      {selectedCategory && (
        <div ref={gridScrollRef} className="relative z-0">
          {searchQuery.trim() && searchedPins.length === 0 && (
            <p className="text-xs text-gray-500 text-center py-4" style={OPTION_FONT_STYLE}>
              No charms match &ldquo;{searchQuery.trim()}&rdquo;
            </p>
          )}
          <PinGrid
            filteredPins={searchedPins}
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
