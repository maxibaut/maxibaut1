import { useState, useMemo } from 'react';
import { PageWrapper } from '@/components/layout';
import { useTranslation } from 'react-i18next';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Bed, Bath, TreePine, ChefHat, ArrowRight, Sofa, BookOpen, Check, ShowerHead, Moon, Car, Gamepad2 } from 'lucide-react';
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
    addUnique(propertyHero, t('hero.imageAlt', 'Voorgevel van de gerenoveerde Ardense hoeve'));
    // Kitchen section
    addUnique(kitchen, t('kitchen.imageAlt', 'Professionele keuken met Lacanche fornuis'));
    addUnique(mieleDishwasher, 'Miele professionele vaatwasser');
    addUnique(diningRoom, 'Eetkamer');
    addUnique(terraceDining, 'Terras met eethoek');
    addUnique(playBarn, 'Speelstal');
    // Oak Table section
    addUnique(oakTableDetail, t('oakTable.imageAlt', 'Handgemaakte eiken tafel van 6 meter'));
    addUnique(diningTableSet, 'Gedekte eiken tafel met zicht op tuin');
    addUnique(diningTableWindow, 'Eiken tafel bij het raam');
    addUnique(diningTableCabinet, 'Eiken tafel met servieskast');
    // Bathrooms section
    addUnique(bathroomEnsuite, 'Ensuite slaapkamer met badkamer');
    addUnique(bathroomSink, 'Slaapkamer met ensuite badkamer');
    addUnique(bathroomShower, 'Badkamer met inloopdouche');
    addUnique(bathroomGlassDoor, 'Badkamer met glazen douchedeur');
    addUnique(bathroomWalkIn, 'Badkamer met inloopdouche en wastafel');
    // Bedrooms section
    addUnique(bedroomQuietLuxury, 'Luxe slaapkamer');
    addUnique(bedroomPrimary, 'Hoofdslaapkamer');
    addUnique(bedroomAtmospheric, 'Sfeervolle slaapkamer');
    addUnique(bedroomMezzanine, 'Mezzanine slaapkamer');
    // Living Space section
    addUnique(livingFireplace, t('livingSpace.imageAlt', 'Sfeervolle woonkamer'));
    addUnique(livingLounge, 'Ruime lounge met zithoeken');
    addUnique(livingAperitif, 'Gezellige zithoek met aperitief');
    addUnique(livingTvCorner, 'TV-hoek met authentieke bakstenen muur');
    addUnique(livingRetroGaming, 'Retro gaming controllers');
    // Garden section
    addUnique(gardenAerial, 'Luchtfoto van de tuin');
    addUnique(gardenSports, 'Sportveld in de tuin');
    addUnique(bbqTerrace, 'BBQ terras');
    addUnique(gardenHiddenPath, 'Verborgen pad in de tuin');
    addUnique(gardenHammock, 'Hangmat in de tuin');
    addUnique(gardenLandscape, 'Landschap van de tuin');
    // Game room section
    addUnique(gameRoomPool, 'Speelkamer met professionele pooltafel');
    addUnique(gameRoomFoosball, 'Tafelvoetbal');
    // Play barn section
    addUnique(playBarn, 'De Speelstal met go-karts en skelters');
    addUnique(farmhouseAerial, 'Luchtfoto van de hoeve');
    addUnique(farmhouseFront, 'Voorgevel van de hoeve');
    addUnique(farmhouseSide, 'Zijkant van de hoeve');
    addUnique(farmhouseEntrance, 'Ingang van de hoeve');
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
                  { src: mieleDishwasher, alt: 'Miele professionele vaatwasser' },
                  { src: diningRoom, alt: 'Eetkamer' },
                  { src: terraceDining, alt: 'Terras met eethoek' },
                  { src: playBarn, alt: 'Speelstal' },
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
                  { src: diningTableSet, alt: 'Gedekte eiken tafel met zicht op tuin' },
                  { src: diningTableWindow, alt: 'Eiken tafel bij het raam met bordspellen' },
                  { src: diningTableCabinet, alt: 'Eiken tafel met servieskast' },
                  { src: diningRoom, alt: 'Eetkamer overzicht' },
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
                  { src: bathroomSink, alt: 'Slaapkamer met ensuite badkamer' },
                  { src: bathroomShower, alt: 'Badkamer met inloopdouche' },
                  { src: bathroomGlassDoor, alt: 'Badkamer met glazen douchedeur' },
                  { src: bathroomWalkIn, alt: 'Badkamer met inloopdouche en wastafel' },
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
                  { src: bedroomPrimary, alt: 'Hoofdslaapkamer' },
                  { src: bedroomAtmospheric, alt: 'Sfeervolle slaapkamer' },
                  { src: bedroomMezzanine, alt: 'Mezzanine slaapkamer' },
                  { src: bathroomEnsuite, alt: 'Slaapkamer met ensuite badkamer' },
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
                  { src: livingLounge, alt: 'Ruime lounge met zithoeken' },
                  { src: livingAperitif, alt: 'Gezellige zithoek met aperitief' },
                  { src: livingTvCorner, alt: 'TV-hoek met authentieke bakstenen muur' },
                  { src: livingRetroGaming, alt: 'Retro gaming controllers' },
                ]}
                allPhotosCount={allPhotos.length}
                onImageClick={handleImageClick}
                sideImagesPosition="right"
              />
            </div>
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
                mainImageAlt="Luchtfoto van de tuin"
                sideImages={[
                  { src: gardenSports, alt: 'Sportveld in de tuin' },
                  { src: bbqTerrace, alt: 'BBQ terras' },
                  { src: gardenHiddenPath, alt: 'Verborgen pad in de tuin' },
                  { src: gardenHammock, alt: 'Hangmat in de tuin' },
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
                mainImageAlt="Speelkamer met professionele pooltafel"
                sideImages={[
                  { src: gameRoomFoosball, alt: 'Tafelvoetbal' },
                  { src: playBarn, alt: 'De Speelstal' },
                  { src: gardenSports, alt: 'Sportveld in de tuin' },
                  { src: livingFireplace, alt: 'Woonkamer' },
                ]}
                allPhotosCount={allPhotos.length}
                onImageClick={handleImageClick}
                sideImagesPosition="right"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-cream-dark">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
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
            <div className="order-1 lg:order-2">
              <PropertyGalleryGrid
                mainImage={playBarn}
                mainImageAlt="De Speelstal met go-karts en skelters"
                sideImages={[
                  { src: farmhouseAerial, alt: 'Luchtfoto van de hoeve' },
                  { src: farmhouseFront, alt: 'Voorgevel van de hoeve' },
                  { src: farmhouseSide, alt: 'Zijkant van de hoeve' },
                  { src: farmhouseEntrance, alt: 'Ingang van de hoeve' },
                ]}
                allPhotosCount={allPhotos.length}
                onImageClick={handleImageClick}
                sideImagesPosition="right"
              />
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
