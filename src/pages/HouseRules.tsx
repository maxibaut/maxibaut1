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
  const { t } = useTranslation(['common', 'homepage']);
  const location = useLocation();

  const handleDownloadPDF = () => {
    // For now, download the markdown file
    // In production, this could generate a PDF
    const link = document.createElement('a');
    link.href = '/documents/huisregels.md';
    link.download = 'huisregels-ardennest.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative bg-primary/5 py-16 lg:py-24">
        <div className="container-luxury">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
              Huisregels
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Deze huisregels helpen om het verblijf voor jullie én voor de groepen na jullie zo aangenaam mogelijk te houden.
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
                          <strong>Accommodatie:</strong> Ardennest
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <strong>Website:</strong> www.ardennest.be
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <strong>Uitbater:</strong> Festina Lente
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <strong>Versie:</strong> Januari 2026
                        </p>
                      </div>
                      <Button onClick={handleDownloadPDF} variant="outline" className="gap-2">
                        <Download className="h-4 w-4" />
                        Download PDF
                      </Button>
                    </div>
                  </div>

                  {/* Welcome Text */}
                  <div className="prose prose-slate max-w-none mb-10">
                    <p className="text-foreground/90 leading-relaxed">
                      Welkom bij Ardennest. Fijn dat jullie er zijn. Deze huisregels helpen om het verblijf voor jullie én voor de groepen na jullie zo aangenaam mogelijk te houden. De meeste zaken spreken voor zich, maar we zetten ze graag even op papier. De actuele versie hangt in de woning en is bindend.
                    </p>
                  </div>

                  <Separator className="my-8" />

                  {/* Aankomst & Vertrek */}
                  <section className="mb-10">
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      Aankomst & Vertrek
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium text-foreground mb-2">Schoonmaak</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          De schoonmaak na jullie vertrek is inbegrepen in de prijs, op voorwaarde dat de woning ordelijk wordt achtergelaten. Concreet vragen we om de vaat af te wassen en op te bergen, het afval te sorteren, jullie persoonlijke spullen mee te nemen en de vertrekchecklist even te doorlopen. Die checklist krijgen jullie bij aankomst, zo weten jullie precies wat we verwachten.
                        </p>
                      </div>
                    </div>
                  </section>

                  <Separator className="my-8" />

                  {/* De Woning */}
                  <section className="mb-10">
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      De Woning
                    </h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium text-foreground mb-2">Beddengoed</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          Gelieve de bedden, kussens en dekbedden steeds te gebruiken met het linnen dat wij voorzien, zo blijft alles fris en hygiënisch voor iedereen. We vragen ook om matrassen en dekbedden op de bedden te laten liggen en niet op de grond te leggen, en om ongebruikt beddengoed netjes in de kast op te bergen.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground mb-2">Meubels</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          We hebben de meubels en bedden zo geplaatst dat ze het beste tot hun recht komen, gelieve ze daarom op hun plek te laten staan.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground mb-2">Schoenen</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          Om de vloeren en tapijten op de verdiepingen mooi te houden, vragen we om geen buitenschoenen te dragen boven. Pantoffels of dikke sokken zijn ideaal, en maken het meteen ook gezelliger.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground mb-2">Eten en drinken</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          Gelieve geen eten of drinken mee naar boven te nemen naar de slaapkamers of op de trap, zo vermijden we vlekken en houden we de kamers fris voor de volgende gasten.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground mb-2">Rookvrij</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          De volledige woning is rookvrij, en dat geldt ook voor e-sigaretten en vapen. Buiten staan asbakken klaar voor wie wil roken, we vragen vriendelijk om die te gebruiken en geen peuken achter te laten in de tuin.
                        </p>
                      </div>
                    </div>
                  </section>

                  <Separator className="my-8" />

                  {/* De Keuken */}
                  <section className="mb-10">
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      De Keuken
                    </h2>
                    <div>
                      <h3 className="font-medium text-foreground mb-2">Frituren</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Frituren met olie is niet toegestaan in de woning, en we vragen ook om geen gourmet- of fonduetoestellen te gebruiken. Dit heeft te maken met brandveiligheid en het bewaken van de luchtkwaliteit in huis. De professionele keuken biedt gelukkig meer dan genoeg alternatieven om heerlijke maaltijden te bereiden.
                      </p>
                    </div>
                  </section>

                  <Separator className="my-8" />

                  {/* De Tuin */}
                  <section className="mb-10">
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      De Tuin
                    </h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium text-foreground mb-2">Speelparadijs</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          De tuin van 200m op 100m is helemaal ingericht als speelparadijs voor kinderen, en we willen dat graag zo houden. Daarom is het niet toegestaan om eigen tenten, caravans of opblaaszwembaden te plaatsen.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground mb-2">Speelgoed</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          Het speelgoed dat binnen staat is enkel voorzien voor gebruik binnen, en het buitenspeelgoed in de berging is bedoeld voor buiten op ons terrein — niet op de openbare weg. De skelters en fietsjes zijn voorzien voor kinderen tot 16 jaar. We vragen om 's avonds al het buitenmateriaal terug binnen te zetten.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground mb-2">Vuur</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          Open vuur maken in de tuin is niet toegestaan, en ook vuurwerk of wensballonnen zijn niet toegelaten omwille van brandgevaar en overlast voor de omgeving.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground mb-2">Haardhout</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          Haardhout is beschikbaar tegen een kleine vergoeding. We vragen om geen eigen hout mee te brengen, dit om insecten te vermijden en de schouw te beschermen.
                        </p>
                      </div>
                    </div>
                  </section>

                  <Separator className="my-8" />

                  {/* Rust & Omgeving */}
                  <section className="mb-10">
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      Rust & Omgeving
                    </h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium text-foreground mb-2">Muziek buiten</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          Muziek buiten is niet toegestaan, ook niet overdag. De stilte en rust van de Ardennen is precies wat veel van onze gasten zo waarderen, en dat willen we graag bewaren.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground mb-2">Rusttijden: 22:00 – 07:00</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          Tussen 22 uur 's avonds en 7 uur 's ochtends vragen we om binnen te blijven met ramen en deuren dicht, en het geluidsniveau op gesprekstoon te houden. Externe speakers of muziekinstallaties zijn dan niet toegestaan. Zo kan iedereen die wil slapen dat ook echt doen — zowel in jullie groep als bij de buren.
                        </p>
                      </div>
                    </div>
                  </section>

                  <Separator className="my-8" />

                  {/* Huisdieren */}
                  <section className="mb-10">
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      Huisdieren
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Huisdieren zijn niet toegestaan bij Ardennest. We hebben de woning allergeen-arm ingericht zodat gasten met allergieën hier zorgeloos kunnen verblijven, en dat willen we graag zo houden.
                    </p>
                  </section>

                  <Separator className="my-8" />

                  {/* Schade & Meldingen */}
                  <section className="mb-10">
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      Schade & Meldingen
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Mocht er bij aankomst iets niet in orde zijn, laat het ons dan meteen weten — zo zijn jullie gedekt en kunnen wij het vaak nog tijdens jullie verblijf oplossen. Is er tijdens het verblijf iets stuk of beschadigd geraakt? Meld het ook even, dan zorgen wij dat het in orde is voor de volgende gasten. Ongelukjes gebeuren, dat begrijpen we volkomen.
                    </p>
                  </section>

                  <Separator className="my-8" />

                  {/* Toegang */}
                  <section className="mb-10">
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      Toegang
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Bij noodgevallen of wanneer er dringend onderhoud nodig is, kunnen wij de woning betreden. Voor alle andere zaken nemen wij minstens 24 uur vooraf contact op om een geschikt moment af te spreken — jullie privacy respecteren we ten volle.
                    </p>
                  </section>

                  <Separator className="my-8" />

                  {/* Groepsgrootte */}
                  <section className="mb-10">
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      Groepsgrootte
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Ardennest is gemaakt voor families en groepen die op zoek zijn naar quality time samen, met een maximum van 26 personen. De woning is niet geschikt voor feesten of evenementen.
                    </p>
                  </section>

                  <Separator className="my-8" />

                  {/* Aansprakelijkheid */}
                  <section className="mb-10">
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      Aansprakelijkheid
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Ardennest is niet aansprakelijk voor persoonlijk letsel, verlies of schade aan eigendommen van gasten, tenzij er sprake is van aantoonbare nalatigheid van onze kant. Het toezicht op kinderen blijft altijd de verantwoordelijkheid van de ouders en begeleiders. We raden aan om een reisverzekering af te sluiten die annulering en aansprakelijkheid dekt.
                    </p>
                  </section>

                  <Separator className="my-8" />

                  {/* Noodgevallen */}
                  <section className="mb-10">
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      Noodgevallen
                    </h2>
                    <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-foreground">Noodnummer</p>
                          <p className="text-lg font-bold text-destructive">112</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Contact eigenaar</p>
                          <p className="text-muted-foreground">+32 478 03 03 52</p>
                        </div>
                      </div>
                    </div>
                  </section>

                  <Separator className="my-8" />

                  {/* Tot Slot */}
                  <section>
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                      Tot Slot
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Naast deze huisregels is uiteraard ook de Belgische wetgeving van toepassing. De versie van de huisregels die jullie bij de boekingsbevestiging ontvangen, geldt voor jullie verblijf.
                    </p>
                    <p className="text-foreground font-medium leading-relaxed mb-8">
                      We wensen jullie een heerlijk en onvergetelijk verblijf bij Ardennest. Geniet van elkaar en van de rust.
                    </p>
                    <p className="text-sm text-muted-foreground italic">
                      Ardennest • Festina Lente • Al 17 jaar gastvrij in de Ardennen
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
                      Juridische documenten
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
                              <span>{t(`footer.${doc.key}`)}</span>
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
                      onClick={handleDownloadPDF} 
                      variant="outline" 
                      className="w-full gap-2 text-sm"
                      size="sm"
                    >
                      <Download className="h-4 w-4" />
                      Download huisregels
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
