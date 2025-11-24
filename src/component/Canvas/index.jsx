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
  const containerRef = useRef(null); // Container for background image and canvas
  const caseInstanceRef = useRef(null);
  const caseBorderRectRef = useRef(null); // Red border around the case image
  const backgroundRectRef = useRef(null); // Background rectangle behind all objects
  const borderRectsRef = useRef(new Map()); // Store border rectangles for selected objects
  const topLimitRef = useRef(null); // Top limit line
  const rightLimitRef = useRef(null); // Right limit line
  const bottomLimitRef = useRef(null); // Bottom limit line
  const leftLimitRef = useRef(null); // Left limit line
  const [selectedPin, setSelectedPin] = useState(null);
  const [controlsPosition, setControlsPosition] = useState({ x: 0, y: 0 });
  const [showControls, setShowControls] = useState(false);
  const [caseImageUrl, setCaseImageUrl] = useState(null); // Store case image URL for background
  const [showInvalidPositionAlert, setShowInvalidPositionAlert] = useState(false);

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
          // Move case image a bit higher (reduce top position)
          top = canvasHeight / 2 - (canvasHeight * 0.05); // Move up by 5% of canvas height
          // Fixed scaling for the case image - bigger but fits without cutting
          const screenWidth = window.innerWidth;
          const isMobile = screenWidth < 768;
          const isMediumScreen = screenWidth >= 768 && screenWidth < 1024;
          // Scale multiplier: mobile 0.95, medium 0.85, large 0.7
          const scaleMultiplier = isMobile ? 0.95 : (isMediumScreen ? 0.85 : 0.7);
          const scale = Math.min(
            canvasWidth * scaleMultiplier / imgElement.width,
            canvasHeight * scaleMultiplier / imgElement.height
          );

          scaleX = scale;
          scaleY = scale;
        } else {
          // Use natural image size by default, or scale if size constraint is provided
          const naturalWidth = imgElement.width;
          const naturalHeight = imgElement.height;
          
          // If pinWidth/pinHeight are very large (9999), use natural size (1:1 scale)
          // Otherwise, scale proportionally to fit within the max size constraint
          if (pinWidth >= 9999 || pinHeight >= 9999) {
            // Use natural size - no scaling
            scaleX = 1;
            scaleY = 1;
          } else {
            // Scale proportionally to fit within max size while maintaining aspect ratio
            const maxSize = Math.max(pinWidth, pinHeight);
            const naturalAspectRatio = naturalWidth / naturalHeight;
            let targetWidth, targetHeight;
            
            if (naturalWidth >= naturalHeight) {
              // Landscape or square - fit to width
              targetWidth = maxSize;
              targetHeight = maxSize / naturalAspectRatio;
            } else {
              // Portrait - fit to height
              targetHeight = maxSize;
              targetWidth = maxSize * naturalAspectRatio;
            }
            
            scaleX = targetWidth / naturalWidth;
            scaleY = targetHeight / naturalHeight;
          }
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
          // Case images are now handled as CSS background, so we don't add them to canvas
          // This function is kept for pins and other images
          resolve(null);
          return;
        } else {
          // For non-case images (pins), add them to canvas
          fabricCanvas.current.add(imgInstance);
          resolve(imgInstance);
        }
      };
  
      imgElement.onerror = reject;
    });
  };

  // Create case border rectangle
  const createCaseBorder = useCallback(() => {
    if (!fabricCanvas.current || !containerRef.current) return;

    // Remove existing case border
    if (caseBorderRectRef.current) {
      fabricCanvas.current.remove(caseBorderRectRef.current);
    }

    const canvasWidth = fabricCanvas.current.getWidth();
    const canvasHeight = fabricCanvas.current.getHeight();
    
    // Create visible border around the canvas area to show Fabric.js size
    // Account for stroke width so all edges are visible
    const strokeWidth = 2;
    const halfStroke = strokeWidth / 2;
    const caseBorderRect = new fabric.Rect({
      left: halfStroke,
      top: halfStroke,
      width: canvasWidth - strokeWidth,
      height: canvasHeight - strokeWidth,
      fill: 'transparent',
      stroke: 'blue',
      strokeWidth: strokeWidth,
      selectable: false,
      evented: false,
      visible: false, // Hidden - blue edge line removed
    });
    
    caseBorderRectRef.current = caseBorderRect;
    fabricCanvas.current.add(caseBorderRect);
    fabricCanvas.current.sendObjectToBack(caseBorderRect);
    
    // Canvas dimension text removed - no longer showing canvas area
    
    // Remove existing limit lines if they exist
    if (topLimitRef.current) fabricCanvas.current.remove(topLimitRef.current);
    if (rightLimitRef.current) fabricCanvas.current.remove(rightLimitRef.current);
    if (bottomLimitRef.current) fabricCanvas.current.remove(bottomLimitRef.current);
    if (leftLimitRef.current) fabricCanvas.current.remove(leftLimitRef.current);
    // Create all 4 limit lines at 0px offset (canvas edges)
    // Top limit line
    const topLimitLine = new fabric.Line(
      [0, 0, canvasWidth, 0],
      {
        stroke: 'red',
        strokeWidth: 2,
        strokeDashArray: [10, 5],
        selectable: false,
        evented: false,
        visible: false,
      }
    );
    topLimitRef.current = topLimitLine;
    fabricCanvas.current.add(topLimitLine);
    fabricCanvas.current.sendObjectToBack(topLimitLine);
    
    // Right limit line
    const rightLimitLine = new fabric.Line(
      [canvasWidth, 0, canvasWidth, canvasHeight],
      {
        stroke: 'red',
        strokeWidth: 2,
        strokeDashArray: [10, 5],
        selectable: false,
        evented: false,
        visible: false,
      }
    );
    rightLimitRef.current = rightLimitLine;
    fabricCanvas.current.add(rightLimitLine);
    fabricCanvas.current.sendObjectToBack(rightLimitLine);
    
    // Bottom limit line
    const bottomLimitLine = new fabric.Line(
      [0, canvasHeight, canvasWidth, canvasHeight],
      {
        stroke: 'red',
        strokeWidth: 2,
        strokeDashArray: [10, 5],
        selectable: false,
        evented: false,
        visible: false,
      }
    );
    bottomLimitRef.current = bottomLimitLine;
    fabricCanvas.current.add(bottomLimitLine);
    fabricCanvas.current.sendObjectToBack(bottomLimitLine);
    
    // Left limit line
    const leftLimitLine = new fabric.Line(
      [0, 0, 0, canvasHeight],
      {
        stroke: 'red',
        strokeWidth: 2,
        strokeDashArray: [10, 5],
        selectable: false,
        evented: false,
        visible: false,
      }
    );
    leftLimitRef.current = leftLimitLine;
    fabricCanvas.current.add(leftLimitLine);
    fabricCanvas.current.sendObjectToBack(leftLimitLine);
    
    if (backgroundRectRef.current) {
      fabricCanvas.current.sendObjectToBack(backgroundRectRef.current);
    }
    
    fabricCanvas.current.renderAll();
  }, []);

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
    
    // Use fixed pixel inset for all charms - same size border regardless of charm size
    const isMobile = window.innerWidth < 768;
    const inset = isMobile ? 0 : 0; // Fixed 10px on mobile, 8px on desktop
    
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
      strokeDashArray: [4, 4], // Dashed border (dots)
      selectable: false,
      evented: false,
      excludeFromExport: false,
    });
    
    borderRectsRef.current.set(obj, borderRect);
    fabricCanvas.current.add(borderRect);
    
    // Position border above case but below the selected object
    // Ensure background is at the very back, then boundary elements, then other elements
    if (backgroundRectRef.current) {
      fabricCanvas.current.sendObjectToBack(backgroundRectRef.current);
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
    // Higher offset on mobile, closer on desktop
    const isMobile = window.innerWidth < 768;
    const verticalOffset = isMobile ? -50 : -14; // Higher on mobile
    const desiredY = canvasOffsetY + rect.top + verticalOffset;
    
    // Clamp within container bounds
    const controlWidth = 70; // tighter controls
    const controlHeight = 32;
    const clampedX = Math.max(6, Math.min(desiredX - controlWidth / 2, containerRect.width - controlWidth - 6));
    const clampedY = Math.max(6, Math.min(desiredY, containerRect.height - controlHeight - 6));
    
    setControlsPosition({ x: clampedX, y: clampedY });
  }, []);


  const resizeCanvasToFitScreen = useCallback(() => {
    const canvas = fabricCanvas.current;
    if (!canvas || !canvasRef.current || !containerRef.current) return;
  
    // Fixed size for all screen sizes
    const canvasWidth = 450;
    const canvasHeight = 450;

    const oldWidth = canvas.getWidth();
    const oldHeight = canvas.getHeight();
  
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

    // Scale all objects proportionally if canvas size changed
    if (oldWidth !== canvasWidth || oldHeight !== canvasHeight) {
      const scaleX = oldWidth > 0 ? canvasWidth / oldWidth : 1;
      const scaleY = oldHeight > 0 ? canvasHeight / oldHeight : 1;

      const objects = canvas.getObjects();
      objects.forEach(obj => {
        if (obj !== backgroundRectRef.current) {
          // Check if this is a pin (charms image) - pins have pinData property
          const isPin = obj.pinData !== undefined;
          
          if (isPin) {
            // For pins: only scale position, keep size the same
            obj.left = (obj.left || 0) * scaleX;
            obj.top = (obj.top || 0) * scaleY;
            // Don't scale pin size - keep original scaleX and scaleY
            obj.setCoords();
            // Update border rectangle for this pin
            updateBorderRect(obj);
          } else {
            // For other objects (text, boundaries, etc.): scale both position and size
            obj.scaleX = (obj.scaleX || 1) * scaleX;
            obj.scaleY = (obj.scaleY || 1) * scaleY;
            obj.left = (obj.left || 0) * scaleX;
            obj.top = (obj.top || 0) * scaleY;
            obj.setCoords();
          }
        }
      });

      // Recreate case border with new dimensions
      createCaseBorder();
    }
    
    canvas.renderAll();
  }, [createCaseBorder, updateBorderRect]);
  // Initialize canvas
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
  
    // Fixed size for all screen sizes
    const canvasWidth = 450;
    const canvasHeight = 400;

    fabricCanvas.current = new fabric.Canvas(canvasRef.current, {
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: 'transparent' // Transparent so background image shows through
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
      if (!obj || !obj.getBoundingRect || obj.isCase || obj === caseBorderRectRef.current || 
          obj === topLimitRef.current || obj === rightLimitRef.current || 
          obj === bottomLimitRef.current || obj === leftLimitRef.current) return; // Skip case object, case border, and all limit elements
      
      // Get canvas bounds for constraint (case is now background image)
      if (!fabricCanvas.current) return;
      
      // Update object coordinates first to ensure accurate calculations
      obj.setCoords();
      
      const canvasWidth = fabricCanvas.current.getWidth();
      const canvasHeight = fabricCanvas.current.getHeight();
      const caseRect = {
        left: 0,
        top: 0,
        width: canvasWidth,
        height: canvasHeight
      };
      const objRect = obj.getBoundingRect(true);
      
      // Check if we're on mobile
      const isMobile = window.innerWidth < 768;
      
      // Calculate the actual bounds of the case image with inset
      // Separate horizontal and vertical insets for case bounds
      // Business class case needs wider margins (more inset from edges)
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
      
      // Hide red border around the case image (no longer showing it)
      if (caseBorderRectRef.current) {
        caseBorderRectRef.current.set('visible', false);
      }
      
      // Check if object is a charm (pin) and if it's over any edge (0px offset)
      const isPin = obj.pinData !== undefined;
      if (isPin) {
        // Check all 4 edges at 0px offset (canvas boundaries)
        const isOverTop = objRect.top < 0;
        const isOverRight = objRect.left + objRect.width > canvasWidth;
        const isOverBottom = objRect.top + objRect.height > canvasHeight;
        const isOverLeft = objRect.left < 0;
        const isOverAnyEdge = isOverTop || isOverRight || isOverBottom || isOverLeft;
        
        // Show/hide limit lines based on which edge is crossed
        if (topLimitRef.current) {
          topLimitRef.current.set({ visible: isOverTop });
        }
        if (rightLimitRef.current) {
          rightLimitRef.current.set({ visible: isOverRight });
        }
        if (bottomLimitRef.current) {
          bottomLimitRef.current.set({ visible: isOverBottom });
        }
        if (leftLimitRef.current) {
          leftLimitRef.current.set({ visible: isOverLeft });
        }
        
        // Show invalid position alert if over any edge
        setShowInvalidPositionAlert(isOverAnyEdge);
        
        if (isOverAnyEdge) {
          fabricCanvas.current.renderAll();
        }
      } else {
        // Hide all limits if not a pin
        if (topLimitRef.current) topLimitRef.current.set({ visible: false });
        if (rightLimitRef.current) rightLimitRef.current.set({ visible: false });
        if (bottomLimitRef.current) bottomLimitRef.current.set({ visible: false });
        if (leftLimitRef.current) leftLimitRef.current.set({ visible: false });
        setShowInvalidPositionAlert(false);
      }
      
      // Keep object within case bounds
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
      // Keep object strictly inside the case bounds (left edge)
      if (objRect.left < caseLeft + margin) {
        const constrainedLeft = caseLeft + margin + halfWidth;
        if (Math.abs(newLeft - constrainedLeft) > tolerance) {
          newLeft = constrainedLeft;
          needsUpdate = true;
        }
      }
      // Keep object strictly inside the case bounds (right edge)
      if (objRect.left + objWidth > caseRight - margin) {
        const constrainedLeft = caseRight - margin - halfWidth;
        if (Math.abs(newLeft - constrainedLeft) > tolerance) {
          newLeft = constrainedLeft;
          needsUpdate = true;
        }
      }
      
      // Constrain vertical position (accounting for center origin)
      // Keep object strictly inside the case bounds (top edge)
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
        
        // Use fixed pixel inset for all charms - same size border regardless of charm size
        const isMobile = window.innerWidth < 768;
        const inset = isMobile ? 0 : 0; // Fixed 10px on mobile, 8px on desktop
        
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
      
      if (caseBorderRectRef.current && obj && !obj.isCase && obj !== caseBorderRectRef.current) {
        caseBorderRectRef.current.set('visible', false);
      }
      
      // Hide all limit lines when object movement is complete
      if (topLimitRef.current) topLimitRef.current.set({ visible: false });
      if (rightLimitRef.current) rightLimitRef.current.set({ visible: false });
      if (bottomLimitRef.current) bottomLimitRef.current.set({ visible: false });
      if (leftLimitRef.current) leftLimitRef.current.set({ visible: false });
      setShowInvalidPositionAlert(false);
      
      if (obj && !obj.isCase && obj !== caseBorderRectRef.current) {
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
      if (caseBorderRectRef.current) {
        caseBorderRectRef.current.set('visible', false);
      }
      
      // Hide all limit lines when selection is cleared
      if (topLimitRef.current) topLimitRef.current.set({ visible: false });
      if (rightLimitRef.current) rightLimitRef.current.set({ visible: false });
      if (bottomLimitRef.current) bottomLimitRef.current.set({ visible: false });
      if (leftLimitRef.current) leftLimitRef.current.set({ visible: false });
      setShowInvalidPositionAlert(false);
      
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

    // Window resize handler with debounce
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resizeCanvasToFitScreen();
      }, 150);
    };
    
    window.addEventListener('resize', handleResize);

    // Store refs in variables for cleanup
    const borderRects = borderRectsRef.current;
    const canvas = fabricCanvas.current;
    
    return () => {
      clearTimeout(resizeTimeout);
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
}, [onPinSelect, updateControls, updateBorderRect, removeBorderRect, selectedCaseType, selectedColor, products, createCaseBorder, resizeCanvasToFitScreen]);

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
      
      // On mobile, just show the border without any movement effects
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        // Just update controls position without scrolling
        updateControls(textInstance);
        // Prevent any page movement or scrolling
        document.body.style.overflowX = 'hidden';
        document.body.style.overflowY = 'hidden';
        document.documentElement.style.overflowX = 'hidden';
        document.documentElement.style.overflowY = 'hidden';
        // Ensure canvas container doesn't cause overflow
        const canvasContainer = fabricCanvas.current.getElement().parentElement;
        if (canvasContainer) {
          canvasContainer.style.maxWidth = '100%';
          canvasContainer.style.overflowX = 'hidden';
          canvasContainer.style.overflowY = 'hidden';
        }
        // Prevent any scroll behavior
        window.scrollTo(0, window.scrollY);
      } else {
        updateControls(textInstance);
      }
    },
    [updateControls, updateBorderRect]
  );

  // Update case image URL for background when case type or color changes
  useEffect(() => {
    if (!selectedCaseType || !selectedColor || !products) return;

    const selectedCase = products.cases.find(c => c.type === selectedCaseType);
    if (!selectedCase) return;

    const selectedColorData = selectedCase.colors.find(c => c.color === selectedColor);
    if (!selectedColorData) return;

    // Update background image URL
    setCaseImageUrl(selectedColorData.image);

    // Remove old case objects and case border from canvas
    if (fabricCanvas.current) {
      const objects = fabricCanvas.current.getObjects();
      objects.forEach(obj => {
        if (obj.isCase || obj === caseBorderRectRef.current ||
            obj === topLimitRef.current || obj === rightLimitRef.current ||
            obj === bottomLimitRef.current || obj === leftLimitRef.current) {
          fabricCanvas.current.remove(obj);
        }
      });
      // Clear all border rectangles
      borderRectsRef.current.forEach((borderRect) => {
        fabricCanvas.current.remove(borderRect);
      });
      borderRectsRef.current.clear();
      caseInstanceRef.current = null;
      caseBorderRectRef.current = null;
      topLimitRef.current = null;
      rightLimitRef.current = null;
      bottomLimitRef.current = null;
      leftLimitRef.current = null;

      // Recreate case border after a short delay to ensure container is ready
      setTimeout(() => {
        if (fabricCanvas.current && containerRef.current) {
          createCaseBorder();
        }
      }, 100);
    }

  }, [selectedCaseType, selectedColor, products, createCaseBorder]);

  // Handle pin selection from PinSelector
  const handlePinSelection = useCallback(async (pin) => {
    if (!fabricCanvas.current) return;

    console.log('Adding pin to canvas:', pin.name); // Debug log

    try {
      // Use natural image size by default (pass large values to allow natural sizing)
      // If size multiplier is specified, apply it as a constraint
      const sizeMultiplier = pin.size !== undefined ? pin.size : 1.0;
      
      // If size multiplier is 1.0, use natural size (pass large values)
      // Otherwise, apply the multiplier as a max size constraint
      const maxSize = sizeMultiplier !== 1.0 ? 150 * sizeMultiplier : 9999;
      
      const imgInstance = await loadImage(pin.src, false, maxSize, maxSize);
      
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

    // Temporarily hide case border for export
    const caseBorderVisible = caseBorderRectRef.current ? caseBorderRectRef.current.visible : true;
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

    // Restore case border visibility
    if (caseBorderRectRef.current) {
      caseBorderRectRef.current.visible = caseBorderVisible;
    }
    if (caseBorderRectRef.current) {
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
    
    // Temporarily hide case border for export
    const caseBorderVisible = caseBorderRectRef.current ? caseBorderRectRef.current.visible : true;
    if (caseBorderRectRef.current) {
      caseBorderRectRef.current.visible = false;
    }

    const dataURL = fabricCanvas.current.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 2,
      backgroundColor: 'white'
    });

    // Restore case border visibility
    if (caseBorderRectRef.current) {
      caseBorderRectRef.current.visible = caseBorderVisible;
    }
    if (caseBorderRectRef.current) {
      fabricCanvas.current.renderAll();
    }

    return dataURL;
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  return (
    <div className="flex flex-col items-center justify-center overflow-visible w-[350px] mx-auto" style={{scrollbarWidth: 'none', msOverflowStyle: 'none', overflow: 'visible', touchAction: isMobile ? 'none' : 'auto', marginBottom: isMobile ? '20px' : '0'}}>
      <div 
        ref={containerRef}
        className="happy-card h-[480px] p-2 mt-0 sm:p-6 mb-2 relative flex items-center justify-center w-full overflow-visible  " 
        style={{
         
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none', 
          overflow: 'visible', 
          touchAction: isMobile ? 'none' : 'auto',
          aspectRatio: isMobile ? (window.innerWidth < 375 ? '1/1.1' : '1/1.2') : '1/1',
          zIndex: isMobile ? 10 : 'auto',
          marginBottom: isMobile ? '30px' : '0',
        }}
      >
        {/* Background Image Div */}
        <div
          className="absolute inset-0 w-full h-full flex items-center justify-center mt-6"
          style={{
            backgroundImage: caseImageUrl ? `url(${caseImageUrl})` : 'none',
            backgroundSize: '80%',
            backgroundPosition: 'top',
            backgroundRepeat: 'no-repeat',
            backgroundColor: 'transparent',
          }}
        />
        
        {/* Fabric.js Canvas Overlay */}
        <canvas 
          ref={canvasRef} 
          className="relative z-10 max-w-full w-full bg-black "
          style={{ 
            background: 'transparent',
            maxWidth: '100%',
            width: '100%',
            height: '100%',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            overflow: 'visible',
            touchAction: isMobile ? 'none' : 'auto',
            display: 'block'
          }}
        />
        
        {/* Controls */}
        {showControls && selectedPin && (
          <div 
            className="absolute z-[9999] flex items-center gap-1 bg-white bg-opacity-90 backdrop-blur-sm text-gray-800 rounded px-2 py-1 shadow-md border border-gray-200"
            style={{
              left: `${controlsPosition.x}px`,
              top: `${controlsPosition.y}px`,
              position: 'absolute',
              pointerEvents: 'auto',
              zIndex: 9999
            }}
          >
            <button
              onClick={handleRotateLeft}
              className="w-6 h-6 mr-1 flex items-center justify-center text-gray-800 hover:text-gray-900 rounded transition-colors bg-transparent"
              aria-label="Rotate Left"
              title="Rotate Left"
              style={{ color: '#1f2937' }}
            >
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20" fill="currentColor" style={{ color: '#1f2937' }}><path d="M24 192l144 0c9.7 0 18.5-5.8 22.2-14.8s1.7-19.3-5.2-26.2l-46.7-46.7c75.3-58.6 184.3-53.3 253.5 15.9 75 75 75 196.5 0 271.5s-196.5 75-271.5 0c-10.2-10.2-19-21.3-26.4-33-9.5-14.9-29.3-19.3-44.2-9.8s-19.3 29.3-9.8 44.2C49.7 408.7 61.4 423.5 75 437 175 537 337 537 437 437S537 175 437 75C342.8-19.3 193.3-24.7 92.7 58.8L41 7C34.1 .2 23.8-1.9 14.8 1.8S0 14.3 0 24L0 168c0 13.3 10.7 24 24 24z"/></svg>
            </button>
            <button
              onClick={handleRotateRight}
              className="w-6 h-6 flex items-center justify-center text-gray-800 hover:text-gray-900 rounded transition-colors bg-transparent"
              aria-label="Rotate Right"
              title="Rotate Right"
              style={{ color: '#1f2937' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20" fill="currentColor" style={{ color: '#1f2937' }}><path d="M488 192l-144 0c-9.7 0-18.5-5.8-22.2-14.8s-1.7-19.3 5.2-26.2l46.7-46.7c-75.3-58.6-184.3-53.3-253.5 15.9-75 75-75 196.5 0 271.5s196.5 75 271.5 0c8.2-8.2 15.5-16.9 21.9-26.1 10.1-14.5 30.1-18 44.6-7.9s18 30.1 7.9 44.6c-8.5 12.2-18.2 23.8-29.1 34.7-100 100-262.1 100-362 0S-25 175 75 75c94.3-94.3 243.7-99.6 344.3-16.2L471 7c6.9-6.9 17.2-8.9 26.2-5.2S512 14.3 512 24l0 144c0 13.3-10.7 24-24 24z"/>
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
      
      {/* Invalid Position Alert */}
      {showInvalidPositionAlert && (
        <div className="mt-4 w-full max-w-[450px] mx-auto">
          <div 
            className="px-4 py-3 rounded-md shadow-lg border-2  bg-red-500"
          >
            <p className="text-sm font-semibold text-center text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Position is invalid, out of the edge limit
            </p>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default Canvas;
