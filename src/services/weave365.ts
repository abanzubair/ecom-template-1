import { Product, StoreInfo } from '@/types';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://kvnwribvwaqgpvpmvqwr.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2bndyaWJ2d2FxZ3B2cG12cXdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1MzcwNzQsImV4cCI6MjA5MzExMzA3NH0.gOxwGzICPQARkunsFj-Zj4FfrmfyVY7k-Rd2C89sU0I';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface StorefrontData {
  storeInfo: StoreInfo;
  products: Product[];
  isLive: boolean;
}

/**
 * Resolves the storefront and its active products directly from Supabase,
 * with full support for URL queries (?slug= or ?domain=), environment variables,
 * or automatic hostname matching (e.g. Vercel deployment domain).
 */
export async function fetchStorefrontData(): Promise<StorefrontData> {
  let slug = process.env.NEXT_PUBLIC_RESELLER_SLUG || '';
  let domain = process.env.NEXT_PUBLIC_RESELLER_DOMAIN || '';

  // 1. Read URL query parameters (?slug=... or ?domain=...)
  // 1. Read URL query parameters (?slug=... or ?domain=...) or clean pathname (/abazain)
  if (typeof window !== 'undefined') {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const qSlug = urlParams.get('slug');
      const qDomain = urlParams.get('domain');
      if (qSlug) slug = qSlug;
      if (qDomain) domain = qDomain;

      // If no query parameter, check if pathname has a handle: e.g. /abazain
      if (!slug) {
        const firstSegment = window.location.pathname.split('/').filter(Boolean)[0];
        const reserved = ['about', 'contact', 'policy', 'privacy', 'product', 'products', 'api', '_next'];
        if (firstSegment && !reserved.includes(firstSegment.toLowerCase())) {
          slug = firstSegment.toLowerCase();
        }
      }
      
      // Auto-detect hostname if not running on localhost
      if (!slug && !domain && window.location.hostname && !window.location.hostname.includes('localhost')) {
        domain = window.location.hostname;
      }
    } catch (e) {
      // Ignore
    }
  }

  // 2. Default fallback slug for development & testing
  if (!slug && !domain) {
    slug = 'abanzubair';
  }

  try {
    // 3. Look up storefront by slug or domain in Supabase
    let storefront: any = null;

    if (slug) {
      const { data } = await supabase
        .from('reseller_storefronts')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .maybeSingle();
      storefront = data;
    }

    if (!storefront && domain) {
      const cleanDomain = domain.toLowerCase().trim().replace(/^https?:\/\//, '').replace(/\/+$/, '');
      const { data: stores } = await supabase
        .from('reseller_storefronts')
        .select('*')
        .eq('is_active', true);
      
      if (stores) {
        storefront = stores.find(s => {
          if (!s.custom_domain) return false;
          const sDom = s.custom_domain.toLowerCase().trim().replace(/^https?:\/\//, '').replace(/\/+$/, '');
          return sDom === cleanDomain || sDom.includes(cleanDomain) || cleanDomain.includes(sDom);
        });
      }
    }

    // Fallback to any active store if still not found
    if (!storefront) {
      const { data: firstStore } = await supabase
        .from('reseller_storefronts')
        .select('*')
        .eq('is_active', true)
        .limit(1)
        .maybeSingle();
      storefront = firstStore;
    }

    if (!storefront) {
      console.warn('[Weave365] No active storefront found');
      return {
        storeInfo: { storeName: 'My Reseller Boutique' },
        products: [],
        isLive: false,
      };
    }

    // 4. Fetch Active Reseller Shares & Catalog Items
    const { data: shares, error: sharesError } = await supabase
      .from('reseller_shares')
      .select('*, reseller_share_items (*)')
      .eq('reseller_id', storefront.reseller_id)
      .eq('is_active', true);

    if (sharesError) {
      console.error('[Weave365] shares fetch error:', sharesError);
      return {
        storeInfo: { storeName: storefront.store_name || 'My Reseller Boutique' },
        products: [],
        isLive: false,
      };
    }

    const shareItems = (shares || []).flatMap((s: any) => s.reseller_share_items || []);
    const shareItemsMap = new Map<string, any>();
    for (const item of shareItems) {
      shareItemsMap.set(String(item.product_group_key).toLowerCase().trim(), item);
    }

    // 5. Load catalog products JSON from Supabase
    const { data: sheetRecord } = await supabase
      .from('sheet_data')
      .select('csv_data')
      .eq('id', 'products_json')
      .single();

    if (!sheetRecord || !sheetRecord.csv_data) {
      console.warn('[Weave365] No products_json sheet data found');
      return {
        storeInfo: {
          storeName: storefront.store_name || 'My Reseller Boutique',
          slug: storefront.slug,
          customDomain: storefront.custom_domain,
          logoUrl: storefront.logo_url,
          whatsapp: storefront.whatsapp,
        },
        products: [],
        isLive: true,
      };
    }

    let productsList: any[] = [];
    try {
      productsList = JSON.parse(sheetRecord.csv_data);
    } catch (e) {
      console.error('[Weave365] Failed to parse products_json:', e);
    }

    // 6. Map and build product cards
    const transformedProducts: Product[] = [];

    for (let index = 0; index < productsList.length; index++) {
      const p = productsList[index];
      const groupKey = String(p.groupKey || p.id).toLowerCase().trim();
      if (!shareItemsMap.has(groupKey)) continue;

      const shareItem = shareItemsMap.get(groupKey);
      const priceNum = Number(shareItem.customer_price) || Number(p.price) || 0;
      const imagesList = Array.isArray(p.images) && p.images.length > 0
        ? p.images
        : [p.image || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop'];

      transformedProducts.push({
        id: String(p.id || groupKey),
        code: p.tag || `ITEM-${String(index + 1).padStart(3, '0')}`,
        title: shareItem.custom_title || p.title || 'Handloom Banarasi Silk Saree',
        category: p.category || p.fabric || 'Textiles',
        price: priceNum,
        currency: '₹',
        formattedPrice: `₹${priceNum.toLocaleString('en-IN')}`,
        status: 'Available',
        description: shareItem.custom_description || p.description || 'Authentic handcrafted pure silk product directly from artisan looms.',
        fullDescription: p.heritageStory || p.description || 'Handloomed by master craftsmen with certified authentic zari and finest double-warp mulberry silk.',
        image: imagesList[0],
        images: imagesList,
        badge: p.tag || (transformedProducts.length === 0 ? 'Featured' : undefined),
        fabric: p.fabric || 'Pure Silk',
        weave: p.weave || 'Handloom',
        origin: p.origin || 'Varanasi, Uttar Pradesh',
        zariType: p.zariType || 'Tested Zari',
        yarnCount: p.yarnCount || '120/120 Double Warp',
        weftDensity: p.weftDensity || '80 TPI',
        work: p.work || 'Zari Brocade',
      });
    }

    return {
      storeInfo: {
        storeName: storefront.store_name || 'My Reseller Boutique',
        slug: storefront.slug,
        customDomain: storefront.custom_domain,
        logoUrl: storefront.logo_url,
        whatsapp: storefront.whatsapp,
      },
      products: transformedProducts,
      isLive: true,
    };
  } catch (err) {
    console.error('[Weave365] Critical error during fetchStorefrontData:', err);
    return {
      storeInfo: { storeName: 'My Reseller Boutique' },
      products: [],
      isLive: false,
    };
  }
}

