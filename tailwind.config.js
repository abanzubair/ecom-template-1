/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        studio: {
          bg: '#f6f6f6',
          card: '#ffffff',
          dark: '#0e0e0e',
          subtle: '#ebebeb',
          border: '#e1e1e1',
          red: '#e52b2b',
          accent: '#b83b27',
          muted: '#717171',
        },
      },
      fontSize: {
        // Core Typographic Hierarchy tokens
        'fs-xs': 'var(--fs-xs)',
        'fs-sm': 'var(--fs-sm)',
        'fs-base': 'var(--fs-base)',
        'fs-md': 'var(--fs-md)',
        'fs-lg': 'var(--fs-lg)',
        'fs-xl': 'var(--fs-xl)',
        'fs-2xl': 'var(--fs-2xl)',
        'fs-3xl': 'var(--fs-3xl)',

        // Semantic Footer Hierarchy tokens
        'footer-heading': 'var(--footer-heading-size)',
        'footer-link': 'var(--footer-link-size)',
        'footer-desc': 'var(--footer-desc-size)',
        'footer-contact': 'var(--footer-contact-size)',
        'footer-meta': 'var(--footer-meta-size)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
        sfpro: ['var(--font-sf-pro)', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        subtle: '0 4px 20px rgba(0, 0, 0, 0.04)',
        float: '0 12px 30px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
};
