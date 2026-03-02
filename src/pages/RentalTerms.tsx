import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { Download, ScrollText, ClipboardCheck, Store, FileText, Car } from 'lucide-react';
import { PageWrapper } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { generateRentalTermsPDF } from '@/lib/rentalTermsPdfGenerator';
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

interface Article {
  number: number;
  title: string;
  content: string;
}

const RentalTerms = () => {
  const { t, i18n } = useTranslation(['rentalTerms', 'houseRules', 'checklist', 'cancellationPolicy', 'earlyArrival', 'localTips', 'common']);
  const location = useLocation();

  const articles = t('articles', { returnObjects: true }) as Article[];

  const handleDownloadPDF = () => {
    generateRentalTermsPDF(t, i18n.language);
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
                          <strong>{t('vatNumber')}:</strong> {t('vatNumberValue')}
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

                  {/* Articles */}
                  <div className="space-y-8">
                    {articles.map((article) => (
                      <section key={article.number}>
                        <h2 className="font-serif text-xl font-semibold text-foreground mb-3">
                          Artikel {article.number} — {article.title}
                        </h2>
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                          {article.content}
                        </p>
                      </section>
                    ))}
                  </div>

                  <Separator className="my-8" />

                  {/* Closing */}
                  <div className="text-center space-y-4">
                    <p className="text-foreground/90 leading-relaxed">
                      {t('closing')}
                    </p>
                    <div className="text-muted-foreground">
                      <p>{t('contact.email')} • {t('contact.phone')}</p>
                    </div>
                    <p className="text-sm text-muted-foreground/70 italic pt-4">{t('signature')}</p>
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

export default RentalTerms;
