import { PageWrapper } from '@/components/layout';
import { useTranslation } from 'react-i18next';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import DOMPurify from 'dompurify';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import {
  ArrowLeft,
  Clock,
  MapPin,
  ExternalLink,
  Baby,
  Map,
  Footprints,
  Bike,
  Landmark,
  UtensilsCrossed,
  ShoppingBag,
  Train,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  getItemBySlug,
  SurroundingsCategory,
  WalkItem,
  CyclingItem,
  RestaurantItem,
  ShopItem,
} from '@/data/surroundings';

const SurroundingsDetail = () => {
  const { t } = useTranslation('surroundings');
  const { category, slug } = useParams<{ category: SurroundingsCategory; slug: string }>();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Validate category
  const validCategories: SurroundingsCategory[] = ['walks', 'cycling', 'attractions', 'restaurants', 'shops'];
  if (!category || !validCategories.includes(category as SurroundingsCategory)) {
    return <Navigate to="/surroundings" replace />;
  }

  // Get item data
  const item = getItemBySlug(category as SurroundingsCategory, slug || '');
  if (!item) {
    return <Navigate to="/surroundings" replace />;
  }

  // Get translated content
  const title = t(`items.${category}.${slug}.title`, { defaultValue: slug });
  const description = t(`items.${category}.${slug}.description`, { defaultValue: '' });
  const fullDescription = t(`items.${category}.${slug}.fullDescription`, { defaultValue: description });
  const highlights = t(`items.${category}.${slug}.highlights`, { returnObjects: true, defaultValue: [] }) as string[];
  const buggyNote = t(`items.${category}.${slug}.buggyNote`, { defaultValue: '' });
  const tip = t(`items.${category}.${slug}.tip`, { defaultValue: '' });
  const routeSteps = t(`items.${category}.${slug}.routeSteps`, { returnObjects: true, defaultValue: [] }) as string[];
  const trainBookingButton = t(`items.${category}.${slug}.trainBookingButton`, { defaultValue: '' });

  // Open lightbox
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Category icon
  const getCategoryIcon = () => {
    switch (category) {
      case 'walks':
        return <Footprints className="h-6 w-6" />;
      case 'cycling':
        return <Bike className="h-6 w-6" />;
      case 'attractions':
        return <Landmark className="h-6 w-6" />;
      case 'restaurants':
        return <UtensilsCrossed className="h-6 w-6" />;
      case 'shops':
        return <ShoppingBag className="h-6 w-6" />;
      default:
        return <MapPin className="h-6 w-6" />;
    }
  };

  // Difficulty badge
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-emerald-100 text-emerald-800';
      case 'medium':
        return 'bg-amber-100 text-amber-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  // Type-specific data
  const walkData = item.category === 'walks' ? (item as WalkItem) : null;
  const cyclingData = item.category === 'cycling' ? (item as CyclingItem) : null;
  const restaurantData = item.category === 'restaurants' ? (item as RestaurantItem) : null;
  const shopData = item.category === 'shops' ? (item as ShopItem) : null;

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section 
        className="bg-primary text-primary-foreground section-padding relative overflow-hidden"
        style={item.images?.[0] ? {
          backgroundImage: `url(${item.images[0]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        } : undefined}
      >
        {/* Donkere overlay voor leesbaarheid */}
        <div className="absolute inset-0 bg-black/60 z-0" />
        
        <div className="container-luxury relative z-10">
          <Link
            to="/surroundings"
            className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('backToOverview')}
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center">
              {getCategoryIcon()}
            </div>
            <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
              {t(`${category}.title`)}
            </Badge>
          </div>

          <h1 className="heading-display mb-4">{title}</h1>
          <p className="body-large text-primary-foreground/80 max-w-2xl">
            {description}
          </p>

          {/* Quick info badges */}
          <div className="flex flex-wrap gap-3 mt-6">
            {item.distance && (
              <Badge variant="secondary" className="gap-1 bg-primary-foreground/20 text-primary-foreground">
                <MapPin className="h-3 w-3" />
                {item.distance} {t('fromProperty')}
              </Badge>
            )}
            {walkData && (
              <>
                <Badge variant="secondary" className="gap-1 bg-primary-foreground/20 text-primary-foreground">
                  <Clock className="h-3 w-3" />
                  {walkData.duration}
                </Badge>
                <Badge className={getDifficultyColor(walkData.difficulty)}>
                  {t(`difficulty.${walkData.difficulty}`)}
                </Badge>
                {walkData.buggyFriendly && (
                  <Badge variant="outline" className="gap-1 border-primary-foreground/30 text-primary-foreground">
                    <Baby className="h-3 w-3" />
                    {t('walks.buggyFriendly')}
                  </Badge>
                )}
              </>
            )}
            {cyclingData && (
              <>
                <Badge variant="secondary" className="gap-1 bg-primary-foreground/20 text-primary-foreground">
                  <MapPin className="h-3 w-3" />
                  {cyclingData.routeDistance}
                </Badge>
                <Badge className={getDifficultyColor(cyclingData.difficulty)}>
                  {cyclingData.difficulty === 'rental' 
                    ? t('cycling.rental') 
                    : t(`difficulty.${cyclingData.difficulty}`)}
                </Badge>
              </>
            )}
            {restaurantData && (
              <Badge variant="secondary" className="gap-1 bg-primary-foreground/20 text-primary-foreground">
                {restaurantData.priceRange}
              </Badge>
            )}
            {shopData && (
              <Badge variant="secondary" className="gap-1 bg-primary-foreground/20 text-primary-foreground">
                {t(`shops.types.${shopData.shopType}`, { defaultValue: shopData.shopType })}
              </Badge>
            )}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      {item.images && item.images.length > 0 && (
        <section className="section-padding bg-muted/30">
          <div className="container-luxury">
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {item.images.map((image, idx) => (
                  <CarouselItem key={idx} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                    <div 
                      className="aspect-[4/3] overflow-hidden rounded-lg cursor-pointer group"
                      onClick={() => openLightbox(idx)}
                    >
                      <img
                        src={image}
                        alt={`${title} - ${t('photoNumber', { number: idx + 1, defaultValue: `afbeelding ${idx + 1}` })}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-4" />
              <CarouselNext className="hidden md:flex -right-4" />
            </Carousel>
          </div>
        </section>
      )}

      {/* Lightbox */}
      {lightboxOpen && item.images && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close button */}
          <button 
            className="absolute top-4 right-4 text-white hover:text-white/80 transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxOpen(false);
            }}
          >
            <X className="h-8 w-8" />
          </button>

          {/* Previous button */}
          {item.images.length > 1 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev === 0 ? item.images!.length - 1 : prev - 1));
              }}
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
          )}

          {/* Image */}
          <img
            src={item.images[lightboxIndex]}
            alt={`${title} - ${t('photoNumber', { number: lightboxIndex + 1, defaultValue: `afbeelding ${lightboxIndex + 1}` })}`}
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next button */}
          {item.images.length > 1 && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev === item.images!.length - 1 ? 0 : prev + 1));
              }}
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          )}

          {/* Dots indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {item.images.map((_, idx) => (
              <button
                key={idx}
                className={`w-2 h-2 rounded-full transition-colors ${idx === lightboxIndex ? 'bg-white' : 'bg-white/40'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(idx);
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Content Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Full Description */}
              <div className="prose prose-lg max-w-none">
                {fullDescription.split('\n\n').map((paragraph, idx) => {
                  // Handle markdown-style headers
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={idx} className="heading-3 mt-8 mb-4">
                        {paragraph.replace('## ', '')}
                      </h2>
                    );
                  }
                  // Handle lists
                  if (paragraph.startsWith('- ')) {
                    const items = paragraph.split('\n');
                    return (
                      <ul key={idx} className="space-y-2 my-4">
                        {items.map((listItem, itemIdx) => {
                          // Convert **text** to <strong>text</strong> and sanitize
                          const formattedText = listItem
                            .replace('- ', '')
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                          const sanitizedText = DOMPurify.sanitize(formattedText, {
                            ALLOWED_TAGS: ['strong', 'em', 'b', 'i'],
                          });
                          return (
                            <li 
                              key={itemIdx} 
                              className="text-muted-foreground"
                              dangerouslySetInnerHTML={{ __html: sanitizedText }}
                            />
                          );
                        })}
                      </ul>
                    );
                  }
                  // Handle regular paragraphs with potential bold text
                  const formattedParagraph = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                  const sanitizedParagraph = DOMPurify.sanitize(formattedParagraph, {
                    ALLOWED_TAGS: ['strong', 'em', 'b', 'i'],
                  });
                  return (
                    <p 
                      key={idx} 
                      className="text-muted-foreground leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: sanitizedParagraph }}
                    />
                  );
                })}
              </div>

              {/* Route Steps */}
              {Array.isArray(routeSteps) && routeSteps.length > 0 && (
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="heading-4 mb-4 flex items-center gap-2">
                      <Map className="h-5 w-5 text-primary" />
                      Route
                    </h3>
                    <ol className="space-y-3">
                      {routeSteps.map((step, idx) => (
                        <li key={idx} className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span className="text-muted-foreground">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              )}

              {/* Tip */}
              {tip && (
                <div className="bg-primary/5 border border-primary/10 rounded-lg p-4">
                  <p className="text-primary/90 flex items-start gap-2">
                    <span className="text-lg">💡</span>
                    <span>{tip}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Practical Info Card */}
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <h3 className="heading-4">{t('practicalInfo')}</h3>

                  {item.distance && (
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">{t('fromProperty')}</p>
                        <p className="font-medium">{item.distance}</p>
                      </div>
                    </div>
                  )}

                  {walkData && (
                    <>
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">{t('walks.duration')}</p>
                          <p className="font-medium">{walkData.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Footprints className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">{t('walks.distance')}</p>
                          <p className="font-medium">{walkData.routeDistance}</p>
                        </div>
                      </div>
                      {buggyNote && (
                        <div className="flex items-center gap-3">
                          <Baby className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">{t('walks.buggyFriendly')}</p>
                            <p className="font-medium text-sm">{buggyNote}</p>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* Action buttons */}
                  <div className="pt-4 space-y-2">
                    {walkData?.trainBookingUrl && (
                      <Button asChild className="w-full">
                        <a
                          href={walkData.trainBookingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Train className="h-4 w-4 mr-2" />
                          {trainBookingButton || 'Trein Reserveren'}
                        </a>
                      </Button>
                    )}
                    {item.coordinates && (
                      <Button asChild variant={walkData?.trainBookingUrl ? 'outline' : 'default'} className="w-full">
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${item.coordinates.lat},${item.coordinates.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Map className="h-4 w-4 mr-2" />
                          {t('openInMaps')}
                        </a>
                      </Button>
                    )}
                    {item.externalUrl && (
                      <Button asChild variant="outline" className="w-full">
                        <a href={item.externalUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          {t('visitWebsite')}
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Highlights */}
              {Array.isArray(highlights) && highlights.length > 0 && (
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="heading-4 mb-4">{t('walks.highlights')}</h3>
                    <div className="flex flex-wrap gap-2">
                      {highlights.map((highlight, idx) => (
                        <Badge key={idx} variant="secondary">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Back Link */}
      <section className="section-padding bg-cream-dark">
        <div className="container-luxury text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/surroundings">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('backToOverview')}
            </Link>
          </Button>
        </div>
      </section>
    </PageWrapper>
  );
};

export default SurroundingsDetail;
