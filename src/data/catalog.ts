export type CatalogCategory = 'all' | 'silk' | 'handloom' | 'bridal';

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
}[] = [];

export const CATALOG_PRODUCTS: CatalogProduct[] = [];

