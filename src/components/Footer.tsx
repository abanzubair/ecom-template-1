'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';

export const Footer: React.FC = () => {
  const { setIsSocialFeedOpen } = useApp();

  return (
    <footer id="site-footer" className="w-full bg-neutral-950 text-white rounded-t-[2.5rem] pt-16 md:pt-24 pb-8 px-8 md:px-16 relative overflow-hidden border-t border-neutral-800">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Section: Description (Left) & Nav Links (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-6 md:mb-10">
          {/* Top Left Paragraph */}
          <div className="lg:col-span-6">
            <p className="text-footer-desc text-neutral-400 font-light max-w-md leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
            </p>
          </div>

          {/* Top Right Dual Columns */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-8">
            {/* Extra Links */}
            <div className="space-y-4">
              <h5 className="text-footer-heading font-bold text-white tracking-tight">Extra links</h5>
              <ul className="space-y-3 text-footer-link text-neutral-400 font-light">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/products" className="hover:text-white transition-colors">Products</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>

            {/* Social Media */}
            <div className="space-y-4">
              <h5 className="text-footer-heading font-bold text-white tracking-tight">Social Media</h5>
              <ul className="space-y-3 text-footer-link text-neutral-400 font-light">
                <li><button onClick={() => setIsSocialFeedOpen(true)} className="hover:text-white transition-colors text-left">Instagram</button></li>
                <li><button onClick={() => setIsSocialFeedOpen(true)} className="hover:text-white transition-colors text-left">Youtube</button></li>
                <li><button onClick={() => setIsSocialFeedOpen(true)} className="hover:text-white transition-colors text-left">Facebook</button></li>
                <li><button onClick={() => setIsSocialFeedOpen(true)} className="hover:text-white transition-colors text-left">X</button></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section: Contact (Left) & Space for Giant Watermark (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-end pt-10 border-t border-neutral-900 gap-8 min-h-[220px]">
          {/* Contact Details (Bottom Left) */}
          <div className="lg:col-span-5 space-y-4 z-20 pb-4">
            <h5 className="text-footer-heading font-bold text-white tracking-tight">Contact</h5>
            <div className="space-y-1.5 text-footer-contact text-neutral-400 font-light leading-relaxed">
              <p>42, Connaught Place, Block B</p>
              <p>New Delhi, Delhi 110001</p>
            </div>
            <div className="space-y-1.5 text-footer-contact text-neutral-400 font-light">
              <p><a href="mailto:email@example.com" className="hover:text-white transition-colors">email@example.com</a></p>
              <p><a href="tel:5555555555" className="hover:text-white transition-colors">(555) 555-5555</a></p>
            </div>
          </div>

          <div className="lg:col-span-7" />
        </div>

        {/* Sub copyright line */}
        <div className="mt-0 md:mt-12 pt-4 flex items-center justify-between text-footer-meta text-neutral-500 font-mono z-20 relative">
          <span>© 2026 Lorem x VRTX Studio. All Rights Reserved.</span>
        </div>
      </div>

      {/* Giant Overlapping Watermark Logo Text (Shown on medium and large screens) */}
      <div className="hidden md:block absolute right-0 bottom-0 pointer-events-none select-none z-0 overflow-hidden leading-none transform translate-x-6 translate-y-8">
        <h1 className="text-[20rem] font-bold text-white tracking-tighter leading-none select-none font-display text-right opacity-95">
          Lorem
        </h1>
      </div>
    </footer>
  );
};


