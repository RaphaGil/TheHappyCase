import React, { useState, useMemo, useEffect } from "react";
import { CATEGORY_OPTIONS as CATEGORY_OPTIONS_WITH_IMAGES } from "../../data/constants";

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
  <div className="grid grid-cols-3 gap-2 mb-4">
    {CATEGORY_OPTIONS.map((opt) => {
      const previewImage = getPreviewImage(opt.value);
      const isActive = selectedCategory === opt.value;

      return (
        <button
          key={opt.value}
          type="button"
          role="option"
          aria-selected={isActive}
          className={`font-inter flex flex-col items-center p-2.5 rounded-lg transition-colors ${
            isActive ? "bg-gray-50" : "hover:bg-gray-50"
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
                  src={previewImage}
                  alt={opt.label}
                  className="max-w-full max-h-full object-contain p-1"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              {isActive && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center z-20 shadow-sm ">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
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

const PinCard = ({ pin, isSelected, isSoldOut, onClick }) => {
  // Get size label based on pin.size from products.json
  const getSizeLabel = (size) => {
    if (!size) return '';
    if (size <= 0.3) return 'XS';
    if (size <= 0.45) return 'S';
    if (size <= 0.6) return 'M';
    if (size <= 0.75) return 'L';
    return 'XL';
  };

  const sizeLabel = getSizeLabel(pin.size);

  return (
    <div
      className={`flex flex-col items-center justify-center text-center space-y-1 sm:space-y-2 p-2 sm:p-3 h-full transition-colors group touch-manipulation ${
        isSoldOut ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={onClick}
    >
      <div className="relative" style={{ overflow: "visible" }}>
        <div className="w-16 h-16 sm:w-20 sm:h-20 aspect-square flex items-center justify-center bg-transparent">
          <img
            src={pin.src}
            alt={pin.name}
            className={`w-full h-full object-contain transition-all duration-200 rounded ${
              isSoldOut ? "opacity-50" : ""
            }`}
            loading="lazy"
          />
        </div>
        {isSelected && !isSoldOut && (
          <div className="absolute -top-1 -right-1 bg-black text-white w-6 h-6 flex items-center justify-center text-xs rounded-full z-10 shadow-md">
            ✓
          </div>
        )}
        {sizeLabel && (
          <div className="absolute -top-1 -left-1 bg-gray-100 text-gray-700 text-[8px] font-medium px-1.5 py-0.5 rounded-full z-10 border border-gray-300">
            {sizeLabel}
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

const PinGrid = ({ filteredPins, selectedPins, onSelect, onRemove }) => (
  <div className="max-h-80 sm:max-h-96 overflow-y-auto p-2">
    <div className="grid grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-2 justify-items-center md:max-w-3xl mx-auto">
      {filteredPins.map((pin, index) => {
        const selectedPinEntry = selectedPins.find((p) => p.pin === pin);
        const isSelected = !!selectedPinEntry;
        const isSoldOut = pin.quantity !== undefined && pin.quantity === 0;
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
          />
        );
      })}
    </div>
  </div>
);

const PinSelector = ({
  pins,
  selectedCategory,
  setSelectedCategory,
  selectedPins,
  onSelect,
  onRemove,
  onDropdownToggle,
  Products,
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
          />
        </div>
      )}
    </div>
  );
};

export default PinSelector;
