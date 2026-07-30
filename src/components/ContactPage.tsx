'use client';

import React, { useState } from 'react';
import {
  RiMailLine,
  RiPhoneLine,
  RiBuilding4Line,
  RiInstagramLine,
  RiTwitterXLine,
  RiFacebookCircleLine,
  RiYoutubeLine,
  RiCheckLine,
  RiLoader4Line,
} from 'react-icons/ri';
import { useApp } from '@/context/AppContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      showToast('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 4000);
    }, 1200);
  };

  return (
    <div className="w-full bg-white text-neutral-900 min-h-screen pt-24 md:pt-32 pb-16 md:pb-24 flex items-center justify-center overflow-x-hidden">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center justify-between">
          {/* ── Left Column: Contact Meta & Social Icons ── */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-10 lg:py-6">
            {/* Contact Details List */}
            <div className="space-y-6 sm:space-y-8">
              {/* Item 1: Email */}
              <div className="flex items-start gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-[#ede9e0] text-neutral-800 flex items-center justify-center shrink-0 font-mono text-base font-semibold group-hover:bg-neutral-950 group-hover:text-white transition-colors duration-300 shadow-xs">
                  <RiMailLine className="w-5 h-5" />
                </div>
                <div className="space-y-1 pt-0.5">
                  <h3 className="text-base font-semibold text-neutral-900 tracking-tight">
                    Email to Us
                  </h3>
                  <a
                    href="mailto:stayli@company.com"
                    className="text-sm text-neutral-500 font-mono hover:text-neutral-900 transition-colors block"
                  >
                    stayli@company.com
                  </a>
                </div>
              </div>

              {/* Item 2: Phone */}
              <div className="flex items-start gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-[#ede9e0] text-neutral-800 flex items-center justify-center shrink-0 font-mono text-base font-semibold group-hover:bg-neutral-950 group-hover:text-white transition-colors duration-300 shadow-xs">
                  <RiPhoneLine className="w-5 h-5" />
                </div>
                <div className="space-y-1 pt-0.5">
                  <h3 className="text-base font-semibold text-neutral-900 tracking-tight">
                    Phone number
                  </h3>
                  <a
                    href="tel:+173681638"
                    className="text-sm text-neutral-500 font-mono hover:text-neutral-900 transition-colors block"
                  >
                    +173681638
                  </a>
                </div>
              </div>

              {/* Item 3: Office */}
              <div className="flex items-start gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-[#ede9e0] text-neutral-800 flex items-center justify-center shrink-0 font-mono text-base font-semibold group-hover:bg-neutral-950 group-hover:text-white transition-colors duration-300 shadow-xs">
                  <RiBuilding4Line className="w-5 h-5" />
                </div>
                <div className="space-y-1 pt-0.5">
                  <h3 className="text-base font-semibold text-neutral-900 tracking-tight">
                    Office
                  </h3>
                  <p className="text-sm text-neutral-500 font-mono leading-relaxed max-w-xs">
                    123 Sample St, Sydney NSW 2000 AU
                  </p>
                </div>
              </div>
            </div>

            {/* Social Icons Row at Bottom Left */}
            <div className="pt-4 lg:pt-8 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-neutral-950 text-white flex items-center justify-center hover:bg-neutral-800 transition-all duration-300 shadow-sm hover:scale-105 active:scale-95"
                title="Instagram"
              >
                <RiInstagramLine className="w-5 h-5" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-neutral-950 text-white flex items-center justify-center hover:bg-neutral-800 transition-all duration-300 shadow-sm hover:scale-105 active:scale-95"
                title="X (Twitter)"
              >
                <RiTwitterXLine className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-neutral-950 text-white flex items-center justify-center hover:bg-neutral-800 transition-all duration-300 shadow-sm hover:scale-105 active:scale-95"
                title="Facebook"
              >
                <RiFacebookCircleLine className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-neutral-950 text-white flex items-center justify-center hover:bg-neutral-800 transition-all duration-300 shadow-sm hover:scale-105 active:scale-95"
                title="YouTube"
              >
                <RiYoutubeLine className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* ── Right Column: Centered-Right Contact Form Card ── */}
          <div className="lg:col-span-7 flex justify-end w-full">
            <div className="w-full max-w-xl rounded-[2.25rem] bg-[#f2efe9] border border-neutral-200/80 p-6 sm:p-10 md:p-12 shadow-sm relative overflow-hidden">
              {/* Form Title Block */}
              <div className="space-y-1.5 mb-6">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 font-semibold block">
                  CONTACT
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-neutral-950 tracking-tight">
                  Get in touch
                </h1>
                <p className="text-xs sm:text-sm text-neutral-500 font-light pt-0.5">
                  We&apos;d love to hear from you!
                </p>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Input */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="text-xs font-semibold text-neutral-800 block tracking-tight">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 rounded-2xl bg-[#e8e4dc]/70 border border-neutral-300/60 focus:border-neutral-950 focus:bg-white outline-none transition-all duration-300 text-neutral-900 text-sm placeholder:text-neutral-400 font-medium"
                  />
                </div>

                {/* Email Input */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="text-xs font-semibold text-neutral-800 block tracking-tight">
                    Your email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Your email address"
                    className="w-full px-4 py-3 rounded-2xl bg-[#e8e4dc]/70 border border-neutral-300/60 focus:border-neutral-950 focus:bg-white outline-none transition-all duration-300 text-neutral-900 text-sm placeholder:text-neutral-400 font-medium"
                  />
                </div>

                {/* Message Input */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="text-xs font-semibold text-neutral-800 block tracking-tight">
                    Your messages
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Your messages here"
                    className="w-full px-4 py-3.5 rounded-2xl bg-[#e8e4dc]/70 border border-neutral-300/60 focus:border-neutral-950 focus:bg-white outline-none transition-all duration-300 text-neutral-900 text-sm placeholder:text-neutral-400 font-medium resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-neutral-950 text-white font-semibold text-xs uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition-all duration-300 shadow-md active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <RiLoader4Line className="w-4 h-4 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : submitted ? (
                      <>
                        <RiCheckLine className="w-4 h-4 text-emerald-400" />
                        <span>Sent!</span>
                      </>
                    ) : (
                      <span>Submit</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
