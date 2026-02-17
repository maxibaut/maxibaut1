import { RestaurantItem } from './types';

import belvedere01 from '@/assets/restaurants/le-belvedere-beauraing-01.png';
import belvedere02 from '@/assets/restaurants/le-belvedere-beauraing-02.jpg';
import belvedere03 from '@/assets/restaurants/le-belvedere-beauraing-03.jpg';

export const restaurants: RestaurantItem[] = [
  {
    id: 1,
    slug: 'le-belvedere-beauraing',
    category: 'restaurants',
    priceRange: '€',
    distance: '15 min',
    images: [belvedere01, belvedere02, belvedere03],
    mapQuery: 'Le Belvédère, Rue de Bouillon 191, Beauraing, Belgium',
    phone: '+32 473 29 65 18',
    address: 'Rue de Bouillon 191, 5570 Beauraing',
    externalUrl: 'https://wallux.com/le-belvedere',
  },
  {
    id: 2,
    slug: 'hotel-de-la-poste-gedinne',
    category: 'restaurants',
    priceRange: '€€',
    distance: '5 min',
    images: [],
    mapQuery: 'Hôtel de la Poste, Rue de Charleville 15, Gedinne, Belgium',
    phone: '+32 61 58 79 33',
    address: 'Rue de Charleville 15, 5575 Gedinne',
    externalUrl: 'https://www.facebook.com/Hoteldelapostegedinne',
  },
];
