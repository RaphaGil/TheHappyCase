import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the navigation menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close the menu when a link is clicked
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="flex bg-gray-100 justify-between pr-2 pl-2 h-16">
      <img src='/assets/images/logo.png' className='h-18 w-18 md:h-20 md:w-22 p-2' alt="Logo" />
      
      {/* Hamburger menu icon */}
      <button
        onClick={toggleMenu}
        className="lg:hidden pr-2 text-blue-900 focus:outline-none"
      >
        {!isOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
      </button>

      {/* Navbar links */}
      <ul
        className={`flex space-x-4 lg:flex ${isOpen ? 'flex-col absolute left-0 right-0 top-0 pt-16 h-full text-white text-right space-y-4 bg-blue-900' : 'justify-center items-center hidden lg:flex text-gray-800'}`}
      >
        {isOpen && (
          <button
            onClick={toggleMenu}
            className="absolute top-5 right-4 text-white focus:outline-none "
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
        <li><Link to="/" className="p-6 hover:text-gray-300" onClick={closeMenu}>Home</Link></li>
        <li><Link to="/PassportCover" className="p-6 hover:text-gray-300" onClick={closeMenu}>Passport Cover</Link></li>
        <li><Link to="/Pins" className="p-6 hhover:text-gray-300" onClick={closeMenu}>Pins</Link></li>
        <li><Link to="/DesignIdeas" className="p-6 hover:text-gray-300" onClick={closeMenu}>Design Ideas</Link></li>
        <li><Link to="/CreateYours" className="p-6 hover:text-gray-300" onClick={closeMenu}>Create Yours</Link></li>
        <li><Link to="#contactus" className="p-6 hover:text-gray-300" onClick={closeMenu}>Contact</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;
