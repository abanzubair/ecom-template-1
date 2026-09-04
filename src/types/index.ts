export interface Product {
  id: string;
  code: string; // e.g. "001", "002"
  title: string;
  category: string;
  price: number;
  currency: string;
  formattedPrice?: string;
  status: 'Available' | 'Reserved' | 'Sold Out' | string;
  description: string;
  fullDescription?: string;
  image: string;
  images?: string[];
  badge?: string;
  fabric?: string;
  weave?: string;
  origin?: string;
  zariType?: string;
  yarnCount?: string;
  weftDensity?: string;
  work?: string;
}

export interface StorefrontNavLink {
  id: string;
  label: string;
  url: string;
  is_active: boolean;
  is_external?: boolean;
}

export interface StorefrontHero {
  type: 'image' | 'video';
  url: string;
  poster_url?: string;
  headline?: string;
  badge?: string;
  subtitle?: string;
  primary_cta_text?: string;
  primary_cta_link?: string;
  secondary_cta_text?: string;
  secondary_cta_link?: string;
}

export interface StorefrontAnnouncement {
  enabled: boolean;
  text: string;
  link?: string;
}

export interface StorefrontTrustBadges {
  show_silk_mark: boolean;
  show_tested_zari: boolean;
  show_handloom_certified: boolean;
  show_direct_artisan: boolean;
}

export interface StorefrontConfig {
  reseller_id?: string;
  hero?: StorefrontHero;
  nav_links?: StorefrontNavLink[];
  announcement?: StorefrontAnnouncement;
  accent_color?: string;
  trust_badges?: StorefrontTrustBadges;
  whatsapp_greeting?: string;
}

export interface StoreInfo {
  storeName: string;
  slug?: string;
  customDomain?: string;
  logoUrl?: string;
  whatsapp?: string;
  bannerUrl?: string;
  tagline?: string;
  accentColor?: string;
  config?: StorefrontConfig;
}

export interface CartItem {
  product: Product;
  quantity: number;
}


export interface QueryFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  quote: string;
  location: string;
}

