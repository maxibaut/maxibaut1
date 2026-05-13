## Doel

Een dedicated `/faq` pagina bouwen in 4 talen (NL, FR, EN, DE) die zowel de bestaande FAQ van `/contact` overneemt als de nieuwe vragen die families typisch stellen bij het zoeken naar een groepsvakantiehuis. Volledig SEO-geoptimaliseerd met FAQPage JSON-LD, hreflang, canonicals, en interne linking.

---

## 1. Inhoud — geconsolideerde vraagcatalogus

De bestaande 13 contact-FAQ's worden hergroepeerd en aangevuld met ~12 nieuwe family-rental vragen, in **6 thematische secties** (gebaseerd op echte zoekintenties):

1. **Capaciteit & slaapindeling** — 26 personen, 9 ensuite kamers, slaapkamer gelijkvloers, geschikt voor verschillende generaties
2. **Koken & samen eten** — Lacanche, 2 vaatwassers, 7m20 eiken tafel, wat is voorzien (servies, koffiezet…), zelf koken vs. catering
3. **Kinderen & families** — speelkamer, speelstal, omheinde tuin, kinderbedjes/box, geschikt voor meerdere gezinnen, baby-vriendelijk
4. **Praktisch verblijf** — check-in/out, vroege aankomst, wifi, parking, EV-laadpunt, mobiliteit, wat is inbegrepen
5. **Boeking, prijs & voorwaarden** — minimale verblijfsduur, hoe ver vooruit boeken, annulering, verborgen kosten, eerlijk verbruik
6. **Locatie, omgeving & huisregels** — hoe bereiken, omgeving/activiteiten, huisdieren, roken, feesten, weekend met regen

Elke vraag krijgt:
- Concreet antwoord (2–4 zinnen, ArdenNest tone-of-voice — geen "luxe", geen superlatieven)
- Optionele interne link naar de meest relevante pagina (`/property`, `/booking`, `/early-arrival`, `/surroundings`, `/house-rules`, `/cancellation-policy`)

---

## 2. Architectuur

**Nieuwe route:** `/faq` (en `/fr/faq`, `/en/faq`, `/de/faq`)

**Nieuw bestand:** `src/pages/FAQ.tsx` — gebruikt:
- `PageWrapper`
- `useSEO()` hook met FAQ-specifieke title/description per taal
- shadcn `Accordion` per sectie
- Sticky in-page navigatie met de 6 sectie-anchors (zoals `/surroundings` doet)
- Eindigt met een CTA-blok: "Vraag niet beantwoord? Stuur Bieke een bericht" → link naar `/contact`

**Locale-bestanden** (12 nieuwe JSON-bestanden):
- `src/locales/{nl,fr,en,de}/faq.json` + `public/locales/{nl,fr,en,de}/faq.json`
- Structuur: `{ seo, hero, sections: [{ id, title, questions: [{q, a, link?, linkText?}] }], cta }`
- NL is bron; FR/EN/DE worden vertaald (DE formeel "Sie")

**i18n-registratie:** `faq` namespace toevoegen in `src/lib/i18n.ts`.

---

## 3. Contact-pagina aanpassen

De bestaande FAQ-sectie op `/contact` (en de bijbehorende `faq` blok in `contact.json` × 4 talen) wordt **vervangen** door een korte teaser-card:

> "Veelgestelde vragen — van capaciteit tot annulering, vind antwoorden op de vragen die families het vaakst stellen. → Bekijk de FAQ"

Reden: voorkomt duplicate content tussen `/contact` en `/faq` (SEO-belangrijk) en houdt `/contact` gefocust op het echte doel: contact opnemen.

`FAQJsonLd.tsx` wordt aangepast: in plaats van `contact` namespace leest het `faq` namespace, en wordt enkel ingeladen vanuit `FAQ.tsx` (niet meer vanuit `Contact.tsx`).

---

## 4. SEO-implementatie

### Per-pagina meta (via `useSEO`)

