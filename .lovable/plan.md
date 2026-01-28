

# Plan: Detailpagina Treinwandeling Anseremme - Gendron Uitwerken

## Overzicht

De detailpagina voor de "Treinwandeling Anseremme - Gendron" wordt volledig uitgewerkt met herschreven content, externe foto's van de bronwebsite, en aangepaste links.

---

## Wijzigingen

### 1. Tekst Herschrijven (surroundings.json)

De huidige tekst in het locale bestand wordt herschreven op basis van de bronwebsite. De nieuwe tekst bevat:

- **Korte beschrijving**: Aantrekkelijke intro over deze familievriendelijke treinwandeling
- **Uitgebreide beschrijving**: 
  - Startpunt Dinant station Anseremme
  - Treinrit naar Gendron (5 min, weekendtarief 2,50 euro per persoon)
  - 3 uur wandelen langs de Lesse
  - Hoogtepunten: hoge spoorwegbrug (2x oversteken), strand van Walzin, voetgangersbrug
  - Afsluiten met ijsje aan de Maas met zicht op Dinant
- **Buggy-informatie**: 3x optillen bij bruggen, verder vlotte weg (geen klimmen/klauteren)
- **Tip**: Bij mooi weer wachten langs de Maas met bankjes

### 2. Foto's Toevoegen (walks.ts)

Selectie van 5 beste foto's van de bronwebsite (externe URLs):

| Foto | Omschrijving |
|------|--------------|
| `20200725_160825.jpg` | Overzichtsfoto wandeling |
| `20200725_162401.jpg` | De hoge spoorwegbrug |
| `20200725_163903.jpg` | Wandelen langs de Lesse |
| `20200726_120203.jpg` | Routekaart |
| `20200725_152015.jpg` | Bospad |

### 3. Links Aanpassen (walks.ts)

| Actie | Details |
|-------|---------|
| Verwijderen | `externalUrl` (fermeduchateau.be link) |
| Verwijderen | `coordinates` (open in maps functie) |
| Toevoegen | `trainBookingUrl`: link naar NMBS/SNCB website voor treinreservering |

### 4. Detail Pagina Uitbreiden (SurroundingsDetail.tsx)

- Foto carousel/galerij toevoegen boven de beschrijving
- Nieuwe knop voor treinreservering toevoegen (vervangt "Visit Website")
- "Open in Maps" knop verbergen als er geen coordinates zijn

---

## Bestanden die Worden Aangepast

```text
+-------------------------------------------+
|           Aan te passen bestanden         |
+-------------------------------------------+
|                                           |
|  src/data/surroundings/walks.ts           |
|  - Foto URLs toevoegen                    |
|  - externalUrl verwijderen                |
|  - coordinates verwijderen                |
|  - trainBookingUrl toevoegen              |
|                                           |
+-------------------------------------------+
|                                           |
|  src/data/surroundings/types.ts           |
|  - trainBookingUrl veld toevoegen aan     |
|    WalkItem interface                     |
|                                           |
+-------------------------------------------+
|                                           |
|  src/locales/nl/surroundings.json         |
|  - Tekst herschrijven                     |
|  - Nieuwe vertaalsleutels toevoegen       |
|                                           |
+-------------------------------------------+
|                                           |
|  src/pages/SurroundingsDetail.tsx         |
|  - Foto galerij component toevoegen       |
|  - Treinreservering knop toevoegen        |
|  - Maps knop conditioneel tonen           |
|                                           |
+-------------------------------------------+
```

---

## Technische Details

### Nieuwe Type Definitie

```typescript
// In types.ts - WalkItem uitbreiden
export interface WalkItem extends SurroundingsItemBase {
  category: 'walks';
  duration: string;
  routeDistance: string;
  difficulty: Difficulty;
  buggyFriendly: boolean;
  trainBookingUrl?: string;  // Nieuw veld
}
```

### Foto Galerij Component

Een eenvoudige galerij met de bestaande Carousel component:
- Horizontaal scrollbare galerij
- Klikbare foto's voor grotere weergave
- Responsive design (1 foto mobiel, 3 desktop)

### NMBS Reserveringslink

De officiële link voor treintickets wordt:
`https://www.belgiantrain.be/nl`

---

## Verwacht Resultaat

Na implementatie toont de detailpagina:

1. **Hero sectie** met titel, korte beschrijving en badges (duur, afstand, moeilijkheid)
2. **Foto galerij** met 5 sfeerfoto's van de wandeling
3. **Uitgebreide beschrijving** met alle details over de route
4. **Route stappen** (genummerde lijst)
5. **Praktische info sidebar** met:
   - Afstand vanaf het huis
   - Wandelduur en -afstand
   - Buggy-informatie
   - Knop "Trein Reserveren" (linkt naar NMBS)
6. **Hoogtepunten badges** (Spoorwegbrug, Walzin strand, etc.)
7. **Tip box** met wachttip bij mooi weer

