import React from 'react';
import { OPTION_FONT_STYLE } from './designOptionStyles';

export const DESIGN_STEPS = [
  { id: 'case', label: 'Case & Color' },
  { id: 'charms', label: 'Charms' },
  { id: 'name', label: 'Add Name' },
];

const canAccessStep = (stepId, selectedCaseType, selectedColor) => {
  if (stepId === 'case') return true;
  return Boolean(selectedCaseType && selectedColor);
};

const DesignOptionsSteps = ({
  activeStep,
  onStepChange,
  selectedCaseType,
  selectedColor,
  selectedPins = [],
  customTextAdded,
}) => {
  const stepStatus = {
    case: Boolean(selectedCaseType && selectedColor),
    charms: selectedPins.length > 0,
    name: customTextAdded,
  };

  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3 pb-3">
      {DESIGN_STEPS.map((step, index) => {
        const isActive = activeStep === step.id;
        const isDone = stepStatus[step.id];
        const isLocked = !canAccessStep(step.id, selectedCaseType, selectedColor);

        return (
          <button
            key={step.id}
            type="button"
            onClick={() => !isLocked && onStepChange(step.id)}
            disabled={isLocked}
            title={isLocked ? 'Select a case and color first' : undefined}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-colors duration-200 ${
              isLocked
                ? 'bg-gray-50 text-gray-400 border border-gray-100 cursor-not-allowed opacity-60'
                :
              isActive
                ? 'bg-btn-primary-blue text-btn-primary-blue-text border-2 border-btn-primary-blue shadow-sm'
                : isDone
                  ? 'bg-green-50 text-green-800 border border-green-200 hover:bg-green-100'
                  : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
            }`}
            style={{ fontFamily: "'Poppins', sans-serif" }}
            aria-pressed={isActive}
            aria-disabled={isLocked}
            aria-current={isActive ? 'step' : undefined}
          >
            <span
              className={`inline-flex items-center justify-center w-4 h-4 rounded-full text-[10px] ${
                isDone && !isActive
                  ? 'bg-green-600 text-white'
                  : isActive
                    ? 'bg-white/25 text-white'
                    : 'bg-gray-300 text-gray-700'
              }`}
            >
              {isDone && !isActive ? '✓' : index + 1}
            </span>
            <span className="font-bold">{step.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default DesignOptionsSteps;
