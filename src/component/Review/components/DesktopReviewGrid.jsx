import React from 'react';
import ReviewCard from './ReviewCard';

const DesktopReviewGrid = ({ reviews }) => {
  return (
    <>
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
          isMobile={false}
        />
      ))}
    </>
  );
};

export default DesktopReviewGrid;

