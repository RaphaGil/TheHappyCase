'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import { normalizeImagePath } from '../../../utils/imagePath';
import { getCaseDisplayName, getColorName } from '../../../utils/passportcases/helpers';
import Products from '../../../data/products.json';
import SectionHeader from './SectionHeader';

// Map internal case type to URL path (kebab-case)
const CASE_TYPE_TO_PATH = {
  economy: 'economy',
  business: 'business-class',
  firstclass: 'first-class',
};

// TEMP: hide main-page images for speed testing
const HIDE_HOME_IMAGES_FOR_TEST = false;

const CaseOptionsSection = () => {
  const [sectionRef] = useScrollAnimation({ threshold: 0.1 });
  const cases = Products?.cases ?? [];
  const [selectedColorByCase, setSelectedColorByCase] = useState({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleColorDotClick = useCallback((caseType, index, e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedColorByCase((prev) => ({ ...prev, [caseType]: index }));
  }, []);

  return (
    <section ref={sectionRef} className="w-full section-lavender">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
      <SectionHeader
        eyebrow="Our cases"
        title="Discover our cases"
        subtitle="Choose the style that fits your journey."
        linkHref="/passport-cases"
        linkLabel="Shop all cases"
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-8 w-full">
        {cases.map((caseItem) => {
          const casePath = `/passport-cases/${CASE_TYPE_TO_PATH[caseItem.type] || caseItem.type}`;
          const createPath = `/custom-passport?case=${caseItem.type}`;
          const displayName = getCaseDisplayName(caseItem.type);
          const colors = caseItem.colors ?? [];
          const selectedIndex = selectedColorByCase[caseItem.type] ?? 0;
          const displayImage = colors[selectedIndex]?.image ?? caseItem.images?.[0];
          return (
            <div
              key={caseItem.type}
              className="group card-happy p-3 md:p-4 overflow-hidden"
            >
              <Link
                href={casePath}
                className="relative flex w-full aspect-[16/10] sm:aspect-square overflow-hidden rounded-2xl cursor-pointer bg-white items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8"
                aria-label={`Go to ${displayName} passport case page`}
              >
                {caseItem.specifications?.passportCapacity && (
                  <span className="absolute left-3 top-3 z-10 rounded-full bg-[#30279f] px-2.5 py-1 text-[11px] font-semibold text-[#ffd93d] font-inter">
                    {caseItem.specifications.passportCapacity}
                  </span>
                )}
                {!HIDE_HOME_IMAGES_FOR_TEST && mounted && displayImage && (
                  <img
                    key={displayImage}
                    src={normalizeImagePath(displayImage)}
                    className="w-full h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
                    alt={getColorName(displayImage) ? `${displayName} in ${getColorName(displayImage)}` : displayName}
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="400"
                    fetchPriority="low"
                  />
                )}
              </Link>
              <div className="pt-3 md:pt-4 pb-1">
                <p className="text-gray-900 text-center text-md md:text-base font-normal leading-tight font-inter">
                  {displayName}
                </p>
                <p className="text-gray-500 text-center text-sm mt-0.5 font-inter">
                  {caseItem.basePrice != null && (
                    <span className="font-semibold text-[#30279f]">£{Number(caseItem.basePrice).toFixed(2)}</span>
                  )}
                  {caseItem.basePrice != null && colors.length > 0 && <span aria-hidden="true"> · </span>}
                  {colors.length > 0 ? `${colors.length} colours` : ''}
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
                <div className="flex justify-center mt-4">
                  <Link
                    href={createPath}
                    className="btn-happy btn-happy-sm font-inter"
                  >
                    Customise
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </section>
  );
};

export default CaseOptionsSection;
