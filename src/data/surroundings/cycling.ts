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
    images: [],
    mapQuery: 'La Balade de Sim, Beauraing, Belgium',
    externalUrl: 'https://www.labaladedesim.be/nl',
    phone: '',
    address: 'Castel de Beauraing, Beauraing',
  },
];
