export type CatalogCategory = 'all' | 'food-supplements' | 'food-products' | 'cosmetics';

export interface CatalogProduct {
  id: string;
  title: string;
  category: CatalogCategory;
  categoryLabel: string;
  image: string;
  price: number;
  description: string;
}

export const CATALOG_CATEGORIES: {
  id: CatalogCategory;
  label: string;
  icon: string;
}[] = [
  { id: 'all', label: 'All', icon: 'grid' },
  { id: 'food-supplements', label: 'Food Supplements', icon: 'supplement' },
  { id: 'food-products', label: 'Food Products', icon: 'food' },
  { id: 'cosmetics', label: 'Cosmetics', icon: 'cosmetic' },
];

export const CATALOG_PRODUCTS: CatalogProduct[] = [
  {
    id: 'cat-001',
    title: 'Stop-vir',
    category: 'food-supplements',
    categoryLabel: 'Food Supplements',
    image: '/products/stop-vir.png',
    price: 24.99,
    description: 'Immune support dietary supplement with elderberry extract, vitamin C, zinc and echinacea for daily defense.',
  },
  {
    id: 'cat-002',
    title: '"Grow-up! Strawberry-apple" milkshake',
    category: 'food-products',
    categoryLabel: 'Food Products',
    image: '/products/milkshake.png',
    price: 12.50,
    description: 'Delicious children\'s food supplement drink with strawberry and apple flavors, enriched with essential vitamins.',
  },
  {
    id: 'cat-003',
    title: 'N-zim Prebio Toothpaste',
    category: 'cosmetics',
    categoryLabel: 'Cosmetics',
    image: '/products/toothpaste.png',
    price: 8.99,
    description: 'Advanced prebio toothpaste with dual-prebiotics and enzymes for optimal oral health and microbiome balance.',
  },
  {
    id: 'cat-004',
    title: 'Homey porridge with apple and flax flour',
    category: 'food-products',
    categoryLabel: 'Food Products',
    image: '/products/porridge.png',
    price: 6.99,
    description: 'Nutritious breakfast porridge made with real apples and whole grain oats, high in fiber and gluten free.',
  },
  {
    id: 'cat-005',
    title: 'Vita-Complex Multivitamin',
    category: 'food-supplements',
    categoryLabel: 'Food Supplements',
    image: '/products/vitamin.png',
    price: 29.99,
    description: 'Comprehensive daily multivitamin formula with 60 capsules, supporting overall health and vitality.',
  },
  {
    id: 'cat-006',
    title: 'Hydra-Glow Moisturizer',
    category: 'cosmetics',
    categoryLabel: 'Cosmetics',
    image: '/products/face-cream.png',
    price: 34.99,
    description: 'Luxurious daily revitalizing face cream with premium hydrating ingredients for radiant, youthful skin.',
  },
  {
    id: 'cat-007',
    title: 'Nutri-Bar Boost Protein',
    category: 'food-products',
    categoryLabel: 'Food Products',
    image: '/products/protein-bar.png',
    price: 3.49,
    description: 'High protein chocolate peanut crunch bar with 20g protein, real ingredients, and gluten free.',
  },
  {
    id: 'cat-008',
    title: 'Verdant Bloom Herbal Tea',
    category: 'food-products',
    categoryLabel: 'Food Products',
    image: '/products/herbal-tea.png',
    price: 11.99,
    description: 'Premium organic whole leaf herbal tea blend, aromatic and calming infusion in biodegradable pyramid bags.',
  },
];
