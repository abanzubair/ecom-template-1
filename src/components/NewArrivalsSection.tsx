'use client';

import React from 'react';
import { INITIAL_PRODUCTS } from '@/data/products';
import { ProductCard } from './ProductCard';

export const NewArrivalsSection: React.FC = () => {
  return (
    <section id="designs" className="max-w-7xl mx-auto px-6 md:px-12 py-16">
      {/* Product Card Grid (4 columns on desktop, 2 columns on mobile) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        {INITIAL_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Centered Pill Button: See All */}
      <div className="mt-12 text-center">
        <button className="bg-black hover:bg-neutral-800 text-white font-semibold text-xs px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-sm">
          See All
        </button>
      </div>
    </section>
  );
};
