import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Dutch translations (primary)
import nlCommon from '@/locales/nl/common.json';
import nlHomepage from '@/locales/nl/homepage.json';
import nlProperty from '@/locales/nl/property.json';
import nlAbout from '@/locales/nl/about.json';
import nlContact from '@/locales/nl/contact.json';
import nlBooking from '@/locales/nl/booking.json';
import nlSurroundings from '@/locales/nl/surroundings.json';
import nlHouseRules from '@/locales/nl/houseRules.json';
import nlChecklist from '@/locales/nl/checklist.json';

// French translations
import frCommon from '@/locales/fr/common.json';
import frHomepage from '@/locales/fr/homepage.json';
import frProperty from '@/locales/fr/property.json';
import frAbout from '@/locales/fr/about.json';
import frContact from '@/locales/fr/contact.json';
import frBooking from '@/locales/fr/booking.json';
import frSurroundings from '@/locales/fr/surroundings.json';
import frHouseRules from '@/locales/fr/houseRules.json';
import frChecklist from '@/locales/fr/checklist.json';

// English translations
import enCommon from '@/locales/en/common.json';
import enHomepage from '@/locales/en/homepage.json';
import enProperty from '@/locales/en/property.json';
import enAbout from '@/locales/en/about.json';
import enContact from '@/locales/en/contact.json';
import enBooking from '@/locales/en/booking.json';
import enSurroundings from '@/locales/en/surroundings.json';
import enHouseRules from '@/locales/en/houseRules.json';
import enChecklist from '@/locales/en/checklist.json';

// German translations
import deCommon from '@/locales/de/common.json';
import deHomepage from '@/locales/de/homepage.json';
import deProperty from '@/locales/de/property.json';
import deAbout from '@/locales/de/about.json';
import deContact from '@/locales/de/contact.json';
import deBooking from '@/locales/de/booking.json';
import deSurroundings from '@/locales/de/surroundings.json';
import deHouseRules from '@/locales/de/houseRules.json';
import deChecklist from '@/locales/de/checklist.json';

const resources = {
  nl: {
    common: nlCommon,
    homepage: nlHomepage,
    property: nlProperty,
    about: nlAbout,
    contact: nlContact,
    booking: nlBooking,
    surroundings: nlSurroundings,
    houseRules: nlHouseRules,
    checklist: nlChecklist,
  },
  fr: {
    common: frCommon,
    homepage: frHomepage,
    property: frProperty,
    about: frAbout,
    contact: frContact,
    booking: frBooking,
    surroundings: frSurroundings,
    houseRules: frHouseRules,
    checklist: frChecklist,
  },
  en: {
    common: enCommon,
    homepage: enHomepage,
    property: enProperty,
    about: enAbout,
    contact: enContact,
    booking: enBooking,
    surroundings: enSurroundings,
    houseRules: enHouseRules,
    checklist: enChecklist,
  },
  de: {
    common: deCommon,
    homepage: deHomepage,
    property: deProperty,
    about: deAbout,
    contact: deContact,
    booking: deBooking,
    surroundings: deSurroundings,
    houseRules: deHouseRules,
    checklist: deChecklist,
  },
};

// Detect browser language or use stored preference
const getDefaultLanguage = (): string => {
  const stored = localStorage.getItem('ardennest-language');
  if (stored && ['nl', 'fr', 'en', 'de'].includes(stored)) {
    return stored;
  }
  
  const browserLang = navigator.language.split('-')[0];
  if (['nl', 'fr', 'en', 'de'].includes(browserLang)) {
    return browserLang;
  }
  
  return 'nl'; // Default to Dutch
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getDefaultLanguage(),
    fallbackLng: 'nl',
    defaultNS: 'common',
    ns: ['common', 'homepage', 'property', 'about', 'contact', 'booking', 'surroundings', 'houseRules', 'checklist'],
    interpolation: {
      escapeValue: false,
    },
  });

// Save language preference when changed
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('ardennest-language', lng);
  document.documentElement.lang = lng;
});

export default i18n;
