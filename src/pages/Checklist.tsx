import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Download, FileText, ScrollText, Shield, ChevronRight, ClipboardCheck, Square, Phone, Store, Car } from 'lucide-react';
import { PageWrapper } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { generateChecklistPDF } from '@/lib/pdfGenerator';

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
  { 
    key: 'privacy', 
    path: '/privacy-policy', 
    icon: Shield,
  },
];

interface ChecklistSectionProps {
  title: string;
  subtitle?: string;
  items: string[];
  tip?: string;
}

const ChecklistSection = ({ title, subtitle, items, tip }: ChecklistSectionProps) => (
  <section className="mb-10">
    <h2 className="font-serif text-2xl font-semibold text-foreground mb-2">
      {title}
    </h2>
    {subtitle && (
      <p className="text-sm text-muted-foreground mb-4">{subtitle}</p>
    )}
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="flex items-start gap-3 group">
          <div className="flex-shrink-0 mt-0.5">
            <Square className="h-5 w-5 text-primary/60 stroke-[1.5]" />
          </div>
          <span className="text-muted-foreground leading-relaxed">{item}</span>
        </div>
      ))}
    </div>
    {tip && (
      <p className="mt-4 text-sm text-primary font-medium italic">
        {tip}
      </p>
    )}
  </section>
);

const Checklist = () => {
  const { t, i18n } = useTranslation(['checklist', 'common']);
  const location = useLocation();

  const handleDownloadPDF = () => {
    generateChecklistPDF({
      title: t('pageTitle'),
      subtitle: t('pageSubtitle'),
      intro: t('intro'),
      sections: [
        {
          title: t('sections.general.title'),
          subtitle: t('sections.general.departureTime'),
          items: t('sections.general.items', { returnObjects: true }) as string[],
        },
        {
          title: t('sections.house.title'),
          items: t('sections.house.items', { returnObjects: true }) as string[],
        },
        {
          title: t('sections.kitchen.title'),
          items: t('sections.kitchen.items', { returnObjects: true }) as string[],
          tip: t('sections.kitchen.tip'),
        },
        {
          title: t('sections.outside.title'),
          items: t('sections.outside.items', { returnObjects: true }) as string[],
        },
        {
          title: t('sections.bedrooms.title'),
          items: t('sections.bedrooms.items', { returnObjects: true }) as string[],
        },
      ],
      damage: {
        title: t('sections.damage.title'),
        content: t('sections.damage.content'),
        depositInfo: t('sections.damage.depositInfo'),
      },
      contact: {
        title: t('contact.title'),
        phone1: t('contact.phone1'),
        phone2: t('contact.phone2'),
      },
      closing: {
        content: t('closing.content'),
        signature: t('closing.signature'),
      },
    }, `checklist-vertrek-${i18n.language}.pdf`);
  };

  const handleDownloadAll = async () => {
    handleDownloadPDF();
  };

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative bg-primary/5 py-16 lg:py-24">
        <div className="container-luxury">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
              {t('pageTitle')}
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
                      <Button onClick={handleDownloadPDF} variant="outline" className="gap-2 flex-shrink-0">
                        <Download className="h-4 w-4" />
                        {t('downloadButton')}
                      </Button>
                    </div>
                  </div>

                  {/* Intro Text */}
                  <div className="prose prose-slate max-w-none mb-8">
                    <p className="text-foreground/90 leading-relaxed">
                      {t('intro')}
                    </p>
                  </div>

                  {/* General Section */}
                  <ChecklistSection
                    title={t('sections.general.title')}
                    subtitle={t('sections.general.departureTime')}
                    items={t('sections.general.items', { returnObjects: true }) as string[]}
                  />

                  <Separator className="my-8" />

                  {/* House Section */}
                  <ChecklistSection
                    title={t('sections.house.title')}
                    items={t('sections.house.items', { returnObjects: true }) as string[]}
                  />

                  <Separator className="my-8" />

                  {/* Kitchen Section */}
                  <ChecklistSection
                    title={t('sections.kitchen.title')}
                    items={t('sections.kitchen.items', { returnObjects: true }) as string[]}
                    tip={t('sections.kitchen.tip')}
                  />

                  <Separator className="my-8" />

                  {/* Outside Section */}
                  <ChecklistSection
                    title={t('sections.outside.title')}
                    items={t('sections.outside.items', { returnObjects: true }) as string[]}
                  />

                  <Separator className="my-8" />

                  {/* Bedrooms Section */}
                  <ChecklistSection
                    title={t('sections.bedrooms.title')}
                    items={t('sections.bedrooms.items', { returnObjects: true }) as string[]}
                  />

                  <Separator className="my-8" />

                  {/* Damage Section */}
                  <section className="mb-10">
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      {t('sections.damage.title')}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {t('sections.damage.content')}
                    </p>
                    <p className="text-foreground font-medium">
                      {t('sections.damage.depositInfo')}
                    </p>
                  </section>

                  <Separator className="my-8" />

                  {/* Contact Section */}
                  <section className="mb-10">
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      {t('contact.title')}
                    </h2>
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                      <div className="flex flex-wrap gap-6">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-primary" />
                          <a href={`tel:${t('contact.phone1')}`} className="text-foreground hover:text-primary transition-colors">
                            {t('contact.phone1')}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-primary" />
                          <a href={`tel:${t('contact.phone2')}`} className="text-foreground hover:text-primary transition-colors">
                            {t('contact.phone2')}
                          </a>
                        </div>
                      </div>
                    </div>
                  </section>

                  <Separator className="my-8" />

                  {/* Closing */}
                  <section>
                    <p className="text-foreground font-medium leading-relaxed mb-4">
                      {t('closing.content')}
                    </p>
                    <p className="text-sm text-muted-foreground italic">
                      {t('closing.signature')}
                    </p>
                  </section>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Legal Documents Menu */}
            <aside className="lg:col-span-1 order-1 lg:order-2">
              <div className="lg:sticky lg:top-24">
                <Card className="border-border/50">
                  <CardContent className="p-4">
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
                      {t('footer.documentsInfo', { ns: 'common' })}
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
                              'flex items-center justify-between px-3 py-2.5 rounded-md text-sm transition-colors group',
                              isActive
                                ? 'bg-primary/10 text-primary font-medium'
                                : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                            )}
                          >
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4" />
                              <span>{t(`footer.${doc.key}`, { ns: 'common' })}</span>
                            </div>
                            <ChevronRight className={cn(
                              'h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity',
                              isActive && 'opacity-100'
                            )} />
                          </Link>
                        );
                      })}
                    </nav>
                    
                    <Separator className="my-4" />
                    
                    <Button 
                      onClick={handleDownloadAll} 
                      variant="outline" 
                      className="w-full gap-2 text-sm"
                      size="sm"
                    >
                      <Download className="h-4 w-4" />
                      {t('footer.downloadAll', { ns: 'common' })}
                    </Button>
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

export default Checklist;
