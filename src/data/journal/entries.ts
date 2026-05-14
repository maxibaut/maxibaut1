import { JournalEntry } from './types';

/**
 * Journal entries — static phase 1.
 * Each entry's translated title, excerpt, and body live in the journal locale files.
 * Keys follow the pattern: journal.entries.[slug].title / excerpt / body
 *
 * To add a new entry:
 * 1. Add an object here with slug, date, and image path
 * 2. Place the image in public/images/journal/
 * 3. Add translations in src/locales/[nl|fr|en|de]/journal.json under entries.[slug]
 */
export const journalEntries: JournalEntry[] = [
  {
    slug: '3-generaties-symbiosa',
    date: '2026-05-12',
    image: '/images/journal/journal-symbiosa-bospad-graide.webp',
    relatedLink: '/surroundings/active/symbiosa',
    relatedLabelKey: 'relatedSurroundings',
    hideHero: true,
  },
  {
    slug: 'welkom-bij-ardennest',
    date: '2026-03-28',
    image: '/video/ardennest-reel.mp4', // poster fallback handled in component
    video: '/video/ardennest-reel.mp4',
    videoCaptionKey: 'entries.welkom-bij-ardennest.videoCaption',
    relatedLink: '/property',
    relatedLabelKey: 'relatedProperty',
  },
];
