'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import { normalizeImagePath } from '../../../utils/imagePath';
import { getCaseDisplayName, getColorName } from '../../../utils/passportcases/helpers';
import Products from '../../../data/products.json';

// Map internal case type to URL path (matches PassportCases [type] routes)
const CASE_TYPE_TO_PATH = {
  economy: 'Economy',
  business: 'BusinessClass',
  firstclass: 'FirstClass',
};

const CaseOptionsSection = () => {
  const [sectionRef] = useScrollAnimation({ threshold: 0.1 });
  const cases = Products?.cases ?? [];
  const [selectedColorByCase, setSelectedColorByCase] = useState({});

  const handleColorDotClick = useCallback((caseType, index, e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedColorByCase((prev) => ({ ...prev, [caseType]: index }));
  }, []);

  return (
    <div ref={sectionRef} className="w-full mt-12 md:mt-16 mb-12 md:mb-16">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl font-light text-gray-900 font-inter tracking-title">
          DISCOVER OUR CASES
        </h2>
        <p className="text-gray-600 text-sm md:text-base font-light font-inter mt-2 max-w-xl mx-auto">
         Choose the style that fits your journey.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-8 w-full max-w-6xl mx-auto px-2 sm:px-0">
        {cases.map((caseItem) => {
          const path = `/PassportCases/${CASE_TYPE_TO_PATH[caseItem.type] || caseItem.type}`;
          const displayName = getCaseDisplayName(caseItem.type);
          const colors = caseItem.colors ?? [];
          const selectedIndex = selectedColorByCase[caseItem.type] ?? 0;
          const displayImage = colors[selectedIndex]?.image ?? caseItem.images?.[0];
          return (
            <div
              key={caseItem.type}
              className="group bg-white transition-all duration-700 ease-out overflow-hidden"
            >
              <Link
                href={path}
                className="relative flex w-full aspect-square overflow-hidden rounded-sm cursor-pointer border border-gray-100 bg-gray-50 items-center justify-center p-4 md:p-6 lg:p-8"
                aria-label={`Go to ${displayName} passport case page`}
              >
                {displayImage && (
                  <img
                    key={displayImage}
                    src={normalizeImagePath(displayImage)}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    alt={getColorName(displayImage) ? `${displayName} in ${getColorName(displayImage)}` : displayName}
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="400"
                  />
                )}
              </Link>
              <div className="bg-white py-3 md:py-4">
                <p className="text-gray-900 text-center text-md md:text-base font-light leading-tight font-inter">
                  {displayName}
                </p>
                <p className="text-gray-500 text-center text-sm mt-0.5 font-inter">
                  {colors.length > 0 ? `${colors.length} colours available` : ''}
                </p>
                {/* Circle dots - click to show case image in that colour */}
                {colors.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-1.5 mt-3" role="list" aria-label={`Colours available for ${displayName}`}>
                    {colors.map((colorOption, index) => {
                      const isSelected = selectedIndex === index;
                      return (
                        <button
                          key={`${caseItem.type}-${colorOption.color}-${index}`}
                          type="button"
                          onClick={(e) => handleColorDotClick(caseItem.type, index, e)}
                          className={`w-4 h-4 rounded-full border-2 flex-shrink-0 shadow-sm transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400 ${
                            isSelected ? 'border-gray-900 ring-2 ring-gray-300 scale-110' : 'border-gray-300'
                          }`}
                          style={{ backgroundColor: colorOption.color }}
                          title={getColorName(colorOption.image) || `Colour ${index + 1}`}
                          aria-label={`Show ${getColorName(colorOption.image) || `colour ${index + 1}`}`}
                          aria-pressed={isSelected}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CaseOptionsSection;
