'use client';

import { useCallback } from 'react';
import * as fabric from 'fabric';

/**
 * Hook for managing border rectangles around selected objects
 */
export const useCanvasBorders = (fabricCanvas, caseInstanceRef, boundaryRectRef, caseBorderRectRef, borderRectsRef) => {
  
  const updateBorderRect = useCallback((obj) => {
    if (!obj || !fabricCanvas.current || obj.isCase) return;
    
    // Remove existing border if any
    const existingBorder = borderRectsRef.current.get(obj);
    if (existingBorder) {
      fabricCanvas.current.remove(existingBorder);
      borderRectsRef.current.delete(obj);
    }
    
    // Get the exact bounding rectangle of the object
    const boundingRect = obj.getBoundingRect(true);
    
    // Create border rectangle matching the exact image size (no inset)
    const borderRect = new fabric.Rect({
      left: boundingRect.left,
      top: boundingRect.top,
      width: boundingRect.width,
      height: boundingRect.height,
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
    const caseInstance = caseInstanceRef.current;
    if (caseInstance) {
      fabricCanvas.current.sendObjectToBack(caseInstance);
    }
    if (boundaryRectRef.current) {
      fabricCanvas.current.sendObjectToBack(boundaryRectRef.current);
    }
    if (caseBorderRectRef.current) {
      fabricCanvas.current.sendObjectToBack(caseBorderRectRef.current);
    }
    // Bring the selected object to front so border appears below it
    fabricCanvas.current.bringObjectToFront(obj);
    
    fabricCanvas.current.renderAll();
  }, [fabricCanvas, caseInstanceRef, boundaryRectRef, caseBorderRectRef, borderRectsRef]);

  const removeBorderRect = useCallback((obj) => {
    if (!obj || !fabricCanvas.current) return;
    const borderRect = borderRectsRef.current.get(obj);
    if (borderRect) {
      fabricCanvas.current.remove(borderRect);
      borderRectsRef.current.delete(obj);
      fabricCanvas.current.renderAll();
    }
  }, [fabricCanvas, borderRectsRef]);

  return { updateBorderRect, removeBorderRect };
};

