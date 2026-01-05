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
        console.log('⚠️ No case image URL provided, using canvas content only');
        drawCanvasContent();
        return;
      }

      const caseImg = new Image();
      // Only set crossOrigin for external URLs, not for data URLs or same-origin images
      if (!caseImageUrl.startsWith('data:') && !caseImageUrl.startsWith('blob:')) {
        caseImg.crossOrigin = 'anonymous';
      }
      
      // Add timeout to prevent hanging
      const timeout = setTimeout(() => {
        console.error('⏱️ Timeout loading case image:', caseImageUrl);
        drawCanvasContent();
      }, 10000); // 10 second timeout
      
      caseImg.onload = () => {
        clearTimeout(timeout);
        console.log('✅ Case image loaded successfully:', {
          width: caseImg.width,
          height: caseImg.height,
          src: caseImageUrl.substring(0, 50) + '...'
        });
        
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
      caseImg.onerror = (error) => {
        clearTimeout(timeout);
        console.error('❌ Failed to load case image:', {
          url: caseImageUrl,
          error: error,
          message: 'Will continue with canvas content only'
        });
        // Continue with just canvas content
        drawCanvasContent();
      };
      
      console.log('🔄 Loading case image:', caseImageUrl);
      caseImg.src = caseImageUrl;
    };

    // Draw canvas content (charms) on top
    const drawCanvasContent = () => {
      if (!canvasDataURL) {
        // If no canvas content, just resolve with case image (or white canvas if no case)
        console.log('⚠️ No canvas data URL, resolving with case image or white canvas');
        resolve(compositeCanvas.toDataURL('image/png', 1));
        return;
      }

      const canvasImg = new Image();
      
      // Add timeout for canvas image loading
      const timeout = setTimeout(() => {
        console.error('⏱️ Timeout loading canvas content');
        resolve(compositeCanvas.toDataURL('image/png', 1));
      }, 10000);
      
      canvasImg.onload = () => {
        clearTimeout(timeout);
        console.log('✅ Canvas content loaded successfully:', {
          width: canvasImg.width,
          height: canvasImg.height
        });
        
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
        const finalDataURL = compositeCanvas.toDataURL('image/png', 1);
        console.log('🎨 Composite image created:', {
          isDataURL: finalDataURL.startsWith('data:image/'),
          length: finalDataURL.length
        });
        resolve(finalDataURL);
      };
      canvasImg.onerror = (error) => {
        clearTimeout(timeout);
        console.error('❌ Failed to load canvas content:', error);
        // Resolve with just case image if available
        resolve(compositeCanvas.toDataURL('image/png', 1));
      };
      
      console.log('🔄 Loading canvas content...');
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

