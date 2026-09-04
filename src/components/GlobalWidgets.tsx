'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { createBoutiqueInquiry } from '@/services/weave365';

import {
  RiChat3Line,
  RiPhoneLine,
  RiCloseLine,
  RiSendPlaneLine,
  RiQuestionLine,
  RiCheckboxCircleLine,
  RiInstagramLine,
  RiShoppingBag3Line,
  RiUser3Line,
  RiLockLine,
  RiMailLine,
} from 'react-icons/ri';

export const GlobalWidgets: React.FC = () => {
  const {
    isLoginOpen,
    setIsLoginOpen,
    isQueryOpen,
    setIsQueryOpen,
    isSocialFeedOpen,
    setIsSocialFeedOpen,
    selectedProduct,
    setSelectedProduct,
    addToCart,
    toastMessage,
    showToast,
    storeInfo
  } = useApp();

  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [waMessage, setWaMessage] = useState('');
  const [waChatName, setWaChatName] = useState(() => (typeof window !== 'undefined' ? localStorage.getItem('weave365_buyer_name') || '' : ''));
  const [waChatPhone, setWaChatPhone] = useState(() => (typeof window !== 'undefined' ? localStorage.getItem('weave365_buyer_phone') || '' : ''));
  const [waChatError, setWaChatError] = useState<string | null>(null);
  const [hideFloatingButtons, setHideFloatingButtons] = useState(false);

  // Hide floating action buttons when footer comes into view
  React.useEffect(() => {
    const footerEl = document.getElementById('site-footer');
    if (!footerEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHideFloatingButtons(entry.isIntersecting);
        if (entry.isIntersecting) {
          setIsWhatsAppOpen(false);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(footerEl);
    return () => observer.disconnect();
  }, []);

  // Query form state
  const [queryData, setQueryData] = useState({
    name: typeof window !== 'undefined' ? localStorage.getItem('weave365_buyer_name') || '' : '',
    phone: typeof window !== 'undefined' ? localStorage.getItem('weave365_buyer_phone') || '' : '',
    email: '',
    subject: 'Catalog Inquiry',
    message: ''
  });
  const [queryPhoneError, setQueryPhoneError] = useState<string | null>(null);
  const [querySubmitted, setQuerySubmitted] = useState(false);

  const handleQuerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = queryData.phone.replace(/[^0-9+]/g, '').trim();
    if (!cleanPhone || cleanPhone.length < 8) {
      setQueryPhoneError('Please enter a valid WhatsApp number (min 8 digits)');
      return;
    }
    if (!queryData.name.trim()) {
      setQueryPhoneError('Please enter your name');
      return;
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem('weave365_buyer_name', queryData.name.trim());
      localStorage.setItem('weave365_buyer_phone', cleanPhone);
    }

    setQuerySubmitted(true);

    try {
      await createBoutiqueInquiry({
        customerName: queryData.name.trim(),
        customerPhone: cleanPhone,
        customerEmail: queryData.email || undefined,
        subject: queryData.subject,
        message: `${queryData.message} | Buyer WhatsApp: ${cleanPhone}`,
      });
    } catch (err) {
      console.warn('Inquiry submission error:', err);
    }

    const waText = "*Inquiry from " + queryData.name.trim() + "*\n" +
      "WhatsApp: " + cleanPhone + "\n" +
      (queryData.email ? "Email: " + queryData.email + "\n" : "") +
      "Topic: " + queryData.subject + "\n" +
      "Message: " + queryData.message;
    openWhatsAppDirect(waText);

    setTimeout(() => {
      setQuerySubmitted(false);
      setIsQueryOpen(false);
      showToast('Your inquiry has been logged and sent to WhatsApp!');
      setQueryData({ 
        name: queryData.name.trim(), 
        phone: cleanPhone, 
        email: '', 
        subject: 'Catalog Inquiry', 
        message: '' 
      });
    }, 1000);
  };

  const handleWhatsAppChatSubmit = async (e?: React.FormEvent, customMsg?: string) => {
    if (e) e.preventDefault();
    const cleanPhone = waChatPhone.replace(/[^0-9+]/g, '').trim();
    if (!cleanPhone || cleanPhone.length < 8) {
      setWaChatError('Please enter a valid WhatsApp number (min 8 digits)');
      return;
    }
    if (!waChatName.trim()) {
      setWaChatError('Please enter your name');
      return;
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem('weave365_buyer_name', waChatName.trim());
      localStorage.setItem('weave365_buyer_phone', cleanPhone);
    }

    const outgoingMsg = customMsg || waMessage || `Hello ${storeInfo.storeName}! I am interested in your curated collection.`;

    try {
      await createBoutiqueInquiry({
        customerName: waChatName.trim(),
        customerPhone: cleanPhone,
        subject: 'WhatsApp Concierge Inquiry',
        message: `${outgoingMsg} | Buyer WhatsApp: ${cleanPhone}`,
      });
    } catch (_) {}

    const text = `*Inquiry from ${waChatName.trim()}*\nWhatsApp: ${cleanPhone}\n\n${outgoingMsg}`;
    openWhatsAppDirect(text);
    setIsWhatsAppOpen(false);
  };

  const openWhatsAppDirect = (presetMsg?: string) => {
    const text = encodeURIComponent(presetMsg || waMessage || `Hello ${storeInfo.storeName}! I am interested in your curated collection.`);
    const cleanNumber = storeInfo.whatsapp ? storeInfo.whatsapp.replace(/\D/g, '') : '';
    const waUrl = cleanNumber ? `https://wa.me/${cleanNumber}?text=${text}` : `https://wa.me/?text=${text}`;
    window.open(waUrl, '_blank');
  };

  return (
    <>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-neutral-900 text-white text-xs md:text-sm font-medium px-6 py-3 rounded-full shadow-2xl border border-neutral-700 flex items-center space-x-2 animate-bounce">
          <RiCheckboxCircleLine className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating Action Buttons Bottom-Right (WhatsApp + Quick Call) - Hides when scrolled to Footer */}
      <div
        className={`fixed bottom-6 right-6 z-40 flex flex-col space-y-3 items-end transition-all duration-500 transform ${
          hideFloatingButtons
            ? 'opacity-0 pointer-events-none translate-y-8'
            : 'opacity-100 pointer-events-auto translate-y-0'
        }`}
      >
        {/* Direct Call Button */}
        {storeInfo.whatsapp && (
          <a
            href={`tel:${storeInfo.whatsapp}`}
            className="w-12 h-12 bg-neutral-900 hover:bg-black text-white rounded-full shadow-lg border border-neutral-700 flex items-center justify-center transition-transform hover:scale-105 group"
            title="Direct Call Option"
          >
            <RiPhoneLine className="w-5 h-5 text-neutral-300 group-hover:text-white" />
          </a>
        )}

        {/* WhatsApp Chat Launcher Button */}
        <button
          onClick={() => setIsWhatsAppOpen(!isWhatsAppOpen)}
          className="w-13 h-13 p-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl flex items-center justify-center transition-all transform hover:scale-105 relative"
          title="WhatsApp Chat"
        >
          <RiChat3Line className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white animate-pulse" />
        </button>
      </div>

      {/* WhatsApp Chat Popover Dialog */}
      {isWhatsAppOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="bg-emerald-700 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold font-mono">
                VRTX
              </div>
              <div>
                <h4 className="font-bold text-sm">VRTX Studio Concierge</h4>
                <p className="text-xs text-emerald-100 flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block mr-1" />
                  Online • Replies instantly
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsWhatsAppOpen(false)}
              className="text-emerald-200 hover:text-white"
            >
              <RiCloseLine className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-neutral-50 space-y-3 text-xs max-h-72 overflow-y-auto">
            <div className="bg-white p-3 rounded-lg shadow-sm border border-neutral-200 text-neutral-800 space-y-1">
              <p className="font-semibold text-neutral-900">Welcome to VRTX Design Studio 👋</p>
              <p className="text-neutral-600">
                How can we assist you today? You can inquire about 1-of-1 art availability, custom merch sizing, or order support.
              </p>
            </div>

            {/* Quick Presets */}
            <div className="space-y-1.5 pt-2">
              <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Quick Prompts:</p>
              <button
                type="button"
                onClick={() => setWaMessage('Hi, I would like to check handloom silk saree collection & availability.')}
                className="w-full text-left p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 rounded border border-emerald-200 transition-colors flex items-center justify-between"
              >
                <span>Inquire About Collection</span>
                <RiSendPlaneLine className="w-3 h-3 text-emerald-600" />
              </button>
            </div>
          </div>

          {/* Form with required Buyer Contact */}
          <form onSubmit={handleWhatsAppChatSubmit} className="p-3.5 bg-white border-t border-neutral-200 space-y-2">
            {waChatError && (
              <p className="text-[11px] text-red-600 font-medium">{waChatError}</p>
            )}
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                required
                value={waChatName}
                onChange={(e) => {
                  setWaChatName(e.target.value);
                  if (waChatError) setWaChatError(null);
                }}
                placeholder="Your Name *"
                className="w-full px-2.5 py-1.5 text-xs bg-neutral-50 border border-neutral-300 rounded focus:outline-none focus:border-emerald-600"
              />
              <input
                type="tel"
                required
                value={waChatPhone}
                onChange={(e) => {
                  setWaChatPhone(e.target.value);
                  if (waChatError) setWaChatError(null);
                }}
                placeholder="WhatsApp (+91...) *"
                className="w-full px-2.5 py-1.5 text-xs bg-neutral-50 border border-neutral-300 rounded focus:outline-none focus:border-emerald-600 font-mono"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={waMessage}
                onChange={(e) => setWaMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md focus:outline-none focus:border-emerald-600"
              />
              <button
                type="submit"
                className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-colors shrink-0"
              >
                <RiSendPlaneLine className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}



      {/* Query Form Modal */}
      {isQueryOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white text-neutral-900 max-w-md w-full rounded-xl border border-neutral-300 shadow-2xl overflow-hidden animate-fadeIn relative">
            <button
              onClick={() => setIsQueryOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-black"
            >
              <RiCloseLine className="w-6 h-6" />
            </button>

            <div className="p-8">
              <div className="flex items-center space-x-2 text-xs font-mono uppercase text-neutral-500 mb-1">
                <RiQuestionLine className="w-4 h-4 text-neutral-800" />
                <span>Customer Desk</span>
              </div>
              <h3 className="text-2xl font-bold font-display tracking-tight text-neutral-900 mb-2">
                Send a Query
              </h3>
              <p className="text-xs text-neutral-500 mb-6">
                Have questions regarding order shipping, flash design reservation, or apparel care? Drop us a message below.
              </p>

              {querySubmitted ? (
                <div className="py-8 text-center space-y-2">
                  <RiCheckboxCircleLine className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="text-base font-bold">Query Dispatched</h4>
                  <p className="text-xs text-neutral-500">We will respond to your email shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleQuerySubmit} className="space-y-4 text-xs">
                  {queryPhoneError && (
                    <div className="p-2 bg-red-50 border border-red-200 rounded text-red-700 text-xs">
                      {queryPhoneError}
                    </div>
                  )}
                  <div>
                    <label className="block font-mono uppercase text-neutral-600 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={queryData.name}
                      onChange={(e) => {
                        setQueryData({ ...queryData, name: e.target.value });
                        if (queryPhoneError) setQueryPhoneError(null);
                      }}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full px-4 py-2 bg-neutral-50 border border-neutral-300 focus:outline-none focus:border-black rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-mono uppercase text-neutral-600 mb-1">WhatsApp Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={queryData.phone}
                      onChange={(e) => {
                        setQueryData({ ...queryData, phone: e.target.value });
                        if (queryPhoneError) setQueryPhoneError(null);
                      }}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-4 py-2 bg-neutral-50 border border-neutral-300 focus:outline-none focus:border-black rounded-sm font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-mono uppercase text-neutral-600 mb-1">Email Address (optional)</label>
                    <input
                      type="email"
                      value={queryData.email}
                      onChange={(e) => setQueryData({ ...queryData, email: e.target.value })}
                      placeholder="sarah@domain.com"
                      className="w-full px-4 py-2 bg-neutral-50 border border-neutral-300 focus:outline-none focus:border-black rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-mono uppercase text-neutral-600 mb-1">Subject</label>
                    <input
                      type="text"
                      required
                      value={queryData.subject}
                      onChange={(e) => setQueryData({ ...queryData, subject: e.target.value })}
                      className="w-full px-4 py-2 bg-neutral-50 border border-neutral-300 focus:outline-none focus:border-black rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-mono uppercase text-neutral-600 mb-1">Message</label>
                    <textarea
                      rows={3}
                      required
                      value={queryData.message}
                      onChange={(e) => setQueryData({ ...queryData, message: e.target.value })}
                      placeholder="How can we help..."
                      className="w-full px-4 py-2 bg-neutral-50 border border-neutral-300 focus:outline-none focus:border-black rounded-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-black hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider transition-colors rounded-sm"
                  >
                    Submit Query
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Account Login / Register Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-neutral-900 text-white max-w-md w-full rounded-xl border border-neutral-800 shadow-2xl overflow-hidden animate-fadeIn relative">
            <button
              onClick={() => setIsLoginOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white"
            >
              <RiCloseLine className="w-6 h-6" />
            </button>

            <div className="p-8 space-y-6">
              <div className="text-center space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">VRTX Member Portal</span>
                <h3 className="text-2xl font-bold font-display text-white">Sign In to Your Account</h3>
                <p className="text-xs text-neutral-400">Access exclusive drops, order tracking & wishlist items.</p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsLoginOpen(false);
                  showToast('Signed in successfully! Welcome back.');
                }}
                className="space-y-4 text-sm"
              >
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">Email Address</label>
                  <div className="relative">
                    <RiMailLine className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="alexander@domain.com"
                      className="w-full pl-9 pr-4 py-2.5 bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:border-white rounded-sm text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">Password</label>
                  <div className="relative">
                    <RiLockLine className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••••••"
                      className="w-full pl-9 pr-4 py-2.5 bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:border-white rounded-sm text-xs"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-neutral-400 pt-1">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="rounded bg-neutral-800 border-neutral-700 text-black focus:ring-0" />
                    <span>Remember me</span>
                  </label>
                  <a href="#forgot" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-white text-black hover:bg-neutral-200 font-bold text-xs uppercase tracking-widest transition-colors rounded-sm mt-2"
                >
                  Sign In
                </button>
              </form>

              <div className="pt-4 border-t border-neutral-800 text-center text-xs text-neutral-400">
                <span>Don't have an account? </span>
                <button
                  onClick={() => {
                    setIsLoginOpen(false);
                    showToast('Registration is open! Fill out details to join VRTX.');
                  }}
                  className="text-white font-semibold underline underline-offset-4 hover:opacity-80"
                >
                  Create Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Social Media Feed Drawer */}
      {isSocialFeedOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end">
          <div className="bg-neutral-900 text-white max-w-md w-full h-full shadow-2xl p-6 overflow-y-auto border-l border-neutral-800 animate-fadeIn">
            <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
              <div className="flex items-center space-x-2">
                <RiInstagramLine className="w-5 h-5 text-pink-500" />
                <span className="font-bold text-base font-display">@vrtx.design.studio</span>
              </div>
              <button onClick={() => setIsSocialFeedOpen(false)} className="text-neutral-400 hover:text-white">
                <RiCloseLine className="w-6 h-6" />
              </button>
            </div>

            <div className="py-6 space-y-6">
              <p className="text-xs text-neutral-400 font-light">
                Live updates & process videos from our studio floor in real-time.
              </p>

              {/* Feed Items */}
              {[
                { title: 'Fresh Linework Execution', code: '#VRTX-001', tag: 'Reels', likes: '1.4k' },
                { title: 'Heavyweight Studio Hoodie drop', code: '#MERCH', tag: 'Collection', likes: '2.8k' },
                { title: 'Birds & Skull original flash stencil', code: '#FLASH', tag: 'Studio', likes: '3.1k' },
              ].map((post, idx) => (
                <div key={idx} className="bg-neutral-800 rounded-lg p-4 space-y-3 border border-neutral-700/60">
                  <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
                    <span>{post.code}</span>
                    <span className="px-2 py-0.5 bg-neutral-700 text-neutral-200 rounded text-[10px]">{post.tag}</span>
                  </div>
                  <div className="h-44 bg-neutral-900 rounded flex items-center justify-center border border-neutral-700 text-neutral-500 font-mono text-xs">
                    [ Live Studio Video Reel Preview ]
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-neutral-200">{post.title}</span>
                    <span className="text-neutral-400">{post.likes} ❤️</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-center items-center p-4">
          <div className="bg-white text-neutral-900 max-w-3xl w-full rounded-2xl shadow-2xl overflow-hidden animate-fadeIn relative grid grid-cols-1 md:grid-cols-2">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/10 hover:bg-black/20 text-black flex items-center justify-center transition-colors"
            >
              <RiCloseLine className="w-5 h-5" />
            </button>

            {/* Product Image */}
            <div className="bg-neutral-100 p-8 flex items-center justify-center relative border-r border-neutral-200">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                className="max-h-80 w-auto object-contain transition-transform duration-500 hover:scale-105"
              />
              <span className="absolute top-4 left-4 text-xs font-mono font-bold bg-neutral-900 text-white px-2.5 py-1 rounded-sm">
                {selectedProduct.code}
              </span>
            </div>

            {/* Product Info */}
            <div className="p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center space-x-2 text-xs font-mono uppercase text-emerald-700 font-bold mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                  <span>{selectedProduct.status}</span>
                  <span>•</span>
                  <span>{selectedProduct.category}</span>
                </div>

                <h3 className="text-2xl font-bold font-display tracking-tight text-neutral-900 mb-2">
                  {selectedProduct.title}
                </h3>

                <p className="text-3xl font-extrabold font-mono text-neutral-900 mb-4">
                  {selectedProduct.currency}{selectedProduct.price}
                </p>

                <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                  {selectedProduct.fullDescription || selectedProduct.description}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-neutral-200">
                <button
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="w-full py-3.5 bg-black hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-widest transition-colors rounded-sm flex items-center justify-center space-x-2"
                >
                  <RiShoppingBag3Line className="w-4 h-4" />
                  <span>Add to Cart ({selectedProduct.currency}{selectedProduct.price})</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
