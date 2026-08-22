import React from 'react';
import { FinalProductsSection } from '@/components/FinalProductsSection';

export const metadata = {
  title: 'Curated Catalog — Pure Handloom Silks & Textiles',
  description: 'Explore our full boutique catalog of authentic handloom silk sarees, zari brocades, and designer textiles direct from master artisan looms.',
};

export default function ProductsPage() {
  return (
    <div className="w-full bg-white min-h-screen">
      <FinalProductsSection />
    </div>
  );
}
