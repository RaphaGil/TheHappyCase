import { Suspense } from 'react';
import CustomPassportHolderPageClient from './CustomPassportHolderPageClient';
import CreateYoursLoading from '@/component/CreateYours/CreateYoursLoading';

export const metadata = {
  title: 'Custom Passport Holder | Design Your Own | The Happy Case',
  description: 'Design your custom passport holder online. Choose from Economy, First Class, or Business Class styles. Add personalized charms, flags, and text. Create a unique passport case that reflects your travel style.',
};

export default function CustomPassportHolderPage() {
  return (
    <Suspense fallback={<CreateYoursLoading />}>
      <CustomPassportHolderPageClient />
    </Suspense>
  );
}
