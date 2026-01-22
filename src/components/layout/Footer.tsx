import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin, Star } from 'lucide-react';

export const Footer = () => {
  const { t } = useTranslation('common');

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-luxury section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & Description */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-semibold">ArdenNest</h3>
            <p className="text-primary-foreground/80 leading-relaxed">
              Quiet luxury voor momenten samen. Al 17 jaar verwelkomen wij families in de Ardennen.
            </p>
            {/* Google Reviews Badge */}
            <div className="flex items-center space-x-2 pt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < 5 ? 'fill-gold text-gold' : 'text-primary-foreground/40'}`}
                  />
                ))}
              </div>
              <span className="text-sm text-primary-foreground/80">
                4.8/5 {t('footer.stars')} • 50+ reviews
              </span>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-medium">{t('footer.contact')}</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-primary-foreground/80">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:+32123456789" className="hover:text-primary-foreground transition-colors">
                  +32 123 45 67 89
                </a>
              </li>
              <li className="flex items-center space-x-3 text-primary-foreground/80">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:info@ardennest.be" className="hover:text-primary-foreground transition-colors">
                  info@ardennest.be
                </a>
              </li>
              <li className="flex items-start space-x-3 text-primary-foreground/80">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>Ardennen, België</span>
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
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-medium">Legal</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  {t('footer.houseRules')}
                </a>
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
                <a
                  href="#"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  {t('footer.privacy')}
                </a>
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
