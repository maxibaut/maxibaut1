import { PageWrapper } from "@/components/layout";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Shield, Calendar, ArrowRight, Phone, Mail } from "lucide-react";
import ferme172 from "@/assets/property/ardennest-exterieur-detail.jpg?format=webp";
import hostBieke from "@/assets/property/ardennest-gastvrouw-bieke.jpg?format=webp";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useSEO } from "@/hooks/useSEO";
import { useLazyIframe } from "@/hooks/useLazyIframe";

const Booking = () => {
  const { t, i18n } = useTranslation("booking");
  const location = useLocation();
  useSEO();
  const { ref: iframeRef, isVisible: iframeVisible } = useLazyIframe('400px');

  const langMap: Record<string, string> = { nl: "nl", fr: "fr", en: "en", de: "de" };
  const beds24Lang = langMap[i18n.language] || "en";
  const baseSrc = `https://beds24.com/booking2.php?propid=28947&referer=iframe&lang=${beds24Lang}`;
  const extraParams = location.search ? `&${location.search.slice(1)}` : "";
  const iframeSrc = `${baseSrc}${extraParams}`;

  const benefits = t("whyDirect.benefits", { returnObjects: true }) as string[];
  const afterBookingSteps = t("afterBooking.steps", { returnObjects: true }) as string[];

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground section-padding">
        <div className="container-luxury text-center">
          <p className="heading-display mb-4">{t("title")}</p>
          <h1 className="font-serif text-2xl md:text-3xl text-primary-foreground/90 max-w-2xl mx-auto font-normal">{t("h1")}</h1>
        </div>
      </section>

      {/* Why Book Direct */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-2 mb-6">{t("whyDirect.title")}</h2>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
              <img src={ferme172} alt={t('whyDirect.imageAlt', 'Fruitschaal en gezelschapsspellen op eiken tafel bij Arden\'Nest')} width={800} height={600} loading="lazy" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Availability Section with Beds24 Widget */}
      <section className="section-padding bg-cream-dark">
        <div className="container-luxury">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Calendar className="h-8 w-8 text-primary" />
            </div>
            <h2 className="heading-2 mb-4">{t("availability.title")}</h2>
            <p className="body-large text-muted-foreground">{t("availability.description")}</p>
          </div>

          {/* Beds24 Booking Widget */}
          <div ref={iframeRef} className="max-w-4xl mx-auto bg-background rounded-lg shadow-lg overflow-hidden">
            {iframeVisible ? (
              <iframe
                src={iframeSrc}
                width="100%"
                height="2000"
                style={{ maxWidth: "100%", border: "none", overflow: "auto" }}
                title={t("availability.title")}
              >
                <p>
                  <a href="https://beds24.com/booking2.php?propid=28947&referer=iframe" title="Book Now">
                    {t("availability.button")}
                  </a>
                </p>
              </iframe>
            ) : (
              <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                {t("availability.title")}...
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Prefer to Talk */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="max-w-3xl mx-auto text-center">
            {/* Bieke's Avatar */}
            <div className="flex justify-center mb-6">
              <Avatar className="h-24 w-24 border-4 border-primary/10 shadow-lg">
                <AvatarImage src={hostBieke} alt={t('preferTalk.imageAlt', 'Bieke, uw gastvrouw - bel of mail voor persoonlijk advies')} className="object-cover" />
                <AvatarFallback>B</AvatarFallback>
              </Avatar>
            </div>
            <h2 className="heading-2 mb-4">{t("preferTalk.title")}</h2>
            <p className="body-large text-muted-foreground mb-8">{t("preferTalk.description")}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild variant="outline" size="lg">
                <a href="tel:+32478030352">
                  <Phone className="mr-2 h-5 w-5" />
                  {t("preferTalk.callBieke")}
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="mailto:bieke@ardennest.be">
                  <Mail className="mr-2 h-5 w-5" />
                  {t("preferTalk.mailBieke")}
                </a>
              </Button>
              <Button asChild size="lg">
                <Link to="/contact">{t("preferTalk.cta")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Security */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-luxury">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-primary-foreground/10 flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-gold" />
            </div>
            <h2 className="heading-2 mb-4">{t("payment.title")}</h2>
            <p className="body-large text-primary-foreground/90">{t("payment.description")}</p>
          </div>
        </div>
      </section>

      {/* After Booking */}
      <section className="section-padding bg-cream-dark">
        <div className="container-luxury">
          <div className="max-w-3xl mx-auto">
            <h2 className="heading-2 text-center mb-12">{t("afterBooking.title")}</h2>
            <div className="space-y-6">
              {afterBookingSteps.map((step, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>
                  <div className="pt-2">
                    <p className="text-foreground">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Booking;
