import { CyclingItem } from './types';
import fietsersImg from '@/assets/cycling/ardennest-fietsen-balade-de-sim-fietsers.webp';
import bhAtomImg from '@/assets/cycling/ardennest-fietsen-balade-de-sim-bh-atom.webp';

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
    heroImage: fietsersImg,
    images: [],
    bikeImage: bhAtomImg,
    mapQuery: 'La Balade de Sim, Beauraing, Belgium',
    externalUrl: 'https://www.labaladedesim.be/nl',
    phone: '',
    address: 'Castel de Beauraing, Beauraing',
    pricing: {
      year: 2026,
      shortRental: {
        fullDay: '60€',
        halfDay: '45€',
        note: 'Vertrek vanuit Castel Saint-Pierre de Beauraing',
      },
      longRental: {
        weekend: '85€',
        extraDay: '30€',
        note: 'Levering en reiniging inbegrepen',
      },
      included: 'Helm, reparatieset, gepersonaliseerde routes',
    },
  },
];
