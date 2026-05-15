import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PageWrapper } from '@/components/layout';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import FAQJsonLd from '@/components/FAQJsonLd';

interface FaqQuestion {
  q: string;
  a: string;
}

interface FaqSection {
  id: string;
  title: string;
  questions: FaqQuestion[];
}

// Convert absolute ardennest.be links to internal paths so SPA navigation works.
const normalizeHref = (href?: string) => {
  if (!href) return '#';
  const m = href.match(/^https?:\/\/(?:www\.)?ardennest\.be(\/.*)?$/i);
  if (m) return m[1] || '/';
  return href;
};

const isInternal = (href?: string) => {
  if (!href) return false;
  if (href.startsWith('/')) return true;
  return /^https?:\/\/(?:www\.)?ardennest\.be/i.test(href);
};

const FAQ = () => {
  const { t } = useTranslation('faq');
  useSEO({
    titleKey: 'seo.title',
    descriptionKey: 'seo.description',
    namespace: 'faq',
  });

  const sections = (t('sections', { returnObjects: true }) as FaqSection[]) || [];

  // Open the accordion item that matches the URL hash (e.g. #location-2)
  const location = useLocation();
  const hashTarget = useMemo(() => location.hash.replace(/^#/, ''), [location.hash]);
  const openValues = useMemo(() => {
    const map: Record<string, string> = {};
    sections.forEach((s) => {
      if (hashTarget.startsWith(`${s.id}-`)) {
        map[s.id] = hashTarget;
      }
    });
    return map;
  }, [hashTarget, sections]);

  useEffect(() => {
    if (!hashTarget) return;
    const el = document.getElementById(hashTarget) || document.getElementById(hashTarget.split('-')[0]);
    if (el) {
      requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    }
  }, [hashTarget]);

  const markdownComponents = {
    a: ({ href, children }: { href?: string; children?: React.ReactNode }) => {
      const normalized = normalizeHref(href);
      if (isInternal(href)) {
        return (
          <Link to={normalized} className="text-primary hover:underline font-medium">
            {children}
          </Link>
        );
      }
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline font-medium"
        >
          {children}
        </a>
      );
    },
    p: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-3 last:mb-0">{children}</p>
    ),
    ul: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc pl-5 space-y-1 my-3">{children}</ul>
    ),
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-medium text-foreground">{children}</strong>
    ),
  };

  return (
    <PageWrapper>
      <FAQJsonLd />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground section-padding">
        <div className="container-luxury max-w-3xl text-center">
          <p className="heading-display mb-4">{t('title')}</p>
          <h1 className="font-serif text-xl md:text-2xl text-primary-foreground/85 font-normal mb-6">
            {t('h1')}
          </h1>
          <p className="text-primary-foreground/80 leading-relaxed">{t('intro')}</p>
        </div>
      </section>

      {/* Body */}
      <section className="section-padding bg-background">
        <div className="container-luxury grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10">
          {/* Sticky in-page nav */}
          <aside className="hidden lg:block">
            <nav
              aria-label={t('navTitle')}
              className="sticky top-28 space-y-3 text-sm"
            >
              <p className="font-serif text-base font-medium text-foreground mb-3">
                {t('navTitle')}
              </p>
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="text-muted-foreground hover:text-primary transition-colors block"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Sections */}
          <div className="space-y-12 max-w-3xl">
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                aria-labelledby={`${section.id}-heading`}
                className="scroll-mt-24"
              >
                <h2
                  id={`${section.id}-heading`}
                  className="heading-3 mb-4 border-b border-border pb-2"
                >
                  {section.title}
                </h2>
                <Accordion type="single" collapsible className="w-full" defaultValue={openValues[section.id]}>
                  {section.questions.map((faq, index) => (
                    <AccordionItem key={index} value={`${section.id}-${index}`} id={`${section.id}-${index}`} className="scroll-mt-24">
                      <AccordionTrigger className="text-left font-medium">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={markdownComponents}
                        >
                          {faq.a}
                        </ReactMarkdown>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-cream-dark">
        <div className="container-luxury max-w-2xl text-center">
          <h2 className="heading-2 mb-3">{t('cta.title')}</h2>
          <p className="text-muted-foreground mb-6">{t('cta.text')}</p>
          <Button asChild size="lg">
            <Link to="/contact">
              {t('cta.button')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <p className="mt-8 text-sm text-muted-foreground italic">
            {t('signature')}
          </p>
        </div>
      </section>
    </PageWrapper>
  );
};

export default FAQ;
