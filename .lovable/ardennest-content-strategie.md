# ArdenNest — Content & Marketing Strategie

*Versie 1.1 — maart 2026*

---

## Overzicht

Drie kanalen, één contentstroom. Elke bron-input (foto, video, update) voedt drie outputs:

1. **Social media** (Instagram, Facebook) — bereik & awareness
2. **Journal op de website** (ardennest.be/journal) — SEO-waarde & deelbaarheid
3. **Nieuwsbrief** (seizoensgebundeld, 4x/jaar) — repeat customers & directe boekingen

Dit is geen contentmachine. Dit is een lichte, beheersbare cyclus die past bij de Festina Lente-filosofie en de harde constraint: **geen ongoing manueel werk**.

---

## 0. Contentbronnen

### Waar komt de content vandaan?

Twee natuurlijke bronnen — allebei bijproducten van het leven op en rond het domein:

**1. Het huis & domein**
Seizoensgebonden sfeer, updates en investeringen. Foto's van de tuin, een nieuwe petanquebaan, de keuken in actie. Dit is content die vanzelf ontstaat door het huis te onderhouden en te verbeteren.

**2. De streek verkennen**
Christophe en Bieke maken regelmatig uitstappen in de omgeving — wandelingen, dorpjes, restaurants, markten, uitzichtpunten. Tijdens die uitstappen: foto's nemen en korte beschrijvingen noteren. Eenmaal thuis worden de foto's en notities verwerkt tot kant-en-klare social media content via Claude Code + Remotion (MP4-video's).

### Productie-workflow voor streek-content

```
1. UITSTAP
   Foto's nemen + korte notities (locatie, wat bijzonder is, tip voor gasten)
   ↓
2. VERWERKING (thuis)
   Foto's + notities uploaden naar Claude Code
   Claude Code + Remotion genereert MP4 voor social media
   ↓
3. PUBLICATIE
   Video posten op Instagram/Facebook
   Optioneel: journal-entry met dezelfde foto's + context
```

### Frequentie
Gedreven door uitstappen, niet door een kalender. Wekelijks in actieve periodes, maandelijks in rustigere periodes. Het moment dat het een verplichting wordt, past het niet meer bij Festina Lente.

### Waarom dit werkt
- **Niet-kopieerbaar**: alleen wie er woont kan deze content maken — dat is het competitieve voordeel van "25 jaar ter plaatse"
- **Versterkt lokale autoriteit**: positioneert ArdenNest als dé insider voor de regio Gedinne/Ardennen
- **Geen handmatig design nodig**: Claude Code + Remotion automatiseert het creatieve maakwerk, de authenticiteit blijft
- **Duurzame bron**: niet afhankelijk van gasten of seizoenen — er is altijd iets te ontdekken

---

## 1. Journal op de Website

### Wat het is
Een lichte verzameling momenten en updates. Geen "blog" (dat schept publicatiedruk), maar een journal — we delen af en toe iets, wanneer het relevant is.

### Naamkeuze
**"Journal"** of **"Moments"** — niet "Blog" of "Nieuws". Past bij quiet luxury: het suggereert authenticiteit, niet een contentkalender.

### Waarom het waardevol is
- **SEO**: elke entry is een geïndexeerde pagina met eigen URL die rankt op long-tail keywords
- **Primaire flow versterken**: OTA → Google → website. Meer geïndexeerde pagina's = meer redenen voor Google om ardennest.be te tonen
- **Deelbaarheid**: journal-entries zijn "verdedigingsmateriaal" voor de initiatiefneemster in de WhatsApp-groep
- **Social proof**: toont dat het huis leeft, dat er echt gasten komen, dat er geïnvesteerd wordt

### Content types
| Type | Voorbeeld | SEO-waarde |
|------|-----------|------------|
| Seizoenssfeer | "De tuin in oktober" | long-tail: "ardennen herfst vakantie groep" |
| Huis-updates | "Nieuwe petanquebaan aangelegd" | toont investering, vers signaal voor Google |
| Activiteiten | "Kerstweekend met 26 personen" | long-tail: "kerstvakantie groot huis ardennen" |
| Lokale tips | "Markt in Gedinne op donderdag" | lokale autoriteit |
| Streekverkenning | "Wandeling langs de Semois bij Membre" | long-tail: "wandelen semois ardennen", lokale autoriteit |
| Video/social recap | Ingebed Instagram/Facebook-filmpje met context | multimedia-signaal voor Google |

### Technische specificaties (voor Lovable)

**Route:** `/journal` (overzichtspagina) + `/journal/[slug]` (individuele entries)

**Meertaligheid:** Volgt dezelfde structuur als de rest van de site. Wanneer pad-gebaseerde routing geïmplementeerd is: `/nl/journal/`, `/fr/journal/`, etc.

**Navigatie-integratie:**
- **NIET** in de hoofdnavigatie (header)
- **WEL** als subtiele link in de footer
- **WEL** als optionele sectie onderaan de homepage ("Laatste updates" — max. 2-3 recente entries)
- **WEL** in de sitemap.xml

**SEO per entry:**
- Eigen canonical URL
- Structured data: `Article` schema (met `datePublished`, `dateModified`, `author`)
- Open Graph tags per entry (titel + afbeelding)
- Hreflang-tags per taalversie

**Layout per entry:**
- Datum (subtiel, niet prominent)
- Titel (Playfair Display)
- Hero-afbeelding of ingebedde video
- Korte tekst (max. 300 woorden — dit is geen longform blog)
- Optioneel: link naar gerelateerde pagina (bijv. "Meer over onze keuken →")
- Geen commentaarsectie, geen likes, geen social share-knoppen (quiet luxury = geen social ruis)

**Overzichtspagina (`/journal`):**
- Eenvoudige kaartgrid (2 kolommen desktop, 1 mobiel)
- Per kaart: afbeelding, titel, datum, eerste zin
- Chronologisch (nieuwste eerst)
- Geen paginering nodig tot 20+ entries — één scrollbare pagina volstaat voorlopig

**Contentbeheer:**
- Fase 1: entries als statische content in de codebase (Lovable/GitHub)
- Fase 2 (later): CMS-integratie of Supabase-tabel als het volume groeit
- Geen haast met fase 2 — bij 4x/jaar publicatie is statisch prima

### Toon & stijl
- Zelfde toon als de rest van de site: warm, concreet, "jullie", geen superlatieven
- Kort. Geen essays. Een foto, een paragraaf, klaar.
- Bieke's stem (persoonlijk, alsof ze het vertelt aan een gast)

---

## 2. Nieuwsbrief

### Waarom
- **Repeat customers** zijn het meest waardevolle segment — groepen die al 4-17 jaar terugkomen
- **Goedkoopste kanaal** om de relatie warm te houden (geen OTA-commissie)
- **Multi-stakeholder effect**: initiatiefneemster forwardt mail naar WhatsApp-groep → gratis acquisitie

### Frequentie
**Maximaal 4x per jaar** — seizoensgebonden. Minder is beter dan te veel.

| Moment | Onderwerp | Doel |
|--------|-----------|------|
| Maart/april | Lente-update, zomerbeschikbaarheid | Vroege boekingen stimuleren |
| Juni/juli | Zomersfeer, herfsttips | Herfstboekingen stimuleren |
| September/oktober | Herfst-update, kerst/nieuwjaar | Winterboekingen + feestdagen |
| December/januari | Terugblik + nieuwjaarswens | Relatie onderhouden, volgend jaar plannen |

### Tool
**Brevo (voorheen Sendinblue)** of **Mailchimp Free** — eenvoudig, geen complex systeem nodig.

Criteria:
- Gratis tier volstaat (lijst < 500 contacten initieel)
- Meertalig versturen (NL, FR, EN, DE — op basis van gasttaal)
- Eenvoudige drag-and-drop editor
- GDPR-compliant (opt-in, unsubscribe)

### Lijst opbouwen

| Bron | Hoe | Prioriteit |
|------|-----|------------|
| Beds24 boekingsproces | Opt-in checkbox bij boeking | Hoog — directe conversie |
| Website footer | Subtiel signup-veld (geen popup!) | Medium |
| Na verblijf | Bedankmail met opt-in vraag | Hoog — warme lead |
| Bestaande gastendatabase | Eenmalige import met opt-in bevestiging | Eenmalig |

**Belangrijk:** Geen popup, geen lightbox, geen "subscribe for 10% off". Dat past niet bij quiet luxury. Een klein veld in de footer met "Blijf op de hoogte — 4x per jaar" is genoeg.

### Inhoud & toon
- **Kort** — max. 300 woorden. Eén afbeelding, één update, één CTA
- **Persoonlijk** — Bieke's stem, niet "Dear valued guest" maar "Hallo! De herfst is begonnen in Gedinne..."
- **Taal** — verstuur in de taal van de gast (Beds24 heeft taalprofiel)
- **CTA** — altijd subtiel: "Bekijk de beschikbaarheid" of "Benieuwd? Neem contact op"
- **Link naar journal** — elke nieuwsbrief linkt naar de bijbehorende journal-entry op de site

### Privacy & GDPR
- Expliciet opt-in (geen pre-checked box)
- Unsubscribe-link in elke mail
- Vermelden in privacy policy als verwerking
- Tool (Brevo/Mailchimp) toevoegen aan verwerkerslijst

---

## 3. Social Media (Instagram & Facebook)

### Rol
Bereik en awareness — niet de plek waar geconverteerd wordt. Social leidt naar de website, niet andersom.

### Frequentie
Geen vaste frequentie. Publiceer wanneer er iets te delen is. Kwaliteit boven kwantiteit.

### Content hergebruik
Elke social post kan een journal-entry worden (en vice versa):
- Instagram Reel → embed in journal-entry met context
- Foto-serie → journal-entry met korte tekst
- Seizoensfoto → social post + nieuwsbrief-afbeelding

### Technisch: video's op de site
Video's worden gehost als MP4 op eigen server — geen Instagram embeds, geen third-party scripts. Redenen:
- **Geen tracking/cookies**: past bij de cookieless GA4-keuze (geen banner nodig)
- **PageSpeed**: geen externe scripts laden (beschermt de 67→78 winst)
- **Quiet luxury**: geen Instagram UI-chrome op de site
- **Al beschikbaar**: Claude Code + Remotion levert de MP4 op

Implementatie: HTML5 `<video>` tag met poster-image (still uit de video), controls, en lazy loading.

---

## 4. De Uniforme Content-Cyclus

### Workflow per content-moment

```
1. BRON
   Twee types:
   a) Huis/domein: foto, video, of update (Christophe/Bieke)
   b) Streekverkenning: foto's + notities van uitstap
   ↓
2. VERWERKING
   Streek-content: foto's + notities → Claude Code + Remotion → MP4
   Huis-content: direct bruikbaar of licht bewerkt
   ↓
3. SOCIAL POST
   MP4 of foto publiceren op Instagram/Facebook
   Bieke schrijft caption in brontaal (NL)
   ↓
4. JOURNAL-ENTRY
   Zelfde content + context op ardennest.be/journal/[slug]
   Vertalingen via DeepL + handmatige review
   Eventueel video embed vanuit social
   ↓
5. NIEUWSBRIEF (seizoensgebundeld)
   Bundel 2-3 journal-entries per seizoen
   Link naar entries op de site
   Verstuur in gasttaal
```

### Agentic workflow (deels operationeel)

De streek-content pipeline werkt al: foto's + notities → Claude Code + Remotion → MP4 voor social.

Wanneer de volledige agentic content-workflow operationeel is:

1. Christophe/Bieke levert bron-input (foto's + korte beschrijving)
2. Claude Code + Remotion genereert MP4 voor social media
3. AI genereert aanvullende outputs: social caption, journal-entry, nieuwsbrief-blok
4. In vier talen (NL, FR, EN, DE)
5. Bieke reviewt en publiceert
6. Menselijke review blijft altijd de laatste stap

---

## 5. Implementatievolgorde

| Stap | Wat | Wanneer | Afhankelijkheid |
|------|-----|---------|-----------------|
| 1 | Journal-pagina bouwen in Lovable | Volgende Lovable-sessie | Geen (kan los van andere open punten) |
| 2 | Eerste 2-3 journal-entries publiceren | Direct na stap 1 | Content: bestaande social posts hergebruiken |
| 3 | Nieuwsbrief-tool kiezen en account aanmaken | Parallel met stap 1-2 | Geen |
| 4 | Opt-in integreren in Beds24 + website footer | Na stap 3 | Nieuwsbrief-tool gekozen |
| 5 | Eerste nieuwsbrief versturen | Volgend seizoensmoment | Stap 3-4 compleet + voldoende lijst |
| 6 | Agentic workflow voor content-generatie | Later | ArdenNest site gestabiliseerd |

---

## 6. Wat dit NIET is

- **Geen contentkalender met deadlines** — publiceer wanneer het relevant is
- **Geen SEO-contentfabriek** — kwaliteit boven volume, 1 goede entry per maand > 4 lege
- **Geen social media strategie** — social is een bijproduct van wat jullie sowieso doen
- **Geen apart team of extra werk** — één cyclus, drie outputs, Bieke als eindredacteur

---

## Relatie met andere open punten

| Open punt | Verband |
|-----------|---------|
| Pad-gebaseerde taalrouting (/fr/, /en/, /de/) | Journal-entries volgen dezelfde routing |
| Structured data fixes | Article schema voor journal-entries toevoegen |
| Agentic workflow seizoenscontent | Voedt alle drie de kanalen tegelijk |
| GA4 + Search Console | Meet journal-pagina performance |
| Newsletter opt-in | Toevoegen aan privacy policy verwerkerslijst |

---

*Dit document wordt bijgewerkt wanneer er strategische keuzes veranderen. Tactische uitvoering (welke foto, welke tekst) hoort hier niet thuis.*
