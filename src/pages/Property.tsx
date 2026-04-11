import { useState, useMemo } from 'react';
import { PageWrapper } from '@/components/layout';
import { useTranslation } from 'react-i18next';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Bed, Bath, TreePine, ChefHat, ArrowRight, Sofa, BookOpen, Check, ShowerHead, Moon, Car, Gamepad2, Footprints, Trophy, Laugh } from 'lucide-react';
import { MdFamilyRestroom } from 'react-icons/md';
import { 
  propertyHero, 
  kitchen,
  mieleDishwasher,
  oakTableDetail, 
  diningRoom,
  diningTableSet,
  diningTableWindow,
  diningTableCabinet,
  livingFireplace,
  bedroomPrimary,
  bedroomAtmospheric,
  livingAperitif,
  livingLounge,
  livingTvCorner,
  livingRetroGaming,
  bedroomMezzanine,
  bedroomQuietLuxury,
  terraceDining,
  gardenSports,
  gardenLandscape,
  gardenAerial,
  gardenHiddenPath,
  gardenHammock,
  bbqTerrace,
  farmhouseAerial,
  farmhouseFront,
  farmhouseSide,
  farmhouseEntrance,
  gameRoomPool,
  gameRoomFoosball,
  playBarn,
  bathroomEnsuite,
  bathroomSink,
  bathroomShower,
  bathroomGlassDoor,
  bathroomWalkIn,
} from '@/assets/property';
import { useSEO } from '@/hooks/useSEO';
import PropertyGalleryGrid from '@/components/property/PropertyGalleryGrid';
import PropertyLightbox, { LightboxImage } from '@/components/property/PropertyLightbox';

