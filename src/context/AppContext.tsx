'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, QueryFormData, StoreInfo } from '@/types';
import { fetchStorefrontData, createBoutiqueInquiry } from '@/services/weave365';


interface AppContextType {
  products: Product[];
  storeInfo: StoreInfo;
  isLoadingProducts: boolean;
  isLiveCatalog: boolean;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  totalCartItems: number;
  subtotal: number;
  
  // Modals
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isLoginOpen: boolean;
  setIsLoginOpen: (open: boolean) => void;
  isQueryOpen: boolean;
  setIsQueryOpen: (open: boolean) => void;
  isSocialFeedOpen: boolean;
  setIsSocialFeedOpen: (open: boolean) => void;
  
  // Active product modal detail
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;

  // Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Order on WhatsApp
  checkoutViaWhatsApp: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [storeInfo, setStoreInfo] = useState<StoreInfo>({
    storeName: 'My Boutique',
    slug: '',
    whatsapp: ''
  });
  const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(true);
  const [isLiveCatalog, setIsLiveCatalog] = useState<boolean>(false);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isQueryOpen, setIsQueryOpen] = useState(false);
  const [isSocialFeedOpen, setIsSocialFeedOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load products on mount
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoadingProducts(true);
        const data = await fetchStorefrontData();
        console.log('[Storefront Sync]', {
          storeName: data?.storeInfo?.storeName,
          productsCount: data?.products?.length,
          isLive: data?.isLive
        });
        setProducts(data.products || []);
        if (data.storeInfo) {
          setStoreInfo(data.storeInfo);
        }
        setIsLiveCatalog(data.isLive);
      } catch (err) {
        console.error('Failed to load Weave365 catalog:', err);
      } finally {
        setIsLoadingProducts(false);
      }
    }
    loadData();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`Added "${product.title}" to cart`);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setCart([]);

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const checkoutViaWhatsApp = () => {
    if (cart.length === 0) return;

    const summary = cart.map((i) => `${i.product.title} (x${i.quantity})`).join(', ');
    createBoutiqueInquiry({
      customerName: 'WhatsApp Patron',
      productTitle: summary,
      totalAmount: subtotal,
      message: `Cart checkout for ${cart.length} item(s): ${summary}`,
    }).catch((err) => console.warn('Order logging:', err));

    const whatsappNum = storeInfo.whatsapp ? storeInfo.whatsapp.replace(/\D/g, '') : '';
    
    let message = `*Order Inquiry from ${storeInfo.storeName}*\n\n`;
    message += `Hello! I would like to place an order for the following items:\n\n`;
    
    cart.forEach((item, idx) => {
      message += `${idx + 1}. *${item.product.title}* (Code: ${item.product.code})\n`;
      message += `   Qty: ${item.quantity} × ${item.product.currency}${item.product.price.toLocaleString('en-IN')}\n`;
      if (item.product.fabric) message += `   Fabric: ${item.product.fabric}\n`;
      message += `\n`;
    });

    message += `*Total Amount:* ₹${subtotal.toLocaleString('en-IN')}\n\n`;
    message += `Please confirm availability and dispatch details.`;

    const encoded = encodeURIComponent(message);
    const waUrl = whatsappNum 
      ? `https://wa.me/${whatsappNum}?text=${encoded}`
      : `https://wa.me/?text=${encoded}`;

    if (typeof window !== 'undefined') {
      window.open(waUrl, '_blank');
    }
  };

  return (
    <AppContext.Provider
      value={{
        products,
        storeInfo,
        isLoadingProducts,
        isLiveCatalog,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCartItems,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        isLoginOpen,
        setIsLoginOpen,
        isQueryOpen,
        setIsQueryOpen,
        isSocialFeedOpen,
        setIsSocialFeedOpen,
        selectedProduct,
        setSelectedProduct,
        toastMessage,
        showToast,
        checkoutViaWhatsApp,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

