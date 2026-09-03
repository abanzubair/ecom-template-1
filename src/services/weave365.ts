import { Product, StoreInfo } from '@/types';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://agsldsqeynzydujmijgc.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnc2xkc3FleW56eWR1am1pamdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0NDQxOTAsImV4cCI6MjEwNDAyMDE5MH0.PHFlhCQyRyBCxy1nFR2GdYgwcraiQZu8wSho29qkpEA';

// Use isolated storage key to prevent stale JWTs from other projects causing 401 errors
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storageKey: 'boutique_storefront_auth_v1',
    persistSession: true,
    autoRefreshToken: true,
  },
});

if (typeof window !== 'undefined') {
  try {
    // Clear foreign/stale Supabase auth tokens that cause 401 invalid token on new project
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && (k.startsWith('sb-') || k.includes('supabase.auth.token')) && k !== 'boutique_storefront_auth_v1') {
        keysToRemove.push(k);
      }
    }
    keysToRemove.forEach(k => localStorage.removeItem(k));
  } catch (e) {
    // Ignore
  }
}

export interface StorefrontData {
  storeInfo: StoreInfo;
  products: Product[];
  isLive: boolean;
}

export function resolveStoreSlugAndDomain(): { slug: string; domain: string } {
  let slug = process.env.NEXT_PUBLIC_RESELLER_SLUG || '';
  let domain = process.env.NEXT_PUBLIC_RESELLER_DOMAIN || '';

  if (typeof window !== 'undefined') {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const qSlug = urlParams.get('slug');
      const qDomain = urlParams.get('domain');
      if (qSlug) slug = qSlug;
      if (qDomain) domain = qDomain;

      if (!slug) {
        const segments = window.location.pathname.split('/').filter(Boolean);
        const firstSegment = segments[0];
        const reserved = ['about', 'contact', 'policy', 'privacy', 'product', 'products', 'api', '_next', 'admin'];
        if (firstSegment && !reserved.includes(firstSegment.toLowerCase())) {
          slug = firstSegment.toLowerCase();
        }
      }

      if (!slug && !domain && window.location.hostname && !window.location.hostname.includes('localhost')) {
        domain = window.location.hostname;
      }
    } catch (e) {
      // Ignore
    }
  }

  return { slug, domain };
}

export async function fetchStorefrontData(): Promise<StorefrontData> {
  const { slug, domain } = resolveStoreSlugAndDomain();

  try {
    let tenant: any = null;

    if (slug) {
      const { data } = await supabase
        .from('boutique_tenants')
        .select('*')
        .eq('slug', slug.toLowerCase().trim())
        .eq('is_active', true)
        .maybeSingle();
      tenant = data;
    }

    if (!tenant && domain) {
      const cleanDomain = domain.toLowerCase().trim().replace(/^https?:\/\//, '').replace(/\/+$/, '');
      const { data: stores } = await supabase
        .from('boutique_tenants')
        .select('*')
        .eq('is_active', true);

      if (stores) {
        tenant = stores.find((s: any) => {
          if (!s.custom_domain) return false;
          const sDom = s.custom_domain.toLowerCase().trim().replace(/^https?:\/\//, '').replace(/\/+$/, '');
          return sDom === cleanDomain || sDom.includes(cleanDomain) || cleanDomain.includes(sDom);
        });
      }
    }

    // Fallback: If no slug/domain provided (e.g. root localhost or preview), load default active store
    if (!tenant) {
      const { data: firstStore } = await supabase
        .from('boutique_tenants')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      tenant = firstStore;
    }

    if (!tenant) {
      return {
        storeInfo: { storeName: 'My Boutique' },
        products: [],
        isLive: false,
      };
    }

    // Fetch published products directly for this tenant
    const { data: rawProducts, error: prodErr } = await supabase
      .from('boutique_products')
      .select('*')
      .eq('tenant_id', tenant.id)
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (prodErr) {
      console.error('[Storefront DB] Products fetch error:', prodErr);
    }

    const transformedProducts: Product[] = (rawProducts || []).map((p: any, index: number) => {
      const priceNum = Number(p.retail_price || p.base_price || 0);
      const imagesList = Array.isArray(p.images) && p.images.length > 0
        ? p.images
        : ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop'];

      return {
        id: String(p.id),
        code: p.sku || `ITEM-${String(index + 1).padStart(3, '0')}`,
        title: p.title || 'Handloom Banarasi Silk Saree',
        category: p.category || 'Saree',
        price: priceNum,
        currency: '₹',
        formattedPrice: `₹${priceNum.toLocaleString('en-IN')}`,
        status: 'Available',
        description: p.description || 'Authentic handcrafted pure silk product directly from artisan looms.',
        fullDescription: p.description || 'Handloomed by master craftsmen with certified authentic zari and finest double-warp mulberry silk.',
        image: imagesList[0],
        images: imagesList,
        badge: index === 0 ? 'Featured' : undefined,
        fabric: p.fabric || 'Pure Silk',
        weave: p.weave || 'Handloom',
        origin: 'Varanasi, Uttar Pradesh',
        zariType: 'Tested Zari',
        yarnCount: '120/120 Double Warp',
        weftDensity: '80 TPI',
        work: 'Zari Brocade',
      };
    });

    return {
      storeInfo: {
        storeName: tenant.store_name || 'My Boutique',
        slug: tenant.slug,
        customDomain: tenant.custom_domain,
        logoUrl: tenant.logo_url,
        whatsapp: tenant.whatsapp,
      },
      products: transformedProducts,
      isLive: true,
    };
  } catch (err) {
    console.error('[Storefront DB] Critical error fetching data:', err);
    return {
      storeInfo: { storeName: 'My Boutique' },
      products: [],
      isLive: false,
    };
  }
}

/**
 * Creates an order record in the dedicated boutique database
 */
export async function createBoutiqueOrder(orderData: {
  tenantSlug: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  shippingAddress?: any;
  items: any[];
  totalAmount: number;
}) {
  try {
    const { data: tenant } = await supabase
      .from('boutique_tenants')
      .select('id')
      .eq('slug', orderData.tenantSlug)
      .single();

    if (!tenant) return { error: new Error('Tenant not found') };

    return await supabase
      .from('boutique_orders')
      .insert({
        tenant_id: tenant.id,
        customer_name: orderData.customerName,
        customer_phone: orderData.customerPhone,
        customer_email: orderData.customerEmail || null,
        shipping_address: orderData.shippingAddress || null,
        items: orderData.items,
        total_amount: orderData.totalAmount,
        status: 'new',
      })
      .select()
      .single();
  } catch (err) {
    console.error('[Storefront DB] Error creating order:', err);
    return { error: err };
  }
}
