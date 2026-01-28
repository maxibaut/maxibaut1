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
    images: [
      'https://www.fermeduchateau.be/wp-content/uploads/2020/07/20200725_160825-1024x768.jpg',
      'https://www.fermeduchateau.be/wp-content/uploads/2020/07/20200725_162401-768x1024.jpg',
      'https://www.fermeduchateau.be/wp-content/uploads/2020/07/20200725_163903-768x1024.jpg',
      'https://www.fermeduchateau.be/wp-content/uploads/2020/07/20200726_120203-768x1024.jpg',
      'https://www.fermeduchateau.be/wp-content/uploads/2020/07/20200725_152015-768x1024.jpg',
    ],
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
