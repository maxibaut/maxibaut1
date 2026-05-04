import { useTranslation } from 'react-i18next';

export const LocationMap = () => {
  const { t } = useTranslation('common');

  return (
    <section
      className="section-padding bg-cream-dark"
      aria-labelledby="locationmap-heading"
    >
      <div className="container-luxury">
        <h2
          id="locationmap-heading"
          className="heading-2 text-center mb-8"
        >
          {t('locationMap.heading')}
        </h2>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2 rounded-lg overflow-hidden shadow-md aspect-[4/3] md:aspect-[16/9]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4403.470904866242!2d4.960254777559448!3d50.012070618829796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c1dc0a433b3a8f%3A0x7315788d91c91cbd!2sArdenNest%20Gedinne!5e0!3m2!1snl!2sbe!4v1777921916993!5m2!1snl!2sbe"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t('locationMap.iframeTitle')}
              className="w-full h-full"
            />
          </div>

          <address className="not-italic space-y-3 text-base">
            <div className="font-medium">ArdenNest</div>
            <div className="text-muted-foreground">
              Rue de la Ferme 3<br />
              5575 Gedinne<br />
              {t('footer.country')}
            </div>
            <div>
              <a
                href="tel:+32478030352"
                className="hover:text-primary transition-colors"
              >
                +32 478 03 03 52
              </a>
            </div>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Rue+de+la+Ferme+3+5575+Gedinne"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              {t('locationMap.directionsCta')}
            </a>
          </address>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;
