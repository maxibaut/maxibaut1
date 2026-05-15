import { useTranslation } from 'react-i18next';
import { ExternalLink } from 'lucide-react';

const GOOGLE_REVIEWS_URL =
  'https://www.google.com/travel/hotels/entity/CgoIvbmkjtmR3opzEAE/reviews?q=Ferme%20du%20Chateau%2C%20Gedinne%20Rue%20de%20la%20ferme%203%20Gedinne&hl=nl-BE&gl=be';

interface Tile {
  number: string;
  label: string;
  description: string;
}

export const WhyChoose = () => {
  const { t } = useTranslation('homepage');
  const tiles = t('whyChoose.tiles', { returnObjects: true }) as Tile[];

  return (
    <section className="bg-cream-dark section-padding">
      <div className="container-luxury">
        <h2 className="heading-2 text-foreground text-center mb-10 md:mb-14">
          {t('whyChoose.title')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {tiles.map((tile, index) => {
            const isReview = index === tiles.length - 1;
            const inner = (
              <>
                <div className="font-serif text-5xl md:text-6xl font-medium text-primary leading-none mb-3">
                  {tile.number}
                </div>
                <div className="text-secondary font-medium text-base mb-3 flex items-center gap-1.5">
                  {tile.label}
                  {isReview && <ExternalLink className="h-3.5 w-3.5" />}
                </div>
                <p className="body-small text-muted-foreground leading-relaxed">
                  {tile.description}
                </p>
              </>
            );

            const className =
              'bg-card border border-border rounded-lg p-6 md:p-8 h-full text-left transition-colors';

            if (isReview) {
              return (
                <a
                  key={index}
                  href={GOOGLE_REVIEWS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${className} hover:border-primary/40`}
                >
                  {inner}
                </a>
              );
            }

            return (
              <div key={index} className={className}>
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
