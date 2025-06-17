import { Product, Category } from '../types/Product';

export const categories: Category[] = [
  {
    id: 'home-kitchen',
    name: 'Home & Kitchen',
    image: 'https://images.pexels.com/photos/6707631/pexels-photo-6707631.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Everything for your home and kitchen needs',
    productCount: 245
  },
  {
    id: 'fashion-travel',
    name: 'Fashion & Travel',
    image: 'https://images.pexels.com/photos/934063/pexels-photo-934063.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Stylish fashion and travel accessories',
    productCount: 189
  },
  {
    id: 'health-beauty',
    name: 'Health & Beauty',
    image: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Beauty and wellness products',
    productCount: 156
  },
  {
    id: 'tech-gadgets',
    name: 'Tech & Gadgets',
    image: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Latest technology and gadgets',
    productCount: 298
  },
  {
    id: 'baby-family',
    name: 'Baby & Family',
    image: 'https://images.pexels.com/photos/1166644/pexels-photo-1166644.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Products for babies and families',
    productCount: 134
  },
  {
    id: 'pets-outdoors',
    name: 'Pets & Outdoors',
    image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Pet supplies and outdoor gear',
    productCount: 87
  },
  {
    id: 'auto-diy',
    name: 'Auto & DIY',
    image: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Automotive and DIY tools',
    productCount: 176
  },
  {
    id: 'office-stationery',
    name: 'Office & Stationery',
    image: 'https://images.pexels.com/photos/159832/pencils-color-colorful-bright-159832.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Office supplies and stationery',
    productCount: 112
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    price: 99.99,
    originalPrice: 149.99,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/205926/pexels-photo-205926.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'tech-gadgets',
    description: 'Premium wireless headphones with noise cancellation and 30-hour battery life.',
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    features: ['Noise Cancellation', '30hr Battery', 'Wireless Charging', 'Premium Sound'],
    specifications: {
      'Battery Life': '30 hours',
      'Connectivity': 'Bluetooth 5.0',
      'Weight': '250g',
      'Warranty': '2 years'
    }
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 199.99,
    originalPrice: 249.99,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'tech-gadgets',
    description: 'Advanced fitness tracking with heart rate monitoring and GPS.',
    rating: 4.7,
    reviewCount: 89,
    inStock: true,
    features: ['Heart Rate Monitor', 'GPS Tracking', 'Water Resistant', 'Sleep Tracking']
  },
  {
    id: '3',
    name: 'Premium Coffee Maker',
    price: 159.99,
    image: 'https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'home-kitchen',
    description: 'Programmable coffee maker with built-in grinder and thermal carafe.',
    rating: 4.3,
    reviewCount: 156,
    inStock: true,
    features: ['Built-in Grinder', 'Programmable', 'Thermal Carafe', '12 Cup Capacity']
  },
  {
    id: '4',
    name: 'Luxury Leather Handbag',
    price: 289.99,
    originalPrice: 399.99,
    image: 'https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'fashion-travel',
    description: 'Handcrafted genuine leather handbag with multiple compartments.',
    rating: 4.8,
    reviewCount: 67,
    inStock: true,
    features: ['Genuine Leather', 'Multiple Compartments', 'Adjustable Strap', 'Premium Lining']
  },
  {
    id: '5',
    name: 'Organic Skincare Set',
    price: 79.99,
    image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'health-beauty',
    description: 'Complete organic skincare routine with cleanser, toner, and moisturizer.',
    rating: 4.6,
    reviewCount: 234,
    inStock: true,
    features: ['100% Organic', 'Cruelty Free', 'Sensitive Skin Safe', '3-Step Routine']
  },
  {
    id: '6',
    name: 'Baby Soft Plush Toy',
    price: 29.99,
    image: 'https://images.pexels.com/photos/1166644/pexels-photo-1166644.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'baby-family',
    description: 'Ultra-soft plush toy perfect for babies and toddlers.',
    rating: 4.9,
    reviewCount: 145,
    inStock: true,
    features: ['Ultra Soft', 'Machine Washable', 'Safe Materials', 'Hypoallergenic']
  }
];

export const featuredProducts = products.slice(0, 4);
export const trendingProducts = products.slice(2, 6);