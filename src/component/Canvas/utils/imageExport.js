/**
 * Utility functions for exporting canvas images
 */

/**
 * Export canvas as image data URL
 */
export const exportCanvasAsDataURL = (fabricCanvas, boundaryRectRef, caseBorderRectRef) => {
  if (!fabricCanvas.current) return null;
  
  // Temporarily hide boundary and case border for export
  const boundaryVisible = boundaryRectRef.current ? boundaryRectRef.current.visible : true;
  const caseBorderVisible = caseBorderRectRef.current ? caseBorderRectRef.current.visible : true;
  if (boundaryRectRef.current) {
    boundaryRectRef.current.visible = false;
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

  // Restore boundary and case border visibility
  if (boundaryRectRef.current) {
    boundaryRectRef.current.visible = boundaryVisible;
  }
  if (caseBorderRectRef.current) {
    caseBorderRectRef.current.visible = caseBorderVisible;
  }
  if (boundaryRectRef.current || caseBorderRectRef.current) {
    fabricCanvas.current.renderAll();
  }

  return dataURL;
};

/**
 * Create a composite image combining case background with canvas content (charms)
 * @param {string} caseImageUrl - URL of the case background image
 * @param {string} canvasDataURL - Data URL of the canvas content (charms), can be null if no charms
 * @param {number} width - Width of the output image
 * @param {number} height - Height of the output image
 * @returns {Promise<string>} Data URL of the composite image
 */
export const createCompositeDesignImage = (caseImageUrl, canvasDataURL, width = 300, height = 350) => {
  return new Promise((resolve, reject) => {
    if (!caseImageUrl && !canvasDataURL) {
      resolve(null);
      return;
    }

    // Create a canvas for compositing
    const compositeCanvas = document.createElement('canvas');
    compositeCanvas.width = width;
    compositeCanvas.height = height;
    const ctx = compositeCanvas.getContext('2d');

    // Fill with white background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);

    // Load case image first
    const loadCaseImage = () => {
      if (!caseImageUrl) {
        // If no case image, just draw canvas content
        drawCanvasContent();
        return;
      }

      const caseImg = new Image();
      caseImg.crossOrigin = 'anonymous';
      caseImg.onload = () => {
        // Draw case image as background
        // Match the CSS background positioning: center 45%
        const caseImgAspect = caseImg.width / caseImg.height;
        const canvasAspect = width / height;
        
        let drawWidth, drawHeight, drawX, drawY;
        const targetSize = 270; // Match CSS backgroundSize
        
        if (caseImgAspect > canvasAspect) {
          drawHeight = targetSize;
          drawWidth = drawHeight * caseImgAspect;
        } else {
          drawWidth = targetSize;
          drawHeight = drawWidth / caseImgAspect;
        }
        
        drawX = (width - drawWidth) / 2;
        drawY = height * 0.45 - drawHeight / 2; // Match CSS backgroundPosition: center 45%
        
        ctx.drawImage(caseImg, drawX, drawY, drawWidth, drawHeight);
        
        // Then draw canvas content on top (if available)
        drawCanvasContent();
      };
      caseImg.onerror = () => {
        console.error('Failed to load case image:', caseImageUrl);
        // Continue with just canvas content
        drawCanvasContent();
      };
      caseImg.src = caseImageUrl;
    };

    // Draw canvas content (charms) on top
    const drawCanvasContent = () => {
      if (!canvasDataURL) {
        // If no canvas content, just resolve with case image (or white canvas if no case)
        resolve(compositeCanvas.toDataURL('image/png', 1));
        return;
      }

      const canvasImg = new Image();
      canvasImg.onload = () => {
        // Draw canvas content centered, matching the canvas overlay positioning
        const canvasImgAspect = canvasImg.width / canvasImg.height;
        const containerAspect = width / height;
        
        let drawWidth, drawHeight, drawX, drawY;
        
        if (canvasImgAspect > containerAspect) {
          drawWidth = width;
          drawHeight = width / canvasImgAspect;
        } else {
          drawHeight = height;
          drawWidth = height * canvasImgAspect;
        }
        
        drawX = (width - drawWidth) / 2;
        drawY = (height - drawHeight) / 2;
        
        ctx.drawImage(canvasImg, drawX, drawY, drawWidth, drawHeight);
        
        // Export composite image
        resolve(compositeCanvas.toDataURL('image/png', 1));
      };
      canvasImg.onerror = () => {
        console.error('Failed to load canvas content');
        // Resolve with just case image if available
        resolve(compositeCanvas.toDataURL('image/png', 1));
      };
      canvasImg.src = canvasDataURL;
    };

    // Start loading
    loadCaseImage();
  });
};

/**
 * Download canvas as image file
 */
export const downloadCanvasImage = (fabricCanvas, boundaryRectRef, caseBorderRectRef) => {
  const dataURL = exportCanvasAsDataURL(fabricCanvas, boundaryRectRef, caseBorderRectRef);
  if (!dataURL) return;

  // Create download link
  const link = document.createElement('a');
  link.download = `passport-case-design-${Date.now()}.png`;
  link.href = dataURL;
  
  // Trigger download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

