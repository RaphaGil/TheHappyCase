import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShieldAlt, 
  faShippingFast, 
  faLock, 
  faAward, 
  faHeart, 
  faUndo,
  faHeadset
} from '@fortawesome/free-solid-svg-icons';

const TrustFeatures = () => {
  const features = [
    {
      icon: faShieldAlt,
      title: "Safe Website",
      description: "Secure & encrypted checkout"
    },
    {
      icon: faShippingFast,
      title: "Ship Worldwide",
      description: "Free shipping on orders over $50"
    },
    {
      icon: faLock,
      title: "Secure Payment",
      description: "100% secure payment processing"
    },
    {
      icon: faAward,
      title: "Premium Quality",
      description: "High-quality materials & craftsmanship"
    },
    {
      icon: faHeart,
      title: "Made with Love",
      description: "Handcrafted with attention to detail"
    },
    // {
    //   icon: faUndo,
    //   title: "Easy Returns",
    //   description: "30-day money-back guarantee"
    // },
    // {
    //   icon: faHeadset,
    //   title: "24/7 Support",
    //   description: "Customer service always available"
    // }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20">
            <FontAwesomeIcon icon={faAward} className="text-yellow-400" />
            <span className="text-white font-semibold text-sm">Trusted Worldwide</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{fontFamily: "'Fredoka One', cursive"}}>
            Why Choose The Happy Case?
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experience the perfect blend of security, quality, and style with our premium passport cases
          </p>
        </div>
        
        {/* Modern horizontal feature cards */}
        <div className="flex flex-wrap justify-center items-stretch gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-500 flex-1 min-w-[220px] max-w-[280px] hover:bg-white/15"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                {/* Icon with gradient border */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 p-0.5">
                    <div className="w-full h-full bg-slate-900 rounded-2xl flex items-center justify-center">
                      <FontAwesomeIcon 
                        icon={feature.icon} 
                        className="text-white text-2xl group-hover:scale-110 transition-transform duration-300" 
                      />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300" style={{fontFamily: "'Fredoka One', cursive"}}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>

                {/* Decorative line */}
                <div className="mt-6 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="group">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">10K+</div>
            <div className="text-gray-400 text-sm">Happy Customers</div>
          </div>
          <div className="group">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-pink-300 transition-colors duration-300">50+</div>
            <div className="text-gray-400 text-sm">Countries</div>
          </div>
          <div className="group">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">4.9★</div>
            <div className="text-gray-400 text-sm">Rating</div>
          </div>
          <div className="group">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-green-300 transition-colors duration-300">99%</div>
            <div className="text-gray-400 text-sm">Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustFeatures;
