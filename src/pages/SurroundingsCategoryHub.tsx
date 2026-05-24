import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PageWrapper } from '@/components/layout';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { useLanguagePrefix } from '@/hooks/useLanguagePrefix';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import {
  Footprints,
  Bike,
  Landmark,
  UtensilsCrossed,
  ShoppingBag,
  Zap,
  Star,
  ChevronRight,
  MapPin,
} from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import {
  getItemsByCategory,
  getImageSrc,
  SurroundingsCategory,
} from '@/data/surroundings';


const VALID_CATEGORIES: SurroundingsCategory[] = [
  'walks',
  'cycling',
  'active',
  'attractions',
  'restaurants',
  'shops',
  'exclusive',
];

const CATEGORY_ICON: Record<SurroundingsCategory, React.ComponentType<{ className?: string }>> = {
  walks: Footprints,
  cycling: Bike,
  active: Zap,
  attractions: Landmark,
  restaurants: UtensilsCrossed,
  shops: ShoppingBag,
  exclusive: Star,
};

const localeMap: Record<string, string> = {
  nl: 'nl-BE',
  fr: 'fr-BE',
  en: 'en-GB',
  de: 'de-DE',
};

const SurroundingsCategoryHub = () => {
  const { category } = useParams<{ category: string }>();
  const { t, i18n } = useTranslation('surroundings');
  const { localizedPath } = useLanguagePrefix();

  const isValid = !!category && (VALID_CATEGORIES as string[]).includes(category);
  const cat = category as SurroundingsCategory;

  // Drive title + description through useSEO so first paint has correct SEO meta
  useSEO(
    isValid
      ? {
          titleKey: `categoryHub.${cat}.seoTitle`,
          descriptionKey: `categoryHub.${cat}.seoDescription`,
          namespace: 'surroundings',
        }
      : undefined
  );

  // Strip markdown for schema descriptions
  const stripMd = (s: string) =>
    s.replace(/\*\*(.+?)\*\*/g, '$1').replace(/[*_`]/g, '').replace(/\s+/g, ' ').trim();

  // Translated bits — read unconditionally so the hook order is stable
  const title = t(`categoryHub.${cat}.title`, { defaultValue: '' });
  const intro = t(`categoryHub.${cat}.intro`, { defaultValue: '' });
  const siblingsHeading = t('categoryHub.siblingsHeading', { defaultValue: 'Other categories' });
  const homeLabel = t('breadcrumb.home', { defaultValue: 'Home' });
  const surroundingsLabel = t('breadcrumb.surroundings', { defaultValue: t('title') });

  const items = isValid ? getItemsByCategory(cat) : [];

  // CollectionPage + BreadcrumbList JSON-LD
  useEffect(() => {
    if (!isValid) return;
    const inLanguage = localeMap[i18n.language] || 'nl-BE';
    const baseUrl = 'https://ardennest.be';
    const langPrefix = i18n.language === 'nl' ? '' : `/${i18n.language}`;
    const hubUrl = `${baseUrl}${langPrefix}/surroundings/${cat}`;

    const hasPart = items.map((it) => {
      const itemTitle = t(`items.${cat}.${it.slug}.title`, { defaultValue: it.slug });
      return {
        '@type': 'WebPage',
        name: itemTitle,
        url: `${baseUrl}${langPrefix}/surroundings/${cat}/${it.slug}`,
      };
    });

    const collection = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: title,
      description: stripMd(intro),
      inLanguage,
      url: hubUrl,
      isPartOf: { '@type': 'WebSite', '@id': 'https://ardennest.be/#website' },
      hasPart,
    };

    const breadcrumb = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: homeLabel, item: `${baseUrl}${langPrefix}/` },
        {
          '@type': 'ListItem',
          position: 2,
          name: surroundingsLabel,
          item: `${baseUrl}${langPrefix}/surroundings`,
        },
        { '@type': 'ListItem', position: 3, name: title, item: hubUrl },
      ],
    };

    const inject = (id: string, payload: unknown) => {
      document.getElementById(id)?.remove();
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.id = id;
      s.textContent = JSON.stringify(payload);
      document.head.appendChild(s);
      return s;
    };

    const a = inject(`jsonld-hub-${cat}`, collection);
    const b = inject(`jsonld-hub-bc-${cat}`, breadcrumb);

    return () => {
      a.remove();
      b.remove();
    };
  }, [cat, isValid, items, i18n.language, title, intro, homeLabel, surroundingsLabel, t]);

  if (!isValid) {
    return <Navigate to={localizedPath('/surroundings')} replace />;
  }

  const Icon = CATEGORY_ICON[cat] ?? MapPin;

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground section-padding">
        <div className="container-luxury">
          <Breadcrumb className="mb-6">
            <BreadcrumbList className="text-primary-foreground/70">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="hover:text-primary-foreground">
                    {homeLabel}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/surroundings" className="hover:text-primary-foreground">
                    {surroundingsLabel}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-primary-foreground">{title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center">
              <Icon className="h-6 w-6" />
            </div>
          </div>
          <h1 className="heading-display mb-6">{title}</h1>
          <p className="body-large text-primary-foreground/85 max-w-3xl whitespace-pre-line">
            {intro}
          </p>
        </div>
      </section>

      {/* Sub-pages grid */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          {items.length === 0 ? (
            <p className="body-base text-muted-foreground text-center">
              {t('comingSoon', { defaultValue: '' })}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((it) => {
                const itTitle = t(`items.${cat}.${it.slug}.title`, { defaultValue: it.slug });
                const itDesc = t(`items.${cat}.${it.slug}.description`, { defaultValue: '' });
                const img = it.heroImage || it.images?.[0];
                const imgSrc = getImageSrc(img);
                return (

                  <Link key={it.id} to={`/surroundings/${cat}/${it.slug}`}>
                    <Card
                      className="hover:shadow-lg transition-all hover:-translate-y-1 h-full group cursor-pointer relative overflow-hidden"
                      style={
                        imgSrc
                          ? {
                              backgroundImage: `url(${imgSrc})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                            }
                          : undefined
                      }
                    >
                      {imgSrc && <div className="absolute inset-0 bg-background/85 z-0" />}

                      <CardHeader className="pb-2 relative z-10">
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="font-serif text-lg leading-tight group-hover:text-primary transition-colors">
                            {itTitle}
                          </CardTitle>
                          <Icon className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                        </div>
                      </CardHeader>
                      <CardContent className="relative z-10">
                        {itDesc && (
                          <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{itDesc}</p>
                        )}
                        {it.village && (
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
                            <MapPin className="h-3 w-3" />
                            {it.village}
                          </p>
                        )}
                        <div className="flex items-center gap-1 text-sm text-primary group-hover:gap-2 transition-all pt-2">
                          {t('moreInfo', { defaultValue: 'Meer info' })}
                          <ChevronRight className="h-4 w-4" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Sibling categories */}
      <section className="section-padding bg-cream-dark">
        <div className="container-luxury">
          <h2 className="heading-2 mb-6 text-foreground">{siblingsHeading}</h2>
          <ul className="flex flex-wrap gap-3">
            {VALID_CATEGORIES.filter((c) => c !== cat).map((c) => {
              const SibIcon = CATEGORY_ICON[c];
              return (
                <li key={c}>
                  <Link
                    to={`/surroundings/${c}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border bg-card hover:bg-muted transition-colors text-sm font-medium text-foreground"
                  >
                    <SibIcon className="h-4 w-4" />
                    {t(`categoryHub.${c}.title`, { defaultValue: c })}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </PageWrapper>
  );
};

export default SurroundingsCategoryHub;
