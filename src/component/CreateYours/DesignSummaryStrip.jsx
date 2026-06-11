import React from 'react';
import { CASE_OPTIONS } from '../../data/constants';
import { getColorNameFromImage } from '../../utils/colorNames';
import { OPTION_FONT_STYLE } from './designOptionStyles';

const getCaseLabel = (selectedCase, selectedCaseType) => {
  if (selectedCase?.name) return selectedCase.name;
  const opt = CASE_OPTIONS.find((c) => c.value === selectedCaseType);
  return opt ? opt.label : null;
};

const SummaryChip = ({ children, className = '' }) => (
  <span
    className={`inline-flex max-w-full items-center rounded-full px-2.5 py-1 text-[11px] leading-tight ${className}`}
    style={OPTION_FONT_STYLE}
  >
    {children}
  </span>
);

const DesignSummaryStrip = ({
  selectedCase,
  selectedCaseType,
  selectedColor,
  selectedPins = [],
  customText,
  customTextAdded,
}) => {
  const caseLabel = getCaseLabel(selectedCase, selectedCaseType);
  const colorData = selectedCase?.colors?.find((c) => c.color === selectedColor);
  const colorLabel = colorData ? getColorNameFromImage(colorData.image) : null;
  const charmCount = selectedPins.length;
  const hasCaseAndColor = Boolean(caseLabel && selectedColor && colorLabel);
  const hasCharms = charmCount > 0;
  const hasName = Boolean(customTextAdded && customText);
  const hasSelection = hasCaseAndColor || hasCharms || hasName;

  if (!hasSelection) {
    return (
      <div
        className="mx-auto mt-2 w-full max-w-[270px] rounded-lg border border-dashed border-gray-200 bg-gray-50/70 px-3 py-2.5 text-center"
        style={OPTION_FONT_STYLE}
      >
        <p className="text-xs leading-snug text-gray-500">
          Choose a case and color to start designing
        </p>
      </div>
    );
  }

  return (
    <div
      className="mx-auto mt-2 w-full max-w-[270px] rounded-lg border border-gray-100 bg-white px-2.5 py-2 shadow-sm"
      style={OPTION_FONT_STYLE}
      aria-label="Your design summary"
    >
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {caseLabel && (
          <SummaryChip className="bg-gray-100 font-semibold text-gray-800">
            {caseLabel}
          </SummaryChip>
        )}

        {colorLabel && selectedColor && (
          <SummaryChip className="gap-1.5 border border-gray-200 bg-white font-medium text-gray-700">
            <span
              className="inline-block h-3.5 w-3.5 shrink-0 rounded-full border border-gray-200"
              style={{ backgroundColor: selectedColor }}
              aria-hidden="true"
            />
            <span>{colorLabel}</span>
          </SummaryChip>
        )}

        {hasCharms && (
          <SummaryChip className="bg-sky-50 font-medium text-sky-900">
            {charmCount} charm{charmCount !== 1 ? 's' : ''}
          </SummaryChip>
        )}

        {hasName && (
          <SummaryChip className="max-w-[11rem] border border-gray-100 bg-gray-50 italic text-gray-600">
            <span className="truncate">&ldquo;{customText}&rdquo;</span>
          </SummaryChip>
        )}
      </div>
    </div>
  );
};

export default DesignSummaryStrip;
