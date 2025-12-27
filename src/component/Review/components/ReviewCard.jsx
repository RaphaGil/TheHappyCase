import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faGlobe } from '@fortawesome/free-solid-svg-icons';

const ReviewCard = ({ review }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FontAwesomeIcon
        key={index}
        icon={faStar}
        className={`text-base sm:text-lg ${index < rating ? 'text-yellow-400' : 'text-gray-200'}`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sm:p-7 md:p-8 transition-all duration-300 hover:shadow-lg hover:border-gray-200 flex flex-col min-h-[320px] group">
      {/* Stars Rating */}
      <div className="flex items-center gap-2 mb-4 sm:mb-5">
        {renderStars(review.rating)}
      </div>

      {/* Review Text */}
      <p className="text-gray-700 mb-6 leading-relaxed text-base sm:text-lg flex-grow font-inter font-light">
        "{review.text}"
      </p>

      {/* Customer Info */}
      <div className="flex items-center gap-3 sm:gap-4 mt-auto pt-4 border-t border-gray-100">
        {review.avatar && (
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-gray-900 font-semibold bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 text-base flex-shrink-0 font-inter shadow-sm group-hover:shadow-md transition-shadow duration-300">
            {review.avatar}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h4 className="font-semibold text-gray-900 text-base mb-1 font-inter">
            {review.name}
          </h4>
          <div className="flex items-center gap-1.5">
            <FontAwesomeIcon icon={faGlobe} className="text-gray-400 text-xs flex-shrink-0" />
            <p className="text-gray-500 text-sm font-inter">
              {review.location}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;

