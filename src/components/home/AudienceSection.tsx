import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';

export const AudienceSection = () => {
  const { t } = useTranslation('homepage');

  const bullets = [
    t('audience.bullet1'),
    t('audience.bullet2'),
    t('audience.bullet3'),
    t('audience.bullet4'),
  ];

  return (
    <section className="section-padding bg-cream-dark">
      <div className="container-luxury max-w-3xl">
        <h2 className="heading-2 text-foreground text-center mb-4">
          {t('audience.heading')}
        </h2>
        <p className="body-large text-muted-foreground text-center mb-10">
          {t('audience.intro')}
        </p>

        <ul className="space-y-4 mb-10">
          {bullets.map((bullet, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <span className="body-base text-foreground">{bullet}</span>
            </li>
          ))}
        </ul>

        <p className="body-base text-muted-foreground text-center mb-4">
          {t('audience.exclusion')}
        </p>

        <p className="body-base text-muted-foreground text-center mb-8">
          {t('audience.noPets')}
        </p>

        <p className="body-large text-foreground text-center font-medium">
          {t('audience.closing')}
        </p>
      </div>
    </section>
  );
};
