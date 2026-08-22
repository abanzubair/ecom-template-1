'use client';

import React from 'react';
import Link from 'next/link';

export const FeaturedCollectionsSection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
        <h2 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-neutral-950">
          Featured Collections
        </h2>
        <p className="text-fs-base md:text-fs-md text-neutral-500 font-light leading-relaxed">
          Masterpieces woven by generational artisans. Pure silks, certified zari, and timeless handlooms.
        </p>
      </div>

      {/* Bento Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
        {/* Column 1 (Left) */}
        <div className="space-y-6 flex flex-col">
          {/* Banarasi Silk Card */}
          <Link href="/products" className="relative rounded-2xl overflow-hidden h-52 group cursor-pointer shadow-xs block">
            <img
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop"
              alt="Banarasi Silk Collection"
              className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors flex items-center justify-center">
              <h3 className="text-2xl font-extrabold text-white tracking-tight drop-shadow-md font-display">
                Pure Silk
              </h3>
            </div>
          </Link>

          {/* Bridal Heritage Card */}
          <Link href="/products" className="relative rounded-2xl overflow-hidden flex-1 min-h-[340px] group cursor-pointer shadow-xs block">
            <img
              src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop"
              alt="Bridal Heritage Collection"
              className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/70 transition-colors flex flex-col items-center justify-end p-8 text-center text-white">
              <h3 className="text-2xl font-extrabold tracking-tight drop-shadow-md font-display mb-1">
                Bridal & Heritage
              </h3>
              <p className="text-[11px] text-neutral-200 font-light max-w-xs mb-5 leading-relaxed">
                Heirloom-grade zari work crafted for life&apos;s most memorable moments
              </p>
              <span className="bg-white hover:bg-neutral-100 text-black text-xs font-semibold px-6 py-2.5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md">
                Explore Collection
              </span>
            </div>
          </Link>
        </div>

        {/* Column 2 (Middle) */}
        <div className="space-y-6 flex flex-col">
          {/* Zari Brocades Card */}
          <Link href="/products" className="relative rounded-2xl overflow-hidden flex-1 min-h-[340px] group cursor-pointer shadow-xs block">
            <img
              src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop"
              alt="Zari Brocade Weaves"
              className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors flex items-center justify-center">
              <h3 className="text-2xl font-extrabold text-white tracking-tight drop-shadow-md font-display text-center px-4">
                Zari Brocades
              </h3>
            </div>
          </Link>

          {/* Katan Silk Card */}
          <Link href="/products" className="relative rounded-2xl overflow-hidden h-52 group cursor-pointer shadow-xs block">
            <img
              src="https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=800&auto=format&fit=crop"
              alt="Katan Silk Collection"
              className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors flex items-center justify-center">
              <h3 className="text-2xl font-extrabold text-white tracking-tight drop-shadow-md font-display">
                Katan Silk
              </h3>
            </div>
          </Link>
        </div>

        {/* Column 3 (Right) */}
        <div className="space-y-6 flex flex-col">
          {/* Handloom Georgette Card */}
          <Link href="/products" className="relative rounded-2xl overflow-hidden h-52 group cursor-pointer shadow-xs block">
            <img
              src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop"
              alt="Handloom Georgette"
              className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors flex items-center justify-center">
              <h3 className="text-2xl font-extrabold text-white tracking-tight drop-shadow-md font-display">
                Handloom
              </h3>
            </div>
          </Link>

          {/* Organza & Tissue Card */}
          <Link href="/products" className="relative rounded-2xl overflow-hidden flex-1 min-h-[340px] group cursor-pointer shadow-xs block">
            <img
              src="https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=800&auto=format&fit=crop"
              alt="Organza & Tissue Weaves"
              className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors flex items-center justify-center">
              <h3 className="text-2xl font-extrabold text-white tracking-tight drop-shadow-md font-display text-center px-4">
                Tissue & Organza
              </h3>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

