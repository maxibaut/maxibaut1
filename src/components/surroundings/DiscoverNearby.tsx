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
 * Priority:
 *   1. One cross-category item in the SAME village (if available) — pulls visitors
 *      from e.g. a restaurant into a nearby attraction or exclusive activity.
 *   2. Up to 2-3 same-category items (other villages).
 * Falls back to 3 same-category items when no cross-category same-village match exists.
 */
const DiscoverNearby = ({ currentCategory, currentSlug }: DiscoverNearbyProps) => {
  const { t } = useTranslation('surroundings');

  // Need to know the village of the current item — look it up from data.
  const currentItem = useMemo(
    () => getItemsByCategory(currentCategory).find((i) => i.slug === currentSlug),
    [currentCategory, currentSlug]
  );
  const currentVillage = currentItem?.village;

  const { items, crossCategoryItem } = useMemo(() => {
    const shuffle = <T,>(arr: T[]): T[] => {
      const a = [...arr];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    };

    // 1. Find ONE cross-category item in the same village (if any).
    let crossPick: SurroundingsItem | undefined;
    if (currentVillage) {
      const candidates = getAllItems().filter(
        (item) =>
          item.category !== currentCategory &&
          item.village?.toLowerCase() === currentVillage.toLowerCase() &&
          item.slug !== currentSlug
      );
      if (candidates.length > 0) {
        crossPick = shuffle(candidates)[0];
      }
    }

    // 2. Fill remaining slots with same-category items.
    const sameCategory = getItemsByCategory(currentCategory).filter(
      (item) => item.slug !== currentSlug && item.slug !== crossPick?.slug
    );
    const shuffledSame = shuffle(sameCategory);

    const slotsForSame = crossPick ? 2 : 3;
    const result: SurroundingsItem[] = crossPick
      ? [crossPick, ...shuffledSame.slice(0, slotsForSame)]
      : shuffledSame.slice(0, 3);

    // 3. Fallback: if still under 3, top up from any other category.
    if (result.length < 3) {
      const otherItems = getAllItems().filter(
        (item) =>
          item.category !== currentCategory &&
          item.slug !== currentSlug &&
          !result.some((r) => r.slug === item.slug)
      );
      result.push(...shuffle(otherItems).slice(0, 3 - result.length));
    }

    return { items: result, crossCategoryItem: crossPick };
  }, [currentCategory, currentSlug, currentVillage]);

  if (items.length === 0) return null;

  const preposition = t('preposition', { defaultValue: 'in' });

  return (
    <section className="section-padding bg-background border-t border-border">
      <div className="container-luxury">
        <h2 className="heading-3 mb-8">{t('discoverNearby')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => {
            const title = t(`items.${item.category}.${item.slug}.title`, { defaultValue: item.slug });
            const description = t(`items.${item.category}.${item.slug}.description`, { defaultValue: '' });
            const isCross = crossCategoryItem?.slug === item.slug;
            const categoryLabel = t(`categories.${item.category}`, { defaultValue: item.category });

            return (
              <Link key={`${item.category}-${item.slug}`} to={`/surroundings/${item.category}/${item.slug}`}>
                <Card className="hover:shadow-lg transition-all hover:-translate-y-1 h-full group cursor-pointer">
                  <CardHeader className="pb-2">
                    {isCross && item.village && (
                      <Badge variant="outline" className="self-start mb-2 capitalize">
                        {categoryLabel} {preposition} {item.village}
                      </Badge>
                    )}
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
