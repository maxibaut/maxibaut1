// Types for surroundings items - technical data structure
// Translations are handled in locale JSON files

export type SurroundingsCategory = 'walks' | 'cycling' | 'attractions' | 'restaurants' | 'shops';

export type Difficulty = 'easy' | 'medium' | 'hard';

// Base interface for all surroundings items
export interface SurroundingsItemBase {
  id: number;
  slug: string;
  category: SurroundingsCategory;
  distance?: string; // Distance from property
  images?: string[]; // Array of image paths
  externalUrl?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// Walk-specific fields
export interface WalkItem extends SurroundingsItemBase {
  category: 'walks';
  duration: string;
  routeDistance: string; // Walking distance
  difficulty: Difficulty;
  buggyFriendly: boolean;
  trainBookingUrl?: string; // Link to train booking website
  routeMapImage?: string; // Route map image
}

// Cycling-specific fields
export interface CyclingItem extends SurroundingsItemBase {
  category: 'cycling';
  routeDistance: string;
  difficulty: Difficulty | 'rental';
  type: 'route' | 'rental';
}

// Attraction-specific fields
export interface AttractionItem extends SurroundingsItemBase {
  category: 'attractions';
}

// Restaurant-specific fields
export interface RestaurantItem extends SurroundingsItemBase {
  category: 'restaurants';
  priceRange: '€' | '€€' | '€€€';
}

// Shop-specific fields
export interface ShopItem extends SurroundingsItemBase {
  category: 'shops';
  shopType: string; // Will be translated via locale key
}

// Union type for all item types
export type SurroundingsItem = WalkItem | CyclingItem | AttractionItem | RestaurantItem | ShopItem;

// Helper to get locale key path for an item
export const getLocaleKey = (item: SurroundingsItemBase, field: string): string => {
  return `items.${item.category}.${item.slug}.${field}`;
};

// Helper to get route path for an item
export const getItemPath = (item: SurroundingsItemBase, lang?: string): string => {
  const langPrefix = lang ? `/${lang}` : '';
  return `${langPrefix}/surroundings/${item.category}/${item.slug}`;
};
