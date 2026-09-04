# Weave365 Templates & Architecture Context for Agents

## 1. Product Context
* **Platform**: **Weave365** (`weave365.in` / `weave365.com`) is a B2B handloom silk saree manufacturer and reseller platform.
* **Core Add-on**: **"Build your own website"** (on the main Weave365 platform).
  * Resellers pick a design template to launch their own branded silk saree store in minutes.
  * Catalog is pre-filled with Weave365 wholesale sarees.
  * Resellers set markups on wholesale prices.
  * Patrons buy and inquire via direct WhatsApp integration with the boutique owner.

## 2. The 3 Storefront Templates (`/home/aban/Dev/templates`)
1. **`ecom-template-1`** (Next.js 14 App Router, Tailwind CSS): Modern minimalist editorial luxury.
2. **`50k`** (Vite + React Router, Tailwind CSS): Ultra-fast single-page boutique with smooth animations.
3. **`ecom-template-3`** (Vite 8 + React 19, Cormorant Garamond): Atelier Handlooms luxury boutique.

## 3. How They are Linked Together
* **Shared Supabase DB** (`https://agsldsqeynzydujmijgc.supabase.co`):
  * `boutique_tenants`: Boutique profiles, handles, custom domains, WhatsApp contact, profit margins.
  * `boutique_products`: Master saree catalog with wholesale prices, retail prices, and profit margin %.
  * `boutique_orders`: Live log of customer inquiries and orders placed across all storefronts.
* **Universal Multi-Tenant Routing**:
  * Resolves boutique via Custom Domain (CNAME), subpath `/:slug` (e.g. `/50k`), or default env slug.

## 4. Centralized Reseller Management (`admin-portal`)
* **Location**: `/home/aban/Dev/templates/admin-portal`
* **Target Domain**: `reseller.weave365.com`
* **GitHub Repo**: `https://github.com/abanzubair/reseller-weave365-admin`
* **Role**: All reseller/admin functionality is centralized in this single app. Storefront templates do NOT have admin dashboards; navigating to `/admin` in any template automatically redirects to `https://reseller.weave365.com?store=<slug>`.

## 5. Critical Operating Rules
* **NEVER push code to GitHub without asking the user first.**
* Keep templates strictly as customer-facing storefronts (zero admin bloat).
* Follow Impeccable design guidelines (understated dark theme, no kicker badges, no large icon cards, tabular nums).
