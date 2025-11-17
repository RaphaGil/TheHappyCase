import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faChevronLeft, faChevronRight, faGlobe } from '@fortawesome/free-solid-svg-icons';

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Randi",
      rating: 5,
      text: "The case is perfect! So much nicer in person. The photos don’t do it justice. Raphaela gives 5 star service! Don’t second guess it. Just buy one!",
      location: "London, UK",
     
    },
    {
      id: 2,
      name: "Viktorija",
      rating: 5,
      text: "The passport cover is absolutely beautiful, with all the little details that make it feel special. The quality is excellent as well. I’m especially impressed with the seller’s communication and helpfulness..she went above and beyond to ship it as quickly as possible so it would arrive in time. Highly recommended! 😄🫶🏽",
      location: "Podstrana, Croatia",
     
    },
    {
      id: 3,
      name: "Nina",
      rating: 5,
      text: "Love love love this! Fantastic quality!",
      location: "Burnley, United Kingdom",
  
    },
    {
      id: 4,
      name: "Daniela",
      rating: 5,
      text: "I’m so happy with this passport! better than I expected. The material feels really sturdy and well-made, and the little decorative pins are SO cute, they give it such a fun, personal touch. The delivery was fast and arrived exactly how I ordered. Definitely recommend",
      location: "London, United Kingdom",
    
    },
    {
      id: 5,
      name: "Luana",
      rating: 5,
      text: "I had been on the hunt for the perfect passport case for a while, and then I got one as a birthday gift. I instantly fell in love with it, so I decided to get another one. The quality is fantastic, and the ability to customise it is such a great idea. I’ve already started buying them for the people I love, so they can protect their passports with such a beautiful case too!",
      location: "London, United Kingdom",
  
    },
    {
      id: 6,
      name: "Ahmed",
      rating: 5,
      text: "Outstanding quality and service! The case survived my backpacking trip through Europe. Will definitely order again!",
      location: "Cairo, Egypt",
   
    },
    {
      id: 7,
      name: "Imma",
      rating: 5,
      text: "This was a birthday gift for my friend and she loved it. Very good quality. I really recommend.",
      location: "London, United Kingdom",
    },
    {
      id: 8,
      name: "Margherita",
      rating: 5,
      text: "I am so happy about this passport holder. Great quality and attention to details",
      location: "Brentford, United Kingdom",
    },
    {
      id: 9,
      name: "Kristi",
      rating: 5,
      text: "The item was as cute and unique as pictured. Very excited for my next travels with it.",
      location: "White House, USA",
    },
    {
      id: 10,
      name: "Sandra",
      rating: 5,
      text: "Great item.... very good quality 👌",
      location: "London, United Kingdom",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [reviewsPerSlide, setReviewsPerSlide] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setReviewsPerSlide(3);
      } else if (window.innerWidth >= 768) {
        setReviewsPerSlide(2);
      } else {
        setReviewsPerSlide(1);
      }
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FontAwesomeIcon
        key={index}
        icon={faStar}
        className={`text-xs ${index < rating ? 'text-gray-900' : 'text-gray-300'}`}
      />
    ));
  };

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

  return (
    <div className="bg-white py-12 md:py-16 lg:py-20 relative overflow-hidden border-t border-gray-100">
      <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-800 mb-2" style={{fontFamily: "'Poppins', sans-serif", letterSpacing: '0.05em'}}>
            What Our Customers Say
          </h2>
          <div className="w-16 h-px bg-green-300/60 mx-auto"></div>
        </div>

        {/* Reviews Carousel */}
        <div className="relative">
          {/* Navigation arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 sm:left-2 md:left-8 top-1/2 transform -translate-y-1/2 -translate-x-2 sm:-translate-x-4 md:-translate-x-8 lg:-translate-x-12 z-20 bg-green-50/90 border-2 border-green-200/50 hover:border-green-300/70 hover:bg-green-50 rounded-full p-1.5 sm:p-2 md:p-3 transition-all duration-200 shadow-sm"
            aria-label="Previous reviews"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-green-600/70 text-xs sm:text-sm" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 sm:right-2 md:right-8 top-1/2 transform -translate-y-1/2 translate-x-2 sm:translate-x-4 md:translate-x-8 lg:translate-x-12 z-20 bg-green-50/90 border-2 border-green-200/50 hover:border-green-300/70 hover:bg-green-50 rounded-full p-1.5 sm:p-2 md:p-3 transition-all duration-200 shadow-sm"
            aria-label="Next reviews"
          >
            <FontAwesomeIcon icon={faChevronRight} className="text-green-600/70 text-xs sm:text-sm" />
          </button>

          {/* Reviews Grid */}
          <div className={`grid gap-4 sm:gap-6 md:gap-8 px-6 sm:px-8 md:px-12 lg:px-8 ${
            reviewsPerSlide === 3 
              ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3 max-w-7xl' 
              : reviewsPerSlide === 2
              ? 'grid-cols-1 md:grid-cols-2 max-w-5xl'
              : 'grid-cols-1 max-w-2xl'
          } mx-auto`}>
            {visibleReviews.map((review, index) => (
              <div
                key={review.id}
                className="bg-white/80 backdrop-blur-sm border-2 border-green-200/40 p-4 sm:p-5 md:p-6 lg:p-8 transition-all duration-200 rounded-lg hover:border-green-300/60 hover:shadow-md"
              >
                <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  {renderStars(review.rating)}
                </div>

                {/* Review Text */}
                <p className="text-gray-700 mb-4 sm:mb-5 md:mb-6 leading-relaxed text-xs sm:text-sm" style={{fontFamily: "'Poppins', sans-serif", fontWeight: 300}}>
                  "{review.text}"
                </p>

                {/* Customer Info */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-gray-900 font-medium border border-gray-200 bg-gray-50 text-xs flex-shrink-0" style={{fontFamily: "'Poppins', sans-serif"}}>
                    {review.avatar || review.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-medium text-gray-900 text-xs sm:text-sm truncate" style={{fontFamily: "'Poppins', sans-serif"}}>
                      {review.name}
                    </h4>
                    <div className="flex items-center gap-1 sm:gap-1.5">
                      <FontAwesomeIcon icon={faGlobe} className="text-gray-400 text-xs flex-shrink-0" />
                      <p className="text-gray-500 text-xs truncate" style={{fontFamily: "'Poppins', sans-serif"}}>
                        {review.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel indicators */}
          <div className="flex justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
            {Array.from({ length: Math.ceil(reviews.length / reviewsPerSlide) }, (_, index) => {
              return (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index * reviewsPerSlide)}
                  className={`h-1 sm:h-1.5 rounded-full transition-all duration-200 ${
                    Math.floor(currentSlide / reviewsPerSlide) === index 
                      ? 'bg-green-400 w-6 sm:w-8 shadow-sm' 
                      : 'bg-green-200/60 hover:bg-green-300/80 w-1.5 sm:w-2'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              );
            })}
          </div>
        </div>

       
       
      </div>
    </div>
  );
};

export default Reviews;