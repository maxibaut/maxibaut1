import { WalkItem } from './types';

// Route maps
import anseremmeRouteMap from '@/assets/walks/ardennest-wandeling-anseremme-gendron-routekaart.jpg?format=webp';
import houyetRouteMap from '@/assets/walks/ardennest-wandeling-houyet-gendron-routekaart.jpg?format=webp';
import rochehautRouteMap from '@/assets/walks/ardennest-wandeling-rochehaut-routekaart.jpg?format=webp';

// CapRando wandelgids photos
import caprando01 from '@/assets/walks/ardennest-wandeling-caprando-groep-picknick.jpg?format=webp';
import caprando02 from '@/assets/walks/ardennest-wandeling-caprando-natuur.jpg?format=webp';
import caprando03 from '@/assets/walks/ardennest-wandeling-caprando-semois-meanders.jpg?format=webp';
import caprando04 from '@/assets/walks/ardennest-wandeling-caprando-bos.jpg?format=webp';
import caprando05 from '@/assets/walks/ardennest-wandeling-caprando-lesse-vallei.jpg?format=webp';
import caprando06 from '@/assets/walks/ardennest-wandeling-caprando-orientatie.jpg?format=webp';

// Laddertjeswandeling Rochehaut photos
import rochehaut01 from '@/assets/walks/ardennest-wandeling-rochehaut-01.jpg?format=webp';
import rochehaut02 from '@/assets/walks/ardennest-wandeling-rochehaut-02.jpg?format=webp';
import rochehaut03 from '@/assets/walks/ardennest-wandeling-rochehaut-03.jpg?format=webp';
import rochehaut04 from '@/assets/walks/ardennest-wandeling-rochehaut-04.jpg?format=webp';
import rochehaut05 from '@/assets/walks/ardennest-wandeling-rochehaut-05.jpg?format=webp';
import rochehaut06 from '@/assets/walks/ardennest-wandeling-rochehaut-06.jpg?format=webp';
import rochehaut07 from '@/assets/walks/ardennest-wandeling-rochehaut-07.jpg?format=webp';
import rochehaut08 from '@/assets/walks/ardennest-wandeling-rochehaut-08.jpg?format=webp';
import rochehaut09 from '@/assets/walks/ardennest-wandeling-rochehaut-09.jpg?format=webp';
import rochehaut10 from '@/assets/walks/ardennest-wandeling-rochehaut-10.jpg?format=webp';

// Treinwandeling Anseremme - Gendron photos
import treinWalk01 from '@/assets/walks/ardennest-wandeling-anseremme-gendron-kaart-lesse.jpg?format=webp';
import treinWalk02 from '@/assets/walks/ardennest-wandeling-anseremme-gendron-la-lesse.jpg?format=webp';
import treinWalk03 from '@/assets/walks/ardennest-wandeling-anseremme-gendron-rotsen.jpg?format=webp';
import treinWalk04 from '@/assets/walks/ardennest-wandeling-anseremme-kasteel-walzin.jpg?format=webp';
import treinWalk05 from '@/assets/walks/ardennest-wandeling-anseremme-gendron-wegwijzer.jpg?format=webp';
import treinWalk06 from '@/assets/walks/ardennest-wandeling-anseremme-gendron-brug.jpg?format=webp';
import treinWalk07 from '@/assets/walks/ardennest-wandeling-anseremme-gendron-brug-uitzicht.jpg?format=webp';
import treinWalk08 from '@/assets/walks/ardennest-wandeling-anseremme-gendron-grot.jpg?format=webp';
import treinWalk09 from '@/assets/walks/ardennest-wandeling-anseremme-routekaart-detail.jpg?format=webp';

// Treinwandeling Houyet - Gendron photos
import houyetWalk00 from '@/assets/walks/ardennest-wandeling-houyet-gendron-brug-lesse.jpg?format=webp';
import houyetWalk01 from '@/assets/walks/ardennest-wandeling-houyet-gendron-station.jpg?format=webp';
import houyetWalk02 from '@/assets/walks/ardennest-wandeling-houyet-gendron-bospad-trap.jpg?format=webp';
import houyetWalk03 from '@/assets/walks/ardennest-wandeling-houyet-gendron-wegwijzer.jpg?format=webp';
import houyetWalk04 from '@/assets/walks/ardennest-wandeling-houyet-gendron-lesse.jpg?format=webp';
import houyetWalk05 from '@/assets/walks/ardennest-wandeling-houyet-gendron-bospad.jpg?format=webp';
import houyetWalk06 from '@/assets/walks/ardennest-wandeling-houyet-gendron-rotsen.jpg?format=webp';
import houyetWalk07 from '@/assets/walks/ardennest-wandeling-houyet-gendron-panorama.jpg?format=webp';
import houyetWalk08 from '@/assets/walks/ardennest-wandeling-houyet-gendron-pad.jpg?format=webp';
import houyetWalk09 from '@/assets/walks/ardennest-wandeling-houyet-gendron-brug.jpg?format=webp';
import houyetWalk10 from '@/assets/walks/ardennest-wandeling-houyet-gendron-terras.jpg?format=webp';
import houyetWalk11 from '@/assets/walks/ardennest-wandeling-houyet-gendron-klimmen.jpg?format=webp';
import houyetWalk12 from '@/assets/walks/ardennest-wandeling-houyet-gendron-steile-trap.jpg?format=webp';

export const walks: WalkItem[] = [
  {
    id: 1,
    slug: 'treinwandeling-anseremme-gendron',
    category: 'walks',
    village: 'Gendron-Celles',
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
    village: 'Houyet',
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
    village: 'Malvoisin',
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
    village: 'Rochehaut',
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
  {
    id: 5,
    slug: 'caprando-wandelgids',
    category: 'walks',
    village: 'Malvoisin',
    duration: 'op maat',
    routeDistance: 'op maat',
    difficulty: 'medium',
    buggyFriendly: false,
    distance: '0 min',
    startsFromProperty: true,
    heroImage: caprando03,
    images: [
      caprando01,
      caprando02,
      caprando03,
      caprando04,
      caprando05,
      caprando06,
    ],
    externalUrl: 'https://www.caprando.be/',
    mapQuery: 'Malvoisin, Vresse-sur-Semois, Belgium',
  },
];
