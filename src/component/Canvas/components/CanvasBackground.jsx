import React from 'react';

const CanvasBackground = ({ caseImageUrl }) => {
  return (
    <div
      className="absolute inset-0 pointer-events-none flex items-center justify-center"
      style={{
        backgroundImage: caseImageUrl ? `url(${caseImageUrl})` : "none",
        backgroundSize: "75%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
    </div>
  );
};

export default CanvasBackground;

