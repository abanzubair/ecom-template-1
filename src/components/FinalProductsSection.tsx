'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { ProductCard } from './ProductCard';
import { RiGridFill, RiArrowRightLine } from 'react-icons/ri';

/* ── Main Products Section ─────────────────────────────────────── */
export const FinalProductsSection: React.FC = () => {
  const { products, isLoadingProducts, storeInfo } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = useMemo(() => {
    const cats = new Set<string>();
    products.forEach((p) => {
      if (p.fabric) cats.add(p.fabric);
      else if (p.category) cats.add(p.category);
    });
    return Array.from(cats);
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return products;
    return products.filter((p) => (p.fabric === activeCategory || p.category === activeCategory));
  }, [products, activeCategory]);

  return (
    <section className="w-full pt-28 md:pt-36 pb-20 md:pb-32" id="products-catalog">
      {/* ── Header Block ──────────────────────────────── */}
      <div className="w-full px-6 md:px-12 lg:px-16 xl:px-20 mb-10 md:mb-14">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-20">
          {/* Left — Title */}
          <div className="flex-shrink-0">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 mb-3">
              {storeInfo.storeName || 'Our Boutique'}
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-neutral-900 tracking-tight leading-[1.05]">
              Curated Catalog
            </h1>
          </div>

          {/* Right — Description */}
          <div className="lg:max-w-md xl:max-w-lg">
            <p className="text-[15px] leading-relaxed text-neutral-500 font-light">
              Explore authentic handloom weaves, certified purity zari brocades, and handcrafted textile designs direct from master artisans.
            </p>
          </div>
        </div>
      </div>

      {/* ── Filter Tabs ───────────────────────────────── */}
      {categories.length > 0 && (
        <div className="w-full px-6 md:px-12 lg:px-16 xl:px-20 mb-8 md:mb-10">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setActiveCategory('all')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-[0.12em] transition-all duration-300 border ${
                activeCategory === 'all'
                  ? 'bg-neutral-900 text-white border-neutral-900 shadow-md'
                  : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400 hover:text-neutral-900'
              }`}
            >
              <RiGridFill className="w-4 h-4" />
              <span>All ({products.length})</span>
            </button>

            {categories.map((cat) => {
              const count = products.filter(p => p.fabric === cat || p.category === cat).length;
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-[0.12em] transition-all duration-300 border ${
                    isActive
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-md'
                      : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400 hover:text-neutral-900'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] font-mono ${isActive ? 'text-neutral-400' : 'text-neutral-400'}`}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Product Grid Container ────────────────────── */}
      <div className="w-full px-6 md:px-12 lg:px-16 xl:px-20">
        {isLoadingProducts ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="animate-pulse space-y-3">
                <div className="bg-neutral-100 rounded-2xl aspect-square w-full" />
                <div className="h-4 bg-neutral-100 rounded w-3/4" />
                <div className="h-3 bg-neutral-100 rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-neutral-200 rounded-3xl bg-neutral-50/50">
            <RiGridFill className="w-12 h-12 mb-3 text-neutral-300" />
            <p className="text-base font-semibold text-neutral-800">No products available in this view</p>
            <p className="text-xs text-neutral-500 max-w-sm mt-1">
              Add products from your Weave365 Business Center to display them in this store.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

