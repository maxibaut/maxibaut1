import { useTranslation } from 'react-i18next';
import { useSEO } from '@/hooks/useSEO';
import { useLocation } from 'react-router-dom';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { Download, Store, UtensilsCrossed, ShoppingBag, ChefHat, MapPin, Phone, Globe, Mail, ScrollText, ClipboardCheck, FileText, Car } from 'lucide-react';
import { PageWrapper } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { generateLocalTipsPDF } from '@/lib/localTipsPdfGenerator';
import { downloadAllDocuments } from '@/lib/downloadAllDocuments';
const legalDocuments = [
  { 
    key: 'houseRules', 
    path: '/house-rules', 
    icon: ScrollText,
  },
  { 
    key: 'earlyArrival', 
    path: '/early-arrival', 
    icon: Car,
  },
  { 
    key: 'checklist', 
    path: '/checklist', 
    icon: ClipboardCheck,
  },
  {
    key: 'rentalTerms', 
    path: '/rental-terms', 
    icon: FileText,
  },
  {
    key: 'cancellation', 
    path: '/cancellation-policy', 
    icon: FileText,
  },
  { 
    key: 'localTips', 
    path: '/shops', 
    icon: Store,
  },
];

interface TipItem {
  name: string;
  address?: string;
  phone?: string;
  website?: string;
  email?: string;
  note?: string;
}

interface SubCategory {
  title: string;
  items: TipItem[];
}

