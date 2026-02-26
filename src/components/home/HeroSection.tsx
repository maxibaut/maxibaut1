import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { heroMain } from '@/assets/property';

export const HeroSection = () => {
  const { t } = useTranslation('homepage');

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden" aria-label={t('hero.headline')}>
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${heroMain}')`,
        }}
        role="img"
        aria-label={t('hero.imageAlt', 'Luchtfoto van vakantiewoning Arden\'Nest met 2 hectare tuin in de Belgische Ardennen')}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/30 to-charcoal/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-luxury text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
          {/* Headline */}
          <h1 className="heading-display text-cream leading-tight">
            {t('hero.headline')}
          </h1>

          {/* Subheadline */}
          <p className="body-large text-cream/90 max-w-2xl mx-auto">
            {t('hero.subheadline')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground min-w-[220px] text-base h-12"
            >
              <Link to="/booking">
                {t('hero.cta.primary')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-cream/40 text-cream bg-transparent hover:bg-cream/10 min-w-[220px] text-base h-12"
            >
              <Link to="/contact">{t('hero.cta.secondary')}</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-cream/40 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-cream/60 rounded-full" />
        </div>
      </div>
    </section>
  );
};
