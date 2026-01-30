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
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12">
      {/* Tunnel Image Container */}
      <div className="relative w-full max-w-4xl aspect-[4/3] md:aspect-[16/10] rounded-xl overflow-hidden shadow-2xl">
        <div 
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{ 
            backgroundImage: `url(${tunnelImage})`,
            backgroundPosition: 'center 60%'
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Text overlay - Top */}
        <div className="absolute top-0 left-0 right-0 flex flex-col items-center pt-8 md:pt-12 px-6">
          <h1 className="font-serif text-6xl md:text-7xl font-bold text-white mb-3 drop-shadow-lg">
            404
          </h1>
          <p className="text-xl md:text-2xl text-white font-medium mb-1 drop-shadow-md text-center">
            {t('notFound.title')}
          </p>
          <p className="text-lg md:text-xl text-white/90 font-medium mb-5 drop-shadow-md italic">
            {t('notFound.orDoesIt')}
          </p>
          
          <Button asChild size="lg" className="gap-2">
            <Link to="/">
              <Home className="h-5 w-5" />
              {t('notFound.backHome')}
            </Link>
          </Button>
        </div>

        {/* Tunnel Info - Bottom overlay */}
        <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6">
          <div className="bg-black/50 backdrop-blur-sm rounded-lg px-5 py-4 text-left">
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
    </div>
  );
};

export default NotFound;
