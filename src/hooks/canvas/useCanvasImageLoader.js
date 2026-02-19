'use client';

import { useCallback } from 'react';
import * as fabric from 'fabric';

/**
 * Hook for loading images onto the canvas
 */
export const useCanvasImageLoader = (fabricCanvas, caseInstanceRef, boundaryRectRef, caseBorderRectRef, selectedCaseType) => {
  
  const loadImage = useCallback((src, isCase = false, pinWidth = 85, pinHeight = 85) => {
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
          fabricCanvas.current.sendObjectToBack(imgInstance);
          
          // Create red boundary rectangle after case is loaded
          setTimeout(() => {
            if (boundaryRectRef.current) {
              fabricCanvas.current.remove(boundaryRectRef.current);
            }
            
            // Remove existing case border if any
            if (caseBorderRectRef.current) {
              fabricCanvas.current.remove(caseBorderRectRef.current);
            }
            
            const caseRect = imgInstance.getBoundingRect();
            const insetHorizontal = selectedCaseType === 'business' ? 14 : 12;
            const insetVertical = selectedCaseType === 'business' ? 40 : 30;
            
            // Create red boundary rectangle
            const boundaryRect = new fabric.Rect({
              left: caseRect.left + insetHorizontal,
              top: caseRect.top + insetVertical,
              width: caseRect.width - (insetHorizontal * 2),
              height: caseRect.height - (insetVertical * 2),
              originX: 'left',
              originY: 'top',
              fill: 'transparent',
              stroke: '#ef4444',
              strokeWidth: 1,
              selectable: false,
              evented: false,
              visible: false,
              excludeFromExport: true,
            });
            
            boundaryRectRef.current = boundaryRect;
            fabricCanvas.current.add(boundaryRect);
            fabricCanvas.current.sendObjectToBack(boundaryRect);
            
            // Don't create case border rectangle - user doesn't want to see border when selecting case
            caseBorderRectRef.current = null;
            
            fabricCanvas.current.renderAll();
          }, 100);
        }
  
        resolve(imgInstance);
      };
  
      imgElement.onerror = reject;
    });
  }, [fabricCanvas, caseInstanceRef, boundaryRectRef, caseBorderRectRef, selectedCaseType]);

  return { loadImage };
};

