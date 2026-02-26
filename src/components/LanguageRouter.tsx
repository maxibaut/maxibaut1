import { useEffect } from 'react';
import { Outlet, useParams, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SUPPORTED_LANGUAGES = ['nl', 'fr', 'en', 'de'];

/**
 * Layout component that syncs URL language prefix to i18n.
 * Used as wrapper for all routes under /:lang? pattern.
 */
export const LanguageLayout = () => {
  const { lang } = useParams<{ lang?: string }>();
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const targetLang = lang && SUPPORTED_LANGUAGES.includes(lang) ? lang : 'nl';
    if (i18n.language !== targetLang) {
      i18n.changeLanguage(targetLang);
    }
  }, [lang, i18n]);

  return <Outlet />;
};

/**
 * Redirects old ?lang= query parameter URLs to new path-based URLs.
 * E.g. /property?lang=fr → /fr/property
 */
export const QueryParamRedirect = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const langParam = searchParams.get('lang');

  if (langParam && SUPPORTED_LANGUAGES.includes(langParam) && langParam !== 'nl') {
    // Remove the lang param from search
    searchParams.delete('lang');
    const remainingSearch = searchParams.toString();
    const newPath = `/${langParam}${location.pathname}${remainingSearch ? `?${remainingSearch}` : ''}`;
    return <Navigate to={newPath} replace />;
  }

  // If lang=nl, just remove the param
  if (langParam === 'nl') {
    searchParams.delete('lang');
    const remainingSearch = searchParams.toString();
    const newPath = `${location.pathname}${remainingSearch ? `?${remainingSearch}` : ''}`;
    return <Navigate to={newPath} replace />;
  }

  return null;
};
