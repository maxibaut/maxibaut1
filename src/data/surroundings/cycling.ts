import { CyclingItem } from './types';

export const cycling: CyclingItem[] = [
  {
    id: 1,
    slug: 'ravel-dinant-givet',
    category: 'cycling',
    routeDistance: '20 km (heen)',
    difficulty: 'easy',
    type: 'route',
    distance: '15 min',
    images: [],
    mapQuery: 'RAVeL Ligne 150, Dinant, Belgium',
  },
  {
    id: 2,
    slug: 'mountainbike-beauraing',
    category: 'cycling',
    routeDistance: 'Diverse routes',
    difficulty: 'hard',
    type: 'route',
    distance: '20 min',
    images: [],
    mapQuery: 'Beauraing, Belgium',
  },
  {
    id: 3,
    slug: 'fietsverhuur-dinant',
    category: 'cycling',
    routeDistance: '',
    difficulty: 'rental',
    type: 'rental',
    distance: '15 min',
    images: [],
    mapQuery: 'Dinant, Belgium',
  },
];