const LocalTips = () => {
  const { t, i18n } = useTranslation(['localTips', 'houseRules', 'checklist', 'cancellationPolicy', 'rentalTerms', 'earlyArrival', 'common']);
  useSEO();
  const location = useLocation();

  const handleDownloadPDF = () => {
    generateLocalTipsPDF(t, i18n.language);
  };

  const handleDownloadAll = async () => {
    const tHouseRules = (key: string, options?: object) => t(key, { ...options, ns: 'houseRules' });
    const tChecklist = (key: string, options?: object) => t(key, { ...options, ns: 'checklist' });
    const tCancellation = (key: string, options?: object) => t(key, { ...options, ns: 'cancellationPolicy' });
    const tRentalTerms = (key: string, options?: object) => t(key, { ...options, ns: 'rentalTerms' });
    const tEarlyArrival = (key: string, options?: object) => t(key, { ...options, ns: 'earlyArrival' });
    const tLocalTips = (key: string, options?: object) => t(key, { ...options, ns: 'localTips' });
    
    await downloadAllDocuments(
      tHouseRules as any,
      tChecklist as any,
      tCancellation as any,
      tRentalTerms as any,
      tEarlyArrival as any,
      tLocalTips as any,
      i18n.language
    );
  };
  const renderItem = (item: TipItem, index: number) => (
    <div key={index} className="py-3 first:pt-0 last:pb-0">
      <div className="flex flex-col sm:flex-row sm:items-start gap-2">
        <div className="flex-1">
          <p className="font-medium text-foreground">{item.name}</p>
          {item.address && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
              <span>{item.address}</span>
            </div>
          )}
          {item.phone && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <Phone className="h-3.5 w-3.5 flex-shrink-0" />
              <a href={`tel:${item.phone.replace(/\s/g, '')}`} className="hover:text-primary transition-colors">
                {item.phone}
              </a>
            </div>
          )}
          {item.email && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <Mail className="h-3.5 w-3.5 flex-shrink-0" />
              <a href={`mailto:${item.email}`} className="hover:text-primary transition-colors">
                {item.email}
              </a>
            </div>
          )}
          {item.website && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <Globe className="h-3.5 w-3.5 flex-shrink-0" />
              <a 
                href={item.website.startsWith('http') ? item.website : `https://${item.website}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                {item.website}
              </a>
            </div>
          )}
          {item.note && (
            <p className="text-sm text-muted-foreground italic mt-1">{item.note}</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderSubCategory = (key: string, subCategory: SubCategory) => (
    <div key={key} className="mb-6 last:mb-0">
      <h3 className="font-medium text-foreground mb-3 text-lg">{subCategory.title}</h3>
      <div className="divide-y divide-border/50">
        {subCategory.items.map((item, idx) => renderItem(item, idx))}
      </div>
    </div>
  );

  // Get sections data
  const shops = t('sections.shops', { returnObjects: true }) as { title: string; bakeries: SubCategory; butchers: SubCategory; fresh: SubCategory; supermarkets: SubCategory };
  const restaurants = t('sections.restaurants', { returnObjects: true }) as { title: string; gedinne: SubCategory; vencimont: SubCategory; bievre: SubCategory; beauraing: SubCategory };
  const takeaway = t('sections.takeaway', { returnObjects: true }) as { title: string; fries: SubCategory; pizza: SubCategory; pitta: SubCategory; chicken: SubCategory };
  const caterers = t('sections.caterers', { returnObjects: true }) as { title: string; items: TipItem[]; bbq: SubCategory };

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative bg-primary/5 py-16 lg:py-24">
        <div className="container-luxury">
          <div className="max-w-3xl">
            <p className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
              {t('pageTitle')}
            </p>
            <h1 className="font-serif text-2xl md:text-3xl text-foreground/80 font-normal mb-4">
              {t('h1')}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('pageSubtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3 order-2 lg:order-1">
              <Card className="border-border/50">
                <CardContent className="p-6 md:p-8 lg:p-10">
                  {/* Document Header */}
                  <div className="mb-8 pb-6 border-b border-border/50">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                          <strong>{t('accommodation')}:</strong> {t('accommodationValue')}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <strong>{t('website')}:</strong> {t('websiteValue')}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <strong>{t('operator')}:</strong> {t('operatorValue')}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <strong>{t('version')}:</strong> {t('versionValue')}
                        </p>
                      </div>
                      <Button onClick={handleDownloadPDF} variant="outline" className="gap-2">
                        <Download className="h-4 w-4" />
                        {t('downloadButton')}
                      </Button>
                    </div>
                  </div>

                  {/* Intro Text */}
                  <div className="prose prose-slate max-w-none mb-10">
                    <p className="text-foreground/90 leading-relaxed">
                      {t('intro')}
                    </p>
                  </div>

                  <Separator className="my-8" />

                  {/* WINKELS */}
                  <section className="mb-10">
                    <div className="flex items-center gap-3 mb-6">
                      <Store className="h-6 w-6 text-primary" />
                      <h2 className="font-serif text-2xl font-semibold text-foreground">
                        {shops.title}
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      {renderSubCategory('bakeries', shops.bakeries)}
                      {renderSubCategory('butchers', shops.butchers)}
                      {renderSubCategory('fresh', shops.fresh)}
                      {renderSubCategory('supermarkets', shops.supermarkets)}
                    </div>
                  </section>

                  <Separator className="my-8" />

                  {/* RESTAURANTS */}
                  <section className="mb-10">
                    <div className="flex items-center gap-3 mb-6">
                      <UtensilsCrossed className="h-6 w-6 text-primary" />
                      <h2 className="font-serif text-2xl font-semibold text-foreground">
                        {restaurants.title}
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      {renderSubCategory('gedinne', restaurants.gedinne)}
                      {renderSubCategory('vencimont', restaurants.vencimont)}
                      {renderSubCategory('bievre', restaurants.bievre)}
                      {renderSubCategory('beauraing', restaurants.beauraing)}
                    </div>
                  </section>

                  <Separator className="my-8" />

                  {/* AFHAAL */}
                  <section className="mb-10">
                    <div className="flex items-center gap-3 mb-6">
                      <ShoppingBag className="h-6 w-6 text-primary" />
                      <h2 className="font-serif text-2xl font-semibold text-foreground">
                        {takeaway.title}
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      {renderSubCategory('fries', takeaway.fries)}
                      {renderSubCategory('pizza', takeaway.pizza)}
                      {renderSubCategory('pitta', takeaway.pitta)}
                      {renderSubCategory('chicken', takeaway.chicken)}
                    </div>
                  </section>

                  <Separator className="my-8" />

                  {/* TRAITEURS */}
                  <section className="mb-10">
                    <div className="flex items-center gap-3 mb-6">
                      <ChefHat className="h-6 w-6 text-primary" />
                      <h2 className="font-serif text-2xl font-semibold text-foreground">
                        {caterers.title}
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      <div className="divide-y divide-border/50">
                        {caterers.items.slice(0, Math.ceil(caterers.items.length / 2)).map((item, idx) => renderItem(item, idx))}
                      </div>
                      <div className="divide-y divide-border/50">
                        {caterers.items.slice(Math.ceil(caterers.items.length / 2)).map((item, idx) => renderItem(item, idx))}
                      </div>
                    </div>
                    <div className="mt-6">
                      {renderSubCategory('bbq', caterers.bbq)}
                    </div>
                  </section>

                  <Separator className="my-8" />

                  {/* Closing */}
                  <div className="text-center py-6">
                    <p className="text-muted-foreground mb-2">{t('closing')}</p>
                    <p className="text-sm text-muted-foreground italic">{t('signature')}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1 order-1 lg:order-2">
              <div className="lg:sticky lg:top-24">
                <Card className="border-border/50 bg-primary/5">
                  <CardContent className="p-4">
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
                      {t('common:footer.documentsInfo')}
                    </h3>
                    <nav className="space-y-1">
                      {legalDocuments.map((doc) => {
                        const Icon = doc.icon;
                        const isActive = location.pathname === doc.path;
                        return (
                          <Link
                            key={doc.key}
                            to={doc.path}
                            className={cn(
                              'flex items-center px-3 py-2.5 rounded-md text-sm transition-colors',
                              isActive
                                ? 'bg-primary/10 text-primary font-medium'
                                : 'text-muted-foreground hover:border hover:border-border'
                            )}
                          >
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4" />
                              <span>{t(`common:footer.${doc.key}`)}</span>
                            </div>
                          </Link>
                        );
                      })}
                    </nav>
                  </CardContent>
                </Card>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default LocalTips;
