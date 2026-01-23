import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Dutch translations (primary)
import nlCommon from '@/locales/nl/common.json';
import nlHomepage from '@/locales/nl/homepage.json';
import nlProperty from '@/locales/nl/property.json';
import nlAbout from '@/locales/nl/about.json';
import nlContact from '@/locales/nl/contact.json';
import nlBooking from '@/locales/nl/booking.json';

// French translations
import frCommon from '@/locales/fr/common.json';
import frHomepage from '@/locales/fr/homepage.json';
import frProperty from '@/locales/fr/property.json';
import frAbout from '@/locales/fr/about.json';
import frContact from '@/locales/fr/contact.json';
import frBooking from '@/locales/fr/booking.json';

// English translations
import enCommon from '@/locales/en/common.json';
import enHomepage from '@/locales/en/homepage.json';
import enProperty from '@/locales/en/property.json';
import enAbout from '@/locales/en/about.json';
import enContact from '@/locales/en/contact.json';
import enBooking from '@/locales/en/booking.json';

// German translations
import deCommon from '@/locales/de/common.json';
import deHomepage from '@/locales/de/homepage.json';
import deProperty from '@/locales/de/property.json';
import deAbout from '@/locales/de/about.json';
import deContact from '@/locales/de/contact.json';
import deBooking from '@/locales/de/booking.json';

const resources = {
  nl: {
    common: nlCommon,
    homepage: nlHomepage,
    property: nlProperty,
    about: nlAbout,
    contact: nlContact,
    booking: nlBooking,
  },
  fr: {
    common: frCommon,
    homepage: frHomepage,
    property: frProperty,
    about: frAbout,
    contact: frContact,
    booking: frBooking,
  },
  en: {
    common: enCommon,
    homepage: enHomepage,
    property: enProperty,
    about: enAbout,
    contact: enContact,
    booking: enBooking,
  },
  de: {
    common: deCommon,
    homepage: deHomepage,
    property: deProperty,
    about: deAbout,
    contact: deContact,
    booking: deBooking,
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
    ns: ['common', 'homepage', 'property', 'about', 'contact', 'booking'],
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
