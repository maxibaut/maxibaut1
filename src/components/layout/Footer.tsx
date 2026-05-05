import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin, Star, ExternalLink, Instagram } from 'lucide-react';
import { LocalizedLink } from '@/components/LocalizedLink';

export const Footer = () => {
  const { t } = useTranslation('common');

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-luxury section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & Description */}
          <div className="space-y-4">
            <img src="/logo-ardennest-dark.svg" alt={t('alt.logo')} width={120} height={40} loading="lazy" className="h-10" />
            <p className="text-primary-foreground/80 leading-relaxed">
              {t('footer.tagline')}
            </p>
            {/* Google Reviews Badge */}
            <a 
              href="https://www.google.com/travel/hotels/entity/CgoIvbmkjtmR3opzEAE/reviews?q=Ferme%20du%20Chateau%2C%20Gedinne%20Rue%20de%20la%20ferme%203%20Gedinne&hl=nl-BE&gl=be"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-4 pt-2 hover:opacity-80 transition-opacity"
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                <Star className="h-6 w-6 text-gold" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-serif font-semibold">4.8/5</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-gold text-gold"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-primary-foreground/80 flex items-center gap-1">
                  {t('footer.googleReviews')} <ExternalLink className="h-3 w-3" />
                </p>
                <p className="text-xs text-primary-foreground/80">50+ reviews</p>
              </div>
            </a>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <span className="block font-serif text-lg font-medium">{t('footer.contact')}</span>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-primary-foreground/80">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:+32478030352" className="hover:text-primary-foreground transition-colors">
                  +32 478 03 03 52
                </a>
              </li>
              <li className="flex items-center space-x-3 text-primary-foreground/80">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:bieke@ardennest.be" className="hover:text-primary-foreground transition-colors">
                  bieke@ardennest.be
                </a>
              </li>
              <li className="flex items-start space-x-3 text-primary-foreground/80">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <address className="not-italic leading-relaxed">
                  ArdenNest<br />
                  Rue de la Ferme 3<br />
                  5575 Gedinne<br />
                  {t('footer.country')}
                </address>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/ardennest.be"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <LocalizedLink
                  to="/homeowners"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  {t('footer.homeowners')}
                </LocalizedLink>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <nav aria-label={t('footer.quickLinks')} className="space-y-4">
            <span className="block font-serif text-lg font-medium">{t('footer.quickLinks')}</span>
            <ul className="space-y-3">
              <li>
                <LocalizedLink to="/property" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  {t('nav.property')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink to="/differentiators" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  {t('nav.differentiators')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink to="/surroundings" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  {t('nav.surroundings')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink to="/about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  {t('nav.about')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink to="/contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  {t('nav.contact')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink to="/booking" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  {t('nav.booking')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink to="/journal" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  {t('footer.journal')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink to="/journal/welkom-bij-ardennest" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  {t('footer.story')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink to="/surroundings/exclusive/ardennest-dropping" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  {t('footer.exclusiveActivities')}
                </LocalizedLink>
              </li>
            </ul>
          </nav>

          {/* Documents & Practical Info */}
          <nav aria-label={t('footer.documentsInfo')} className="space-y-4">
            <span className="block font-serif text-lg font-medium">{t('footer.documentsInfo')}</span>
            <ul className="space-y-3">
              <li>
                <LocalizedLink to="/house-rules" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  {t('footer.houseRules')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink to="/early-arrival" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  {t('footer.earlyArrival')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink to="/checklist" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  {t('footer.checklist')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink to="/rental-terms" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  {t('footer.rentalTerms')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink to="/cancellation-policy" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  {t('footer.cancellation')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink to="/shops" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  {t('footer.localTips')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink to="/privacy-policy" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  {t('footer.privacy')}
                </LocalizedLink>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20 space-y-3">
          <p className="text-sm text-primary-foreground/80 text-center">
            {t('footer.copyright')}
          </p>
          <nav aria-label="Taalversies" className="text-center text-sm text-primary-foreground/60">
            <span>{t('footer.alsoAvailableIn')} </span>
            <a href="/fr" className="hover:text-primary-foreground transition-colors">FR</a>
            <span className="mx-1.5">·</span>
            <a href="/en" className="hover:text-primary-foreground transition-colors">EN</a>
            <span className="mx-1.5">·</span>
            <a href="/de" className="hover:text-primary-foreground transition-colors">DE</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};
