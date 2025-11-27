import React from 'react';

const InternationalNote = ({ 
  className = '', 
  showOnDesktop = false, 
  showOnMobile = false,
  title = 'Custom Duties & Import Fees',
  message = 'International orders may be subject to customs duties, taxes, and fees imposed by your country. These charges are the responsibility of the recipient and are not included in the order total.',
  variant = 'yellow' // 'yellow' or 'gray'
}) => {
  // Determine visibility classes based on props
  const visibilityClass = showOnDesktop && showOnMobile 
    ? '' // Show on both
    : showOnDesktop 
    ? 'hidden lg:block' // Show only on desktop
    : showOnMobile 
    ? 'lg:hidden' // Show only on mobile
    : ''; // Default: show on both

  // Style variants
  const bgColor = variant === 'yellow' ? 'bg-yellow-50' : 'bg-gray-100';
  const borderColor = variant === 'yellow' ? 'border-yellow-200' : 'border-gray-200';
  const iconColor = variant === 'yellow' ? 'text-yellow-600' : 'text-gray-600';
  const titleColor = variant === 'yellow' ? 'text-yellow-800' : 'text-gray-800';
  const textColor = variant === 'yellow' ? 'text-yellow-700' : 'text-gray-500';

  return (
    <div className={`${visibilityClass} ${className}`}>
      <div className={`${bgColor} border ${borderColor} rounded-lg p-4`}>
        <div className="flex items-start gap-3">
          <div className={`${iconColor} text-xl flex-shrink-0`}>⚠️</div>
          <div className="flex-1 font-inter">
            <h3 className={`text-sm font-semibold ${titleColor} mb-1`}>
              {title}
            </h3>
            <p className={`text-xs ${textColor} font-light leading-relaxed`} className="font-inter">
              {message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternationalNote;

