import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

type QA = { q: string; a: string };

const localeMap: Record<string, string> = {
  nl: 'nl-BE',
  fr: 'fr-BE',
  en: 'en-GB',
  de: 'de-DE',
};

const MD_LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

/** Strip markdown bold + links to plain text (for JSON-LD acceptedAnswer). */
const toPlainText = (md: string): string =>
  md
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(MD_LINK, '$1')
    .replace(/\s+/g, ' ')
    .trim();

/** Render a string containing markdown links as React nodes with <a> tags. */
const renderWithLinks = (text: string) => {
  const nodes: (string | JSX.Element)[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  const re = new RegExp(MD_LINK.source, 'g');
  let key = 0;
  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const [, label, href] = match;
    nodes.push(
      <a
        key={`l-${key++}`}
        href={href}
        className="text-primary underline underline-offset-4 hover:text-forest-light transition-colors"
      >
        {label}
      </a>
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
};

export const HomeFAQSection = () => {
  const { t, i18n } = useTranslation('homepage');

  const questions = useMemo(() => {
    const raw = t('homeFaq.questions', { returnObjects: true });
    return Array.isArray(raw) ? (raw as QA[]) : [];
  }, [t, i18n.language]);

  // Inject homepage FAQPage JSON-LD (plain text, no markdown)
  useEffect(() => {
    if (questions.length === 0) return;
    const lang = i18n.language || 'nl';
    const inLanguage = localeMap[lang] || 'nl-BE';
    const payload = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage,
      mainEntity: questions.map((q) => ({
        '@type': 'Question',
        name: q.q,
        acceptedAnswer: { '@type': 'Answer', text: toPlainText(q.a) },
      })),
    };
    const id = 'home-faq-jsonld';
    document.getElementById(id)?.remove();
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    script.textContent = JSON.stringify(payload);
    document.head.appendChild(script);
    return () => {
      document.getElementById(id)?.remove();
    };
  }, [questions, i18n.language]);

  if (questions.length === 0) return null;

  return (
    <section className="section-padding bg-background">
      <div className="container-luxury max-w-3xl">
        <h2 className="heading-2 text-foreground text-center mb-10">
          {t('homeFaq.title')}
        </h2>

        <div className="divide-y divide-border">
          {questions.map((qa, i) => (
            <article key={i} className="py-6 first:pt-0 last:pb-0">
              <h3 className="heading-3 text-primary mb-3">{qa.q}</h3>
              <p className="body-base text-foreground leading-relaxed">
                {renderWithLinks(qa.a)}
              </p>
            </article>
          ))}
        </div>

        <p className="body-base text-muted-foreground text-center mt-10">
          {renderWithLinks(t('homeFaq.moreCta'))}
        </p>
      </div>
    </section>
  );
};
