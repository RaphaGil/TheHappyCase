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

