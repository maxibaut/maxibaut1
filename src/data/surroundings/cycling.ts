import { CyclingItem } from './types';

import laBaladeDeSim01 from '@/assets/cycling/la-balade-de-sim-01.webp';
import laBaladeDeSim02 from '@/assets/cycling/la-balade-de-sim-02.webp';

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
    slug: 'la-balade-de-sim',
    category: 'cycling',
    routeDistance: '',
    difficulty: 'rental',
    type: 'rental',
    distance: '20 min',
    images: [laBaladeDeSim01, laBaladeDeSim02],
    coordinates: { lat: 50.0822, lng: 4.9636 },
    mapQuery: 'Castel de Beauraing, Beauraing, Belgium',
    externalUrl: 'https://www.labaladedesim.be/nl',
    phone: '+32 496 23 74 51',
    address: 'Castel de Beauraing, 5570 Beauraing',
  },
];
