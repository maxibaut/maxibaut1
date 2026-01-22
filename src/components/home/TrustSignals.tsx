import { useTranslation } from 'react-i18next';
import { Star, Clock, Users } from 'lucide-react';

export const TrustSignals = () => {
  const { t } = useTranslation('homepage');

  const signals = [
    {
      icon: Star,
      title: '4.8/5',
      subtitle: t('trust.googleReviews'),
      detail: t('trust.reviewCount'),
    },
    {
      icon: Clock,
      title: t('trust.experience'),
      subtitle: t('trust.experienceDetail'),
      detail: null,
    },
    {
      icon: Users,
      title: t('trust.capacity'),
      subtitle: t('trust.capacityDetail'),
      detail: null,
    },
  ];

  return (
    <section className="bg-cream-dark py-12 md:py-16">
      <div className="container-luxury">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {signals.map((signal, index) => (
            <div
              key={index}
              className="flex items-center justify-center md:justify-start space-x-4 text-center md:text-left"
            >
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
                <p className="text-sm text-muted-foreground mt-0.5">
                  {signal.subtitle}
                </p>
                {signal.detail && (
                  <p className="text-xs text-muted-foreground/80">{signal.detail}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
