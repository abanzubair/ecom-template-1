'use client';

import React from 'react';

export const FeaturedCollectionsSection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
        <h2 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-neutral-950">
          Featured Collections
        </h2>
        <p className="text-fs-base md:text-fs-md text-neutral-500 font-light leading-relaxed">
          Dare to mix and match! Check our collections to level up your fashion game
        </p>
      </div>

      {/* Bento Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
        {/* Column 1 (Left) */}
        <div className="space-y-6 flex flex-col">
          {/* Footwear Card */}
          <div className="relative rounded-2xl overflow-hidden h-52 group cursor-pointer shadow-xs">
            <img
              src="https://images.unsplash.com/photo-1603808033192-082d6919d3e1?q=80&w=800&auto=format&fit=crop"
              alt="Footwear Collection"
              className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <h3 className="text-2xl font-extrabold text-white tracking-tight drop-shadow-md font-display">
                Footwear
              </h3>
            </div>
          </div>

          {/* Headwear Card (Tall Card with Subtitle & Discover Pill Button) */}
          <div className="relative rounded-2xl overflow-hidden flex-1 min-h-[340px] group cursor-pointer shadow-xs">
            <img
              src="https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop"
              alt="Headwear Collection"
              className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20 group-hover:from-black/70 transition-colors flex flex-col items-center justify-end p-8 text-center text-white">
              <h3 className="text-2xl font-extrabold tracking-tight drop-shadow-md font-display mb-1">
                Headwear
              </h3>
              <p className="text-[11px] text-neutral-200 font-light max-w-xs mb-5 leading-relaxed">
                Check our cool headwear collections. Get Disc 10% on New Season
              </p>
              <button className="bg-white hover:bg-neutral-100 text-black text-xs font-semibold px-6 py-2.5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md">
                Discover
              </button>
            </div>
          </div>
        </div>

        {/* Column 2 (Middle) */}
        <div className="space-y-6 flex flex-col">
          {/* Jacket Card (Tall Card) */}
          <div className="relative rounded-2xl overflow-hidden flex-1 min-h-[340px] group cursor-pointer shadow-xs">
            <img
              src="https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=800&auto=format&fit=crop"
              alt="Jacket Collection"
              className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <h3 className="text-2xl font-extrabold text-white tracking-tight drop-shadow-md font-display">
                Jacket
              </h3>
            </div>
          </div>

          {/* Bags Card */}
          <div className="relative rounded-2xl overflow-hidden h-52 group cursor-pointer shadow-xs">
            <img
              src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop"
              alt="Bags Collection"
              className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <h3 className="text-2xl font-extrabold text-white tracking-tight drop-shadow-md font-display">
                Bags
              </h3>
            </div>
          </div>
        </div>

        {/* Column 3 (Right) */}
        <div className="space-y-6 flex flex-col">
          {/* Accessories Card */}
          <div className="relative rounded-2xl overflow-hidden h-52 group cursor-pointer shadow-xs">
            <img
              src="https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=800&auto=format&fit=crop"
              alt="Accessories Collection"
              className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <h3 className="text-2xl font-extrabold text-white tracking-tight drop-shadow-md font-display">
                Accessories
              </h3>
            </div>
          </div>

          {/* Bottoms Card (Tall Card) */}
          <div className="relative rounded-2xl overflow-hidden flex-1 min-h-[340px] group cursor-pointer shadow-xs">
            <img
              src="https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=800&auto=format&fit=crop"
              alt="Bottoms Collection"
              className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <h3 className="text-2xl font-extrabold text-white tracking-tight drop-shadow-md font-display">
                Bottoms
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
