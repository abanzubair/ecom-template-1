'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ProductCard } from './ProductCard';

export const ProductGridSection: React.FC = () => {
  const { products, isLoadingProducts } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = Array.from(new Set(products.map(p => p.fabric || p.category))).filter(Boolean);

  const filteredProducts = products.filter((p) => {
    if (activeCategory === 'all') return true;
    return (p.fabric === activeCategory || p.category === activeCategory);
  });

  if (products.length === 0 && !isLoadingProducts) {
    return null;
  }

  return (
    <section id="designs" className="max-w-7xl mx-auto px-6 md:px-12 py-16">
      {/* Category Tab Switcher */}
      {categories.length > 1 && (
        <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
          <button
            onClick={() => setActiveCategory('all')}
            className={`py-2.5 px-6 rounded-full font-mono text-xs font-semibold uppercase tracking-wider transition-colors ${
              activeCategory === 'all'
                ? 'bg-black text-white shadow-md'
                : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'
            }`}
          >
            All ({products.length})
          </button>
          {categories.map((cat) => {
            const count = products.filter(p => p.fabric === cat || p.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`py-2.5 px-6 rounded-full font-mono text-xs font-semibold uppercase tracking-wider transition-colors ${
                  activeCategory === cat
                    ? 'bg-black text-white shadow-md'
                    : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* Grid Header Subtitle */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-200">
        <h2 className="text-xs uppercase font-mono tracking-widest text-neutral-500">
          Showing {filteredProducts.length} Artisan Products
        </h2>
        <span className="text-xs font-mono text-neutral-400">
          Direct Loom Certified Handloom
        </span>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

