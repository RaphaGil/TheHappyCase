import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faGlobe } from '@fortawesome/free-solid-svg-icons';

const ReviewCard = ({ review, isMobile = false }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FontAwesomeIcon
        key={index}
        icon={faStar}
        className={`text-xs ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
      />
    ));
  };

  if (isMobile) {
    return (
      <div
        className="flex-shrink-0 bg-white border border-gray-200 p-4 transition-all duration-200 flex flex-col"
        style={{ width: 'calc(66.67vw - 0.5rem)', minHeight: '280px' }}
      >
        <div className="flex items-center gap-1.5 mb-3">
          {renderStars(review.rating)}
        </div>
        <p className="text-gray-700 mb-4 leading-relaxed text-body-sm flex-grow font-inter font-light">
          "{review.text}"
        </p>
        <div className="flex items-center gap-2 mt-auto">
          {review.avatar && (
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-gray-900 font-medium bg-gray-50 text-sm flex-shrink-0 font-inter">
              {review.avatar}
            </div>
          )}
          <div className="min-w-0 flex-1 font-medium text-gray-900 text-sm truncate font-inter">
            <h4>
              {review.name}
            </h4>
            <div className="flex items-center gap-1">
              <FontAwesomeIcon icon={faGlobe} className="text-gray-400 text-xs flex-shrink-0" />
              <p className="text-gray-500 text-body-sm truncate font-inter">
                {review.location}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hidden md:flex bg-white border border-gray-200 p-4 sm:p-5 md:p-6 lg:p-8 transition-all duration-200 hover:border-gray-300 flex-col min-h-[320px]">
      <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
        {renderStars(review.rating)}
      </div>

      {/* Review Text */}
      <p className="text-gray-700 mb-6 leading-relaxed text-body-sm flex-grow font-inter font-light">
        "{review.text}"
      </p>

      {/* Customer Info */}
      <div className="flex items-center gap-2 sm:gap-3 mt-auto">
        {review.avatar && (
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-gray-900 font-medium border border-gray-200 bg-gray-50 text-sm flex-shrink-0 font-inter">
            {review.avatar}
          </div>
        )}
        <div className="min-w-0 flex-1 font-medium text-gray-900 text-sm truncate font-inter">
          <h4>
            {review.name}
          </h4>
          <div className="flex items-center gap-1.5">
            <FontAwesomeIcon icon={faGlobe} className="text-gray-400 text-xs flex-shrink-0" />
            <p className="text-gray-500 text-sm truncate font-inter">
              {review.location}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;

