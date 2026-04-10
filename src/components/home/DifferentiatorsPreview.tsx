import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, ChefHat, TreePine, ArrowRight } from 'lucide-react';
import { bedroomQuietLuxury, kitchen, gardenAerial } from '@/assets/property';

export const DifferentiatorsPreview = () => {
  const { t } = useTranslation('homepage');

  const differentiators = [
    {
      icon: Sparkles,
      title: t('differentiators.quietLuxury.title'),
      description: t('differentiators.quietLuxury.description'),
      image: bedroomQuietLuxury,
      imageAlt: t('differentiators.quietLuxury.imageAlt', 'Stijlvolle slaapkamer met ensuite badkamer, massief eiken vloer en luxueuze afwerking'),
    },
    {
      icon: ChefHat,
      title: t('differentiators.kitchen.title'),
      description: t('differentiators.kitchen.description'),
      image: kitchen,
      imageAlt: t('differentiators.kitchen.imageAlt', 'Professionele keuken met Lacanche fornuis en alle benodigdheden voor groepen tot 26 personen'),
    },
    {
      icon: TreePine,
      title: t('differentiators.garden.title'),
      description: t('differentiators.garden.description'),
      image: gardenAerial,
      imageAlt: t('differentiators.garden.imageAlt', 'Luchtfoto van de 2 hectare grote tuin met speeltoestellen en voetbalveld'),
    },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-luxury">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="heading-2 text-foreground mb-4">
            {t('differentiators.sectionTitle')}
          </h2>
          <p className="body-large text-muted-foreground">
            {t('differentiators.sectionSubtitle')}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {differentiators.map((item, index) => (
            <article key={index}>
              <Card
                className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full"
              >
                {/* Image */}
                <figure className="relative h-48 md:h-56 overflow-hidden m-0">
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    width={600}
                    height={400}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4">
                    <div className="w-10 h-10 rounded-full bg-accent/90 flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-accent-foreground" />
                    </div>
                  </div>
                </figure>

                {/* Content */}
                <CardContent className="p-6">
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </article>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg" className="group">
            <Link to="/differentiators">
              {t('differentiators.viewAll')}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
