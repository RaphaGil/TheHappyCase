'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import EmptyCartState from '@/component/Cart/EmptyCartState';
import AirplaneLoading from '@/component/Shared/AirplaneLoading';
import { routes } from '@/utils/routes';

export default function CartPage() {
  const { cart } = useCart();
  const router = useRouter();

  // When cart has items, redirect to checkout
  useEffect(() => {
    if (cart.length > 0) {
      router.replace(routes.checkout);
    }
  }, [cart.length, router]);

  const handleContinueShopping = () => {
    router.push(routes.customPassportHolder);
  };

  if (cart.length > 0) {
    return (
      <div className="min-h-screen bg-white py-12 md:py-16 flex items-center justify-center">
        <div className="text-center">
          <AirplaneLoading size="sm" />
          <p className="text-gray-600 font-inter mt-4">Redirecting to checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 md:py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <EmptyCartState onContinueShopping={handleContinueShopping} />
      </div>
    </div>
  );
}
