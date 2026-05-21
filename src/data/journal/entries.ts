import { JournalEntry } from './types';

/**
 * Journal entries — static phase 1.
 * Each entry's translated title, excerpt, and body live in the journal locale files.
 * Keys follow the pattern: journal.entries.[slug].title / excerpt / body
 */
export const journalEntries: JournalEntry[] = [
  {
    slug: 'tour-du-millenaire-gedinne',
    date: '2026-05-18',
    image: '/images/journal/tour-du-millenaire-gedinne-uitkijktoren.webp',
    relatedLink: '/surroundings',
    relatedLabelKey: 'relatedSurroundings',
    hasFaq: true,
  },
  {
    slug: '3-generaties-symbiosa',
    date: '2026-05-12',
    image: '/images/journal/journal-symbiosa-illustratie-barbaric-personages-2.webp',
    relatedLink: '/surroundings/active/symbiosa',
    relatedLabelKey: 'relatedSurroundings',
  },
  {
    slug: 'welkom-bij-ardennest',
    date: '2026-03-28',
    image: '/video/ardennest-reel.mp4',
    video: '/video/ardennest-reel.mp4',
    videoCaptionKey: 'entries.welkom-bij-ardennest.videoCaption',
    relatedLink: '/property',
    relatedLabelKey: 'relatedProperty',
  },
];
