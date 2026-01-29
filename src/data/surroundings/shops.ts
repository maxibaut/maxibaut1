import { ShopItem } from './types';

import proxyDelhaize00 from '@/assets/shops/proxy-delhaize-gedinne-00.webp';
import proxyDelhaize01 from '@/assets/shops/proxy-delhaize-gedinne-01.webp';
import proxyDelhaize02 from '@/assets/shops/proxy-delhaize-gedinne-02.webp';
import proxyDelhaize03 from '@/assets/shops/proxy-delhaize-gedinne-03.webp';
import intermarche01 from '@/assets/shops/intermarche-gedinne-01.jpg';
import intermarche02 from '@/assets/shops/intermarche-gedinne-02.png';
import intermarche03 from '@/assets/shops/intermarche-gedinne-03.png';
import auxDelices01 from '@/assets/shops/aux-delices-houille-01.jpg';
import auxDelices02 from '@/assets/shops/aux-delices-houille-02.jpg';
import auxDelices03 from '@/assets/shops/aux-delices-houille-03.jpg';
import auxDelices04 from '@/assets/shops/aux-delices-houille-04.jpg';
import auxDelices05 from '@/assets/shops/aux-delices-houille-05.jpg';
import auxDelices06 from '@/assets/shops/aux-delices-houille-06.jpg';

export const shops: ShopItem[] = [
  {
    id: 1,
    slug: 'bakkerij-placeholder',
    category: 'shops',
    shopType: 'bakery',
    distance: '5 min',
    images: [],
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
    images: [auxDelices02, auxDelices01, auxDelices03, auxDelices04, auxDelices05, auxDelices06],
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
