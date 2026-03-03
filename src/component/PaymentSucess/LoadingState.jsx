import React from 'react';
import AirplaneLoading from '@/component/Shared/AirplaneLoading';

const LoadingState = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          <AirplaneLoading size="md" />
        </div>
        <p className="text-gray-600 font-inter">Loading payment details...</p>
      </div>
    </div>
  );
};

export default LoadingState;
