/**
 * Utility functions for exporting canvas images
 */

export const CREATE_YOURS_PREVIEW_ID = 'create-yours-preview';

const hideTransientCanvasUi = (fabricCanvas, boundaryRectRef, caseBorderRectRef, borderRectsRef) => {
  const hidden = { borderRects: [], boundaryVisible: true, caseBorderVisible: true };

  if (borderRectsRef?.current) {
    borderRectsRef.current.forEach((borderRect) => {
      if (borderRect.visible !== false) {
        hidden.borderRects.push(borderRect);
        borderRect.visible = false;
      }
    });
  }

  if (boundaryRectRef?.current) {
    hidden.boundaryVisible = boundaryRectRef.current.visible;
    boundaryRectRef.current.visible = false;
  }
  if (caseBorderRectRef?.current) {
    hidden.caseBorderVisible = caseBorderRectRef.current.visible;
    caseBorderRectRef.current.visible = false;
  }

  if (fabricCanvas?.current) {
    fabricCanvas.current.discardActiveObject();
    fabricCanvas.current.requestRenderAll();
  }

  return hidden;
};

const restoreTransientCanvasUi = (fabricCanvas, boundaryRectRef, caseBorderRectRef, hidden) => {
  hidden.borderRects.forEach((borderRect) => {
    borderRect.visible = true;
  });

  if (boundaryRectRef?.current) {
    boundaryRectRef.current.visible = hidden.boundaryVisible;
  }
  if (caseBorderRectRef?.current) {
    caseBorderRectRef.current.visible = hidden.caseBorderVisible;
  }

  if (fabricCanvas?.current && hidden.borderRects.length > 0) {
    fabricCanvas.current.requestRenderAll();
  }
};

const waitForPaint = () =>
  new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  });

/**
 * Capture the live Create Yours preview exactly as rendered in the browser.
 */
export const captureDesignPreview = async ({
  previewElementId = CREATE_YOURS_PREVIEW_ID,
  fabricCanvas,
  boundaryRectRef,
  caseBorderRectRef,
  borderRectsRef,
}) => {
  const previewEl = document.getElementById(previewElementId);
  if (!previewEl || !fabricCanvas?.current) return null;

  const hiddenUi = hideTransientCanvasUi(
    fabricCanvas,
    boundaryRectRef,
    caseBorderRectRef,
    borderRectsRef
  );
  await waitForPaint();

  const width = previewEl.clientWidth;
  const height = previewEl.clientHeight;
  if (!width || !height) {
    restoreTransientCanvasUi(fabricCanvas, boundaryRectRef, caseBorderRectRef, hiddenUi);
    return null;
  }

  const scale = 2;
  const output = document.createElement('canvas');
  output.width = Math.round(width * scale);
  output.height = Math.round(height * scale);
  const ctx = output.getContext('2d');
  ctx.scale(scale, scale);

  const containerRect = previewEl.getBoundingClientRect();

  const caseImg =
    previewEl.querySelector('img[aria-hidden="true"]') || previewEl.querySelector('img');
  if (caseImg?.complete && caseImg.naturalWidth > 0) {
    try {
      const imgRect = caseImg.getBoundingClientRect();
      ctx.drawImage(
        caseImg,
        imgRect.left - containerRect.left,
        imgRect.top - containerRect.top,
        imgRect.width,
        imgRect.height
      );
    } catch (error) {
      console.warn('Could not draw case image from preview DOM:', error);
    }
  }

  const fabricEl = fabricCanvas.current.getElement?.() || fabricCanvas.current.lowerCanvasEl;
  if (fabricEl) {
    try {
      const fabricRect = fabricEl.getBoundingClientRect();
      ctx.drawImage(
        fabricEl,
        fabricRect.left - containerRect.left,
        fabricRect.top - containerRect.top,
        fabricRect.width,
        fabricRect.height
      );
    } catch (error) {
      console.warn('Could not draw fabric canvas from preview DOM:', error);
    }
  }

  restoreTransientCanvasUi(fabricCanvas, boundaryRectRef, caseBorderRectRef, hiddenUi);

  try {
    const dataURL = output.toDataURL('image/png', 1);
    return dataURL.startsWith('data:image/') ? dataURL : null;
  } catch (error) {
    console.warn('Preview capture failed (canvas may be tainted):', error);
    return null;
  }
};

/**
 * Compute draw rect matching CSS object-contain + object-position
 */
export const computeObjectContainDrawRect = (
  imgWidth,
  imgHeight,
  containerWidth,
  containerHeight,
  objectPositionY = 0.45
) => {
  const scale = Math.min(containerWidth / imgWidth, containerHeight / imgHeight);
  const drawWidth = imgWidth * scale;
  const drawHeight = imgHeight * scale;
  const drawX = (containerWidth - drawWidth) / 2;
  const drawY = containerHeight * objectPositionY - drawHeight / 2;
  return { drawX, drawY, drawWidth, drawHeight };
};

/**
 * Export canvas as image data URL
 */
export const exportCanvasAsDataURL = (
  fabricCanvas,
  boundaryRectRef,
  caseBorderRectRef,
  borderRectsRef
) => {
  if (!fabricCanvas.current) return null;

  const hiddenBorderRects = [];
  if (borderRectsRef?.current) {
    borderRectsRef.current.forEach((borderRect) => {
      if (borderRect.visible !== false) {
        hiddenBorderRects.push(borderRect);
        borderRect.visible = false;
      }
    });
  }
  
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
  });

  hiddenBorderRects.forEach((borderRect) => {
    borderRect.visible = true;
  });

  // Restore boundary and case border visibility
  if (boundaryRectRef.current) {
    boundaryRectRef.current.visible = boundaryVisible;
  }
  if (caseBorderRectRef.current) {
    caseBorderRectRef.current.visible = caseBorderVisible;
  }
  if (hiddenBorderRects.length > 0 || boundaryRectRef.current || caseBorderRectRef.current) {
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
export const createCompositeDesignImage = (
  caseImageUrl,
  canvasDataURL,
  width = 270,
  height = 350,
  objectPositionY = 0.45
) => {
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
        
        // Draw case image as background (match CSS object-contain + object-position)
        const { drawX, drawY, drawWidth, drawHeight } = computeObjectContainDrawRect(
          caseImg.width,
          caseImg.height,
          width,
          height,
          objectPositionY
        );
        
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
        
        // Draw pins layer full-bleed — canvas overlay fills the designer container
        ctx.drawImage(canvasImg, 0, 0, width, height);
        
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
export const downloadCanvasImage = (fabricCanvas, boundaryRectRef, caseBorderRectRef, borderRectsRef) => {
  const dataURL = exportCanvasAsDataURL(fabricCanvas, boundaryRectRef, caseBorderRectRef, borderRectsRef);
  if (!dataURL) return;

  // Create download link
  const link = document.createElement('a');
  link.download = `passport-case-design-${Date.now()}.webp`;
  link.href = dataURL;
  
  // Trigger download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

