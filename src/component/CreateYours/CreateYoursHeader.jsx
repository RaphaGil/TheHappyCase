import React from 'react';

const CreateYoursHeader = () => {
  return (
    <div className="text-center flex-shrink-0 mt-4 md:mt-6">
      <h1 className="text-title text-gray-900 tracking-title mb-1 md:mb-2">
        CREATE YOURS
      </h1>
      <div className="w-16 sm:w-20 md:w-24 h-px bg-gray-200 mx-auto mb-2 md:mb-4"></div>
      <p className="md:block hidden text-sm text-gray-500 max-w-2xl mx-auto font-light" 
         style={{fontFamily: "'Poppins', sans-serif"}}>
        Design your perfect passport case with our interactive creator
      </p>
    </div>
  );
};

export default CreateYoursHeader;
