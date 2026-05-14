import { PageWrapper } from '@/components/layout';
import DiscoverNearby from '@/components/surroundings/DiscoverNearby';
import { useTranslation } from 'react-i18next';
import { useParams, Navigate } from 'react-router-dom';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { useLanguagePrefix } from '@/hooks/useLanguagePrefix';
import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { useSEO } from '@/hooks/useSEO';
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
  Phone,
  Home,
} from 'lucide-react';
import {
  getItemBySlug,
  SurroundingsCategory,
  WalkItem,
  CyclingItem,
  ActiveItem,
  RestaurantItem,
  ShopItem,
  ExclusiveItem,
} from '@/data/surroundings';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';

const SurroundingsDetail = () => {
  const { t, i18n } = useTranslation('surroundings');
  const { category, slug } = useParams<{ category: SurroundingsCategory; slug: string }>();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const { localizedPath } = useLanguagePrefix();

  // Validate category
  const validCategories: SurroundingsCategory[] = ['walks', 'cycling', 'active', 'exclusive', 'attractions', 'restaurants', 'shops'];
  const isValidCategory = category && validCategories.includes(category as SurroundingsCategory);
  const item = isValidCategory ? getItemBySlug(category as SurroundingsCategory, slug || '') : undefined;

  // Get translated content (safe to call even when item doesn't exist — t() returns defaults)
  const title = t(`items.${category}.${slug}.title`, { defaultValue: slug || '' });
  const description = t(`items.${category}.${slug}.description`, { defaultValue: '' });
  const fullDescription = t(`items.${category}.${slug}.fullDescription`, { defaultValue: description });
  const highlights = t(`items.${category}.${slug}.highlights`, { returnObjects: true, defaultValue: [] }) as string[];
  const buggyNote = t(`items.${category}.${slug}.buggyNote`, { defaultValue: '' });
  const tip = t(`items.${category}.${slug}.tip`, { defaultValue: '' });
  const routeSteps = t(`items.${category}.${slug}.routeSteps`, { returnObjects: true, defaultValue: [] }) as string[];
  const trainBookingButton = t(`items.${category}.${slug}.trainBookingButton`, { defaultValue: '' });
  const openingHours = t(`items.${category}.${slug}.openingHours`, { defaultValue: '' });
  const askUponArrival = t(`items.${category}.${slug}.askUponArrival`, { defaultValue: t('askUs') });

  // --- Dynamic SEO title: "{Name} — {category} {preposition} {village}" ---
  const village = item?.village || '';
  const preposition = t('preposition', { defaultValue: 'in' });
  const translatedCategory = t(`categories.${category}`, { defaultValue: category || '' });

  // Per-item SEO descriptor (e.g. "frituur op een hoeve" instead of generic "restaurant").
  // Falls back to the translated category label when no descriptor is defined.
  const lang = i18n.language as 'nl' | 'fr' | 'en' | 'de';
  const descriptor = item?.seoDescriptor?.[lang] || translatedCategory;

  // Strip village from title if it already contains the village name.
  // Also strip surrounding parentheses/brackets so "Cap Nature (Bertrix)" → "Cap Nature"
  // (instead of "Cap Nature ()") and any leftover empty () groups elsewhere.
  const cleanName = (village
    ? title
        // Remove "(Village)" / "[Village]" with their brackets
        .replace(new RegExp(`\\s*[\\(\\[]\\s*${village}\\s*[\\)\\]]`, 'i'), '')
        // Remove bare village mention
        .replace(new RegExp(`\\s*${village}\\s*`, 'i'), ' ')
    : title)
    // Clean any empty () or [] left behind
    .replace(/\s*[\(\[]\s*[\)\]]/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();

  // EN-only a/an helper for grammatical correctness ("a activity" → "an activity")
  const aOrAn = (word: string) => (/^[aeiou]/i.test(word) ? 'an' : 'a');

  // Build unique SEO title: "Terracines — winkel in Vencimont"
  const seoSuffix = village
    ? ` — ${descriptor} ${preposition} ${village}`
    : ` — ${descriptor}`;
  const maxNameLen = 60 - seoSuffix.length;
  const truncatedTitle = cleanName.length > maxNameLen 
    ? cleanName.slice(0, maxNameLen - 1).trimEnd() + '…' 
    : cleanName;
  const seoTitleStr = `${truncatedTitle}${seoSuffix}`;
  
  // Build unique meta description using template (uses same descriptor for consistency)
  const seoDescStr = village
    ? t('seoDescriptionTemplate', { 
        name: cleanName, 
        category: descriptor, 
        article: i18n.language === 'en' ? aOrAn(descriptor) : '',
        village,
        defaultValue: `${cleanName} — ${descriptor} ${preposition} ${village}.`
      })
    : (description
        ? (description.length > 155 ? description.slice(0, 152).trimEnd() + '…' : description)
        : `${cleanName} — ${descriptor}.`);

  // Per-item SEO overrides (preferred over auto-generated title/description)
  const seoTitleOverride = t(`items.${category}.${slug}.seoTitle`, { defaultValue: '' });
  const seoDescOverride = t(`items.${category}.${slug}.seoDescription`, { defaultValue: '' });
  const finalSeoTitle = seoTitleOverride || seoTitleStr;
  const finalSeoDesc = seoDescOverride || seoDescStr;

  // Use useSEO with direct title/description override via useEffect
  useSEO({ noIndex: false });
  
  useEffect(() => {
    document.title = finalSeoTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', finalSeoDesc);
    // Update OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', finalSeoTitle);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', finalSeoDesc);
    const ogType = document.querySelector('meta[property="og:type"]');
    if (ogType) ogType.setAttribute('content', 'article');
    const heroImg = item?.heroImage || item?.images?.[0];
    if (heroImg) {
      const absImg = heroImg.startsWith('http') ? heroImg : `https://ardennest.be${heroImg}`;
      const ogImg = document.querySelector('meta[property="og:image"]');
      if (ogImg) ogImg.setAttribute('content', absImg);
      const twImg = document.querySelector('meta[name="twitter:image"]');
      if (twImg) twImg.setAttribute('content', absImg);
    }
    const twTitle = document.querySelector('meta[property="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', finalSeoTitle);
    const twDesc = document.querySelector('meta[property="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', finalSeoDesc);
  }, [finalSeoTitle, finalSeoDesc, item]);

  // JSON-LD structured data for active/exclusive items
  useEffect(() => {
    if ((category === 'active' || category === 'exclusive') && item?.coordinates) {
      const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'TouristAttraction',
        name: title,
        description: description,
        ...(item.address && { address: { '@type': 'PostalAddress', streetAddress: item.address } }),
        geo: {
          '@type': 'GeoCoordinates',
          latitude: item.coordinates.lat,
          longitude: item.coordinates.lng,
        },
        ...(item.externalUrl && { url: item.externalUrl }),
        ...(item.images?.[0] && { image: item.images[0] }),
        ...(openingHours && { openingHours }),
      };
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = `jsonld-${slug}`;
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
      return () => { document.getElementById(`jsonld-${slug}`)?.remove(); };
    }
  }, [category, slug, title, description, item, openingHours]);

  // Redirect if invalid
  if (!isValidCategory || !item) {
    return <Navigate to={localizedPath('/surroundings')} replace />;
  }

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
      case 'active':
        return <Landmark className="h-6 w-6" />;
      case 'exclusive':
        return <MapPin className="h-6 w-6" />;
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
  const exclusiveData = item.category === 'exclusive' ? (item as ExclusiveItem) : null;
  const restaurantData = item.category === 'restaurants' ? (item as RestaurantItem) : null;
  const shopData = item.category === 'shops' ? (item as ShopItem) : null;

  // Translated distance for exclusive items
  const exclusiveDistance = exclusiveData ? t(`items.exclusive.${slug}.distance`, { defaultValue: '' }) : '';

  // Track which heading was last seen to inject inline images after it
  let bikeSectionPassed = false;

  // Per-image alt texts from translations (falls back to generic title + number)
  const imageAlts: string[] = t(`items.${category}.${slug}.imageAlts`, { returnObjects: true, defaultValue: [] }) as string[] || [];
  const getImageAlt = (idx: number) => imageAlts[idx] || `${title} - ${t('photoNumber', { number: idx + 1, defaultValue: `afbeelding ${idx + 1}` })}`;

  // Combine gallery images + route map + bike image for lightbox
  const allImages = [
    ...(item.images || []),
    ...(walkData?.routeMapImage ? [walkData.routeMapImage] : []),
    ...(cyclingData?.bikeImage ? [cyclingData.bikeImage] : []),
  ];

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section 
        className="bg-primary text-primary-foreground section-padding relative overflow-hidden"
        style={(item.heroImage || item.images?.[0]) ? {
          backgroundImage: `url(${item.heroImage || item.images![0]})`,
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

          <h1 className="heading-display mb-2">{title}</h1>
          {village && (
            <p className="body-large text-primary-foreground/60 mb-4 capitalize">
              {translatedCategory} {preposition} {village}
            </p>
          )}
          <p className="body-large text-primary-foreground/80 max-w-2xl">
            {description}
          </p>

          {/* Quick info badges */}
          <div className="flex flex-wrap gap-3 mt-6">
            {exclusiveDistance ? (
              <Badge variant="secondary" className="gap-1 bg-primary-foreground/20 text-primary-foreground">
                <Home className="h-3 w-3" />
                {exclusiveDistance}
              </Badge>
            ) : item.distance ? (
              <Badge variant="secondary" className="gap-1 bg-primary-foreground/20 text-primary-foreground">
                <MapPin className="h-3 w-3" />
                {item.distance} {t('fromProperty')}
              </Badge>
            ) : null}
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
                        alt={getImageAlt(idx)}
                        width={600}
                        height={450}
                        loading="lazy"
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
      {lightboxOpen && allImages.length > 0 && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-white/80 transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); setLightboxOpen(false); }}
          >
            <X className="h-8 w-8" />
          </button>

          {allImages.length > 1 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1)); }}
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
          )}

          <img
            src={allImages[lightboxIndex]}
            alt={getImageAlt(lightboxIndex)}
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {allImages.length > 1 && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1)); }}
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          )}

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {allImages.map((_, idx) => (
              <button
                key={idx}
                className={`w-2 h-2 rounded-full transition-colors ${idx === lightboxIndex ? 'bg-white' : 'bg-white/40'}`}
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(idx); }}
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
                    const headingText = paragraph.replace('## ', '');
                    const isBikeSection = headingText.toLowerCase().includes('fietsen') ||
                      headingText.toLowerCase().includes('vélos') ||
                      headingText.toLowerCase().includes('bikes') ||
                      headingText.toLowerCase().includes('fahrräder');
                    if (isBikeSection) bikeSectionPassed = true;
                    return (
                      <h2 key={idx} className="heading-3 mt-8 mb-4">
                        {headingText}
                      </h2>
                    );
                  }
                  // Handle lists
                  if (paragraph.startsWith('- ')) {
                    const listItems = paragraph.split('\n');
                    return (
                      <ul key={idx} className="space-y-2 my-4">
                        {listItems.map((listItem, itemIdx) => {
                          const formattedText = listItem
                            .replace('- ', '')
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary underline hover:text-primary/80">$1</a>');
                          const sanitizedText = DOMPurify.sanitize(formattedText, {
                            ALLOWED_TAGS: ['strong', 'em', 'b', 'i', 'a'],
                            ALLOWED_ATTR: ['href', 'class'],
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
                  // Handle regular paragraphs with bold text and markdown links
                  let formattedParagraph = paragraph
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary underline hover:text-primary/80">$1</a>');
                  const sanitizedParagraph = DOMPurify.sanitize(formattedParagraph, {
                    ALLOWED_TAGS: ['strong', 'em', 'b', 'i', 'a'],
                    ALLOWED_ATTR: ['href', 'class'],
                  });
                  // After the first paragraph following the bike section heading, inject the bike image
                  const showBikeImage = cyclingData?.bikeImage && bikeSectionPassed;
                  if (showBikeImage) bikeSectionPassed = false; // reset so we only show once
                  return (
                    <div key={idx}>
                      <p 
                        className="text-muted-foreground leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: sanitizedParagraph }}
                      />
                      {showBikeImage && (
                        <div className="flex justify-center my-6">
                          <img
                            src={cyclingData!.bikeImage}
                            alt="BH Atom elektrische fiets"
                            width={400}
                            height={300}
                            loading="lazy"
                            className="max-w-sm w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => {
                              const bikeIdx = (item.images?.length ?? 0) + (walkData?.routeMapImage ? 1 : 0);
                              openLightbox(bikeIdx);
                            }}
                          />
                        </div>
                      )}
                    </div>
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

              {/* Route Map Image */}
              {walkData?.routeMapImage && (
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="heading-4 mb-4 flex items-center gap-2">
                      <Map className="h-5 w-5 text-primary" />
                      {t('walks.routeMap', { defaultValue: 'Routekaart' })}
                    </h3>
                    <img
                      src={walkData.routeMapImage}
                      alt={`${title} - ${t('routeMap', { defaultValue: 'routekaart' })}`}
                      width={800}
                      height={600}
                      loading="lazy"
                      className="w-full rounded-lg cursor-pointer"
                      onClick={() => {
                        // Add map as last image in lightbox
                        if (item.images) {
                          setLightboxIndex(item.images.length);
                          setLightboxOpen(true);
                        }
                      }}
                    />
                    <p className="text-sm text-muted-foreground mt-3 flex items-start gap-2">
                      <span>🗺️</span>
                      <span>{t('walks.walkingMapsNote')}</span>
                    </p>
                  </CardContent>
                </Card>
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

                  {/* Contact details for shops, restaurants, attractions */}
                  {item.address && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">{t('contactInfo.address')}</p>
                        <p className="font-medium text-sm">{item.address}</p>
                      </div>
                    </div>
                  )}

                  {item.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">{t('contactInfo.phone')}</p>
                        <a href={`tel:${item.phone.replace(/\s/g, '')}`} className="font-medium text-sm text-primary hover:underline">
                          {item.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {openingHours && (
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">{t('contactInfo.openingHours')}</p>
                        <p className="font-medium text-sm">{openingHours}</p>
                      </div>
                    </div>
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
                    {(item.mapQuery || item.coordinates) && !exclusiveData?.isInternal && (
                      <Button asChild variant={walkData?.trainBookingUrl ? 'outline' : 'default'} className="w-full">
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent('ArdenNest, Gedinne, Belgium')}&destination=${item.mapQuery ? encodeURIComponent(item.mapQuery) : `${item.coordinates!.lat},${item.coordinates!.lng}`}`}
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
                    {exclusiveData?.isInternal && (
                      <Button asChild variant="default" className="w-full">
                        <a href="mailto:christophe@ardennest.be">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          {askUponArrival}
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Pricing Card — cycling only */}
              {cyclingData?.pricing && (
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="pt-6 space-y-4">
                    <h3 className="heading-4 flex items-center justify-between">
                      {t('pricing.title')} {cyclingData.pricing.year}
                    </h3>

                    {/* Short rental */}
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-2">{t('pricing.shortRental')}</p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{t('pricing.fullDay')}</span>
                          <span className="font-semibold">{cyclingData.pricing.shortRental.fullDay} <span className="font-normal text-muted-foreground text-xs">{t('pricing.perBike')}</span></span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{t('pricing.halfDay')}</span>
                          <span className="font-semibold">{cyclingData.pricing.shortRental.halfDay} <span className="font-normal text-muted-foreground text-xs">{t('pricing.perBike')}</span></span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{t(`items.${category}.${slug}.pricingShortNote`, { defaultValue: cyclingData.pricing.shortRental.note })}</p>
                      </div>
                    </div>

                    <div className="border-t border-border/50" />

                    {/* Long rental */}
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-2">{t('pricing.longRental')}</p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{t('pricing.weekend')}</span>
                          <span className="font-semibold">{cyclingData.pricing.longRental.weekend} <span className="font-normal text-muted-foreground text-xs">{t('pricing.perBike')}</span></span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{t('pricing.extraDay')}</span>
                          <span className="font-semibold">{cyclingData.pricing.longRental.extraDay} <span className="font-normal text-muted-foreground text-xs">{t('pricing.perBike')}</span></span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{t(`items.${category}.${slug}.pricingLongNote`, { defaultValue: cyclingData.pricing.longRental.note })}</p>
                      </div>
                    </div>

                    <div className="border-t border-border/50" />

                    {/* Included */}
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">{t('pricing.included')}</p>
                      <p className="text-sm text-muted-foreground">{t(`items.${category}.${slug}.pricingIncluded`, { defaultValue: cyclingData.pricing.included })}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

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

      {/* Discover Nearby */}
      <DiscoverNearby currentCategory={category as SurroundingsCategory} currentSlug={slug || ''} />

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
