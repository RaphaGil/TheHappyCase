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
        const canvasWidth = fabricCanvas.current.getWidth();
        const canvasHeight = fabricCanvas.current.getHeight();
  
        let scaleX, scaleY;
        let left = canvasWidth / 2;
        let top = canvasHeight / 2;
  
        if (isCase) {
          // Fixed scaling for the case image
          const scale = Math.min(
            canvasWidth * 1 / imgElement.width,
            canvasHeight * 1 / imgElement.height
          );
  
          scaleX = scale;
          scaleY = scale;
        } else {
          // Fixed size for pins
          scaleX = pinWidth / imgElement.width;
          scaleY = pinHeight / imgElement.height;
        }
  
        const imgInstance = new fabric.Image(imgElement, {
          left,
          top,
          originX: 'center',
          originY: 'center',
          scaleX,
          scaleY,
          selectable: !isCase,
          hasControls: isCase,
          lockScalingX: isCase,
          lockScalingY: isCase,
          borderColor: isCase ? "transparent" : "gray",
          cornerColor: isCase ? "transparent" : "blue",
          cornerSize: isCase ? 0 : 8,
          transparentCorners: false,
          isCase
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


  const resizeCanvasToFitScreen = () => {
    const canvas = fabricCanvas.current;
    if (!canvas) return;
  
    const isMobile = window.innerWidth < 768;
  
    const canvasWidth = isMobile ? 300 : 400;
    const canvasHeight = isMobile ? 400 : 600;
  
    canvas.setWidth(canvasWidth);
    canvas.setHeight(canvasHeight);
    canvas.renderAll();
  };
  // Initialize canvas
  useEffect(() => {
    if (!canvasRef.current) return;
  
    const isMobile = window.innerWidth < 768;
    const canvasWidth = isMobile ? 400 : 500;
    const canvasHeight = isMobile ? 400 : 500;
  
    fabricCanvas.current = new fabric.Canvas(canvasRef.current, {
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: 'transparent'
    });
    



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
        // Do not notify parent here; handled when adding the pin
      }
    });

    fabricCanvas.current.on('selection:updated', (e) => {
      const obj = e.selected[0];
      if (obj && !obj.isCase) {
        setSelectedPin(obj);
        setShowControls(true);
        updateControls(obj);
        // Don't call onPinSelect here to avoid duplicate additions
      }
    });

    fabricCanvas.current.on('selection:cleared', () => {
      setSelectedPin(null);
      setShowControls(false);
      onPinSelect && onPinSelect(null);
    });

    // Window resize handler
     const handleResize = () => {
    resizeCanvasToFitScreen();
  };
    
  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
    fabricCanvas.current?.dispose();
  };
}, []);

  const reloadCaseImage = () => {
    if (!fabricCanvas.current || !selectedCaseType || !selectedColor) return;
  
    // Remove old case objects
    const objects = fabricCanvas.current.getObjects();
    objects.forEach(obj => {
      if (obj.isCase) {
        fabricCanvas.current.remove(obj);
      }
    });
  
    // Get case image
    const selectedCase = products.cases.find(c => c.type === selectedCaseType);
    const selectedColorData = selectedCase?.colors.find(c => c.color === selectedColor);
  
    if (selectedColorData?.image) {
      loadImage(selectedColorData.image, true).then(() => {
        fabricCanvas.current.renderAll();
      });
    }
  };
  
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
      // Adjust pin size based on screen size
      const isMobile = window.innerWidth < 768;
      const pinSize = isMobile ? 80 : 100;
      
      const imgInstance = await loadImage(pin.src, false, pinSize, pinSize);
      
      // Center the pin on the canvas
      imgInstance.set({
        left: fabricCanvas.current.getWidth() / 2,
        top: fabricCanvas.current.getHeight() / 2
      });

      // Store pin data
      imgInstance.pinData = pin;
      
      fabricCanvas.current.setActiveObject(imgInstance);
      fabricCanvas.current.renderAll();
      
      // Notify parent about pin addition exactly once per click
      if (onPinSelect) {
        onPinSelect(imgInstance);
      }
    } catch (error) {
      console.error('Error loading pin:', error);
    }
  };

  // Expose pin selection method globally
  useEffect(() => {
    window.addPinToCanvas = handlePinSelection;
    // Expose getter so parent can fetch current composed design image
    window.getDesignImageDataURL = getDesignImageDataURL;
    if (onSaveImage) {
      onSaveImage(handleSaveImage);
    }
    return () => {
      delete window.addPinToCanvas;
      delete window.getDesignImageDataURL;
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

  // Get current composed design image as data URL
  const getDesignImageDataURL = () => {
    if (!fabricCanvas.current) return null;
    return fabricCanvas.current.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 2,
      backgroundColor: 'white'
    });
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="happy-card p-2 sm:p-4 mb-2 relative w-full flex items-center justify-center">
        <canvas 
          ref={canvasRef} 
          className="max-w-full"
          style={{ 
            background: 'transparent',
            maxWidth: '100%',
            height: 'auto'
          }}
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
              className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-full hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 flex items-center justify-center text-sm sm:text-lg font-bold shadow-md hover:shadow-lg"
            >
              ↻
            </button>
            <button
              onClick={handleDelete}
              className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-full hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 flex items-center justify-center text-sm sm:text-lg font-bold shadow-md hover:shadow-lg"
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
