import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Download, Clock, Phone, ScrollText, ClipboardCheck, Store, FileText, Shield, ChevronRight, Car } from 'lucide-react';
import { PageWrapper } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { generateEarlyArrivalPDF } from '@/lib/earlyArrivalPdfGenerator';

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

interface Highlight {
  name: string;
  description: string;
}

interface Destination {
  name: string;
  distance: string;
  description: string;
  highlights: Highlight[];
}

const EarlyArrival = () => {
  const { t, i18n } = useTranslation(['earlyArrival', 'common']);
  const location = useLocation();

  const destinations = t('destinations', { returnObjects: true }) as Destination[];

  const handleDownloadPDF = () => {
    generateEarlyArrivalPDF(t, i18n.language);
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
                  <div className="prose prose-slate max-w-none mb-10">
                    <p className="text-foreground/90 leading-relaxed">
                      {t('intro')}
                    </p>
                  </div>

                  <Separator className="my-8" />

                  {/* Destinations */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {destinations.map((destination, index) => (
                      <div key={index} className="space-y-4">
                        <div className="flex items-start justify-between">
                          <h2 className="font-serif text-xl font-semibold text-foreground">
                            {destination.name}
                          </h2>
                          <span className="flex items-center gap-1 text-sm text-muted-foreground bg-primary/5 px-2 py-1 rounded">
                            <Clock className="h-3.5 w-3.5" />
                            {destination.distance}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {destination.description}
                        </p>
                        <div className="space-y-3">
                          {destination.highlights.map((highlight, hIndex) => (
                            <div key={hIndex} className="pl-4 border-l-2 border-primary/30">
                              <h4 className="font-medium text-foreground text-sm">{highlight.name}</h4>
                              <p className="text-muted-foreground text-sm">{highlight.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-8" />

                  {/* Contact Section */}
                  <section className="mb-6">
                    <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                      {t('contact.title')}
                    </h2>
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                      <p className="text-muted-foreground mb-4">{t('contact.content')}</p>
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

                  {/* Signature */}
                  <div className="text-center pt-4">
                    <p className="text-sm text-muted-foreground/70 italic">{t('signature')}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 order-1 lg:order-2">
              <div className="sticky top-24">
                <Card className="border-border/50">
                  <CardContent className="p-4">
                    <h3 className="font-serif text-lg font-medium mb-4">{t('common:footer.documentsInfo')}</h3>
                    <nav className="space-y-1">
                      {legalDocuments.map((doc) => {
                        const Icon = doc.icon;
                        const isActive = location.pathname === doc.path;
                        return (
                          <Link
                            key={doc.key}
                            to={doc.path}
                            className={cn(
                              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm",
                              isActive 
                                ? "bg-primary/10 text-primary font-medium" 
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                          >
                            <Icon className="h-4 w-4 flex-shrink-0" />
                            <span className="flex-1">{t(`common:footer.${doc.key}`)}</span>
                            <ChevronRight className={cn(
                              "h-4 w-4 transition-transform",
                              isActive && "text-primary"
                            )} />
                          </Link>
                        );
                      })}
                    </nav>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default EarlyArrival;
