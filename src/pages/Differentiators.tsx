import { useState, useMemo } from 'react';
import { PageWrapper } from '@/components/layout';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, ChefHat, TreePine, Gamepad2, Car, Check, ArrowRight, Bed, ClipboardCheck, UtensilsCrossed, Home, Zap, Leaf, Award, Fan, Headphones } from 'lucide-react';
import { 
  bedroomQuietLuxury, 
  bedroomPrimary,
  bedroomAtmospheric,
  bedroomMezzanine,
  kitchen,
  farmhouseAerial,
  farmhouseFront,
  farmhouseEntrance,
  farmhouseSide,
  diningRoom,
  livingFireplace,
  mieleDishwasher,
  gardenLoungers,
  gardenHiddenPath,
  gardenHammock,
  gardenAerial, 
  gardenSports,
  gardenLandscape,
  terraceDining,
  bbqTerrace,
  oakTableDetail, 
  gameRoomPool, 
  gameRoomFoosball,
  playBarn,
  propertyHero,
  familyPortrait,
} from '@/assets/property';
import PropertyLightbox, { LightboxImage } from '@/components/property/PropertyLightbox';
import PropertyGalleryGrid from '@/components/property/PropertyGalleryGrid';

const Differentiators = () => {
  const { t } = useTranslation('homepage');

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // sections is defined below, allPhotos and handleImageClick come after it
  const sections = [
    {
      id: 'quiet-luxury',
      icon: Sparkles,
      title: t('differentiators.quietLuxury.title'),
      description: t('differentiators.quietLuxury.description'),
      image: bedroomQuietLuxury,
      imageAlt: 'Stijlvolle slaapkamer met ensuite badkamer',
      sideImages: [
        { src: bedroomPrimary, alt: 'Hoofdslaapkamer' },
        { src: bedroomAtmospheric, alt: 'Sfeervolle slaapkamer' },
        { src: bedroomMezzanine, alt: 'Mezzanine slaapkamer' },
        { src: livingFireplace, alt: 'Woonkamer met open haard' },
      ],
      features: [
        'Verfijning zonder opsmuk – kwaliteit die voor zich spreekt',
        'Digital detox en rust – tegenwicht aan drukke, flashy vakanties',
        'Authentieke beleving – focus op échte momenten',
        'Waardevol samenzijn – luxe wordt gemeten in kwaliteit van momenten',
      ],
      reverse: false,
    },
    {
      id: 'kitchen',
      icon: ChefHat,
      title: 'Professionele Keuken',
      description: 'De keuken waar iedereen naartoe trekt. Samen koken, aperitieven, kinderen die komen snoepen — hier gebeurt het. Volledig professioneel ingericht zodat koken voor 26 plezier is, geen corvee.',
      image: kitchen,
      imageAlt: 'Professionele keuken met Lacanche fornuis',
      sideImages: [
        { src: mieleDishwasher, alt: 'Miele professionele vaatwasser' },
        { src: diningRoom, alt: 'Eetkamer' },
        { src: terraceDining, alt: 'Terras met eethoek' },
        { src: playBarn, alt: 'Speelstal' },
      ],
      features: [
        'Lacanche fornuis met gastronorm oven en warmhoudkast — het hart van de keuken',
        '2 professionele Miele vaatwassers — 30 minuten en alles is klaar',
        'Professionele inox potten, pannen en al het bijgerief — alles wat je nodig hebt, niets wat je moet zoeken',
        'Koele berging naast de keuken — ruimte voor al jullie boodschappen',
      ],
      reverse: true,
    },
    {
      id: 'garden',
      icon: TreePine,
      title: 'De Tuin',
      description: 'Niets is recht, niets is strak. Een enorm glooiend landschap waar kinderen urenlang verdwijnen en volwassenen tot rust komen. Altijd netjes onderhouden, met ruimte voor iedereen — van schattenjacht tot petanque, van voetbal tot aperitief.',
      image: gardenAerial,
      imageAlt: 'Luchtfoto van de 2 hectare grote tuin',
      sideImages: [
        { src: gardenSports, alt: 'Sportveld in de tuin' },
        { src: bbqTerrace, alt: 'Barbecue op het terras' },
        { src: gardenHiddenPath, alt: 'Verborgen plekje in de tuin' },
        { src: gardenHammock, alt: 'Hangmat tussen fruitbomen in de tuin' },
      ],
      features: [
        'Groot voetbalveld met volleybalnet en petanquebaan',
        'Verborgen plekjes doorheen de tuin — kinderen ontdekken steeds iets nieuws',
        '3 grote banken en 10 professionele ligzetels met tafeltjes bij mooi weer',
        'Terras tussen huis en tuin met 2 barbecues — de perfecte tussenstop',
      ],
      reverse: false,
    },
    {
      id: 'game-room',
      icon: Gamepad2,
      title: 'De Speelkamer',
      description: 'Een ruimte waar jong en oud elkaar uitdagen. Van spannende potjes pool tot fanatieke voetbalwedstrijden aan de tafel.',
      image: gameRoomPool,
      imageAlt: 'Speelkamer met professionele pooltafel',
      sideImages: [
        { src: gameRoomFoosball, alt: 'Tafelvoetbal' },
        { src: playBarn, alt: 'Speelstal' },
        { src: gardenSports, alt: 'Sportveld' },
        { src: livingFireplace, alt: 'Woonkamer' },
      ],
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
      title: 'De Speelstal',
      description: 'De voormalige paardenstal waar ooit de trekpaarden stonden, is nu een speelparadijs voor de allerkleinsten. Vol met skelters, tractoren en speelgoed voor urenlang plezier.',
      image: playBarn,
      imageAlt: 'De speelstal met go-karts en skelters',
      sideImages: [
        { src: farmhouseAerial, alt: 'Luchtfoto hoeve met asfalt vooraan' },
        { src: farmhouseFront, alt: 'Vooraanzicht hoeve met oprit' },
        { src: farmhouseSide, alt: 'Zijgevel hoeve met grote poort' },
        { src: farmhouseEntrance, alt: 'Ingang hoeve met kwaliteitslabels' },
      ],
      features: [
        'Go-karts en skelters',
        'Trapautootjes en tractoren',
        'Driewielers voor de kleintjes',
        'Rondjes rijden op het asfalt en stoepkrijten vooraan de hoeve',
      ],
      reverse: true,
    },
    {
      id: 'mattresses',
      icon: Bed,
      title: t('differentiators.mattresses.title'),
      description: t('differentiators.mattresses.description'),
      image: bedroomPrimary,
      imageAlt: 'Comfortabel boxspring bed',
      sideImages: [
        { src: bedroomQuietLuxury, alt: 'Luxe slaapkamer' },
        { src: bedroomAtmospheric, alt: 'Sfeervolle slaapkamer' },
        { src: bedroomMezzanine, alt: 'Mezzanine' },
        { src: livingFireplace, alt: 'Woonkamer' },
      ],
      features: [
        t('differentiators.mattresses.feature1'),
        t('differentiators.mattresses.feature2'),
        t('differentiators.mattresses.feature3'),
        t('differentiators.mattresses.feature4'),
      ],
      reverse: false,
    },
    {
      id: 'dish-cabinet',
      icon: ClipboardCheck,
      title: t('differentiators.dishCabinet.title'),
      description: t('differentiators.dishCabinet.description'),
      image: diningRoom,
      imageAlt: 'Volledig ingerichte eetkamer',
      sideImages: [
        { src: kitchen, alt: 'Keuken' },
        { src: oakTableDetail, alt: 'Eiken tafel' },
        { src: terraceDining, alt: 'Terras' },
        { src: livingFireplace, alt: 'Woonkamer' },
      ],
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
      image: kitchen,
      imageAlt: 'Horeca-kwaliteit keuken',
      sideImages: [
        { src: diningRoom, alt: 'Eetkamer' },
        { src: oakTableDetail, alt: 'Eiken tafel' },
        { src: terraceDining, alt: 'Terras' },
        { src: livingFireplace, alt: 'Woonkamer' },
      ],
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
      image: familyPortrait,
      imageAlt: 'Eigenaren op het domein',
      sideImages: [
        { src: propertyHero, alt: 'Voorgevel' },
        { src: gardenAerial, alt: 'Tuin overzicht' },
        { src: terraceDining, alt: 'Terras' },
        { src: gardenLandscape, alt: 'Landschap' },
      ],
      features: [
        '25 jaar woonervaring ter plaatse',
        'Diepgaande kennis van het huis',
        'Kennis van de omgeving',
        'Altijd bereikbaar indien nodig',
      ],
      reverse: true,
    },
    {
      id: 'utilities',
      icon: Zap,
      title: t('differentiators.utilities.title'),
      description: t('differentiators.utilities.description'),
      image: propertyHero,
      imageAlt: 'Voorgevel van de hoeve',
      sideImages: [
        { src: kitchen, alt: 'Keuken' },
        { src: livingFireplace, alt: 'Woonkamer met haard' },
        { src: bedroomPrimary, alt: 'Slaapkamer' },
        { src: terraceDining, alt: 'Terras' },
      ],
      features: [
        'Water inbegrepen',
        'Elektriciteit inbegrepen',
        'Verwarming inbegrepen',
        'Geen verrassingen bij afrekening',
      ],
      reverse: false,
    },
    {
      id: 'green-key',
      icon: Leaf,
      title: t('differentiators.greenKey.title'),
      description: t('differentiators.greenKey.description'),
      image: gardenLandscape,
      imageAlt: 'Groene omgeving',
      sideImages: [
        { src: gardenAerial, alt: 'Tuin overzicht' },
        { src: gardenSports, alt: 'Sportveld' },
        { src: propertyHero, alt: 'Voorgevel' },
        { src: terraceDining, alt: 'Terras' },
      ],
      features: [
        'Kandidaat Green Key label',
        'Duurzaam toerisme',
        'Milieubewuste keuzes',
        'Respect voor de natuur',
      ],
      reverse: true,
    },
    {
      id: 'certified',
      icon: Award,
      title: t('differentiators.certified.title'),
      description: t('differentiators.certified.description'),
      image: terraceDining,
      imageAlt: 'Terras met eethoek',
      sideImages: [
        { src: propertyHero, alt: 'Voorgevel' },
        { src: gardenAerial, alt: 'Tuin' },
        { src: kitchen, alt: 'Keuken' },
        { src: bedroomQuietLuxury, alt: 'Slaapkamer' },
      ],
      features: [
        'Gecertificeerd door Toerisme Wallonië',
        'Officiële erkenning',
        'Kwaliteitsgarantie',
        'Betrouwbaarheid verzekerd',
      ],
      reverse: false,
    },
    {
      id: 'ventilation',
      icon: Fan,
      title: t('differentiators.ventilation.title'),
      description: t('differentiators.ventilation.description'),
      image: bedroomAtmospheric,
      imageAlt: 'Slaapkamer met ventilatie',
      sideImages: [
        { src: bedroomPrimary, alt: 'Hoofdslaapkamer' },
        { src: bedroomQuietLuxury, alt: 'Luxe slaapkamer' },
        { src: bedroomMezzanine, alt: 'Mezzanine' },
        { src: livingFireplace, alt: 'Woonkamer' },
      ],
      features: [
        'Stille centrale ventilatie',
        'In alle badkamers',
        'Optimale luchtkwaliteit',
        'Geen storend geluid',
      ],
      reverse: true,
    },
    {
      id: 'customer-journey',
      icon: Headphones,
      title: 'Persoonlijke Begeleiding',
      description: 'Van eerste contact tot vertrek: wij begeleiden u bij elke stap. Duidelijke communicatie, transparante afrekening en persoonlijke service maken het verschil.',
      image: gardenSports,
      imageAlt: 'Persoonlijke service',
      sideImages: [
        { src: familyPortrait, alt: 'Eigenaren' },
        { src: propertyHero, alt: 'Voorgevel' },
        { src: terraceDining, alt: 'Terras' },
        { src: gardenAerial, alt: 'Tuin' },
      ],
      features: [
        'Begeleiding tijdens boekingsproces',
        'Duidelijke betalingstermijnen',
        'Gedetailleerde afrekening',
        'Achtergebleven spullen worden opgestuurd',
      ],
      reverse: false,
    },
  ];

  // Build lightbox photos from sections: main photo first, then side photos 1-4, per section, deduplicated
  const allPhotos: LightboxImage[] = useMemo(() => {
    const seen = new Set<string>();
    const photos: LightboxImage[] = [];
    sections.forEach(section => {
      if (!seen.has(section.image)) {
        seen.add(section.image);
        photos.push({ src: section.image, alt: section.imageAlt });
      }
      section.sideImages.forEach(img => {
        if (!seen.has(img.src)) {
          seen.add(img.src);
          photos.push(img);
        }
      });
    });
    return photos;
  }, [sections]);

  const handleImageClick = (src: string) => {
    const index = allPhotos.findIndex(photo => photo.src === src);
    setCurrentImageIndex(index >= 0 ? index : 0);
    setLightboxOpen(true);
  };

  return (
    <PageWrapper>
      {/* Lightbox */}
      <PropertyLightbox
        images={allPhotos}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setCurrentImageIndex}
      />

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
              {/* Image Gallery */}
              <div className={section.reverse ? 'lg:order-2' : ''}>
                <PropertyGalleryGrid
                  mainImage={section.image}
                  mainImageAlt={section.imageAlt}
                  sideImages={section.sideImages}
                  onImageClick={handleImageClick}
                  sideImagesPosition={section.reverse ? 'right' : 'left'}
                />
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
