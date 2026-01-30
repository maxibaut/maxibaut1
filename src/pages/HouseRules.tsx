import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Download, FileText, ScrollText, Shield, ChevronRight } from 'lucide-react';
import { PageWrapper } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const legalDocuments = [
  { 
    key: 'houseRules', 
    path: '/house-rules', 
    icon: ScrollText,
    downloadPath: '/documents/huisregels.md'
  },
  { 
    key: 'cancellation', 
    path: '/cancellation-policy', 
    icon: FileText,
    downloadPath: null
  },
  { 
    key: 'privacy', 
    path: '/privacy-policy', 
    icon: Shield,
    downloadPath: null
  },
];

const HouseRules = () => {
  const { t } = useTranslation(['houseRules', 'common']);
  const location = useLocation();

  const handleDownloadPDF = () => {
    const link = document.createElement('a');
    link.href = '/documents/huisregels.md';
    link.download = 'huisregels-ardennest.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAll = async () => {
    const documentsToDownload = legalDocuments
      .filter(doc => doc.downloadPath)
      .map(doc => ({
        url: doc.downloadPath!,
        filename: doc.downloadPath!.split('/').pop() || 'document.md'
      }));

    for (const doc of documentsToDownload) {
      const link = document.createElement('a');
      link.href = doc.url;
      link.download = doc.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // Small delay between downloads
      await new Promise(resolve => setTimeout(resolve, 300));
    }
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
                      <Button onClick={handleDownloadPDF} variant="outline" className="gap-2">
                        <Download className="h-4 w-4" />
                        {t('downloadButton')}
                      </Button>
                    </div>
                  </div>

                  {/* Welcome Text */}
                  <div className="prose prose-slate max-w-none mb-10">
                    <p className="text-foreground/90 leading-relaxed">
                      {t('welcome')}
                    </p>
                  </div>

                  <Separator className="my-8" />

                  {/* Aankomst & Vertrek */}
                  <section className="mb-10">
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      {t('sections.arrivalDeparture.title')}
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium text-foreground mb-2">{t('sections.arrivalDeparture.cleaning.title')}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {t('sections.arrivalDeparture.cleaning.content')}
                        </p>
                      </div>
                    </div>
                  </section>

                  <Separator className="my-8" />

                  {/* De Woning */}
                  <section className="mb-10">
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      {t('sections.house.title')}
                    </h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium text-foreground mb-2">{t('sections.house.bedding.title')}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {t('sections.house.bedding.content')}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground mb-2">{t('sections.house.beds.title')}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {t('sections.house.beds.content')}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground mb-2">{t('sections.house.furniture.title')}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {t('sections.house.furniture.content')}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground mb-2">{t('sections.house.shoes.title')}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {t('sections.house.shoes.content')}
                        </p>
                      </div>
                    </div>
                  </section>

                  <Separator className="my-8" />

                  {/* Eten en drinken */}
                  <section className="mb-10">
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      {t('sections.foodDrink.title')}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {t('sections.foodDrink.content')}
                    </p>
                  </section>

                  <Separator className="my-8" />

                  {/* Rookvrij */}
                  <section className="mb-10">
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      {t('sections.smokeFree.title')}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {t('sections.smokeFree.content')}
                    </p>
                  </section>

                  <Separator className="my-8" />

                  {/* Haardhout */}
                  <section className="mb-10">
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      {t('sections.firewood.title')}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {t('sections.firewood.content')}
                    </p>
                  </section>

                  <Separator className="my-8" />

                  {/* De Keuken */}
                  <section className="mb-10">
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      {t('sections.kitchen.title')}
                    </h2>
                    <div>
                      <h3 className="font-medium text-foreground mb-2">{t('sections.kitchen.frying.title')}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {t('sections.kitchen.frying.content')}
                      </p>
                    </div>
                  </section>

                  <Separator className="my-8" />

                  {/* De Tuin */}
                  <section className="mb-10">
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      {t('sections.garden.title')}
                    </h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium text-foreground mb-2">{t('sections.garden.playground.title')}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {t('sections.garden.playground.content')}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground mb-2">{t('sections.garden.toys.title')}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {t('sections.garden.toys.content')}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground mb-2">{t('sections.garden.fire.title')}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {t('sections.garden.fire.content')}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground mb-2">{t('sections.garden.trampoline.title')}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {t('sections.garden.trampoline.content')}
                        </p>
                      </div>
                    </div>
                  </section>

                  <Separator className="my-8" />

                  {/* Rust & Omgeving */}
                  <section className="mb-10">
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      {t('sections.quietHours.title')}
                    </h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium text-foreground mb-2">{t('sections.quietHours.outdoorMusic.title')}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {t('sections.quietHours.outdoorMusic.content')}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground mb-2">
                          {t('sections.quietHours.quietTime.title')}: {t('sections.quietHours.quietTime.subtitle')}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {t('sections.quietHours.quietTime.content')}
                        </p>
                      </div>
                    </div>
                  </section>

                  <Separator className="my-8" />

                  {/* Huisdieren */}
                  <section className="mb-10">
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      {t('sections.pets.title')}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {t('sections.pets.content')}
                    </p>
                  </section>

                  <Separator className="my-8" />

                  {/* Schade & Meldingen */}
                  <section className="mb-10">
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      {t('sections.damage.title')}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {t('sections.damage.content')}
                    </p>
                  </section>

                  <Separator className="my-8" />

                  {/* Toegang */}
                  <section className="mb-10">
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      {t('sections.access.title')}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {t('sections.access.content')}
                    </p>
                  </section>

                  <Separator className="my-8" />

                  {/* Noodtrap */}
                  <section className="mb-10">
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      {t('sections.emergencyStairs.title')}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {t('sections.emergencyStairs.content')}
                    </p>
                  </section>

                  <Separator className="my-8" />

                  {/* Groepsgrootte */}
                  <section className="mb-10">
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      {t('sections.groupSize.title')}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {t('sections.groupSize.content')}
                    </p>
                  </section>

                  <Separator className="my-8" />

                  {/* Aansprakelijkheid */}
                  <section className="mb-10">
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      {t('sections.liability.title')}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {t('sections.liability.content')}
                    </p>
                  </section>

                  <Separator className="my-8" />

                  {/* Noodgevallen */}
                  <section className="mb-10">
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      {t('sections.emergency.title')}
                    </h2>
                    <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-foreground">{t('sections.emergency.emergencyNumber')}</p>
                          <p className="text-lg font-bold text-destructive">{t('sections.emergency.emergencyNumberValue')}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{t('sections.emergency.ownerContact')}</p>
                          <p className="text-muted-foreground">{t('sections.emergency.ownerContactValue')}</p>
                        </div>
                      </div>
                    </div>
                  </section>

                  <Separator className="my-8" />

                  {/* Tot Slot */}
                  <section>
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      {t('sections.closing.title')}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {t('sections.closing.content1')}
                    </p>
                    <p className="text-foreground font-medium leading-relaxed mb-8">
                      {t('sections.closing.content2')}
                    </p>
                    <p className="text-sm text-muted-foreground italic">
                      {t('sections.closing.signature')}
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

export default HouseRules;
