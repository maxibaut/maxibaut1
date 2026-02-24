import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, ChevronDown, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

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
    i18n.changeLanguage(code);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-luxury">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/logo-ardennest.png" alt="ArdenNest" className="h-10" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  location.pathname === item.path
                    ? 'text-primary'
                    : 'text-muted-foreground'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center space-x-4">
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
              <Link to="/booking">{t('nav.bookDirect')}</Link>
            </Button>

            {/* House Rules / Print Icon */}
            <Link
              to="/house-rules"
              className="flex items-center justify-center h-10 w-10 rounded-md border border-primary-foreground/30 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              aria-label={t('footer.houseRules')}
            >
              <Printer className="h-4 w-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border/40 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'text-base font-medium transition-colors hover:text-primary py-2',
                    location.pathname === item.path
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile Language Switcher */}
              <div className="flex items-center space-x-2 py-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
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
                  <Link to="/booking" onClick={() => setIsMenuOpen(false)}>
                    {t('nav.bookDirect')}
                  </Link>
                </Button>
                <Link
                  to="/house-rules"
                  className="flex items-center justify-center h-10 w-10 shrink-0 rounded-md border border-primary-foreground/30 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  aria-label={t('footer.houseRules')}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Printer className="h-4 w-4" />
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
