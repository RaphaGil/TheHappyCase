import { buildMetadata } from '@/lib/seo';
import DesignIdeasPageClient from './DesignIdeasPageClient';
import { carouselImages } from '@/data/data';

export const metadata = buildMetadata({
  title: "Passport Case Design Ideas & Gift Inspiration",
  description: 'Get inspired by personalised passport cases our customers designed. Ideas for birthdays, weddings, honeymoons, graduations and every traveller.',
  path: '/design-ideas',
});

export default function DesignIdeasPage() {
  const designImages = carouselImages ?? [];

  return (
    <DesignIdeasPageClient designImages={designImages} />
  );
}
