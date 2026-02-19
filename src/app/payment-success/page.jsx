import { Suspense } from 'react';
import PaymentSuccess from '@/page-components/PaymentSuccess';

export const metadata = {
  title: 'Order Confirmed',
  description: 'Thank you for your order. Your custom passport case is on its way.',
};

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-white py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="mt-4 text-gray-600 font-inter">Loading...</p>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PaymentSuccess />
    </Suspense>
  );
}
