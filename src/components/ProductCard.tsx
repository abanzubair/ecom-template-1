'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { useApp } from '@/context/AppContext';
import { RiShoppingBag3Line, RiHeartLine, RiHeartFill } from 'react-icons/ri';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setSelectedProduct } = useApp();
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="group flex flex-col justify-between">
      {/* Product Image Container */}
      <div className="relative bg-[#f4f4f4] rounded-2xl overflow-hidden aspect-square transition-all duration-300 hover:shadow-sm">
        {/* Top Left Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 z-10 text-[10px] uppercase tracking-wider font-mono bg-white/90 backdrop-blur-sm text-neutral-700 font-semibold px-2.5 py-1 rounded-full shadow-xs">
            {product.badge}
          </span>
        )}

        {/* Top Right Wishlist / Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white text-neutral-700 hover:text-black flex items-center justify-center transition-all shadow-xs"
          title={isLiked ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          {isLiked ? (
            <RiHeartFill className="w-4 h-4 text-red-500" />
          ) : (
            <RiHeartLine className="w-4 h-4 text-neutral-500 hover:text-black" />
          )}
        </button>

        {/* Product Image */}
        <Link href="/product" className="w-full h-full block">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 cursor-pointer"
          />
        </Link>
      </div>

      {/* Product Meta & Action Line */}
      <div className="mt-3 flex items-center justify-between px-1">
        <Link href="/product" className="space-y-0.5">
          <h3 className="text-fs-sm font-semibold text-neutral-900 tracking-tight hover:text-neutral-600 transition-colors line-clamp-1">
            {product.title}
          </h3>
          <p className="text-fs-xs font-mono font-medium text-neutral-600">
            {product.currency}{product.price.toFixed(2)}
          </p>
        </Link>

        {/* Circular Shopping Bag Action Button */}
        <button
          onClick={() => addToCart(product)}
          className="w-8 h-8 rounded-full border border-neutral-300 hover:border-black text-neutral-700 hover:bg-black hover:text-white flex items-center justify-center transition-all shrink-0 ml-2"
          title="Add to Cart"
        >
          <RiShoppingBag3Line className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
