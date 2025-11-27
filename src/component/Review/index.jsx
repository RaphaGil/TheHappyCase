import React, { useState, useEffect } from 'react';
import reviewsData from '../../data/reviews.json';
import ReviewHeader from './components/ReviewHeader';
import CarouselNavigation from './components/CarouselNavigation';
import MobileReviewCarousel from './components/MobileReviewCarousel';
import DesktopReviewGrid from './components/DesktopReviewGrid';
import CarouselIndicators from './components/CarouselIndicators';

const Reviews = () => {
  const reviews = reviewsData.reviews;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [reviewsPerSlide, setReviewsPerSlide] = useState(1);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Minimum swipe distance (in pixels)
  const minSwipeDistance = 50;

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
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const step = isMobile ? 1 : reviewsPerSlide;
    setCurrentSlide((prev) => 
      prev + step >= reviews.length ? 0 : prev + step
    );
  };

  const prevSlide = () => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const step = isMobile ? 1 : reviewsPerSlide;
    setCurrentSlide((prev) => 
      prev - step < 0 ? Math.max(0, reviews.length - step) : prev - step
    );
  };

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  // On mobile, show all reviews for horizontal scroll effect
  // On desktop, show only visible reviews
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const visibleReviews = isMobile ? reviews : reviews.slice(currentSlide, currentSlide + reviewsPerSlide);
  const totalSlides = Math.ceil(reviews.length / reviewsPerSlide);

  return (
    <div className="bg-yellow-100 py-20 md:py-28 lg:py-32 relative overflow-hidden">
      <div className="max-full relative z-10 px-4 sm:px-6 lg:px-8">
        <ReviewHeader />

        {/* Reviews Carousel */}
        <div className="relative">
          <CarouselNavigation onPrev={prevSlide} onNext={nextSlide} />

          {/* Reviews Container */}
          <div 
            className={`md:grid md:gap-8 md:px-12 ${
              reviewsPerSlide === 3 
                ? 'md:grid-cols-2 lg:grid-cols-3' 
                : reviewsPerSlide === 2
                ? 'md:grid-cols-2'
                : 'md:grid-cols-1'
            }`}
          >
            <MobileReviewCarousel
              reviews={reviews}
              currentSlide={currentSlide}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            />

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

