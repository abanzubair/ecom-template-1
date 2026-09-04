'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  RiShoppingBag3Line,
  RiCloseLine,
  RiDeleteBin6Line,
  RiAddLine,
  RiSubtractLine,
  RiArrowRightLine,
  RiWhatsappLine,
} from 'react-icons/ri';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    totalCartItems,
    clearCart,
    showToast,
    checkoutViaWhatsApp
  } = useApp();

  const [buyerName, setBuyerName] = useState(() => (typeof window !== 'undefined' ? localStorage.getItem('weave365_buyer_name') || '' : ''));
  const [buyerPhone, setBuyerPhone] = useState(() => (typeof window !== 'undefined' ? localStorage.getItem('weave365_buyer_phone') || '' : ''));
  const [city, setCity] = useState('');
  const [phoneError, setPhoneError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end">
      <div className="bg-white text-neutral-900 w-full max-w-md h-full shadow-2xl flex flex-col justify-between animate-fadeIn">
        {/* Header */}
        <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <RiShoppingBag3Line className="w-5 h-5 text-neutral-900" />
            <h3 className="text-lg font-bold uppercase tracking-tight font-mono">
              Your Cart ({totalCartItems})
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1 text-neutral-400 hover:text-black transition-colors"
          >
            <RiCloseLine className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Body */}
        <div className="p-6 flex-1 overflow-y-auto space-y-4 divide-y divide-neutral-100">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-neutral-400 py-12">
              <RiShoppingBag3Line className="w-12 h-12 text-neutral-300" />
              <div>
                <p className="text-base font-semibold text-neutral-800">Your cart is empty</p>
                <p className="text-xs text-neutral-500 mt-1">Explore our exclusive artisan collection.</p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-4 px-6 py-2.5 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-full"
              >
                Browse Collection
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.product.id} className="pt-4 flex items-center justify-between space-x-4">
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="w-16 h-16 object-cover rounded-xl bg-neutral-100 border border-neutral-200"
                />

                <div className="flex-1 space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono font-bold bg-neutral-900 text-white px-1.5 py-0.5 rounded">
                      {item.product.code}
                    </span>
                    <span className="text-xs font-bold text-neutral-900 line-clamp-1">
                      {item.product.title}
                    </span>
                  </div>
                  <p className="text-xs font-mono font-bold text-neutral-700">
                    {item.product.currency}{item.product.price.toLocaleString('en-IN')}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-2 pt-1">
                    <button
                      onClick={() => updateQuantity(item.product.id, -1)}
                      className="w-6 h-6 border border-neutral-300 hover:border-black rounded flex items-center justify-center text-neutral-600 transition-colors"
                    >
                      <RiSubtractLine className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-mono font-bold w-5 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, 1)}
                      className="w-6 h-6 border border-neutral-300 hover:border-black rounded flex items-center justify-center text-neutral-600 transition-colors"
                    >
                      <RiAddLine className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-2">
                  <span className="text-sm font-bold font-mono">
                    {item.product.currency}{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-neutral-400 hover:text-red-600 transition-colors p-1"
                  >
                    <RiDeleteBin6Line className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {cart.length > 0 && (
          <div className="p-6 bg-neutral-50 border-t border-neutral-200 space-y-4">
            <div className="space-y-1.5 text-xs text-neutral-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono font-bold text-neutral-900">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-emerald-700 font-medium">Calculated upon order</span>
              </div>
            </div>

            <div className="pt-2 border-t border-neutral-200 flex justify-between items-baseline text-base font-bold">
              <span>Total Amount</span>
              <span className="font-mono text-xl">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>

            {/* Buyer Contact Details (WhatsApp Required) */}
            <div className="space-y-2 pt-2 border-t border-neutral-200">
              <div>
                <label className="block text-[11px] font-mono uppercase text-neutral-600 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  placeholder="e.g. Radhika Sharma"
                  className="w-full px-3 py-2 text-xs bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono uppercase text-neutral-600 mb-1">
                  Your WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  value={buyerPhone}
                  onChange={(e) => {
                    setBuyerPhone(e.target.value);
                    if (phoneError) setPhoneError(null);
                  }}
                  placeholder="+91 98765 43210"
                  className={`w-full px-3 py-2 text-xs bg-white border rounded-lg focus:outline-none font-mono ${
                    phoneError ? 'border-red-500 text-red-950' : 'border-neutral-300 focus:border-black'
                  }`}
                />
                {phoneError && (
                  <p className="text-[11px] text-red-500 mt-1">{phoneError}</p>
                )}
              </div>
              <div>
                <label className="block text-[11px] font-mono uppercase text-neutral-600 mb-1">
                  Delivery City / Pincode (optional)
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Varanasi, 221001"
                  className="w-full px-3 py-2 text-xs bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-black"
                />
              </div>
            </div>

            <button
              onClick={() => {
                const cleanPhone = buyerPhone.replace(/[^0-9+]/g, '').trim();
                if (!cleanPhone || cleanPhone.length < 8) {
                  setPhoneError('Please enter a valid WhatsApp number (min 8 digits)');
                  return;
                }
                if (!buyerName.trim()) {
                  setPhoneError('Please enter your full name');
                  return;
                }
                localStorage.setItem('weave365_buyer_name', buyerName.trim());
                localStorage.setItem('weave365_buyer_phone', cleanPhone);
                checkoutViaWhatsApp(buyerName.trim(), cleanPhone, city.trim() || undefined);
              }}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-widest transition-colors rounded-xl flex items-center justify-center space-x-2 shadow-md"
            >
              <span>Order via WhatsApp</span>
              <RiArrowRightLine className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
