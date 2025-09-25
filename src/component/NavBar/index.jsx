import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faFlag, faPalette, faMedal, faCrown, faBriefcase, faPlane } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCharmsDropdownOpen, setIsCharmsDropdownOpen] = useState(false);
  const [isPassportDropdownOpen, setIsPassportDropdownOpen] = useState(false);
  const { getTotalItems } = useCart();
  const charmsDropdownRef = useRef(null);
  const passportDropdownRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const toggleCharmsDropdown = () => setIsCharmsDropdownOpen(!isCharmsDropdownOpen);
  const togglePassportDropdown = () => setIsPassportDropdownOpen(!isPassportDropdownOpen);
  const closeAllMenus = () => {
    setIsOpen(false);
    setIsCharmsDropdownOpen(false);
    setIsPassportDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (charmsDropdownRef.current && !charmsDropdownRef.current.contains(event.target)) {
        setIsCharmsDropdownOpen(false);
      }
      if (passportDropdownRef.current && !passportDropdownRef.current.contains(event.target)) {
        setIsPassportDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="flex bg-gradient-to-r from-yellow-100 via-blue-100 to-sky-200 justify-between items-center pr-2 pl-2 h-30 relative shadow-lg">
      <img
        src="/TheHappyCase/images/logo.png"
        className="h-20 w-25 md:h-30 md:w-30 p-2"
        alt="Logo"
      />

      {/* Hamburger menu icon */}
      <button
        onClick={toggleMenu}
        className="lg:hidden pr-2 text-blue-900 focus:outline-none"
        aria-label="Toggle menu"
      >
        {!isOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
      </button>

      {/* Navbar links */}
      <ul
        className={`lg:flex lg:space-x-4 ${
          isOpen
            ? 'flex flex-col absolute left-0 right-0 top-14 bg-white pt-6 pb-6 text-black font-thin space-y-4 shadow-md z-50'
            : 'hidden'
        }`}
      >
        <li>
          <Link to="/" className="p-6 hover:text-blue-600 font-semibold block transition-colors student-text-bold lazy-dog-title"  style={{fontFamily: "'Fredoka One', cursive"}} onClick={closeMenu}>
           HOME
          </Link>
        </li>
        <li>
          <Link to="/CreateYours" className="p-6 hover:text-blue-600 font-semibold block transition-colors student-text-bold lazy-dog-title relative group"  style={{fontFamily: "'Fredoka One', cursive"}} onClick={closeMenu}>
             CREATE YOURS
             <div className="absolute bottom-5 left-0 w-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 group-hover:w-full transition-all duration-500 ease-out"></div>
             <div className="absolute bottom-5 left-0 w-full h-1 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-20 animate-pulse"></div>
          </Link>
        </li>
        <li className="relative" ref={passportDropdownRef}>
          <button
            onClick={togglePassportDropdown}
            className="p-6 hover:text-blue-600 font-semibold transition-colors w-full text-left flex items-center justify-between student-text-bold lazy-dog-title"  style={{fontFamily: "'Fredoka One', cursive"}}
          >
            PASSPORT CASES
            <FontAwesomeIcon icon={faChevronDown} className={`ml-2 transition-transform ${isPassportDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          {isPassportDropdownOpen && (
            <div className="absolute -mt-3 left-0 bg-white shadow-lg rounded-lg mt-1 border border-blue-200 z-50 min-w-48">
              <Link
                to="/FirstClassCase"
                className="block px-4 py-3 hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={closeAllMenus}
              >
                <FontAwesomeIcon icon={faCrown} className="mr-2" />
                 First Class
              </Link>
              <Link
                to="/BusinessClassCase"
                className="block px-4 py-3 hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={closeAllMenus}
              >
                <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
                 Business Class
              </Link>
              <Link
                to="/SmartCase"
                className="block px-4 py-3 hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={closeAllMenus}
              >
                <FontAwesomeIcon icon={faPlane} className="mr-2" />
                 Economy Class
              </Link>
            </div>
          )}
        </li>
        <li className="relative" ref={charmsDropdownRef}>
          <button
            onClick={toggleCharmsDropdown}
            className="p-6 hover:text-blue-600 font-semibold transition-colors w-full text-left flex items-center justify-between student-text-bold lazy-dog-title"  style={{fontFamily: "'Fredoka One', cursive"}}
          >
             CHARMS
            <FontAwesomeIcon icon={faChevronDown} className={`ml-2 transition-transform ${isCharmsDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          {isCharmsDropdownOpen && (
            <div className="absolute -mt-3 left-0 bg-white shadow-lg rounded-lg mt-1 border border-purple-200 z-50 min-w-48">
              <Link
                to="/Flags"
                className="block px-4 py-3 hover:bg-purple-50 text-gray-700 hover:text-purple-600 transition-colors"
                onClick={closeAllMenus}
              >
                <FontAwesomeIcon icon={faFlag} className="mr-2" />
                 Flags
              </Link>
              <Link
                to="/ColorfulCharms"
                className="block px-4 py-3 hover:bg-purple-50 text-gray-700 hover:text-purple-600 transition-colors"
                onClick={closeAllMenus}
              >
                <FontAwesomeIcon icon={faPalette} className="mr-2" />
                 Colorful Charms
              </Link>
              <Link
                to="/BronzeCharms"
                className="block px-4 py-3 hover:bg-purple-50 text-gray-700 hover:text-purple-600 transition-colors"
                onClick={closeAllMenus}
              >
                <FontAwesomeIcon icon={faMedal} className="mr-2" />
                 Bronze Charms
              </Link>
            </div>
          )}
        </li>
        <li>
          <Link to="/DesignIdeas" className="p-6 hover:text-blue-600 font-semibold block transition-colors student-text-bold lazy-dog-title"  style={{fontFamily: "'Fredoka One', cursive"}} onClick={closeMenu}>
             DESIGN IDEAS
          </Link>
        </li>
        
       
        {/* <li>
          <a href="#contactus" className="p-6 hover:text-purple-600 font-semibold block transition-colors student-text-bold" onClick={closeMenu}>
            📞 CONTACT
          </a>
        </li> */}
      </ul>

      {/* Cart Link */}
      <Link
        to="/cart"
        className="hidden md:flex items-center p-6 hover:text-purple-600 relative transition-colors"
        aria-label="Go to cart"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
          className="w-6 h-6"
          fill="currentColor"
        >
          <path d="M8 64C3.6 64 0 67.6 0 72C0 76.4 3.6 80 8 80L53.7 80C65.1 80 75 88.1 77.2 99.4L136.6 402.8C141.7 429.1 164.8 448 191.6 448L488 448C492.4 448 496 444.4 496 440C496 435.6 492.4 432 488 432L191.5 432C172.4 432 155.9 418.5 152.2 399.7L142.9 352L461.2 352C494.7 352 523.7 328.9 531.3 296.4L566.6 145.1C572.5 120 553.4 96 527.7 96L92.8 96C89 77.4 72.7 64 53.7 64L8 64zM96 112L527.7 112C543.2 112 554.6 126.4 551.1 141.5L515.8 292.7C509.9 318 487.3 336 461.3 336L139.8 336L96 112zM176 528C176 510.3 190.3 496 208 496C225.7 496 240 510.3 240 528C240 545.7 225.7 560 208 560C190.3 560 176 545.7 176 528zM256 528C256 501.5 234.5 480 208 480C181.5 480 160 501.5 160 528C160 554.5 181.5 576 208 576C234.5 576 256 554.5 256 528zM432 496C449.7 496 464 510.3 464 528C464 545.7 449.7 560 432 560C414.3 560 400 545.7 400 528C400 510.3 414.3 496 432 496zM432 576C458.5 576 480 554.5 480 528C480 501.5 458.5 480 432 480C405.5 480 384 501.5 384 528C384 554.5 405.5 576 432 576z"/>
        </svg>
        {getTotalItems() > 0 && (
          <span className="absolute top-1 right-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse">
            {getTotalItems()}
          </span>
        )}
      </Link>
    </nav>
  );
};

export default NavBar;
