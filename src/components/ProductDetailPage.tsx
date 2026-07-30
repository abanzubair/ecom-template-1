'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { ProductCard } from '@/components/ProductCard';
import { Product } from '@/types';
import {
  RiStarFill,
  RiShoppingBag3Line,
  RiHeartLine,
  RiHeartFill,
  RiTruckLine,
  RiRefreshLine,
  RiShieldCheckLine,
  RiRulerLine,
  RiArrowRightLine,
  RiArrowDownLine,
  RiSearchLine,
  RiShirtLine,
  RiSparklingLine,
  RiCheckLine
} from 'react-icons/ri';

const GALLERY_IMAGES = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format&fit=crop',
    alt: 'Essential Oversized Hoodie Front View'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1200&auto=format&fit=crop',
    alt: 'Essential Oversized Hoodie Side View'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=1200&auto=format&fit=crop',
    alt: 'Essential Oversized Hoodie Back View'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1200&auto=format&fit=crop',
    alt: 'Essential Oversized Hoodie Texture Detail'
  }
];

const COLORS = [
  { name: 'Charcoal Gray', hex: '#4a4e53', bgClass: 'bg-[#4a4e53]' },
  { name: 'Light Gray', hex: '#d1d5db', bgClass: 'bg-[#d1d5db]' },
  { name: 'Cream / Beige', hex: '#eae5d9', bgClass: 'bg-[#eae5d9]' },
  { name: 'Solid Black', hex: '#1a1a1a', bgClass: 'bg-[#1a1a1a]' }
];

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

const RELATED_PRODUCTS: Product[] = [
  {
    id: 'rel-1',
    code: 'REL-01',
    title: 'Minimal Hoodie',
    category: 'merch',
    price: 54.99,
    currency: '$',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop',
    badge: 'New',
    description: 'Minimalist heavyweight hoodie with clean aesthetic.'
  },
  {
    id: 'rel-2',
    code: 'REL-02',
    title: 'Classic Sweatshirt',
    category: 'merch',
    price: 49.99,
    currency: '$',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800&auto=format&fit=crop',
    badge: 'Popular',
    description: 'Classic crewneck sweatshirt in organic French terry cotton.'
  },
  {
    id: 'rel-3',
    code: 'REL-03',
    title: 'Zip Up Hoodie',
    category: 'merch',
    price: 64.99,
    currency: '$',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop',
    badge: 'Limited',
    description: 'Full zip oversized hoodie with dual pockets.'
  },
  {
    id: 'rel-4',
    code: 'REL-04',
    title: 'Essential Hoodie',
    category: 'merch',
    price: 59.99,
    currency: '$',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=800&auto=format&fit=crop',
    badge: '33% OFF',
    description: 'Premium heavyweight cotton hoodie with oversized fit.'
  }
];

