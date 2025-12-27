import { useEffect } from 'react';
import Products from '../../../data/products.json';
import { getDefaultCaseAndColor } from '../utils/createYoursHelpers';

/**
 * Hook to handle URL params for case and color selection
 */
export const useURLParams = (searchParams, setSelectedCaseType, setSelectedColor, setSelectedCaseImage, selectedCategory) => {
  // Initialize from URL params
  useEffect(() => {
    const defaultValues = getDefaultCaseAndColor(searchParams);
    setSelectedCaseType(defaultValues.caseType);
    setSelectedColor(defaultValues.color);
    setSelectedCaseImage(defaultValues.image);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  // Update when URL params change
  useEffect(() => {
    const caseParam = searchParams.get('case');
    const colorParam = searchParams.get('color');
    
    if (caseParam) {
      const caseFromParam = Products.cases.find(c => c.type === caseParam);
      if (caseFromParam) {
        setSelectedCaseType(caseFromParam.type);
        
        if (colorParam) {
          const colorData = caseFromParam.colors.find(c => c.color === colorParam);
          if (colorData) {
            setSelectedColor(colorData.color);
            setSelectedCaseImage(colorData.image);
            return;
          }
        }
        
        if (caseFromParam.colors && caseFromParam.colors.length > 0) {
          const firstColor = caseFromParam.colors[0];
          setSelectedColor(firstColor.color);
          setSelectedCaseImage(firstColor.image);
        }
      }
    }
  }, [searchParams, setSelectedCaseType, setSelectedColor, setSelectedCaseImage]);
};

