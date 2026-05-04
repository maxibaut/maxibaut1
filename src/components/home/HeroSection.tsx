import { useEffect } from 'react';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin } from 'lucide-react';
import { heroMainWebp, heroMainAvif, heroMainFallback } from '@/assets/property';

export const HeroSection = () => {
  const { t } = useTranslation('homepage');

  // Inject preload link for hero image (LCP optimization)
  useEffect(() => {
    const isHomepage = ['/', '/fr/', '/en/', '/de/', '/fr', '/en', '/de'].includes(window.location.pathname);
    if (!isHomepage) return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.setAttribute('imagesrcset', heroMainWebp as unknown as string);
    link.setAttribute('imagesizes', '100vw');
    link.setAttribute('fetchpriority', 'high');
    link.type = 'image/webp';
    document.head.appendChild(link);
    return () => {
      if (link.parentNode) link.parentNode.removeChild(link);
    };
  }, []);

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden" aria-label={t('hero.headline')}>
      {/* Background Image — <picture> with AVIF + WebP srcset for fast LCP */}
      <picture>
        <source type="image/avif" srcSet={heroMainAvif as unknown as string} sizes="100vw" />
        <source type="image/webp" srcSet={heroMainWebp as unknown as string} sizes="100vw" />
        <img
          src={heroMainFallback}
          alt={t('hero.imageAlt', 'Luchtfoto van vakantiehuis ArdenNest met 2 hectare tuin in de Belgische Ardennen')}
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/30 to-charcoal/60" />

      {/* Content */}
      <div className="relative z-10 container-luxury text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
          {/* Sfeerslogan — visueel prominent maar geen H1 */}
          <p className="heading-display text-cream leading-tight">
            {t('hero.headline')}
          </p>

          {/* H1 — beschrijvend voor SEO en AI */}
          <h1 className="font-serif text-2xl md:text-3xl text-cream/90 max-w-2xl mx-auto font-normal">
            {t('hero.h1')}
          </h1>

          {/* Subheadline with geo info */}
          <p className="text-cream/70 text-base md:text-lg max-w-2xl mx-auto">
            {t('hero.subheadline')}
          </p>

          {/* Location badge */}
          <div className="flex items-center justify-center gap-1.5 text-cream/60">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">Gedinne · Belgische Ardennen</span>
          </div>

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
