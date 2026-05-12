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

const renderBodyParagraph = (p: string) => {
  // Markdown bold + internal/external links → sanitized HTML
  let formatted = p
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

const JournalDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation('journal');
  
  const entry = journalEntries.find((e) => e.slug === slug);

  useSEO({
    titleKey: entry ? `entries.${slug}.title` : undefined,
    descriptionKey: entry ? `entries.${slug}.excerpt` : undefined,
    namespace: 'journal',
  });

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
  const paragraphs = bodyText.split('\n').filter((p: string) => p.trim());
  const signaturePattern = /^[—–-]?\s*(Bieke|Met een warme groet|With warm|Avec|Mit herzlichen)/i;
  
  // Find where the signature block starts (last 2 lines if they match the pattern)
  let signatureStart = paragraphs.length;
  for (let i = paragraphs.length - 1; i >= Math.max(0, paragraphs.length - 3); i--) {
    if (signaturePattern.test(paragraphs[i].trim())) {
      signatureStart = i;
    }
  }
  
  const bodyParagraphs = paragraphs.slice(0, signatureStart);
  const signatureLines = paragraphs.slice(signatureStart);

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
                alt={t(`entries.${slug}.title`)}
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
            {bodyParagraphs.map((p: string, i: number) => {
              const imgMatch = p.trim().match(IMAGE_ONLY_RE);
              if (imgMatch) {
                const [, alt, src] = imgMatch;
                return (
                  <figure key={i} className="my-4">
                    <img
                      src={src}
                      alt={alt}
                      loading="lazy"
                      className="w-full rounded-lg bg-muted"
                    />
                    {alt && (
                      <figcaption className="text-sm text-muted-foreground text-center mt-2 italic">
                        {alt}
                      </figcaption>
                    )}
                  </figure>
                );
              }
              return (
                <p
                  key={i}
                  className="text-foreground/90 leading-[1.7] text-base"
                  dangerouslySetInnerHTML={{ __html: renderBodyParagraph(p) }}
                />
              );
            })}

            {/* Signature block */}
            {signatureLines.length > 0 && (
              <div className="mt-10 pt-6 border-t border-border/50">
                {signatureLines.map((line: string, i: number) => (
                  <p key={`sig-${i}`} className={`text-foreground/80 leading-[1.7] ${i === signatureLines.length - 1 ? 'font-serif text-lg text-primary font-semibold mt-1' : 'italic'}`}>
                    {line}
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