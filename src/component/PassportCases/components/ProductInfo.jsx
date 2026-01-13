import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt, faTag, faTruck } from '@fortawesome/free-solid-svg-icons';

const ProductInfo = ({ specifications }) => {
  if (!specifications) return null;

  return (
    <>
      {/* RFID Protection and Material Info */}
      <div className="">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          {specifications.rfid && specifications.rfid.toLowerCase() === 'yes' && (
            <p className="text-sm text-gray-900 font-inter flex items-center gap-2">
              <FontAwesomeIcon icon={faShieldAlt} className="text-blue-600" />
              <span className="font-bold">RFID Protection</span>
            </p>
          )}
          {specifications.material && (
            <p className="text-sm text-gray-900 font-inter flex items-center gap-2">
              <FontAwesomeIcon icon={faTag} className="text-amber-600" />
              <span className="font-bold">Material:</span> {specifications.material}
            </p>
          )}
        </div>
      </div>

      {/* Delivery Info */}
      <div className="pb-4 sm:pb-6">
        <p className="text-sm text-gray-900 font-inter flex items-center gap-2">
          <FontAwesomeIcon icon={faTruck} className="text-gray-600" />
          <span>Standard UK Delivery 2-4 Days</span>
        </p>
      </div>
    </>
  );
};

export default ProductInfo;