export const ProductDetailPage: React.FC = () => {
  const { addToCart, showToast } = useApp();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedSize, setSelectedSize] = useState('M');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'materials' | 'size' | 'shipping'>('details');

  const mainProduct: Product = {
    id: 'prod-essential-hoodie',
    code: 'HOODIE-01',
    title: 'Essential Oversized Hoodie',
    category: 'merch',
    price: 59.99,
    currency: '$',
    status: 'Available',
    image: GALLERY_IMAGES[selectedImage].url,
    badge: '33% OFF',
    description: 'Premium heavyweight cotton hoodie with an oversized fit for ultimate comfort and modern style.'
  };

  const handleAddToCart = () => {
    addToCart(mainProduct);
    showToast(`Added ${mainProduct.title} (${selectedColor.name}, Size ${selectedSize}) to cart!`);
  };

  return (
    <div className="w-full bg-white text-neutral-900 pt-28 pb-20 font-sans select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* TOP PRODUCT SECTION: Image Gallery (Left) + Product Info (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pb-6">
          
          {/* LEFT: Thumbnail Column + Main Vertical Image Card (6 Columns) */}
          <div className="lg:col-span-6 flex flex-col sm:flex-row gap-4 w-full items-start">
            
            {/* Vertical Thumbnail List */}
            <div className="flex sm:flex-col gap-3 order-2 sm:order-1 justify-center sm:justify-start">
              <div className="flex sm:flex-col gap-3">
                {GALLERY_IMAGES.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-16 h-16 sm:w-20 sm:h-24 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === idx
                        ? 'border-black shadow-sm'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              <div className="hidden sm:flex items-center justify-center pt-2">
                <button className="w-8 h-8 rounded-full border border-neutral-300 hover:border-black flex items-center justify-center text-neutral-600 hover:text-black transition-colors">
                  <RiArrowDownLine className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Main Tall Vertical Image Display Card */}
            <div className="relative flex-1 rounded-3xl overflow-hidden bg-[#f4f4f4] h-[500px] sm:h-[580px] lg:h-[640px] w-full max-w-[480px] order-1 sm:order-2 shadow-xs group shrink-0">
              <img
                src={GALLERY_IMAGES[selectedImage].url}
                alt={GALLERY_IMAGES[selectedImage].alt}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              {/* Zoom Button Icon */}
              <button
                onClick={() => showToast('Image zoom activated')}
                className="absolute bottom-5 right-5 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-neutral-200/80 shadow-md flex items-center justify-center text-neutral-800 hover:text-black hover:scale-110 transition-all"
              >
                <RiSearchLine className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* RIGHT: Product Details & Controls (6 Columns) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Pill Tag */}
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-wider bg-neutral-200/80 text-neutral-700 px-3.5 py-1.5 rounded-full">
                New Arrival
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display text-neutral-950">
              Essential Oversized Hoodie
            </h1>

            {/* Ratings */}
            <div className="flex items-center space-x-2 text-sm text-neutral-600">
              <div className="flex items-center text-amber-500 space-x-0.5">
                {[...Array(5)].map((_, i) => (
                  <RiStarFill key={i} className="w-4 h-4 text-black" />
                ))}
              </div>
              <span className="font-semibold text-neutral-900 ml-1">4.8</span>
              <span className="text-neutral-400">(128 reviews)</span>
            </div>

            {/* Price & Discount */}
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-extrabold text-neutral-950">$59.99</span>
              <span className="text-lg text-neutral-400 line-through">$89.99</span>
              <span className="text-xs font-bold bg-black text-white px-2.5 py-1 rounded-sm uppercase tracking-wider">
                33% OFF
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-neutral-600 leading-relaxed font-light">
              Premium heavyweight cotton hoodie with an oversized fit for ultimate comfort and modern style.
            </p>

            <div className="h-px w-full bg-neutral-200 my-6" />

            {/* Color Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider">
                <span className="text-neutral-500">Color:</span>
                <span className="font-bold text-neutral-900">{selectedColor.name}</span>
              </div>
              <div className="flex items-center space-x-3">
                {COLORS.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    className={`w-8 h-8 rounded-full ${c.bgClass} transition-all duration-300 relative flex items-center justify-center ${
                      selectedColor.name === c.name
                        ? 'ring-2 ring-offset-2 ring-black scale-110'
                        : 'opacity-80 hover:opacity-100'
                    }`}
                  >
                    {selectedColor.name === c.name && (
                      <RiCheckLine className={`w-4 h-4 ${c.name === 'Cream / Beige' || c.name === 'Light Gray' ? 'text-black' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider">
                <span className="text-neutral-500">Size: <strong className="text-neutral-900">{selectedSize}</strong></span>
                <button
                  onClick={() => showToast('Size guide: Fits true to size with an oversized silhouette.')}
                  className="flex items-center space-x-1 text-neutral-700 hover:text-black underline underline-offset-4 transition-colors"
                >
                  <RiRulerLine className="w-4 h-4" />
                  <span>Size Guide</span>
                </button>
              </div>
              <div className="flex items-center gap-2.5">
                {SIZES.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`h-11 px-4 sm:px-5 rounded-xl font-bold text-xs transition-all duration-300 border ${
                      selectedSize === sz
                        ? 'bg-black text-white border-black shadow-sm'
                        : 'bg-white text-neutral-800 border-neutral-200 hover:border-black'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart & Wishlist Actions */}
            <div className="pt-4 flex items-center gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 bg-black hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-widest rounded-2xl transition-all duration-300 shadow-md flex items-center justify-center space-x-2"
              >
                <RiShoppingBag3Line className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={() => {
                  setIsWishlisted(!isWishlisted);
                  showToast(!isWishlisted ? 'Added Essential Oversized Hoodie to wishlist' : 'Removed from wishlist');
                }}
                className="w-14 h-14 rounded-2xl border border-neutral-300 hover:border-black flex items-center justify-center transition-colors"
              >
                {isWishlisted ? (
                  <RiHeartFill className="w-6 h-6 text-red-500" />
                ) : (
                  <RiHeartLine className="w-6 h-6 text-neutral-700 hover:text-black" />
                )}
              </button>
            </div>

            {/* Value Guarantee Perks */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-neutral-200 text-center">
              <div className="flex flex-col items-center space-y-1">
                <RiTruckLine className="w-5 h-5 text-neutral-800" />
                <span className="text-xs font-bold text-neutral-900">Free Shipping</span>
                <span className="text-[11px] text-neutral-500 font-light">On orders over $99</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <RiRefreshLine className="w-5 h-5 text-neutral-800" />
                <span className="text-xs font-bold text-neutral-900">Easy Returns</span>
                <span className="text-[11px] text-neutral-500 font-light">30-day return policy</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <RiShieldCheckLine className="w-5 h-5 text-neutral-800" />
                <span className="text-xs font-bold text-neutral-900">Secure Payment</span>
                <span className="text-[11px] text-neutral-500 font-light">100% secure checkout</span>
              </div>
            </div>

          </div>
        </div>

        {/* MIDDLE SECTION: Details & Specs Tabs + Texture Image */}
        <div className="mt-20 pt-12 border-t border-neutral-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Specs & Bullet Details */}
            <div className="lg:col-span-6 space-y-8">
              {/* Tab Navigation */}
              <div className="flex items-center space-x-10 border-b border-neutral-200 pb-3.5 text-base sm:text-lg font-bold">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-3.5 -mb-3.5 transition-colors ${
                    activeTab === 'details'
                      ? 'border-b-2 border-black text-black'
                      : 'text-neutral-400 hover:text-neutral-700'
                  }`}
                >
                  Details
                </button>
                <button
                  onClick={() => setActiveTab('materials')}
                  className={`pb-3.5 -mb-3.5 transition-colors ${
                    activeTab === 'materials'
                      ? 'border-b-2 border-black text-black'
                      : 'text-neutral-400 hover:text-neutral-700'
                  }`}
                >
                  Materials
                </button>
                <button
                  onClick={() => setActiveTab('size')}
                  className={`pb-3.5 -mb-3.5 transition-colors ${
                    activeTab === 'size'
                      ? 'border-b-2 border-black text-black'
                      : 'text-neutral-400 hover:text-neutral-700'
                  }`}
                >
                  Size & Fit
                </button>
                <button
                  onClick={() => setActiveTab('shipping')}
                  className={`pb-3.5 -mb-3.5 transition-colors ${
                    activeTab === 'shipping'
                      ? 'border-b-2 border-black text-black'
                      : 'text-neutral-400 hover:text-neutral-700'
                  }`}
                >
                  Shipping & Returns
                </button>
              </div>

              {/* Tab Content */}
              <div className="space-y-6">
                <p className="text-base sm:text-lg text-neutral-700 leading-relaxed font-normal">
                  Crafted from high-quality heavyweight cotton, this hoodie delivers unmatched comfort and durability. The oversized fit and minimal design make it a versatile staple for any wardrobe.
                </p>

                {/* Feature Bullet List */}
                <div className="space-y-4 text-sm sm:text-base text-neutral-900 font-semibold">
                  <div className="flex items-center space-x-3.5">
                    <RiShoppingBag3Line className="w-5 h-5 text-neutral-600" />
                    <span>Oversized fit</span>
                  </div>
                  <div className="flex items-center space-x-3.5">
                    <RiShirtLine className="w-5 h-5 text-neutral-600" />
                    <span>Soft & heavyweight fabric</span>
                  </div>
                  <div className="flex items-center space-x-3.5">
                    <RiSparklingLine className="w-5 h-5 text-neutral-600" />
                    <span>Adjustable drawstring hood</span>
                  </div>
                  <div className="flex items-center space-x-3.5">
                    <RiCheckLine className="w-5 h-5 text-neutral-600" />
                    <span>Ribbed cuffs and hem</span>
                  </div>
                  <div className="flex items-center space-x-3.5">
                    <RiShirtLine className="w-5 h-5 text-neutral-600" />
                    <span>Unisex style</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Macro Texture Display Image */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden h-80 sm:h-96 shadow-md bg-neutral-900 relative group">
                <img
                  src="https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1200&auto=format&fit=crop"
                  alt="ESSENTIALS COLLECTION Texture Close Up"
                  className="w-full h-full object-cover object-center grayscale contrast-125 opacity-90 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 flex flex-col justify-end p-8 text-white">
                  <span className="text-2xl sm:text-3xl font-extrabold tracking-widest uppercase font-mono drop-shadow-md">
                    ESSENTIALS
                  </span>
                  <span className="text-xs font-mono tracking-widest text-neutral-300 uppercase">
                    COLLECTION
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM SECTION: "You May Also Like" Related Products */}
        <div className="mt-24 pt-12 border-t border-neutral-200 space-y-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-neutral-950">
              You May Also Like
            </h2>
            <Link
              href="/#designs"
              className="text-xs font-mono uppercase tracking-widest text-neutral-800 hover:text-black flex items-center space-x-1 underline underline-offset-8 transition-colors"
            >
              <span>View All</span>
              <RiArrowRightLine className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {RELATED_PRODUCTS.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
