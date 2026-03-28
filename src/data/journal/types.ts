export interface JournalEntry {
  slug: string;
  date: string; // ISO date string
  image: string;
  /** Optional related page link */
  relatedLink?: string;
  relatedLabelKey?: string;
}
