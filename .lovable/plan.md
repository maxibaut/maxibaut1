

## Plan: Split Hero met Foto voor Contact Pagina

De huidige hero sectie is een eenvoudige banner met tekst. We gaan dit vervangen door een elegante split layout met de foto van Bieke aan de ene kant en de titel/subtitel aan de andere kant.

---

### Wijzigingen

**Bestand: `src/pages/Contact.tsx`**

1. **Verwijder de huidige foto-card** uit de contact options grid (regels 125-134)

2. **Zet het grid terug naar 3 kolommen** voor de contact opties (telefoon, email, WhatsApp)

3. **Herontwerp de hero sectie** met een split layout:
   - **Links**: De foto van Bieke, volledig beeldvullend met een subtiele afgeronde hoek
   - **Rechts**: De titel "Contact" en subtitel met de huidige "quiet luxury" styling
   - **Responsive**: Op mobiel stapelen de elementen verticaal (foto bovenaan)
   - **Hoogte**: De sectie krijgt een minimale hoogte zodat de foto goed tot zijn recht komt

---

### Technische Details

```text
+------------------------------------------+
|                                          |
|  +----------------+  +----------------+  |
|  |                |  |                |  |
|  |   Foto Bieke   |  |    Contact     |  |
|  |   (object-     |  |    --------    |  |
|  |    cover)      |  |  We helpen u   |  |
|  |                |  |  graag verder  |  |
|  +----------------+  +----------------+  |
|                                          |
+------------------------------------------+
```

**Layout specificaties:**
- Grid met `lg:grid-cols-2` voor de split layout
- Foto: `aspect-[4/3]` op desktop, `aspect-[16/9]` op mobiel
- Afgeronde hoeken met `rounded-lg` voor een zachte uitstraling
- Behoud van de `bg-primary` achtergrond voor de tekst-sectie
- Tekst verticaal gecentreerd met `flex items-center justify-center`

---

### Voordelen van deze aanpak

- **Visueel aantrekkelijk**: De foto van de gastvrouw creëert direct een persoonlijke connectie
- **Consistent met brand**: Past bij de "quiet luxury" esthetiek en de persoonlijke hospitality filosofie
- **Professionele uitstraling**: Een split hero is een moderne, elegante layout die veel premium vakantiewoningen gebruiken
- **Betere balans**: De contact opties blijven netjes in een 3-koloms grid zonder gedwongen vierde element

