import { WalkItem } from './types';

// Route maps
import anseremmeRouteMap from '@/assets/walks/trein-anseremme-gendron-route-map.png';
import houyetRouteMap from '@/assets/walks/houyet-gendron-route-map.png';
import rochehautRouteMap from '@/assets/walks/laddertjeswandeling-rochehaut-route-map.png';

// Laddertjeswandeling Rochehaut photos
import rochehaut01 from '@/assets/walks/laddertjeswandeling-rochehaut-01.jpg';
import rochehaut02 from '@/assets/walks/laddertjeswandeling-rochehaut-02.jpg';
import rochehaut03 from '@/assets/walks/laddertjeswandeling-rochehaut-03.jpg';
import rochehaut04 from '@/assets/walks/laddertjeswandeling-rochehaut-04.jpg';
import rochehaut05 from '@/assets/walks/laddertjeswandeling-rochehaut-05.jpg';
import rochehaut06 from '@/assets/walks/laddertjeswandeling-rochehaut-06.jpg';
import rochehaut07 from '@/assets/walks/laddertjeswandeling-rochehaut-07.jpg';
import rochehaut08 from '@/assets/walks/laddertjeswandeling-rochehaut-08.jpg';
import rochehaut09 from '@/assets/walks/laddertjeswandeling-rochehaut-09.jpg';
import rochehaut10 from '@/assets/walks/laddertjeswandeling-rochehaut-10.jpg';

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

// Treinwandeling Houyet - Gendron photos
import houyetWalk00 from '@/assets/walks/houyet-gendron-00-brug-lesse.jpg';
import houyetWalk01 from '@/assets/walks/houyet-gendron-01-station.jpg';
import houyetWalk02 from '@/assets/walks/houyet-gendron-02-bospad-trap.jpg';
import houyetWalk03 from '@/assets/walks/houyet-gendron-03-wegwijzer.jpg';
import houyetWalk04 from '@/assets/walks/houyet-gendron-04-lesse.jpg';
import houyetWalk05 from '@/assets/walks/houyet-gendron-05-bospad.jpg';
import houyetWalk06 from '@/assets/walks/houyet-gendron-06-rotsen.jpg';
import houyetWalk07 from '@/assets/walks/houyet-gendron-07-panorama.jpg';
import houyetWalk08 from '@/assets/walks/houyet-gendron-08-pad.jpg';
import houyetWalk09 from '@/assets/walks/houyet-gendron-09-brug.jpg';
import houyetWalk10 from '@/assets/walks/houyet-gendron-10-terras.jpg';
import houyetWalk11 from '@/assets/walks/houyet-gendron-11-klimmen.jpg';
import houyetWalk12 from '@/assets/walks/houyet-gendron-12-steile-trap.jpg';

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
    images: [],
    routeMapImage: rochehautRouteMap,
  },
];
