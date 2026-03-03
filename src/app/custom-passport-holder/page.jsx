import { Suspense } from 'react';
import CreateYours from '../CreateYours/CreateYoursPage';
import AirplaneLoading from '@/component/Shared/AirplaneLoading';

export const metadata = {
  title: 'Custom Passport Holder | Design Your Own | The Happy Case',
  description: 'Design your custom passport holder online. Choose from Economy, First Class, or Business Class styles. Add personalized charms, flags, and text. Create a unique passport case that reflects your travel style.',
};

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <AirplaneLoading size="sm" />
        </div>
        <p className="text-gray-600 font-inter">Loading...</p>
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
