import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const SuccessHeader = () => {
  return (
    <div className="text-center mb-8 md:mb-12">
      <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-green-100 mb-6">
        <FontAwesomeIcon 
          icon={faCheckCircle} 
          className="text-green-600 text-4xl md:text-5xl"
        />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3" style={{fontFamily: "'Poppins', sans-serif"}}>
        Payment Successful!
      </h1>
      <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto font-inter">
        Thank you for your order. We've received your payment and will process your items shortly.
      </p>
    </div>
  );
};

export default SuccessHeader;
