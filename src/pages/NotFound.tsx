import { useLocation } from "react-router-dom";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
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
      {/* Full Screen Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{ 
          backgroundImage: `url(${tunnelImage})`,
          backgroundPosition: 'center 60%'
        }}
        role="img"
        aria-label={t('notFound.tunnelImageAlt', 'Tunnel de Sart-Custinne - historische spoorwegtunnel omgebouwd tot fietspad RAVeL')}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Text overlay - Top */}
      <div className="relative z-10 text-center px-6 max-w-2xl pt-16 md:pt-24">
        <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
          {t('notFound.heading', 'Fout 404')}
        </h1>
        <p className="text-2xl md:text-3xl text-white font-medium mb-2 drop-shadow-md">
          {t('notFound.title')}
        </p>
        <p className="text-xl md:text-2xl text-white/90 font-medium mb-6 drop-shadow-md italic">
          {t('notFound.orDoesIt')}
        </p>
        
        <Button asChild size="lg" className="gap-2">
          <Link to="/">
            <Home className="h-5 w-5" />
            {t('notFound.backHome')}
          </Link>
        </Button>
      </div>

      {/* Tunnel Info - Bottom */}
      <div className="absolute bottom-6 left-4 right-4 md:bottom-8 md:left-8 md:right-8 z-10">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg px-5 py-4 text-left max-w-xl mx-auto md:mx-0">
          <p className="text-white font-semibold text-base md:text-lg mb-2">{t('notFound.tunnelName')}</p>
          <ul className="text-white/80 text-xs md:text-sm space-y-1">
            <li>• {t('notFound.railwayLine')}</li>
            <li>• {t('notFound.outOfService')}</li>
            <li>• {t('notFound.nowRavel')}</li>
            <li>• {t('notFound.distance')}</li>
            <li>
              • <a 
                  href="https://maps.app.goo.gl/vffkvX1b6Z6qfDoPA" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline hover:text-white transition-colors"
                >
                  {t('notFound.viewOnMap')}
                </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
