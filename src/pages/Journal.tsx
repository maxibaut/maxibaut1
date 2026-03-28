import { useTranslation } from 'react-i18next';
import { PageWrapper } from '@/components/layout';
import { useSEO } from '@/hooks/useSEO';
import { journalEntries } from '@/data/journal';
import { LocalizedLink } from '@/components/LocalizedLink';
import { Card, CardContent } from '@/components/ui/card';

const Journal = () => {
  const { t, i18n } = useTranslation('journal');
  useSEO({ titleKey: 'seo.title', descriptionKey: 'seo.description', namespace: 'journal' });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(i18n.language === 'nl' ? 'nl-BE' : i18n.language === 'de' ? 'de-DE' : i18n.language === 'fr' ? 'fr-BE' : 'en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <PageWrapper>
      <section className="container-luxury section-padding">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12 md:mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              {t('heading')}
            </h1>
            <p className="text-lg text-muted-foreground mt-3 max-w-2xl">
              {t('subtitle')}
            </p>
          </div>

          {/* Entry grid or empty state */}
          {journalEntries.length === 0 ? (
            <p className="text-muted-foreground text-center py-16">{t('emptyState')}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {journalEntries.map((entry) => (
                <LocalizedLink key={entry.slug} to={`/journal/${entry.slug}`} className="group block">
                  <Card className="overflow-hidden border-border hover:border-primary/30 transition-colors h-full">
                    <div className="aspect-[16/10] overflow-hidden bg-muted flex items-center justify-center">
                      {entry.video ? (
                        <video
                          src={entry.video}
                          className="w-full h-full object-cover"
                          muted
                          preload="metadata"
                          playsInline
                        />
                      ) : (
                        <img
                          src={entry.image}
                          alt={t(`entries.${entry.slug}.title`)}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder.svg';
                          }}
                        />
                      )}
                    </div>
                    <CardContent className="p-6">
                      <time className="text-xs text-muted-foreground/70 uppercase tracking-wider">
                        {formatDate(entry.date)}
                      </time>
                      <h2 className="font-serif text-xl font-semibold text-foreground mt-2 group-hover:text-primary transition-colors">
                        {t(`entries.${entry.slug}.title`)}
                      </h2>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                        {t(`entries.${entry.slug}.excerpt`)}
                      </p>
                      <span className="inline-block text-sm text-primary font-medium mt-4">
                        {t('readMore')} →
                      </span>
                    </CardContent>
                  </Card>
                </LocalizedLink>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageWrapper>
  );
};

export default Journal;
