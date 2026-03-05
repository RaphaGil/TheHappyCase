import DesignIdeasPageClient from './DesignIdeasPageClient';
import { carouselImages } from '@/data/data';
import Products from '@/data/products.json';

export const metadata = {
  title: 'Passport Case Design Ideas',
  description: 'Explore 40+ passport case design ideas. Get inspired by our gallery of custom passport holders. Perfect gift for weddings, anniversary, bride, friends, Mother\'s Day, Valentine\'s and more.',
};

// Collect all unique case images from products
function getAllCaseImages() {
  const cases = Products?.cases ?? [];
  const seen = new Set();
  const images = [];
  const CASE_TYPE_TO_PATH = {
    economy: 'economy',
    business: 'business-class',
    firstclass: 'first-class',
  };
  cases.forEach((caseItem) => {
    const casePath = `/passport-cases/${CASE_TYPE_TO_PATH[caseItem.type] || caseItem.type}`;
    const colors = caseItem.colors ?? [];
    colors.forEach((c) => {
      const img = c?.image;
      if (img && !seen.has(img)) {
        seen.add(img);
        images.push({ src: img, caseType: caseItem.type, casePath });
      }
    });
  });
  return images;
}

export default function DesignIdeasPage() {
  const designImages = carouselImages ?? [];
  const caseImages = getAllCaseImages();

  return (
    <DesignIdeasPageClient
      designImages={designImages}
      caseImages={caseImages}
    />
  );
}
