import React from 'react';
import { TESTIMONIALS } from '@/data/products';
import { RiDoubleQuotesL } from 'react-icons/ri';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="about" className="bg-white text-neutral-900 pt-24 pb-20 mt-16 border-t border-neutral-200/80 relative overflow-hidden w-full">
      {/* Header Container (Constrained max-w-7xl) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 pb-6 border-b border-neutral-200">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 block mb-2">
              Collector & Client Perspectives
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold font-display tracking-tight text-neutral-950">
              Testimonials
            </h2>
          </div>
        </div>
      </div>

      {/* Full-Bleed Edge-to-Edge Infinite Auto-Scrolling Marquee Track */}
      <div className="overflow-hidden w-full relative py-2">
        <div className="animate-marquee flex space-x-6">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((item, idx) => (
            <div
              key={`${item.id}-dup-${idx}`}
              className="w-[75vw] max-w-[280px] md:w-[360px] md:max-w-[360px] shrink-0 bg-neutral-50/80 p-6 md:p-8 rounded-2xl border border-neutral-200/80 flex flex-col justify-between space-y-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <RiDoubleQuotesL className="w-7 h-7 md:w-8 md:h-8 text-neutral-400" />
              <p className="text-sm md:text-base text-neutral-700 font-light leading-relaxed italic">
                "{item.quote}"
              </p>
              <div className="pt-4 border-t border-neutral-200/80 flex items-center justify-between text-xs font-mono">
                <div>
                  <h4 className="font-bold text-neutral-950">{item.author}</h4>
                  <p className="text-neutral-500 font-normal">{item.role}</p>
                </div>
                <span className="text-neutral-400">{item.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
