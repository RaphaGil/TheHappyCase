import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram as faInstagramBrand, faTiktok as faTiktokBrand, faFacebook as faFacebookBrand, faCcVisa, faCcMastercard, faCcAmex, faCcPaypal } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-yellow-100 border-t border-gray-100">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Link to="/" className="hover:opacity-90 transition-opacity duration-300" aria-label="HappyCase home">
                <div
                  className="flex flex-col cursor-pointer transition-all duration-300 text-gray-900"
                  style={{ fontFamily: "'Fredoka One', cursive" }}
                >
                  <span className="text-[10px] md:text-xs font-bold leading-tight tracking-[0.35em] text-blue-900 uppercase">
                    THE
                  </span>
                  <span className="text-xl md:text-3xl font-bold leading-none flex items-center gap-0 text-blue-900 uppercase">
                    {'HAPPY'.split('').map((letter, index) => (
                      <span 
                        key={index}
                        className="inline-block animate-smile-curve"
                        style={{
                          animationDelay: `${index * 0.1}s`,
                        }}
                      >
                        {letter}
                      </span>
                    ))}
                  </span>
                  <span className="text-end text-[10px] md:text-xs font-bold leading-tight tracking-[0.35em] text-blue-900 uppercase">
                    CASE
                  </span>
                </div>
                <style>{`
                  @keyframes smileCurve {
                    0%, 100% {
                      transform: translateY(0) rotate(0deg);
                    }
                    25% {
                      transform: translateY(-2px) rotate(-2deg);
                    }
                    50% {
                      transform: translateY(-4px) rotate(0deg);
                    }
                    75% {
                      transform: translateY(-2px) rotate(2deg);
                    }
                  }
                  .animate-smile-curve {
                    animation: smileCurve 2s ease-in-out infinite;
                  }
                `}</style>
              </Link>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
              Creating personalized passport cases that bring joy to your travels. 
              Made with love and attention to detail.
            </p>
            <div className="flex gap-3">
            
              <a 
                href="https://instagram.com/thehappycase.store" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80"
                aria-label="Follow us on Instagram"
              >
                <FontAwesomeIcon icon={faInstagramBrand} className="text-lg" style={{color: '#E4405F'}} />
              </a>
              <a 
                href="https://tiktok.com/@thehappycase.store" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80"
                aria-label="Follow us on TikTok"
              >
                <FontAwesomeIcon icon={faTiktokBrand} className="text-lg" style={{color: '#000000'}} />
              </a>
              <a 
                href="https://facebook.com/thehappycase" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80"
                aria-label="Follow us on Facebook"
              >
                <FontAwesomeIcon icon={faFacebookBrand} className="text-lg" style={{color: '#1877F2'}} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-wider text-gray-900 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
              Quick Links
            </h4>
            <ul className="space-y-2">
            <li>
                <Link to="/about" className="text-xs text-gray-500 hover:text-gray-900 transition-colors duration-200 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
                 About 
                </Link>
              </li>
              <li>
                <a href="/" className="text-xs text-gray-500 hover:text-gray-900 transition-colors duration-200 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
                 Home
                </a>
              </li>
              {/* <li>
                <a href="/DesignIdeas" className="text-xs text-gray-500 hover:text-gray-900 transition-colors duration-200 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
                  Design Ideas
                </a>
              </li> */}
              <li>
                <a href="/CreateYours" className="text-xs text-gray-500 hover:text-gray-900 transition-colors duration-200 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
                  Create Yours
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-wider text-gray-900 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
              Customer Service
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/shipping" className="text-xs text-gray-500 hover:text-gray-900 transition-colors duration-200 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
                  Shipping and Processing Times
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-xs text-gray-500 hover:text-gray-900 transition-colors duration-200 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          {/* <div className="space-y-4">
            <h4 className="text-xl font-bold" style={{fontFamily: "'Fredoka One', cursive", color: '#1e3a8a'}}>
              Get In Touch
            </h4>
            <div className="space-y-3">
              <a 
                href="mailto:hello@thehappycase.com" 
                className="flex items-center text-gray-600 hover:text-blue-900 transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faEnvelope} className="mr-3" />
                <span>hello@thehappycase.com</span>
              </a>
              <div className="flex items-center text-gray-600">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-3" />
                <span>Worldwide Shipping</span>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-100 bg-yellow-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Payment Methods */}
            <div className="flex items-center space-x-4">
              <span className="text-xs text-gray-500 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>We Accept:</span>
              <div className="flex space-x-3 items-center">
                <FontAwesomeIcon icon={faCcVisa} className="text-xl" style={{color: '#1434CB'}} />
                <FontAwesomeIcon icon={faCcMastercard} className="text-xl" style={{color: '#EB001B'}} />
                <FontAwesomeIcon icon={faCcAmex} className="text-xl" style={{color: '#006FCF'}} />
                <FontAwesomeIcon icon={faCcPaypal} className="text-xl" style={{color: '#003087'}} />
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-xs text-gray-500 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
                © {currentYear} The Happy Case. Made with love for all the travelers out there. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
