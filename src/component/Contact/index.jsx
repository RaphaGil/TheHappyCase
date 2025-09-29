import React, { useState } from 'react';
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
      avatar: "RD",
      verified: true,
      purchaseDate: "27 Aug, 2025"
    },
    {
      id: 2,
      name: "Viktorija",
      rating: 5,
      text: "The passport cover is absolutely beautiful, with all the little details that make it feel special. The quality is excellent as well. I’m especially impressed with the seller’s communication and helpfulness..she went above and beyond to ship it as quickly as possible so it would arrive in time. Highly recommended! 😄🫶🏽",
      location: "Podstrana, Croatia",
      avatar: "VT",
      verified: true,
      purchaseDate: "03 Aug, 2025"
    },
    {
      id: 3,
      name: "Nina",
      rating: 5,
      text: "Love love love this! Fantastic quality!",
      location: "Burnley, United Kingdom",
      avatar: "NA",
      verified: true,
      purchaseDate: "25 Jun, 2025"
    },
    {
      id: 4,
      name: "Daniela",
      rating: 5,
      text: "I’m so happy with this passport! better than I expected. The material feels really sturdy and well-made, and the little decorative pins are SO cute, they give it such a fun, personal touch. The delivery was fast and arrived exactly how I ordered. Definitely recommend",
      location: "London, United Kingdom",
      avatar: "DP",
      verified: true,
      purchaseDate: "1 week ago"
    },
    {
      id: 5,
      name: "Luana",
      rating: 5,
      text: "I had been on the hunt for the perfect passport case for a while, and then I got one as a birthday gift. I instantly fell in love with it, so I decided to get another one. The quality is fantastic, and the ability to customise it is such a great idea. I’ve already started buying them for the people I love, so they can protect their passports with such a beautiful case too!",
      location: "London, United Kingdom",
      avatar: "LF",
      verified: true,
      purchaseDate: "2 months ago"
    },
    {
      id: 6,
      name: "Ahmed Hassan",
      rating: 5,
      text: "Outstanding quality and service! The case survived my backpacking trip through Europe. Will definitely order again!",
      location: "Cairo, Egypt",
      avatar: "AH",
      verified: true,
      purchaseDate: "1 month ago"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const reviewsPerSlide = 3;

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FontAwesomeIcon
        key={index}
        icon={faStar}
        className={`text-sm ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
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
    <div className="bg-gradient-to-br from-gray-50 to-white py-20 px-4 relative overflow-hidden">
      {/* Background decoration with What We Do colors */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-28 h-28 bg-green-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-10 w-20 h-20 bg-pink-200 rounded-full opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          {/* <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-6 shadow-lg"> */}
            {/* <FontAwesomeIcon icon={faHeart} className="text-red-500" /> */}
            {/* <span className="text-sm font-semibold text-gray-700">Trusted by 10,000+ Travelers</span> */}
          {/* </div> */}
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 tracking-tight" style={{fontFamily: "'Fredoka One', cursive"}}>
            What Our Customers Say
          </h2>
          
          {/* Color accent line matching What We Do */}
          <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-pink-400 mx-auto rounded-full mb-6"></div>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8" style={{fontFamily: "'Poppins', sans-serif"}}>
            Don't just take our word for it - hear from our happy customers around the world who love their custom passport cases!
          </p>

          {/* Overall rating */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              {renderStars(5)}
            </div>
            <span className="text-2xl font-bold text-gray-800">4.9/5</span>
            {/* <span className="text-gray-500">from 10 reviews</span> */}
          </div>
        </div>

        {/* Reviews Carousel */}
        <div className="relative">
          {/* Navigation arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-20 bg-orange-400 hover:bg-orange-500 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-white" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-20 bg-blue-400 hover:bg-blue-500 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <FontAwesomeIcon icon={faChevronRight} className="text-white" />
          </button>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
            {visibleReviews.map((review, index) => (
              <div
                key={review.id}
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border border-white/20"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* Quote Icon */}
                <div className="flex justify-between items-start mb-6">
                  {/* <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center">
                    <FontAwesomeIcon icon={faQuoteLeft} className="text-white text-xl" />
                  </div> */}
                  
                  {/* {review.verified && (
                    <div className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-semibold">
                
                    </div>
                  )} */}
                </div>

                <div className="flex items-center gap-2 mb-6">
                  {renderStars(review.rating)}
                  {/* <span className="text-sm text-gray-500 ml-2">{review.purchaseDate}</span> */}
                </div>

                {/* Review Text */}
                <p className="text-gray-700 mb-8 leading-relaxed text-lg" style={{fontFamily: "'Inter', sans-serif", fontWeight: 400}}>
                  "{review.text}"
                </p>

                {/* Customer Info */}
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                    index === 0 ? 'bg-orange-400' :
                    index === 1 ? 'bg-blue-400' :
                    index === 2 ? 'bg-green-400' :
                    'bg-pink-400'
                  }`}>
                    {review.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg" style={{fontFamily: "'Fredoka One', cursive"}}>
                      {review.name}
                    </h4>
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faGlobe} className="text-gray-400 text-sm" />
                      <p className="text-gray-500 text-sm" style={{fontFamily: "'Inter', sans-serif"}}>
                        {review.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel indicators with What We Do colors */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: Math.ceil(reviews.length / reviewsPerSlide) }, (_, index) => {
              const colors = ['bg-orange-400', 'bg-blue-400', 'bg-green-400', 'bg-pink-400'];
              const activeColor = colors[index % colors.length];
              return (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index * reviewsPerSlide)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    Math.floor(currentSlide / reviewsPerSlide) === index 
                      ? `${activeColor} w-8` 
                      : 'bg-gray-300 hover:bg-gray-400 w-3'
                  }`}
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