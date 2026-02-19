import Hero from '@/component/Hero';
import WhatWeDo from '@/component/WhatWeDo';

export const metadata = {
  title: 'The Happy Case - Custom Passport Cases with Personalized Charms',
  description: 'Create custom passport cases with personalized charms. Choose from 3 case styles, 40+ design ideas, and bronze or colorful pins. Perfect travel gift.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatWeDo />
    </>
  );
}
