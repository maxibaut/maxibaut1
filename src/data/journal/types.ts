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
  /** Hide the hero image at the top of the detail page (image is still used for OG/list thumbnail) */
  hideHero?: boolean;
}
