import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PageWrapper } from '@/components/layout';
import { useSEO } from '@/hooks/useSEO';
import { journalEntries } from '@/data/journal';
import { LocalizedLink } from '@/components/LocalizedLink';
import { ArrowLeft } from 'lucide-react';

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

  return (
    <PageWrapper>
      <article className="container-luxury section-padding">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <LocalizedLink
            to="/journal"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('backToOverview')}
          </LocalizedLink>

          {/* Date */}
          <time className="block text-xs text-muted-foreground/70 uppercase tracking-wider mb-3">
            {formatDate(entry.date)}
          </time>

          {/* Title */}
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-8">
            {t(`entries.${slug}.title`)}
          </h1>

          {/* Hero image */}
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

          {/* Body */}
          <div className="prose prose-lg max-w-none">
            {paragraphs.map((p: string, i: number) => (
              <p key={i} className="text-foreground/90 leading-relaxed mb-5">
                {p}
              </p>
            ))}
          </div>

          {/* Related link */}
          {entry.relatedLink && entry.relatedLabelKey && (
            <div className="mt-10 pt-8 border-t border-border">
              <LocalizedLink
                to={entry.relatedLink}
                className="text-primary font-medium hover:underline"
              >
                {t(entry.relatedLabelKey)}
              </LocalizedLink>
            </div>
          )}

          {/* Bottom back link */}
          <div className="mt-12 pt-8 border-t border-border">
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
