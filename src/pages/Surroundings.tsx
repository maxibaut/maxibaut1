import { useEffect, useRef, useState, useCallback } from 'react';
import { PageWrapper } from '@/components/layout';
import { useTranslation } from 'react-i18next';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Footprints,
  Bike,
  Landmark,
  UtensilsCrossed,
  Pizza,
  ShoppingBag,
  Clock,
  MapPin,
  Mountain,
  Train,
  Baby,
  TreePine,
  ChevronRight,
  Home,
  Zap,
  Star,
  MessageCircle,
  Link as LinkIcon,
} from 'lucide-react';
import { walks, cycling, active, exclusive, attractions, restaurants, shops } from '@/data/surroundings';
import { ExclusiveItem } from '@/data/surroundings/types';
import FritesCone from '@/components/icons/FritesCone';
import { useSEO } from '@/hooks/useSEO';
import { toast } from 'sonner';

const NAV_SECTIONS = [
  { id: 'wandelen-dichtbij', key: 'walksNearby', icon: Footprints },
  { id: 'wandelen-omgeving', key: 'walksArea', icon: MapPin },
  { id: 'fietsen', key: 'cycling', icon: Bike },
  { id: 'actief-avontuur', key: 'active', icon: Zap },
  { id: 'bezienswaardigheden', key: 'attractions', icon: Landmark },
  { id: 'restaurants', key: 'restaurants', icon: UtensilsCrossed },
  { id: 'winkels', key: 'shops', icon: ShoppingBag },
  { id: 'exclusief', key: 'exclusive', icon: Star },
] as const;

const SectionAnchor = ({ id, title, t }: { id: string; title: string; t: (key: string) => string }) => {
  const copyLink = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url);
    toast.success(t('linkCopied'));
  }, [id, t]);

  return (
    <div className="flex items-center gap-3">
      <h2 className="heading-1 group">
        {title}
        <button
          onClick={copyLink}
          className="inline-flex items-center ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-primary"
          aria-label="Copy link"
        >
          <LinkIcon className="h-5 w-5" />
        </button>
      </h2>
    </div>
  );
};

