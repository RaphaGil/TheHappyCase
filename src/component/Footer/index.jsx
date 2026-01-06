import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram as faInstagramBrand, faTiktok as faTiktokBrand, faFacebook as faFacebookBrand, faEtsy, faCcVisa, faCcMastercard, faCcAmex, faCcPaypal } from '@fortawesome/free-brands-svg-icons';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import AnimatedTitle from '../AnimatedTitle';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

function Footer() {
  const currentYear = new Date().getFullYear();
  const [quickLinksOpen, setQuickLinksOpen] = useState(false);
  const [customerServiceOpen, setCustomerServiceOpen] = useState(false);
  const [sectionRef, sectionVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <footer ref={sectionRef} className="bg-white border-t border-gray-100">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12">
          
          {/* Company Info */}
          <div className="space-y-5 pb-6 md:pb-0  md:border-0">
            <div className="flex items-center mb-2">
              <Link to="/" className="hover:opacity-90 transition-opacity duration-300" aria-label="HappyCase home">
                <div
                  className="flex flex-col cursor-pointer transition-all duration-300 text-gray-900 font-fredoka"
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
            <p className="text-gray-900 text-body-sm leading-relaxed font-light pt-2 font-inter">
              Creating personalized passport cases that bring joy to your travels. 
              Made with love and attention to detail.
            </p>
            <div className="flex flex-col gap-3 pt-2">
            <p className="text-body-sm text-gray-900 font-light font-inter">Follow us!</p>
            <div className="flex gap-4">
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
              <a 
                href="https://www.etsy.com/shop/TheHappyCaseShop?ref=dashboard-header" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80"
                aria-label="Visit our Etsy shop"
              >
                <FontAwesomeIcon icon={faEtsy} className="text-lg" style={{color: '#F45800'}} />
              </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3  md:pb-0 ">
            {/* Mobile: Dropdown button */}
            <button
              onClick={() => setQuickLinksOpen(!quickLinksOpen)}
              className="md:hidden flex items-center justify-between w-full text-caption uppercase tracking-wider text-gray-900 hover:text-gray-800 transition-colors duration-200 mb-2 font-bold "
            >
              {sectionVisible && (
                <AnimatedTitle delay={100} className="font-bold">
                  Quick Links
                </AnimatedTitle>
              )}
              <FontAwesomeIcon 
                icon={quickLinksOpen ? faChevronUp : faChevronDown} 
                className="text-xs ml-2"
              />
            </button>
            {/* Desktop: Static heading */}
            <h4 className="hidden md:block text-caption uppercase tracking-wider text-gray-900  mb-2 font-bold ">
              {sectionVisible && (
                <AnimatedTitle delay={100} className="font-bold">
                  Quick Links
                </AnimatedTitle>
              )}
            </h4>
            {/* Mobile: Conditional content */}
            {quickLinksOpen && (
              <ul className="md:hidden space-y-3 ">
                <li>
                  <Link to="/about" className="text-caption text-gray-900 hover:text-gray-800 transition-colors duration-200 font-light font-inter">
                   About 
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-caption text-gray-900 hover:text-gray-800 transition-colors duration-200 font-light font-inter">
                   Home
                  </Link>
                </li>
                {/* <li>
                  <Link to="/DesignIdeas" className="text-caption text-gray-500 hover:text-gray-900 transition-colors duration-200 font-light font-inter">
                    Design Ideas
                  </Link>
                </li> */}
                <li>
                  <Link to="/CreateYours" className="text-caption text-gray-900 hover:text-gray-800 transition-colors duration-200 font-light font-inter">
                    Create Yours
                  </Link>
                </li>
              </ul>
            )}
            {/* Desktop: Always visible content */}
            <ul className="hidden md:block ">
              <li>
                <Link to="/about" className="text-sm text-gray-900 hover:text-gray-800 transition-colors duration-200 font-light font-inter">
                 About 
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-900 hover:text-gray-800 transition-colors duration-200 font-light font-inter">
                 Home
                </Link>
              </li>
              {/* <li>
                <Link to="/DesignIdeas" className="text-xs text-gray-500 hover:text-gray-900 transition-colors duration-200 font-light font-inter">
                  Design Ideas
                </Link>
              </li> */}
              <li>
                <Link to="/CreateYours" className="text-sm text-gray-900 hover:text-gray-800 transition-colors duration-200 font-light font-inter">
                  Create Yours
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-3">
            {/* Mobile: Dropdown button */}
            <button
              onClick={() => setCustomerServiceOpen(!customerServiceOpen)}
              className="md:hidden flex items-center justify-between w-full  uppercase tracking-wider text-gray-900 font-bold hover:text-gray-800 transition-colors duration-200 mb-2 "
            >
              {sectionVisible && (
                <AnimatedTitle delay={200} className="font-bold">
                  Customer Service
                </AnimatedTitle>
              )}
              <FontAwesomeIcon 
                icon={customerServiceOpen ? faChevronUp : faChevronDown} 
                className="text-xs ml-2"
              />
            </button>
            {/* Desktop: Static heading */}
            <h4 className="hidden md:block text-caption uppercase tracking-wider text-gray-900 font-bold mb-2 font-inter">
              {sectionVisible && (
                <AnimatedTitle delay={200} className="font-bold">
                  Customer Service
                </AnimatedTitle>
              )}
            </h4>
            {/* Mobile: Conditional content */}
            {customerServiceOpen && (
              <ul className="md:hidden space-y-3 ">
                <li>
                  <Link to="/shipping" className="text-sm text-gray-900 hover:text-gray-800 transition-colors duration-200 font-light font-inter">
                    Shipping and Processing Times
                  </Link>
                </li>
                <li>
                  <Link to="/returns" className="text-sm text-gray-900 hover:text-gray-800 transition-colors duration-200 font-light font-inter">
                    Refund Policy
                  </Link>
                </li>
              </ul>
            )}
            {/* Desktop: Always visible content */}
            <ul className="hidden md:block space-y-1 ">
              <li>
                <Link to="/shipping" className="text-sm text-gray-900 hover:text-gray-800 transition-colors duration-200 font-light font-inter">
                  Shipping and Processing Times
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-sm text-gray-900 hover:text-gray-800 transition-colors duration-200 font-light font-inter">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          {/* <div className="space-y-4">
            <h4 className="text-heading-sm font-bold font-fredoka" style={{color: '#1e3a8a'}}>
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
      <div className=" bg-white ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Payment Methods */}
            <div className="flex items-center space-x-4">
              <div className="flex space-x-3 items-center">
                <FontAwesomeIcon icon={faCcVisa} className="text-xl" style={{color: '#1434CB'}} />
                <FontAwesomeIcon icon={faCcMastercard} className="text-xl" style={{color: '#EB001B'}} />
                <FontAwesomeIcon icon={faCcAmex} className="text-xl" style={{color: '#006FCF'}} />
                <FontAwesomeIcon icon={faCcPaypal} className="text-xl" style={{color: '#003087'}} />
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-caption text-gray-900 font-light font-inter">
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
