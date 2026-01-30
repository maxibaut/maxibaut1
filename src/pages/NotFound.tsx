import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import tunnelImage from "@/assets/404-tunnel.jpg";

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation('common');

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${tunnelImage})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl">
        <h1 className="font-serif text-8xl md:text-9xl font-bold text-white mb-4 drop-shadow-lg">
          404
        </h1>
        <p className="text-2xl md:text-3xl text-white font-medium mb-2 drop-shadow-md">
          {t('notFound.title')}
        </p>
        <p className="text-lg text-white/80 mb-8 drop-shadow-sm">
          {t('notFound.subtitle')}
        </p>
        <Button asChild size="lg" className="gap-2">
          <Link to="/">
            <Home className="h-5 w-5" />
            {t('notFound.backHome')}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
