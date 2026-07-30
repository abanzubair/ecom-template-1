'use client';

import React from 'react';

export const BoutiqueFeatureSection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
        {/* Left Side: Boutique Storefront Image with LED SALE Display */}
        <div className="lg:col-span-7 relative rounded-2xl overflow-hidden shadow-md group">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop"
            alt="VRTX Tokyo Boutique Outlet"
            className="w-full h-[380px] md:h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Overlay Lightbox Graphic Element simulating SALE sign */}
          <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-8 rounded-xl border border-neutral-200/80 shadow-lg hidden sm:flex flex-col items-center justify-center">
            <span className="font-mono font-black text-2xl tracking-[0.3em] uppercase text-neutral-900 writing-mode-vertical">
              SALE
            </span>
          </div>
        </div>

        {/* Right Side: Promotion Copy & 50% Callout */}
        <div className="lg:col-span-5 space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-neutral-950 leading-tight">
            Find Your Perfect Look at VRTX's Stylish New Outlet
          </h2>

          <p className="text-fs-base md:text-fs-md text-neutral-600 leading-relaxed font-normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>

          <div className="pt-2 border-t border-neutral-200/80 space-y-1">
            <span className="text-xs font-semibold text-neutral-900 block">
              Come and Enjoy Sale!
            </span>
            <div className="text-6xl md:text-7xl font-black font-display tracking-tighter text-neutral-950">
              50%
            </div>
          </div>

          <div className="pt-2">
            <a
              href="#about"
              className="inline-block bg-black hover:bg-neutral-800 text-white font-semibold text-xs px-7 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-sm"
            >
              See On Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
