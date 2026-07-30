'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CATALOG_PRODUCTS, CATALOG_CATEGORIES, CatalogCategory, CatalogProduct } from '@/data/catalog';
import { RiGridFill, RiCapsuleLine, RiDrinks2Line, RiDropLine, RiArrowRightLine, RiShoppingBag3Line, RiHeartLine, RiHeartFill } from 'react-icons/ri';

/* ── Category icon map ─────────────────────────────────────────── */
const categoryIcons: Record<string, React.ReactNode> = {
  grid: <RiGridFill className="w-4 h-4" />,
  supplement: <RiCapsuleLine className="w-4 h-4" />,
  food: <RiDrinks2Line className="w-4 h-4" />,
  cosmetic: <RiDropLine className="w-4 h-4" />,
};

/* ── Single Product Card ───────────────────────────────────────── */
const CatalogCard: React.FC<{ product: CatalogProduct; index: number }> = ({ product, index }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className="group relative bg-white rounded-2xl border border-neutral-100 overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:border-neutral-200 hover:-translate-y-1"
      style={{
        animationDelay: `${index * 80}ms`,
        animation: 'cardFadeIn 0.6s ease-out both',
      }}
    >
      {/* Wishlist Button */}
      <button
        onClick={() => setIsLiked(!isLiked)}
        className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white text-neutral-500 hover:text-neutral-800 flex items-center justify-center transition-all duration-300 shadow-sm opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0"
        title={isLiked ? 'Remove from Wishlist' : 'Add to Wishlist'}
      >
        {isLiked ? (
          <RiHeartFill className="w-4 h-4 text-red-500" />
        ) : (
          <RiHeartLine className="w-4 h-4" />
        )}
      </button>

      {/* Category Badge */}
      <div className="px-6 pt-6 pb-2">
        <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-400 font-mono">
          {product.categoryLabel}
        </span>
      </div>

      {/* Product Title */}
      <div className="px-6 pb-4">
        <h3 className="text-[15px] font-semibold text-neutral-900 leading-snug tracking-tight line-clamp-2 min-h-[2.5em]">
          {product.title}
        </h3>
      </div>

      {/* Product Image */}
      <Link href={`/products/${product.id}`} className="block relative mx-4 mb-4 aspect-square rounded-xl overflow-hidden bg-neutral-50">
        <div
          className={`absolute inset-0 bg-neutral-100 animate-pulse transition-opacity duration-500 ${
            imageLoaded ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className={`object-cover object-center transition-all duration-700 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
      </Link>

      {/* Price & Action Row */}
      <div className="px-6 pb-5 flex items-center justify-between">
        <div className="flex items-baseline gap-1.5">
          <span className="text-lg font-bold text-neutral-900 font-mono tracking-tight">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <button
          className="w-9 h-9 rounded-full border border-neutral-200 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white text-neutral-600 flex items-center justify-center transition-all duration-300"
          title="Add to Cart"
        >
          <RiShoppingBag3Line className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

/* ── Main Products Section ─────────────────────────────────────── */
export const FinalProductsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CatalogCategory>('all');

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return CATALOG_PRODUCTS;
    return CATALOG_PRODUCTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const categoryCount = useMemo(() => {
    const counts: Record<string, number> = { all: CATALOG_PRODUCTS.length };
    CATALOG_PRODUCTS.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <section className="w-full pt-28 md:pt-36 pb-20 md:pb-32" id="products-catalog">
      {/* ── Header Block ──────────────────────────────── */}
      <div className="w-full px-6 md:px-12 lg:px-16 xl:px-20 mb-14 md:mb-20">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-20">
          {/* Left — Title */}
          <div className="flex-shrink-0">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 mb-3">
              Our Catalog
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-display font-bold text-neutral-900 tracking-tight leading-[1.05]">
              Final products
            </h1>
          </div>

          {/* Right — Description */}
          <div className="lg:max-w-md xl:max-w-lg">
            <p className="text-[15px] leading-relaxed text-neutral-500 font-light">
              Optimally selected combinations of biotechnological components with traditional
              biologically active substances are embodied in Art Life&apos;s products. In the
              development of these products, gender and age characteristics of our customers
              are taken into account.
            </p>
          </div>
        </div>
      </div>

      {/* ── Filter Tabs ───────────────────────────────── */}
      <div className="w-full px-6 md:px-12 lg:px-16 xl:px-20 mb-10 md:mb-14">
        <div className="flex items-center gap-2 flex-wrap">
          {CATALOG_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-[0.12em] transition-all duration-300 border ${
                  isActive
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-lg shadow-neutral-900/20'
                    : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400 hover:text-neutral-900'
                }`}
              >
                <span className={`transition-colors duration-300 ${isActive ? 'text-white' : 'text-neutral-400'}`}>
                  {categoryIcons[cat.icon]}
                </span>
                <span>{cat.label}</span>
                <span className={`ml-0.5 text-[10px] font-mono ${isActive ? 'text-neutral-400' : 'text-neutral-300'}`}>
                  ({categoryCount[cat.id] || 0})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Product Grid Container ────────────────────── */}
      <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16">
        <div className="relative rounded-[2rem] bg-gradient-to-br from-neutral-100/80 via-[#eee9f3]/50 to-neutral-100/80 border border-neutral-200/60 p-5 md:p-8 lg:p-10">
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-violet-100/40 to-transparent rounded-[2rem] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-rose-50/30 to-transparent rounded-[2rem] pointer-events-none" />

          {/* Product Grid */}
          <div
            className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6"
            key={activeCategory}
          >
            {filteredProducts.map((product, i) => (
              <CatalogCard key={product.id} product={product} index={i} />
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-neutral-400">
              <RiGridFill className="w-12 h-12 mb-4 opacity-30" />
              <p className="text-sm font-medium">No products found in this category</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Bottom CTA ─────────────────────────────────── */}
      <div className="w-full px-6 md:px-12 lg:px-16 xl:px-20 mt-14 md:mt-20 flex items-center justify-center">
        <Link
          href="/products"
          className="group inline-flex items-center gap-3 px-8 py-4 bg-neutral-900 text-white text-sm font-semibold uppercase tracking-[0.12em] rounded-full hover:bg-neutral-800 transition-all duration-300 shadow-lg shadow-neutral-900/20 hover:shadow-xl hover:shadow-neutral-900/30"
        >
          View Full Catalog
          <RiArrowRightLine className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
};
