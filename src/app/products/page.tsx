import React from 'react';
import { FinalProductsSection } from '@/components/FinalProductsSection';

export const metadata = {
  title: 'Our Products — VRTX Design Studio x DHARAA',
  description: 'Explore our full catalog of biotechnological food supplements, food products, and premium cosmetics. Optimally selected formulations for every lifestyle.',
};

export default function ProductsPage() {
  return (
    <div className="w-full bg-white min-h-screen">
      <FinalProductsSection />
    </div>
  );
}
