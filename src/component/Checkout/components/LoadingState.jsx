import React from 'react';
import AirplaneLoading from '@/component/Shared/AirplaneLoading';

const LoadingState = () => {
  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-2xl mx-auto p-6 bg-white ">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <AirplaneLoading size="md" />
            </div>
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

