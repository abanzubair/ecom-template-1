'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  RiCompass3Line,
  RiFileList3Line,
  RiArrowRightLine,
  RiSparklingLine,
  RiShieldCheckLine,
  RiRulerLine,
  RiLayoutGridLine,
} from 'react-icons/ri';

export const AboutPage: React.FC = () => {
  return (
    <div className="w-full bg-white text-neutral-900 min-h-screen pt-20 md:pt-24 pb-20">
      {/* ── 1. Hero Header Section (Pure White Backdrop with Subtle Grid Lines) ── */}
      <section className="relative w-full px-6 md:px-12 lg:px-20 py-20 md:py-32 overflow-hidden flex flex-col items-center justify-center text-center bg-white">
        {/* Subtle ribbed vertical grid line pattern matching layout */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:3rem_100%] pointer-events-none" />

        {/* Subtle ambient soft blue/indigo glow on white background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[320px] bg-gradient-to-r from-blue-100/60 via-indigo-100/40 to-sky-100/50 blur-[130px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto space-y-6 animate-fadeIn">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-neutral-950 tracking-tight leading-[1.05]">
            You define the vision.
            <br />
            <span className="text-neutral-700 font-light italic">We bring the form.</span>
          </h1>

          <p className="text-neutral-600 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed pt-2">
            Bridging high-fashion silhouettes, studio flash art, and architectural garment engineering into wearable 1-of-1 collections.
          </p>
        </div>
      </section>

      {/* ── 2. Pure White Card Container (With Corner Crosshair Markers) ── */}
      <section className="w-full px-4 sm:px-6 md:px-12 lg:px-16 relative z-20">
        <div className="relative rounded-[2rem] md:rounded-[2.5rem] bg-white text-neutral-900 border border-neutral-200 shadow-xl shadow-neutral-900/5 p-6 sm:p-10 md:p-16 overflow-hidden">
          {/* Corner Crosshair Marks matching modern tech design reference */}
          <div className="absolute top-4 left-4 text-neutral-300 font-mono text-xs select-none">+</div>
          <div className="absolute top-4 right-4 text-neutral-300 font-mono text-xs select-none">+</div>
          <div className="absolute bottom-4 left-4 text-neutral-300 font-mono text-xs select-none">+</div>
          <div className="absolute bottom-4 right-4 text-neutral-300 font-mono text-xs select-none">+</div>

          {/* Sub-Header Statement & Action Pills */}
          <div className="max-w-3xl mx-auto text-center space-y-6 pb-16 md:pb-24 border-b border-neutral-100">
            <p className="text-sm sm:text-base font-medium text-neutral-700 tracking-tight max-w-xl mx-auto">
              We design heavyweight studio wear and limited flash art that extends what human expression can achieve.
            </p>

            <div className="flex items-center justify-center gap-3 flex-wrap pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-neutral-950 text-white text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <RiCompass3Line className="w-4 h-4 text-neutral-400" />
                Discover VRTX
              </Link>
              <a
                href="#manifesto"
                className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-semibold uppercase tracking-wider transition-all duration-300 border border-neutral-200"
              >
                <RiFileList3Line className="w-4 h-4 text-neutral-500" />
                View Philosophy
              </a>
            </div>
          </div>

          {/* Manifesto Block */}
          <div id="manifesto" className="py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start border-b border-neutral-100">
            <div className="lg:col-span-4 flex items-center gap-2.5 font-mono text-sm sm:text-base md:text-lg font-bold uppercase tracking-wider text-neutral-800">
              <span className="w-7 h-7 rounded-full border border-neutral-300 flex items-center justify-center text-xs text-neutral-700 font-bold shrink-0">
                ::
              </span>
              <span>Studio Philosophy</span>
            </div>

            <div className="lg:col-span-8">
              <p className="text-2xl sm:text-3xl md:text-4xl font-display font-medium text-neutral-950 leading-[1.25] tracking-tight">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
            </div>
          </div>

          {/* ── 3. "Meet VRTX Studio" Feature Showcase ── */}
          <div className="pt-16 md:pt-24 space-y-16 md:space-y-24">
            {/* Title Header */}
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-block px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 text-[11px] font-mono uppercase tracking-wider font-semibold border border-neutral-200/80">
                OUR CREATIVE ARCHITECTURE
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-neutral-950 tracking-tight">
                Meet VRTX Studio
              </h2>
              <p className="text-sm md:text-base text-neutral-600 font-light leading-relaxed pt-1">
                VRTX Studio — short for &apos;Vertex&apos; — is your creative sanctuary, ready to support and elevate your personal expression across the full spectrum of studio craft.
              </p>
            </div>

            {/* 4-Corner Grid with Center Interactive 3D Orb */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
              {/* Left Column (2 Features) */}
              <div className="lg:col-span-4 space-y-12 text-center lg:text-left">
                {/* Feature 1 */}
                <div className="space-y-3 group">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-800 flex items-center justify-center mx-auto lg:mx-0 group-hover:bg-neutral-950 group-hover:text-white transition-colors duration-300 border border-neutral-200/80">
                    <RiRulerLine className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-950 tracking-tight">
                    Architectural Precision & Weight
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                    From 450GSM organic French terry cotton to custom anodized aluminum hardware, every thread and seam is engineered for structural integrity and comfort.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="space-y-3 group">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-800 flex items-center justify-center mx-auto lg:mx-0 group-hover:bg-neutral-950 group-hover:text-white transition-colors duration-300 border border-neutral-200/80">
                    <RiSparklingLine className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-950 tracking-tight">
                    Handcrafted 1-of-1 Flash Editions
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                    Exclusivity defined. Each capsule release features individual numbered artwork and flash graphics that are never re-issued once sold out.
                  </p>
                </div>
              </div>

              {/* Center Column: 3D Metallic Liquid Orb (Matching Reference Image) */}
              <div className="lg:col-span-4 flex justify-center py-6">
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden transition-transform duration-700 hover:scale-105 bg-white">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/10 via-transparent to-purple-400/10 rounded-full animate-pulse pointer-events-none" />
                  <Image
                    src="/about-orb.png"
                    alt="VRTX Studio Iridescent Core"
                    fill
                    sizes="(max-width: 768px) 256px, 384px"
                    className="object-contain drop-shadow-xl"
                    priority
                  />
                </div>
              </div>

              {/* Right Column (2 Features) */}
              <div className="lg:col-span-4 space-y-12 text-center lg:text-right">
                {/* Feature 3 */}
                <div className="space-y-3 group">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-800 flex items-center justify-center mx-auto lg:ml-auto lg:mr-0 group-hover:bg-neutral-950 group-hover:text-white transition-colors duration-300 border border-neutral-200/80">
                    <RiLayoutGridLine className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-950 tracking-tight">
                    Cross-Disciplinary Studio Work
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                    Uniting master tattoo artists, industrial designers, and apparel tailors under a single unified aesthetic vision.
                  </p>
                </div>

                {/* Feature 4 */}
                <div className="space-y-3 group">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-800 flex items-center justify-center mx-auto lg:ml-auto lg:mr-0 group-hover:bg-neutral-950 group-hover:text-white transition-colors duration-300 border border-neutral-200/80">
                    <RiShieldCheckLine className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-950 tracking-tight">
                    Ethical, Transparent & Certified
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                    Zero-waste studio practices, GOTS certified organic textiles, and full digital provenance tracking for every piece.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA Bar inside card */}
          <div className="mt-20 pt-10 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <h4 className="text-lg font-bold text-neutral-950 font-display">
                Ready to experience VRTX Studio?
              </h4>
              <p className="text-xs text-neutral-500 font-light">
                Explore our current studio collection or book a 1-on-1 consultation.
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-950 text-white rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors shadow-md"
            >
              <span>Explore Products</span>
              <RiArrowRightLine className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
