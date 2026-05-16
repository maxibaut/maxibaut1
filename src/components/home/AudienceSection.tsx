import { useTranslation } from 'react-i18next';
import { Check, X } from 'lucide-react';

export const AudienceSection = () => {
  const { t } = useTranslation('homepage');

  return (
    <section className="section-padding bg-cream-dark">
      <div className="container-luxury max-w-3xl">
        <h2 className="heading-2 text-foreground text-center mb-4">
          {t('audience.heading')}
        </h2>
        <p className="body-large text-muted-foreground text-left mb-10">
          {t('audience.intro')}
        </p>

        <ul className="space-y-6 mb-10">
          <li className="flex items-start gap-3">
            <Check className="h-5 w-5 text-primary mt-1 shrink-0" />
            <p className="body-base text-foreground">
              <span className="font-semibold">{t('audience.yesLabel')}: </span>
              {t('audience.yesText')}
            </p>
          </li>
          <li className="flex items-start gap-3">
            <X className="h-5 w-5 text-muted-foreground mt-1 shrink-0" />
            <p className="body-base text-muted-foreground">
              <span className="font-semibold">{t('audience.noLabel')}: </span>
              {t('audience.noText')}
            </p>
          </li>
        </ul>

        <p className="body-base text-foreground text-left font-medium">
          {t('audience.closing')}
        </p>
      </div>
    </section>
  );
};
