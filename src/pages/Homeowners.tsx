import { useTranslation } from 'react-i18next';
import { useEffect, ReactNode } from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, Code, Brain, Shield, TrendingUp, Building2 } from 'lucide-react';
import useSEO from '@/hooks/useSEO';
import ardennestScore from '@/assets/ardennest-score.png';

const expertiseCards = [
  { icon: Code, key: 'software' },
  { icon: Brain, key: 'ai' },
  { icon: TrendingUp, key: 'bid' },
  { icon: Building2, key: 'platform' },
] as const;

/** Replace every "BizBuz" (case-sensitive) in a string with a clickable link */
const linkify = (text: string): ReactNode[] =>
  text.split(/(BizBuz(?:\.be)?)/g).map((part, i) =>
    /^BizBuz/.test(part) ? (
      <a key={i} href="https://bizbuz.be" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80 transition-colors">
        bizbuz.be
      </a>
    ) : part
  );

const Homeowners = () => {
  const { t, i18n } = useTranslation('homeowners');

  useSEO({
    titleKey: 'seo.title',
    descriptionKey: 'seo.description',
    namespace: 'homeowners',
  });

  // JSON-LD structured data
  useEffect(() => {
    const lang = i18n.language;
    const basePath = lang === 'nl' ? '' : `/${lang}`;
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": t('title'),
      "description": t('seo.description'),
      "author": {
        "@type": "Person",
        "name": "Christophe",
        "jobTitle": "ClickUp Expert & Process Automation Specialist",
        "worksFor": { "@type": "Organization", "name": "Fourcast" },
        "affiliation": { "@type": "LodgingBusiness", "name": "ArdenNest", "url": "https://ardennest.be" }
      },
      "publisher": {
        "@type": "Organization",
        "name": "ArdenNest",
        "url": "https://ardennest.be",
        "logo": "https://ardennest.be/favicon.png"
      },
      "url": `https://ardennest.be${basePath}/homeowners`,
      "inLanguage": lang,
      "mainEntityOfPage": `https://ardennest.be${basePath}/homeowners`,
      "about": [
        { "@type": "Thing", "name": "AI-optimized websites" },
        { "@type": "Thing", "name": "Generative Engine Optimization" },
        { "@type": "SoftwareApplication", "name": "BizBuz.be", "url": "https://bizbuz.be", "applicationCategory": "WebApplication" }
      ]
    };

    let script = document.querySelector('script[data-page-jsonld="homeowners"]') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-page-jsonld', 'homeowners');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);

    return () => { script?.remove(); };
  }, [t, i18n.language]);

  return (
    <PageWrapper>
      <div className="py-16 md:py-24">
        <div className="container max-w-4xl mx-auto px-4 space-y-16">

          {/* 1. Hero */}
          <section>
            <Badge variant="secondary" className="mb-4 text-sm font-normal">
              {t('badge')}
            </Badge>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-6">
              {t('title')}
            </h1>
            <p className="text-foreground/90 text-lg leading-relaxed">
              {linkify(t('intro'))}
            </p>
            <div className="mt-6 flex justify-center">
              <Button asChild size="lg" className="gap-2">
                <a href="https://bizbuz.be" target="_blank" rel="noopener noreferrer">
                  {t('cta')}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </section>

          {/* 2. Waarom dit relevant is */}
          <section className="bg-muted/50 border border-border rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-serif text-xl md:text-2xl font-semibold text-primary mb-3">
                  {t('whyRelevant.title')}
                </h2>
                <p className="text-foreground/80 leading-relaxed">
                  {linkify(t('whyRelevant.content'))}
                </p>
              </div>
            </div>
          </section>

          {/* 3. Technische achtergrond — 2x2 grid */}
          <section>
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-primary mb-6">
              {t('expertise.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {expertiseCards.map(({ icon: Icon, key }) => (
                <Card key={key} className="border-border">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {t(`expertise.${key}.title`)}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {t(`expertise.${key}.description`)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 4. Oorsprongsverhaal */}
          <section className="border-l-[3px] border-primary pl-5">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-primary mb-4">
              {t('origin.title')}
            </h2>
            <div className="space-y-4">
              <p className="text-foreground/90 leading-relaxed">{t('origin.story1')}</p>
              <p className="text-foreground/90 leading-relaxed">{t('origin.story2')}</p>
              <p className="text-foreground/90 leading-relaxed font-medium">{linkify(t('origin.story3'))}</p>
              <p className="text-foreground/90 leading-relaxed font-medium">
                {t('origin.story3_link_prefix')}
                <a href="https://bizbuz.be" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80 transition-colors">
                  {t('origin.story3_link_text')}
                </a>
                {t('origin.story3_link_suffix')}
              </p>
            </div>
          </section>

          {/* CTA na verhaal */}
          <div className="flex justify-center">
            <Button asChild size="lg" className="gap-2">
              <a href="https://bizbuz.be" target="_blank" rel="noopener noreferrer">
                {t('cta')}
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>

          {/* 5. Festina Lente */}
          <section className="bg-muted/30 rounded-lg p-6">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-primary mb-4">
              {t('festinaLente.subtitle')}
            </h2>
            <div className="space-y-4">
              <p className="text-foreground/80 leading-relaxed">{linkify(t('festinaLente.text1'))}</p>
              <p className="text-foreground/80 leading-relaxed">{linkify(t('festinaLente.text2'))}</p>
            </div>
          </section>

          {/* 6. Eigen score bewijs */}
          <section className="text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-primary mb-6">
              {t('score.title')}
            </h2>
            <div className="flex justify-center">
              <a href="https://bizbuz.be" target="_blank" rel="noopener noreferrer">
                <img
                  src={ardennestScore}
                  alt={t('score.alt')}
                  className="rounded-lg border border-border shadow-sm max-w-md w-full hover:shadow-md transition-shadow cursor-pointer"
                  loading="lazy"
                />
              </a>
            </div>
          </section>

          {/* Footer attribution */}
          <p className="text-sm text-muted-foreground text-center border-t border-border pt-8">
            {linkify(t('attribution'))}
          </p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Homeowners;
