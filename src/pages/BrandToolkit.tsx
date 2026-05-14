import { useState } from 'react';
import { FileText, Copy, Check, X, Download } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSEO } from '@/hooks/useSEO';

/* ── Downloads data ─────────────────────────────────────── */
const downloads = [
  {
    name: 'Visitekaartje',
    description: 'Print-ready business card, 85×55mm with 3mm bleed',
    file: '/downloads/ardennest-visitekaartje.pdf',
    size: '~45 KB',
    available: true,
  },
  {
    name: 'Flyer DL',
    description: 'Print-ready DL flyer, 99×210mm with 3mm bleed',
    file: '/downloads/ardennest-flyer-dl.pdf',
    size: '~52 KB',
    available: true,
  },
  {
    name: 'Logo',
    description: 'Vector logo in diverse formaten',
    file: '',
    size: '—',
    available: false,
  },
];

/* ── Colors data ────────────────────────────────────────── */
const colors = [
  { name: 'Primary groen', hex: '#2D5016', usage: 'Headings, accenten, knoppen' },
  { name: 'Secondary bruin', hex: '#8B7355', usage: 'Labels, subtiele tekst' },
  { name: 'Accent cream', hex: '#F5F0E8', usage: 'Achtergronden, kaarten' },
  { name: 'Tekst houtskool', hex: '#2D2D2D', usage: 'Lopende tekst (nooit puur zwart)' },
  { name: 'Border zacht bruin', hex: '#D4C4B0', usage: 'Randen, scheidingslijnen' },
];

/* ── Copy-to-clipboard button ───────────────────────────── */
const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
      aria-label={`Kopieer ${text}`}
    >
      <span className="font-mono text-sm">{text}</span>
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
};

/* ── Section wrapper ────────────────────────────────────── */
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="py-12 md:py-16 border-b border-border last:border-b-0">
    <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-8">{title}</h2>
    {children}
  </section>
);

