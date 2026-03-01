import { WalkItem } from './types';

// Route maps
import anseremmeRouteMap from '@/assets/walks/trein-anseremme-gendron-route-map.png?format=webp';
import houyetRouteMap from '@/assets/walks/houyet-gendron-route-map.png?format=webp';
import rochehautRouteMap from '@/assets/walks/laddertjeswandeling-rochehaut-route-map.png?format=webp';

// Laddertjeswandeling Rochehaut photos
import rochehaut01 from '@/assets/walks/laddertjeswandeling-rochehaut-01.jpg?format=webp';
import rochehaut02 from '@/assets/walks/laddertjeswandeling-rochehaut-02.jpg?format=webp';
import rochehaut03 from '@/assets/walks/laddertjeswandeling-rochehaut-03.jpg?format=webp';
import rochehaut04 from '@/assets/walks/laddertjeswandeling-rochehaut-04.jpg?format=webp';
import rochehaut05 from '@/assets/walks/laddertjeswandeling-rochehaut-05.jpg?format=webp';
import rochehaut06 from '@/assets/walks/laddertjeswandeling-rochehaut-06.jpg?format=webp';
import rochehaut07 from '@/assets/walks/laddertjeswandeling-rochehaut-07.jpg?format=webp';
import rochehaut08 from '@/assets/walks/laddertjeswandeling-rochehaut-08.jpg?format=webp';
import rochehaut09 from '@/assets/walks/laddertjeswandeling-rochehaut-09.jpg?format=webp';
import rochehaut10 from '@/assets/walks/laddertjeswandeling-rochehaut-10.jpg?format=webp';

// Treinwandeling Anseremme - Gendron photos
import treinWalk01 from '@/assets/walks/trein-anseremme-gendron-01-kaart-lesse.jpg?format=webp';
import treinWalk02 from '@/assets/walks/trein-anseremme-gendron-02-la-lesse.jpg?format=webp';
import treinWalk03 from '@/assets/walks/trein-anseremme-gendron-03-rotsen.jpg?format=webp';
import treinWalk04 from '@/assets/walks/trein-anseremme-gendron-04-kasteel-walzin.jpg?format=webp';
import treinWalk05 from '@/assets/walks/trein-anseremme-gendron-05-wegwijzer.jpg?format=webp';
import treinWalk06 from '@/assets/walks/trein-anseremme-gendron-06-brug.jpg?format=webp';
import treinWalk07 from '@/assets/walks/trein-anseremme-gendron-07-brug-uitzicht.jpg?format=webp';
import treinWalk08 from '@/assets/walks/trein-anseremme-gendron-08-grot.jpg?format=webp';
import treinWalk09 from '@/assets/walks/trein-anseremme-gendron-09-routekaart.jpg?format=webp';

// Treinwandeling Houyet - Gendron photos
import houyetWalk00 from '@/assets/walks/houyet-gendron-00-brug-lesse.jpg?format=webp';
import houyetWalk01 from '@/assets/walks/houyet-gendron-01-station.jpg?format=webp';
import houyetWalk02 from '@/assets/walks/houyet-gendron-02-bospad-trap.jpg?format=webp';
import houyetWalk03 from '@/assets/walks/houyet-gendron-03-wegwijzer.jpg?format=webp';
import houyetWalk04 from '@/assets/walks/houyet-gendron-04-lesse.jpg?format=webp';
import houyetWalk05 from '@/assets/walks/houyet-gendron-05-bospad.jpg?format=webp';
import houyetWalk06 from '@/assets/walks/houyet-gendron-06-rotsen.jpg?format=webp';
import houyetWalk07 from '@/assets/walks/houyet-gendron-07-panorama.jpg?format=webp';
import houyetWalk08 from '@/assets/walks/houyet-gendron-08-pad.jpg?format=webp';
import houyetWalk09 from '@/assets/walks/houyet-gendron-09-brug.jpg?format=webp';
import houyetWalk10 from '@/assets/walks/houyet-gendron-10-terras.jpg?format=webp';
import houyetWalk11 from '@/assets/walks/houyet-gendron-11-klimmen.jpg?format=webp';
import houyetWalk12 from '@/assets/walks/houyet-gendron-12-steile-trap.jpg?format=webp';

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
    routeMapImage: anseremmeRouteMap,
    mapQuery: 'Gare de Gendron-Celles, Houyet, Belgium',
  },
  {
    id: 2,
    slug: 'treinwandeling-houyet-gendron',
    category: 'walks',
    duration: '2.5 uur',
    routeDistance: '8.5 km',
    difficulty: 'medium',
    buggyFriendly: false,
    distance: '25 min',
    images: [
      houyetWalk00, // Brug over de Lesse
      houyetWalk01, // Station Houyet (nieuwe positie 2)
      houyetWalk05, // Bospad met bomen (blijft op 3)
      houyetWalk09, // Brug met mensen
      houyetWalk08, // Karakteristiek wandelpad
      houyetWalk11, // Klimmen op rotsen
      houyetWalk12, // Steile trap met GR-markering
      houyetWalk06, // Rotsen
      houyetWalk07, // Panorama
      houyetWalk04, // Lesse rivier
      houyetWalk02, // Bospad met trap
      houyetWalk03, // Wegwijzer
      houyetWalk10, // Terras afsluiter
    ],
    trainBookingUrl: 'https://www.belgiantrain.be/nl',
    routeMapImage: houyetRouteMap,
    mapQuery: 'Gare de Houyet, Houyet, Belgium',
  },
  {
    id: 3,
    slug: 'wandeling-rond-malvoisin',
    category: 'walks',
    duration: '1.5 uur',
    routeDistance: '5 km',
    difficulty: 'easy',
    buggyFriendly: true,
    distance: '0 min',
    startsFromProperty: true,
    images: [],
  },
  {
    id: 4,
    slug: 'laddertjeswandeling-rochehaut',
    category: 'walks',
    duration: '3 uur',
    routeDistance: '7 km',
    difficulty: 'hard',
    buggyFriendly: false,
    distance: '30 min',
    images: [
      rochehaut01,
      rochehaut02,
      rochehaut03,
      rochehaut04,
      rochehaut05,
      rochehaut06,
      rochehaut07,
      rochehaut08,
      rochehaut09,
      rochehaut10,
    ],
    routeMapImage: rochehautRouteMap,
    mapQuery: 'Rochehaut, Bouillon, Belgium',
  },
];
