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
import nlLocalTips from '@/locales/nl/localTips.json';
import nlEarlyArrival from '@/locales/nl/earlyArrival.json';
import nlPrivacy from '@/locales/nl/privacy.json';
import nlRentalTerms from '@/locales/nl/rentalTerms.json';
import nlCancellationPolicy from '@/locales/nl/cancellationPolicy.json';
import nlHomeowners from '@/locales/nl/homeowners.json';
import nlJournal from '@/locales/nl/journal.json';

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
import frLocalTips from '@/locales/fr/localTips.json';
import frEarlyArrival from '@/locales/fr/earlyArrival.json';
import frPrivacy from '@/locales/fr/privacy.json';
import frRentalTerms from '@/locales/fr/rentalTerms.json';
import frCancellationPolicy from '@/locales/fr/cancellationPolicy.json';
import frHomeowners from '@/locales/fr/homeowners.json';
import frJournal from '@/locales/fr/journal.json';

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
import enLocalTips from '@/locales/en/localTips.json';
import enEarlyArrival from '@/locales/en/earlyArrival.json';
import enPrivacy from '@/locales/en/privacy.json';
import enRentalTerms from '@/locales/en/rentalTerms.json';
import enCancellationPolicy from '@/locales/en/cancellationPolicy.json';
import enHomeowners from '@/locales/en/homeowners.json';
import enJournal from '@/locales/en/journal.json';

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
import deLocalTips from '@/locales/de/localTips.json';
import deEarlyArrival from '@/locales/de/earlyArrival.json';
import dePrivacy from '@/locales/de/privacy.json';
import deRentalTerms from '@/locales/de/rentalTerms.json';
import deCancellationPolicy from '@/locales/de/cancellationPolicy.json';
import deHomeowners from '@/locales/de/homeowners.json';
import deJournal from '@/locales/de/journal.json';

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
    localTips: nlLocalTips,
    earlyArrival: nlEarlyArrival,
    privacy: nlPrivacy,
    rentalTerms: nlRentalTerms,
    cancellationPolicy: nlCancellationPolicy,
    homeowners: nlHomeowners,
    journal: nlJournal,
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
    localTips: frLocalTips,
    earlyArrival: frEarlyArrival,
    privacy: frPrivacy,
    rentalTerms: frRentalTerms,
    cancellationPolicy: frCancellationPolicy,
    homeowners: frHomeowners,
    journal: frJournal,
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
    localTips: enLocalTips,
    earlyArrival: enEarlyArrival,
    privacy: enPrivacy,
    rentalTerms: enRentalTerms,
    cancellationPolicy: enCancellationPolicy,
    homeowners: enHomeowners,
    journal: enJournal,
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
    localTips: deLocalTips,
    earlyArrival: deEarlyArrival,
    privacy: dePrivacy,
    rentalTerms: deRentalTerms,
    cancellationPolicy: deCancellationPolicy,
    homeowners: deHomeowners,
  },
};
const SUPPORTED_LANGUAGES = ['nl', 'fr', 'en', 'de'];

// Detect language from URL path first, then stored preference, then browser
const getDefaultLanguage = (): string => {
  // Check URL path for language prefix
  const pathLang = window.location.pathname.split('/')[1];
  if (pathLang && SUPPORTED_LANGUAGES.includes(pathLang)) {
    return pathLang;
  }

  // Check query param (legacy support)
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get('lang');
  if (langParam && SUPPORTED_LANGUAGES.includes(langParam)) {
    return langParam;
  }

  const stored = localStorage.getItem('ardennest-language');
  if (stored && SUPPORTED_LANGUAGES.includes(stored)) {
    return stored;
  }
  
  const browserLang = navigator.language.split('-')[0];
  if (SUPPORTED_LANGUAGES.includes(browserLang)) {
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
    ns: ['common', 'homepage', 'property', 'about', 'contact', 'booking', 'surroundings', 'houseRules', 'checklist', 'localTips', 'earlyArrival', 'privacy', 'rentalTerms', 'cancellationPolicy', 'homeowners'],
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
