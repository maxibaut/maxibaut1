import { PageWrapper } from '@/components/layout';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Shield, Calendar, ArrowRight, Phone, Mail } from 'lucide-react';

const Booking = () => {
  const { t } = useTranslation('booking');

  const benefits = t('whyDirect.benefits', { returnObjects: true }) as string[];
  const afterBookingSteps = t('afterBooking.steps', { returnObjects: true }) as string[];

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground section-padding">
        <div className="container-luxury text-center">
          <h1 className="heading-display mb-4">{t('title')}</h1>
          <p className="body-large text-primary-foreground/80">{t('subtitle')}</p>
        </div>
      </section>

      {/* Why Book Direct */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-2 mb-6">{t('whyDirect.title')}</h2>
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
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop"
                alt="ArdenNest property"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Availability Section */}
      <section className="section-padding bg-cream-dark">
        <div className="container-luxury">
          <Card className="max-w-3xl mx-auto">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h2 className="heading-2 mb-4">{t('availability.title')}</h2>
              <p className="body-large text-muted-foreground mb-8">
                {t('availability.description')}
              </p>
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground min-w-[250px]"
              >
                <a
                  href="https://beds24.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('availability.button')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                U wordt doorgestuurd naar ons beveiligd boekingssysteem
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Prefer to Talk */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-2 mb-4">{t('preferTalk.title')}</h2>
            <p className="body-large text-muted-foreground mb-8">
              {t('preferTalk.description')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild variant="outline" size="lg">
                <a href="tel:+32123456789">
                  <Phone className="mr-2 h-5 w-5" />
                  Bel ons
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="mailto:info@ardennest.be">
                  <Mail className="mr-2 h-5 w-5" />
                  Mail ons
                </a>
              </Button>
              <Button asChild size="lg">
                <Link to="/contact">{t('preferTalk.cta')}</Link>
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
            <h2 className="heading-2 mb-4">{t('payment.title')}</h2>
            <p className="body-large text-primary-foreground/80">
              {t('payment.description')}
            </p>
          </div>
        </div>
      </section>

      {/* After Booking */}
      <section className="section-padding bg-cream-dark">
        <div className="container-luxury">
          <div className="max-w-3xl mx-auto">
            <h2 className="heading-2 text-center mb-12">{t('afterBooking.title')}</h2>
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
