import React from 'react';

const CanvasControls = ({ 
  showControls, 
  controlsPosition, 
  onRotateLeft, 
  onRotateRight, 
  onDelete 
}) => {
  if (!showControls) return null;

  return (
    <div
      className="absolute flex items-center gap-0.5 bg-opacity-90 backdrop-blur-sm text-gray-800 rounded-sm px-1.5 py-0.5 shadow-md border border-gray-200"
      style={{
        left: `${controlsPosition.x}px`,
        top: `${controlsPosition.y}px`,
        position: "absolute",
        pointerEvents: "auto",
      }}
    >
      <button
        onClick={onRotateLeft}
        className="w-5 h-5 flex items-center justify-center text-gray-800 hover:text-gray-900 rounded transition-colors bg-transparent"
        aria-label="Rotate Left"
        title="Rotate Left"
        style={{ color: "#1f2937" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          width="16"
          height="16"
          fill="currentColor"
          style={{ color: "#1f2937" }}
        >
          <path d="M24 192l144 0c9.7 0 18.5-5.8 22.2-14.8s1.7-19.3-5.2-26.2l-46.7-46.7c75.3-58.6 184.3-53.3 253.5 15.9 75 75 75 196.5 0 271.5s-196.5 75-271.5 0c-10.2-10.2-19-21.3-26.4-33-9.5-14.9-29.3-19.3-44.2-9.8s-19.3 29.3-9.8 44.2C49.7 408.7 61.4 423.5 75 437 175 537 337 537 437 437S537 175 437 75C342.8-19.3 193.3-24.7 92.7 58.8L41 7C34.1 .2 23.8-1.9 14.8 1.8S0 14.3 0 24L0 168c0 13.3 10.7 24 24 24z" />
        </svg>
      </button>

      <button
        onClick={onRotateRight}
        className="w-5 h-5 flex items-center justify-center text-gray-800 hover:text-gray-900 rounded transition-colors bg-transparent"
        aria-label="Rotate Right"
        title="Rotate Right"
        style={{ color: "#1f2937" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          width="16"
          height="16"
          fill="currentColor"
          style={{ color: "#1f2937" }}
        >
          <path d="M488 192l-144 0c-9.7 0-18.5-5.8-22.2-14.8s-1.7-19.3 5.2-26.2l46.7-46.7c-75.3-58.6-184.3-53.3-253.5 15.9-75 75-75 196.5 0 271.5s196.5 75 271.5 0c8.2-8.2 15.5-16.9 21.9-26.1 10.1-14.5 30.1-18 44.6-7.9s18 30.1 7.9 44.6c-8.5 12.2-18.2 23.8-29.1 34.7-100 100-262.1 100-362 0S-25 175 75 75c94.3-94.3 243.7-99.6 344.3-16.2L471 7c6.9-6.9 17.2-8.9 26.2-5.2S512 14.3 512 24l0 144c0 13.3-10.7 24-24 24z" />
        </svg>
      </button>

      <button
        onClick={onDelete}
        className="w-5 h-5 flex items-center justify-center text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
        aria-label="Remove"
        title="Delete"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
          width="16"
          height="16"
          fill="currentColor"
          style={{ color: "#dc2626" }}
        >
          <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
        </svg>
      </button>
    </div>
  );
};

export default CanvasControls;

