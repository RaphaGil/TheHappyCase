import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as fabric from 'fabric';

const Canvas = ({ 
  selectedCaseType, 
  selectedColor, 
  selectedPins, 
  onPinSelect, 
  onPinRemove,
  products,
  onSaveImage
}) => {
  const canvasRef = useRef(null);
  const fabricCanvas = useRef(null);
  const [selectedPin, setSelectedPin] = useState(null);
  const [controlsPosition, setControlsPosition] = useState({ x: 0, y: 0 });
  const [showControls, setShowControls] = useState(false);

  // Load image function
  const loadImage = (src, isCase = false, pinWidth = 170, pinHeight = 170) => {
    return new Promise((resolve, reject) => {
      const imgElement = new Image();
      imgElement.crossOrigin = 'anonymous';
      imgElement.src = src;

      imgElement.onload = () => {
        let scaleX, scaleY;
        
        if (isCase) {
          // For case images, calculate scale to fit canvas properly and be centered
          const canvasWidth = fabricCanvas.current.getWidth();
          const canvasHeight = fabricCanvas.current.getHeight();
          const maxWidth = canvasWidth * 0.85; // Use 85% of canvas width to ensure it fits
          const maxHeight = canvasHeight * 0.85; // Use 85% of canvas height to ensure it fits
          
          scaleX = Math.min(maxWidth / imgElement.width, maxHeight / imgElement.height);
          scaleY = scaleX; // Maintain aspect ratio
        } else {
          // For pins, use the provided dimensions
          scaleX = pinWidth / imgElement.width;
          scaleY = pinHeight / imgElement.height;
        }

        const imgInstance = new fabric.Image(imgElement, {
          left: isCase ? fabricCanvas.current.getWidth() / 2 : fabricCanvas.current.getWidth() / 2 - (imgElement.width * scaleX) / 2,
          top: isCase ? fabricCanvas.current.getHeight() / 2 - 160 : fabricCanvas.current.getHeight() / 2 - (imgElement.height * scaleY) / 2,
          originX: isCase ? 'center' : 'left',
          originY: isCase ? 'center' : 'top',
          
          scaleX,
          scaleY,
          selectable: !isCase,
          hasControls: isCase,
          lockScalingX: isCase, // Allow case to be resized
          lockScalingY: isCase, // Allow case to be resized
          borderColor: isCase ? "transparent" : "gray",
          cornerColor: isCase ? "transparent" : "blue",
          cornerSize: isCase ? 0 : 8,
          transparentCorners: false,
          isCase: isCase
        });

        if (isCase) {
          imgInstance.set('evented', false);
          fabricCanvas.current.add(imgInstance);
          fabricCanvas.current.sendObjectToBack(imgInstance);
        } else {
          fabricCanvas.current.add(imgInstance);
        }

        fabricCanvas.current.renderAll();
        resolve(imgInstance);
      };

      imgElement.onerror = reject;
    });
  };

  // Update controls position
  const updateControls = useCallback((obj) => {
    if (!obj) return;
    
    const rect = obj.getBoundingRect(true);
    const canvasWidth = fabricCanvas.current.getWidth();
    const canvasHeight = fabricCanvas.current.getHeight();
    
    // Calculate desired position (above the charm)
    const desiredX = rect.left + rect.width / 2;
    const desiredY = rect.top - 60; // 60px above the charm
    
    // Clamp within canvas bounds
    const clampedX = Math.max(10, Math.min(desiredX - 50, canvasWidth - 110)); // 50px for half control width
    const clampedY = Math.max(10, Math.min(desiredY, canvasHeight - 50));
    
    setControlsPosition({ x: clampedX + 16, y: clampedY + 16 }); // Add padding offset
  }, []);

  // Initialize canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    fabricCanvas.current = new fabric.Canvas(canvasRef.current, {
      width: 1500,
      height: 1000,
      backgroundColor: 'transparent'
    });

    // Responsive canvas sizing
    const updateCanvasSize = () => {
      const container = canvasRef.current?.parentElement;
      if (container) {
        const containerWidth = container.clientWidth - 1; // Account for padding (p-4 = 16px)
        const canvasWidth = Math.min(containerWidth, 800); // Much bigger canvas to fit large image
        const canvasHeight = 1000; // Much taller canvas for more charm positioning space
        fabricCanvas.current.setWidth(canvasWidth);
        fabricCanvas.current.setHeight(canvasHeight);
      } else {
        fabricCanvas.current.setWidth(800);
        fabricCanvas.current.setHeight(100);
      }
    };
    
    updateCanvasSize();

    // Object moving constraints
    fabricCanvas.current.on('object:moving', (e) => {
      const obj = e.target;
      if (!obj || !obj.getBoundingRect || obj.isCase) return; // Skip case object
      
      const rect = obj.getBoundingRect(true);
      const canvasHeight = fabricCanvas.current.getHeight();
      const canvasWidth = fabricCanvas.current.getWidth();
      
      // Keep object within canvas bounds with minimal margin for more charm space
      const margin = 10;
      
      if (rect.left < margin) {
        obj.set('left', margin);
        obj.setCoords();
      }
      if (rect.left + rect.width > canvasWidth - margin) {
        obj.set('left', canvasWidth - rect.width - margin);
        obj.setCoords();
      }
      if (rect.top < margin) {
        obj.set('top', margin);
        obj.setCoords();
      }
      if (rect.top + rect.height > canvasHeight - margin) {
        obj.set('top', canvasHeight - rect.height - margin);
        obj.setCoords();
      }
      
      // Update controls position during movement if this is the selected object
      if (obj === selectedPin) {
        updateControls(obj);
      }
    });

    // Object selection events
    fabricCanvas.current.on('selection:created', (e) => {
      const obj = e.selected[0];
      if (obj && !obj.isCase) {
        setSelectedPin(obj);
        setShowControls(true);
        updateControls(obj);
        onPinSelect && onPinSelect(obj);
      }
    });

    fabricCanvas.current.on('selection:updated', (e) => {
      const obj = e.selected[0];
      if (obj && !obj.isCase) {
        setSelectedPin(obj);
        setShowControls(true);
        updateControls(obj);
        onPinSelect && onPinSelect(obj);
      }
    });

    fabricCanvas.current.on('selection:cleared', () => {
      setSelectedPin(null);
      setShowControls(false);
      onPinSelect && onPinSelect(null);
    });

    // Window resize handler
    const handleResize = () => {
      updateCanvasSize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (fabricCanvas.current) {
        fabricCanvas.current.dispose();
      }
    };
  }, [updateControls, onPinSelect]);

  // Load case image when case type or color changes
  useEffect(() => {
    if (!fabricCanvas.current || !selectedCaseType || !selectedColor) return;

    const selectedCase = products.cases.find(c => c.type === selectedCaseType);
    if (!selectedCase) return;

    const selectedColorData = selectedCase.colors.find(c => c.color === selectedColor);
    if (!selectedColorData) return;

    // Check if case already exists to avoid reloading
    const existingCase = fabricCanvas.current.getObjects().find(obj => obj.isCase);
    if (existingCase && existingCase.src === selectedColorData.image) {
      return; // Case already loaded with correct image
    }

    // Remove old case objects
    const objects = fabricCanvas.current.getObjects();
    objects.forEach(obj => {
      if (obj.isCase) {
        fabricCanvas.current.remove(obj);
      }
    });

    // Load new case image
    loadImage(selectedColorData.image, true).then((caseInstance) => {
      fabricCanvas.current.renderAll();
    });

  }, [selectedCaseType, selectedColor, products.cases]);

  // Handle pin selection from PinSelector
  const handlePinSelection = async (pin) => {
    if (!fabricCanvas.current) return;

    console.log('Adding pin to canvas:', pin.name); // Debug log

    try {
      const imgInstance = await loadImage(pin.src, false, 130, 130);
      
      // Center the pin on the canvas
      imgInstance.set({
        left: fabricCanvas.current.getWidth() / 2,
        top: fabricCanvas.current.getHeight() / 2
      });

      // Store pin data
      imgInstance.pinData = pin;
      
      fabricCanvas.current.setActiveObject(imgInstance);
      fabricCanvas.current.renderAll();
      
      // Notify parent about pin addition (only once)
      if (onPinSelect) {
        console.log('Calling onPinSelect for:', pin.name); // Debug log
        onPinSelect(imgInstance);
      }
    } catch (error) {
      console.error('Error loading pin:', error);
    }
  };

  // Expose pin selection method globally
  useEffect(() => {
    window.addPinToCanvas = handlePinSelection;
    if (onSaveImage) {
      onSaveImage(handleSaveImage);
    }
    return () => {
      delete window.addPinToCanvas;
    };
  }, [onSaveImage]);

  // Control handlers
  const handleRotate = () => {
    if (selectedPin) {
      const currentAngle = selectedPin.angle || 0;
      selectedPin.set('angle', currentAngle + 15);
      fabricCanvas.current.renderAll();
      updateControls(selectedPin);
    }
  };

  const handleDelete = () => {
    if (selectedPin) {
      fabricCanvas.current.remove(selectedPin);
      fabricCanvas.current.discardActiveObject();
      fabricCanvas.current.renderAll();
      setSelectedPin(null);
      setShowControls(false);
      onPinRemove && onPinRemove(selectedPin);
    }
  };

  // Handle save image
  const handleSaveImage = () => {
    if (!fabricCanvas.current) return;

    // Create a temporary canvas with white background for better visibility
    const dataURL = fabricCanvas.current.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 2, // Higher resolution
      backgroundColor: 'white'
    });

    // Create download link
    const link = document.createElement('a');
    link.download = `passport-case-design-${Date.now()}.png`;
    link.href = dataURL;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="happy-card p-4 mb-2 relative w-full flex items-center justify-center">
        <canvas 
          ref={canvasRef} 
          className=""
          style={{ background: 'transparent' }}
        />
        
        {/* Controls */}
        {showControls && selectedPin && (
          <div 
            className="absolute z-50 bg-white/98 backdrop-blur-sm border-2 border-blue-500 rounded-lg p-2 shadow-lg flex gap-2"
            style={{
              left: controlsPosition.x,
              top: controlsPosition.y,
              position: 'absolute'
            }}
          >
            <button
              onClick={handleRotate}
              className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-full hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 flex items-center justify-center text-lg font-bold shadow-md hover:shadow-lg"
            >
              ↻
            </button>
            <button
              onClick={handleDelete}
              className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-full hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 flex items-center justify-center text-lg font-bold shadow-md hover:shadow-lg"
            >
              ×
            </button>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default Canvas;
