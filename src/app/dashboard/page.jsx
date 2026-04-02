import { Suspense } from 'react';
import Dashboard from '@/component/Dashboard/DashboardPage';
import AirplaneLoading from '@/component/Shared/AirplaneLoading';

export const metadata = {
  title: 'Dashboard | The Happy Case',
  description: 'Admin dashboard for The Happy Case. Manage inventory and orders.',
  robots: {
    index: false,
    follow: false,
  },
};

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <AirplaneLoading size="sm" />
        </div>
        <p className="text-gray-600 font-inter">Loading dashboard...</p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Dashboard />
    </Suspense>
  );
}
