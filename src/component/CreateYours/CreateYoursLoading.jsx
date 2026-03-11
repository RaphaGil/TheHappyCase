'use client';

import React from 'react';
import AirplaneLoading from '@/component/Shared/AirplaneLoading';

/**
 * Full-page loading state for the Create Yours page.
 * Skeleton layout matches the actual page (header, canvas area, options) for a smooth transition.
 */
export default function CreateYoursLoading() {
  return (
    <div className="min-h-screen bg-white flex flex-col overflow-hidden">
      {/* Header skeleton - matches CreateYoursHeader */}
      <div className="flex-shrink-0 pt-4 pb-2 px-4 text-center">
        <div className="h-8 w-48 bg-gray-100 rounded mx-auto animate-pulse" aria-hidden />
        <div className="h-px w-20 bg-gray-100 mx-auto mt-4 mb-2" aria-hidden />
        <div className="h-4 w-72 max-w-full bg-gray-50 rounded mx-auto hidden md:block" aria-hidden />
      </div>

      {/* Main content skeleton: canvas (left) + options (right) */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0 gap-4 md:gap-6 px-4 md:px-6 max-w-7xl w-full mx-auto">
        {/* Canvas area - left side */}
        <div className="flex flex-1 justify-center items-center min-h-[280px] md:min-h-0 md:flex-none md:w-1/2">
          <div className="relative flex flex-col items-center justify-center w-full max-w-md">
            <div className="aspect-[3/4] w-full max-w-[280px] bg-gray-100 rounded-xl animate-pulse flex items-center justify-center">
              <AirplaneLoading size="lg" />
            </div>
            <p className="mt-4 text-sm text-gray-500 font-inter animate-pulse">
              Preparing your design studio...
            </p>
          </div>
        </div>

        {/* Options sidebar skeleton - right side (desktop) */}
        <div className="hidden md:flex flex-col md:w-1/2 md:flex-none md:pl-6 md:border-l md:border-gray-100 space-y-6">
          <div className="h-10 w-3/4 bg-gray-100 rounded animate-pulse" aria-hidden />
          <div className="h-24 w-full bg-gray-50 rounded animate-pulse" aria-hidden />
          <div className="h-10 w-1/2 bg-gray-100 rounded animate-pulse" aria-hidden />
          <div className="h-20 w-full bg-gray-50 rounded animate-pulse" aria-hidden />
          <div className="flex-1 min-h-[120px]" />
          <div className="h-14 w-full bg-gray-100 rounded-lg animate-pulse flex-shrink-0" aria-hidden />
        </div>
      </div>

      {/* Mobile: bottom bar skeleton */}
      <div className="md:hidden flex-shrink-0 border-t border-gray-100 px-4 py-3 flex gap-2">
        <div className="h-12 flex-1 bg-gray-100 rounded animate-pulse" aria-hidden />
        <div className="h-12 flex-1 bg-gray-100 rounded animate-pulse" aria-hidden />
      </div>
    </div>
  );
}
