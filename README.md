# VRTX Modern Studio & Boutique — Weave365 Pre-Made Storefront Template

A high-converting, mobile-first luxury boutique storefront built with **Next.js 14**, **Tailwind CSS**, and **TypeScript**, designed to work seamlessly with **Weave365 B2B Catalog & Reseller API**.

---

## Features

- ⚡ **Auto-Sync with Weave365**: Live products, high-resolution imagery, fabric details, and custom profit markups load automatically from your Weave365 Business Center.
- 🛍️ **Modern Shopping Experience**: Slide-out cart drawer, dynamic product detail page with high-res zoom, and mobile-optimized layouts.
- 💬 **1-Click WhatsApp Ordering**: Customers can order directly through WhatsApp with pre-formatted product specifications and custom pricing.
- 🎨 **White-Label & Branding Ready**: Automatically displays your store name, custom logo, and contact info.
- 🛡️ **Offline & Fallback Support**: Gracefully displays fallback studio products if API credentials are not yet configured.

---

## Getting Started

### 1. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
# 1. Weave365 API Endpoint
NEXT_PUBLIC_WEAVE365_API_URL=https://weave365.in/api/storefront

# 2. Your Reseller Store Slug (from Weave365 Business Center Settings)
NEXT_PUBLIC_RESELLER_SLUG=your-store-slug

# (Optional) If you have a custom domain linked in Weave365:
# NEXT_PUBLIC_RESELLER_DOMAIN=myboutique.com
```

### 2. Install & Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view your live storefront.

### 3. Deploying to the Web

You can deploy this template for free in minutes on:
- **Vercel**: Import this repository and add `NEXT_PUBLIC_WEAVE365_API_URL` and `NEXT_PUBLIC_RESELLER_SLUG` under Project Environment Variables.
- **Cloudflare Pages / Netlify**: Connect repo, set build command to `npm run build`, output directory to `.next`, and add the environment variables.

Once your site is deployed, paste your live URL into the **Website & API Settings** tab in your Weave365 Reseller Dashboard!
