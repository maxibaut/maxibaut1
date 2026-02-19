import { CyclingItem } from './types';
import fietsersImg from '@/assets/cycling/la-balade-de-sim-fietsers.webp';
import bhAtomImg from '@/assets/cycling/la-balade-de-sim-bh-atom.webp';

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
    images: [fietsersImg],
    bikeImage: bhAtomImg,
    mapQuery: 'La Balade de Sim, Beauraing, Belgium',
    externalUrl: 'https://www.labaladedesim.be/nl',
    phone: '',
    address: 'Castel de Beauraing, Beauraing',
  },
];
