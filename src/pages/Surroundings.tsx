import { PageWrapper } from '@/components/layout';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Footprints,
  Bike,
  Landmark,
  UtensilsCrossed,
  ShoppingBag,
  Clock,
  MapPin,
  Mountain,
  Train,
  Baby,
  TreePine,
  ChevronRight,
} from 'lucide-react';
import { walks, cycling, attractions, restaurants, shops } from '@/data/surroundings';

const Surroundings = () => {
  const { t } = useTranslation('surroundings');

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
          <h1 className="heading-display mb-4">{t('title')}</h1>
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

      {/* Wandelingen */}
      <section id="wandelingen" className="section-padding bg-cream-dark">
        <div className="container-luxury">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Footprints className="h-6 w-6 text-primary" />
            </div>
            <h2 className="heading-2">{t('walks.title')}</h2>
          </div>
          <p className="body-large text-muted-foreground mb-8 max-w-2xl">
            {t('walks.description')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {walks.map((walk) => {
              const title = t(`items.walks.${walk.slug}.title`, { defaultValue: walk.slug });
              const description = t(`items.walks.${walk.slug}.description`, { defaultValue: '' });
              const highlights = t(`items.walks.${walk.slug}.highlights`, { returnObjects: true, defaultValue: [] }) as string[];

              return (
                <Link key={walk.id} to={`/surroundings/walks/${walk.slug}`}>
                  <Card className="hover:shadow-lg transition-all hover:-translate-y-1 h-full group cursor-pointer">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="font-serif text-lg leading-tight group-hover:text-primary transition-colors">
                          {title}
                        </CardTitle>
                        <Train className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
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
                              <span
                                key={idx}
                                className="text-xs bg-muted px-2 py-0.5 rounded"
                              >
                                {highlight}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-1 text-sm text-primary group-hover:gap-2 transition-all pt-2">
                        Meer info
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
      <section id="fietsen" className="section-padding bg-background">
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
                        Meer info
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
                        Meer info
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
                        <span className="text-lg font-medium text-muted-foreground">
                          {restaurant.priceRange}
                        </span>
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
                        Meer info
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
