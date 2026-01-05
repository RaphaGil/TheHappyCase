import React, { useState, useEffect } from 'react';
import reviewsData from '../../data/reviews.json';
import ReviewHeader from './components/ReviewHeader';
import CarouselNavigation from './components/CarouselNavigation';
import DesktopReviewGrid from './components/DesktopReviewGrid';
import CarouselIndicators from './components/CarouselIndicators';

const Reviews = () => {
  const reviews = reviewsData.reviews;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [reviewsPerSlide, setReviewsPerSlide] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setReviewsPerSlide(3); // lg screens and above: 3 reviews
      } else if (window.innerWidth >= 768) {
        setReviewsPerSlide(2); // md screens: 2 reviews
      } else {
        setReviewsPerSlide(1); // mobile: 1 review
      }
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev + reviewsPerSlide >= reviews.length ? 0 : prev + reviewsPerSlide
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev - reviewsPerSlide < 0 ? Math.max(0, reviews.length - reviewsPerSlide) : prev - reviewsPerSlide
    );
  };

  const visibleReviews = reviews.slice(currentSlide, currentSlide + reviewsPerSlide);
  const totalSlides = Math.ceil(reviews.length / reviewsPerSlide);

  return (
    <div className="bg-blue-100 py-20 md:py-28 lg:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        <ReviewHeader />

        {/* Reviews Carousel */}
        <div className="relative">
          <CarouselNavigation onPrev={prevSlide} onNext={nextSlide} />

          {/* Reviews Container - Same layout for mobile and desktop */}
          <div 
            className={`grid gap-6 sm:gap-8 md:gap-8 md:px-16 lg:px-20 items-stretch ${
              reviewsPerSlide === 3 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : reviewsPerSlide === 2
                ? 'grid-cols-1 md:grid-cols-2'
                : 'grid-cols-1'
            }`}
          >
            <DesktopReviewGrid
              reviews={visibleReviews}
            />
          </div>

          <CarouselIndicators
            totalSlides={totalSlides}
            currentSlide={currentSlide}
            reviewsPerSlide={reviewsPerSlide}
            onSlideChange={setCurrentSlide}
          />
        </div>
      </div>
    </div>
  );
};

export default Reviews;

