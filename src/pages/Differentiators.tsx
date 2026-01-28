import { PageWrapper } from '@/components/layout';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, ChefHat, TreePine, Table, Gamepad2, Car, Check, ArrowRight, Bed, ClipboardCheck, UtensilsCrossed, Home } from 'lucide-react';
import { 
  bedroomQuietLuxury, 
  kitchen, 
  gardenAerial, 
  oakTableDetail, 
  gameRoomPool, 
  playBarn 
} from '@/assets/property';

const Differentiators = () => {
  const { t } = useTranslation('homepage');

  const sections = [
    {
      id: 'quiet-luxury',
      icon: Sparkles,
      title: t('differentiators.quietLuxury.title'),
      description: t('differentiators.quietLuxury.description'),
      image: bedroomQuietLuxury,
      features: [
        'Ensuite badkamers bij elke slaapkamer',
        'Massieve eiken vloeren in het hele huis',
        'Tijdloze, hoogwaardige inrichting',
        'Geen tierelantijnen, wel echte kwaliteit',
      ],
      reverse: false,
    },
    {
      id: 'kitchen',
      icon: ChefHat,
      title: t('differentiators.kitchen.title'),
      description: t('differentiators.kitchen.description'),
      image: kitchen,
      features: [
        'Lacanche fornuis van professionele kwaliteit',
        '2x Miele afwasmachines',
        'Amerikaanse koelkast met ijsmachine',
        'Alle keukenbenodigdheden voor 26 personen',
      ],
      reverse: true,
    },
    {
      id: 'garden',
      icon: TreePine,
      title: t('differentiators.garden.title'),
      description: t('differentiators.garden.description'),
      image: gardenAerial,
      features: [
        '200m x 100m aan ruimte',
        'Professionele speeltoestellen',
        'Voetbalveld met doelen',
        'Schattenjacht voor de kleintjes',
      ],
      reverse: false,
    },
    {
      id: 'oak-table',
      icon: Table,
      title: 'De Eiken Tafel',
      description: 'Het hart van het huis. Waar verhalen worden gedeeld, herinneringen worden gemaakt en generaties samenkomen rond een maaltijd.',
      image: oakTableDetail,
      features: [
        '6 meter lang, handgemaakt',
        'Plaats voor 26 personen',
        'Het centrum van elke maaltijd',
        'Waar herinneringen ontstaan',
      ],
      reverse: true,
    },
    {
      id: 'game-room',
      icon: Gamepad2,
      title: 'De Speelkamer',
      description: 'Een ruimte waar jong en oud elkaar uitdagen. Van spannende potjes pool tot fanatieke voetbalwedstrijden aan de tafel.',
      image: gameRoomPool,
      features: [
        'Professionele pooltafel',
        'Voetbaltafel voor intense matches',
        'Uitgebreide bordspellen collectie',
        'Retro gaming voor de liefhebbers',
      ],
      reverse: false,
    },
    {
      id: 'play-barn',
      icon: Car,
      title: 'De Speelschuur',
      description: 'Een overdekte speelruimte speciaal voor de allerkleinsten. Vol met skelters, tractoren en speelgoed voor urenlang plezier.',
      image: playBarn,
      features: [
        'Go-karts en skelters',
        'Trapautootjes en tractoren',
        'Driewielers voor de kleintjes',
        'Overdekt: spelen bij elk weer',
      ],
      reverse: true,
    },
    {
      id: 'mattresses',
      icon: Bed,
      title: t('differentiators.mattresses.title'),
      description: t('differentiators.mattresses.description'),
      image: bedroomQuietLuxury, // Placeholder - replace with mattress photo
      features: [
        'Boxspring bedden',
        'Dikke, comfortabele matrassen',
        'Perfecte nachtrust gegarandeerd',
        'Uitgerust wakker worden',
      ],
      reverse: false,
    },
    {
      id: 'dish-cabinet',
      icon: ClipboardCheck,
      title: t('differentiators.dishCabinet.title'),
      description: t('differentiators.dishCabinet.description'),
      image: kitchen, // Placeholder - replace with dish cabinet photo
      features: [
        'Volledige controle na elke gast',
        'Alles compleet en in perfecte staat',
        'Geen verrassingen bij aankomst',
        'Aandacht voor detail',
      ],
      reverse: true,
    },
    {
      id: 'professional-equipment',
      icon: UtensilsCrossed,
      title: t('differentiators.professionalEquipment.title'),
      description: t('differentiators.professionalEquipment.description'),
      image: kitchen, // Placeholder - replace with pots/pans photo
      features: [
        'Horeca-kwaliteit potten en pannen',
        'Professioneel kookgerei',
        'Geschikt voor grote groepen',
        'Alles wat u nodig heeft',
      ],
      reverse: false,
    },
    {
      id: 'living-on-site',
      icon: Home,
      title: t('differentiators.livingOnSite.title'),
      description: t('differentiators.livingOnSite.description'),
      image: bedroomQuietLuxury, // Placeholder - replace with owners/estate photo
      features: [
        '25 jaar woonervaring ter plaatse',
        'Diepgaande kennis van het huis',
        'Kennis van de omgeving',
        'Altijd bereikbaar indien nodig',
      ],
      reverse: true,
    },
  ];

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground section-padding">
        <div className="container-luxury text-center">
          <h1 className="heading-display mb-4">{t('differentiators.sectionTitle')}</h1>
          <p className="body-large text-primary-foreground/80 max-w-2xl mx-auto">
            {t('differentiators.sectionSubtitle')}
          </p>
        </div>
      </section>

      {/* Differentiator Sections */}
      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className={`section-padding ${section.reverse ? 'bg-cream-dark' : 'bg-background'}`}
        >
          <div className="container-luxury">
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                section.reverse ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div className={section.reverse ? 'lg:order-2' : ''}>
                <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                  <img
                    src={section.image}
                    alt={section.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Content */}
              <div className={section.reverse ? 'lg:order-1' : ''}>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <section.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h2 className="heading-2">{section.title}</h2>
                </div>

                <p className="body-large text-muted-foreground mb-8">
                  {section.description}
                </p>

                <ul className="space-y-3">
                  {section.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-luxury text-center">
          <h2 className="heading-2 mb-4">Overtuigd?</h2>
          <p className="body-large text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Bekijk de beschikbaarheid en boek direct bij ons voor de beste prijs en persoonlijke service.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <Link to="/booking">
                Bekijk beschikbaarheid
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link to="/contact">Neem contact op</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Differentiators;
