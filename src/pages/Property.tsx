import { useState, useMemo } from 'react';
import { PageWrapper } from '@/components/layout';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Bed, Bath, TreePine, ChefHat, ArrowRight, Sofa, BookOpen, Check } from 'lucide-react';
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
  livingAperitif,
  bedroomPrimary,
  bedroomAtmospheric,
  bedroomMezzanine,
  bedroomQuietLuxury,
  terraceDining,
  gardenSports,
  gardenLandscape,
  gameRoomPool,
  gameRoomFoosball,
  playBarn,
} from '@/assets/property';
import { useSEO } from '@/hooks/useSEO';
import PropertyGalleryGrid from '@/components/property/PropertyGalleryGrid';
import PropertyLightbox, { LightboxImage } from '@/components/property/PropertyLightbox';

const Property = () => {
  const { t } = useTranslation('property');
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
    addUnique(diningRoom, 'Eetkamer overzicht');
    // Living Space section
    addUnique(bedroomMezzanine, 'Mezzanine slaapkamer');
    addUnique(bedroomQuietLuxury, 'Luxe slaapkamer');
    addUnique(gameRoomFoosball, 'Tafelvoetbal');
    // Remaining photos
    addUnique(gardenSports, 'Sportveld in de tuin');
    addUnique(gardenLandscape, 'Landschap van de tuin');
    return photos;
  }, [t]);

  const handleImageClick = (src: string) => {
    const index = allPhotos.findIndex(photo => photo.src === src);
    setCurrentImageIndex(index >= 0 ? index : 0);
    setLightboxOpen(true);
  };

  const features = [
    { icon: Users, label: t('overview.capacity') },
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
              <PropertyGalleryGrid
                mainImage={livingFireplace}
                mainImageAlt={t('livingSpace.imageAlt', 'Sfeervolle woonkamer met open haard, comfortabele zithoek en uitzicht op de tuin')}
                sideImages={[
                  { src: livingAperitif, alt: 'Gezellige zithoek' },
                  { src: bedroomMezzanine, alt: 'Mezzanine slaapkamer' },
                  { src: bedroomQuietLuxury, alt: 'Luxe slaapkamer' },
                  { src: gameRoomFoosball, alt: 'Tafelvoetbal' },
                ]}
                allPhotosCount={allPhotos.length}
                onImageClick={handleImageClick}
                sideImagesPosition="left"
              />
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
