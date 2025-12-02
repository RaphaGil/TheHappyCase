import React from 'react';

const CanvasBackground = ({ caseImageUrl }) => {
  return (
    <div
      className="absolute inset-0 pointer-events-none flex w-full h-full items-center justify-center z-0"
      style={{
        backgroundImage: caseImageUrl ? `url(${caseImageUrl})` : "none",
        backgroundSize: "80%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
    </div>
  );
};

export default CanvasBackground;

