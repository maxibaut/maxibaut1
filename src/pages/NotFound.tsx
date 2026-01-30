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
      <div className="relative w-full max-w-3xl aspect-[4/3] rounded-xl overflow-hidden shadow-2xl mb-8">
        <div 
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{ 
            backgroundImage: `url(${tunnelImage})`,
            backgroundPosition: 'center 60%'
          }}
        />
        <div className="absolute inset-0 bg-black/30" />
        
        {/* Text overlay on image */}
        <div className="absolute inset-0 flex flex-col items-center justify-start pt-8 md:pt-12 px-6">
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
      </div>

      {/* Tunnel Info - Below image */}
      <div className="bg-muted rounded-lg px-6 py-4 text-left max-w-md">
        <p className="text-foreground font-semibold text-lg mb-2">{t('notFound.tunnelName')}</p>
        <ul className="text-muted-foreground text-sm space-y-1">
          <li>• {t('notFound.railwayLine')}</li>
          <li>• {t('notFound.outOfService')}</li>
          <li>• {t('notFound.nowRavel')}</li>
          <li>• {t('notFound.distance')}</li>
        </ul>
      </div>
    </div>
  );
};

export default NotFound;
