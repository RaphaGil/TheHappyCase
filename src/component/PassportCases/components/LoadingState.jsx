import React from 'react';

const LoadingState = () => {
  return (
    <div className="min-h-screen bg-white py-8 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-light text-gray-900 mb-4 font-inter">Loading...</h1>
        <p className="text-gray-500 font-inter">Please wait while we load the passport cases.</p>
      </div>
    </div>
  );
};

export default LoadingState;
