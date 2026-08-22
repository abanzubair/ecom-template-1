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

export interface StoreInfo {
  storeName: string;
  slug?: string;
  customDomain?: string;
  logoUrl?: string;
  whatsapp?: string;
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

