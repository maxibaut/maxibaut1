import { useTranslation } from 'react-i18next';
import { Star, Clock, ExternalLink } from 'lucide-react';
import { MdFamilyRestroom } from 'react-icons/md';

const GOOGLE_REVIEWS_URL = 'https://www.google.com/travel/hotels/entity/CgoIvbmkjtmR3opzEAE/reviews?q=Ferme%20du%20Chateau%2C%20Gedinne%20Rue%20de%20la%20ferme%203%20Gedinne&hl=nl-BE&gl=be';

export const TrustSignals = () => {
  const { t } = useTranslation('homepage');

  const signals = [
    {
      icon: Star,
      title: '4.8/5',
      subtitle: t('trust.googleReviews'),
      detail: t('trust.reviewCount'),
      isReview: true,
    },
    {
      icon: Clock,
      title: t('trust.experience'),
      subtitle: t('trust.experienceDetail'),
      detail: null,
      isReview: false,
    },
    {
      icon: MdFamilyRestroom,
      title: t('trust.capacity'),
      subtitle: t('trust.capacityDetail'),
      detail: null,
      isReview: false,
    },
  ];

  return (
    <section className="bg-cream-dark py-12 md:py-16">
      <div className="container-luxury">
        <h2 className="sr-only">{t('trust.sectionTitle', 'Waarom gezinnen ArdenNest vertrouwen')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {signals.map((signal, index) => {
            const content = (
              <>
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <signal.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-serif font-semibold text-primary">
                      {signal.title}
                    </span>
                    {signal.icon === Star && (
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < 5 ? 'fill-gold text-gold' : 'text-muted'}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5 flex items-center gap-1">
                    {signal.subtitle}
                    {signal.isReview && <ExternalLink className="h-3 w-3" />}
                  </p>
                  {signal.detail && (
                    <p className="text-xs text-muted-foreground">{signal.detail}</p>
                  )}
                </div>
              </>
            );

            if (signal.isReview) {
              return (
                <a
                  key={index}
                  href={GOOGLE_REVIEWS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center md:justify-start space-x-4 text-center md:text-left hover:opacity-80 transition-opacity cursor-pointer"
                >
                  {content}
                </a>
              );
            }

            return (
              <div
                key={index}
                className="flex items-center justify-center md:justify-start space-x-4 text-center md:text-left"
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
