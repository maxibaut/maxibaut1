import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DOMPurify from 'dompurify';
import { PageWrapper } from '@/components/layout';
import { useSEO } from '@/hooks/useSEO';
import { journalEntries } from '@/data/journal';
import { LocalizedLink } from '@/components/LocalizedLink';
import { ArrowLeft } from 'lucide-react';

const IMAGE_ONLY_RE = /^!\[([^\]]*)\]\(([^)]+)\)$/;

const renderInlineHtml = (p: string) => {
  // Markdown bold + internal/external links → sanitized HTML
  const formatted = p
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, text, url) => {
      const isExternal = /^https?:\/\//.test(url);
      const target = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
      return `<a href="${url}"${target} class="text-primary underline-offset-4 hover:underline">${text}</a>`;
    });
  return DOMPurify.sanitize(formatted, {
    ALLOWED_TAGS: ['strong', 'em', 'b', 'i', 'a'],
    ALLOWED_ATTR: ['href', 'class', 'target', 'rel'],
  });
};

type Block =
  | { kind: 'p'; text: string }
  | { kind: 'h2'; text: string }
  | { kind: 'h3'; text: string }
  | { kind: 'ul'; items: string[] }
  | { kind: 'quote'; text: string }
  | { kind: 'img'; alt: string; src: string };

const parseBody = (body: string): Block[] => {
  const lines = body.split('\n').map((l) => l.replace(/\s+$/, ''));
  const blocks: Block[] = [];
  let currentList: string[] | null = null;
  const flushList = () => {
    if (currentList && currentList.length) {
      blocks.push({ kind: 'ul', items: currentList });
    }
    currentList = null;
  };
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flushList();
      continue;
    }
    const imgMatch = line.match(IMAGE_ONLY_RE);
    if (imgMatch) {
      flushList();
      blocks.push({ kind: 'img', alt: imgMatch[1], src: imgMatch[2] });
      continue;
    }
    if (line.startsWith('### ')) {
      flushList();
      blocks.push({ kind: 'h3', text: line.slice(4) });
      continue;
    }
    if (line.startsWith('## ')) {
      flushList();
      blocks.push({ kind: 'h2', text: line.slice(3) });
      continue;
    }
    if (line.startsWith('> ')) {
      flushList();
      blocks.push({ kind: 'quote', text: line.slice(2) });
      continue;
    }
    if (line.startsWith('- ')) {
      if (!currentList) currentList = [];
      currentList.push(line.slice(2));
      continue;
    }
    flushList();
    blocks.push({ kind: 'p', text: line });
  }
  flushList();
  return blocks;
};

const JournalDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation('journal');

  const entry = journalEntries.find((e) => e.slug === slug);

  useSEO({
    titleKey: entry ? `entries.${slug}.title` : undefined,
    descriptionKey: entry ? `entries.${slug}.excerpt` : undefined,
    namespace: 'journal',
    ogType: entry ? 'article' : 'website',
    ogImage: entry
      ? (entry.image.startsWith('http') ? entry.image : `https://ardennest.be${entry.image}`)
      : undefined,
  });

  const faqs = entry?.hasFaq
    ? (t(`entries.${slug}.faqs`, { returnObjects: true, defaultValue: [] }) as Array<{ q: string; a: string }>)
    : [];

  // Inject Article + Breadcrumb + (optional) FAQPage JSON-LD
  useEffect(() => {
    if (!entry) return;
    const lang = i18n.language;
    const localePath = lang === 'nl' ? '' : `/${lang}`;
    const url = `https://ardennest.be${localePath}/journal/${entry.slug}`;
    const imageUrl = entry.image.startsWith('http')
      ? entry.image
      : `https://ardennest.be${entry.image}`;
    const article = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: t(`entries.${entry.slug}.title`),
      description: t(`entries.${entry.slug}.excerpt`),
      image: imageUrl,
      datePublished: entry.date,
      dateModified: entry.date,
      inLanguage: lang === 'nl' ? 'nl-BE' : lang === 'fr' ? 'fr-BE' : lang === 'de' ? 'de-DE' : 'en-GB',
      mainEntityOfPage: url,
      author: { '@type': 'Person', '@id': 'https://ardennest.be/#bieke' },
      publisher: { '@type': 'Organization', '@id': 'https://ardennest.be/#organization' },
    };
    const journalLabel = 'Journal';
    const homeLabel = lang === 'fr' ? 'Accueil' : lang === 'de' ? 'Startseite' : lang === 'en' ? 'Home' : 'Home';
    const breadcrumbs = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: homeLabel, item: `https://ardennest.be${localePath}/` },
        { '@type': 'ListItem', position: 2, name: journalLabel, item: `https://ardennest.be${localePath}/journal` },
        { '@type': 'ListItem', position: 3, name: t(`entries.${entry.slug}.title`), item: url },
      ],
    };

    const appended: HTMLScriptElement[] = [];
    const append = (id: string, payload: unknown) => {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.id = id;
      s.textContent = JSON.stringify(payload);
      document.head.appendChild(s);
      appended.push(s);
    };
    append(`article-jsonld-${entry.slug}`, article);
    append(`breadcrumb-jsonld-${entry.slug}`, breadcrumbs);

    if (entry.hasFaq && Array.isArray(faqs) && faqs.length > 0) {
      const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        inLanguage: lang === 'nl' ? 'nl-BE' : lang === 'fr' ? 'fr-BE' : lang === 'de' ? 'de-DE' : 'en-GB',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      };
      append(`faqpage-jsonld-${entry.slug}`, faqSchema);
    }

    return () => {
      appended.forEach((s) => s.remove());
    };
  }, [entry, i18n.language, t, faqs]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(i18n.language === 'nl' ? 'nl-BE' : i18n.language === 'de' ? 'de-DE' : i18n.language === 'fr' ? 'fr-BE' : 'en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (!entry) {
    return (
      <PageWrapper>
        <section className="container-luxury section-padding text-center">
          <p className="text-muted-foreground">Entry niet gevonden.</p>
          <LocalizedLink to="/journal" className="text-primary mt-4 inline-block">
            ← {t('backToOverview')}
          </LocalizedLink>
        </section>
      </PageWrapper>
    );
  }

  const bodyText = t(`entries.${slug}.body`);
  const allBlocks = parseBody(bodyText);

  // Split off signature lines (trailing "— Bieke ..." / "Met een warme groet" etc.)
  const signaturePattern = /^[—–-]?\s*(Bieke|Met een warme groet|With warm|Avec|Mit herzlichen)/i;
  let signatureStart = allBlocks.length;
  for (let i = allBlocks.length - 1; i >= Math.max(0, allBlocks.length - 3); i--) {
    const b = allBlocks[i];
    if (b.kind === 'p' && signaturePattern.test(b.text)) {
      signatureStart = i;
    }
  }
  const bodyBlocks = allBlocks.slice(0, signatureStart);
  const signatureBlocks = allBlocks.slice(signatureStart).filter((b) => b.kind === 'p') as Array<{ kind: 'p'; text: string }>;

  const faqHeading = i18n.language === 'fr'
    ? 'Questions fréquentes'
    : i18n.language === 'de'
    ? 'Häufige Fragen'
    : i18n.language === 'en'
    ? 'Frequently asked questions'
    : 'Veelgestelde vragen';

  return (
    <PageWrapper>
      <article className="py-12 md:py-20">
        <div className="max-w-[680px] mx-auto px-6">
          {/* Back link */}
          <LocalizedLink
            to="/journal"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('backToOverview')}
          </LocalizedLink>

          {/* Date */}
          <time className="block text-sm text-secondary uppercase tracking-widest mb-4 font-sans">
            {formatDate(entry.date)}
          </time>

          {/* Title */}
          <h1 className="font-serif text-4xl md:text-[36px] font-bold text-primary tracking-tight mb-12">
            {t(`entries.${slug}.title`)}
          </h1>

          {/* Video or hero image */}
          {entry.video ? (
            <div className="mb-3">
              <video
                className="w-full rounded-lg bg-muted"
                controls
                preload="metadata"
                playsInline
              >
                <source src={entry.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ) : (
            <div className="rounded-lg overflow-hidden mb-10 bg-muted">
              <img
                src={entry.image}
                alt={t(`entries.${slug}.imageAlt`, { defaultValue: t(`entries.${slug}.title`) })}
                width={1600}
                height={900}
                className="w-full aspect-[16/9] object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder.svg';
                }}
              />
            </div>
          )}

          {/* Video caption */}
          {entry.video && entry.videoCaptionKey && (
            <p className="text-sm text-muted-foreground text-center mb-12 italic">
              {t(entry.videoCaptionKey)}
            </p>
          )}

          {/* Body */}
          <div className="space-y-6">
            {bodyBlocks.map((b, i) => {
              if (b.kind === 'img') {
                return (
                  <figure key={i} className="my-4">
                    <img
                      src={b.src}
                      alt={b.alt}
                      loading="lazy"
                      className="w-full rounded-lg bg-muted"
                    />
                    {b.alt && (
                      <figcaption className="text-sm text-muted-foreground text-center mt-2 italic">
                        {b.alt}
                      </figcaption>
                    )}
                  </figure>
                );
              }
              if (b.kind === 'h2') {
                return (
                  <h2 key={i} className="font-serif text-2xl md:text-3xl text-primary mt-10 mb-2">
                    {b.text}
                  </h2>
                );
              }
              if (b.kind === 'h3') {
                return (
                  <h3 key={i} className="font-serif text-xl md:text-2xl text-primary mt-8 mb-1">
                    {b.text}
                  </h3>
                );
              }
              if (b.kind === 'quote') {
                return (
                  <blockquote
                    key={i}
                    className="border-l-4 border-accent pl-4 py-1 italic text-foreground/80 bg-muted/40 rounded-r"
                    dangerouslySetInnerHTML={{ __html: renderInlineHtml(b.text) }}
                  />
                );
              }
              if (b.kind === 'ul') {
                return (
                  <ul key={i} className="list-disc pl-6 space-y-2 text-foreground/90 leading-[1.7]">
                    {b.items.map((it, j) => (
                      <li
                        key={j}
                        dangerouslySetInnerHTML={{ __html: renderInlineHtml(it) }}
                      />
                    ))}
                  </ul>
                );
              }
              return (
                <p
                  key={i}
                  className="text-foreground/90 leading-[1.7] text-base"
                  dangerouslySetInnerHTML={{ __html: renderInlineHtml(b.text) }}
                />
              );
            })}

            {/* FAQ section (rendered from structured faqs key) */}
            {entry.hasFaq && Array.isArray(faqs) && faqs.length > 0 && (
              <section className="mt-12 pt-8 border-t border-border/60">
                <h2 className="font-serif text-2xl md:text-3xl text-primary mb-6">
                  {faqHeading}
                </h2>
                <div className="space-y-6">
                  {faqs.map((f, i) => (
                    <div key={i}>
                      <h3 className="font-semibold text-foreground mb-1">{f.q}</h3>
                      <p className="text-foreground/90 leading-[1.7]">{f.a}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Signature block */}
            {signatureBlocks.length > 0 && (
              <div className="mt-10 pt-6 border-t border-border/50">
                {signatureBlocks.map((b, i) => (
                  <p
                    key={`sig-${i}`}
                    className={`text-foreground/80 leading-[1.7] ${i === signatureBlocks.length - 1 ? 'font-serif text-lg text-primary font-semibold mt-1' : 'italic'}`}
                  >
                    {b.text}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Related link */}
          {entry.relatedLink && entry.relatedLabelKey && (
            <div className="mt-12">
              <LocalizedLink
                to={entry.relatedLink}
                className="text-primary font-medium hover:underline"
              >
                {t(entry.relatedLabelKey)}
              </LocalizedLink>
            </div>
          )}

          {/* Bottom back link */}
          <div className="mt-16 pt-8 border-t border-border">
            <LocalizedLink
              to="/journal"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('backToOverview')}
            </LocalizedLink>
          </div>
        </div>
      </article>
    </PageWrapper>
  );
};

export default JournalDetail;