const Property = () => {
  const { t } = useTranslation('property');
  const { t: tHome } = useTranslation('homepage');
  useSEO();

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Lightbox photos ordered by section: main photo first, then side photos 1-4, deduplicated
  const allPhotos: LightboxImage[] = useMemo(() => {
    const seen = new Set<string>();
    const photos: LightboxImage[] = [];
    const addUnique = (src: string, alt: string) => {
      if (!seen.has(src)) {
        seen.add(src);
        photos.push({ src, alt });
      }
    };
    // Hero
    addUnique(propertyHero, t('hero.imageAlt', 'Voorgevel van de historische hoeve ArdenNest'));
    // Kitchen section
    addUnique(kitchen, t('kitchen.imageAlt', 'Professionele Lacanche keuken met gastronorm oven bij ArdenNest'));
    addUnique(mieleDishwasher, 'Miele Professional vaatwasser in de keuken van ArdenNest');
    addUnique(diningRoom, 'Overzicht van de eetzaal met eiken tafel voor 26 bij ArdenNest');
    addUnique(terraceDining, 'Buitenterras met eethoek in de tuin van ArdenNest');
    addUnique(playBarn, 'De speelstal met skelters en speelgoed bij ArdenNest');
    // Oak Table section
    addUnique(oakTableDetail, t('oakTable.imageAlt', 'Detail van de massief eiken tafel bij ArdenNest'));
    addUnique(diningTableSet, 'Gedekte eiken tafel voor 26 personen bij ArdenNest');
    addUnique(diningTableWindow, 'Uitzicht vanuit de eetzaal op de tuin van ArdenNest');
    addUnique(diningTableCabinet, 'Detail van de servieskast naast de eiken tafel bij ArdenNest');
    // Bathrooms section
    addUnique(bathroomEnsuite, 'Ensuite badkamer met douche bij ArdenNest');
    addUnique(bathroomSink, 'Wastafel in ensuite badkamer van ArdenNest');
    addUnique(bathroomShower, 'Inloopdouche in badkamer van ArdenNest');
    addUnique(bathroomGlassDoor, 'Badkamer met glazen deur bij ArdenNest');
    addUnique(bathroomWalkIn, 'Ruime inloopdouche met glazen wand bij ArdenNest');
    // Bedrooms section
    addUnique(bedroomQuietLuxury, 'Slaapkamer met boxspring en De Witte Lietaer beddengoed bij ArdenNest');
    addUnique(bedroomPrimary, 'Hoofdslaapkamer met ensuite badkamer bij ArdenNest');
    addUnique(bedroomAtmospheric, 'Sfeervolle slaapkamer met warm licht bij ArdenNest');
    addUnique(bedroomMezzanine, 'Slaapkamer met mezzanine voor kinderen bij ArdenNest');
    // Living Space section
    addUnique(livingFireplace, t('livingSpace.imageAlt', 'Open haard in de leefruimte van ArdenNest'));
    addUnique(livingLounge, 'Gezellige loungehoek in de leefruimte van ArdenNest');
    addUnique(livingAperitif, 'Aperitief bij de open haard in ArdenNest');
    addUnique(livingTvCorner, 'TV-hoek in de leefruimte van ArdenNest');
    addUnique(livingRetroGaming, 'Retro gaming hoek in de speelkamer van ArdenNest');
    // Garden section
    addUnique(gardenAerial, 'Luchtfoto van ArdenNest en de tuin van 2 hectare');
    addUnique(gardenSports, 'Sportveld met voetbaldoel in de tuin van ArdenNest');
    addUnique(bbqTerrace, 'Terras met barbecue tussen huis en tuin bij ArdenNest');
    addUnique(gardenHiddenPath, 'Verborgen pad in de tuin van ArdenNest');
    addUnique(gardenHammock, 'Hangmat in de schaduw in de tuin van ArdenNest');
    addUnique(gardenLandscape, 'Glooiend landschap en tuin van 2 hectare bij ArdenNest');
    // Game room section
    addUnique(gameRoomPool, 'Professionele pooltafel in de speelkamer van ArdenNest');
    addUnique(gameRoomFoosball, 'Voetbaltafel in de speelkamer van ArdenNest');
    // Play barn section
    addUnique(playBarn, 'De speelstal met skelters en speelgoed bij ArdenNest');
    addUnique(farmhouseAerial, 'Drone-opname van ArdenNest en omgeving in Gedinne');
    addUnique(farmhouseFront, 'Panorama voorgevel van ArdenNest bij daglicht');
    addUnique(farmhouseSide, 'Zijgevel van ArdenNest met tuin');
    addUnique(farmhouseEntrance, 'Ingang van vakantiewoning ArdenNest in Gedinne');
    return photos;
  }, [t]);

  const handleImageClick = (src: string) => {
    const index = allPhotos.findIndex(photo => photo.src === src);
    setCurrentImageIndex(index >= 0 ? index : 0);
    setLightboxOpen(true);
  };

  const features = [
    { icon: MdFamilyRestroom, label: t('overview.capacity') },
    { icon: Bed, label: t('overview.bedrooms') },
    { icon: Bath, label: t('overview.bathrooms') },
    { icon: TreePine, label: t('overview.garden') },
  ];

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
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden" aria-label={t('title')}>
        <div
          className="absolute inset-0 bg-cover bg-center cursor-pointer"
          style={{ backgroundImage: `url('${propertyHero}')` }}
          role="img"
          aria-label={t('hero.imageAlt', 'Voorgevel van de gerenoveerde Ardense hoeve Arden\'Nest met authentieke stenen muren')}
          onClick={() => handleImageClick(propertyHero)}
        >
          <div className="absolute inset-0 bg-charcoal/50" />
        </div>
        <div className="relative z-10 text-center text-cream container-luxury pointer-events-none">
          <p className="heading-display mb-4">{t('title')}</p>
          <h1 className="font-serif text-2xl md:text-3xl text-cream/90 font-normal">{t('h1')}</h1>
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
              <ul className="space-y-3">
                {(t('kitchen.features_list', { returnObjects: true, defaultValue: [] }) as string[]).map((feature: string, index: number) => (
                  <li key={index} className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 lg:order-2">
              <PropertyGalleryGrid
                mainImage={kitchen}
                mainImageAlt={t('kitchen.imageAlt', 'Professionele keuken met Lacanche fornuis')}
                sideImages={[
                  { src: mieleDishwasher, alt: 'Miele Professional vaatwasser in de keuken van ArdenNest' },
                  { src: diningRoom, alt: 'Ruime eetkamer met eiken tafel voor 26 personen' },
                  { src: terraceDining, alt: 'Overdekt terras met eethoek en tuinzicht' },
                  { src: playBarn, alt: 'Speelschuur voor kinderen bij ArdenNest' },
                ]}
                allPhotosCount={allPhotos.length}
                onImageClick={handleImageClick}
                sideImagesPosition="right"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Oak Table Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <PropertyGalleryGrid
                mainImage={oakTableDetail}
                mainImageAlt={t('oakTable.imageAlt', 'Handgemaakte eiken tafel van 6 meter')}
                sideImages={[
                  { src: diningTableSet, alt: 'Gedekte eiken tafel voor 26 gasten met zicht op de tuin' },
                  { src: diningTableWindow, alt: 'Eiken tafel bij het raam met bordspellen klaar' },
                  { src: diningTableCabinet, alt: 'Eiken eettafel met authentieke servieskast' },
                  { src: diningRoom, alt: 'Eetkamer overzicht met originele boerderijbalken' },
                ]}
                allPhotosCount={allPhotos.length}
                onImageClick={handleImageClick}
                sideImagesPosition="left"
              />
            </div>
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <BookOpen className="h-8 w-8 text-gold" />
                <h2 className="heading-2">{t('oakTable.title')}</h2>
              </div>
              <p className="body-large text-primary-foreground/80 mb-8">
                {t('oakTable.description')}
              </p>
              <ul className="space-y-3">
                {(t('oakTable.features_list', { returnObjects: true, defaultValue: [] }) as string[]).map((feature: string, index: number) => (
                  <li key={index} className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-gold flex-shrink-0" />
                    <span className="text-primary-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Bathrooms Section */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center space-x-3 mb-4">
                <ShowerHead className="h-8 w-8 text-accent" />
                <h2 className="heading-2">{t('bathrooms.title')}</h2>
              </div>
              <p className="body-large text-muted-foreground mb-8">
                {t('bathrooms.description')}
              </p>
              <ul className="space-y-3">
                {(t('bathrooms.features_list', { returnObjects: true, defaultValue: [] }) as string[]).map((feature: string, index: number) => (
                  <li key={index} className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 lg:order-2">
              <PropertyGalleryGrid
                mainImage={bathroomEnsuite}
                mainImageAlt={t('bathrooms.imageAlt', 'Ensuite badkamer met douche')}
                sideImages={[
                  { src: bathroomSink, alt: 'Ensuite badkamer met wastafel en spiegel' },
                  { src: bathroomShower, alt: 'Badkamer met ruime inloopdouche en glazen wand' },
                  { src: bathroomGlassDoor, alt: 'Moderne badkamer met glazen douchedeur en tegels' },
                  { src: bathroomWalkIn, alt: 'Privé badkamer met inloopdouche en wastafel ArdenNest' },
                ]}
                allPhotosCount={allPhotos.length}
                onImageClick={handleImageClick}
                sideImagesPosition="right"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bedrooms Section */}
      <section className="section-padding bg-cream-dark">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <PropertyGalleryGrid
                mainImage={bedroomQuietLuxury}
                mainImageAlt={t('bedrooms.imageAlt', 'Luxe slaapkamer met boxspring bed')}
                sideImages={[
                  { src: bedroomPrimary, alt: 'Hoofdslaapkamer met boxspring bed en warm licht' },
                  { src: bedroomAtmospheric, alt: 'Sfeervolle slaapkamer met authentieke afwerking' },
                  { src: bedroomMezzanine, alt: 'Gezinsslaapkamer met mezzanine voor kinderen' },
                  { src: bathroomEnsuite, alt: 'Ensuite badkamer bij elke slaapkamer ArdenNest' },
                ]}
                allPhotosCount={allPhotos.length}
                onImageClick={handleImageClick}
                sideImagesPosition="left"
              />
            </div>
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Moon className="h-8 w-8 text-accent" />
                <h2 className="heading-2">{t('bedrooms.title')}</h2>
              </div>
              <p className="body-large text-muted-foreground mb-8">
                {t('bedrooms.description')}
              </p>
              <ul className="space-y-3">
                {(t('bedrooms.features_list', { returnObjects: true, defaultValue: [] }) as string[]).map((feature: string, index: number) => (
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

      {/* Living Space Section */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center space-x-3 mb-4">
                <Sofa className="h-8 w-8 text-accent" />
                <h2 className="heading-2">{t('livingSpace.title')}</h2>
              </div>
              <p className="body-large text-muted-foreground mb-8">
                {t('livingSpace.description')}
              </p>
              <ul className="space-y-3">
                {(t('livingSpace.features_list', { returnObjects: true, defaultValue: [] }) as string[]).map((feature: string, index: number) => (
                  <li key={index} className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 lg:order-2">
              <PropertyGalleryGrid
                mainImage={livingFireplace}
                mainImageAlt={t('livingSpace.imageAlt', 'Sfeervolle woonkamer met open haard, comfortabele zithoek en uitzicht op de tuin')}
                sideImages={[
                  { src: livingLounge, alt: 'Ruime lounge met meerdere zithoeken voor grote groepen' },
                  { src: livingAperitif, alt: 'Gezellige zithoek met aperitief en warm licht' },
                  { src: livingTvCorner, alt: 'TV-hoek met authentieke bakstenen muur en comfortabele zetels' },
                  { src: livingRetroGaming, alt: 'Retro gaming controllers voor een avond nostalgie' },
                ]}
                allPhotosCount={allPhotos.length}
                onImageClick={handleImageClick}
                sideImagesPosition="right"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Garden Summary */}
      <section className="section-padding bg-primary">
        <div className="container-luxury">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="heading-2 mb-4 text-primary-foreground">{t('garden.title')}</h2>
            <p className="body-large text-primary-foreground/80">
              {t('garden.description')}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(t('garden.features', { returnObjects: true }) as Record<string, string>).map(
              ([key, value]) => {
                const iconMap: Record<string, React.ReactNode> = {
                  size: <Moon className="h-8 w-8 text-primary mx-auto mb-3" />,
                  playground: <Footprints className="h-8 w-8 text-primary mx-auto mb-3" />,
                  football: <Trophy className="h-8 w-8 text-primary mx-auto mb-3" />,
                  treasureHunt: <Laugh className="h-8 w-8 text-primary mx-auto mb-3" />,
                };
                return (
                  <Card key={key} className="text-center">
                    <CardContent className="p-6">
                      {iconMap[key] || <TreePine className="h-8 w-8 text-primary mx-auto mb-3" />}
                      <span className="font-medium text-foreground">{value}</span>
                    </CardContent>
                  </Card>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* Garden Section */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <PropertyGalleryGrid
                mainImage={gardenAerial}
                mainImageAlt="Luchtfoto van de 2 hectare grote tuin bij ArdenNest"
                sideImages={[
                  { src: gardenSports, alt: 'Sportveld met voetbaldoelen in de tuin van ArdenNest' },
                  { src: bbqTerrace, alt: 'BBQ terras met buitenkeuken en zitplaatsen' },
                  { src: gardenHiddenPath, alt: 'Verborgen pad door het groen in de tuin' },
                  { src: gardenHammock, alt: 'Hangmat tussen de bomen in de tuin van ArdenNest' },
                ]}
                allPhotosCount={allPhotos.length}
                onImageClick={handleImageClick}
                sideImagesPosition="left"
              />
            </div>
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <TreePine className="h-8 w-8 text-accent" />
                <h2 className="heading-2">{tHome('differentiators.gardenFull.title')}</h2>
              </div>
              <p className="body-large text-muted-foreground mb-8">
                {tHome('differentiators.gardenFull.description')}
              </p>
              <ul className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i} className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{tHome(`differentiators.gardenFull.feature${i}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Game Room Section */}
      <section className="section-padding bg-cream-dark">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center space-x-3 mb-4">
                <Gamepad2 className="h-8 w-8 text-accent" />
                <h2 className="heading-2">{tHome('differentiators.gameRoom.title')}</h2>
              </div>
              <p className="body-large text-muted-foreground mb-8">
                {tHome('differentiators.gameRoom.description')}
              </p>
              <ul className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i} className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{tHome(`differentiators.gameRoom.feature${i}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 lg:order-2">
              <PropertyGalleryGrid
                mainImage={gameRoomPool}
                mainImageAlt="Speelkamer met professionele pooltafel bij ArdenNest"
                sideImages={[
                  { src: gameRoomFoosball, alt: 'Tafelvoetbal in de speelkamer voor kinderen en volwassenen' },
                  { src: playBarn, alt: 'De Speelstal met go-karts en speelgoed voor kinderen' },
                  { src: gardenSports, alt: 'Sportveld met voetbal en spelletjes buiten' },
                  { src: livingFireplace, alt: 'Woonkamer met open haard voor gezellige avonden' },
                ]}
                allPhotosCount={allPhotos.length}
                onImageClick={handleImageClick}
                sideImagesPosition="right"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-1 lg:order-1">
              <PropertyGalleryGrid
                mainImage={playBarn}
                mainImageAlt="De Speelstal met go-karts en skelters voor kinderen"
                sideImages={[
                  { src: farmhouseAerial, alt: 'Luchtfoto van de authentieke hoeve ArdenNest uit 1849' },
                  { src: farmhouseFront, alt: 'Voorgevel van de gerenoveerde hoeve ArdenNest' },
                  { src: farmhouseSide, alt: 'Zijgevel van de hoeve met tuin en groen' },
                  { src: farmhouseEntrance, alt: 'Ingang van de hoeve met originele poort' },
                ]}
                allPhotosCount={allPhotos.length}
                onImageClick={handleImageClick}
                sideImagesPosition="left"
              />
            </div>
            <div className="order-2 lg:order-2">
              <div className="flex items-center space-x-3 mb-4">
                <Car className="h-8 w-8 text-accent" />
                <h2 className="heading-2">{tHome('differentiators.playBarn.title')}</h2>
              </div>
              <p className="body-large text-muted-foreground mb-8">
                {tHome('differentiators.playBarn.description')}
              </p>
              <ul className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i} className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{tHome(`differentiators.playBarn.feature${i}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-cream-dark">
        <div className="container-luxury text-center">
          <h2 className="heading-2 mb-4">{t('cta.title')}</h2>
          <p className="body-large text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/booking">
                {t('cta.availability')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">{t('cta.contact')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Property;
