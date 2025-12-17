import React from 'react';

const CharmsHeader = ({ title, description }) => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-title text-gray-900 tracking-title mb-2 font-inter">
        {title}
      </h1>
      <div className="w-16 h-px bg-gray-300 mx-auto mb-4"></div>
      <p className="text-body-sm text-gray-500 max-w-2xl mx-auto font-light font-inter">
        {description}
      </p>
    </div>
  );
};

export default CharmsHeader;

