import { normalizeImagePath } from '../../../utils/imagePath';

/**
 * Get case images array for a selected color and case
 * Returns an array of image URLs including the main color image and detail images
 * @param {Object} selectedColorData - The selected color data object with image property
 * @param {Object} selectedCase - The selected case object with type property
 * @returns {Array<string>} - Array of image URLs
 */
export const getCaseImages = (selectedColorData, selectedCase) => {
  // Get the main color image
  const colorImage = selectedColorData?.image || selectedCase?.images?.[0] || '';
  
  // Build images array
  const caseImages = [];
  
  // Add the main color image first (normalized)
  if (colorImage) {
    caseImages.push(normalizeImagePath(colorImage));
  }
  
  // Add detail images based on case type
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
  
  // Add detail images if they exist (normalized)
  detailImages.forEach(img => {
    if (img) {
      caseImages.push(normalizeImagePath(img));
    }
  });
  
  // Return images array, or at least the color image if available
  return caseImages.length > 0 ? caseImages : (colorImage ? [normalizeImagePath(colorImage)] : []);
};
