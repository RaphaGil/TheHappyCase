import { useEffect } from 'react';
import { isObjectOverBoundary, constrainObjectPosition } from '../utils/canvasUtils';

/**
 * Hook for setting up canvas event handlers
 */
export const useCanvasEvents = ({
  fabricCanvas,
  selectedCaseType,
  boundaryRectRef,
  caseBorderRectRef,
  borderRectsRef,
  updateBorderRect,
  removeBorderRect,
  updateControls,
  setSelectedPin,
  setShowControls,
  onPinSelect
}) => {
  
  useEffect(() => {
    if (!fabricCanvas.current) return;

    const canvas = fabricCanvas.current;

    // Object moving constraints
    const handleObjectMoving = (e) => {
      const obj = e.target;
      if (!obj || !obj.getBoundingRect || obj.isCase || obj === boundaryRectRef.current || obj === caseBorderRectRef.current) return;
      
      const caseInstance = fabricCanvas.current.getObjects().find(o => o.isCase);
      if (!caseInstance) return;
      
      const caseRect = caseInstance.getBoundingRect();
      const objRect = obj.getBoundingRect(true);
      
      // Check if object is over boundary
      const isOverBoundary = isObjectOverBoundary(objRect, caseRect, selectedCaseType);
      
      if (boundaryRectRef.current) {
        boundaryRectRef.current.set('visible', isOverBoundary);
      }
      if (caseBorderRectRef.current) {
        caseBorderRectRef.current.set('visible', false);
      }
      if (isOverBoundary) {
        fabricCanvas.current.renderAll();
      }
      
      // Constrain object position
      const { newLeft, newTop } = constrainObjectPosition(obj, caseRect, selectedCaseType);
      if (newLeft !== obj.left || newTop !== obj.top) {
        obj.set({ left: newLeft, top: newTop });
        obj.setCoords();
      }
      
      // Update border rectangle during movement
      const borderRect = borderRectsRef.current.get(obj);
      if (borderRect) {
        const boundingRect = obj.getBoundingRect(true);
        borderRect.set({
          left: boundingRect.left,
          top: boundingRect.top,
          width: boundingRect.width,
          height: boundingRect.height,
        });
        borderRect.setCoords();
        fabricCanvas.current.bringObjectToFront(obj);
      }
      
      // Update controls position during movement
      const activeObj = fabricCanvas.current.getActiveObject();
      if (activeObj === obj) {
        updateControls(obj, fabricCanvas);
      }
    };

    // Object modified handler
    const handleObjectModified = (e) => {
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
        const isActive = fabricCanvas.current.getActiveObject() === obj;
        
        // Lock text scaling
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
          updateControls(obj, fabricCanvas);
        }
      }
    };

    // Selection created handler
    const handleSelectionCreated = (e) => {
      const obj = e.selected[0];
      if (obj && !obj.isCase) {
        // Remove border from all other objects
        borderRectsRef.current.forEach((borderRect, existingObj) => {
          if (existingObj !== obj) {
            fabricCanvas.current.remove(borderRect);
            borderRectsRef.current.delete(existingObj);
          }
        });
        
        // Lock text scaling
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
        
        updateBorderRect(obj);
        setSelectedPin(obj);
        setShowControls(true);
        updateControls(obj, fabricCanvas);
        fabricCanvas.current.renderAll();
      }
    };

    // Selection updated handler
    const handleSelectionUpdated = (e) => {
      const obj = e.selected[0];
      if (obj && !obj.isCase) {
        // Remove border from all other objects
        borderRectsRef.current.forEach((borderRect, existingObj) => {
          if (existingObj !== obj) {
            fabricCanvas.current.remove(borderRect);
            borderRectsRef.current.delete(existingObj);
          }
        });
        
        // Lock text scaling
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
        
        updateBorderRect(obj);
        setSelectedPin(obj);
        setShowControls(true);
        updateControls(obj, fabricCanvas);
        fabricCanvas.current.renderAll();
      }
    };

    // Object scaling handler
    const handleObjectScaling = (e) => {
      const obj = e.target;
      if (obj && (obj.type === 'textbox' || obj.type === 'text' || obj.type === 'i-text')) {
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
    };

    // Selection cleared handler
    const handleSelectionCleared = () => {
      if (boundaryRectRef.current) {
        boundaryRectRef.current.set('visible', false);
      }
      if (caseBorderRectRef.current) {
        caseBorderRectRef.current.set('visible', false);
      }
      borderRectsRef.current.forEach((borderRect) => {
        fabricCanvas.current.remove(borderRect);
      });
      borderRectsRef.current.clear();
      fabricCanvas.current.renderAll();
      setSelectedPin(null);
      setShowControls(false);
      onPinSelect && onPinSelect(null);
    };

    // Register event handlers
    canvas.on('object:moving', handleObjectMoving);
    canvas.on('object:modified', handleObjectModified);
    canvas.on('selection:created', handleSelectionCreated);
    canvas.on('selection:updated', handleSelectionUpdated);
    canvas.on('object:scaling', handleObjectScaling);
    canvas.on('selection:cleared', handleSelectionCleared);

    // Cleanup
    return () => {
      canvas.off('object:moving', handleObjectMoving);
      canvas.off('object:modified', handleObjectModified);
      canvas.off('selection:created', handleSelectionCreated);
      canvas.off('selection:updated', handleSelectionUpdated);
      canvas.off('object:scaling', handleObjectScaling);
      canvas.off('selection:cleared', handleSelectionCleared);
    };
  }, [
    fabricCanvas,
    selectedCaseType,
    boundaryRectRef,
    caseBorderRectRef,
    borderRectsRef,
    updateBorderRect,
    removeBorderRect,
    updateControls,
    setSelectedPin,
    setShowControls,
    onPinSelect
  ]);
};

