import { Suspense } from 'react';
import CreateYours from '@/page-components/CreateYours';

export const metadata = {
  title: 'Create Your Own Passport Cover',
  description: 'Design and order your custom passport cover easily.',
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

export default function CreateYoursPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <CreateYours />
    </Suspense>
  );
}
