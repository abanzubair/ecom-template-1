'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { RiShoppingBag3Line, RiUser3Line, RiMenu3Line, RiCloseLine } from 'react-icons/ri';

export const Header: React.FC = () => {
  const { totalCartItems, setIsCartOpen, isLoginOpen, setIsLoginOpen, setIsQueryOpen, storeInfo } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let scrollTimer: NodeJS.Timeout;

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Add is-scrolling class while scrolling, remove after 1 second of inactivity
      document.body.classList.add('is-scrolling');
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        document.body.classList.remove('is-scrolling');
      }, 1000);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimer);
    };
  }, []);

  const customLinks = storeInfo.config?.nav_links?.filter((l) => l.is_active);
  const announcement = storeInfo.config?.announcement;
  const accentColor = storeInfo.config?.accent_color || storeInfo.accentColor || '#d97706';

  return (
    <>
      {/* Top Announcement Bar if enabled */}
      {announcement?.enabled && announcement.text && (
        <div
          className="fixed top-0 left-0 right-0 z-50 text-[11px] font-medium tracking-wide text-white py-1.5 px-4 text-center truncate shadow-sm transition-all"
          style={{ backgroundColor: accentColor }}
        >
          {announcement.link ? (
            <a href={announcement.link} className="hover:underline">
              {announcement.text}
            </a>
          ) : (
            <span>{announcement.text}</span>
          )}
        </div>
      )}

      <header
        className={`fixed left-0 right-0 z-40 py-4 transition-all duration-500 ease-in-out ${
          announcement?.enabled && announcement.text ? 'top-7' : 'top-0'
        } ${
          scrolled
            ? 'bg-neutral-950 text-white shadow-md'
            : 'bg-neutral-950/0 text-neutral-950 shadow-none'
        }`}
      >
        <div className="w-full px-6 md:px-12 lg:px-16 xl:px-20 flex items-center justify-between">
          {/* Left Logo & Studio Label */}
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-3 group">
              {storeInfo.logoUrl ? (
                <img src={storeInfo.logoUrl} alt={storeInfo.storeName} className="h-8 max-w-[140px] object-contain" />
              ) : (
                <span className="font-extrabold text-2xl tracking-tighter uppercase font-mono group-hover:opacity-80 transition-opacity">
                  {storeInfo.storeName || 'VRTX'}
                </span>
              )}
            </Link>
          </div>

          {/* Center Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-8 text-base font-semibold tracking-tight">
            {customLinks && customLinks.length > 0 ? (
              customLinks.map((link) =>
                link.is_external ? (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-70 transition-opacity duration-300"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.id}
                    href={link.url}
                    className="hover:opacity-70 transition-opacity duration-300"
                  >
                    {link.label}
                  </Link>
                )
              )
            ) : (
              <>
                <Link href="/about" className="hover:opacity-70 transition-opacity duration-300">
                  About
                </Link>
                <Link href="/products" className="hover:opacity-70 transition-opacity duration-300">
                  Products
                </Link>
                <Link href="#artists" className="hover:opacity-70 transition-opacity duration-300">
                  Artists
                </Link>
                <Link href="#blog" className="hover:opacity-70 transition-opacity duration-300">
                  Blog
                </Link>
                <Link href="/contact" className="hover:opacity-70 transition-opacity duration-300">
                  Contact
                </Link>
              </>
            )}
          </nav>

          {/* Right CTA / Actions */}
          <div className="hidden md:flex items-center space-x-6 text-base font-semibold">
            <button
              onClick={() => setIsLoginOpen(true)}
              className="hover:opacity-70 transition-opacity duration-300 flex items-center space-x-1.5"
            >
              <RiUser3Line className="w-4 h-4" />
              <span>Login</span>
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="hover:opacity-70 transition-opacity duration-300 flex items-center space-x-1.5"
            >
              <RiShoppingBag3Line className="w-4 h-4" />
              <span>Cart ({totalCartItems})</span>
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex items-center space-x-5 md:hidden">
            <button
              onClick={() => setIsLoginOpen(true)}
              className="text-sm font-semibold uppercase tracking-wider hover:opacity-70 transition-opacity duration-300 flex items-center space-x-1.5"
            >
              <RiUser3Line className="w-5 h-5" />
              <span>Login</span>
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="text-sm font-semibold uppercase tracking-wider hover:opacity-70 transition-opacity duration-300 flex items-center space-x-1.5"
            >
              <RiShoppingBag3Line className="w-5 h-5" />
              <span>({totalCartItems})</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 rounded-md hover:opacity-70 transition-opacity duration-300"
            >
              {mobileMenuOpen ? <RiCloseLine className="w-6 h-6" /> : <RiMenu3Line className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-neutral-900 text-white px-6 py-8 border-b border-neutral-800 space-y-6 animate-fadeIn">
            <div className="flex flex-col space-y-4 text-base font-medium">
              {customLinks && customLinks.length > 0 ? (
                customLinks.map((link) => (
                  <Link
                    key={link.id}
                    href={link.url}
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-neutral-400"
                  >
                    {link.label}
                  </Link>
                ))
              ) : (
                <>
                  <Link
                    href="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-neutral-400"
                  >
                    About
                  </Link>
                  <Link
                    href="/products"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-neutral-400"
                  >
                    Products
                  </Link>
                  <Link
                    href="#artists"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-neutral-400"
                  >
                    Artists
                  </Link>
                  <Link
                    href="#blog"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-neutral-400"
                  >
                    Blog
                  </Link>
                  <Link
                    href="#designs"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-neutral-400"
                  >
                    Designs
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-neutral-400"
                  >
                    Contact
                  </Link>
                </>
              )}
            </div>
            <div className="pt-4 border-t border-neutral-800 flex flex-col space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsLoginOpen(true);
                }}
                className="w-full py-3 bg-white text-black font-semibold text-xs uppercase tracking-widest text-center rounded-sm"
              >
                Account Login
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsQueryOpen(true);
                }}
                className="w-full py-3 border border-neutral-700 text-neutral-300 font-semibold text-xs uppercase tracking-widest text-center rounded-sm"
              >
                Send Query
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
