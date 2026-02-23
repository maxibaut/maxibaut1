

## Aanpassing TrustSignals op de homepage

Twee wijzigingen in de trust signals balk:

### 1. Ervaring: verwijzing naar 2003 i.p.v. "22 jaar"
- "22 jaar ervaring" wordt vervangen door "Sinds 2003" (of equivalent per taal)
- De subtekst "Al 22 jaar verwelkomen wij families" wordt iets als "Families verwelkomen sinds 2003"
- Voordeel: dit veroudert niet elk jaar

### 2. Capaciteit-subtekst: relevanter voor 26 personen
- "Ensuite badkamers, professionele keuken" wordt vervangen door iets als "Gemengde groepen van klein tot groot"
- Dit sluit beter aan bij het MdFamilyRestroom-icoon en het getal 26

### Bestanden die aangepast worden

| Bestand | Wat verandert |
|---------|---------------|
| `src/locales/nl/homepage.json` | `trust.experience`, `trust.experienceDetail`, `trust.capacityDetail` |
| `src/locales/en/homepage.json` | Idem, Engelse vertaling |
| `src/locales/fr/homepage.json` | Idem, Franse vertaling |
| `src/locales/de/homepage.json` | Idem, Duitse vertaling |

### Concrete teksten

**NL:**
- experience: "Sinds 2003"
- experienceDetail: "Families verwelkomen sinds 2003"
- capacityDetail: "Gemengde groepen van klein tot groot"

**EN:**
- experience: "Since 2003"
- experienceDetail: "Welcoming families since 2003"
- capacityDetail: "Mixed groups from small to large"

**FR:**
- experience: "Depuis 2003"
- experienceDetail: "Accueillir des familles depuis 2003"
- capacityDetail: "Groupes mixtes, des petits aux grands"

**DE:**
- experience: "Seit 2003"
- experienceDetail: "Familien willkommen seit 2003"
- capacityDetail: "Gemischte Gruppen von klein bis groß"

Geen componenten hoeven aangepast te worden -- alleen de vertalingsbestanden.
