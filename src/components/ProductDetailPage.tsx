'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
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
  RiCheckLine,
  RiWhatsappLine
} from 'react-icons/ri';

const COLORS = [
  { name: 'Charcoal Gray', hex: '#4a4e53', bgClass: 'bg-[#4a4e53]' },
  { name: 'Light Gray', hex: '#d1d5db', bgClass: 'bg-[#d1d5db]' },
  { name: 'Cream / Beige', hex: '#eae5d9', bgClass: 'bg-[#eae5d9]' },
  { name: 'Solid Black', hex: '#1a1a1a', bgClass: 'bg-[#1a1a1a]' }
];

const SIZES = ['Standard Free Size', 'S', 'M', 'L', 'XL'];

export const ProductDetailPage: React.FC = () => {
  const params = useParams();
  const rawId = params?.id ? String(params.id) : null;
  const { products, addToCart, showToast, storeInfo, isLoadingProducts } = useApp();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedSize, setSelectedSize] = useState('Standard Free Size');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'materials' | 'size' | 'shipping'>('details');

  const mainProduct: Product | undefined = products.find(p => p.id === rawId || p.code === rawId) || (rawId ? undefined : products[0]);

  if (isLoadingProducts) {
    return (
      <div className="w-full bg-white min-h-screen pt-28 pb-20 px-6 md:px-12 flex items-center justify-center">
        <div className="animate-pulse text-center space-y-4">
          <div className="w-16 h-16 bg-neutral-200 rounded-full mx-auto" />
          <p className="text-sm font-mono text-neutral-500">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!mainProduct) {
    return (
      <div className="w-full bg-white min-h-screen pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-md mx-auto text-center space-y-4 p-8 border border-neutral-200 rounded-2xl bg-neutral-50/50">
          <h2 className="text-xl font-bold text-neutral-900">Product Not Found</h2>
          <p className="text-xs text-neutral-500">
            This product is either not available or has been updated in the boutique catalog.
          </p>
          <Link
            href="/products"
            className="inline-block bg-black text-white text-xs font-semibold px-6 py-2.5 rounded-full hover:bg-neutral-800 transition-colors"
          >
            Browse All Products
          </Link>
        </div>
      </div>
    );
  }

  const galleryImages = (mainProduct.images && mainProduct.images.length > 0)
    ? mainProduct.images.map((url, idx) => ({ id: idx + 1, url, alt: `${mainProduct.title} - View ${idx + 1}` }))
    : [{ id: 1, url: mainProduct.image, alt: mainProduct.title }];

  const currentImageUrl = galleryImages[selectedImage]?.url || galleryImages[0]?.url || mainProduct.image;

  const handleAddToCart = () => {
    addToCart(mainProduct);
    showToast(`Added ${mainProduct.title} to cart!`);
  };

  const handleOrderWhatsApp = () => {
    const whatsappNum = storeInfo.whatsapp ? storeInfo.whatsapp.replace(/\D/g, '') : '';
    let msg = `*Product Inquiry from ${storeInfo.storeName}*\n\n`;
    msg += `Hello! I am interested in ordering:\n`;
    msg += `*${mainProduct.title}* (Code: ${mainProduct.code})\n`;
    msg += `Price: ${mainProduct.formattedPrice || `${mainProduct.currency}${mainProduct.price.toLocaleString('en-IN')}`}\n`;
    if (mainProduct.fabric) msg += `Fabric: ${mainProduct.fabric}\n`;
    if (mainProduct.weave) msg += `Weave: ${mainProduct.weave}\n`;
    msg += `\nPlease confirm availability and dispatch details.`;

    const waUrl = whatsappNum 
      ? `https://wa.me/${whatsappNum}?text=${encodeURIComponent(msg)}`
      : `https://wa.me/?text=${encodeURIComponent(msg)}`;

    if (typeof window !== 'undefined') {
      window.open(waUrl, '_blank');
    }
  };


  return (
    <div className="w-full bg-white text-neutral-900 pt-28 pb-20 font-sans select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* TOP PRODUCT SECTION: Image Gallery (Left) + Product Info (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pb-6">
          
          {/* LEFT: Thumbnail Column + Main Vertical Image Card (6 Columns) */}
          <div className="lg:col-span-6 flex flex-col sm:flex-row gap-4 w-full items-start">
            
            {/* Vertical Thumbnail List */}
            {galleryImages.length > 1 && (
              <div className="flex sm:flex-col gap-3 order-2 sm:order-1 justify-center sm:justify-start">
                <div className="flex sm:flex-col gap-3">
                  {galleryImages.map((img, idx) => (
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
              </div>
            )}

            {/* Main Tall Vertical Image Display Card */}
            <div className="relative flex-1 rounded-3xl overflow-hidden bg-[#f4f4f4] h-[500px] sm:h-[580px] lg:h-[640px] w-full max-w-[480px] order-1 sm:order-2 shadow-xs group shrink-0">
              <img
                src={currentImageUrl}
                alt={mainProduct.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              {/* Zoom Button Icon */}
              <button
                onClick={() => showToast('High-resolution preview active')}
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
                {mainProduct.badge || mainProduct.category || 'Handcrafted'}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display text-neutral-950">
              {mainProduct.title}
            </h1>

            {/* Product Code / Category */}
            <div className="flex items-center space-x-2 text-sm text-neutral-600 font-mono">
              <span>Code: {mainProduct.code}</span>
              {mainProduct.fabric && <span>• {mainProduct.fabric}</span>}
              {mainProduct.weave && <span>• {mainProduct.weave}</span>}
            </div>

            {/* Price */}
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-extrabold text-neutral-950 font-mono">
                {mainProduct.formattedPrice || `${mainProduct.currency}${mainProduct.price.toLocaleString('en-IN')}`}
              </span>
              <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-sm uppercase tracking-wider">
                {mainProduct.status || 'Available'}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-neutral-600 leading-relaxed font-light">
              {mainProduct.description || mainProduct.fullDescription}
            </p>

            <div className="h-px w-full bg-neutral-200 my-6" />

            {/* Add to Cart & WhatsApp Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleAddToCart}
                className="w-full sm:flex-1 py-4 bg-black hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-widest rounded-2xl transition-all duration-300 shadow-md flex items-center justify-center space-x-2"
              >
                <RiShoppingBag3Line className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleOrderWhatsApp}
                className="w-full sm:flex-1 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-widest rounded-2xl transition-all duration-300 shadow-md flex items-center justify-center space-x-2"
              >
                <RiWhatsappLine className="w-5 h-5" />
                <span>Order on WhatsApp</span>
              </button>

              <button
                onClick={() => {
                  setIsWishlisted(!isWishlisted);
                  showToast(!isWishlisted ? `Added ${mainProduct.title} to wishlist` : 'Removed from wishlist');
                }}
                className="w-14 h-14 rounded-2xl border border-neutral-300 hover:border-black flex items-center justify-center transition-colors shrink-0"
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
                <span className="text-xs font-bold text-neutral-900">Direct Loom Sourced</span>
                <span className="text-[11px] text-neutral-500 font-light">Authentic handcraft</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <RiShieldCheckLine className="w-5 h-5 text-neutral-800" />
                <span className="text-xs font-bold text-neutral-900">Quality Verified</span>
                <span className="text-[11px] text-neutral-500 font-light">100% genuine weave</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <RiRefreshLine className="w-5 h-5 text-neutral-800" />
                <span className="text-xs font-bold text-neutral-900">Fast Dispatch</span>
                <span className="text-[11px] text-neutral-500 font-light">Inspected & packed</span>
              </div>
            </div>

          </div>
        </div>

        {/* MIDDLE SECTION: Details & Specs Tabs + Texture Image */}
        <div className="mt-16 pt-10 border-t border-neutral-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Specs & Bullet Details */}
            <div className="lg:col-span-7 space-y-6">
              {/* Tab Navigation */}
              <div className="flex items-center space-x-8 border-b border-neutral-200 pb-3 text-base sm:text-lg font-bold">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-3 -mb-3 transition-colors ${
                    activeTab === 'details'
                      ? 'border-b-2 border-black text-black'
                      : 'text-neutral-400 hover:text-neutral-700'
                  }`}
                >
                  Specifications & Heritage
                </button>
                <button
                  onClick={() => setActiveTab('materials')}
                  className={`pb-3 -mb-3 transition-colors ${
                    activeTab === 'materials'
                      ? 'border-b-2 border-black text-black'
                      : 'text-neutral-400 hover:text-neutral-700'
                  }`}
                >
                  Fabric & Craft
                </button>
              </div>

              {/* Tab Content */}
              <div className="space-y-4">
                <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-normal">
                  {mainProduct.fullDescription || mainProduct.description}
                </p>

                {/* Feature Specs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs sm:text-sm">
                  {mainProduct.fabric && (
                    <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                      <span className="block text-[11px] uppercase tracking-wider text-neutral-400 font-mono">Fabric</span>
                      <strong className="text-neutral-900">{mainProduct.fabric}</strong>
                    </div>
                  )}
                  {mainProduct.weave && (
                    <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                      <span className="block text-[11px] uppercase tracking-wider text-neutral-400 font-mono">Weave</span>
                      <strong className="text-neutral-900">{mainProduct.weave}</strong>
                    </div>
                  )}
                  {mainProduct.zariType && (
                    <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                      <span className="block text-[11px] uppercase tracking-wider text-neutral-400 font-mono">Zari Quality</span>
                      <strong className="text-neutral-900">{mainProduct.zariType}</strong>
                    </div>
                  )}
                  {mainProduct.origin && (
                    <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                      <span className="block text-[11px] uppercase tracking-wider text-neutral-400 font-mono">Origin</span>
                      <strong className="text-neutral-900">{mainProduct.origin}</strong>
                    </div>
                  )}
                  {mainProduct.yarnCount && (
                    <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                      <span className="block text-[11px] uppercase tracking-wider text-neutral-400 font-mono">Yarn Density</span>
                      <strong className="text-neutral-900">{mainProduct.yarnCount}</strong>
                    </div>
                  )}
                  {mainProduct.work && (
                    <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                      <span className="block text-[11px] uppercase tracking-wider text-neutral-400 font-mono">Craft Work</span>
                      <strong className="text-neutral-900">{mainProduct.work}</strong>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Macro Texture Display Image */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden h-72 sm:h-80 shadow-md bg-neutral-900 relative group">
                <img
                  src={galleryImages[1]?.url || currentImageUrl}
                  alt={mainProduct.title}
                  className="w-full h-full object-cover object-center grayscale contrast-125 opacity-90 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-6 text-white">
                  <span className="text-xl sm:text-2xl font-extrabold tracking-widest uppercase font-mono drop-shadow-md">
                    {storeInfo.storeName || 'BOUTIQUE'}
                  </span>
                  <span className="text-xs font-mono tracking-widest text-neutral-300 uppercase">
                    CURATED COLLECTION
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM SECTION: Related Products */}
        {products.filter(p => p.id !== mainProduct.id).length > 0 && (
          <div className="mt-20 pt-10 border-t border-neutral-200 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-neutral-950">
                More From Our Catalog
              </h2>
              <Link
                href="/products"
                className="text-xs font-mono uppercase tracking-widest text-neutral-800 hover:text-black flex items-center space-x-1 underline underline-offset-8 transition-colors"
              >
                <span>View All</span>
                <RiArrowRightLine className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {products.filter(p => p.id !== mainProduct.id).slice(0, 4).map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};


