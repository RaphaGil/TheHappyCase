import DesignIdeasPageClient from './DesignIdeasPageClient';
import { carouselImages } from '@/data/data';

export const metadata = {
  title: 'Passport Case Design Ideas',
  description: 'Explore 40+ passport case design ideas. Get inspired by our gallery of custom passport holders. Perfect gift for weddings, anniversary, bride, friends, Mother\'s Day, Valentine\'s and more.',
};

export default function DesignIdeasPage() {
  const designImages = carouselImages ?? [];

  return (
    <DesignIdeasPageClient designImages={designImages} />
  );
}
