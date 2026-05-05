import { useTranslation } from 'react-i18next';

const GOOGLE_REVIEWS_URL =
  'https://www.google.com/travel/hotels/entity/CgoIvbmkjtmR3opzEAE/reviews?q=Ferme%20du%20Chateau%2C%20Gedinne%20Rue%20de%20la%20ferme%203%20Gedinne&hl=nl-BE&gl=be';

export const ReviewsSection = () => {
  const { t } = useTranslation('common');

  return (
    <section
      className="w-full bg-cream py-16 md:py-24"
      aria-labelledby="reviews-heading"
    >
      <div className="container-luxury">
        <div className="text-center mb-10 md:mb-12">
          <h2
            id="reviews-heading"
            className="heading-2 text-primary mb-4"
          >
            {t('reviews.heading')}
          </h2>
          <p className="body-base text-muted-foreground max-w-2xl mx-auto">
            {t('reviews.subheading')}
          </p>
        </div>

        {/* TRUSTINDEX WIDGET — eigenaar plakt hier de embed-code uit trustindex.io */}
        <div className="trustindex-widget-container min-h-[300px]">
          {/*
            TODO — vervang dit comment-block door:
            <div class="trustindex-widget" data-id="XXXXX"></div>
            <script defer src="https://cdn.trustindex.io/loader.js?XXXXX"></script>

            (Eigenaar krijgt deze 2 regels van trustindex.io na setup.)
          */}

          <noscript>
            <p className="text-center text-muted-foreground">
              {t('reviews.noscriptFallback')}{' '}
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary"
              >
                {t('reviews.noscriptCta')}
              </a>
            </p>
          </noscript>
        </div>

        <div className="text-center mt-8">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-primary hover:text-forest-light transition-colors"
          >
            {t('reviews.allReviewsCta')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
