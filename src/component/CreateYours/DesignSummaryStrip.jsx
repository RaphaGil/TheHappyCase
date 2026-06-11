import React from 'react';
import { CASE_OPTIONS } from '../../data/constants';
import { OPTION_FONT_STYLE } from './designOptionStyles';

const getCaseLabel = (selectedCase, selectedCaseType) => {
  if (selectedCase?.name) return selectedCase.name;
  const opt = CASE_OPTIONS.find((c) => c.value === selectedCaseType);
  return opt ? opt.label.split(' - ')[0] : null;
};

const getColorLabel = (selectedCase, selectedColor) => {
  const colorData = selectedCase?.colors?.find((c) => c.color === selectedColor);
  if (!colorData?.image) return null;
  const filename = colorData.image.split('/').pop().replace(/\.(webp|png|jpg)$/i, '').toLowerCase();
  const cleaned = filename
    .replace(/^economycase/i, '')
    .replace(/^businessclasscase/i, '')
    .replace(/^firstclasscase/i, '')
    .replace(/^smartcase/i, '')
    .replace(/^premiumcase/i, '')
    .replace(/^firstclass/i, '');
  if (!cleaned) return 'Color';
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
};

const DesignSummaryStrip = ({
  selectedCase,
  selectedCaseType,
  selectedColor,
  selectedPins = [],
  customText,
  customTextAdded,
}) => {
  const caseLabel = getCaseLabel(selectedCase, selectedCaseType);
  const colorLabel = selectedColor ? getColorLabel(selectedCase, selectedColor) : null;
  const charmCount = selectedPins.length;
  const hasSelection = caseLabel || colorLabel || charmCount > 0 || customTextAdded;

  if (!hasSelection) {
    return (
      <div
        className="w-full max-w-[270px] mx-auto mt-1 px-2 py-1 rounded-md bg-gray-50 border border-gray-100 text-center"
        style={OPTION_FONT_STYLE}
      >
        <p className="text-xs text-gray-500">Pick a case and color to start your design</p>
      </div>
    );
  }

  return (
    <div
      className="w-full max-w-[270px] mx-auto mt-1 px-2 py-1 rounded-md bg-gray-50 border border-gray-100"
      style={OPTION_FONT_STYLE}
      aria-label="Your design summary"
    >
      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-gray-700">
        {caseLabel && (
          <span className="font-medium text-gray-900">{caseLabel}</span>
        )}
        {caseLabel && colorLabel && (
          <span className="text-gray-300" aria-hidden="true">·</span>
        )}
        {colorLabel && selectedColor && (
          <span className="inline-flex items-center gap-1">
            <span
              className="inline-block h-3 w-3 rounded-full border border-gray-300 shrink-0"
              style={{ backgroundColor: selectedColor }}
              aria-hidden="true"
            />
            <span>{colorLabel}</span>
          </span>
        )}
        {(caseLabel || colorLabel) && charmCount > 0 && (
          <span className="text-gray-300" aria-hidden="true">·</span>
        )}
        {charmCount > 0 && (
          <span>{charmCount} charm{charmCount !== 1 ? 's' : ''}</span>
        )}
        {(caseLabel || colorLabel || charmCount > 0) && customTextAdded && customText && (
          <span className="text-gray-300" aria-hidden="true">·</span>
        )}
        {customTextAdded && customText && (
          <span className="italic text-gray-600">&ldquo;{customText}&rdquo;</span>
        )}
      </div>
    </div>
  );
};

export default DesignSummaryStrip;
