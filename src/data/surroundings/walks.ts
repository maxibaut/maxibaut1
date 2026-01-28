import { WalkItem } from './types';

// Treinwandeling Anseremme - Gendron photos
import treinWalk01 from '@/assets/walks/trein-anseremme-gendron-01-kaart-lesse.jpg';
import treinWalk02 from '@/assets/walks/trein-anseremme-gendron-02-la-lesse.jpg';
import treinWalk03 from '@/assets/walks/trein-anseremme-gendron-03-rotsen.jpg';
import treinWalk04 from '@/assets/walks/trein-anseremme-gendron-04-kasteel-walzin.jpg';
import treinWalk05 from '@/assets/walks/trein-anseremme-gendron-05-wegwijzer.jpg';
import treinWalk06 from '@/assets/walks/trein-anseremme-gendron-06-brug.jpg';
import treinWalk07 from '@/assets/walks/trein-anseremme-gendron-07-brug-uitzicht.jpg';
import treinWalk08 from '@/assets/walks/trein-anseremme-gendron-08-grot.jpg';
import treinWalk09 from '@/assets/walks/trein-anseremme-gendron-09-routekaart.jpg';

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
      treinWalk04, // Kasteel Walzin - mooiste foto eerst
      treinWalk07, // Brug uitzicht met strand Walzin
      treinWalk06, // Op de brug
      treinWalk03, // Rotsformaties
      treinWalk08, // Grot
      treinWalk02, // La Lesse met kaart
      treinWalk05, // Wegwijzer
      treinWalk01, // Kaart op brug
      treinWalk09, // Routekaart
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
