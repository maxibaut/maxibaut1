import { PageWrapper } from '@/components/layout';
import { useTranslation } from 'react-i18next';
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
  ExternalLink,
  Mountain,
  Train,
  Baby,
  TreePine,
} from 'lucide-react';

const Surroundings = () => {
  const { t } = useTranslation('surroundings');

  // Placeholder data - will be replaced with real content
  const walks = [
    {
      id: 1,
      title: 'Treinwandeling Anseremme - Gendron',
      description: 'De perfecte uitstap vanaf Dinant. Neem de trein en wandel langs de Lesse.',
      duration: '3 uur',
      distance: '8 km',
      difficulty: 'easy',
      buggyFriendly: true,
      highlights: ['Spoorwegbrug', 'Strand van Walzin', 'Uitzicht Maas'],
    },
    {
      id: 2,
      title: 'Treinwandeling Houyet - Gendron',
      description: 'Avontuurlijke wandeling met klimmen en klauteren door het bos.',
      duration: '4 uur',
      distance: '10 km',
      difficulty: 'medium',
      buggyFriendly: false,
      highlights: ['Rotsformaties', 'Bospad', 'Rivier de Lesse'],
    },
    {
      id: 3,
      title: 'Wandeling rond Malvoisin',
      description: 'Rustige dorpswandeling met prachtige vergezichten.',
      duration: '1.5 uur',
      distance: '5 km',
      difficulty: 'easy',
      buggyFriendly: true,
      highlights: ['Dorpskerk', 'Weilanden', 'Panorama'],
    },
  ];

  const cycling = [
    {
      id: 1,
      title: 'RAVeL fietspad Dinant - Givet',
      description: 'Vlak fietspad langs de Maas, perfect voor families.',
      distance: '20 km (heen)',
      difficulty: 'easy',
      type: 'route',
    },
    {
      id: 2,
      title: 'Mountainbike parcours Beauraing',
      description: 'Uitdagende routes door de bossen van de Ardennen.',
      distance: 'Diverse routes',
      difficulty: 'hard',
      type: 'route',
    },
    {
      id: 3,
      title: 'Fietsverhuur Dinant',
      description: 'Elektrische fietsen en mountainbikes te huur.',
      distance: '15 min rijden',
      difficulty: 'rental',
      type: 'rental',
    },
  ];

  const attractions = [
    {
      id: 1,
      name: 'Dinant',
      description: 'Pittoresk stadje aan de Maas met citadel en collegiale kerk.',
      distance: '15 min',
      highlights: ['Citadel', 'Kabelbaan', 'Adolphe Sax'],
    },
    {
      id: 2,
      name: 'Grotten van Han',
      description: 'Spectaculaire grotten en dierenpark.',
      distance: '25 min',
      highlights: ['Grottenbezoek', 'Safari', 'Speeltuin'],
    },
    {
      id: 3,
      name: 'Kasteel van Bouillon',
      description: 'Middeleeuws kasteel met roofvogelshow.',
      distance: '40 min',
      highlights: ['Roofvogels', 'Middeleeuwse sfeer', 'Semois vallei'],
    },
    {
      id: 4,
      name: 'Abbaye de Maredsous',
      description: 'Benedictijner abdij met beroemde kaas en bieren.',
      distance: '20 min',
      highlights: ['Abdijkaas', 'Trappistenbier', 'Boekhandel'],
    },
  ];

  const restaurants = [
    {
      id: 1,
      name: 'Restaurant Placeholder 1',
      cuisine: 'Belgische keuken',
      distance: '10 min',
      priceRange: '€€',
      description: 'Gezellig restaurant met lokale specialiteiten.',
    },
    {
      id: 2,
      name: 'Restaurant Placeholder 2',
      cuisine: 'Frans',
      distance: '15 min',
      priceRange: '€€€',
      description: 'Gastronomisch restaurant met terras.',
    },
    {
      id: 3,
      name: 'Brasserie Placeholder',
      cuisine: 'Brasserie',
      distance: '12 min',
      priceRange: '€',
      description: 'Casual eten met kindermenus.',
    },
  ];

  const shops = [
    {
      id: 1,
      name: 'Bakkerij Placeholder',
      type: 'Bakkerij',
      distance: '5 min',
      description: 'Verse broodjes en gebak.',
    },
    {
      id: 2,
      name: 'Supermarkt Delhaize',
      type: 'Supermarkt',
      distance: '10 min',
      description: 'Grote supermarkt met alles wat je nodig hebt.',
    },
    {
      id: 3,
      name: 'Slagerij Placeholder',
      type: 'Slagerij',
      distance: '8 min',
      description: 'Lokaal vlees en charcuterie.',
    },
    {
      id: 4,
      name: 'Boerderijwinkel Placeholder',
      type: 'Hoevewinkels',
      distance: '15 min',
      description: 'Verse groenten, eieren en zuivel.',
    },
  ];

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
            {walks.map((walk) => (
              <Card key={walk.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="font-serif text-lg leading-tight">
                      {walk.title}
                    </CardTitle>
                    <Train className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{walk.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="gap-1">
                      <Clock className="h-3 w-3" />
                      {walk.duration}
                    </Badge>
                    <Badge variant="secondary" className="gap-1">
                      <MapPin className="h-3 w-3" />
                      {walk.distance}
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

                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground mb-2">{t('walks.highlights')}:</p>
                    <div className="flex flex-wrap gap-1">
                      {walk.highlights.map((highlight, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-muted px-2 py-0.5 rounded"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
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
            {cycling.map((route) => (
              <Card key={route.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="font-serif text-lg leading-tight">
                      {route.title}
                    </CardTitle>
                    {route.type === 'rental' ? (
                      <ShoppingBag className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    ) : (
                      <Mountain className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{route.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="gap-1">
                      <MapPin className="h-3 w-3" />
                      {route.distance}
                    </Badge>
                    <Badge className={getDifficultyColor(route.difficulty)}>
                      {getDifficultyLabel(route.difficulty)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
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
            {attractions.map((attraction) => (
              <Card key={attraction.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="font-serif text-xl">
                      {attraction.name}
                    </CardTitle>
                    <Badge variant="secondary" className="gap-1 flex-shrink-0">
                      <MapPin className="h-3 w-3" />
                      {attraction.distance}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{attraction.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {attraction.highlights.map((highlight, idx) => (
                      <Badge key={idx} variant="outline">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
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
            {restaurants.map((restaurant) => (
              <Card key={restaurant.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="font-serif text-lg">
                      {restaurant.name}
                    </CardTitle>
                    <span className="text-lg font-medium text-muted-foreground">
                      {restaurant.priceRange}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{restaurant.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{restaurant.cuisine}</Badge>
                    <Badge variant="outline" className="gap-1">
                      <MapPin className="h-3 w-3" />
                      {restaurant.distance}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
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
            {shops.map((shop) => (
              <Card key={shop.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Badge className="mb-3">{shop.type}</Badge>
                  <h3 className="font-serif font-semibold mb-2">{shop.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{shop.description}</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {shop.distance}
                  </div>
                </CardContent>
              </Card>
            ))}
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
