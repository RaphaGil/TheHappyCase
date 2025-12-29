/**
 * Get case images including detail images from SmartCase folder
 */
export const getCaseImages = (selectedColorData, selectedCase) => {
  // Get the main color image
  const colorImage = selectedColorData?.image || selectedCase?.images?.[0] || '';
  
  // Build images array from SmartCase folder
  const smartCaseImages = [];
  
  // Add the main color image
  if (colorImage) {
    smartCaseImages.push(colorImage);
  }
  
  // Add detail images from SmartCase folder
  // These are common detail images that apply to all colors
  const detailImages = [
    '/TheHappyCase/images/SmartCase/economycaseinside.jpg',
    '/TheHappyCase/images/SmartCase/economycaseclosure.jpg',
    '/TheHappyCase/images/SmartCase/economycaseclosureinside.jpg'
  ];
  
  // Add detail images if they exist
  detailImages.forEach(img => {
    if (img) {
      smartCaseImages.push(img);
    }
  });
  
  // If we have at least one image, return them; otherwise return empty array
  return smartCaseImages.length > 0 ? smartCaseImages : (colorImage ? [colorImage] : []);
};

