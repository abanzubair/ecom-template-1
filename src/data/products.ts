import { Product, Testimonial } from '@/types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    code: '001',
    title: 'Carabiner Set',
    category: 'merch',
    price: 12.00,
    currency: '$',
    status: 'Available',
    description: 'Triple anodized aluminum carabiner set for outdoor keychains and daily utility.',
    fullDescription: 'Durable lightweight aluminum alloy construction with matte finished branding. Set of 3 interlocking utility clips designed for versatile daily carry.',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'prod-002',
    code: '002',
    title: 'Jaq Bag',
    category: 'merch',
    price: 32.00,
    currency: '$',
    status: 'Available',
    description: 'Compact drawstring pouch in pattern-woven ripstop nylon with adjustable cord.',
    fullDescription: 'Water-resistant ripstop nylon pouch featuring custom VRTX jacquard print. Ideal for carrying daily essentials with quick-draw cinch closure.',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'prod-003',
    code: '003',
    title: 'Nanga Sandal',
    category: 'merch',
    price: 89.00,
    currency: '$',
    status: 'Available',
    description: 'Sub-padded winter slip-on sandals with cushioned sole and studio logo embroidery.',
    fullDescription: 'Padded quilted upper lined with soft fleece. Flame-retardant fabric treatment for outdoor camp use and urban relaxation.',
    image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?q=80&w=800&auto=format&fit=crop',
    badge: 'Limited'
  },
  {
    id: 'prod-004',
    code: '004',
    title: 'Ponca Thermos',
    category: 'merch',
    price: 13.00,
    currency: '$',
    status: 'Available',
    description: 'Double-wall stainless steel insulated tumbler with laser etched branding.',
    fullDescription: '500ml vacuum insulated thermal flask keeps liquids hot for 12 hours or cold for 24 hours. Matte metallic steel finish with spill-proof lid.',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'prod-005',
    code: '005',
    title: 'Kamenoko Liner',
    category: 'merch',
    price: 120.00,
    currency: '$',
    status: 'Available',
    description: 'Quilted insulated vest liner with dual zip pockets and stand collar.',
    fullDescription: 'Lightweight down-filled vest liner crafted for layering under coats or wearing as standalone outerwear. Water-repellent matte nylon shell.',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'prod-006',
    code: '006',
    title: 'P.S Cap',
    category: 'merch',
    price: 49.00,
    currency: '$',
    status: 'Available',
    description: '5-panel runner cap with breathable side mesh panels and woven brand patch.',
    fullDescription: 'Technical lightweight cap constructed from quick-dry nylon. Features flexible brim and adjustable nylon strap-back closure.',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop',
    badge: 'Limited'
  },
  {
    id: 'prod-007',
    code: '007',
    title: 'Heavy Zip Jacket',
    category: 'merch',
    price: 139.00,
    currency: '$',
    status: 'Available',
    description: 'Half-zip pullover windbreaker in olive drab with elasticated cuffs.',
    fullDescription: 'Durable weather-proof shell jacket featuring half-zip front, high collar, and deep side entry hand pockets. Designed in Tokyo.',
    image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'prod-008',
    code: '008',
    title: 'Knit Beanie',
    category: 'merch',
    price: 29.00,
    currency: '$',
    status: 'Available',
    description: 'Ribbed knit watch cap in charcoal wool blend with subtle cuff label.',
    fullDescription: 'Soft wool blend watch cap offering cozy stretch fit and clean minimal silhouette. Perfect for colder months.',
    image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=800&auto=format&fit=crop'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    author: 'Alexander Vance',
    role: 'Art Director',
    quote: 'The level of craft and exclusivity at VRTX is unmatched. Owning 1-of-1 pieces that fit into my daily wardrobe feels like true luxury.',
    location: 'Berlin, DE'
  },
  {
    id: 't-2',
    author: 'Elena Rostova',
    role: 'Fashion Designer',
    quote: 'The heavy cotton apparel feels like a piece of wearable art. The minimal monochrome aesthetic fits perfectly into my wardrobe.',
    location: 'Milan, IT'
  },
  {
    id: 't-3',
    author: 'Kaelen Thorne',
    role: 'Creative Consultant',
    quote: 'Shopping online was seamless. The studio environment and attention to fine details exceed expectations.',
    location: 'Tokyo, JP'
  },
  {
    id: 't-4',
    author: 'Marcus Chen',
    role: 'Architect & Collector',
    quote: 'Architectural precision meets streetwear. The weight of the fabric and clean stitching are absolute perfection.',
    location: 'New York, US'
  },
  {
    id: 't-5',
    author: 'Sophia Sterling',
    role: 'Brand Curator',
    quote: 'VRTX has redefined studio merchandising. Every drop arrives beautifully packaged with museum-grade care.',
    location: 'London, UK'
  },
  {
    id: 't-6',
    author: 'Hiroshi Tanaka',
    role: 'Industrial Designer',
    quote: 'The attention to silhouette and texture is extraordinary. Easily my most worn hoodies and outerwear.',
    location: 'Kyoto, JP'
  }
];
