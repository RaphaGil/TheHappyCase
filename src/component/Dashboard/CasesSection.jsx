import React from 'react';
import CaseItem from './CaseItem';

const CasesSection = ({ cases, onQuantityChange }) => {
  return (
    <div className="bg-white border p-6 rounded-sm">
      <h2 className="text-xl mb-6 font-inter">Passport Cases</h2>

      {cases.map((caseItem, index) => (
        <CaseItem
          key={index}
          caseItem={caseItem}
          index={index}
          onQuantityChange={onQuantityChange}
        />
      ))}
    </div>
  );
};

export default CasesSection;
