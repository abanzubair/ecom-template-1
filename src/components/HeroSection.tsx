'use client';

import React from 'react';
import { RiArrowDownLine } from 'react-icons/ri';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative h-screen min-h-screen w-full overflow-hidden select-none bg-black text-white flex flex-col justify-between items-center pt-28 pb-10">
      {/* Background Fullscreen Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/make_a_video_where_this_sweats.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Hero Content Area with CSS Difference Blend Mode for Automatic Text Color Inversion */}
      <div className="relative z-20 max-w-2xl mx-auto px-6 text-center flex flex-col items-center justify-center my-auto space-y-6 mix-blend-difference text-white">
        {/* Tag Badge */}
        <div className="flex items-center text-[11px] font-mono tracking-widest uppercase text-white px-2 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-white inline-block mr-2.5" />
          <span>Studio collection</span>
        </div>

        {/* Main Headline */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight font-sfpro text-white max-w-xl" style={{ fontWeight: 700 }}>
          Art that travels with you
        </h2>

        {/* Subtext */}
        <p className="text-sm md:text-base text-white max-w-md font-light leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        {/* Call to Actions */}
        <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
          <a
            href="#designs"
            className="bg-white text-black font-semibold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            View Exclusive Designs
          </a>
        </div>
      </div>

      {/* Down arrow indicator */}
      <div className="relative z-20 mix-blend-difference text-white">
        <a href="#designs" className="text-white hover:opacity-80 transition-opacity block">
          <RiArrowDownLine className="w-6 h-6 animate-bounce" />
        </a>
      </div>
    </section>
  );
};
