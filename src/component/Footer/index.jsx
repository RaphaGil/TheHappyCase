import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faInstagram, 
  faTiktok, 
  faFacebook, 
  faTwitter,
  faYoutube,
  faWhatsapp,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faHeart,
  faShieldAlt,
  faTruck,
  faUndo,
  faHeadset
} from '@fortawesome/free-solid-svg-icons';
import { faInstagram as faInstagramBrand, faTiktok as faTiktokBrand, faFacebook as faFacebookBrand, faTwitter as faTwitterBrand, faYoutube as faYoutubeBrand, faWhatsapp as faWhatsappBrand } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img 
                src="/TheHappyCase/images/logo.png" 
                className="h-16 w-20 mr-3" 
                alt="The Happy Case Logo" 
              />
              <h3 className="text-2xl font-bold" style={{fontFamily: "'Fredoka One', cursive"}}>
                The Happy Case
              </h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Creating personalized luggage cases that bring joy to your travels. 
              Made with love and attention to detail.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/thehappycase" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-full hover:scale-110 transition-transform duration-300"
                aria-label="Follow us on Instagram"
              >
                <FontAwesomeIcon icon={faInstagramBrand} className="text-white text-lg" />
              </a>
              <a 
                href="https://tiktok.com/@thehappycase" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-black to-gray-800 p-3 rounded-full hover:scale-110 transition-transform duration-300"
                aria-label="Follow us on TikTok"
              >
                <FontAwesomeIcon icon={faTiktokBrand} className="text-white text-lg" />
              </a>
              <a 
                href="https://facebook.com/thehappycase" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-blue-600 to-blue-800 p-3 rounded-full hover:scale-110 transition-transform duration-300"
                aria-label="Follow us on Facebook"
              >
                <FontAwesomeIcon icon={faFacebookBrand} className="text-white text-lg" />
              </a>
              <a 
                href="https://youtube.com/@thehappycase" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-red-600 to-red-800 p-3 rounded-full hover:scale-110 transition-transform duration-300"
                aria-label="Subscribe to our YouTube"
              >
                <FontAwesomeIcon icon={faYoutubeBrand} className="text-white text-lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold" style={{fontFamily: "'Fredoka One', cursive"}}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center">

                 Home
                </a>
              </li>
              <li>
                <a href="/DesignIdeas" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center">
           
                  Design Ideas
                </a>
              </li>
              <li>
                <a href="/CreateYours" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center">
               
                  Create Yours
                </a>
              </li>
              <li>
                <a href="/Flags" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center">
              
                  Flags
                </a>
              </li>
              <li>
                <a href="/ColorfulCharms" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center">

                  Colorful Charms
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold" style={{fontFamily: "'Fredoka One', cursive"}}>
              Customer Service
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="/faq" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center">
                  <FontAwesomeIcon icon={faHeadset} className="mr-2 text-sm" />
                  FAQ
                </a>
              </li>
              <li>
                <a href="/shipping" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center">
                  <FontAwesomeIcon icon={faTruck} className="mr-2 text-sm" />
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="/returns" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center">
                  <FontAwesomeIcon icon={faUndo} className="mr-2 text-sm" />
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center">
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-sm" />
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold" style={{fontFamily: "'Fredoka One', cursive"}}>
              Get In Touch
            </h4>
            <div className="space-y-3">
              <a 
                href="https://wa.me/1234567890" 
                className="flex items-center text-gray-300 hover:text-green-400 transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faWhatsappBrand} className="mr-3 text-green-400" />
                <span>WhatsApp: +1 (234) 567-890</span>
              </a>
              <a 
                href="mailto:hello@thehappycase.com" 
                className="flex items-center text-gray-300 hover:text-white transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faEnvelope} className="mr-3" />
                <span>hello@thehappycase.com</span>
              </a>
              <div className="flex items-center text-gray-300">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-3" />
                <span>Worldwide Shipping</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Payment Methods */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">We Accept:</span>
              <div className="flex space-x-2">
                <div className="bg-white rounded px-3 py-1 text-blue-600 font-bold text-sm">VISA</div>
                <div className="bg-white rounded px-3 py-1 text-red-600 font-bold text-sm">MC</div>
                <div className="bg-white rounded px-3 py-1 text-blue-500 font-bold text-sm">AMEX</div>
                <div className="bg-white rounded px-3 py-1 text-green-600 font-bold text-sm">PP</div>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-400">
                © {currentYear} The Happy Case. Made with 
                <FontAwesomeIcon icon={faHeart} className="mx-1 text-red-500" />
                for travelers worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
