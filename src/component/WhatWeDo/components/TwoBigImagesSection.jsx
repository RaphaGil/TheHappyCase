import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';

const TwoBigImagesSection = ({ image1, image2 }) => {
  const [sectionRef] = useScrollAnimation({ threshold: 0.1 });
  const navigate = useNavigate();

  return (
    <div ref={sectionRef} className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
        {/* First Image */}
        <div className="relative w-full  h-[400px] sm:h-[500px] md:h-[700px] lg:h-[800px] overflow-hidden bg-gray-100">
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url(${image1})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Fallback img for SEO and accessibility */}
            <img
              src={image1}
              className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none"
              alt="Design idea"
              loading="lazy"
              fetchPriority="low"
              decoding="async"
              width="1200"
              height="800"
              aria-hidden="true"
            />
          </div>
          
          {/* Personalise Button Overlay - Bottom */}
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center z-10 pb-6 md:pb-8">
            <button
              onClick={() => navigate('/CreateYours')}
              className="px-8 py-3 text-sm uppercase tracking-wider font-inter bg-btn-primary-blue hover:bg-btn-primary-blue-hover text-btn-primary-blue-text border border-btn-primary-blue-border hover:border-btn-primary-blue-hover transition-all duration-200 shadow-lg"
            >
              PERSONALISE
            </button>
          </div>
        </div>

        {/* Second Image */}
        <div className="relative w-full h-[400px] sm:h-[500px] md:h-[700px] lg:h-[800px] overflow-hidden bg-gray-100">
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url(${image2})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Fallback img for SEO and accessibility */}
            <img
              src={image2}
              className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none"
              alt="Design idea"
              loading="lazy"
              fetchPriority="low"
              decoding="async"
              width="1200"
              height="800"
              aria-hidden="true"
            />
          </div>
          
          {/* Personalise Button Overlay - Bottom */}
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center z-10 pb-6 md:pb-8">
            <button
              onClick={() => navigate('/CreateYours')}
              className="px-8 py-3 text-sm uppercase tracking-wider font-inter bg-btn-primary-blue hover:bg-btn-primary-blue-hover text-btn-primary-blue-text border border-btn-primary-blue-border hover:border-btn-primary-blue-hover transition-all duration-200 shadow-lg"
            >
              PERSONALISE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoBigImagesSection;

