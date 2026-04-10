// Types for surroundings items - technical data structure
// Translations are handled in locale JSON files

export type SurroundingsCategory = 'walks' | 'cycling' | 'active' | 'exclusive' | 'attractions' | 'restaurants' | 'shops';

export type Difficulty = 'easy' | 'medium' | 'hard';

// Base interface for all surroundings items
export interface SurroundingsItemBase {
  id: number;
  slug: string;
  category: SurroundingsCategory;
  village?: string; // Village/town name for SEO titles (e.g. "Gedinne", "Beauraing")
  distance?: string; // Distance from property
  heroImage?: string; // Hero background image (not shown in gallery)
  images?: string[]; // Array of gallery image paths
  externalUrl?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  mapQuery?: string; // Human-readable search query for Google Maps (overrides coordinates)
  phone?: string; // Phone number
  address?: string; // Physical address
  openingHours?: string; // Opening hours (translated via locale key)
}

// Walk-specific fields
export interface WalkItem extends SurroundingsItemBase {
  category: 'walks';
  duration: string;
  routeDistance: string; // Walking distance
  difficulty: Difficulty;
  buggyFriendly: boolean;
  startsFromProperty?: boolean; // Walk starts from the house
  trainBookingUrl?: string; // Link to train booking website
  routeMapImage?: string; // Route map image
}

export interface CyclingPricing {
  year: number;
  shortRental: { fullDay: string; halfDay: string; note: string };
  longRental: { weekend: string; extraDay: string; note: string };
  included: string;
}

// Cycling-specific fields
export interface CyclingItem extends SurroundingsItemBase {
  category: 'cycling';
  routeDistance: string;
  difficulty: Difficulty | 'rental';
  type: 'route' | 'rental';
  bikeImage?: string; // Optional inline bike/product image shown in description
  pricing?: CyclingPricing;
}

// Attraction-specific fields
export interface AttractionItem extends SurroundingsItemBase {
  category: 'attractions';
}

// Restaurant-specific fields
export interface RestaurantItem extends SurroundingsItemBase {
  category: 'restaurants';
  priceRange: '€' | '€€' | '€€€';
  restaurantType: 'restaurant' | 'pizza' | 'frituur';
}

// Shop-specific fields
export interface ShopItem extends SurroundingsItemBase {
  category: 'shops';
  shopType: string; // Will be translated via locale key
}

// Active adventure-specific fields
export interface ActiveItem extends SurroundingsItemBase {
  category: 'active';
}

// Exclusive experience-specific fields
export interface ExclusiveItem extends SurroundingsItemBase {
  category: 'exclusive';
  isInternal?: boolean; // No external URL, internal ArdenNest experience
}

// Union type for all item types
export type SurroundingsItem = WalkItem | CyclingItem | ActiveItem | ExclusiveItem | AttractionItem | RestaurantItem | ShopItem;

// Helper to get locale key path for an item
export const getLocaleKey = (item: SurroundingsItemBase, field: string): string => {
  return `items.${item.category}.${item.slug}.${field}`;
};

// Helper to get route path for an item
export const getItemPath = (item: SurroundingsItemBase, lang?: string): string => {
  const langPrefix = lang ? `/${lang}` : '';
  return `${langPrefix}/surroundings/${item.category}/${item.slug}`;
};
