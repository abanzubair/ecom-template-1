'use client';

import React, { useState } from 'react';
import { INITIAL_PRODUCTS } from '@/data/products';
import { ProductCard } from './ProductCard';

export const ProductGridSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'merch' | 'flash'>('all');

  const merchCount = INITIAL_PRODUCTS.filter((p) => p.category === 'merch').length;
  const flashCount = INITIAL_PRODUCTS.filter((p) => p.category === 'flash').length;

  const filteredProducts = INITIAL_PRODUCTS.filter((p) => {
    if (activeCategory === 'merch') return p.category === 'merch';
    if (activeCategory === 'flash') return p.category === 'flash';
    return true;
  });

  return (
    <section id="designs" className="max-w-7xl mx-auto px-6 md:px-12 py-16">
      {/* Category Tab Switcher matching Image 2 */}
      <div className="grid grid-cols-2 bg-neutral-200/60 p-1 mb-12 rounded-sm overflow-hidden max-w-4xl mx-auto border border-neutral-300">
        {/* Tab 001 - Merch */}
        <button
          onClick={() => setActiveCategory(activeCategory === 'merch' ? 'all' : 'merch')}
          className={`py-4 px-6 flex items-center justify-between font-mono text-sm font-semibold transition-colors ${
            activeCategory === 'merch'
              ? 'bg-black text-white shadow-md'
              : 'bg-neutral-200/80 text-neutral-800 hover:bg-neutral-300/80'
          }`}
        >
          <span className="text-neutral-400">001</span>
          <span>Merch ({merchCount})</span>
        </button>

        {/* Tab 002 - Flash Designs */}
        <button
          onClick={() => setActiveCategory(activeCategory === 'flash' ? 'all' : 'flash')}
          className={`py-4 px-6 flex items-center justify-between font-mono text-sm font-semibold transition-colors ${
            activeCategory === 'flash' || activeCategory === 'all'
              ? 'bg-black text-white shadow-md'
              : 'bg-neutral-200/80 text-neutral-800 hover:bg-neutral-300/80'
          }`}
        >
          <span className="text-neutral-400">002</span>
          <span>Flash designs ({flashCount})</span>
        </button>
      </div>

      {/* Grid Header Subtitle */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-200">
        <h2 className="text-xs uppercase font-mono tracking-widest text-neutral-500">
          Showing {filteredProducts.length} Exclusive Studio Artifacts
        </h2>
        <span className="text-xs font-mono text-neutral-400">
          One-Time Use Only • 1-of-1 Stencils
        </span>
      </div>

      {/* Products 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
