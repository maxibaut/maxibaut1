import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import { ExternalLink, Search, Building2, MessageSquareText, Shield, ListChecks, RefreshCw } from 'lucide-react';
import useSEO from '@/hooks/useSEO';

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
      "url": `https://ardennest.be${basePath}/huiseigenaars`,
      "inLanguage": lang,
      "mainEntityOfPage": `https://ardennest.be${basePath}/huiseigenaars`,
      "about": [
        { "@type": "Thing", "name": "AI-optimized websites" },
        { "@type": "Thing", "name": "Generative Engine Optimization" },
        { "@type": "SoftwareApplication", "name": "GEO-Scan.be", "url": "https://geo-scan.be", "applicationCategory": "WebApplication" }
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

  const learnings = [
    { title: t('learnings.answers.title'), text: t('learnings.answers.text') },
    { title: t('learnings.concrete.title'), text: t('learnings.concrete.text') },
    { title: t('learnings.honesty.title'), text: t('learnings.honesty.text') },
    { title: t('learnings.consistency.title'), text: t('learnings.consistency.text') },
  ];

  const pillars = [
    { text: t('geoScan.pillars.readability'), icon: Search },
    { text: t('geoScan.pillars.identity'), icon: Building2 },
    { text: t('geoScan.pillars.answerability'), icon: MessageSquareText },
    { text: t('geoScan.pillars.authority'), icon: Shield },
    { text: t('geoScan.pillars.specificity'), icon: ListChecks },
    { text: t('geoScan.pillars.consistency'), icon: RefreshCw },
  ];

  return (
    <PageWrapper>
      {/* 1. Title + Hook */}
      <section className="py-16 md:py-24">
        <div className="container max-w-3xl mx-auto px-4">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-6">
            {t('title')}
          </h1>
          <p className="text-foreground/90 text-lg leading-relaxed">
            {t('hook')}
          </p>
        </div>
      </section>

      {/* 2. Wat ik leerde */}
      <section className="pb-16 md:pb-20">
        <div className="container max-w-3xl mx-auto px-4">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-primary mb-8">
            {t('learnings.subtitle')}
          </h2>
          <div className="space-y-8">
            {learnings.map((item, i) => (
              <div key={i}>
                <h3 className="font-sans text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. geo-scan.be — accent background */}
      <section className="bg-accent py-16 md:py-20">
        <div className="container max-w-3xl mx-auto px-4">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-primary mb-4">
            {t('geoScan.subtitle')}
          </h2>
          <p className="text-foreground/90 leading-relaxed mb-10">
            {t('geoScan.intro')}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-lg border border-border bg-background p-4"
                >
                  <div className="mt-0.5 shrink-0 rounded-md bg-primary/10 p-2">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-foreground/80 text-sm leading-relaxed">
                    {pillar.text}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center">
            <Button asChild size="lg" className="gap-2">
              <a href="https://geo-scan.be" target="_blank" rel="noopener noreferrer">
                {t('cta')}
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* 4. Afsluiter */}
      <section className="py-12 md:py-16">
        <div className="container max-w-3xl mx-auto px-4">
          <p className="text-foreground/90 leading-relaxed text-center text-lg">
            {t('closing')}
          </p>
        </div>
      </section>

      {/* 5. Over Christophe */}
      <section className="pb-16 md:pb-20">
        <div className="container max-w-3xl mx-auto px-4">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-primary mb-4">
            {t('about.subtitle')}
          </h2>
          <p className="text-foreground/80 leading-relaxed">
            {t('about.text')}
          </p>
        </div>
      </section>

      {/* 6. Footer-lijn */}
      <section className="pb-16 md:pb-20">
        <div className="container max-w-3xl mx-auto px-4">
          <p className="text-sm text-muted-foreground text-center border-t border-border pt-8">
            {t('attribution')}
          </p>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Homeowners;