| Taal | Title (≤60 chars) | Description (≤160 chars) |
|------|-------------------|--------------------------|
| NL | Veelgestelde vragen \| ArdenNest Gedinne | Antwoorden op vragen over capaciteit, keuken, kinderen, boeking en huisregels van ArdenNest in de Belgische Ardennen. |
| FR | Questions fréquentes \| ArdenNest Gedinne | Réponses aux questions sur capacité, cuisine, enfants, réservation et règles d'ArdenNest en Ardenne belge. |
| EN | Frequently asked questions \| ArdenNest | Answers about capacity, kitchen, children, booking and house rules at ArdenNest in the Belgian Ardennes. |
| DE | Häufige Fragen \| ArdenNest Gedinne | Antworten zu Kapazität, Küche, Kindern, Buchung und Hausregeln von ArdenNest in den belgischen Ardennen. |

### Structured data
- **FAQPage JSON-LD** met alle ~25 Q&A's in de actieve taal (vervangt huidige beperkte lijst)
- **BreadcrumbList JSON-LD**: Home → FAQ

### hreflang & canonicals
- Bestaande `useSEO` hook handelt hreflang automatisch af (gebaseerd op route + language)
- Canonical per taalvariant via dezelfde hook

### Sitemap (`public/sitemap.xml`)
4 nieuwe `<url>` blokken (NL/FR/EN/DE) voor `/faq` toegevoegd, met onderlinge `xhtml:link rel="alternate"` cross-references. Priority `0.7`, changefreq `monthly` (consistent met andere informatieve pagina's).

### Interne linking
- **Footer**: nieuwe link "Veelgestelde vragen" toegevoegd in de "Praktisch" / "Informatie" kolom
- **Contact teaser** (zie §3): link naar `/faq`
- **In-page links** vanuit FAQ-antwoorden naar relevante diepere pagina's
- **Optioneel** (kan later): link vanuit Booking-pagina hint "Vragen vóór je boekt? → FAQ"

### llms.txt
`/faq` toevoegen onder "Praktische Informatie" met korte beschrijving.

---

## 5. Tone-of-voice checklist (per geheugen)

- "jullie" (NL), "Sie" (DE), "vous" (FR), "you" (EN)
- Geen "luxe", geen "uniek/ongeëvenaard"
- Concreet: "9 slaapkamers met ensuite badkamer", niet "veel ruimte"
- Bewuste keuzes positief framen ("Geen huisdieren — om een zorgeloos verblijf te garanderen voor gasten met allergieën"), nooit verontschuldigend
- Geen "Boek nu!"-CTA's

---

## 6. Bestanden — overzicht

**Nieuw aan te maken (14):**
- `src/pages/FAQ.tsx`
- `src/locales/{nl,fr,en,de}/faq.json` (4)
- `public/locales/{nl,fr,en,de}/faq.json` (4)

**Aan te passen (10):**
- `src/App.tsx` — route + lazy import
- `src/lib/i18n.ts` — namespace
- `src/components/FAQJsonLd.tsx` — leest `faq` namespace
- `src/pages/Contact.tsx` — FAQ-sectie vervangen door teaser, `FAQJsonLd` verwijderen
- `src/locales/{nl,fr,en,de}/contact.json` + `public/locales/{nl,fr,en,de}/contact.json` (8) — `faq` blok vervangen door `faqTeaser` blok
- `src/components/layout/Footer.tsx` — link toevoegen
- `public/sitemap.xml` — 4 nieuwe URL-blokken
- `public/llms.txt` — `/faq` regel toevoegen

---

## 7. Te bevestigen vóór ik bouw

1. **Volledig vervangen** van FAQ op `/contact` (door teaser-link), of FAQ daar **behouden als korte versie** (bv. top-5 vragen) met "Lees alle vragen →" link?
2. Zijn er specifieke vragen die je expliciet wilt zien (of net niet) in de nieuwe FAQ — bijvoorbeeld over BBQ, allergenen, schoonmaakvergoeding, baby-uitrusting?
