import React, { useRef, useEffect } from 'react';
import { CASE_OPTIONS } from '../constants';

const CaseSelector = ({ selectedCaseType, onSelect, isCaseDropdownOpen, setIsCaseDropdownOpen }) => {
  const caseDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (caseDropdownRef.current && !caseDropdownRef.current.contains(e.target)) {
        setIsCaseDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsCaseDropdownOpen]);

  const getSelectedLabel = () => {
    const option = CASE_OPTIONS.find(opt => opt.value === selectedCaseType);
    return option ? option.label : 'Select Case';
  };

  return (
    <div className="relative" ref={caseDropdownRef}>
      <button
        type="button"
        className={`w-full px-4 py-3 border rounded-sm bg-white text-gray-900 flex items-center justify-between focus:outline-none focus:border-gray-400 transition-all duration-200 text-sm ${
          isCaseDropdownOpen 
            ? 'border-gray-400 bg-gray-50' 
            : 'border-gray-200 hover:border-gray-300'
        }`}
        style={{fontFamily: "'Poppins', sans-serif"}}
        onClick={() => setIsCaseDropdownOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={isCaseDropdownOpen}
      >
        <span>{getSelectedLabel()}</span>
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 text-gray-400 transition-transform ${isCaseDropdownOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.216l3.71-3.0a.75.75 0 111.06 1.06l-4.24 3.43a.75.75 0 01-.96 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
        </svg>
      </button>
      {isCaseDropdownOpen && (
        <ul
          className="absolute z-50 mt-1 w-full max-h-64 overflow-auto bg-white border border-gray-200 shadow-lg focus:outline-none"
          role="listbox"
        >
          {CASE_OPTIONS.map((opt) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={selectedCaseType === opt.value}
              className={`px-4 py-2 cursor-pointer transition-colors duration-200 border-b border-gray-50 last:border-b-0 ${
                selectedCaseType === opt.value 
                  ? 'bg-gray-50 text-gray-900 font-medium' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              style={{fontFamily: "'Poppins', sans-serif"}}
              onClick={() => {
                onSelect(opt.value);
                setIsCaseDropdownOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CaseSelector;


