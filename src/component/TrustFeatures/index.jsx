import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShieldAlt, 
  faShippingFast, 
  faLock, 
  faAward, 
  faHeart
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
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-teal-50 py-20 px-4 relative overflow-hidden">
      {/* Geometric background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-40 h-40 border-2 border-orange-400 rotate-45 animate-spin" style={{animationDuration: '20s'}}></div>
        <div className="absolute top-40 right-32 w-32 h-32 border-2 border-blue-400 rotate-12 animate-pulse"></div>
        <div className="absolute bottom-32 left-40 w-48 h-48 border-2 border-green-400 -rotate-12 animate-bounce" style={{animationDuration: '3s'}}></div>
        <div className="absolute top-1/2 right-20 w-24 h-24 border-2 border-pink-400 rotate-45 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      
      {/* Floating shapes with complementary colors */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-16 w-20 h-20 bg-gradient-to-br from-indigo-300 to-indigo-500 rounded-lg rotate-12 opacity-30 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-32 right-24 w-16 h-16 bg-gradient-to-br from-purple-300 to-purple-500 rounded-full opacity-40 animate-bounce" style={{animationDelay: '4s', animationDuration: '2s'}}></div>
        <div className="absolute bottom-24 left-32 w-24 h-24 bg-gradient-to-br from-teal-300 to-teal-500 transform rotate-45 opacity-35 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-12 h-12 bg-gradient-to-br from-cyan-300 to-cyan-500 rounded-full opacity-45 animate-bounce" style={{animationDelay: '3s', animationDuration: '2.5s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          {/* <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20">
            <FontAwesomeIcon icon={faAward} className="text-yellow-400" />
            <span className="text-white font-semibold text-sm">Trusted Worldwide</span>
          </div> */}
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6" style={{fontFamily: "'Fredoka One', cursive"}}>
            Why Choose The Happy Case?
          </h2>
          
          {/* Color accent line matching What We Do */}
          <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-pink-400 mx-auto rounded-full mb-6"></div>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the perfect blend of security, quality, and style with our premium passport cases
          </p>
        </div>
        
        {/* Modern horizontal feature cards */}
        <div className="flex flex-wrap justify-center items-stretch gap-6">
          {features.map((feature, index) => {
            // Define colors matching What We Do section
            const colors = [
              { bg: 'from-orange-400 to-orange-500', hover: 'group-hover:text-orange-300', line: 'via-orange-400' },
              { bg: 'from-blue-400 to-blue-500', hover: 'group-hover:text-blue-300', line: 'via-blue-400' },
              { bg: 'from-green-400 to-green-500', hover: 'group-hover:text-green-300', line: 'via-green-400' },
              { bg: 'from-pink-400 to-pink-500', hover: 'group-hover:text-pink-300', line: 'via-pink-400' },
              { bg: 'from-orange-400 to-orange-500', hover: 'group-hover:text-orange-300', line: 'via-orange-400' }
            ];
            const colorScheme = colors[index % colors.length];
            
            return (
              <div 
                key={index}
                className="group relative bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200 hover:border-gray-300 transition-all duration-500 flex-1 min-w-[220px] max-w-[280px] hover:bg-white shadow-lg hover:shadow-xl"
              >
                {/* Glow effect with matching colors */}
                <div className={`absolute inset-0 bg-gradient-to-r ${colorScheme.bg.replace('from-', 'from-').replace('to-', 'to-')}/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  {/* Icon with gradient border */}
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${colorScheme.bg} p-0.5`}>
                      <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center">
                        <FontAwesomeIcon 
                          icon={feature.icon} 
                          className={`text-2xl group-hover:scale-110 transition-transform duration-300 ${colorScheme.bg.includes('orange') ? 'text-orange-500' : colorScheme.bg.includes('blue') ? 'text-blue-500' : colorScheme.bg.includes('green') ? 'text-green-500' : 'text-pink-500'}`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className={`text-xl font-bold text-gray-800 mb-3 ${colorScheme.hover} transition-colors duration-300`} style={{fontFamily: "'Fredoka One', cursive"}}>
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>

                  {/* Decorative line */}
                  <div className={`mt-6 h-0.5 bg-gradient-to-r from-transparent ${colorScheme.line} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom stats with What We Do colors */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="group">
            <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 group-hover:text-orange-500 transition-colors duration-300">10K+</div>
            <div className="text-gray-600 text-sm">Happy Customers</div>
          </div>
          <div className="group">
            <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 group-hover:text-blue-500 transition-colors duration-300">50+</div>
            <div className="text-gray-600 text-sm">Countries</div>
          </div>
          <div className="group">
            <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 group-hover:text-green-500 transition-colors duration-300">4.9★</div>
            <div className="text-gray-600 text-sm">Rating</div>
          </div>
          <div className="group">
            <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 group-hover:text-pink-500 transition-colors duration-300">99%</div>
            <div className="text-gray-600 text-sm">Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustFeatures;
