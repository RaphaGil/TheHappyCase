import { buildMetadata } from '@/lib/seo';
export const metadata = buildMetadata({
  title: "Personalised Passport Cases with Charms | The Happy Case",
  description: 'Design a personalised passport case with charms and your name. Colourful, bronze and flag charms, RFID protection and UK delivery. The perfect travel gift.',
  path: '/',
  absoluteTitle: true,
});

import Hero from '@/component/Hero';
import dynamic from 'next/dynamic';

const WhatWeDoLazy = dynamic(() => import('@/component/WhatWeDo'), {
  ssr: true,
  loading: () => null,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatWeDoLazy />
    </>
  );
}
