

## Plan: Persoonlijke Ondertekening met Bieke's Naam

De header krijgt een persoonlijke touch door de tekst te structureren als een welkomstboodschap met Bieke's naam eronder, alsof het een persoonlijke notitie is.

---

### Nieuwe Structuur

```text
+--------------------------------------------------+
|  [Foto]   Contact                                |
|  Bieke    Ik help u graag verder                 |
|           — Bieke                                |
+--------------------------------------------------+
```

---

### Wijzigingen

**1. Vertaalbestanden aanpassen**

Nieuwe subtitle teksten met ondertekening:

| Taal | Bestand | Nieuwe subtitle |
|------|---------|-----------------|
| NL | `src/locales/nl/contact.json` | "Ik help u graag verder" |
| EN | `src/locales/en/contact.json` | "I'm happy to help" |
| FR | `src/locales/fr/contact.json` | "Je suis là pour vous aider" |
| DE | `src/locales/de/contact.json` | "Ich helfe Ihnen gerne weiter" |

Plus een nieuwe key `signature` toevoegen met waarde `"Bieke"` in elk bestand.

**2. Contact.tsx aanpassen**

In de hero sectie een extra regel toevoegen onder de subtitle:

```tsx
<p className="body-large text-primary-foreground/80">{t('subtitle')}</p>
<p className="text-lg text-primary-foreground/70 mt-2 italic">— {t('signature')}</p>
```

---

### Resultaat

De bezoeker ziet nu een persoonlijke welkomstboodschap die direct gekoppeld is aan de foto van Bieke, met haar naam als handtekening eronder. Dit versterkt de persoonlijke hospitality die ArdenNest kenmerkt.

