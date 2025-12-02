/**
 * Utility functions for canvas operations
 */

/**
 * Calculate canvas dimensions based on container and screen size
 */
export const calculateCanvasSize = (containerWidth) => {
  const isMobile = window.innerWidth < 768;
  const isSmallMobile = window.innerWidth < 375;
  
  let canvasWidth;
  if (isSmallMobile) {
    // Very small screens - use most of container width with minimal padding
    canvasWidth = Math.max(260, Math.min(containerWidth - 24, 320));
  } else if (isMobile) {
    // Regular mobile - responsive sizing
    canvasWidth = Math.max(280, Math.min(containerWidth - 24, 380));
  } else {
    // Desktop
    canvasWidth = Math.min(500, containerWidth);
  }
  const canvasHeight = canvasWidth; // Keep it square
  
  return { canvasWidth, canvasHeight };
};

/**
 * Calculate case boundary insets based on case type
 */
export const getCaseBoundaryInsets = (caseType) => {
  const insetHorizontal = caseType === 'business' ? 14 : 12;
  const insetVertical = caseType === 'business' ? 40 : 30;
  return { insetHorizontal, insetVertical };
};

/**
 * Check if object is near or over boundary
 */
export const isObjectOverBoundary = (objRect, caseRect, caseType) => {
  const { insetHorizontal, insetVertical } = getCaseBoundaryInsets(caseType);
  const caseLeft = caseRect.left + insetHorizontal;
  const caseTop = caseRect.top + insetVertical;
  const caseRight = caseRect.left + caseRect.width - insetHorizontal;
  const caseBottom = caseRect.top + caseRect.height - insetVertical;
  
  const threshold = 2;
  const isNearLeft = objRect.left <= caseLeft + threshold && objRect.left + objRect.width >= caseLeft;
  const isNearRight = objRect.left <= caseRight && objRect.left + objRect.width >= caseRight - threshold;
  const isNearTop = objRect.top <= caseTop + threshold && objRect.top + objRect.height >= caseTop;
  const isNearBottom = objRect.top <= caseBottom && objRect.top + objRect.height >= caseBottom - threshold;
  
  return isNearLeft || isNearRight || isNearTop || isNearBottom;
};

/**
 * Constrain object position within case bounds
 */
export const constrainObjectPosition = (obj, caseRect, caseType) => {
  const { insetHorizontal, insetVertical } = getCaseBoundaryInsets(caseType);
  const margin = 0.5;
  
  const objRect = obj.getBoundingRect(true);
  const objWidth = objRect.width;
  const objHeight = objRect.height;
  const halfWidth = objWidth / 2;
  const halfHeight = objHeight / 2;
  
  const caseLeft = caseRect.left + insetHorizontal + margin;
  const caseTop = caseRect.top + insetVertical + margin;
  const caseRight = caseRect.left + caseRect.width - insetHorizontal - margin;
  const caseBottom = caseRect.top + caseRect.height - insetVertical - margin;
  
  const objLeft = obj.left - halfWidth;
  const objTop = obj.top - halfHeight;
  
  let newLeft = obj.left;
  let newTop = obj.top;
  
  if (objLeft < caseLeft) {
    newLeft = caseLeft + halfWidth;
  } else if (objLeft + objWidth > caseRight) {
    newLeft = caseRight - halfWidth;
  }
  
  if (objTop < caseTop) {
    newTop = caseTop + halfHeight;
  } else if (objTop + objHeight > caseBottom) {
    newTop = caseBottom - halfHeight;
  }
  
  return { newLeft, newTop };
};

