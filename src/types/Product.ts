export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  description: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  features?: string[];
  specifications?: Record<string, string>;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
  productCount: number;
}