const Surroundings = () => {
  const { t, i18n } = useTranslation('surroundings');
  useSEO();

  const [activeSection, setActiveSection] = useState<string>('wandelen-dichtbij');
  const [isNavSticky, setIsNavSticky] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const navSentinelRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  // Sticky nav detection
  useEffect(() => {
    const sentinel = navSentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsNavSticky(!entry.isIntersecting),
      { threshold: 0, rootMargin: '-64px 0px 0px 0px' } // 64px = header height
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // Active section detection via intersection observer
  useEffect(() => {
    const sectionEls = NAV_SECTIONS.map(s => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    if (!sectionEls.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the most visible section
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { threshold: [0.1, 0.3, 0.5], rootMargin: '-80px 0px -40% 0px' }
    );

    sectionEls.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Auto-scroll active tab into view on mobile
  useEffect(() => {
    if (activeTabRef.current) {
      activeTabRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeSection]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 64 + 56; // header + nav height
      const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Add geo meta tags and JSON-LD structured data
  useEffect(() => {
    // Geo meta tags
    const geoTags = [
      { name: 'geo.region', content: 'BE-WNA' },
      { name: 'geo.placename', content: 'Malvoisin, Gedinne' },
      { name: 'geo.position', content: '49.9750;4.9380' },
      { name: 'ICBM', content: '49.9750, 4.9380' },
    ];
    
    const createdMetas: HTMLMetaElement[] = [];
    geoTags.forEach(({ name, content }) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
        createdMetas.push(meta);
      }
      meta.setAttribute('content', content);
    });

    // JSON-LD structured data for activities
    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'TouristAttraction',
          name: 'Dinant Evasion — Adventure Park',
          url: 'https://www.dinant-evasion.be/nl/adventure-park.html',
          geo: { '@type': 'GeoCoordinates', latitude: 50.2603, longitude: 4.9122 },
          address: { '@type': 'PostalAddress', addressLocality: 'Dinant', addressCountry: 'BE' },
        },
        {
          '@type': 'TouristAttraction',
          name: 'Bomenparcours — Grotten van Han',
          url: 'https://grotte-de-han.be/nl/bomenparcours',
          geo: { '@type': 'GeoCoordinates', latitude: 50.1260, longitude: 5.1870 },
          address: { '@type': 'PostalAddress', addressLocality: 'Han-sur-Lesse', addressCountry: 'BE' },
        },
        {
          '@type': 'TouristAttraction',
          name: 'Terraltitude — Fantasticable',
          url: 'https://www.terraltitude.com',
          geo: { '@type': 'GeoCoordinates', latitude: 49.9890, longitude: 4.7080 },
          address: { '@type': 'PostalAddress', addressLocality: 'Fumay', addressCountry: 'FR' },
        },
        {
          '@type': 'TouristAttraction',
          name: 'Cap Nature Bertrix',
          url: 'https://www.capnature.be',
          geo: { '@type': 'GeoCoordinates', latitude: 49.8560, longitude: 5.2530 },
          address: { '@type': 'PostalAddress', addressLocality: 'Bertrix', addressCountry: 'BE' },
        },
        {
          '@type': 'TouristAttraction',
          name: 'Récréalle',
          url: 'https://www.recrealle.com',
          geo: { '@type': 'GeoCoordinates', latitude: 49.8030, longitude: 5.0380 },
          address: { '@type': 'PostalAddress', addressLocality: 'Alle-sur-Semois', addressCountry: 'BE' },
        },
        {
          '@type': 'TouristAttraction',
          name: "Au Cœur de l'Ardoise",
          url: 'http://www.aucoeurdelardoise.be',
          geo: { '@type': 'GeoCoordinates', latitude: 49.8560, longitude: 5.2530 },
          address: { '@type': 'PostalAddress', addressLocality: 'Bertrix', addressCountry: 'BE' },
        },
        {
          '@type': 'TouristAttraction',
          name: 'De ArdenNest Dropping',
          description: 'Exclusive personalised adventure for ArdenNest guests',
          geo: { '@type': 'GeoCoordinates', latitude: 49.9750, longitude: 4.9380 },
          address: { '@type': 'PostalAddress', addressLocality: 'Gedinne', addressCountry: 'BE' },
        },
      ],
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      createdMetas.forEach(m => m.remove());
      script.remove();
    };
  }, [i18n.language]);

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

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return t('difficulty.easy');
      case 'medium':
        return t('difficulty.medium');
      case 'hard':
        return t('difficulty.hard');
      case 'rental':
        return t('cycling.rental');
      default:
        return difficulty;
    }
  };

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground section-padding">
        <div className="container-luxury text-center">
          <p className="heading-display mb-4">{t('title')}</p>
          <h1 className="font-serif text-2xl md:text-3xl text-primary-foreground/90 max-w-2xl mx-auto font-normal mb-4">{t('h1')}</h1>
          <p className="body-large text-primary-foreground/80 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding bg-background">
        <div className="container-luxury max-w-3xl text-center">
          <p className="body-large text-muted-foreground">
            {t('intro')}
          </p>
        </div>
      </section>

      {/* Nav sentinel — when this scrolls out of view, nav becomes sticky */}
      <div ref={navSentinelRef} className="h-0" />

      {/* Sticky Category Navigation */}
      <div
        ref={navRef}
        className={`${
          isNavSticky ? 'fixed top-16 left-0 right-0 z-40 shadow-md' : 'relative'
        } bg-background border-b border-border/40 transition-shadow duration-200`}
      >
        <div className="container-luxury">
          <nav
            className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-2 relative"
            aria-label="Section navigation"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0, black 16px, black calc(100% - 16px), transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0, black 16px, black calc(100% - 16px), transparent 100%)',
            }}
          >
            {NAV_SECTIONS.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                 <button
                  key={section.id}
                  ref={isActive ? activeTabRef : undefined}
                  onClick={() => scrollToSection(section.id)}
                  className={`flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 border-b-[3px] ${
                    isActive
                      ? 'text-primary border-primary'
                      : 'text-muted-foreground border-transparent hover:text-foreground hover:border-muted'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {t(`nav.${section.key}`)}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Spacer when nav is sticky */}
      {isNavSticky && <div className="h-[52px]" />}

      {/* Wandelingen vanaf ArdenNest */}
      <section id="wandelen-dichtbij" className="section-padding bg-background">
        <div className="container-luxury">
          <div className="flex items-center gap-3 pt-12 pb-6 mb-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Home className="h-6 w-6 text-primary" />
            </div>
            <SectionAnchor id="wandelen-dichtbij" title={t('walks.fromPropertyTitle')} t={t} />
          </div>
          <p className="body-large text-muted-foreground mb-8 max-w-2xl">
            {t('walks.fromPropertyDescription')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {walks.filter(w => w.startsFromProperty).map((walk) => {
              const title = t(`items.walks.${walk.slug}.title`, { defaultValue: walk.slug });
              const description = t(`items.walks.${walk.slug}.description`, { defaultValue: '' });
              const highlights = t(`items.walks.${walk.slug}.highlights`, { returnObjects: true, defaultValue: [] }) as string[];

              return (
                <Link key={walk.id} to={`/surroundings/walks/${walk.slug}`}>
                  <Card 
                    className="hover:shadow-lg transition-all hover:-translate-y-1 h-full group cursor-pointer relative overflow-hidden"
                    style={walk.images?.[0] ? {
                      backgroundImage: `url(${walk.images[0]})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    } : undefined}
                  >
                    {walk.images?.[0] && (
                      <div className="absolute inset-0 bg-background/80 z-0" />
                    )}
                    <CardHeader className="pb-2 relative z-10">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="font-serif text-lg leading-tight group-hover:text-primary transition-colors">
                          {title}
                        </CardTitle>
                        <Footprints className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 relative z-10">
                      <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="gap-1">
                          <Home className="h-3 w-3" />
                          {t('walks.atTheDoorstep')}
                        </Badge>
                        <Badge variant="secondary" className="gap-1">
                          <Clock className="h-3 w-3" />
                          {walk.duration}
                        </Badge>
                        <Badge variant="secondary" className="gap-1">
                          <MapPin className="h-3 w-3" />
                          {walk.routeDistance}
                        </Badge>
                        <Badge className={getDifficultyColor(walk.difficulty)}>
                          {getDifficultyLabel(walk.difficulty)}
                        </Badge>
                        {walk.buggyFriendly && (
                          <Badge variant="outline" className="gap-1">
                            <Baby className="h-3 w-3" />
                            {t('walks.buggyFriendly')}
                          </Badge>
                        )}
                      </div>

                      {Array.isArray(highlights) && highlights.length > 0 && (
                        <div className="pt-2 border-t">
                          <div className="flex flex-wrap gap-1">
                            {highlights.slice(0, 3).map((highlight, idx) => (
                              <span key={idx} className="text-xs bg-muted px-2 py-0.5 rounded">
                                {highlight}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-1 text-sm text-primary group-hover:gap-2 transition-all pt-2">
                        {t('moreInfo')}
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Wandelingen in de omgeving */}
      <section id="wandelen-omgeving" className="section-padding bg-cream-dark">
        <div className="container-luxury">
          <div className="flex items-center gap-3 pt-12 pb-6 mb-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Footprints className="h-6 w-6 text-primary" />
            </div>
            <SectionAnchor id="wandelen-omgeving" title={t('walks.nearbyTitle')} t={t} />
          </div>
          <p className="body-large text-muted-foreground mb-8 max-w-2xl">
            {t('walks.nearbyDescription')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {walks.filter(w => !w.startsFromProperty).map((walk) => {
              const title = t(`items.walks.${walk.slug}.title`, { defaultValue: walk.slug });
              const description = t(`items.walks.${walk.slug}.description`, { defaultValue: '' });
              const highlights = t(`items.walks.${walk.slug}.highlights`, { returnObjects: true, defaultValue: [] }) as string[];

              return (
                <Link key={walk.id} to={`/surroundings/walks/${walk.slug}`}>
                  <Card 
                    className="hover:shadow-lg transition-all hover:-translate-y-1 h-full group cursor-pointer relative overflow-hidden"
                    style={walk.images?.[0] ? {
                      backgroundImage: `url(${walk.images[0]})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    } : undefined}
                  >
                    {walk.images?.[0] && (
                      <div className="absolute inset-0 bg-background/80 z-0" />
                    )}
                    <CardHeader className="pb-2 relative z-10">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="font-serif text-lg leading-tight group-hover:text-primary transition-colors">
                          {title}
                        </CardTitle>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          {walk.trainBookingUrl && <Train className="h-5 w-5 text-muted-foreground" />}
                          <Footprints className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 relative z-10">
                      <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="gap-1">
                          <Clock className="h-3 w-3" />
                          {walk.duration}
                        </Badge>
                        <Badge variant="secondary" className="gap-1">
                          <MapPin className="h-3 w-3" />
                          {walk.routeDistance}
                        </Badge>
                        <Badge className={getDifficultyColor(walk.difficulty)}>
                          {getDifficultyLabel(walk.difficulty)}
                        </Badge>
                        {walk.buggyFriendly && (
                          <Badge variant="outline" className="gap-1">
                            <Baby className="h-3 w-3" />
                            {t('walks.buggyFriendly')}
                          </Badge>
                        )}
                      </div>

                      {Array.isArray(highlights) && highlights.length > 0 && (
                        <div className="pt-2 border-t">
                          <div className="flex flex-wrap gap-1">
                            {highlights.slice(0, 3).map((highlight, idx) => (
                              <span key={idx} className="text-xs bg-muted px-2 py-0.5 rounded">
                                {highlight}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-1 text-sm text-primary group-hover:gap-2 transition-all pt-2">
                        {t('moreInfo')}
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fietsen */}
      <section id="fietsen" className="section-padding bg-cream-dark">
        <div className="container-luxury">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Bike className="h-6 w-6 text-primary" />
            </div>
            <SectionAnchor id="fietsen" title={t('cycling.title')} t={t} />
          </div>
          <p className="body-large text-muted-foreground mb-8 max-w-2xl">
            {t('cycling.description')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cycling.map((route) => {
              const title = t(`items.cycling.${route.slug}.title`, { defaultValue: route.slug });
              const description = t(`items.cycling.${route.slug}.description`, { defaultValue: '' });

              return (
                <Link key={route.id} to={`/surroundings/cycling/${route.slug}`}>
                  <Card className="hover:shadow-lg transition-all hover:-translate-y-1 h-full group cursor-pointer">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="font-serif text-lg leading-tight group-hover:text-primary transition-colors">
                          {title}
                        </CardTitle>
                        {route.type === 'rental' ? (
                          <ShoppingBag className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                        ) : (
                          <Mountain className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {route.routeDistance && (
                          <Badge variant="secondary" className="gap-1">
                            <MapPin className="h-3 w-3" />
                            {route.routeDistance}
                          </Badge>
                        )}
                        <Badge className={getDifficultyColor(route.difficulty)}>
                          {getDifficultyLabel(route.difficulty)}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-1 text-sm text-primary group-hover:gap-2 transition-all pt-2">
                        {t('moreInfo')}
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Actief & Avontuur */}
      <section id="actief-avontuur" className="section-padding bg-background">
        <div className="container-luxury">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <SectionAnchor id="actief-avontuur" title={t('active.title')} t={t} />
          </div>
          <p className="body-large text-muted-foreground mb-8 max-w-2xl">
            {t('active.description')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {active.map((item) => {
              const title = t(`items.active.${item.slug}.title`, { defaultValue: item.slug });
              const description = t(`items.active.${item.slug}.description`, { defaultValue: '' });
              const highlights = t(`items.active.${item.slug}.highlights`, { returnObjects: true, defaultValue: [] }) as string[];

              return (
                <Link key={item.id} to={`/surroundings/active/${item.slug}`}>
                  <Card className="hover:shadow-lg transition-all hover:-translate-y-1 h-full group cursor-pointer">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="font-serif text-lg leading-tight group-hover:text-primary transition-colors">
                          {title}
                        </CardTitle>
                        <Badge variant="secondary" className="gap-1 flex-shrink-0">
                          <MapPin className="h-3 w-3" />
                          {item.distance}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
                      
                      {Array.isArray(highlights) && highlights.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {highlights.map((highlight, idx) => (
                            <Badge key={idx} variant="outline">
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-1 text-sm text-primary group-hover:gap-2 transition-all pt-2">
                        {t('moreInfo')}
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bezienswaardigheden */}
      <section id="bezienswaardigheden" className="section-padding bg-cream-dark">
        <div className="container-luxury">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Landmark className="h-6 w-6 text-primary" />
            </div>
            <SectionAnchor id="bezienswaardigheden" title={t('attractions.title')} t={t} />
          </div>
          <p className="body-large text-muted-foreground mb-8 max-w-2xl">
            {t('attractions.description')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {attractions.map((attraction) => {
              const title = t(`items.attractions.${attraction.slug}.title`, { defaultValue: attraction.slug });
              const description = t(`items.attractions.${attraction.slug}.description`, { defaultValue: '' });
              const highlights = t(`items.attractions.${attraction.slug}.highlights`, { returnObjects: true, defaultValue: [] }) as string[];

              return (
                <Link key={attraction.id} to={`/surroundings/attractions/${attraction.slug}`}>
                  <Card className="hover:shadow-lg transition-all hover:-translate-y-1 h-full group cursor-pointer">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="font-serif text-xl group-hover:text-primary transition-colors">
                          {title}
                        </CardTitle>
                        <Badge variant="secondary" className="gap-1 flex-shrink-0">
                          <MapPin className="h-3 w-3" />
                          {attraction.distance}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground line-clamp-2">{description}</p>
                      
                      {Array.isArray(highlights) && highlights.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {highlights.map((highlight, idx) => (
                            <Badge key={idx} variant="outline">
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-1 text-sm text-primary group-hover:gap-2 transition-all pt-2">
                        {t('moreInfo')}
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Restaurants */}
      <section id="restaurants" className="section-padding bg-background">
        <div className="container-luxury">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <UtensilsCrossed className="h-6 w-6 text-primary" />
            </div>
            <SectionAnchor id="restaurants" title={t('restaurants.title')} t={t} />
          </div>
          <p className="body-large text-muted-foreground mb-8 max-w-2xl">
            {t('restaurants.description')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => {
              const title = t(`items.restaurants.${restaurant.slug}.title`, { defaultValue: restaurant.slug });
              const description = t(`items.restaurants.${restaurant.slug}.description`, { defaultValue: '' });
              const cuisine = t(`items.restaurants.${restaurant.slug}.cuisine`, { defaultValue: '' });

              return (
                <Link key={restaurant.id} to={`/surroundings/restaurants/${restaurant.slug}`}>
                  <Card className="hover:shadow-lg transition-all hover:-translate-y-1 h-full group cursor-pointer">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="font-serif text-lg group-hover:text-primary transition-colors">
                          {title}
                        </CardTitle>
                        {restaurant.restaurantType === 'pizza' ? (
                          <Pizza className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                        ) : restaurant.restaurantType === 'frituur' ? (
                          <FritesCone className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                        ) : (
                          <UtensilsCrossed className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {cuisine && <Badge variant="secondary">{cuisine}</Badge>}
                        <Badge variant="outline" className="gap-1">
                          <MapPin className="h-3 w-3" />
                          {restaurant.distance}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-1 text-sm text-primary group-hover:gap-2 transition-all pt-2">
                        {t('moreInfo')}
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Winkels */}
      <section id="winkels" className="section-padding bg-cream-dark">
        <div className="container-luxury">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <ShoppingBag className="h-6 w-6 text-primary" />
            </div>
            <SectionAnchor id="winkels" title={t('shops.title')} t={t} />
          </div>
          <p className="body-large text-muted-foreground mb-8 max-w-2xl">
            {t('shops.description')}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {shops.map((shop) => {
              const title = t(`items.shops.${shop.slug}.title`, { defaultValue: shop.slug });
              const description = t(`items.shops.${shop.slug}.description`, { defaultValue: '' });
              const shopTypeLabel = t(`shops.types.${shop.shopType}`, { defaultValue: shop.shopType });

              return (
                <Link key={shop.id} to={`/surroundings/shops/${shop.slug}`}>
                  <Card className="hover:shadow-lg transition-all hover:-translate-y-1 h-full group cursor-pointer">
                    <CardContent className="pt-6">
                      <Badge className="mb-3">{shopTypeLabel}</Badge>
                      <h3 className="font-serif font-semibold mb-2 group-hover:text-primary transition-colors">{title}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {shop.distance}
                        </div>
                        <ChevronRight className="h-4 w-4 text-primary" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Exclusief voor gasten — distinct green background */}
      <section id="exclusief" className="py-16 md:py-20" style={{ backgroundColor: 'hsl(150 25% 92%)' }}>
        <div className="container-luxury">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center">
              <Star className="h-6 w-6 text-primary" />
            </div>
            <SectionAnchor id="exclusief" title={t('exclusive.title')} t={t} />
          </div>
          <div className="flex items-center gap-2 mb-8 ml-15">
            <Badge className="bg-primary/10 text-primary border-primary/20 gap-1">
              <Star className="h-3 w-3" />
              {t('exclusiveBadge')}
            </Badge>
          </div>
          <p className="body-large text-muted-foreground mb-8 max-w-2xl">
            {t('exclusive.description')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exclusive.map((item) => {
              const title = t(`items.exclusive.${item.slug}.title`, { defaultValue: item.slug });
              const description = t(`items.exclusive.${item.slug}.description`, { defaultValue: '' });
              const highlights = t(`items.exclusive.${item.slug}.highlights`, { returnObjects: true, defaultValue: [] }) as string[];
              const distanceLabel = t(`items.exclusive.${item.slug}.distance`, { defaultValue: '' });
              const isInternal = (item as ExclusiveItem).isInternal;

              return (
                <Link key={item.id} to={`/surroundings/exclusive/${item.slug}`}>
                  <Card className="hover:shadow-lg transition-all hover:-translate-y-1 h-full group cursor-pointer border-primary/20 bg-card">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="font-serif text-lg leading-tight group-hover:text-primary transition-colors">
                          {title}
                        </CardTitle>
                        {distanceLabel && (
                          <Badge variant="secondary" className="gap-1 flex-shrink-0">
                            <Home className="h-3 w-3" />
                            {distanceLabel}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
                      
                      {Array.isArray(highlights) && highlights.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {highlights.map((highlight, idx) => (
                            <Badge key={idx} variant="outline" className="border-primary/30 text-primary">
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-1 text-sm text-primary group-hover:gap-2 transition-all pt-2">
                        {isInternal ? (
                          <>
                            <MessageCircle className="h-4 w-4" />
                            {t('askUs')}
                          </>
                        ) : (
                          <>
                            {t('moreInfo')}
                            <ChevronRight className="h-4 w-4" />
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Note */}
      <section className="section-padding bg-primary/5">
        <div className="container-luxury max-w-2xl text-center">
          <TreePine className="h-8 w-8 text-primary mx-auto mb-4" />
          <p className="text-muted-foreground italic">
            {t('note')}
          </p>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Surroundings;
