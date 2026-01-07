import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const LoginIcon = ({ isMobile = false }) => {
  return (
    <Link
      to="/login"
      className={`${isMobile ? 'hidden' : 'hidden lg:flex'} items-center p-1.5 text-gray-800 hover:text-gray-600 transition-colors z-10`}
      aria-label="Log in or create an account"
    >
      <FontAwesomeIcon 
        icon={faUser} 
        className="w-5 h-5" 
        style={{ 
          filter: 'opacity(0.85)',
          transform: 'scale(0.9)'
        }}
      />
    </Link>
  );
};

export default LoginIcon;

