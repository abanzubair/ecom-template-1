import type { Metadata } from 'next';
import { Inter, Syne, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { GlobalWidgets } from '@/components/GlobalWidgets';
import { CartDrawer } from '@/components/CartDrawer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'VRTX Design Studio x DHARAA | Minimal Modern E-Commerce',
  description: 'Original 1-of-1 artwork, flash collections, and organic heavyweight studio merchandise.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} ${mono.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col justify-between antialiased selection:bg-black selection:text-white">
        <AppProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <GlobalWidgets />
        </AppProvider>
      </body>
    </html>
  );
}
