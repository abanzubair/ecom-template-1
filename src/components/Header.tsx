'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { RiShoppingBag3Line, RiUser3Line, RiMenu3Line, RiCloseLine } from 'react-icons/ri';

export const Header: React.FC = () => {
  const { totalCartItems, setIsCartOpen, isLoginOpen, setIsLoginOpen, setIsQueryOpen } = useApp();
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 py-4 transition-all duration-500 ease-in-out ${
        scrolled
          ? 'bg-neutral-950 text-white shadow-md'
          : 'bg-neutral-950/0 text-neutral-950 shadow-none'
      }`}
    >
      <div className="w-full px-6 md:px-12 lg:px-16 xl:px-20 flex items-center justify-between">
        {/* Left Logo & Studio Label */}
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-baseline space-x-3 group">
            <span className="font-extrabold text-2xl tracking-tighter uppercase font-mono group-hover:opacity-80 transition-opacity">
              VRTX
            </span>
            <span className={`text-xs tracking-widest font-light hidden sm:inline transition-colors duration-500 ease-in-out ${
              scrolled ? 'text-neutral-400' : 'text-neutral-600'
            }`}>
              Design studio
            </span>
          </Link>
        </div>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center space-x-8 text-base font-semibold tracking-tight">
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
  );
};
