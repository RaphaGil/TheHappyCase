import React from 'react';
import { Link } from 'react-router-dom';

const NavigationLinks = ({ isMobile = false, onLinkClick }) => {
  const linkClass = isMobile
    ? "px-4 py-2 hover:text-gray-900 hover:bg-gray-50 font-light block transition-colors text-sm uppercase tracking-wider"
    : "px-3 py-1.5 hover:text-gray-900 hover:bg-gray-50 font-light block transition-colors text-sm uppercase tracking-wider text-gray-600";

  const links = [
    { to: "/", label: "Home" },
    { to: "/CreateYours", label: "Create Yours" },
    { to: "/PassportCases", label: "Passport Cases" },
    { to: "/Charms", label: "Charms" },
  ];

  if (isMobile) {
    return (
      <ul
        className="flex flex-col space-y-1 font-inter"
      >
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className={linkClass}
              style={{color: '#6b7280'}}
              onClick={onLinkClick}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul
      className="hidden lg:flex lg:items-center lg:space-x-1 flex-1 justify-center font-inter"
    >
      {links.map((link) => (
        <li key={link.to}>
          <Link to={link.to} className={linkClass}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavigationLinks;

