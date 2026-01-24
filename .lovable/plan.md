

## WhatsApp Description Text Update

Update the WhatsApp contact option description across all four language files from the current text to "Direct contact - vóór, tijdens en na uw verblijf" and its translations.

### Changes Required

**Files to modify:**
1. `src/locales/nl/contact.json`
2. `src/locales/en/contact.json`
3. `src/locales/fr/contact.json`
4. `src/locales/de/contact.json`

### Translations

| Language | Current Text | New Text |
|----------|-------------|----------|
| **NL** | De beste manier van contact tijdens uw verblijf | Direct contact - vóór, tijdens en na uw verblijf |
| **EN** | The best way to contact us during your stay | Direct contact - before, during and after your stay |
| **FR** | Le meilleur moyen de nous contacter pendant votre séjour | Contact direct - avant, pendant et après votre séjour |
| **DE** | Der beste Weg, uns während Ihres Aufenthalts zu kontaktieren | Direkter Kontakt - vor, während und nach Ihrem Aufenthalt |

### Technical Details

Each file will have the `options.whatsapp.description` key updated with the new translated text. No structural changes are needed.

