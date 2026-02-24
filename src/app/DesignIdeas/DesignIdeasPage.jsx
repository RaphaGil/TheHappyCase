import React from 'react';
import DesignIdeasGrid from '../../component/DesignIdeas/DesignIdeasGrid';

const DesignIdeas = () => {
  return (
    <div className="min-h-screen bg-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DesignIdeasGrid ideas={[]} />
      </div>
    </div>
  );
};

export default DesignIdeas;
