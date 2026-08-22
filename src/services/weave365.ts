import { Product, StoreInfo } from '@/types';
import { INITIAL_PRODUCTS } from '@/data/products';

const DEFAULT_API_URL = 'https://weave365.in/api/storefront';

export interface StorefrontData {
  storeInfo: StoreInfo;
  products: Product[];
  isLive: boolean;
}

/**
 * Resolves configuration parameters from environment or window location.
 */
function getApiConfig() {
  const apiUrl = process.env.NEXT_PUBLIC_WEAVE365_API_URL || DEFAULT_API_URL;
  const slug = process.env.NEXT_PUBLIC_RESELLER_SLUG || '';
  const domain = process.env.NEXT_PUBLIC_RESELLER_DOMAIN || '';

  return { apiUrl, slug, domain };
}

/**
 * Fetches dynamic products and storefront branding from the Weave365 API.
 */
export async function fetchStorefrontData(): Promise<StorefrontData> {
  const { apiUrl, slug, domain } = getApiConfig();

  // If no slug or domain is configured in env, try to see if running on a custom domain
  let queryParam = '';
  if (slug) {
    queryParam = `slug=${encodeURIComponent(slug)}`;
  } else if (domain) {
    queryParam = `domain=${encodeURIComponent(domain)}`;
  } else if (typeof window !== 'undefined' && window.location.hostname && !window.location.hostname.includes('localhost')) {
    queryParam = `domain=${encodeURIComponent(window.location.hostname)}`;
  }

  // If no identifier available, return empty products array with default storeInfo
  if (!queryParam) {
    return {
      storeInfo: {
        storeName: 'My Reseller Boutique',
        slug: '',
        whatsapp: ''
      },
      products: [],
      isLive: false
    };
  }

  try {
    const url = `${apiUrl}?${queryParam}`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!res.ok) {
      console.warn(`[Weave365 Sync] API returned ${res.status}`);
      return {
        storeInfo: { storeName: 'My Reseller Boutique' },
        products: [],
        isLive: false
      };
    }

    const data = await res.json();
    const storefront = data.storefront || {};
    const rawProducts = data.products || [];

    if (!Array.isArray(rawProducts) || rawProducts.length === 0) {
      return {
        storeInfo: {
          storeName: storefront.store_name || 'My Reseller Boutique',
          slug: storefront.slug,
          customDomain: storefront.custom_domain,
          logoUrl: storefront.logo_url,
          whatsapp: storefront.whatsapp,
        },
        products: [],
        isLive: true
      };
    }

    // Map Weave365 products to template Product format
    const transformedProducts: Product[] = rawProducts.map((p: any, index: number) => {
      const id = String(p.id || `weave-prod-${index}`);
      const priceNum = Number(p.price) || 0;
      const imagesList = Array.isArray(p.images) && p.images.length > 0 
        ? p.images 
        : [p.image || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop'];

      return {
        id,
        code: p.tag || `ITEM-${String(index + 1).padStart(3, '0')}`,
        title: p.title || 'Handloom Banarasi Silk Saree',
        category: p.category || p.fabric || 'Textiles',
        price: priceNum,
        currency: '₹',
        formattedPrice: p.formattedPrice || `₹${priceNum.toLocaleString('en-IN')}`,
        status: 'Available',
        description: p.description || 'Authentic handcrafted pure silk product directly from artisan looms.',
        fullDescription: p.heritageStory || p.description || 'Handloomed by master craftsmen with certified authentic zari and finest double-warp mulberry silk.',
        image: imagesList[0],
        images: imagesList,
        badge: p.tag || (index === 0 ? 'Featured' : undefined),
        fabric: p.fabric || 'Pure Silk',
        weave: p.weave || 'Handloom',
        origin: p.origin || 'Varanasi, Uttar Pradesh',
        zariType: p.zariType || 'Tested Zari',
        yarnCount: p.yarnCount || '120/120 Double Warp',
        weftDensity: p.weftDensity || '80 TPI',
        work: p.work || 'Zari Brocade',
      };
    });

    return {
      storeInfo: {
        storeName: storefront.store_name || 'My Reseller Boutique',
        slug: storefront.slug,
        customDomain: storefront.custom_domain,
        logoUrl: storefront.logo_url,
        whatsapp: storefront.whatsapp,
      },
      products: transformedProducts,
      isLive: true
    };
  } catch (err) {
    console.error('[Weave365 Sync] Error fetching storefront:', err);
    return {
      storeInfo: { storeName: 'My Reseller Boutique' },
      products: [],
      isLive: false
    };
  }
}
