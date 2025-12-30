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
  
  // Add detail images based on case type
  // These are common detail images that apply to all colors
  let detailImages = [];
  
  if (selectedCase?.type === 'economy') {
    detailImages = [
      '/TheHappyCase/images/SmartCase/economycaseinside.jpg',
      '/TheHappyCase/images/SmartCase/economycaseclosure.jpg',
      '/TheHappyCase/images/SmartCase/economycaseclosureinside.jpg'
    ];
  } else if (selectedCase?.type === 'business') {
    detailImages = [
      '/TheHappyCase/images/BusinessClassCase/businessclass.png',
      '/TheHappyCase/images/BusinessClassCase/businessclass1.png'
    ];
  } else if (selectedCase?.type === 'firstclass') {
    detailImages = [
      '/TheHappyCase/images/FirstClassCase/firstclass.jpg',
      '/TheHappyCase/images/FirstClassCase/firstclass1.png',
      '/TheHappyCase/images/FirstClassCase/firstclass2.png'
    ];
  }
  
  // Add detail images if they exist
  detailImages.forEach(img => {
    if (img) {
      smartCaseImages.push(img);
    }
  });
  
  // If we have at least one image, return them; otherwise return empty array
  return smartCaseImages.length > 0 ? smartCaseImages : (colorImage ? [colorImage] : []);
};





