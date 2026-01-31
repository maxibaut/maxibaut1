
# SEO Verbeteringsplan voor ArdenNest

## Samenvatting
Dit plan beschrijft alle SEO-verbeteringen die nodig zijn om ArdenNest optimaal vindbaar te maken in zoekmachines. De website heeft al een goede basis, maar mist enkele essentiële technische elementen.

---

## 1. Dynamische Meta Tags per Pagina

**Wat:** Elke pagina krijgt unieke title en description tags die automatisch in de browser worden bijgewerkt.

**Waarom:** Nu heeft elke pagina dezelfde titel ("Arden'Nest | Vakantiewoning in de Ardennen"). Google ziet dit als duplicaat content.

**Resultaat:** 
- Homepage: "ArdenNest | Vakantiewoning voor 26 personen in de Ardennen"
- Het Huis: "Het Huis | ArdenNest - Quiet luxury vakantiewoning"
- Contact: "Contact | ArdenNest - Boek direct bij de eigenaar"

---

## 2. Sitemap.xml

**Wat:** Een XML-bestand dat alle pagina's van de website opsomt voor zoekmachines.

**Waarom:** Helpt Google om alle pagina's te ontdekken en te indexeren.

**Resultaat:** Automatisch gegenereerde sitemap met alle routes (homepage, property, about, contact, etc.)

---

## 3. Hreflang Tags (Meertalige SEO)

**Wat:** HTML-tags die aangeven dat dezelfde pagina in meerdere talen beschikbaar is.

**Waarom:** Voorkomt dat Google de NL, FR, EN en DE versies als duplicate content ziet. Toont de juiste taalversie aan bezoekers in hun land.

**Resultaat:**
```
<link rel="alternate" hreflang="nl" href="https://ardennest.be/" />
<link rel="alternate" hreflang="fr" href="https://ardennest.be/?lang=fr" />
<link rel="alternate" hreflang="en" href="https://ardennest.be/?lang=en" />
<link rel="alternate" hreflang="de" href="https://ardennest.be/?lang=de" />
```

---

## 4. Canonical URLs

**Wat:** Een tag die aangeeft welke URL de "officiële" versie van een pagina is.

**Waarom:** Voorkomt problemen met duplicate content (bijv. met/zonder trailing slash, met/zonder www).

**Resultaat:** `<link rel="canonical" href="https://ardennest.be/property" />`

---

## 5. Structured Data (JSON-LD Schema)

**Wat:** Machine-leesbare informatie over jullie vakantiewoning die Google kan tonen in zoekresultaten.

**Waarom:** Kan leiden tot rich snippets in Google (sterren, prijzen, beschikbaarheid).

**Schema types:**
- **LocalBusiness**: Adres, telefoon, openingstijden
- **VacationRental**: Capaciteit, voorzieningen, locatie
- **BreadcrumbList**: Navigatiepad in zoekresultaten

**Voorbeeld resultaat in Google:**
```
ArdenNest | Vakantiewoning Ardennen
★★★★★ 4.9 (50+ reviews) · Vakantiewoning
26 personen · 10 slaapkamers · Gedinne, Belgie
```

---

## 6. Eigen Open Graph Afbeelding

**Wat:** Een aangepaste afbeelding die verschijnt wanneer iemand de website deelt op sociale media.

**Waarom:** Nu wordt een Lovable placeholder-afbeelding getoond. Een eigen afbeelding van ArdenNest is veel aantrekkelijker.

**Specificaties:** 1200x630 pixels, met een mooie foto van het huis en het logo.

---

## 7. robots.txt Uitbreiden

**Wat:** Verwijzing naar de sitemap toevoegen aan robots.txt.

**Waarom:** Helpt zoekmachines de sitemap automatisch te vinden.

**Toevoeging:**
```
Sitemap: https://ardennest.be/sitemap.xml
```

---

## Implementatievolgorde

1. **SEO Hook Component** - Centrale component voor dynamische meta tags
2. **Sitemap.xml** - Statisch bestand met alle pagina's
3. **robots.txt update** - Sitemap referentie toevoegen
4. **Structured Data** - JSON-LD voor LocalBusiness en VacationRental
5. **Hreflang + Canonical** - Meertalige SEO tags
6. **Open Graph afbeelding** - Eigen afbeelding uploaden en configureren

---

## Technische Details

### Bestanden die worden aangemaakt:
- `src/hooks/useSEO.ts` - Hook voor dynamische meta tags
- `public/sitemap.xml` - XML sitemap

### Bestanden die worden aangepast:
- `index.html` - Structured data, canonical, hreflang
- `public/robots.txt` - Sitemap referentie
- Alle pagina-componenten - useSEO hook integratie

### Geschatte tijdsduur:
Ongeveer 2-3 berichten om alle verbeteringen te implementeren.

---

## Opmerking: Open Graph Afbeelding

Voor de Open Graph afbeelding heb ik een mooie foto van ArdenNest nodig. Je kunt:
1. Een bestaande foto uit de assets gebruiken (ik kan deze converteren)
2. Een nieuwe afbeelding uploaden in het juiste formaat (1200x630 pixels)
