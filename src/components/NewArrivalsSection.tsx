'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { ProductCard } from './ProductCard';
import Link from 'next/link';

export const NewArrivalsSection: React.FC = () => {
  const { products, isLoadingProducts } = useApp();

  if (isLoadingProducts) {
    return (
      <section id="designs" className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse space-y-3">
              <div className="bg-neutral-100 rounded-2xl aspect-square w-full" />
              <div className="h-4 bg-neutral-100 rounded w-3/4" />
              <div className="h-3 bg-neutral-100 rounded w-1/3" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section id="designs" className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center max-w-md mx-auto space-y-3 p-8 border border-dashed border-neutral-200 rounded-2xl bg-neutral-50/50">
          <p className="text-sm font-semibold text-neutral-800">No products published yet</p>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Products added from your Weave365 Business Center will appear here with your custom retail markups.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="designs" className="max-w-7xl mx-auto px-6 md:px-12 py-16">
      {/* Product Card Grid (4 columns on desktop, 2 columns on mobile) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        {products.slice(0, 8).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Centered Pill Button: See All */}
      {products.length > 8 && (
        <div className="mt-12 text-center">
          <Link 
            href="/products"
            className="inline-block bg-black hover:bg-neutral-800 text-white font-semibold text-xs px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-sm"
          >
            See All ({products.length})
          </Link>
        </div>
      )}
    </section>
  );
};

