import React from 'react';

const CharmsHeader = ({ title, description }) => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-2" 
          style={{fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", letterSpacing: '0.05em'}}>
        {title}
      </h1>
      <div className="w-16 h-px bg-gray-300 mx-auto mb-4"></div>
      <p className="text-sm text-gray-500 max-w-2xl mx-auto font-light" 
         style={{fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"}}>
        {description}
      </p>
    </div>
  );
};

export default CharmsHeader;

