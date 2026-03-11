import { useEffect } from 'react';
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
} from 'lucide-react';
import { walks, cycling, active, exclusive, attractions, restaurants, shops } from '@/data/surroundings';
import { ExclusiveItem } from '@/data/surroundings/types';
import FritesCone from '@/components/icons/FritesCone';
import { useSEO } from '@/hooks/useSEO';

const Surroundings = () => {
  const { t } = useTranslation('surroundings');
  useSEO();

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

      {/* Wandelingen vanaf ArdenNest */}
      <section id="wandelingen" className="section-padding bg-cream-dark">
        <div className="container-luxury">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Home className="h-6 w-6 text-primary" />
            </div>
            <h2 className="heading-2">{t('walks.fromPropertyTitle')}</h2>
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
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Footprints className="h-6 w-6 text-primary" />
            </div>
            <h2 className="heading-2">{t('walks.nearbyTitle')}</h2>
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
            <h2 className="heading-2">{t('cycling.title')}</h2>
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
      <section id="actief" className="section-padding bg-background">
        <div className="container-luxury">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h2 className="heading-2">{t('active.title')}</h2>
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

      {/* Exclusief voor gasten */}
      <section id="exclusief" className="section-padding bg-cream-dark">
        <div className="container-luxury">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Star className="h-6 w-6 text-primary" />
            </div>
            <h2 className="heading-2">{t('exclusive.title')}</h2>
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
                  <Card className="hover:shadow-lg transition-all hover:-translate-y-1 h-full group cursor-pointer border-primary/20">
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

      {/* Bezienswaardigheden */}
      <section id="bezienswaardigheden" className="section-padding bg-background">
        <div className="container-luxury">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Landmark className="h-6 w-6 text-primary" />
            </div>
            <h2 className="heading-2">{t('attractions.title')}</h2>
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
      <section id="restaurants" className="section-padding bg-cream-dark">
        <div className="container-luxury">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <UtensilsCrossed className="h-6 w-6 text-primary" />
            </div>
            <h2 className="heading-2">{t('restaurants.title')}</h2>
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
      <section id="winkels" className="section-padding bg-background">
        <div className="container-luxury">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <ShoppingBag className="h-6 w-6 text-primary" />
            </div>
            <h2 className="heading-2">{t('shops.title')}</h2>
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
