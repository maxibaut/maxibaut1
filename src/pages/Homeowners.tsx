import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
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
      "url": `https://ardennest.be${basePath}/geo-scan`,
      "inLanguage": lang,
      "mainEntityOfPage": `https://ardennest.be${basePath}/geo-scan`,
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

  return (
    <PageWrapper>
      {/* 1. Title + Story */}
      <section className="py-16 md:py-24">
        <div className="container max-w-3xl mx-auto px-4">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-8">
            {t('title')}
          </h1>
          <div className="space-y-6">
            <p className="text-foreground/90 text-lg leading-relaxed">
              {t('story1')}
            </p>
            <p className="text-foreground/90 text-lg leading-relaxed">
              {t('story2')}
            </p>
            <p className="text-foreground/90 text-lg leading-relaxed">
              {t('story3')}
            </p>
          </div>

          {/* CTA integrated after the story */}
          <div className="mt-10">
            <Button asChild size="lg" className="gap-2">
              <a href="https://geo-scan.be" target="_blank" rel="noopener noreferrer">
                {t('cta')}
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Festina Lente */}
      <section className="bg-accent py-16 md:py-20">
        <div className="container max-w-3xl mx-auto px-4">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-primary mb-6">
            {t('festinaLente.subtitle')}
          </h2>
          <div className="space-y-4">
            <p className="text-foreground/80 leading-relaxed">
              {t('festinaLente.text1')}
            </p>
            <p className="text-foreground/80 leading-relaxed">
              {t('festinaLente.text2')}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Footer line */}
      <section className="py-12 md:py-16">
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
