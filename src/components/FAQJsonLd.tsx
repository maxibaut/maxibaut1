import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Injects FAQPage JSON-LD structured data into <head> based on the active language.
 * Reads FAQ questions from the contact.json locale file.
 */
const FAQJsonLd = () => {
  const { t } = useTranslation('faq');

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

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: questions.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'faq-jsonld';
    script.textContent = JSON.stringify(jsonLd);

    // Remove existing FAQ JSON-LD if present
    const existing = document.getElementById('faq-jsonld');
    if (existing) existing.remove();

    document.head.appendChild(script);

    return () => {
      const el = document.getElementById('faq-jsonld');
      if (el) el.remove();
    };
  }, [t]);

  return null;
};

export default FAQJsonLd;
