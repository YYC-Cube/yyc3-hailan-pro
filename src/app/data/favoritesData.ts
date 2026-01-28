import { Product } from './mockData';

export interface FavoriteItem {
  id: string;
  product: Product;
  addedAt: string;
  note?: string;
}

// Mock favorites data
export const MOCK_FAVORITES: FavoriteItem[] = [
  {
    id: 'fav-1',
    product: {
      id: 'wellness-001',
      name: 'LuxeVibe Pro Max',
      category: 'Smart Vibrators',
      price: 1299,
      originalPrice: 1599,
      discount: 19,
      image: 'https://images.unsplash.com/photo-1594549857-73530bd14997?w=800&auto=format&fit=crop',
      rating: 4.9,
      reviewCount: 384,
      arEnabled: true,
      features: ['App Control', 'Waterproof', 'USB-C Charging'],
      inStock: true,
      badge: 'Bestseller',
      description: 'Premium smart vibrator with app control',
    },
    addedAt: '2026-01-15',
    note: 'Birthday gift idea',
  },
  {
    id: 'fav-2',
    product: {
      id: 'care-001',
      name: 'Intimate Care Set',
      category: 'Personal Care',
      price: 299,
      originalPrice: 399,
      discount: 25,
      image: 'https://images.unsplash.com/photo-1556228852-80e8d4e6bc4b?w=800&auto=format&fit=crop',
      rating: 4.7,
      reviewCount: 156,
      arEnabled: false,
      features: ['Organic', 'pH Balanced', 'Dermatologist Tested'],
      inStock: true,
      badge: 'New',
      description: 'Complete intimate hygiene care set',
    },
    addedAt: '2026-01-20',
  },
  {
    id: 'fav-3',
    product: {
      id: 'lube-001',
      name: 'Premium Lubricant',
      category: 'Lubricants',
      price: 149,
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop',
      rating: 4.8,
      reviewCount: 892,
      arEnabled: false,
      features: ['Water-based', 'Long-lasting', 'Non-sticky'],
      inStock: true,
      description: 'Silky smooth premium lubricant',
    },
    addedAt: '2026-01-18',
  },
];

// Helper function to check if a product is favorited
export function isFavorited(productId: string, favorites: FavoriteItem[]): boolean {
  return favorites.some(fav => fav.product.id === productId);
}

// Helper function to toggle favorite
export function toggleFavorite(
  productId: string, 
  product: Product, 
  favorites: FavoriteItem[]
): FavoriteItem[] {
  const isFav = isFavorited(productId, favorites);
  
  if (isFav) {
    return favorites.filter(fav => fav.product.id !== productId);
  } else {
    const newFavorite: FavoriteItem = {
      id: `fav-${Date.now()}`,
      product,
      addedAt: new Date().toISOString().split('T')[0],
    };
    return [...favorites, newFavorite];
  }
}
