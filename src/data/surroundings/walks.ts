import { WalkItem } from './types';

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
    images: [], // To be filled with real images
    externalUrl: 'https://www.fermeduchateau.be/wandelingen/treinwandeling-anseremme-gendron/',
    coordinates: {
      lat: 50.2269,
      lng: 4.9127,
    },
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
