import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, MapPin } from 'lucide-react';
import {
  getAllItems,
  getItemsByCategory,
  SurroundingsCategory,
  SurroundingsItem,
} from '@/data/surroundings';

interface DiscoverNearbyProps {
  currentCategory: SurroundingsCategory;
  currentSlug: string;
}

/**
 * Shows 3 related items from surroundings data.
 * Priority: same category first, then fill from other categories.
 * Selection is shuffled on each render.
 */
const DiscoverNearby = ({ currentCategory, currentSlug }: DiscoverNearbyProps) => {
  const { t } = useTranslation('surroundings');

  const items = useMemo(() => {
    // Get same-category items, excluding current
    const sameCategory = getItemsByCategory(currentCategory)
      .filter((item) => item.slug !== currentSlug);

    // Shuffle helper
    const shuffle = <T,>(arr: T[]): T[] => {
      const a = [...arr];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    };

    const shuffledSame = shuffle(sameCategory);
    const result: SurroundingsItem[] = shuffledSame.slice(0, 3);

    // Fill remaining slots from other categories
    if (result.length < 3) {
      const otherItems = getAllItems().filter(
        (item) => item.category !== currentCategory && item.slug !== currentSlug
      );
      const shuffledOther = shuffle(otherItems);
      result.push(...shuffledOther.slice(0, 3 - result.length));
    }

    return result;
  }, [currentCategory, currentSlug]);

  if (items.length === 0) return null;

  return (
    <section className="section-padding bg-background border-t border-border">
      <div className="container-luxury">
        <h2 className="heading-3 mb-8">{t('discoverNearby')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => {
            const title = t(`items.${item.category}.${item.slug}.title`, { defaultValue: item.slug });
            const description = t(`items.${item.category}.${item.slug}.description`, { defaultValue: '' });

            return (
              <Link key={`${item.category}-${item.slug}`} to={`/surroundings/${item.category}/${item.slug}`}>
                <Card className="hover:shadow-lg transition-all hover:-translate-y-1 h-full group cursor-pointer">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="font-serif text-lg leading-tight group-hover:text-primary transition-colors">
                        {title}
                      </CardTitle>
                      {item.distance && (
                        <Badge variant="secondary" className="gap-1 flex-shrink-0">
                          <MapPin className="h-3 w-3" />
                          {item.distance}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
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
  );
};

export default DiscoverNearby;
