import { ExclusiveItem } from './types';
import { activeImages } from '@/assets/active';

export const exclusive: ExclusiveItem[] = [
  {
    id: 1,
    slug: 'ardennest-dropping',
    category: 'exclusive',
    village: 'Malvoisin',
    coordinates: { lat: 49.9750, lng: 4.9380 },
    isInternal: true,
    heroImage: activeImages.dropping[1],
    images: activeImages.dropping,
  },
];
