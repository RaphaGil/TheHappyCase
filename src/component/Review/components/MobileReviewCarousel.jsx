import React from 'react';
import ReviewCard from './ReviewCard';

const MobileReviewCarousel = ({ reviews, currentSlide, onTouchStart, onTouchMove, onTouchEnd }) => {
  return (
    <div className="md:hidden overflow-hidden px-4">
      <div 
        className="flex gap-4 transition-transform duration-300 ease-out"
        style={{
          transform: `translateX(calc(-${currentSlide} * (66.67vw - 0.5rem + 1rem)))`
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            isMobile={true}
          />
        ))}
      </div>
    </div>
  );
};

export default MobileReviewCarousel;

