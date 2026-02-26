import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SUPPORTED_LANGUAGES = ['nl', 'fr', 'en', 'de'] as const;
type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

/**
 * Returns the current language prefix for URLs.
 * NL (default) = no prefix, others = /fr, /en, /de
 */
export const useLanguagePrefix = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language as SupportedLanguage;

  const prefix = lang === 'nl' ? '' : `/${lang}`;

  /**
   * Converts a base path (e.g. "/property") to a localized path
   * e.g. "/fr/property" for French, "/property" for Dutch
   */
  const localizedPath = (basePath: string): string => {
    if (basePath === '/') {
      return prefix || '/';
    }
    return `${prefix}${basePath}`;
  };

  /**
   * Gets the path for a specific language version of the current or given path
   */
  const pathForLanguage = (basePath: string, targetLang: string): string => {
    if (targetLang === 'nl') {
      return basePath === '/' ? '/' : basePath;
    }
    return basePath === '/' ? `/${targetLang}` : `/${targetLang}${basePath}`;
  };

  /**
   * Extracts the base path (without language prefix) from a full path
   */
  const getBasePath = (fullPath: string): string => {
    for (const l of SUPPORTED_LANGUAGES) {
      if (l === 'nl') continue;
      if (fullPath === `/${l}`) return '/';
      if (fullPath.startsWith(`/${l}/`)) return fullPath.slice(l.length + 1);
    }
    return fullPath;
  };

  return { prefix, localizedPath, pathForLanguage, getBasePath, currentLang: lang };
};

export { SUPPORTED_LANGUAGES };
export type { SupportedLanguage };
