import Hero from '@/component/Hero';
import WhatWeDo from '@/component/WhatWeDo';

export const metadata = {
  title: 'The Happy Case - Custom Passport Cases with Charms',
  description: 'Create custom passport cases with charms. Choose from 3 case styles, 40+ design ideas, and bronze, colorful or flag pins. Perfect travel gift, mothers day gift, valentines day gift, birthday gift, anniversary gift, graduation gift, wedding gift, etc.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatWeDo />
    </>
  );
}
