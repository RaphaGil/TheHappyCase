import React from 'react';
import { normalizeImagePath } from '../../utils/imagePath';


const DesignIdeaCard = ({ idea, index }) => {
  const pastelColors = ['bg-pink-50', 'bg-blue-50', 'bg-purple-50', 'bg-green-50', 'bg-yellow-50', 'bg-orange-50'];
  const pastelBorders = ['border-pink-100', 'border-blue-100', 'border-purple-100', 'border-green-100', 'border-yellow-100', 'border-orange-100'];
  const colorIndex = index % pastelColors.length;

  return (
    <div className="flex flex-col border border-gray-100 group">
      {/* Case Preview */}
      <div className={`relative mb-4 ${pastelColors[colorIndex]} border-b ${pastelBorders[colorIndex]} p-4`}>
        <div className={`aspect-[3/4] ${pastelColors[colorIndex]} flex items-center justify-center overflow-hidden relative`}>
          {idea.caseImage && (
            <img
              src={normalizeImagePath(idea.caseImage)}
              alt={idea.title}
              className="w-full h-full object-contain"
              loading="lazy"
              fetchPriority="low"
              decoding="async"
              width="300"
              height="400"
              onError={(e) => {
                if (e.target) {
                  e.target.style.display = 'none';
                }
              }}
            />
          )}
        
        </div>
      </div>
    </div>
  );
};

export default DesignIdeaCard;
