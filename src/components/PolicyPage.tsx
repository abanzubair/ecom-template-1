'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { RiShieldCheckLine, RiTruckLine, RiFileTextLine } from 'react-icons/ri';

type PolicyType = 'privacy' | 'terms' | 'shipping';

export const PolicyPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PolicyType>('privacy');

  return (
    <div className="w-full bg-white text-neutral-900 min-h-screen pb-20">
      {/* ── 1. Full Screen Width Light Mode Hero Header Banner (White & Silver Palette) ── */}
      <section className="relative w-full bg-gradient-to-b from-white via-slate-50 to-neutral-100/90 text-neutral-900 overflow-hidden pt-28 md:pt-36 pb-16 md:pb-24 px-6 md:px-12 text-center border-b border-neutral-200">
        {/* Subtle grid backdrop & ambient silver-white metallic glow */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:3rem_100%] pointer-events-none" />
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[750px] h-[280px] bg-gradient-to-r from-slate-200/70 via-neutral-100/80 to-slate-300/60 blur-[110px] pointer-events-none rounded-full" />

        <div className="relative z-10 space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-neutral-950">
            {activeTab === 'privacy' && 'Privacy Policy'}
            {activeTab === 'terms' && 'Terms of Service'}
            {activeTab === 'shipping' && 'Shipping & Return Policy'}
          </h1>
          <p className="text-xs sm:text-sm font-mono text-neutral-500 font-medium">
            Last updated on July 30, 2026
          </p>

          {/* Policy Switcher Tabs */}
          <div className="pt-6 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            <button
              onClick={() => setActiveTab('privacy')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'privacy'
                  ? 'bg-neutral-950 text-white shadow-md'
                  : 'bg-white text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950 border border-neutral-300/80 shadow-xs'
              }`}
            >
              <RiShieldCheckLine className="w-4 h-4" />
              <span>Privacy Policy</span>
            </button>

            <button
              onClick={() => setActiveTab('terms')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'terms'
                  ? 'bg-neutral-950 text-white shadow-md'
                  : 'bg-white text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950 border border-neutral-300/80 shadow-xs'
              }`}
            >
              <RiFileTextLine className="w-4 h-4" />
              <span>Terms of Service</span>
            </button>

            <button
              onClick={() => setActiveTab('shipping')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'shipping'
                  ? 'bg-neutral-950 text-white shadow-md'
                  : 'bg-white text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950 border border-neutral-300/80 shadow-xs'
              }`}
            >
              <RiTruckLine className="w-4 h-4" />
              <span>Shipping & Returns</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── 2. Pure White Content Canvas (With Scaled Font Sizes) ── */}
      <section className="w-full max-w-5xl mx-auto px-6 sm:px-10 py-8 sm:py-14 font-sans">
        {/* PRIVACY POLICY CONTENT */}
        {activeTab === 'privacy' && (
          <div className="space-y-12 animate-fadeIn">
            {/* Intro paragraph */}
            <p className="text-lg sm:text-xl md:text-2xl text-neutral-800 leading-relaxed font-normal">
              VRTX Studio x DHARAA is dedicated to protecting your personal information and respecting your privacy. This Privacy Policy outlines the types of information we collect, how we use it, and your rights regarding that information. By accessing or using our Services, you agree to the practices described in this Privacy Policy.
            </p>

            {/* Section 1: Information We Collect */}
            <div className="space-y-8 pt-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-neutral-950 tracking-tight">
                Information We Collect
              </h2>
              <p className="text-base sm:text-lg text-neutral-700 font-normal leading-relaxed">
                We collect different types of personal information depending on how you interact with our Services.
              </p>

              {/* Sub-item 1 */}
              <div className="space-y-4 pt-3">
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight">
                  1. Personal Information You Provide to Us
                </h3>
                <p className="text-base sm:text-lg text-neutral-700 font-normal">
                  We may collect the following types of information that you voluntarily provide:
                </p>
                <ul className="space-y-3 text-base sm:text-lg text-neutral-700 font-normal pl-6 list-disc marker:text-neutral-500 leading-relaxed">
                  <li>
                    <strong className="font-bold text-neutral-950">Account Information:</strong> When you register on our Services, we may ask for information such as your name, email address, phone number, and account preferences.
                  </li>
                  <li>
                    <strong className="font-bold text-neutral-950">Contact Information:</strong> When you express interest in our products or services, participate in activities, subscribe to our newsletters, or contact us directly, we may collect contact details.
                  </li>
                  <li>
                    <strong className="font-bold text-neutral-950">Payment Information:</strong> When making a purchase, we may collect billing information and payment details through secure payment gateways.
                  </li>
                  <li>
                    <strong className="font-bold text-neutral-950">Feedback and Correspondence:</strong> When you communicate with us for support, surveys, or other correspondence, we collect the information necessary to respond to your requests.
                  </li>
                </ul>
              </div>

              {/* Sub-item 2 */}
              <div className="space-y-4 pt-6">
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight">
                  2. Information Collected Automatically
                </h3>
                <p className="text-base sm:text-lg text-neutral-700 font-normal">
                  When you interact with our Services, we collect certain information automatically, which may include:
                </p>
                <ul className="space-y-3 text-base sm:text-lg text-neutral-700 font-normal pl-6 list-disc marker:text-neutral-500 leading-relaxed">
                  <li>
                    <strong className="font-bold text-neutral-950">Device Information:</strong> Details about the device used to access our Services, such as device type, operating system, and unique device identifiers.
                  </li>
                  <li>
                    <strong className="font-bold text-neutral-950">Usage Data:</strong> Information about your interactions with our Services, including browsing history, accessed pages, clicked links, and other engagement metrics.
                  </li>
                  <li>
                    <strong className="font-bold text-neutral-950">Location Data:</strong> Approximate location derived from your IP address, which may help us tailor content and enhance security.
                  </li>
                  <li>
                    <strong className="font-bold text-neutral-950">Cookies and Tracking Technologies:</strong> We use cookies and similar tracking technologies to collect and store information, such as session data, to enhance your experience and analyze usage patterns.
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 2: How We Use Your Information */}
            <div className="space-y-8 pt-8 border-t border-neutral-200">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-neutral-950 tracking-tight">
                How We Use Your Information
              </h2>
              <p className="text-base sm:text-lg text-neutral-700 font-normal leading-relaxed">
                We use the collected information to enhance and personalize your experience and ensure the smooth functioning of our Services. Specifically, we may use your information for the following purposes:
              </p>

              <ul className="space-y-4 text-base sm:text-lg text-neutral-700 font-normal pl-6 list-disc marker:text-neutral-500 leading-relaxed">
                <li>
                  <strong className="font-bold text-neutral-950">Service Delivery:</strong> Provide, operate, and maintain our Services, and to fulfill your requests and orders.
                </li>
                <li>
                  <strong className="font-bold text-neutral-950">Personalization:</strong> Tailor content, offers, and recommendations based on your preferences and interactions with our website.
                </li>
                <li>
                  <strong className="font-bold text-neutral-950">Communication:</strong> Send you essential account-related communications, such as confirmations, updates, and notifications. With your consent, we may also send promotional materials.
                </li>
                <li>
                  <strong className="font-bold text-neutral-950">Improvement and Analysis:</strong> Analyze trends, track website performance, and understand user behavior to improve our Services and make data-driven decisions.
                </li>
              </ul>
            </div>

            {/* Section 3: Data Protection & Security */}
            <div className="space-y-6 pt-8 border-t border-neutral-200">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-neutral-950 tracking-tight">
                Data Protection & Security
              </h2>
              <p className="text-base sm:text-lg text-neutral-700 font-normal leading-relaxed">
                We implement robust technical and organizational security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. All payment transactions are encrypted using SSL technology and processed through PCI-DSS compliant payment processors.
              </p>
            </div>
          </div>
        )}

        {/* TERMS OF SERVICE CONTENT */}
        {activeTab === 'terms' && (
          <div className="space-y-12 animate-fadeIn">
            <p className="text-lg sm:text-xl md:text-2xl text-neutral-800 leading-relaxed font-normal">
              Welcome to VRTX Studio. By accessing or purchasing from our platform, you agree to comply with and be bound by the following Terms of Service. Please review them carefully.
            </p>

            <div className="space-y-6 pt-4">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-neutral-950 tracking-tight">
                1. General Conditions
              </h2>
              <p className="text-base sm:text-lg text-neutral-700 font-normal leading-relaxed">
                We reserve the right to refuse service to anyone for any reason at any time. You understand that your content (not including credit card information), may be transferred unencrypted over various networks.
              </p>
            </div>

            <div className="space-y-6 pt-6 border-t border-neutral-200">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-neutral-950 tracking-tight">
                2. 1-of-1 Artwork & Studio Drops
              </h2>
              <p className="text-base sm:text-lg text-neutral-700 font-normal leading-relaxed">
                Products marked as 1-of-1 or limited edition flash drops are exclusive and non-repeatable. Once sold out, editions will not be reproduced. All intellectual property and design rights remain the sole property of VRTX Studio x DHARAA.
              </p>
            </div>
          </div>
        )}

        {/* SHIPPING & RETURNS CONTENT */}
        {activeTab === 'shipping' && (
          <div className="space-y-12 animate-fadeIn">
            <p className="text-lg sm:text-xl md:text-2xl text-neutral-800 leading-relaxed font-normal">
              We ship worldwide with museum-grade protective packaging to ensure your studio garments and artwork arrive in pristine condition.
            </p>

            <div className="space-y-6 pt-4">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-neutral-950 tracking-tight">
                Worldwide Dispatch & Timelines
              </h2>
              <ul className="space-y-4 text-base sm:text-lg text-neutral-700 font-normal pl-6 list-disc marker:text-neutral-500 leading-relaxed">
                <li><strong className="font-bold text-neutral-950">Standard Shipping:</strong> 3-5 business days domestically, 7-12 business days internationally.</li>
                <li><strong className="font-bold text-neutral-950">Express Courier:</strong> 1-2 business days express dispatch via DHL / FedEx.</li>
                <li><strong className="font-bold text-neutral-950">Tracking:</strong> Full digital tracking provided via email upon dispatch.</li>
              </ul>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
