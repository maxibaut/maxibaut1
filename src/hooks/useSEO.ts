import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

interface SEOConfig {
  titleKey?: string;
  descriptionKey?: string;
  namespace?: string;
  noIndex?: boolean;
}

const BASE_URL = 'https://ardennest.be';
const SUPPORTED_LANGUAGES = ['nl', 'fr', 'en', 'de'];

// Default SEO per route
const routeSEOConfig: Record<string, SEOConfig> = {
  '/': {
    titleKey: 'seo.title',
    descriptionKey: 'seo.description',
    namespace: 'homepage',
  },
  '/property': {
    titleKey: 'seo.title',
    descriptionKey: 'seo.description',
    namespace: 'property',
  },
  '/differentiators': {
    titleKey: 'seo.title',
    descriptionKey: 'seo.description',
    namespace: 'homepage',
  },
  '/about': {
    titleKey: 'seo.title',
    descriptionKey: 'seo.description',
    namespace: 'about',
  },
  '/contact': {
    titleKey: 'seo.title',
    descriptionKey: 'seo.description',
    namespace: 'contact',
  },
  '/booking': {
    titleKey: 'seo.title',
    descriptionKey: 'seo.description',
    namespace: 'booking',
  },
  '/surroundings': {
    titleKey: 'seo.title',
    descriptionKey: 'seo.description',
    namespace: 'surroundings',
  },
  '/house-rules': {
    titleKey: 'seo.title',
    descriptionKey: 'seo.description',
    namespace: 'houseRules',
  },
  '/checklist': {
    titleKey: 'seo.title',
    descriptionKey: 'seo.description',
    namespace: 'checklist',
  },
  '/shops': {
    titleKey: 'seo.title',
    descriptionKey: 'seo.description',
    namespace: 'localTips',
  },
  '/early-arrival': {
    titleKey: 'seo.title',
    descriptionKey: 'seo.description',
    namespace: 'earlyArrival',
  },
  '/rental-terms': {
    titleKey: 'seo.title',
    descriptionKey: 'seo.description',
    namespace: 'rentalTerms',
  },
  '/cancellation-policy': {
    titleKey: 'seo.title',
    descriptionKey: 'seo.description',
    namespace: 'cancellationPolicy',
  },
  '/privacy-policy': {
    titleKey: 'seo.title',
    descriptionKey: 'seo.description',
    namespace: 'privacy',
  },
};

export const useSEO = (customConfig?: SEOConfig) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const currentLang = i18n.language;
  
  useEffect(() => {
    const pathname = location.pathname;
    const config = customConfig || routeSEOConfig[pathname] || {};
    
    // Get title and description
    let title = 'ArdenNest | Vakantiewoning in de Ardennen';
    let description = 'Quiet luxury voor momenten samen. Al sinds 2003 verwelkomen wij families in de Ardennen.';
    
    if (config.titleKey && config.namespace) {
      const translatedTitle = t(config.titleKey, { ns: config.namespace, defaultValue: '' });
      if (translatedTitle) {
        title = translatedTitle;
      }
    }
    
    if (config.descriptionKey && config.namespace) {
      const translatedDesc = t(config.descriptionKey, { ns: config.namespace, defaultValue: '' });
      if (translatedDesc) {
        description = translatedDesc;
      }
    }
    
    // Update document title
    document.title = title;
    
    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);
    
    // Update OG tags
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:url', `${BASE_URL}${pathname}`);
    
    // Update Twitter tags
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    
    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${BASE_URL}${pathname}`);
    
    // Update hreflang tags
    updateHreflangTags(pathname, currentLang);
    
    // Update robots meta if noIndex
    if (config.noIndex) {
      updateMetaTag('robots', 'noindex, nofollow');
    } else {
      removeMetaTag('robots');
    }
    
    // Update html lang attribute
    document.documentElement.lang = currentLang;
    
  }, [location.pathname, currentLang, t, customConfig]);
};

function updateMetaTag(property: string, content: string) {
  const isOgOrTwitter = property.startsWith('og:') || property.startsWith('twitter:');
  const selector = isOgOrTwitter 
    ? `meta[property="${property}"]` 
    : `meta[name="${property}"]`;
  
  let meta = document.querySelector(selector);
  
  if (!meta) {
    meta = document.createElement('meta');
    if (isOgOrTwitter) {
      meta.setAttribute('property', property);
    } else {
      meta.setAttribute('name', property);
    }
    document.head.appendChild(meta);
  }
  
  meta.setAttribute('content', content);
}

function removeMetaTag(name: string) {
  const meta = document.querySelector(`meta[name="${name}"]`);
  if (meta) {
    meta.remove();
  }
}

function updateHreflangTags(pathname: string, currentLang: string) {
  // Remove existing hreflang tags
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
  
  // Add hreflang tags for each language
  SUPPORTED_LANGUAGES.forEach(lang => {
    const link = document.createElement('link');
    link.setAttribute('rel', 'alternate');
    link.setAttribute('hreflang', lang);
    
    // For the current language, no query param needed
    // For others, add ?lang= param
    const href = lang === 'nl' 
      ? `${BASE_URL}${pathname}`
      : `${BASE_URL}${pathname}${pathname.includes('?') ? '&' : '?'}lang=${lang}`;
    
    link.setAttribute('href', href);
    document.head.appendChild(link);
  });
  
  // Add x-default (points to Dutch as default)
  const xDefault = document.createElement('link');
  xDefault.setAttribute('rel', 'alternate');
  xDefault.setAttribute('hreflang', 'x-default');
  xDefault.setAttribute('href', `${BASE_URL}${pathname}`);
  document.head.appendChild(xDefault);
}

export default useSEO;
