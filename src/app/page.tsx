import React from 'react';
import { HeroSection } from '@/components/HeroSection';
import { NewArrivalsSection } from '@/components/NewArrivalsSection';
import { BoutiqueFeatureSection } from '@/components/BoutiqueFeatureSection';
import { FeaturedCollectionsSection } from '@/components/FeaturedCollectionsSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';

export default function HomePage() {
  return (
    <div className="w-full bg-white">
      {/* 1. Main Hero Banner */}
      <HeroSection />

      {/* 2. New Arrivals Product Grid (Matching Reference Screenshot) */}
      <NewArrivalsSection />

      {/* 3. Tokyo Boutique Outlet Sale Feature Banner */}
      <BoutiqueFeatureSection />

      {/* 4. Featured Collections Bento Grid */}
      <FeaturedCollectionsSection />

      {/* 5. Collector Testimonials Section */}
      <TestimonialsSection />
    </div>
  );
}
