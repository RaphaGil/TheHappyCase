import React, { useState, useEffect } from 'react';

const AnimatedTitle = ({ children, className = '', delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100 + delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <span
      className={`block overflow-hidden ${className}`}
      style={{
        clipPath: isVisible ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' : 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
        transition: 'clip-path 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </span>
  );
};

export default AnimatedTitle;

