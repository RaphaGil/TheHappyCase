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
  const caseInstanceRef = useRef(null);
  const boundaryRectRef = useRef(null);
  const boundaryTextRef = useRef(null); // Text message for limit area
  const caseBorderRectRef = useRef(null); // Red border around the case image
  const backgroundRectRef = useRef(null); // Background rectangle behind all objects
  const borderRectsRef = useRef(new Map()); // Store border rectangles for selected objects
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
          // Fixed scaling for the case image - bigger but fits without cutting
          const isMobile = window.innerWidth < 768;
          const scaleMultiplier = isMobile ? 0.95 : 1.1; // Fits within canvas on mobile, bigger on desktop
          const scale = Math.min(
            canvasWidth * scaleMultiplier / imgElement.width,
            canvasHeight * scaleMultiplier / imgElement.height
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
          imgInstance.set('evented', false);
          caseInstanceRef.current = imgInstance;
          fabricCanvas.current.add(imgInstance);
          // Ensure background stays at the back, then case, then other elements
          if (backgroundRectRef.current) {
            fabricCanvas.current.sendObjectToBack(backgroundRectRef.current);
          }
          fabricCanvas.current.sendObjectToBack(imgInstance);
          
          // Create red boundary rectangle after case is loaded
          setTimeout(() => {
            if (boundaryRectRef.current) {
              fabricCanvas.current.remove(boundaryRectRef.current);
            }
            if (boundaryTextRef.current) {
              fabricCanvas.current.remove(boundaryTextRef.current);
            }
            
            // Remove existing case border if any
            if (caseBorderRectRef.current) {
              fabricCanvas.current.remove(caseBorderRectRef.current);
            }
            
            const rect = imgInstance.getBoundingRect();
            // Add inset to make boundary smaller (inside the case image)
            // Separate horizontal and vertical insets - larger horizontal for smaller width
            // Business class case needs wider boundary (more inset from edges)
            // On mobile, use minimal insets to maximize usable area
            const isMobile = window.innerWidth < 768;
            const isLargeScreen = window.innerWidth >= 1024; // lg breakpoint
            // Left margin is wider, right margin is smaller - but overall more area
            // Economy class cases get wider area (smaller insets)
            const insetHorizontalLeft = isMobile
              ? (selectedCaseType === 'business' ? 15 : 10)  // Minimal insets on mobile (scaled proportionally)
              : isLargeScreen
                ? (selectedCaseType === 'business' ? 20 : 15)  // Wider left margin, Economy gets more area
                : (selectedCaseType === 'business' ? 140 : 120); // Original insets on desktop
            const insetHorizontalRight = isMobile
              ? (selectedCaseType === 'business' ? 15 : 10)  // Minimal insets on mobile (scaled proportionally)
              : isLargeScreen
                ? (selectedCaseType === 'business' ? 3 : 1)  // Very small right margin, Economy gets more area
                : (selectedCaseType === 'business' ? 140 : 120); // Original insets on desktop
            const insetVertical = isMobile
              ? (selectedCaseType === 'business' ? 5 : 4)  // Minimal insets on mobile (scaled proportionally)
              : isLargeScreen
                ? (selectedCaseType === 'business' ? 2 : 0.5)  // Very minimal vertical insets, Economy gets more area
                : (selectedCaseType === 'business' ? 50 : 40); // Original insets on desktop
            const boundaryRect = new fabric.Rect({
              left: rect.left + insetHorizontalLeft,
              top: rect.top + insetVertical,
              width: rect.width - (insetHorizontalLeft + insetHorizontalRight),
              height: rect.height - (insetVertical * 2),
              fill: 'transparent',
              stroke: 'rgba(239, 68, 68, 0.7)', // Red - shown only when charm is near boundary
              strokeWidth: 2,
              strokeDashArray: [5, 5],
              selectable: false,
              evented: false,
              visible: false, // Hidden by default, shown only when charm is near boundary
            });
            
            boundaryRectRef.current = boundaryRect;
            fabricCanvas.current.add(boundaryRect);
            // Ensure background stays at the very back
            if (backgroundRectRef.current) {
              fabricCanvas.current.sendObjectToBack(backgroundRectRef.current);
            }
            fabricCanvas.current.sendObjectToBack(boundaryRect);
            
            // Create "Limit Area" text message
            const boundaryText = new fabric.Text('Limit Area', {
              left: rect.left + insetHorizontalLeft + 10,
              top: rect.top + insetVertical + 5,
              fontSize: 12,
              fill: 'rgba(239, 68, 68, 0.9)',
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 'bold',
              selectable: false,
              evented: false,
              visible: false, // Hidden by default, shown only when boundary is visible
            });
            
            boundaryTextRef.current = boundaryText;
            fabricCanvas.current.add(boundaryText);
            fabricCanvas.current.sendObjectToBack(boundaryText);
            
            // Create red border around the case image itself (shown when charm is at edge)
            // Make border wider for business and first class cases
            const borderWidth = (selectedCaseType === 'business' || selectedCaseType === 'firstclass') ? 5 : 3;
            const caseBorderRect = new fabric.Rect({
              left: rect.left,
              top: rect.top,
              width: rect.width,
              height: rect.height,
              fill: 'transparent',
              stroke: 'red',
              strokeWidth: borderWidth,
              selectable: false,
              evented: false,
              visible: false, // Hidden by default, shown when charm is at edge
            });
            
            caseBorderRectRef.current = caseBorderRect;
            fabricCanvas.current.add(caseBorderRect);
            // Ensure background stays at the very back
            if (backgroundRectRef.current) {
              fabricCanvas.current.sendObjectToBack(backgroundRectRef.current);
            }
            fabricCanvas.current.sendObjectToBack(caseBorderRect);
            fabricCanvas.current.sendObjectToBack(imgInstance);
            
            fabricCanvas.current.renderAll();
          }, 100);
        } else {
          fabricCanvas.current.add(imgInstance);
        }
  
        fabricCanvas.current.renderAll();
        resolve(imgInstance);
      };
  
      imgElement.onerror = reject;
    });
  };
  
  

  // Create or update border rectangle for selected object
  const updateBorderRect = useCallback((obj) => {
    if (!obj || !fabricCanvas.current || obj.isCase) return;
    
    // Remove existing border if any
    const existingBorder = borderRectsRef.current.get(obj);
    if (existingBorder) {
      fabricCanvas.current.remove(existingBorder);
      borderRectsRef.current.delete(obj);
    }
    
    // Get the exact bounding rectangle of the object (accounts for scale, rotation, etc.)
    const boundingRect = obj.getBoundingRect(true);
    
    // Calculate inset as a percentage of the smaller dimension to adjust to image shape
    // Use 2.5% of the smaller dimension for proportional scaling
    const minDimension = Math.min(boundingRect.width, boundingRect.height);
    const inset = Math.max(2, minDimension * 0.075); // Minimum 2px, or 2.5% of smaller dimension
    
    // Create border rectangle with proportional inset based on image size
    const borderRect = new fabric.Rect({
      left: boundingRect.left + inset,
      top: boundingRect.top + inset,
      width: boundingRect.width - (inset * 2),
      height: boundingRect.height - (inset * 2),
      originX: 'left',
      originY: 'top',
      fill: 'transparent',
      stroke: '#111827',
      strokeWidth: 1,
      strokeDashArray: [3, 3], // Dashed border (dots)
      selectable: false,
      evented: false,
      excludeFromExport: false,
    });
    
    borderRectsRef.current.set(obj, borderRect);
    fabricCanvas.current.add(borderRect);
    
    // Position border above case but below the selected object
    // Ensure background is at the very back, then case, then other elements
    if (backgroundRectRef.current) {
      fabricCanvas.current.sendObjectToBack(backgroundRectRef.current);
    }
    const caseInstance = caseInstanceRef.current;
    if (caseInstance) {
      fabricCanvas.current.sendObjectToBack(caseInstance);
    }
    // Ensure boundary rect, text, and case border are also at the back
    if (boundaryRectRef.current) {
      fabricCanvas.current.sendObjectToBack(boundaryRectRef.current);
    }
    if (boundaryTextRef.current) {
      fabricCanvas.current.sendObjectToBack(boundaryTextRef.current);
    }
    if (caseBorderRectRef.current) {
      fabricCanvas.current.sendObjectToBack(caseBorderRectRef.current);
    }
    // Bring the selected object to front so border appears below it
    fabricCanvas.current.bringObjectToFront(obj);
    
    fabricCanvas.current.renderAll();
  }, []);

  // Remove border rectangle for object
  const removeBorderRect = useCallback((obj) => {
    if (!obj || !fabricCanvas.current) return;
    const borderRect = borderRectsRef.current.get(obj);
    if (borderRect) {
      fabricCanvas.current.remove(borderRect);
      borderRectsRef.current.delete(obj);
      fabricCanvas.current.renderAll();
    }
  }, []);

  // Update controls position
  const updateControls = useCallback((obj) => {
    if (!obj || !fabricCanvas.current) return;
    
    const rect = obj.getBoundingRect(true);
    const canvas = fabricCanvas.current;
    const canvasElement = canvas.getElement();
    const canvasContainer = canvasElement.parentElement;
    
    if (!canvasContainer) return;
    
    // Get canvas position relative to its container
    const canvasRect = canvasElement.getBoundingClientRect();
    const containerRect = canvasContainer.getBoundingClientRect();
    
    // Calculate position relative to container
    const canvasOffsetX = canvasRect.left - containerRect.left;
    const canvasOffsetY = canvasRect.top - containerRect.top;
    
    // Calculate desired position (just above the charm)
    const desiredX = canvasOffsetX + rect.left + rect.width / 2;
    const desiredY = canvasOffsetY + rect.top - 14; // closer to the charm
    
    // Clamp within container bounds
    const controlWidth = 70; // tighter controls
    const controlHeight = 32;
    const clampedX = Math.max(6, Math.min(desiredX - controlWidth / 2, containerRect.width - controlWidth - 6));
    const clampedY = Math.max(6, Math.min(desiredY, containerRect.height - controlHeight - 6));
    
    setControlsPosition({ x: clampedX, y: clampedY });
  }, []);


  const resizeCanvasToFitScreen = () => {
    const canvas = fabricCanvas.current;
    if (!canvas || !canvasRef.current) return;
  
    const container = canvasRef.current.parentElement;
    if (!container) return;
  
    const containerWidth = container.clientWidth;
    const isMobile = window.innerWidth < 768;
    
    // Use container width, but ensure minimum size and max size for mobile
    const canvasWidth = isMobile 
      ? Math.max(300, Math.min(containerWidth, 360))
      : Math.min(500, containerWidth);
    const canvasHeight = isMobile ? canvasWidth * 1.2 : canvasWidth; // Taller on mobile, square on desktop
  
    canvas.setWidth(canvasWidth);
    canvas.setHeight(canvasHeight);
    
    // Resize background rectangle if it exists
    if (backgroundRectRef.current) {
      backgroundRectRef.current.set({
        width: canvasWidth,
        height: canvasHeight
      });
      canvas.sendObjectToBack(backgroundRectRef.current);
    }
    
    canvas.renderAll();
  };
  // Initialize canvas
  useEffect(() => {
    if (!canvasRef.current) return;
  
    const container = canvasRef.current.parentElement;
    if (!container) return;
  
    const containerWidth = container.clientWidth;
    const isMobile = window.innerWidth < 768;
    
    // Use container width, but ensure minimum size and max size for mobile
    const canvasWidth = isMobile 
      ? Math.max(300, Math.min(containerWidth, 360))
      : Math.min(500, containerWidth);
    const canvasHeight = isMobile ? canvasWidth * 1.2 : canvasWidth; // Taller on mobile, square on desktop
  
    fabricCanvas.current = new fabric.Canvas(canvasRef.current, {
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: 'transparent'
    });
    
    // Create background rectangle
    const backgroundRect = new fabric.Rect({
      left: 0,
      top: 0,
      width: canvasWidth,
      height: canvasHeight,
      fill: 'transparent',
      selectable: false,
      evented: false,
      excludeFromExport: false,
    });
    
    backgroundRectRef.current = backgroundRect;
    fabricCanvas.current.add(backgroundRect);
    fabricCanvas.current.sendObjectToBack(backgroundRect);

    // Object moving constraints
    fabricCanvas.current.on('object:moving', (e) => {
      const obj = e.target;
      if (!obj || !obj.getBoundingRect || obj.isCase || obj === boundaryRectRef.current || obj === boundaryTextRef.current || obj === caseBorderRectRef.current) return; // Skip case object, boundary, text, and case border
      
      // Get case bounds for constraint
      const caseInstance = caseInstanceRef.current;
      if (!caseInstance) return;
      
      // Update object coordinates first to ensure accurate calculations
      obj.setCoords();
      
      const caseRect = caseInstance.getBoundingRect();
      const objRect = obj.getBoundingRect(true);
      
      // Check if we're on mobile
      const isMobile = window.innerWidth < 768;
      
      // Calculate the actual bounds of the case image with inset (matching the red boundary)
      // Separate horizontal and vertical insets to match the red boundary
      // Business class case needs wider boundary (more inset from edges)
      // On mobile, use minimal insets to maximize usable area
      const isLargeScreen = window.innerWidth >= 1024; // lg breakpoint
      // Left margin is wider, right margin is smaller - but overall more area
      // Economy class cases get wider area (smaller insets)
      const insetHorizontalLeft = isMobile 
        ? (selectedCaseType === 'business' ? 1 : 0.5)  // Minimal insets on mobile for maximum area
        : isLargeScreen
          ? (selectedCaseType === 'business' ? 16 : 16)  // Wider left margin, Economy gets more area
          : (selectedCaseType === 'business' ? 14 : 12); // Original insets on desktop
      const insetHorizontalRight = isMobile 
        ? (selectedCaseType === 'business' ? 1 : 0.5)  // Minimal insets on mobile for maximum area
        : isLargeScreen
          ? (selectedCaseType === 'business' ? 0.5 : 0.2)  // Very small right margin, Economy gets more area
          : (selectedCaseType === 'business' ? 14 : 12); // Original insets on desktop
      const insetVertical = isMobile
        ? (selectedCaseType === 'business' ? 4 : 3)  // Minimal insets on mobile for maximum area
        : isLargeScreen
          ? (selectedCaseType === 'business' ? 2 : 1)  // Very minimal vertical insets, Economy gets more area
          : (selectedCaseType === 'business' ? 40 : 30); // Original insets on desktop
      const caseLeft = caseRect.left + insetHorizontalLeft;
      const caseTop = caseRect.top + insetVertical;
      const caseRight = caseRect.left + caseRect.width - insetHorizontalRight;
      const caseBottom = caseRect.top + caseRect.height - insetVertical;
      
      // Check if object is near or over the boundary line (within threshold)
      const threshold = 1; // Distance threshold to show boundary (smaller margin to show warning when closer to edge)
      const isNearLeft = objRect.left <= caseLeft + threshold && objRect.left + objRect.width >= caseLeft;
      const isNearRight = objRect.left <= caseRight && objRect.left + objRect.width >= caseRight - threshold;
      const isNearTop = objRect.top <= caseTop + threshold && objRect.top + objRect.height >= caseTop;
      const isNearBottom = objRect.top <= caseBottom && objRect.top + objRect.height >= caseBottom - threshold;
      const isOverBoundary = isNearLeft || isNearRight || isNearTop || isNearBottom;
      
      // Show boundary only when charm is near/over it
      if (boundaryRectRef.current) {
        if (isOverBoundary) {
          boundaryRectRef.current.set({
            visible: true,
            stroke: 'rgba(239, 68, 68, 0.7)', // Red when near boundary
            strokeWidth: 2
          });
          // Show limit area text
          if (boundaryTextRef.current) {
            boundaryTextRef.current.set({
              visible: true
            });
          }
        } else {
          boundaryRectRef.current.set({
            visible: false // Hide when not near boundary
          });
          // Hide limit area text
          if (boundaryTextRef.current) {
            boundaryTextRef.current.set({
              visible: false
            });
          }
        }
      }
      
      // Hide red border around the case image (no longer showing it)
      if (caseBorderRectRef.current) {
        caseBorderRectRef.current.set('visible', false);
      }
      
      if (isOverBoundary) {
        fabricCanvas.current.renderAll();
      }
      
      // Keep object within case bounds (strictly inside the red boundary)
      // Use minimal margin on mobile to maximize usable area
      const margin = isMobile ? 0.1 : 1; // Minimal margin on mobile
      const tolerance = 0.1; // Tolerance to prevent unnecessary updates
      
      // Calculate object dimensions from bounding rect
      const objWidth = objRect.width;
      const objHeight = objRect.height;
      const halfWidth = objWidth / 2;
      const halfHeight = objHeight / 2;
      
      // Get current object center position
      let newLeft = obj.left;
      let newTop = obj.top;
      let needsUpdate = false;
      
      // Constrain horizontal position (accounting for center origin)
      // Keep object strictly inside the boundary (left edge)
      if (objRect.left < caseLeft + margin) {
        const constrainedLeft = caseLeft + margin + halfWidth;
        if (Math.abs(newLeft - constrainedLeft) > tolerance) {
          newLeft = constrainedLeft;
          needsUpdate = true;
        }
      }
      // Keep object strictly inside the boundary (right edge)
      if (objRect.left + objWidth > caseRight - margin) {
        const constrainedLeft = caseRight - margin - halfWidth;
        if (Math.abs(newLeft - constrainedLeft) > tolerance) {
          newLeft = constrainedLeft;
          needsUpdate = true;
        }
      }
      
      // Constrain vertical position (accounting for center origin)
      // Keep object strictly inside the boundary (top edge)
      if (objRect.top < caseTop + margin) {
        const constrainedTop = caseTop + margin + halfHeight;
        if (Math.abs(newTop - constrainedTop) > tolerance) {
          newTop = constrainedTop;
          needsUpdate = true;
        }
      }
      // Keep object strictly inside the boundary (bottom edge)
      if (objRect.top + objHeight > caseBottom - margin) {
        const constrainedTop = caseBottom - margin - halfHeight;
        if (Math.abs(newTop - constrainedTop) > tolerance) {
          newTop = constrainedTop;
          needsUpdate = true;
        }
      }
      
      // Apply constraints only if significant change is needed (prevents vibrating)
      if (needsUpdate) {
        // Round positions to avoid floating point precision issues
        newLeft = Math.round(newLeft * 100) / 100;
        newTop = Math.round(newTop * 100) / 100;
        
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
        const inset = Math.max(2, minDimension * 0.005); // Minimum 2px, or 2.5% of smaller dimension
        
        borderRect.set({
          left: boundingRect.left + 2,
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
      
      // Hide boundary when object movement is complete
      if (boundaryRectRef.current && obj && !obj.isCase && obj !== boundaryRectRef.current) {
        boundaryRectRef.current.set({
          visible: false
        });
      }
      // Hide limit area text when object movement is complete
      if (boundaryTextRef.current && obj && !obj.isCase && obj !== boundaryTextRef.current) {
        boundaryTextRef.current.set({
          visible: false
        });
      }
      if (caseBorderRectRef.current && obj && !obj.isCase && obj !== caseBorderRectRef.current) {
        caseBorderRectRef.current.set('visible', false);
      }
      if (obj && !obj.isCase && obj !== boundaryRectRef.current && obj !== boundaryTextRef.current && obj !== caseBorderRectRef.current) {
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
      // Hide boundary when selection is cleared
      if (boundaryRectRef.current) {
        boundaryRectRef.current.set({
          visible: false
        });
      }
      // Hide limit area text when selection is cleared
      if (boundaryTextRef.current) {
        boundaryTextRef.current.set({
          visible: false
        });
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

    // Window resize handler
     const handleResize = () => {
    resizeCanvasToFitScreen();
  };
    
  window.addEventListener('resize', handleResize);

    // Store refs in variables for cleanup
    const borderRects = borderRectsRef.current;
    const canvas = fabricCanvas.current;
    
    return () => {
      window.removeEventListener('resize', handleResize);
      // Clean up border rectangles
      if (canvas && borderRects) {
        borderRects.forEach((borderRect) => {
          canvas.remove(borderRect);
        });
        borderRects.clear();
      }
      canvas?.dispose();
    };
}, [onPinSelect, updateControls, updateBorderRect, removeBorderRect]);

  // Update controls position when selectedPin changes
  useEffect(() => {
    if (selectedPin && showControls) {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        updateControls(selectedPin);
      });
    }
  }, [selectedPin, showControls, updateControls]);

  const handleAddText = useCallback(
    (text, options = {}) => {
      if (!fabricCanvas.current) return;

      const trimmed = (text || '').trim();
      if (!trimmed) return;

      // Convert text to uppercase
      const uppercaseText = trimmed.toUpperCase();

      const canvasWidth = fabricCanvas.current.getWidth();
      const canvasHeight = fabricCanvas.current.getHeight();

      const textInstance = new fabric.Textbox(uppercaseText, {
        left: canvasWidth / 2,
        top: canvasHeight / 2,
        originX: 'center',
        originY: 'center',
        fontSize: Number(options.fontSize) || 36,
        fill: options.fill || '#CD7F32', // Old bronze color
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
    [updateControls, updateBorderRect]
  );

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

    // Remove old case objects, boundary, text, case border, and border rectangles
    const objects = fabricCanvas.current.getObjects();
    objects.forEach(obj => {
      if (obj.isCase || obj === boundaryRectRef.current || obj === boundaryTextRef.current || obj === caseBorderRectRef.current) {
        fabricCanvas.current.remove(obj);
      }
    });
    // Clear all border rectangles
    borderRectsRef.current.forEach((borderRect) => {
      fabricCanvas.current.remove(borderRect);
    });
    borderRectsRef.current.clear();
    caseInstanceRef.current = null;
    boundaryRectRef.current = null;
    boundaryTextRef.current = null;
    caseBorderRectRef.current = null;

    // Load new case image
    loadImage(selectedColorData.image, true).then((caseInstance) => {
      fabricCanvas.current.renderAll();
    });

  }, [selectedCaseType, selectedColor, products.cases]);

  // Handle pin selection from PinSelector
  const handlePinSelection = useCallback(async (pin) => {
    if (!fabricCanvas.current) return;

    console.log('Adding pin to canvas:', pin.name); // Debug log

    try {
      // Adjust pin size based on screen size - increased for better visibility
      const isMobile = window.innerWidth < 768;
      let basePinSize = isMobile ? 120 : 150;
      
      // Use size multiplier from pin data (default to 1.0 if not specified)
      const sizeMultiplier = pin.size !== undefined ? pin.size : 1.0;
      const pinSize = basePinSize * sizeMultiplier;
      
      const imgInstance = await loadImage(pin.src, false, pinSize, pinSize);
      
      // Center the pin on the canvas
      imgInstance.set({
        left: fabricCanvas.current.getWidth() / 2,
        top: fabricCanvas.current.getHeight() / 2
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
  }, [onPinSelect, updateBorderRect]);

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
  }, [handleAddText, handlePinSelection, onSaveImage, updateBorderRect, removeBorderRect]);

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

  // Handle save image
  const handleSaveImage = () => {
    if (!fabricCanvas.current) return;

    // Temporarily hide boundary, text, and case border for export
    const boundaryVisible = boundaryRectRef.current ? boundaryRectRef.current.visible : true;
    const boundaryTextVisible = boundaryTextRef.current ? boundaryTextRef.current.visible : true;
    const caseBorderVisible = caseBorderRectRef.current ? caseBorderRectRef.current.visible : true;
    if (boundaryRectRef.current) {
      boundaryRectRef.current.visible = false;
    }
    if (boundaryTextRef.current) {
      boundaryTextRef.current.visible = false;
    }
    if (caseBorderRectRef.current) {
      caseBorderRectRef.current.visible = false;
    }

    // Create a temporary canvas with white background for better visibility
    const dataURL = fabricCanvas.current.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 2, // Higher resolution
      backgroundColor: 'white'
    });

    // Restore boundary, text, and case border visibility
    if (boundaryRectRef.current) {
      boundaryRectRef.current.visible = boundaryVisible;
    }
    if (boundaryTextRef.current) {
      boundaryTextRef.current.visible = boundaryTextVisible;
    }
    if (caseBorderRectRef.current) {
      caseBorderRectRef.current.visible = caseBorderVisible;
    }
    if (boundaryRectRef.current || boundaryTextRef.current || caseBorderRectRef.current) {
      fabricCanvas.current.renderAll();
    }

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
    
    // Temporarily hide boundary, text, and case border for export
    const boundaryVisible = boundaryRectRef.current ? boundaryRectRef.current.visible : true;
    const boundaryTextVisible = boundaryTextRef.current ? boundaryTextRef.current.visible : true;
    const caseBorderVisible = caseBorderRectRef.current ? caseBorderRectRef.current.visible : true;
    if (boundaryRectRef.current) {
      boundaryRectRef.current.visible = false;
    }
    if (boundaryTextRef.current) {
      boundaryTextRef.current.visible = false;
    }
    if (caseBorderRectRef.current) {
      caseBorderRectRef.current.visible = false;
    }

    const dataURL = fabricCanvas.current.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 2,
      backgroundColor: 'white'
    });

    // Restore boundary, text, and case border visibility
    if (boundaryRectRef.current) {
      boundaryRectRef.current.visible = boundaryVisible;
    }
    if (boundaryTextRef.current) {
      boundaryTextRef.current.visible = boundaryTextVisible;
    }
    if (caseBorderRectRef.current) {
      caseBorderRectRef.current.visible = caseBorderVisible;
    }
    if (boundaryRectRef.current || boundaryTextRef.current || caseBorderRectRef.current) {
      fabricCanvas.current.renderAll();
    }

    return dataURL;
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="happy-card p-2 sm:p-6 mb-2 relative flex items-center justify-center w-[380px] sm:w-[580px]" style={{aspectRatio: window.innerWidth < 768 ? '1/1.2' : '1'}}>
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
            className="absolute z-50 flex items-center gap-1 bg-white/90 border border-gray-200 rounded px-1.5 py-0.5 shadow-sm"
            style={{
              left: controlsPosition.x,
              top: controlsPosition.y,
              position: 'absolute'
            }}
          >
            <button
              onClick={handleRotateLeft}
              className="w-4 h-4 mr-2 flex items-center justify-center text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
              aria-label="Rotate Left"
              title="Rotate Left"
            >
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M24 192l144 0c9.7 0 18.5-5.8 22.2-14.8s1.7-19.3-5.2-26.2l-46.7-46.7c75.3-58.6 184.3-53.3 253.5 15.9 75 75 75 196.5 0 271.5s-196.5 75-271.5 0c-10.2-10.2-19-21.3-26.4-33-9.5-14.9-29.3-19.3-44.2-9.8s-19.3 29.3-9.8 44.2C49.7 408.7 61.4 423.5 75 437 175 537 337 537 437 437S537 175 437 75C342.8-19.3 193.3-24.7 92.7 58.8L41 7C34.1 .2 23.8-1.9 14.8 1.8S0 14.3 0 24L0 168c0 13.3 10.7 24 24 24z"/></svg>
            </button>
            <button
              onClick={handleRotateRight}
              className="w-4 h-4 flex items-center justify-center text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
              aria-label="Rotate Right"
              title="Rotate Right"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M488 192l-144 0c-9.7 0-18.5-5.8-22.2-14.8s-1.7-19.3 5.2-26.2l46.7-46.7c-75.3-58.6-184.3-53.3-253.5 15.9-75 75-75 196.5 0 271.5s196.5 75 271.5 0c8.2-8.2 15.5-16.9 21.9-26.1 10.1-14.5 30.1-18 44.6-7.9s18 30.1 7.9 44.6c-8.5 12.2-18.2 23.8-29.1 34.7-100 100-262.1 100-362 0S-25 175 75 75c94.3-94.3 243.7-99.6 344.3-16.2L471 7c6.9-6.9 17.2-8.9 26.2-5.2S512 14.3 512 24l0 144c0 13.3-10.7 24-24 24z"/>
              </svg>
            </button>
            <button
              onClick={handleDelete}
              className="w-6 h-6 flex items-center justify-center text-lg text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
              aria-label="Remove"
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
