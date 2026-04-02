import { Suspense } from 'react';
import PaymentSuccess from '@/component/Payment-Sucess';
import AirplaneLoading from '@/component/Shared/AirplaneLoading';

export const metadata = {
  title: 'Payment Successful | The Happy Case',
  description: 'Order confirmation and next steps for your The Happy Case purchase.',
  robots: {
    index: false,
    follow: false,
  },
};

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 md:py-16 flex items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <AirplaneLoading size="sm" />
        </div>
        <p className="text-gray-600 font-inter">Loading...</p>
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
