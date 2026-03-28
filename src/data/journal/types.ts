export interface JournalEntry {
  slug: string;
  date: string; // ISO date string
  image: string;
  /** Optional MP4 video path */
  video?: string;
  /** Optional video caption translation key */
  videoCaptionKey?: string;
  /** Optional related page link */
  relatedLink?: string;
  relatedLabelKey?: string;
}
