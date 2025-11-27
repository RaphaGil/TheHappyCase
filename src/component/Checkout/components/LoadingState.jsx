import React from 'react';

const LoadingState = () => {
  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-2xl mx-auto p-6 bg-white border border-gray-200">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-300 mx-auto mb-4"></div>
            <p className="text-gray-500 font-light font-inter">
              Loading checkout...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;

