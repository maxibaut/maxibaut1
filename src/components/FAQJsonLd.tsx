import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const BASE_URL = 'https://ardennest.be';

const localeMap: Record<string, string> = {
  nl: 'nl-BE',
  fr: 'fr-BE',
  en: 'en-GB',
  de: 'de-DE',
};

const breadcrumbLabels: Record<string, { home: string; faq: string }> = {
  nl: { home: 'Home', faq: 'Veelgestelde vragen' },
  fr: { home: 'Accueil', faq: 'Questions fréquentes' },
  en: { home: 'Home', faq: 'Frequently Asked Questions' },
  de: { home: 'Startseite', faq: 'Häufige Fragen' },
};

/**
 * Injects FAQPage + BreadcrumbList JSON-LD structured data into <head>
 * for the active language. Reads questions from the `faq` namespace.
 */
const FAQJsonLd = () => {
  const { t, i18n } = useTranslation('faq');
  const location = useLocation();

  useEffect(() => {
    const sections = t('sections', { returnObjects: true }) as Array<{
      id: string;
      title: string;
      questions: Array<{ q: string; a: string }>;
    }>;

    if (!Array.isArray(sections) || sections.length === 0) return;

    const questions = sections.flatMap((s) =>
      Array.isArray(s.questions) ? s.questions : []
    );

    if (questions.length === 0) return;

    const lang = i18n.language || 'nl';
    const inLanguage = localeMap[lang] || 'nl-BE';
    const labels = breadcrumbLabels[lang] || breadcrumbLabels.nl;
    const homeUrl = lang === 'nl' ? `${BASE_URL}/` : `${BASE_URL}/${lang}`;
    const faqUrl = lang === 'nl' ? `${BASE_URL}/faq` : `${BASE_URL}/${lang}/faq`;

    const stripMarkdown = (md: string) =>
      md
        .replace(/\*\*(.+?)\*\*/g, '$1')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ($2)')
        .replace(/^- /gm, '• ')
        .trim();

    const faqJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage,
      url: faqUrl,
      mainEntity: questions.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: stripMarkdown(faq.a),
        },
      })),
    };

    const breadcrumbJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: labels.home, item: homeUrl },
        { '@type': 'ListItem', position: 2, name: labels.faq, item: faqUrl },
      ],
    };

    const inject = (id: string, payload: unknown) => {
      const existing = document.getElementById(id);
      if (existing) existing.remove();
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = id;
      script.textContent = JSON.stringify(payload);
      document.head.appendChild(script);
    };

    inject('faq-jsonld', faqJsonLd);
    inject('faq-breadcrumb-jsonld', breadcrumbJsonLd);

    return () => {
      document.getElementById('faq-jsonld')?.remove();
      document.getElementById('faq-breadcrumb-jsonld')?.remove();
    };
  }, [t, i18n.language, location.pathname]);

  return null;
};

export default FAQJsonLd;
