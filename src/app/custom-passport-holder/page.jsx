import { Suspense } from 'react';
import CreateYours from '../CreateYours/CreateYoursPage';

export const metadata = {
  title: 'Custom Passport Holder | Design Your Own | The Happy Case',
  description: 'Design your custom passport holder online. Choose from Economy, First Class, or Business Class styles. Add personalized charms, flags, and text. Create a unique passport case that reflects your travel style.',
};

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <p className="mt-4 text-gray-600 font-inter">Loading...</p>
      </div>
    </div>
  );
}

export default function CustomPassportHolderPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <CreateYours />
    </Suspense>
  );
}
