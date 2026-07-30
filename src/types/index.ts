export interface Product {
  id: string;
  code: string; // e.g. "001", "002"
  title: string;
  category: 'merch' | 'flash';
  price: number;
  currency: string;
  status: 'Available' | 'Reserved' | 'Sold Out';
  description: string;
  fullDescription?: string;
  image: string;
  badge?: string;
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
