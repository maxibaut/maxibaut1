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
export const journalEntries: JournalEntry[] = [];
