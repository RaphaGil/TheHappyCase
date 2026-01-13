import React from 'react';
import { useNavigate } from 'react-router-dom';

const InvalidAccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4" style={{fontFamily: "'Poppins', sans-serif"}}>
          Invalid Access
        </h1>
        <p className="text-gray-600 mb-6 font-inter">
          This page can only be accessed after a successful payment.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 rounded-md bg-gray-900 hover:bg-gray-800 text-white transition-all duration-200 font-inter"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default InvalidAccess;
