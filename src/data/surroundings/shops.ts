import { ShopItem } from './types';

import proxyDelhaize00 from '@/assets/shops/proxy-delhaize-gedinne-00.webp';
import proxyDelhaize01 from '@/assets/shops/proxy-delhaize-gedinne-01.webp';
import proxyDelhaize02 from '@/assets/shops/proxy-delhaize-gedinne-02.webp';
import proxyDelhaize03 from '@/assets/shops/proxy-delhaize-gedinne-03.webp';
import intermarche01 from '@/assets/shops/intermarche-gedinne-01.jpg';
import intermarche02 from '@/assets/shops/intermarche-gedinne-02.png';
import intermarche03 from '@/assets/shops/intermarche-gedinne-03.png';
import auxDelices00 from '@/assets/shops/aux-delices-houille-00.jpg';
import auxDelices01 from '@/assets/shops/aux-delices-houille-01.jpg';
import auxDelices02 from '@/assets/shops/aux-delices-houille-02.jpg';
import auxDelices03 from '@/assets/shops/aux-delices-houille-03.jpg';
import auxDelices04 from '@/assets/shops/aux-delices-houille-04.jpg';
import auxDelices05 from '@/assets/shops/aux-delices-houille-05.jpg';
import auxDelices06 from '@/assets/shops/aux-delices-houille-06.jpg';
import boulangerieDumont01 from '@/assets/shops/boulangerie-dumont-01.jpg';
import boulangerieDumont02 from '@/assets/shops/boulangerie-dumont-02.jpg';
import boulangerieDumont03 from '@/assets/shops/boulangerie-dumont-03.jpg';
import boulangerieDumont04 from '@/assets/shops/boulangerie-dumont-04.jpg';

export const shops: ShopItem[] = [
  {
    id: 1,
    slug: 'boulangerie-dumont',
    category: 'shops',
    shopType: 'bakery',
    distance: '10 min',
    externalUrl: 'https://www.boulangeriedumont.be/',
    coordinates: {
      lat: 50.0500,
      lng: 4.9333,
    },
    images: [boulangerieDumont01, boulangerieDumont02, boulangerieDumont03, boulangerieDumont04],
  },
  {
    id: 2,
    slug: 'proxy-delhaize-gedinne',
    category: 'shops',
    shopType: 'supermarket',
    distance: '5 min',
    externalUrl: 'https://stores.delhaize.be/nl/proxy-delhaize-gedinne',
    coordinates: {
      lat: 49.9891,
      lng: 4.9371,
    },
    images: [proxyDelhaize00, proxyDelhaize02, proxyDelhaize03, proxyDelhaize01],
  },
  {
    id: 5,
    slug: 'intermarche-gedinne',
    category: 'shops',
    shopType: 'supermarket',
    distance: '5 min',
    externalUrl: 'https://www.intermarche.be/magasins/intermarche-gedinne/',
    coordinates: {
      lat: 49.9858,
      lng: 4.9403,
    },
    images: [intermarche01, intermarche02, intermarche03],
  },
  {
    id: 6,
    slug: 'aux-delices-de-la-houille',
    category: 'shops',
    shopType: 'butcher',
    distance: '10 min',
    externalUrl: 'https://www.auxdelicesdelahouille.be/',
    coordinates: {
      lat: 50.0833,
      lng: 4.8500,
    },
    images: [auxDelices00, auxDelices01, auxDelices02, auxDelices03, auxDelices04, auxDelices05, auxDelices06],
  },
  {
    id: 4,
    slug: 'boerderijwinkel-placeholder',
    category: 'shops',
    shopType: 'farmshop',
    distance: '15 min',
    images: [],
  },
];
