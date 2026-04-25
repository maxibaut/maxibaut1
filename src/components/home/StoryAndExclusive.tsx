import { useTranslation } from 'react-i18next';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';

/**
 * Two compact cards on the homepage that link to under-linked but high-value pages:
 * 1. The journal post about the rebrand from Ferme du Château → ArdenNest
 * 2. The exclusive ArdenNest Dropping activity
 *
 * These cards strengthen internal linking to currently orphan-style detail pages.
 */
export const StoryAndExclusive = () => {
  const { t } = useTranslation('homepage');

  return (
    <section className="section-padding bg-background">
      <div className="container-luxury">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Card A — Story / rebrand */}
          <Link
            to="/journal/welkom-bij-ardennest"
            className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
          >
            <Card className="h-full transition-all hover:shadow-md hover:-translate-y-0.5">
              <CardContent className="p-6 md:p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cream-dark flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-secondary uppercase tracking-wide">
                    {t('storyExclusive.story.eyebrow')}
                  </span>
                </div>
                <h2 className="heading-3 text-foreground group-hover:text-primary transition-colors">
                  {t('storyExclusive.story.heading')}
                </h2>
                <p className="body-base text-muted-foreground">
                  {t('storyExclusive.story.body')}
                </p>
                <div className="inline-flex items-center gap-2 text-primary font-medium pt-2 group-hover:gap-3 transition-all">
                  {t('storyExclusive.story.cta')}
                  <ArrowRight className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Card B — Exclusive activity */}
          <Link
            to="/surroundings/exclusive/ardennest-dropping"
            className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
          >
            <Card className="h-full transition-all hover:shadow-md hover:-translate-y-0.5">
              <CardContent className="p-6 md:p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cream-dark flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-secondary uppercase tracking-wide">
                    {t('storyExclusive.exclusive.eyebrow')}
                  </span>
                </div>
                <h2 className="heading-3 text-foreground group-hover:text-primary transition-colors">
                  {t('storyExclusive.exclusive.heading')}
                </h2>
                <p className="body-base text-muted-foreground">
                  {t('storyExclusive.exclusive.body')}
                </p>
                <div className="inline-flex items-center gap-2 text-primary font-medium pt-2 group-hover:gap-3 transition-all">
                  {t('storyExclusive.exclusive.cta')}
                  <ArrowRight className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </section>
  );
};
