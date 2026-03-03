import DesignIdeasGrid from '@/component/WhatWeDo/components/DesignIdeasGrid';
import { designIdeasImages } from '@/data/data';

export const metadata = {
  title: 'Passport Case Design Ideas',
  description: 'Explore 40+ passport case design ideas. Get inspired by our gallery of custom passport holders with charms and personalisation.',
};

export default function DesignIdeasPage() {
  return (
    <div className="min-h-screen bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-title text-gray-900 tracking-title mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Design Ideas
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto font-inter">
            Get inspired by our gallery of custom passport holders. Create your own unique design.
          </p>
        </div>
        <DesignIdeasGrid images={designIdeasImages} />
      </div>
    </div>
  );
}
