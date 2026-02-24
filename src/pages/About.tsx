import { PageWrapper } from '@/components/layout';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import { aboutHero, ownersPortrait } from '@/assets/property';
import { useSEO } from '@/hooks/useSEO';

const About = () => {
  const { t } = useTranslation('about');
  useSEO();

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden" aria-label={t('title')}>
        <div
          className="absolute inset-0 bg-cover"
          style={{
            backgroundImage: `url('${aboutHero}')`,
            backgroundPosition: 'center 30%',
          }}
          role="img"
          aria-label={t('hero.imageAlt', 'Familie geniet van tijd samen op het terras van ArdenNest')}
        >
          <div className="absolute inset-0 bg-charcoal/50" />
        </div>
        <div className="relative z-10 text-center text-cream container-luxury">
          <h1 className="heading-display mb-4">{t('title')}</h1>
          <p className="body-large text-cream/90">{t('subtitle')}</p>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-2 mb-6">{t('story.title')}</h2>
            <p className="body-large text-muted-foreground mb-8">
              {t('story.content')}
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-luxury">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-2 mb-4">{t('story.philosophy.title')}</h2>
            <p className="body-large text-primary-foreground/80">
              {t('story.philosophy.content')}
            </p>
          </div>
        </div>
      </section>

      {/* Owners */}
      <section className="section-padding bg-cream-dark">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Owners Photo */}
            <div className="aspect-square lg:aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
              <img 
                src={ownersPortrait} 
                alt={t('owners.imageAlt', 'Bieke en Christophe, eigenaren van Arden\'Nest, verwelkomen gasten al sinds 2003')}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div>
              <h2 className="heading-2 mb-4">{t('owners.title')}</h2>
              <p className="body-large text-muted-foreground mb-6">
                {t('owners.description')}
              </p>
              <Button asChild>
                <Link to="/contact">
                  {t('common:nav.contact', 'Neem contact op')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <h2 className="heading-2 text-center mb-12">{t('team.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-2">
                  {t('team.cleaning.title')}
                </h3>
                <p className="text-muted-foreground">
                  {t('team.cleaning.description')}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-2">
                  {t('team.garden.title')}
                </h3>
                <p className="text-muted-foreground">
                  {t('team.garden.description')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Relationship Matters */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-luxury">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-2 mb-6">{t('whyRelationship.title')}</h2>
            <p className="body-large text-primary-foreground/80 mb-8">
              {t('whyRelationship.content')}
            </p>
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <Link to="/booking">
                {t('whyRelationship.cta')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default About;
