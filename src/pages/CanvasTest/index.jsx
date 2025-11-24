import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as fabric from 'fabric';

const CanvasTest = () => {
  const canvasRef = useRef(null);
  const fabricCanvas = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Calculate canvas dimensions based on screen size
  const getCanvasDimensions = useCallback(() => {
    if (!containerRef.current) return { width: 400, height: 400 };

    const container = containerRef.current;
    const containerWidth = container.clientWidth;
    const screenWidth = window.innerWidth;
    const isMobileScreen = screenWidth < 768;
    const isMediumScreen = screenWidth >= 768 && screenWidth < 1024;

    let canvasWidth, canvasHeight;

    if (isMobileScreen) {
      canvasWidth = Math.max(280, Math.min(containerWidth - 32, 360));
      canvasHeight = canvasWidth;
    } else if (isMediumScreen) {
      canvasWidth = Math.min(containerWidth * 0.9, 500);
      canvasHeight = canvasWidth;
    } else {
      canvasWidth = Math.min(containerWidth * 0.8, 600);
      canvasHeight = canvasWidth;
    }

    return { width: canvasWidth, height: canvasHeight };
  }, []);

  // Resize canvas
  const resizeCanvas = useCallback(() => {
    if (!fabricCanvas.current || !containerRef.current) return;

    const { width: newWidth, height: newHeight } = getCanvasDimensions();
    const oldWidth = fabricCanvas.current.getWidth();
    const oldHeight = fabricCanvas.current.getHeight();

    // Only resize if dimensions actually changed
    if (oldWidth === newWidth && oldHeight === newHeight) return;

    // Calculate scale factors for proportional scaling
    const scaleX = oldWidth > 0 ? newWidth / oldWidth : 1;
    const scaleY = oldHeight > 0 ? newHeight / oldHeight : 1;

    // Resize canvas
    fabricCanvas.current.setWidth(newWidth);
    fabricCanvas.current.setHeight(newHeight);

    // Scale all objects proportionally
    const objects = fabricCanvas.current.getObjects();
    objects.forEach(obj => {
      obj.scaleX = (obj.scaleX || 1) * scaleX;
      obj.scaleY = (obj.scaleY || 1) * scaleY;
      obj.left = (obj.left || 0) * scaleX;
      obj.top = (obj.top || 0) * scaleY;
      obj.setCoords();
    });

    fabricCanvas.current.renderAll();
  }, [getCanvasDimensions]);

  // Initialize canvas
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const { width: canvasWidth, height: canvasHeight } = getCanvasDimensions();

    fabricCanvas.current = new fabric.Canvas(canvasRef.current, {
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: 'transparent', // Transparent so background image shows through
    });

    // Handle window resize with debounce
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resizeCanvas();
        setIsMobile(window.innerWidth < 768);
      }, 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
      if (fabricCanvas.current) {
        fabricCanvas.current.dispose();
      }
    };
  }, [getCanvasDimensions, resizeCanvas]);

  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden">
      {/* Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-light text-gray-900" 
              style={{fontFamily: "'Poppins', sans-serif"}}>
            Canvas Test Page
          </h1>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 text-sm uppercase tracking-wider text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-400 transition-colors rounded"
            style={{fontFamily: "'Poppins', sans-serif"}}
          >
            Back to Home
          </button>
        </div>

        {/* Info Section */}
        <div className="mb-6 p-4 bg-gray-50 rounded-sm border border-gray-200">
          <p className="text-sm text-gray-600 mb-2" style={{fontFamily: "'Poppins', sans-serif"}}>
            This is a test page to verify Fabric.js canvas responsiveness.
          </p>
          <p className="text-xs text-gray-500" style={{fontFamily: "'Poppins', sans-serif"}}>
            Screen size: {window.innerWidth}px × {window.innerHeight}px | 
            Device: {isMobile ? 'Mobile' : 'Desktop'}
          </p>
        </div>

        {/* Canvas Container */}
        <div className="w-full flex flex-col items-center justify-center">
          <div className="w-full max-w-full flex flex-col items-center overflow-visible p-4">
            <div className="w-full max-w-full overflow-visible flex justify-center items-center bg-white border border-gray-200 rounded-sm shadow-sm p-4">
              {/* Container with background image and canvas overlay */}
              <div 
                ref={containerRef}
                className="relative flex flex-col items-center justify-center"
                style={{
                  width: '100%',
                  maxWidth: '100%',
                }}
              >
                {/* Background Image Div */}
                <div
                  className="relative w-full flex items-center justify-center"
                  style={{
                    aspectRatio: '1 / 1',
                    maxWidth: '600px',
                    backgroundImage: imageLoaded ? `url('/TheHappyCase/images/logo.png')` : 'none',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: '#f5f5f5',
                    border: '1px solid #e5e5e5',
                    borderRadius: '4px',
                  }}
                >
                  {/* Hidden image to trigger load event */}
                  <img
                    src="/TheHappyCase/images/logo.png"
                    alt="Background"
                    className="hidden"
                    onLoad={() => setImageLoaded(true)}
                    onError={() => console.error('Failed to load background image')}
                  />
                  
                  {/* Fabric.js Canvas Overlay */}
                  <canvas 
                    ref={canvasRef} 
                    className="absolute top-0 left-0 w-full h-full"
                    style={{ 
                      background: 'transparent',
                      maxWidth: '100%',
                      width: '100%',
                      height: '100%',
                      display: 'block',
                      cursor: 'default',
                    }}
                  />
                </div>
                <p className="mt-4 text-xs text-gray-500 text-center" style={{fontFamily: "'Poppins', sans-serif"}}>
                  Background image with Fabric.js canvas overlay. You can draw on the canvas.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => {
              if (fabricCanvas.current) {
                // Add a test rectangle
                const rect = new fabric.Rect({
                  left: fabricCanvas.current.getWidth() / 2,
                  top: fabricCanvas.current.getHeight() / 2,
                  width: 100,
                  height: 100,
                  fill: 'rgba(255, 0, 0, 0.5)',
                  originX: 'center',
                  originY: 'center',
                  selectable: true,
                  hasControls: true,
                });
                fabricCanvas.current.add(rect);
                fabricCanvas.current.setActiveObject(rect);
                fabricCanvas.current.renderAll();
              }
            }}
            className="px-4 py-2 text-sm uppercase tracking-wider text-white bg-gray-900 hover:bg-gray-800 transition-colors rounded"
            style={{fontFamily: "'Poppins', sans-serif"}}
          >
            Add Rectangle
          </button>
          <button
            onClick={() => {
              if (fabricCanvas.current) {
                // Add a test circle
                const circle = new fabric.Circle({
                  left: fabricCanvas.current.getWidth() / 2,
                  top: fabricCanvas.current.getHeight() / 2,
                  radius: 50,
                  fill: 'rgba(0, 0, 255, 0.5)',
                  originX: 'center',
                  originY: 'center',
                  selectable: true,
                  hasControls: true,
                });
                fabricCanvas.current.add(circle);
                fabricCanvas.current.setActiveObject(circle);
                fabricCanvas.current.renderAll();
              }
            }}
            className="px-4 py-2 text-sm uppercase tracking-wider text-white bg-gray-900 hover:bg-gray-800 transition-colors rounded"
            style={{fontFamily: "'Poppins', sans-serif"}}
          >
            Add Circle
          </button>
          <button
            onClick={() => {
              if (fabricCanvas.current) {
                // Clear all objects
                fabricCanvas.current.clear();
                fabricCanvas.current.backgroundColor = 'transparent';
                fabricCanvas.current.renderAll();
              }
            }}
            className="px-4 py-2 text-sm uppercase tracking-wider text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-400 transition-colors rounded"
            style={{fontFamily: "'Poppins', sans-serif"}}
          >
            Clear Canvas
          </button>
          <button
            onClick={() => {
              if (fabricCanvas.current) {
                const dataURL = fabricCanvas.current.toDataURL({
                  format: 'png',
                  quality: 1,
                  multiplier: 2,
                });
                const link = document.createElement('a');
                link.download = `canvas-test-${Date.now()}.png`;
                link.href = dataURL;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }
            }}
            className="px-4 py-2 text-sm uppercase tracking-wider text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-400 transition-colors rounded"
            style={{fontFamily: "'Poppins', sans-serif"}}
          >
            Download Canvas
          </button>
        </div>
      </div>
    </div>
  );
};

export default CanvasTest;

