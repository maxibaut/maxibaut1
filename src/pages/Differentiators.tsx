import { useState, useMemo, type ReactNode } from 'react';
import { PageWrapper } from '@/components/layout';
import { useTranslation } from 'react-i18next';
import { useSEO } from '@/hooks/useSEO';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { Button } from '@/components/ui/button';
import { Sparkles, Check, ArrowRight, ClipboardCheck, Home, Zap, Award, Headphones, Smile } from 'lucide-react';

// Phase 1 pilot: direct vite-imagetools Picture imports (responsive AVIF + WebP srcset).
// Bypasses src/assets/property barrel-file (which still exports legacy webp strings used elsewhere).
const PIC_QUERY = '?w=480;1600&format=webp&as=picture';
import bedroomQuietLuxury from '@/assets/property/ardennest-slaapkamer-boxspring-beddengoed.jpg?w=480;1600&format=webp&as=picture';
import bedroomPrimary from '@/assets/property/ardennest-slaapkamer-hoofdslaapkamer.jpg?w=480;1600&format=webp&as=picture';
import bedroomAtmospheric from '@/assets/property/ardennest-slaapkamer-sfeer.jpg?w=480;1600&format=webp&as=picture';
import bedroomMezzanine from '@/assets/property/ardennest-slaapkamer-mezzanine.jpg?w=480;1600&format=webp&as=picture';
import kitchen from '@/assets/property/ardennest-keuken-lacanche-overzicht.jpg?w=480;1600&format=webp&as=picture';
import diningRoom from '@/assets/property/ardennest-tafel-eetzaal-overzicht.jpg?w=480;1600&format=webp&as=picture';
import livingFireplace from '@/assets/property/ardennest-leefruimte-open-haard.jpg?w=480;1600&format=webp&as=picture';
import gardenSports from '@/assets/property/ardennest-tuin-sport-veld.jpg?w=480;1600&format=webp&as=picture';
import gardenAerial from '@/assets/property/ardennest-exterieur-tuin-luchtfoto.jpg?w=480;1600&format=webp&as=picture';
import gardenLandscape from '@/assets/property/ardennest-tuin-landschap.jpg?w=480;1600&format=webp&as=picture';
import terraceDining from '@/assets/property/ardennest-tuin-terras-eethoek.jpg?w=480;1600&format=webp&as=picture';
import oakTableDetail from '@/assets/property/ardennest-tafel-eiken-detail.jpg?w=480;1600&format=webp&as=picture';
import propertyHero from '@/assets/property/ardennest-exterieur-hoeve-hero.jpg?w=480;1600&format=webp&as=picture';
import familyPortrait from '@/assets/property/ardennest-eigenaars-gezin.jpg?w=480;1600&format=webp&as=picture';
import kidsGocartHero from '@/assets/property/ardennest-kinderen-gocart-skelter-parcours-hoeve.webp?w=480;1600&format=webp&as=picture';
import kidsFootball3Generations from '@/assets/property/ardennest-kinderen-voetbal-3-generaties.webp?w=480;1600&format=webp&as=picture';
import kidsHammockGarden from '@/assets/property/ardennest-kinderen-tuin-hangmat-rust.webp?w=480;1600&format=webp&as=picture';
import kidsTrampoline from '@/assets/property/ardennest-kinderen-trampoline-fun.webp?w=480;1600&format=webp&as=picture';
import kidsBambooHideSeek from '@/assets/property/ardennest-kinderen-bamboo-verstoppertje.webp?w=480;1600&format=webp&as=picture';

import PropertyLightbox, { LightboxImage } from '@/components/property/PropertyLightbox';
import PropertyGalleryGrid, { type ImageSrc } from '@/components/property/PropertyGalleryGrid';

const linkifyGreentripper = (text: string): ReactNode => {
  const parts = text.split(/(Greentripper)/g);
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    part === 'Greentripper' ? (
      <a key={i} href="https://greentripper.org/default.aspx?cl=nl" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors">
        Greentripper
      </a>
    ) : part
  );
};

const Differentiators = () => {
  const { t } = useTranslation('homepage');
  useSEO();

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const sections = useMemo(() => [
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
        t('differentiators.quietLuxury.feature1'),
        t('differentiators.quietLuxury.feature2'),
        t('differentiators.quietLuxury.feature3'),
        t('differentiators.quietLuxury.feature4'),
      ],
      reverse: false,
    },
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
      reverse: false,
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
        t('differentiators.utilitiesFeature5'),
      ],
      reverse: false,
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
      reverse: true,
    },
    {
      id: 'kids-welcome',
      icon: Smile,
      title: t('differentiators.kidsWelcome.title'),
      description: t('differentiators.kidsWelcome.description'),
      image: kidsGocartHero,
      imageAlt: t('differentiators.kidsWelcome.heroAlt'),
      sideImages: [
        { src: kidsFootball3Generations, alt: t('differentiators.kidsWelcome.altFootball') },
        { src: kidsHammockGarden, alt: t('differentiators.kidsWelcome.altHammock') },
        { src: kidsTrampoline, alt: t('differentiators.kidsWelcome.altTrampoline') },
        { src: kidsBambooHideSeek, alt: t('differentiators.kidsWelcome.altBamboo') },
      ],
      features: [
        t('differentiators.kidsWelcome.feature1'),
        t('differentiators.kidsWelcome.feature2'),
        t('differentiators.kidsWelcome.feature3'),
        t('differentiators.kidsWelcome.feature4'),
      ],
      reverse: false,
    },
  ], [t]);

  // Build lightbox photos from sections: main photo first, then side photos, deduplicated by reference.
  // Picture-objects are stable module references, so Set-dedup works for both Picture and string.
  const allPhotos: LightboxImage[] = useMemo(() => {
    const seen = new Set<ImageSrc>();
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

  const handleImageClick = (src: ImageSrc) => {
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
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{linkifyGreentripper(feature)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="section-padding bg-cream-dark">
        <div className="container-luxury text-center">
          <h2 className="heading-2 mb-4">{t('differentiators.cta.title')}</h2>
          <p className="body-large text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('differentiators.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/booking">
                {t('differentiators.cta.availability')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">{t('differentiators.cta.contact')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Differentiators;
