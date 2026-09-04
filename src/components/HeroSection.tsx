'use client';

import React from 'react';
import { RiArrowDownLine } from 'react-icons/ri';
import { useApp } from '@/context/AppContext';

export const HeroSection: React.FC = () => {
  const { storeInfo } = useApp();
  const hero = storeInfo.config?.hero;

  const isImage = hero?.type === 'image';
  const mediaUrl = hero?.url || storeInfo.bannerUrl || (isImage ? 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=85' : '/make_a_video_where_this_sweats.mp4');
  const headline = hero?.headline || 'Art that travels with you';
  const badgeText = hero?.badge || 'Studio collection';
  const subtitle = hero?.subtitle || storeInfo.tagline || 'Exquisite pure silk and gold zari treasures handcrafted by heritage weavers.';
  const primaryCtaText = hero?.primary_cta_text || 'View Exclusive Designs';
  const primaryCtaLink = hero?.primary_cta_link || '#designs';
  const secondaryCtaText = hero?.secondary_cta_text;
  const secondaryCtaLink = hero?.secondary_cta_link || '#heritage';

  return (
    <section className="relative h-screen min-h-screen w-full overflow-hidden select-none bg-black text-white flex flex-col justify-between items-center pt-28 pb-10">
      {/* Background Media: Video or Image */}
      {isImage ? (
        <img
          key={mediaUrl}
          src={mediaUrl}
          alt={headline}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      ) : (
        <video
          key={mediaUrl}
          autoPlay
          loop
          muted
          playsInline
          poster={hero?.poster_url}
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={mediaUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Subtle dark backdrop overlay to keep text legible */}
      <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />

      {/* Hero Content Area with CSS Difference Blend Mode for Automatic Text Color Inversion */}
      <div className="relative z-20 max-w-2xl mx-auto px-6 text-center flex flex-col items-center justify-center my-auto space-y-6 mix-blend-difference text-white">
        {/* Tag Badge */}
        <div className="flex items-center text-[11px] font-mono tracking-widest uppercase text-white px-2 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-white inline-block mr-2.5" />
          <span>{badgeText}</span>
        </div>

        {/* Main Headline */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight font-sfpro text-white max-w-xl" style={{ fontWeight: 700 }}>
          {headline}
        </h2>

        {/* Subtext */}
        <p className="text-sm md:text-base text-white max-w-md font-light leading-relaxed">
          {subtitle}
        </p>

        {/* Call to Actions */}
        <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
          <a
            href={primaryCtaLink}
            className="bg-white text-black font-semibold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {primaryCtaText}
          </a>

          {secondaryCtaText && (
            <a
              href={secondaryCtaLink}
              className="border border-white text-white font-semibold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full transition-all duration-300 transform hover:scale-105 hover:bg-white/10"
            >
              {secondaryCtaText}
            </a>
          )}
        </div>
      </div>

      {/* Down arrow indicator */}
      <div className="relative z-20 mix-blend-difference text-white">
        <a href={primaryCtaLink} className="text-white hover:opacity-80 transition-opacity block">
          <RiArrowDownLine className="w-6 h-6 animate-bounce" />
        </a>
      </div>
    </section>
  );
};
