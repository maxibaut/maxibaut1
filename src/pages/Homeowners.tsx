import { useTranslation } from 'react-i18next';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import useSEO from '@/hooks/useSEO';
import LocalizedLink from '@/components/LocalizedLink';

const Homeowners = () => {
  const { t } = useTranslation('homeowners');

  useSEO({
    titleKey: 'seo.title',
    descriptionKey: 'seo.description',
    namespace: 'homeowners',
  });

  const learnings = [
    { title: t('learnings.answers.title'), text: t('learnings.answers.text') },
    { title: t('learnings.concrete.title'), text: t('learnings.concrete.text') },
    { title: t('learnings.honesty.title'), text: t('learnings.honesty.text') },
    { title: t('learnings.consistency.title'), text: t('learnings.consistency.text') },
  ];

  const pillars = [
    t('geoScan.pillars.readability'),
    t('geoScan.pillars.identity'),
    t('geoScan.pillars.answerability'),
    t('geoScan.pillars.authority'),
    t('geoScan.pillars.specificity'),
    t('geoScan.pillars.consistency'),
  ];

  return (
    <PageWrapper>
      <section className="py-16 md:py-24">
        <div className="container max-w-3xl mx-auto px-4">
          {/* Title & Intro */}
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-6">
            {t('title')}
          </h1>
          <p className="text-foreground/90 text-lg leading-relaxed mb-16">
            {t('intro')}
          </p>

          {/* Wat ik leerde */}
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-primary mb-8">
            {t('learnings.subtitle')}
          </h2>
          <div className="space-y-8 mb-16">
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

          {/* geo-scan.be */}
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-primary mb-4">
            {t('geoScan.subtitle')}
          </h2>
          <p className="text-foreground/90 leading-relaxed mb-6">
            {t('geoScan.intro')}
          </p>
          <ul className="space-y-3 mb-10">
            {pillars.map((pillar, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                <span className="text-foreground/80 leading-relaxed">{pillar}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="flex justify-center mb-16">
            <Button asChild size="lg" className="gap-2">
              <a href="https://geo-scan.be" target="_blank" rel="noopener noreferrer">
                {t('cta')}
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>

          {/* Closing */}
          <p className="text-foreground/90 leading-relaxed mb-12">
            {t('closing')}{' '}
            <LocalizedLink to="/contact" className="text-primary hover:underline">
              {t('contactLink')}
            </LocalizedLink>
            .
          </p>

          {/* Attribution */}
          <p className="text-sm text-muted-foreground text-center border-t border-border pt-8">
            {t('attribution')}
          </p>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Homeowners;