/* ── Page ────────────────────────────────────────────────── */
const BrandToolkit = () => {
  useSEO({
    titleKey: undefined,
    descriptionKey: undefined,
    noIndex: true,
  });

  // Set title directly since we bypass the translation-based hook
  document.title = 'Brand Toolkit — ArdenNest';
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', 'Brand assets, colors, typography and guidelines for ArdenNest');

  return (
    <main className="min-h-screen bg-background">
      <div className="container-luxury max-w-5xl mx-auto px-4 sm:px-6">
        {/* ── Header ──────────────────────────────────── */}
        <div className="pt-12 md:pt-20 pb-8 border-b border-border">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground tracking-tight">ArdenNest</h1>
          <p className="text-xl text-muted-foreground mt-1">Brand Toolkit</p>
          <p className="text-sm text-muted-foreground mt-4">
            This page is not indexed by search engines. Share the URL directly with partners or suppliers.
          </p>
        </div>

        {/* ── 1. Downloads ────────────────────────────── */}
        <Section title="Downloads">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {downloads.map((d) => (
              <Card key={d.name} className={d.available ? '' : 'opacity-50'}>
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1 rounded-md bg-accent p-2.5">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground">{d.name}</p>
                      {!d.available && (
                        <Badge variant="secondary" className="text-xs">Binnenkort beschikbaar</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{d.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{d.size}</p>
                    {d.available ? (
                      <Button asChild size="sm" variant="outline" className="mt-3">
                        <a href={d.file} download>
                          <Download className="h-3.5 w-3.5 mr-1" /> Download
                        </a>
                      </Button>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        {/* ── 2. Kleuren ──────────────────────────────── */}
        <Section title="Kleuren">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {colors.map((c) => (
              <Card key={c.hex} className="overflow-hidden">
                <div className="h-16 rounded-t-lg" style={{ backgroundColor: c.hex }} />
                <CardContent className="p-4">
                  <p className="font-medium text-sm text-foreground">{c.name}</p>
                  <CopyButton text={c.hex} />
                  <p className="text-xs text-muted-foreground mt-1">{c.usage}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        {/* ── 3. Typografie ───────────────────────────── */}
        <Section title="Typografie">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Headings specimen */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <p className="font-serif text-2xl font-bold text-foreground">Playfair Display</p>
                <p className="text-sm text-muted-foreground">Weights: Regular (400), Bold (700)</p>
                <p className="text-sm text-muted-foreground">Gebruik: Titels, sectiekoppen, display tekst</p>
                <div className="space-y-3 pt-4 border-t border-border">
                  <p className="font-serif text-2xl text-foreground">ArdenNest</p>
                  <p className="font-serif text-base text-foreground">Quiet luxury for moments together</p>
                  <p className="font-serif text-[13px] text-foreground">Waar het hele gezelschap samenkomt</p>
                </div>
              </CardContent>
            </Card>
            {/* Body specimen */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <p className="text-2xl font-semibold text-foreground">Inter</p>
                <p className="text-sm text-muted-foreground">Weights: Regular (400), Medium (500), Semi-bold (600)</p>
                <p className="text-sm text-muted-foreground">Gebruik: Lopende tekst, knoppen, labels, navigatie</p>
                <div className="space-y-3 pt-4 border-t border-border">
                  <p className="text-base text-foreground">Koken voor 26 is hier geen corvee — het is het hoogtepunt van de dag.</p>
                  <p className="text-sm text-foreground">Twee professionele vaatwassers draaien na het avondeten alles in één keer schoon.</p>
                  <p className="text-xs text-foreground">bieke@ardennest.be · +32 (0)61 58 89 45</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* ── 4. Media ────────────────────────────────── */}
        <Section title="Media">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <p className="font-medium text-foreground mb-2">OG Image</p>
                <div className="rounded-md overflow-hidden border border-border">
                  <img src="/og-image.jpg" alt="ArdenNest Open Graph preview" width={1200} height={630} className="w-full h-auto" loading="lazy" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">1200 × 630 px</p>
                <Button asChild size="sm" variant="outline" className="mt-3">
                  <a href="/og-image.jpg" download>
                    <Download className="h-3.5 w-3.5 mr-1" /> Download
                  </a>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="font-medium text-foreground mb-2">QR Code — Website</p>
                <div className="flex items-center justify-center bg-white rounded-md border border-border p-6">
                  <QRCode />
                </div>
                <p className="text-xs text-muted-foreground mt-2">Verwijst naar https://www.ardennest.be</p>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* ── 5. Toon & richtlijnen ───────────────────── */}
        <Section title="Toon & richtlijnen">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Do's */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Wel doen</h3>
              {[
                'Concreet en specifiek: "7m20 eiken tafel" niet "lange tafel"',
                'Warm en persoonlijk: gebruik "jullie", niet "u"',
                'Eerlijk over beperkingen: "Geen zwembad — bewust"',
                'Herkenbare scenario\'s: "Als de kinderen slapen..."',
                'Belgisch, niet Nederlands: schrijf zoals een Belgische gastheer praat',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5 rounded-full bg-emerald-50 p-1">
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                  </div>
                  <p className="text-sm text-foreground">{item}</p>
                </div>
              ))}
            </div>
            {/* Don'ts */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Niet doen</h3>
              {[
                'Geen superlatieven: niet "uniek", "ongeëvenaard", "ultiem"',
                'Geen vakantieclichés: niet "genesteld", "oase", "ontsnappen"',
                'Geen vage luxe: het woord "luxe" is verboden (te beladen)',
                'Geen druk-taal: niet "Boek nu!", "Mis deze kans niet!"',
                'Geen excuses voor bewuste keuzes: niet "helaas geen huisdieren"',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5 rounded-full bg-red-50 p-1">
                    <X className="h-3.5 w-3.5 text-red-500" />
                  </div>
                  <p className="text-sm text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── 6. Positionering ────────────────────────── */}
        <Section title="Positionering">
          <div className="text-center max-w-2xl mx-auto">
            <blockquote className="font-serif text-3xl md:text-4xl italic text-foreground leading-snug">
              "Quiet luxury for moments together"
            </blockquote>
            <p className="text-sm text-muted-foreground mt-6 leading-relaxed">
              Alles wat samenzijn dient. Niets wat ervan afleidt. ArdenNest is gebouwd rond één idee: dat de mooiste momenten ontstaan wanneer een groep écht samenkomt — aan tafel, in de tuin, bij de open haard. Geen features die afleiden, wel kwaliteit die je voelt.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {[
                'Samenzijn boven entertainment',
                'Ontzorgen boven opsmuk',
                'Ruimte boven drukte',
                'Kwaliteit boven kwantiteit',
              ].map((pill) => (
                <Badge key={pill} variant="secondary" className="text-sm px-4 py-1.5">
                  {pill}
                </Badge>
              ))}
            </div>
          </div>
        </Section>

        {/* ── Footer ──────────────────────────────────── */}
        <div className="py-8 text-center text-sm text-muted-foreground">
          Laatste update: maart 2026 · Vragen? bieke@ardennest.be
        </div>
      </div>
    </main>
  );
};

/* ── Simple SVG QR Code for ardennest.be ─────────────────
   This is a minimal visual placeholder. For a scannable QR,
   replace with a proper generated image.                    */
const QRCode = () => (
  <svg viewBox="0 0 120 120" width="160" height="160" className="text-foreground">
    {/* Simplified visual representation — replace with actual QR */}
    <rect width="120" height="120" fill="white" />
    {/* Top-left finder */}
    <rect x="4" y="4" width="28" height="28" fill="currentColor" />
    <rect x="8" y="8" width="20" height="20" fill="white" />
    <rect x="12" y="12" width="12" height="12" fill="currentColor" />
    {/* Top-right finder */}
    <rect x="88" y="4" width="28" height="28" fill="currentColor" />
    <rect x="92" y="8" width="20" height="20" fill="white" />
    <rect x="96" y="12" width="12" height="12" fill="currentColor" />
    {/* Bottom-left finder */}
    <rect x="4" y="88" width="28" height="28" fill="currentColor" />
    <rect x="8" y="92" width="20" height="20" fill="white" />
    <rect x="12" y="96" width="12" height="12" fill="currentColor" />
    {/* Data modules (decorative) */}
    {[36,40,44,48,52,56,60,64,68,72,76,80].map((x) =>
      [36,44,52,60,68,76,84].map((y) => (
        (x + y) % 8 === 0 ? <rect key={`${x}-${y}`} x={x} y={y} width="4" height="4" fill="currentColor" /> : null
      ))
    )}
    <text x="60" y="65" textAnchor="middle" fontSize="7" fill="currentColor" fontFamily="Inter, sans-serif">ardennest.be</text>
  </svg>
);

export default BrandToolkit;
