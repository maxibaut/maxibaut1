import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin, Star, ExternalLink } from 'lucide-react';

export const Footer = () => {
  const { t } = useTranslation('common');

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-luxury section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & Description */}
          <div className="space-y-4">
            <img src="/logo-ardennest.png" alt="ArdenNest" className="h-10 brightness-0 invert" />
            <p className="text-primary-foreground/80 leading-relaxed">
              {t('footer.tagline')}
            </p>
            {/* Google Reviews Badge */}
            <a 
              href="https://www.google.com/travel/hotels/entity/CgoIvbmkjtmR3opzEAE/reviews?q=Ferme%20du%20Chateau%2C%20Malvoisin%20Rue%20de%20la%20ferme%203%20Malvoisin&hl=nl-BE&gl=be"
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
                <p className="text-xs text-primary-foreground/60">50+ reviews</p>
              </div>
            </a>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-medium">{t('footer.contact')}</h4>
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
                <span>{t('footer.location')}</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-medium">{t('footer.quickLinks')}</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/property"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  {t('nav.property')}
                </Link>
              </li>
              <li>
                <Link
                  to="/booking"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  {t('nav.booking')}
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
            
            {/* Homeowners Link - with spacing */}
            <div className="pt-4">
              <Link
                to="/about"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                {t('footer.homeowners')}
              </Link>
            </div>
          </div>

          {/* Documents & Practical Info */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-medium">{t('footer.documentsInfo')}</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/house-rules"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  {t('footer.houseRules')}
                </Link>
              </li>
              <li>
                <Link
                  to="/early-arrival"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  {t('footer.earlyArrival')}
                </Link>
              </li>
              <li>
                <Link
                  to="/checklist"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  {t('footer.checklist')}
                </Link>
              </li>
              <li>
                <Link
                  to="/rental-terms"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  {t('footer.rentalTerms')}
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  {t('footer.cancellation')}
                </a>
              </li>
              <li>
                <Link
                  to="/shops"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  {t('footer.localTips')}
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  {t('footer.privacy')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <p className="text-sm text-primary-foreground/60 text-center">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};
