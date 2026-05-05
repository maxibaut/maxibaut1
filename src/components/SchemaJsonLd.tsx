import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Patches the static JSON-LD @graph in index.html with language-specific
 * description strings for VacationRental, WebSite, and host Persons.
 * Only `description` fields are updated — structural fields are untouched.
 */
const SchemaJsonLd = () => {
  const { t, i18n } = useTranslation('common');

  useEffect(() => {
    const scripts = document.querySelectorAll<HTMLScriptElement>(
      'script[type="application/ld+json"]'
    );

    scripts.forEach((script) => {
      if (script.id === 'faq-jsonld') return;
      try {
        const data = JSON.parse(script.textContent || '{}');
        if (!data || !Array.isArray(data['@graph'])) return;

        const vacationRental = t('schema.vacationRental.description', { defaultValue: '' });
        const website = t('schema.website.description', { defaultValue: '' });
        const bieke = t('schema.bieke.description', { defaultValue: '' });
        const christophe = t('schema.christophe.description', { defaultValue: '' });
        const business = t('schema.lodgingBusiness.description', { defaultValue: '' });

        let changed = false;
        for (const node of data['@graph']) {
          if (node['@id'] === 'https://ardennest.be/#vacationrental' && vacationRental) {
            node.description = vacationRental;
            changed = true;
          } else if (node['@id'] === 'https://ardennest.be/#website' && website) {
            node.description = website;
            changed = true;
          } else if (node['@id'] === 'https://ardennest.be/#bieke' && bieke) {
            node.description = bieke;
            changed = true;
          } else if (node['@id'] === 'https://ardennest.be/#christophe' && christophe) {
            node.description = christophe;
            changed = true;
          } else if (node['@id'] === 'https://ardennest.be/#business' && business) {
            node.description = business;
            changed = true;
          }
        }

        if (changed) {
          script.textContent = JSON.stringify(data);
        }
      } catch {
        // Ignore non-graph JSON-LD blocks
      }
    });
  }, [t, i18n.language]);

  return null;
};

export default SchemaJsonLd;
