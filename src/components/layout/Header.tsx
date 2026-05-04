import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, ChevronDown, Printer, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { LocalizedLink } from '@/components/LocalizedLink';
import { useLanguagePrefix } from '@/hooks/useLanguagePrefix';

const languages = [
  { code: 'nl', label: 'NL', flag: '🇳🇱' },
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'de', label: 'DE', flag: '🇩🇪' },
];

export const Header = () => {
  const { t, i18n } = useTranslation('common');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { getBasePath, pathForLanguage } = useLanguagePrefix();

  const navItems = [
    { path: '/', label: t('nav.home') },
    { path: '/property', label: t('nav.property') },
    { path: '/differentiators', label: t('nav.differentiators') },
    { path: '/surroundings', label: t('nav.surroundings') },
    { path: '/about', label: t('nav.about') },
    { path: '/contact', label: t('nav.contact') },
  ];

  const currentLanguage = languages.find((l) => l.code === i18n.language) || languages[0];

  const changeLanguage = (code: string) => {
    // Get the base path without current language prefix
    const basePath = getBasePath(location.pathname);
    // Navigate to the new language path
    const newPath = pathForLanguage(basePath, code);
    i18n.changeLanguage(code);
    navigate(newPath);
  };

  // Check if current path matches a nav item (accounting for language prefix)
  const isActive = (itemPath: string) => {
    const basePath = getBasePath(location.pathname);
    return basePath === itemPath;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background">
      <div className="container-luxury">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <LocalizedLink to="/" className="flex items-center">
            <img src="/logo-ardennest.png" alt="ArdenNest logo — vakantiewoning voor groepen in de Ardennen" width={120} height={40} className="h-10" />
          </LocalizedLink>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8" aria-label="Hoofdnavigatie">
            {navItems.map((item) => (
              <LocalizedLink
                key={item.path}
                to={item.path}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  isActive(item.path)
                    ? 'text-primary'
                    : 'text-muted-foreground'
                )}
              >
                {item.label}
              </LocalizedLink>
            ))}
          </nav>

          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Click-to-call */}
            <a
              href="tel:+32478030352"
              className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
              aria-label={t('nav.callAria')}
            >
              <Phone className="h-4 w-4" />
              <span>+32 478 03 03 52</span>
            </a>

            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  <span>{currentLanguage.label}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={cn(
                      'cursor-pointer',
                      i18n.language === lang.code && 'bg-accent'
                    )}
                    >
                    {t(`language.${lang.code}`)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Book Direct CTA */}
            <Button asChild className="bg-primary hover:bg-primary/90">
              <LocalizedLink to="/booking">{t('nav.bookDirect')}</LocalizedLink>
            </Button>

            {/* House Rules / Print Icon */}
            <LocalizedLink
              to="/house-rules"
              className="flex items-center justify-center h-10 w-10 rounded-md border border-primary-foreground/30 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              aria-label={t('footer.houseRules')}
            >
              <Printer className="h-4 w-4" />
            </LocalizedLink>
          </div>

          {/* Mobile Right Side */}
          <div className="flex items-center gap-1 lg:hidden">
            <a
              href="tel:+32478030352"
              className="flex items-center justify-center h-11 w-11 rounded-md text-foreground hover:text-primary transition-colors"
              aria-label={t('nav.callAria')}
            >
              <Phone className="h-5 w-5" />
            </a>
            <button
              className="p-2 h-11 w-11 flex items-center justify-center"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border/40 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <LocalizedLink
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'text-base font-medium transition-colors hover:text-primary py-2',
                    isActive(item.path)
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </LocalizedLink>
              ))}
              
              {/* Mobile Language Switcher */}
              <div className="flex items-center space-x-2 py-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      changeLanguage(lang.code);
                      setIsMenuOpen(false);
                    }}
                    className={cn(
                      'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
                      i18n.language === lang.code
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-accent'
                    )}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>

              {/* Mobile Book CTA + Printer Button */}
              <div className="flex items-center gap-2 mt-2">
                <Button asChild className="flex-1">
                  <LocalizedLink to="/booking" onClick={() => setIsMenuOpen(false)}>
                    {t('nav.bookDirect')}
                  </LocalizedLink>
                </Button>
                <LocalizedLink
                  to="/house-rules"
                  className="flex items-center justify-center h-10 w-10 shrink-0 rounded-md border border-primary-foreground/30 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  aria-label={t('footer.houseRules')}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Printer className="h-4 w-4" />
                </LocalizedLink>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
