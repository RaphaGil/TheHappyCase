import React from 'react';
import DesignIdeaCard from './DesignIdeaCard';

const DesignIdeasGrid = ({ ideas }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
      {ideas.map((idea, index) => (
        <DesignIdeaCard
          key={idea.id}
          idea={idea}
          index={index}
        />
      ))}
    </div>
  );
};

export default DesignIdeasGrid;
