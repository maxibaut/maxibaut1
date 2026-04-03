import { ShopItem } from './types';

import proxyDelhaize00 from '@/assets/shops/ardennest-winkel-proxy-delhaize-gedinne-01.webp';
import proxyDelhaize01 from '@/assets/shops/ardennest-winkel-proxy-delhaize-gedinne-02.webp';
import proxyDelhaize02 from '@/assets/shops/ardennest-winkel-proxy-delhaize-gedinne-03.webp';
import proxyDelhaize03 from '@/assets/shops/ardennest-winkel-proxy-delhaize-gedinne-04.webp';
import intermarche01 from '@/assets/shops/ardennest-winkel-intermarche-gedinne-01.jpg?format=webp';
import intermarche02 from '@/assets/shops/ardennest-winkel-intermarche-gedinne-02.jpg?format=webp';
import intermarche03 from '@/assets/shops/ardennest-winkel-intermarche-gedinne-03.jpg?format=webp';
import auxDelices00 from '@/assets/shops/ardennest-winkel-aux-delices-houille-01.jpg?format=webp';
import auxDelices01 from '@/assets/shops/ardennest-winkel-aux-delices-houille-02.jpg?format=webp';
import auxDelices02 from '@/assets/shops/ardennest-winkel-aux-delices-houille-03.jpg?format=webp';
import auxDelices03 from '@/assets/shops/ardennest-winkel-aux-delices-houille-04.jpg?format=webp';
import auxDelices04 from '@/assets/shops/ardennest-winkel-aux-delices-houille-05.jpg?format=webp';
import auxDelices05 from '@/assets/shops/ardennest-winkel-aux-delices-houille-06.jpg?format=webp';
import auxDelices06 from '@/assets/shops/ardennest-winkel-aux-delices-houille-07.jpg?format=webp';
import boulangerieDumont01 from '@/assets/shops/ardennest-winkel-boulangerie-dumont-01.jpg?format=webp';
import boulangerieDumont02 from '@/assets/shops/ardennest-winkel-boulangerie-dumont-02.jpg?format=webp';
import boulangerieDumont03 from '@/assets/shops/ardennest-winkel-boulangerie-dumont-03.jpg?format=webp';
import boulangerieDumont04 from '@/assets/shops/ardennest-winkel-boulangerie-dumont-04.jpg?format=webp';
import terracines01 from '@/assets/shops/ardennest-winkel-terracines-01.jpg?format=webp';
import terracines02 from '@/assets/shops/ardennest-winkel-terracines-02.jpg?format=webp';
import terracines03 from '@/assets/shops/ardennest-winkel-terracines-03.jpg?format=webp';
import terracines04 from '@/assets/shops/ardennest-winkel-terracines-04.jpg?format=webp';
import terracines05 from '@/assets/shops/ardennest-winkel-terracines-05.jpg?format=webp';
import terracines06 from '@/assets/shops/ardennest-winkel-terracines-06.jpg?format=webp';

export const shops: ShopItem[] = [
  {
    id: 1,
    slug: 'boulangerie-dumont',
    category: 'shops',
    shopType: 'bakery',
    distance: '10 min',
    externalUrl: 'https://www.boulangeriedumont.be/',
    coordinates: { lat: 50.0500, lng: 4.9333 },
    mapQuery: 'Boulangerie Dumont, Vencimont, Belgium',
    phone: '+32 82 21 44 72',
    address: 'Rue de la Station 2, 5575 Vencimont',
    images: [boulangerieDumont01, boulangerieDumont02, boulangerieDumont03, boulangerieDumont04],
  },
  {
    id: 2,
    slug: 'proxy-delhaize-gedinne',
    category: 'shops',
    shopType: 'supermarket',
    distance: '5 min',
    externalUrl: 'https://stores.delhaize.be/nl/proxy-delhaize-gedinne',
    coordinates: { lat: 49.9891, lng: 4.9371 },
    mapQuery: 'Proxy Delhaize, Gedinne, Belgium',
    phone: '+32 61 58 87 78',
    address: 'Rue Albert Marchal 4, 5575 Gedinne',
    images: [proxyDelhaize00, proxyDelhaize02, proxyDelhaize03, proxyDelhaize01],
  },
  {
    id: 5,
    slug: 'intermarche-gedinne',
    category: 'shops',
    shopType: 'supermarket',
    distance: '5 min',
    externalUrl: 'https://www.intermarche.be/magasins/intermarche-gedinne/',
    coordinates: { lat: 49.9858, lng: 4.9403 },
    mapQuery: 'Intermarché, Gedinne, Belgium',
    phone: '+32 61 58 89 15',
    address: 'Rue de la Station 17, 5575 Gedinne',
    images: [intermarche01, intermarche02, intermarche03],
  },
  {
    id: 6,
    slug: 'aux-delices-de-la-houille',
    category: 'shops',
    shopType: 'butcher',
    distance: '10 min',
    externalUrl: 'https://www.auxdelicesdelahouille.be/',
    coordinates: { lat: 50.0833, lng: 4.8500 },
    mapQuery: 'Aux Délices de la Houille, Vencimont, Belgium',
    phone: '+32 82 21 41 90',
    address: 'Rue de la Houille 12, 5575 Vencimont',
    images: [auxDelices00, auxDelices01, auxDelices02, auxDelices03, auxDelices04, auxDelices05, auxDelices06],
  },
  {
    id: 7,
    slug: 'terracines',
    category: 'shops',
    shopType: 'farmshop',
    distance: '15 min',
    externalUrl: 'https://www.terracines.be/',
    coordinates: { lat: 50.0997, lng: 4.9561 },
    mapQuery: 'Terracines, Beauraing, Belgium',
    phone: '+32 82 71 19 52',
    address: 'Rue de Givet 31, 5570 Beauraing',
    images: [terracines01, terracines02, terracines03, terracines04, terracines05, terracines06],
  },
];
