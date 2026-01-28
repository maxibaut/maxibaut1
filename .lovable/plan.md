
# Achtergrondafbeelding met donkere overlay

## Wat gaan we doen?

De eerste foto van de galerij gebruiken als achtergrondafbeelding in de Hero Section, met een semi-transparante donkere overlay zodat de witte tekst goed leesbaar blijft.

## Visueel effect

```text
+--------------------------------------------------+
|  [Foto als achtergrond - bijv. kasteel Walzin]   |
|  +----------------------------------------------+|
|  |  Donkere overlay (bg-black/60)               ||
|  |                                              ||
|  |  ← Terug naar overzicht                      ||
|  |                                              ||
|  |  🚶 Wandelingen                               ||
|  |                                              ||
|  |  Treinwandeling Anseremme - Gendron          ||
|  |  Een prachtige wandeling langs de Lesse...   ||
|  |                                              ||
|  |  📍 15 min  ⏱️ 3 uur  🟢 Makkelijk            ||
|  +----------------------------------------------+|
+--------------------------------------------------+
```

## Te bewerken bestand

| Bestand | Wijziging |
|---------|-----------|
| `src/pages/SurroundingsDetail.tsx` | Hero section aanpassen met achtergrondafbeelding en overlay |

## Technische implementatie

### Stap 1: Hero section structuur aanpassen

De huidige `<section>` tag krijgt:
- `relative` positioning voor de overlay
- `overflow-hidden` om de afbeelding te begrenzen
- Inline style voor `backgroundImage` met de eerste foto

### Stap 2: Overlay div toevoegen

Een absolute positioned div direct na de section opening:
- `absolute inset-0` om de hele sectie te bedekken
- `bg-black/60` voor 60% donkere overlay (aanpasbaar naar 50-70%)
- `z-0` zodat content erboven komt

### Stap 3: Content z-index

De container div krijgt `relative z-10` zodat alle content boven de overlay verschijnt.

### Stap 4: Fallback

Als `item.images` leeg is of niet bestaat:
- Geen `backgroundImage` instellen
- Overlay wordt dan gewoon over de effen primary kleur getoond
- Visueel geen verschil met de huidige situatie

## Code wijziging

Van:
```tsx
<section className="bg-primary text-primary-foreground section-padding">
  <div className="container-luxury">
```

Naar:
```tsx
<section 
  className="bg-primary text-primary-foreground section-padding relative overflow-hidden"
  style={item.images?.[0] ? {
    backgroundImage: `url(${item.images[0]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  } : undefined}
>
  {/* Donkere overlay voor leesbaarheid */}
  <div className="absolute inset-0 bg-black/60 z-0" />
  
  <div className="container-luxury relative z-10">
```

## Voordelen

- Foto subtiel zichtbaar op de achtergrond
- Tekst blijft helder en goed leesbaar door de overlay
- Past bij de "quiet luxury" stijl van de website
- Automatisch responsive door `background-size: cover`
- Graceful fallback als er geen foto's zijn
