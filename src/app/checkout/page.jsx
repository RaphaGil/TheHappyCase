import { Suspense } from 'react';
import Checkout from '@/component/Checkout';
import AirplaneLoading from '@/component/Shared/AirplaneLoading';

export const metadata = {
  title: 'Checkout | The Happy Case',
  description: 'Secure checkout for your custom passport case order at The Happy Case.',
  robots: {
    index: false,
    follow: false,
  },
};

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-white py-12 md:py-16">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <div className="flex justify-center mb-4 pt-6">
            <AirplaneLoading size="sm" />
          </div>
          <p className="text-gray-600 font-inter">Loading checkout...</p>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Checkout />
    </Suspense>
  );
}
