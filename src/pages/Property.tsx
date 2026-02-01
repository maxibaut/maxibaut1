import { PageWrapper } from '@/components/layout';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Bed, Bath, TreePine, ChefHat, ArrowRight, Sofa } from 'lucide-react';
import { propertyHero, kitchen, oakTableDetail, diningRoom } from '@/assets/property';
import { useSEO } from '@/hooks/useSEO';

const Property = () => {
  const { t } = useTranslation('property');
  useSEO();

  const features = [
    { icon: Users, label: t('overview.capacity') },
    { icon: Bed, label: t('overview.bedrooms') },
    { icon: Bath, label: t('overview.bathrooms') },
    { icon: TreePine, label: t('overview.garden') },
  ];

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden" aria-label={t('title')}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${propertyHero}')` }}
          role="img"
          aria-label={t('hero.imageAlt', 'Voorgevel van de gerenoveerde Ardense hoeve ArdenNest met authentieke stenen muren')}
        >
          <div className="absolute inset-0 bg-charcoal/50" />
        </div>
        <div className="relative z-10 text-center text-cream container-luxury">
          <h1 className="heading-display mb-4">{t('title')}</h1>
          <p className="body-large text-cream/90">{t('subtitle')}</p>
        </div>
      </section>

      {/* Features Overview */}
      <section className="bg-cream-dark py-12">
        <div className="container-luxury">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-2"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="font-medium text-foreground">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kitchen Section */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center space-x-3 mb-4">
                <ChefHat className="h-8 w-8 text-accent" />
                <h2 className="heading-2">{t('kitchen.title')}</h2>
              </div>
              <p className="body-large text-muted-foreground mb-8">
                {t('kitchen.description')}
              </p>
              <ul className="grid grid-cols-2 gap-4">
                {Object.entries(t('kitchen.features', { returnObjects: true }) as Record<string, string>).map(
                  ([key, value]) => (
                    <li key={key} className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                      <span className="text-muted-foreground">{value}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="order-1 lg:order-2">
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                <img
                  src={kitchen}
                  alt={t('kitchen.imageAlt', 'Professionele keuken met Lacanche fornuis, RVS werkbladen en dubbele Miele afwasmachine')}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Oak Table Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
                <img
                  src={oakTableDetail}
                  alt={t('oakTable.imageAlt', 'Handgemaakte eiken tafel van 6 meter lang met plaats voor 26 gasten in de eetkamer')}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <h2 className="heading-2 mb-4">{t('oakTable.title')}</h2>
              <p className="body-large text-primary-foreground/80 mb-8">
                {t('oakTable.description')}
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="text-center">
                  <span className="block font-serif text-3xl font-semibold text-gold">
                    {t('oakTable.dimensions')}
                  </span>
                </div>
                <div className="text-center">
                  <span className="block font-serif text-3xl font-semibold text-gold">
                    {t('oakTable.capacity')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Garden Section */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="heading-2 mb-4">{t('garden.title')}</h2>
            <p className="body-large text-muted-foreground">
              {t('garden.description')}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(t('garden.features', { returnObjects: true }) as Record<string, string>).map(
              ([key, value]) => (
                <Card key={key} className="text-center">
                  <CardContent className="p-6">
                    <TreePine className="h-8 w-8 text-primary mx-auto mb-3" />
                    <span className="font-medium text-foreground">{value}</span>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </div>
      </section>

      {/* Living Space Section */}
      <section className="section-padding bg-cream-dark">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                <img
                  src={diningRoom}
                  alt={t('livingSpace.imageAlt', 'Sfeervolle woonkamer met open haard, comfortabele zithoek en uitzicht op de tuin')}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Sofa className="h-8 w-8 text-accent" />
                <h2 className="heading-2">{t('livingSpace.title')}</h2>
              </div>
              <p className="body-large text-muted-foreground mb-8">
                {t('livingSpace.description')}
              </p>
              <ul className="grid grid-cols-2 gap-4">
                {Object.entries(t('livingSpace.features', { returnObjects: true }) as Record<string, string>).map(
                  ([key, value]) => (
                    <li key={key} className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                      <span className="text-muted-foreground">{value}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-cream-dark">
        <div className="container-luxury text-center">
          <h2 className="heading-2 mb-4">Klaar om te boeken?</h2>
          <p className="body-large text-muted-foreground mb-8 max-w-2xl mx-auto">
            Bekijk de beschikbaarheid en boek direct bij ons voor de beste prijs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/booking">
                Bekijk beschikbaarheid
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Neem contact op</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Property;
