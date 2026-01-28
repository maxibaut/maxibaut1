import { WalkItem } from './types';

// Temporary: using property images until walk photos are provided
import ferme010 from '@/assets/property/ferme-010.jpg';
import ferme022 from '@/assets/property/ferme-022.jpg';
import ferme064 from '@/assets/property/ferme-064.jpg';
import ferme089 from '@/assets/property/ferme-089.jpg';
import ferme102 from '@/assets/property/ferme-102.jpg';

export const walks: WalkItem[] = [
  {
    id: 1,
    slug: 'treinwandeling-anseremme-gendron',
    category: 'walks',
    duration: '3 uur',
    routeDistance: '8 km',
    difficulty: 'easy',
    buggyFriendly: true,
    distance: '15 min',
    images: [ferme010, ferme022, ferme064, ferme089, ferme102],
    trainBookingUrl: 'https://www.belgiantrain.be/nl',
  },
  {
    id: 2,
    slug: 'treinwandeling-houyet-gendron',
    category: 'walks',
    duration: '4 uur',
    routeDistance: '10 km',
    difficulty: 'medium',
    buggyFriendly: false,
    distance: '20 min',
    images: [],
  },
  {
    id: 3,
    slug: 'wandeling-rond-malvoisin',
    category: 'walks',
    duration: '1.5 uur',
    routeDistance: '5 km',
    difficulty: 'easy',
    buggyFriendly: true,
    distance: '5 min',
    images: [],
  },
];
