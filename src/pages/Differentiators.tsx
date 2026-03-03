import { useState, useMemo } from 'react';
import { PageWrapper } from '@/components/layout';
import { useTranslation } from 'react-i18next';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { Button } from '@/components/ui/button';
import { Sparkles, ChefHat, TreePine, Gamepad2, Car, Check, ArrowRight, Bed, ClipboardCheck, UtensilsCrossed, Home, Zap, Award, Fan, Headphones } from 'lucide-react';
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

  const sections = useMemo(() => [
    {
      id: 'customer-journey',
      icon: Headphones,
      title: t('differentiators.customerJourney.title'),
      description: t('differentiators.customerJourney.description'),
      image: gardenSports,
      imageAlt: t('differentiators.customerJourney.title'),
      sideImages: [
        { src: familyPortrait, alt: t('differentiators.customerJourney.title') },
        { src: propertyHero, alt: t('differentiators.certified.title') },
        { src: terraceDining, alt: t('differentiators.gardenFull.title') },
        { src: gardenAerial, alt: t('differentiators.gardenFull.title') },
      ],
      features: [
        t('differentiators.customerJourney.feature1'),
        t('differentiators.customerJourney.feature2'),
        t('differentiators.customerJourney.feature3'),
        t('differentiators.customerJourney.feature4'),
      ],
      reverse: false,
    },
    {
      id: 'quiet-luxury',
      icon: Sparkles,
      title: t('differentiators.quietLuxury.title'),
      description: t('differentiators.quietLuxury.description'),
      image: bedroomQuietLuxury,
      imageAlt: t('differentiators.quietLuxury.title'),
      sideImages: [
        { src: bedroomPrimary, alt: t('differentiators.mattresses.title') },
        { src: bedroomAtmospheric, alt: t('differentiators.ventilation.title') },
        { src: bedroomMezzanine, alt: t('differentiators.mattresses.title') },
        { src: livingFireplace, alt: t('differentiators.quietLuxury.title') },
      ],
      features: [
        t('differentiators.mattresses.feature1'),
        t('differentiators.mattresses.feature2'),
        t('differentiators.mattresses.feature3'),
        t('differentiators.mattresses.feature4'),
      ],
      reverse: true,
    },
    {
      id: 'dish-cabinet',
      icon: ClipboardCheck,
      title: t('differentiators.dishCabinet.title'),
      description: t('differentiators.dishCabinet.description'),
      image: diningRoom,
      imageAlt: t('differentiators.dishCabinet.title'),
      sideImages: [
        { src: kitchen, alt: t('differentiators.kitchenPro.title') },
        { src: oakTableDetail, alt: t('differentiators.dishCabinet.title') },
        { src: terraceDining, alt: t('differentiators.gardenFull.title') },
        { src: livingFireplace, alt: t('differentiators.quietLuxury.title') },
      ],
      features: [
        t('differentiators.dishCabinetFeature1'),
        t('differentiators.dishCabinetFeature2'),
        t('differentiators.dishCabinetFeature3'),
        t('differentiators.dishCabinetFeature4'),
      ],
      reverse: true,
    },
    {
      id: 'living-on-site',
      icon: Home,
      title: t('differentiators.livingOnSite.title'),
      description: t('differentiators.livingOnSite.description'),
      image: familyPortrait,
      imageAlt: t('differentiators.livingOnSite.title'),
      sideImages: [
        { src: propertyHero, alt: t('differentiators.certified.title') },
        { src: gardenAerial, alt: t('differentiators.gardenFull.title') },
        { src: terraceDining, alt: t('differentiators.gardenFull.title') },
        { src: gardenLandscape, alt: t('differentiators.gardenFull.title') },
      ],
      features: [
        t('differentiators.livingOnSiteFeature1'),
        t('differentiators.livingOnSiteFeature2'),
        t('differentiators.livingOnSiteFeature3'),
        t('differentiators.livingOnSiteFeature4'),
      ],
      reverse: true,
    },
    {
      id: 'utilities',
      icon: Zap,
      title: t('differentiators.utilities.title'),
      description: t('differentiators.utilities.description'),
      image: propertyHero,
      imageAlt: t('differentiators.utilities.title'),
      sideImages: [
        { src: kitchen, alt: t('differentiators.kitchenPro.title') },
        { src: livingFireplace, alt: t('differentiators.quietLuxury.title') },
        { src: bedroomPrimary, alt: t('differentiators.mattresses.title') },
        { src: terraceDining, alt: t('differentiators.gardenFull.title') },
      ],
      features: [
        t('differentiators.utilitiesFeature1'),
        t('differentiators.utilitiesFeature2'),
        t('differentiators.utilitiesFeature3'),
        t('differentiators.utilitiesFeature4'),
      ],
      reverse: false,
    },
    {
      id: 'green-key',
      icon: Leaf,
      title: t('differentiators.greenKey.title'),
      description: t('differentiators.greenKey.description'),
      image: gardenLandscape,
      imageAlt: t('differentiators.greenKey.title'),
      sideImages: [
        { src: gardenAerial, alt: t('differentiators.gardenFull.title') },
        { src: gardenSports, alt: t('differentiators.gardenFull.title') },
        { src: propertyHero, alt: t('differentiators.certified.title') },
        { src: terraceDining, alt: t('differentiators.gardenFull.title') },
      ],
      features: [
        t('differentiators.greenKeyFeature1'),
        t('differentiators.greenKeyFeature2'),
        t('differentiators.greenKeyFeature3'),
        t('differentiators.greenKeyFeature4'),
      ],
      reverse: true,
    },
    {
      id: 'certified',
      icon: Award,
      title: t('differentiators.certified.title'),
      description: t('differentiators.certified.description'),
      image: terraceDining,
      imageAlt: t('differentiators.certified.title'),
      sideImages: [
        { src: propertyHero, alt: t('differentiators.certified.title') },
        { src: gardenAerial, alt: t('differentiators.gardenFull.title') },
        { src: kitchen, alt: t('differentiators.kitchenPro.title') },
        { src: bedroomQuietLuxury, alt: t('differentiators.quietLuxury.title') },
      ],
      features: [
        t('differentiators.certifiedFeature1'),
        t('differentiators.certifiedFeature2'),
        t('differentiators.certifiedFeature3'),
        t('differentiators.certifiedFeature4'),
      ],
      reverse: false,
    },
  ], [t]);

  // Build lightbox photos from sections: main photo first, then side photos, deduplicated
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
          <p className="heading-display mb-4 text-primary-foreground">{t('differentiators.sectionTitle')}</p>
          <h1 className="font-serif text-2xl md:text-3xl text-primary-foreground/80 max-w-2xl mx-auto font-normal">
            {t('differentiators.h1')}
          </h1>
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
          <h2 className="heading-2 mb-4">{t('differentiators.cta.title')}</h2>
          <p className="body-large text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            {t('differentiators.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <Link to="/booking">
                {t('differentiators.cta.availability')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link to="/contact">{t('differentiators.cta.contact')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Differentiators;
