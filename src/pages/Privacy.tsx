import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, ScrollText, ClipboardCheck, Store, FileText, Shield, ChevronRight, Car, Lock, Cookie, Users, Clock, Scale, Globe } from 'lucide-react';
import { PageWrapper } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const legalDocuments = [
  { key: 'houseRules', path: '/house-rules', icon: ScrollText },
  { key: 'earlyArrival', path: '/early-arrival', icon: Car },
  { key: 'checklist', path: '/checklist', icon: ClipboardCheck },
  { key: 'rentalTerms', path: '/rental-terms', icon: FileText },
  { key: 'cancellation', path: '/cancellation-policy', icon: FileText },
  { key: 'localTips', path: '/shops', icon: Store },
  { key: 'privacy', path: '/privacy-policy', icon: Shield },
];

interface DataItem {
  purpose?: string;
  basis?: string;
  type?: string;
  right?: string;
  description: string;
  duration?: string;
}

interface Partner {
  name: string;
  description: string;
}

interface CookieItem {
  cookie: string;
  purpose: string;
  duration: string;
  type: string;
}

const Privacy = () => {
  const { t, i18n } = useTranslation(['privacy', 'common']);
  const location = useLocation();


  const whatDataContactForm = t('sections.whatData.contactForm.items', { returnObjects: true }) as string[];
  const whatDataBooking = t('sections.whatData.booking.items', { returnObjects: true }) as string[];
  const whatDataAutomatic = t('sections.whatData.automatic.items', { returnObjects: true }) as string[];
  const whyCollectItems = t('sections.whyCollect.items', { returnObjects: true }) as DataItem[];
  const legalBasisItems = t('sections.legalBasis.items', { returnObjects: true }) as DataItem[];
  const sharingPartners = t('sections.sharing.partners', { returnObjects: true }) as Partner[];
  const retentionItems = t('sections.retention.items', { returnObjects: true }) as DataItem[];
  const rightsItems = t('sections.rights.items', { returnObjects: true }) as DataItem[];
  const essentialCookies = t('sections.cookies.essential.items', { returnObjects: true }) as CookieItem[];
  const analyticsCookies = t('sections.cookies.analytics.items', { returnObjects: true }) as CookieItem[];
  const externalServices = t('sections.cookies.external.items', { returnObjects: true }) as string[];
  const securityItems = t('sections.security.items', { returnObjects: true }) as string[];

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
                    </div>
                  </div>

                  {/* Intro Text */}
                  <div className="prose prose-slate max-w-none mb-10">
                    <p className="text-foreground/90 leading-relaxed">
                      {t('intro')}
                    </p>
                  </div>

                  <Separator className="my-8" />

                  {/* Section 1: Who are we */}
                  <section className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                      <Users className="h-5 w-5 text-primary" />
                      <h2 className="font-serif text-xl font-semibold text-foreground">
                        {t('sections.whoAreWe.title')}
                      </h2>
                    </div>
                    <p className="text-muted-foreground mb-4">{t('sections.whoAreWe.content')}</p>
                    <div className="bg-muted/50 rounded-lg p-4 space-y-1">
                      <p className="font-medium">{t('sections.whoAreWe.company')}</p>
                      <p className="text-sm text-muted-foreground">{t('sections.whoAreWe.address')}</p>
                      <p className="text-sm text-muted-foreground">
                        <Mail className="h-3.5 w-3.5 inline mr-1" />
                        <a href={`mailto:${t('sections.whoAreWe.email')}`} className="hover:text-primary">{t('sections.whoAreWe.email')}</a>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <Phone className="h-3.5 w-3.5 inline mr-1" />
                        <a href={`tel:${t('sections.whoAreWe.phone')}`} className="hover:text-primary">{t('sections.whoAreWe.phone')}</a>
                      </p>
                    </div>
                    <p className="text-muted-foreground mt-4 text-sm">{t('sections.whoAreWe.responsibility')}</p>
                  </section>

                  <Separator className="my-8" />

                  {/* Section 2: What data */}
                  <section className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                      <FileText className="h-5 w-5 text-primary" />
                      <h2 className="font-serif text-xl font-semibold text-foreground">
                        {t('sections.whatData.title')}
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h3 className="font-medium mb-2">{t('sections.whatData.contactForm.title')}</h3>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {whatDataContactForm.map((item, idx) => (
                            <li key={idx}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">{t('sections.whatData.booking.title')}</h3>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {whatDataBooking.map((item, idx) => (
                            <li key={idx}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">{t('sections.whatData.automatic.title')}</h3>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {whatDataAutomatic.map((item, idx) => (
                            <li key={idx}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </section>

                  <Separator className="my-8" />

                  {/* Section 3: Why collect */}
                  <section className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                      <Scale className="h-5 w-5 text-primary" />
                      <h2 className="font-serif text-xl font-semibold text-foreground">
                        {t('sections.whyCollect.title')}
                      </h2>
                    </div>
                    <ul className="space-y-2">
                      {whyCollectItems.map((item, idx) => (
                        <li key={idx} className="flex gap-2 text-sm">
                          <span className="font-medium text-foreground">{item.purpose}:</span>
                          <span className="text-muted-foreground">{item.description}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <Separator className="my-8" />

                  {/* Section 4: Legal basis */}
                  <section className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                      <Scale className="h-5 w-5 text-primary" />
                      <h2 className="font-serif text-xl font-semibold text-foreground">
                        {t('sections.legalBasis.title')}
                      </h2>
                    </div>
                    <ul className="space-y-2">
                      {legalBasisItems.map((item, idx) => (
                        <li key={idx} className="flex gap-2 text-sm">
                          <span className="font-medium text-foreground">{item.basis}:</span>
                          <span className="text-muted-foreground">{item.description}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <Separator className="my-8" />

                  {/* Section 5: Sharing */}
                  <section className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                      <Globe className="h-5 w-5 text-primary" />
                      <h2 className="font-serif text-xl font-semibold text-foreground">
                        {t('sections.sharing.title')}
                      </h2>
                    </div>
                    <p className="text-muted-foreground mb-4">{t('sections.sharing.intro')}</p>
                    <ul className="space-y-2 mb-4">
                      {sharingPartners.map((partner, idx) => (
                        <li key={idx} className="flex gap-2 text-sm">
                          <span className="font-medium text-foreground">{partner.name}:</span>
                          <span className="text-muted-foreground">{partner.description}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="font-medium text-foreground">{t('sections.sharing.noSelling')}</p>
                  </section>

                  <Separator className="my-8" />

                  {/* Section 6: Retention */}
                  <section className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                      <Clock className="h-5 w-5 text-primary" />
                      <h2 className="font-serif text-xl font-semibold text-foreground">
                        {t('sections.retention.title')}
                      </h2>
                    </div>
                    <ul className="space-y-2">
                      {retentionItems.map((item, idx) => (
                        <li key={idx} className="flex gap-2 text-sm">
                          <span className="font-medium text-foreground">{item.type}:</span>
                          <span className="text-muted-foreground">{item.duration}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <Separator className="my-8" />

                  {/* Section 7: Rights */}
                  <section className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                      <Shield className="h-5 w-5 text-primary" />
                      <h2 className="font-serif text-xl font-semibold text-foreground">
                        {t('sections.rights.title')}
                      </h2>
                    </div>
                    <p className="text-muted-foreground mb-4">{t('sections.rights.intro')}</p>
                    <ul className="space-y-2 mb-4">
                      {rightsItems.map((item, idx) => (
                        <li key={idx} className="flex gap-2 text-sm">
                          <span className="font-medium text-foreground">{item.right}:</span>
                          <span className="text-muted-foreground">{item.description}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm text-muted-foreground mb-2">{t('sections.rights.contact')}</p>
                    <p className="text-sm text-muted-foreground">{t('sections.rights.complaint')}</p>
                  </section>

                  <Separator className="my-8" />

                  {/* Section 8: Cookies */}
                  <section className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                      <Cookie className="h-5 w-5 text-primary" />
                      <h2 className="font-serif text-xl font-semibold text-foreground">
                        {t('sections.cookies.title')}
                      </h2>
                    </div>
                    <p className="text-muted-foreground mb-6">{t('sections.cookies.intro')}</p>

                    {/* Essential cookies */}
                    <h3 className="font-medium mb-2">{t('sections.cookies.essential.title')}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{t('sections.cookies.essential.description')}</p>
                    <div className="overflow-x-auto mb-6">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Cookie</TableHead>
                            <TableHead>Doel</TableHead>
                            <TableHead>Bewaartijd</TableHead>
                            <TableHead>Type</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {essentialCookies.map((cookie, idx) => (
                            <TableRow key={idx}>
                              <TableCell className="font-medium">{cookie.cookie}</TableCell>
                              <TableCell>{cookie.purpose}</TableCell>
                              <TableCell>{cookie.duration}</TableCell>
                              <TableCell>{cookie.type}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    {/* Analytics cookies */}
                    <h3 className="font-medium mb-2">{t('sections.cookies.analytics.title')}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{t('sections.cookies.analytics.description')}</p>
                    <div className="overflow-x-auto mb-4">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Cookie</TableHead>
                            <TableHead>Doel</TableHead>
                            <TableHead>Bewaartijd</TableHead>
                            <TableHead>Type</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {analyticsCookies.map((cookie, idx) => (
                            <TableRow key={idx}>
                              <TableCell className="font-mono text-sm">{cookie.cookie}</TableCell>
                              <TableCell>{cookie.purpose}</TableCell>
                              <TableCell>{cookie.duration}</TableCell>
                              <TableCell>{cookie.type}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    <p className="text-sm text-muted-foreground mb-6">{t('sections.cookies.analytics.note')}</p>

                    {/* External services */}
                    <h3 className="font-medium mb-2">{t('sections.cookies.external.title')}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{t('sections.cookies.external.description')}</p>
                    <ul className="text-sm text-muted-foreground space-y-1 mb-6">
                      {externalServices.map((service, idx) => (
                        <li key={idx}>• {service}</li>
                      ))}
                    </ul>

                    {/* Managing cookies */}
                    <h3 className="font-medium mb-2">{t('sections.cookies.manage.title')}</h3>
                    <p className="text-sm text-muted-foreground">{t('sections.cookies.manage.description')}</p>
                  </section>

                  <Separator className="my-8" />

                  {/* Section 9: Security */}
                  <section className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                      <Lock className="h-5 w-5 text-primary" />
                      <h2 className="font-serif text-xl font-semibold text-foreground">
                        {t('sections.security.title')}
                      </h2>
                    </div>
                    <p className="text-muted-foreground mb-4">{t('sections.security.intro')}</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {securityItems.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </section>

                  <Separator className="my-8" />

                  {/* Section 10: Changes */}
                  <section className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                      <FileText className="h-5 w-5 text-primary" />
                      <h2 className="font-serif text-xl font-semibold text-foreground">
                        {t('sections.changes.title')}
                      </h2>
                    </div>
                    <p className="text-muted-foreground">{t('sections.changes.content')}</p>
                  </section>

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
                          <Mail className="h-4 w-4 text-primary" />
                          <a href={`mailto:${t('contact.email')}`} className="text-foreground hover:text-primary transition-colors">
                            {t('contact.email')}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-primary" />
                          <a href={`tel:${t('contact.phone')}`} className="text-foreground hover:text-primary transition-colors">
                            {t('contact.phone')}
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

export default Privacy;
