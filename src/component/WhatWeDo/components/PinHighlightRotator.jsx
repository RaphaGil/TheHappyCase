import React, { useState, useEffect } from 'react';

const PinHighlightRotator = ({ pinHighlights }) => {
  const [pinHighlightIndex, setPinHighlightIndex] = useState(0);
  const [pinHighlightVisible, setPinHighlightVisible] = useState(true);

  // Pin highlights rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setPinHighlightVisible(false);
      setTimeout(() => {
        setPinHighlightIndex((prev) => (prev + 1) % pinHighlights.length);
        setPinHighlightVisible(true);
      }, 300); // matches fade-out duration
    }, 3000);

    return () => clearInterval(interval);
  }, [pinHighlights.length]);

  useEffect(() => {
    if (pinHighlights.length === 0) return;
    setPinHighlightIndex(0);
    setPinHighlightVisible(true);
  }, [pinHighlights.length]);

  return (
    <span
      className={`block transition-opacity duration-300 italic ${
        pinHighlightVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {pinHighlights[pinHighlightIndex]}
    </span>
  );
};

export default PinHighlightRotator;

