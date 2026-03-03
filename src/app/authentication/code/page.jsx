import { Suspense } from 'react';
import Login from '@/component/LoginPage';
import AirplaneLoading from '@/component/Shared/AirplaneLoading';

export const metadata = {
  title: 'Verify Code',
  description: 'Enter your verification code.',
};

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-white py-12 md:py-16">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <AirplaneLoading size="sm" />
          </div>
          <p className="text-gray-600 font-inter">Loading...</p>
        </div>
      </div>
    </div>
  );
}

export default function AuthenticationCodePage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Login />
    </Suspense>
  );
}
