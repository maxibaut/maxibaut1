import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight } from 'lucide-react';
import { terraceDining } from '@/assets/property';

export const WhyBookDirect = () => {
  const { t } = useTranslation('homepage');

  const benefits = [
    {
      title: t('whyBookDirect.benefits.price.title'),
      description: t('whyBookDirect.benefits.price.description'),
    },
    {
      title: t('whyBookDirect.benefits.contact.title'),
      description: t('whyBookDirect.benefits.contact.description'),
    },
    {
      title: t('whyBookDirect.benefits.flexibility.title'),
      description: t('whyBookDirect.benefits.flexibility.description'),
    },
    {
      title: t('whyBookDirect.benefits.welcome.title'),
      description: t('whyBookDirect.benefits.welcome.description'),
    },
  ];

  return (
    <section className="section-padding bg-primary text-primary-foreground">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="heading-2 mb-4">{t('whyBookDirect.title')}</h2>
              <p className="body-large text-primary-foreground/80">
                {t('whyBookDirect.subtitle')}
              </p>
            </div>

            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center mt-0.5">
                    <Check className="h-4 w-4 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-medium text-primary-foreground">
                      {benefit.title}
                    </h4>
                    <p className="text-sm text-primary-foreground/70 mt-0.5">
                      {benefit.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <Link to="/booking">
                {t('whyBookDirect.title')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
              <img
                src={terraceDining}
                alt={t('whyBookDirect.imageAlt', "ArdenNest terras met eethoek voor groepen")}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gold/20 rounded-lg -z-10 hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
};
