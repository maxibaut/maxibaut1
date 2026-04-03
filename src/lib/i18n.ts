import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

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
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    lng: getDefaultLanguage(),
    fallbackLng: 'nl',
    defaultNS: 'common',
    ns: ['common', 'homepage', 'property', 'about', 'contact', 'booking', 'surroundings', 'houseRules', 'checklist', 'localTips', 'earlyArrival', 'privacy', 'rentalTerms', 'cancellationPolicy', 'homeowners', 'journal'],
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
