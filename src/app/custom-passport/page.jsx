import { buildMetadata } from '@/lib/seo';
import { Suspense } from 'react';
import CustomPassportHolderPageClient from './CustomPassportHolderPageClient';
import CreateYoursLoading from '@/component/CreateYours/CreateYoursLoading';

export const metadata = buildMetadata({
  title: "Design Your Own Passport Case",
  description: 'Design your own personalised passport case online: pick a case and colour, add colourful, bronze or flag charms and a name. Handmade with love.',
  path: '/custom-passport',
});

export default function CustomPassportHolderPage() {
  return (
    <Suspense fallback={<CreateYoursLoading />}>
      <CustomPassportHolderPageClient />
    </Suspense>
  );
}
