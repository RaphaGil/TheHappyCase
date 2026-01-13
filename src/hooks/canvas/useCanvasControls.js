import { useCallback, useState } from 'react';

/**
 * Hook for managing canvas controls position and visibility
 */
export const useCanvasControls = () => {
  const [controlsPosition, setControlsPosition] = useState({ x: 0, y: 0 });
  const [showControls, setShowControls] = useState(false);

  const updateControls = useCallback((obj, fabricCanvas) => {
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
    
    // Calculate desired position (just below the charm)
    const desiredX = canvasOffsetX + rect.left + rect.width / 2;
    const desiredY = canvasOffsetY + rect.top + rect.height + 14; // below the charm
    
    // Clamp within container bounds
    const controlWidth = 70;
    const controlHeight = 32;
    const clampedX = Math.max(6, Math.min(desiredX - controlWidth / 2, containerRect.width - controlWidth - 6));
    const clampedY = Math.max(6, Math.min(desiredY, containerRect.height - controlHeight - 6));
    
    setControlsPosition({ x: clampedX, y: clampedY });
  }, []);

  return {
    controlsPosition,
    showControls,
    setShowControls,
    updateControls
  };
};

