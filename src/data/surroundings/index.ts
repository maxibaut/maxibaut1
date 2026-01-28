// Central export for all surroundings data

export * from './types';
export { walks } from './walks';
export { cycling } from './cycling';
export { attractions } from './attractions';
export { restaurants } from './restaurants';
export { shops } from './shops';

import { walks } from './walks';
import { cycling } from './cycling';
import { attractions } from './attractions';
import { restaurants } from './restaurants';
import { shops } from './shops';
import { SurroundingsItem, SurroundingsCategory } from './types';

// Get all items by category
export const getItemsByCategory = (category: SurroundingsCategory): SurroundingsItem[] => {
  switch (category) {
    case 'walks':
      return walks;
    case 'cycling':
      return cycling;
    case 'attractions':
      return attractions;
    case 'restaurants':
      return restaurants;
    case 'shops':
      return shops;
    default:
      return [];
  }
};

// Get a single item by category and slug
export const getItemBySlug = (
  category: SurroundingsCategory,
  slug: string
): SurroundingsItem | undefined => {
  const items = getItemsByCategory(category);
  return items.find((item) => item.slug === slug);
};

// Get all items
export const getAllItems = (): SurroundingsItem[] => {
  return [...walks, ...cycling, ...attractions, ...restaurants, ...shops];
};
