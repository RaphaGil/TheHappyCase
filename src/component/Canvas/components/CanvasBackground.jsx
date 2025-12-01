import React from 'react';

const CanvasBackground = ({ caseImageUrl }) => {
  return (
    <div
      className="absolute inset-0 pointer-events-none flex w-full h-full items-center justify-center  "
      style={{
        backgroundImage: caseImageUrl ? `url(${caseImageUrl})` : "none",
        backgroundSize: "70%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
    </div>
  );
};

export default CanvasBackground;

