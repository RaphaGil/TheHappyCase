import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as fabric from 'fabric';
import CanvasControls from './components/CanvasControls';
import { useCanvasBorders } from '../../hooks/canvas/useCanvasBorders';
import { useCanvasControls } from '../../hooks/canvas/useCanvasControls';
import { exportCanvasAsDataURL, downloadCanvasImage } from '../../utils/canvas/imageExport';
import { normalizeImagePath } from '../../utils/imagePath';

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
  const caseInstanceRef = useRef(null);
  const boundaryRectRef = useRef(null);
  const caseBorderRectRef = useRef(null);
  const borderRectsRef = useRef(new Map());
  const boundaryRectTimeoutRef = useRef(null);
  const [selectedPin, setSelectedPin] = useState(null);
  
  // Use hooks for organized functionality
  const { controlsPosition, showControls, setShowControls, updateControls: updateControlsPosition } = useCanvasControls();
  const { updateBorderRect, removeBorderRect } = useCanvasBorders(fabricCanvas, caseInstanceRef, boundaryRectRef, caseBorderRectRef, borderRectsRef);

  // Legacy loadImage function - keeping for compatibility, but using hook version
  const loadImageLegacy = useCallback((src, isCase = false, pinWidth = 85, pinHeight = 85) => {
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
          // Allow pins to maintain their natural aspect ratio with a max size
          // Scale proportionally to fit within the max size while maintaining aspect ratio
          const maxSize = Math.max(pinWidth, pinHeight);
          const naturalAspectRatio = imgElement.width / imgElement.height;
          let targetWidth, targetHeight;
          
          if (imgElement.width >= imgElement.height) {
            // Landscape or square - fit to width
            targetWidth = maxSize;
            targetHeight = maxSize / naturalAspectRatio;
          } else {
            // Portrait - fit to height
            targetHeight = maxSize;
            targetWidth = maxSize * naturalAspectRatio;
          }
          
          scaleX = targetWidth / imgElement.width;
          scaleY = targetHeight / imgElement.height;
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
          borderColor: "transparent",
          cornerColor: isCase ? "transparent" : "blue",
          cornerSize: isCase ? 0 : 8,
          transparentCorners: false,
          hasBorders: false,
          isCase
        });
  
        if (isCase) {
          // Clear any pending boundary rect timeout to prevent duplicates
          if (boundaryRectTimeoutRef.current) {
            clearTimeout(boundaryRectTimeoutRef.current);
            boundaryRectTimeoutRef.current = null;
          }
          
          // Remove ALL existing boundary rects before creating new one (by checking properties)
          const allObjects = fabricCanvas.current.getObjects();
          allObjects.forEach(obj => {
            if (obj && obj.type === 'rect') {
              const isBoundary = obj.isBoundaryRect === true || 
                (Array.isArray(obj.strokeDashArray) && 
                 ((obj.strokeDashArray[0] === 4 && obj.strokeDashArray[1] === 4) || 
                  (obj.strokeDashArray[0] === 3 && obj.strokeDashArray[1] === 3)) &&
                 (!obj.fill || obj.fill === 'transparent') &&
                 obj.selectable === false &&
                 obj.evented === false);
              
              if (isBoundary) {
                fabricCanvas.current.remove(obj);
              }
            }
          });
          
          boundaryRectRef.current = null;
          
          // Remove existing case border if any
          if (caseBorderRectRef.current) {
            fabricCanvas.current.remove(caseBorderRectRef.current);
            caseBorderRectRef.current = null;
          }
          
          imgInstance.set('evented', false);
          caseInstanceRef.current = imgInstance;
          fabricCanvas.current.add(imgInstance);
          fabricCanvas.current.sendObjectToBack(imgInstance);
          
          // Create red boundary rectangle after case is loaded
          boundaryRectTimeoutRef.current = setTimeout(() => {
            // Double-check that we still have the same case instance
            if (caseInstanceRef.current !== imgInstance) {
              return; // Case has changed, don't create boundary
            }
            
            // Remove any existing boundary rect (safety check)
            if (boundaryRectRef.current) {
              fabricCanvas.current.remove(boundaryRectRef.current);
            }
            
            const rect = imgInstance.getBoundingRect();
            // Add inset to make boundary smaller (inside the case image)
            // Separate horizontal and vertical insets - larger horizontal for smaller width
            // Business class case needs wider boundary (more inset from edges)
            const insetHorizontal = selectedCaseType === 'business' ? 140 : 120; // Horizontal inset (left/right) - wider for business, more space for all cases
            const insetVertical = selectedCaseType === 'business' ? 50 : 40; // Vertical inset (top/bottom) - wider for business, more space for all cases
            const boundaryRect = new fabric.Rect({
              left: rect.left + insetHorizontal,
              top: rect.top + insetVertical,
              width: rect.width - (insetHorizontal * 2),
              height: rect.height - (insetVertical * 2),
              fill: 'transparent',
              stroke: 'rgba(239, 68, 68, 0.3)', // Subtle red with transparency
              strokeWidth: 1,
              strokeDashArray: [4, 4],
              selectable: false,
              evented: false,
              visible: false, // Hidden by default, shown only when moving objects
              isBoundaryRect: true, // Custom property to identify boundary rects
            });
            
            boundaryRectRef.current = boundaryRect;
            fabricCanvas.current.add(boundaryRect);
            fabricCanvas.current.sendObjectToBack(boundaryRect);
            
            // Don't create case border rectangle - user doesn't want to see border when selecting case
            caseBorderRectRef.current = null;
            
            fabricCanvas.current.sendObjectToBack(imgInstance);
            
            fabricCanvas.current.renderAll();
            boundaryRectTimeoutRef.current = null;
          }, 100);
        } else {
          fabricCanvas.current.add(imgInstance);
        }
  
        fabricCanvas.current.renderAll();
        resolve(imgInstance);
      };
  
      imgElement.onerror = reject;
    });
  }, [selectedCaseType]);
  
  

  // Wrapper for updateControls to match hook signature
  const updateControls = useCallback((obj) => {
    updateControlsPosition(obj, fabricCanvas);
  }, [updateControlsPosition]);


  const resizeCanvasToFitScreen = useCallback(() => {
    const canvas = fabricCanvas.current;
    if (!canvas || !canvasRef.current) return;
  
    const container = canvasRef.current.parentElement;
    if (!container) return;
  
    // Match canvas size exactly to container dimensions
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
  
    canvas.setWidth(containerWidth);
    canvas.setHeight(containerHeight);
    canvas.renderAll();
  }, []);
  // Initialize canvas
  useEffect(() => {
    if (!canvasRef.current) return;
  
    const container = canvasRef.current.parentElement;
    if (!container) return;
  
    // Match canvas size exactly to container dimensions (same as case image div)
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    fabricCanvas.current = new fabric.Canvas(canvasRef.current, {
      width: containerWidth,
      height: containerHeight,
      backgroundColor: 'transparent'
    });
    


    // Object moving constraints - using canvas boundaries instead of case boundaries
    fabricCanvas.current.on('object:moving', (e) => {
      const obj = e.target;
      if (!obj || !obj.getBoundingRect || obj.isCase || obj === boundaryRectRef.current || obj === caseBorderRectRef.current) return;
      
      // Use canvas boundaries instead of case boundaries
      const canvasWidth = fabricCanvas.current.getWidth();
      const canvasHeight = fabricCanvas.current.getHeight();
      const objRect = obj.getBoundingRect(true);
      
      // Calculate object dimensions from bounding rect
      const objWidth = objRect.width;
      const objHeight = objRect.height;
      const halfWidth = objWidth / 2;
      const halfHeight = objHeight / 2;
      
      // Get current object center position
      let newLeft = obj.left;
      let newTop = obj.top;
      
      const margin = 5; // Margin from canvas edges
      
      // Constrain horizontal position (accounting for center origin)
      if (objRect.left < margin) {
        newLeft = margin + halfWidth;
      }
      if (objRect.left + objWidth > canvasWidth - margin) {
        newLeft = canvasWidth - margin - halfWidth;
      }
      
      // Constrain vertical position (accounting for center origin)
      if (objRect.top < margin) {
        newTop = margin + halfHeight;
      }
      if (objRect.top + objHeight > canvasHeight - margin) {
        newTop = canvasHeight - margin - halfHeight;
      }
      
      // Apply constraints if needed
      if (newLeft !== obj.left || newTop !== obj.top) {
        obj.set({
          left: newLeft,
          top: newTop
        });
        obj.setCoords();
      }
      
      // Update border rectangle during movement
      const borderRect = borderRectsRef.current.get(obj);
      if (borderRect) {
        // Get the exact bounding rectangle of the object (accounts for scale, rotation, etc.)
        const boundingRect = obj.getBoundingRect(true);
        
        // Calculate inset as a percentage of the smaller dimension to adjust to image shape
        // Use 2.5% of the smaller dimension for proportional scaling
        const minDimension = Math.min(boundingRect.width, boundingRect.height);
        const inset = Math.max(2, minDimension * 0.025); // Minimum 2px, or 2.5% of smaller dimension
        
        borderRect.set({
          left: boundingRect.left + inset,
          top: boundingRect.top + inset,
          width: boundingRect.width - (inset * 2),
          height: boundingRect.height - (inset * 2),
        });
        borderRect.setCoords();
        // Ensure border stays below object by bringing object to front
        fabricCanvas.current.bringObjectToFront(obj);
      }
      
      // Update controls position during movement for the active object
      const activeObj = fabricCanvas.current.getActiveObject();
      if (activeObj === obj) {
        updateControls(obj);
      }
    });

    // Update controls after object is modified (moved, rotated, etc.)
    fabricCanvas.current.on('object:modified', (e) => {
      const obj = e.target;
      
      // Hide red boundary and case border when object movement is complete
      if (boundaryRectRef.current && obj && !obj.isCase && obj !== boundaryRectRef.current) {
        boundaryRectRef.current.set('visible', false);
      }
      if (caseBorderRectRef.current && obj && !obj.isCase && obj !== caseBorderRectRef.current) {
        caseBorderRectRef.current.set('visible', false);
      }
      if (obj && !obj.isCase && obj !== boundaryRectRef.current && obj !== caseBorderRectRef.current) {
        fabricCanvas.current.renderAll();
      }
      
      if (obj && !obj.isCase) {
        // Ensure text scaling stays locked after modification
        const isActive = fabricCanvas.current.getActiveObject() === obj;
        if (obj.type === 'textbox' || obj.type === 'text' || obj.type === 'i-text') {
          obj.set({
            lockScalingX: true,
            lockScalingY: true,
            lockUniScaling: true,
            hasControls: false,
            hasBorders: false,
            borderColor: 'transparent',
            cornerColor: 'transparent',
            cornerSize: 0,
            transparentCorners: true,
          });
        } else if (obj.type === 'image') {
          obj.set({
            hasBorders: false,
            borderColor: 'transparent',
          });
        }
        
        // Update custom border if object is active
        if (isActive) {
          updateBorderRect(obj);
        } else {
          removeBorderRect(obj);
        }
        
        const activeObj = fabricCanvas.current.getActiveObject();
        if (activeObj === obj) {
          updateControls(obj);
        }
      }
    });

    // Object selection events
    fabricCanvas.current.on('selection:created', (e) => {
      const obj = e.selected[0];
      if (obj && !obj.isCase) {
        // Remove border from all other objects (only one border at a time)
        borderRectsRef.current.forEach((borderRect, existingObj) => {
          if (existingObj !== obj) {
            fabricCanvas.current.remove(borderRect);
            borderRectsRef.current.delete(existingObj);
          }
        });
        
        // Lock text scaling and hide controls if it's a text object
        if (obj.type === 'textbox' || obj.type === 'text' || obj.type === 'i-text') {
          obj.set({
            lockScalingX: true,
            lockScalingY: true,
            lockUniScaling: true,
            hasControls: false,
            hasBorders: false,
            borderColor: 'transparent',
            cornerColor: 'transparent',
            cornerSize: 0,
            transparentCorners: true,
          });
        } else if (obj.type === 'image') {
          obj.set({
            hasBorders: false,
            borderColor: 'transparent',
          });
        }
        // Create custom border rectangle
        updateBorderRect(obj);
        setSelectedPin(obj);
        setShowControls(true);
        updateControls(obj);
        fabricCanvas.current.renderAll();
        // Do not notify parent here; handled when adding the pin
      }
    });

    fabricCanvas.current.on('selection:updated', (e) => {
      const obj = e.selected[0];
      if (obj && !obj.isCase) {
        // Remove border from all other objects (only one border at a time)
        borderRectsRef.current.forEach((borderRect, existingObj) => {
          if (existingObj !== obj) {
            fabricCanvas.current.remove(borderRect);
            borderRectsRef.current.delete(existingObj);
          }
        });
        
        // Lock text scaling and hide controls if it's a text object
        if (obj.type === 'textbox' || obj.type === 'text' || obj.type === 'i-text') {
          obj.set({
            lockScalingX: true,
            lockScalingY: true,
            lockUniScaling: true,
            hasControls: false,
            hasBorders: false,
            borderColor: 'transparent',
            cornerColor: 'transparent',
            cornerSize: 0,
            transparentCorners: true,
          });
        } else if (obj.type === 'image') {
          obj.set({
            hasBorders: false,
            borderColor: 'transparent',
          });
        }
        // Update custom border rectangle
        updateBorderRect(obj);
        setSelectedPin(obj);
        setShowControls(true);
        updateControls(obj);
        fabricCanvas.current.renderAll();
        // Don't call onPinSelect here to avoid duplicate additions
      }
    });

    // Prevent text scaling during scaling events
    fabricCanvas.current.on('object:scaling', (e) => {
      const obj = e.target;
      if (obj && (obj.type === 'textbox' || obj.type === 'text' || obj.type === 'i-text')) {
        // Reset scale to 1 if user tries to scale text and hide controls
        obj.set({
          scaleX: 1,
          scaleY: 1,
          lockScalingX: true,
          lockScalingY: true,
          lockUniScaling: true,
          hasControls: false,
          hasBorders: false,
          borderColor: 'transparent',
          cornerColor: 'transparent',
          cornerSize: 0,
          transparentCorners: true,
        });
        fabricCanvas.current.renderAll();
      }
    });

    fabricCanvas.current.on('selection:cleared', () => {
      // Hide red boundary and case border when selection is cleared
      if (boundaryRectRef.current) {
        boundaryRectRef.current.set('visible', false);
      }
      if (caseBorderRectRef.current) {
        caseBorderRectRef.current.set('visible', false);
      }
      // Remove all custom border rectangles when selection is cleared
      borderRectsRef.current.forEach((borderRect, obj) => {
        fabricCanvas.current.remove(borderRect);
        borderRectsRef.current.delete(obj);
      });
      fabricCanvas.current.renderAll();
      setSelectedPin(null);
      setShowControls(false);
      onPinSelect && onPinSelect(null);
    });

    // Keep text uppercase when edited
    fabricCanvas.current.on('text:changed', (e) => {
      const obj = e.target;
      if (obj && (obj.type === 'textbox' || obj.type === 'text' || obj.type === 'i-text')) {
        const currentText = obj.text || '';
        const upperText = currentText.toUpperCase();
        if (currentText !== upperText) {
          obj.set('text', upperText);
          fabricCanvas.current.renderAll();
        }
      }
    });

    // Window resize handler
     const handleResize = () => {
    resizeCanvasToFitScreen();
  };
    
  window.addEventListener('resize', handleResize);

    // Store refs in variables for cleanup
    const borderRects = borderRectsRef.current;
    const canvas = fabricCanvas.current;
    const timeoutRef = boundaryRectTimeoutRef;
    
    return () => {
      window.removeEventListener('resize', handleResize);
      
      // Clear any pending boundary rect timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      
      // Clean up border rectangles
      if (canvas && borderRects) {
        borderRects.forEach((borderRect) => {
          canvas.remove(borderRect);
        });
        borderRects.clear();
      }
      // Dispose canvas only on component unmount
      // Since selectedCaseType is removed from dependencies, this won't run on case changes
      canvas?.dispose();
    };
}, [onPinSelect, updateControls, updateBorderRect, removeBorderRect, resizeCanvasToFitScreen, setShowControls]);

  // Update controls position when selectedPin changes
  useEffect(() => {
    if (selectedPin && showControls) {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        updateControls(selectedPin);
      });
    }
  }, [selectedPin, showControls, updateControls, updateControlsPosition]);

  const handleAddText = useCallback(
    (text, options = {}) => {
      if (!fabricCanvas.current) return;

      const trimmed = (text || '').trim().toUpperCase();
      if (!trimmed) return;

      const canvasWidth = fabricCanvas.current.getWidth();
      const canvasHeight = fabricCanvas.current.getHeight();

      const textInstance = new fabric.Textbox(trimmed, {
        left: canvasWidth / 2,
        top: canvasHeight / 2,
        originX: 'center',
        originY: 'center',
        fontSize: Number(options.fontSize) || 28,
        fill: options.fill || '#1f2937',
        fontFamily: options.fontFamily || "'Poppins', sans-serif",
        textAlign: 'center',
        lineHeight: 1.2,
        borderColor: 'transparent',
        cornerColor: 'transparent',
        cornerSize: 0,
        transparentCorners: true,
        padding: 6,
        editable: true,
        lockScalingX: true,
        lockScalingY: true,
        lockUniScaling: true,
        hasControls: false,
        hasBorders: false,
      });

      fabricCanvas.current.add(textInstance);
      fabricCanvas.current.setActiveObject(textInstance);
      // Create custom border rectangle
      updateBorderRect(textInstance);
      fabricCanvas.current.renderAll();

      setSelectedPin(textInstance);
      setShowControls(true);
      updateControls(textInstance);
    },
    [updateControls, updateBorderRect, setShowControls]
  );

  // Case image loading disabled - using background div instead
  // The case image is now displayed as a background div in CreateYours component
  // Canvas is used only for charms/pins
  // Note: This effect only cleans up case-related objects, NOT charms/pins
  // Charms should persist when case/color changes
  useEffect(() => {
    if (!fabricCanvas.current) return;

    // Clear any pending boundary rect timeout to prevent duplicates
    if (boundaryRectTimeoutRef.current) {
      clearTimeout(boundaryRectTimeoutRef.current);
      boundaryRectTimeoutRef.current = null;
    }

    // Remove any existing case objects, boundary, and case border
    // IMPORTANT: Do NOT remove charms/pins - only remove case-related objects
    const objects = fabricCanvas.current.getObjects();
    
    // Helper function to identify boundary rects by their properties
    const isBoundaryRect = (obj) => {
      if (!obj || obj.type !== 'rect') return false;
      // Check for custom property first (most reliable)
      if (obj.isBoundaryRect === true) return true;
      // Fallback: check for boundary rect properties: dashed stroke, transparent fill, not selectable
      const strokeDashArray = obj.strokeDashArray;
      const hasDashedStroke = Array.isArray(strokeDashArray) && 
        ((strokeDashArray[0] === 4 && strokeDashArray[1] === 4) || 
         (strokeDashArray[0] === 3 && strokeDashArray[1] === 3));
      const isTransparentFill = !obj.fill || obj.fill === 'transparent';
      const isNotSelectable = obj.selectable === false;
      const isNotEvented = obj.evented === false;
      
      return hasDashedStroke && isTransparentFill && isNotSelectable && isNotEvented;
    };
    
    objects.forEach(obj => {
      // Remove case objects
      if (obj.isCase) {
        fabricCanvas.current.remove(obj);
      }
      // Remove boundary rects by checking properties (more reliable than ref comparison)
      else if (isBoundaryRect(obj) || obj === boundaryRectRef.current || obj === caseBorderRectRef.current) {
        fabricCanvas.current.remove(obj);
      }
    });
    
    // Clear all border rectangles (these are visual indicators, not charms)
    borderRectsRef.current.forEach((borderRect) => {
      fabricCanvas.current.remove(borderRect);
    });
    borderRectsRef.current.clear();
    caseInstanceRef.current = null;
    boundaryRectRef.current = null;
    caseBorderRectRef.current = null;

    // Ensure all charms/pins stay on top and visible
    // Bring all non-case objects (charms/pins/text) to front
    const remainingObjects = fabricCanvas.current.getObjects();
    remainingObjects.forEach(obj => {
      if (!obj.isCase && !isBoundaryRect(obj)) {
        fabricCanvas.current.bringObjectToFront(obj);
      }
    });

    // Re-render canvas to show updated case background while preserving charms
    fabricCanvas.current.renderAll();
  }, [selectedCaseType, selectedColor]);

  // Handle pin selection from PinSelector
  const handlePinSelection = useCallback(async (pin) => {
    if (!fabricCanvas.current) return;

    try {
      // Get the pin's size property from products.json
      // Size values in products.json are scale factors (typically 0.2 to 0.8)
      // Base size: 100px, then multiply by the size factor
      const baseSize = 100;
      const pinSizeFactor = pin.size !== undefined ? pin.size : 0.5;
      const pinSize = baseSize * pinSizeFactor;
      
      console.log('Adding pin to canvas:', pin.name, 'Size factor:', pinSizeFactor, 'Calculated size:', pinSize);
      
      const imgInstance = await loadImageLegacy(normalizeImagePath(pin.src), false, pinSize, pinSize);
      
      // Place the pin at a random position on the canvas
      // Account for the pin's size to ensure it stays within canvas bounds
      const canvasWidth = fabricCanvas.current.getWidth();
      const canvasHeight = fabricCanvas.current.getHeight();
      
      // Use the actual rendered size of the pin (accounting for scale)
      const pinWidth = (imgInstance.width || pinSize) * (imgInstance.scaleX || 1);
      const pinHeight = (imgInstance.height || pinSize) * (imgInstance.scaleY || 1);
      
      // Calculate safe area (leave margin to prevent pins from going outside)
      const margin = 20; // Margin from edges
      const minX = margin + pinWidth / 2;
      const maxX = canvasWidth - margin - pinWidth / 2;
      const minY = margin + pinHeight / 2;
      const maxY = canvasHeight - margin - pinHeight / 2;
      
      // Generate random position within safe bounds
      const randomX = Math.random() * (maxX - minX) + minX;
      const randomY = Math.random() * (maxY - minY) + minY;
      
      imgInstance.set({
        left: randomX,
        top: randomY
      });

      // Store pin data
      imgInstance.pinData = pin;
      
      // Remove default borders
      imgInstance.set({
        hasBorders: false,
        borderColor: 'transparent',
      });
      
      fabricCanvas.current.setActiveObject(imgInstance);
      // Create custom border rectangle
      updateBorderRect(imgInstance);
      fabricCanvas.current.renderAll();
      
      // Notify parent about pin addition exactly once per click
      if (onPinSelect) {
        onPinSelect(imgInstance);
      }
    } catch (error) {
      console.error('Error loading pin:', error);
    }
  }, [onPinSelect, updateBorderRect, loadImageLegacy]);

  // Handle save image
  const handleSaveImage = useCallback(() => {
    downloadCanvasImage(fabricCanvas, boundaryRectRef, caseBorderRectRef);
  }, []);

  // Get current composed design image as data URL
  const getDesignImageDataURL = useCallback(() => {
    return exportCanvasAsDataURL(fabricCanvas, boundaryRectRef, caseBorderRectRef);
  }, []);

  // Control handlers
  const handleRotateLeft = () => {
    if (selectedPin) {
      const currentAngle = selectedPin.angle || 0;
      selectedPin.set('angle', currentAngle - 15);
      fabricCanvas.current.renderAll();
      updateControls(selectedPin);
    }
  };

  const handleRotateRight = () => {
    if (selectedPin) {
      const currentAngle = selectedPin.angle || 0;
      selectedPin.set('angle', currentAngle + 15);
      fabricCanvas.current.renderAll();
      updateControls(selectedPin);
    }
  };

  const handleDelete = () => {
    if (selectedPin) {
      // Remove border rectangle if exists
      removeBorderRect(selectedPin);
      fabricCanvas.current.remove(selectedPin);
      fabricCanvas.current.discardActiveObject();
      fabricCanvas.current.renderAll();
      setSelectedPin(null);
      setShowControls(false);
      onPinRemove && onPinRemove(selectedPin);
    }
  };

  // Expose pin selection method globally
  useEffect(() => {
    window.addPinToCanvas = handlePinSelection;
    window.addTextToCanvas = handleAddText;
    // Expose getter so parent can fetch current composed design image
    window.getDesignImageDataURL = getDesignImageDataURL;
    if (onSaveImage) {
      onSaveImage(handleSaveImage);
    }
    return () => {
      delete window.addPinToCanvas;
      delete window.addTextToCanvas;
      delete window.getDesignImageDataURL;
    };
  }, [handleAddText, handlePinSelection, onSaveImage, getDesignImageDataURL, handleSaveImage]);

  return (
    <div className="w-full h-full flex flex-col  sm:items-center ">
      <div className="w-full h-full relative flex item-top justify-center  ">
        <canvas 
          ref={canvasRef} 
          className="w-full h-screen "
          style={{ 
            background: 'transparent',
            width: '100%',
            height: '100%'
          }}
        />
        
        {/* Controls */}
        <CanvasControls
          showControls={showControls}
          controlsPosition={controlsPosition}
          onRotateLeft={handleRotateLeft}
          onRotateRight={handleRotateRight}
          onDelete={handleDelete}
        />
      </div>
      
    </div>
  );
};

export default Canvas;
