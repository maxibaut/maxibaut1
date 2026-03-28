import { JournalEntry } from './types';

/**
 * Journal entries — static phase 1.
 * Each entry's translated title, excerpt, and body live in the journal locale files.
 * Keys follow the pattern: journal.entries.[slug].title / excerpt / body
 */
export const journalEntries: JournalEntry[] = [
  {
    slug: 'petanquebaan-aangelegd',
    date: '2026-03-15',
    image: '/images/journal/petanque.jpg',
    relatedLink: '/property',
    relatedLabelKey: 'journal.relatedProperty',
  },
  {
    slug: 'lente-in-de-ardennen',
    date: '2026-03-01',
    image: '/images/journal/lente-ardennen.jpg',
    relatedLink: '/surroundings',
    relatedLabelKey: 'journal.relatedSurroundings',
  },
  {
    slug: 'kerstweekend-met-26',
    date: '2025-12-28',
    image: '/images/journal/kerst-weekend.jpg',
  },
];
