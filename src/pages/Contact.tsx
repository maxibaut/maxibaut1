import { useState } from 'react';
import { useLazyIframe } from '@/hooks/useLazyIframe';
import { PageWrapper } from '@/components/layout';
import { useTranslation } from 'react-i18next';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import {
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  Clock,
  Car,
  ArrowRight,
  Wifi,
  PawPrint,
  Cigarette,
  MegaphoneOff,
  Loader2,
  Heart,
} from 'lucide-react';
import { MdFamilyRestroom } from 'react-icons/md';
import { FaChargingStation } from 'react-icons/fa6';
import hostBieke from '@/assets/property/host-bieke.jpg';
import { useSEO } from '@/hooks/useSEO';
import { sendContactEmail, EmailTranslations } from '@/lib/emailjs';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Naam is verplicht').max(100),
  email: z.string().trim().email('Ongeldig e-mailadres').max(255),
  phone: z.string().trim().optional(),
  dates: z.string().trim().optional(),
  groupSize: z.string().trim().optional(),
  message: z.string().trim().min(1, 'Bericht is verplicht').max(1000),
  website: z.string().optional(), // Honeypot field
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const { t } = useTranslation('contact');
  const [isSubmitting, setIsSubmitting] = useState(false);
  useSEO();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      dates: '',
      groupSize: '',
      message: '',
      website: '', // Honeypot field
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    // Honeypot check: if website field is filled, it's a bot
    if (data.website) {
      // Fake success for bots - don't send to EmailJS
      toast({
        title: t('form.successTitle'),
        description: t('form.success'),
      });
      form.reset();
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Get localized email content from translations
      const emailTranslations: EmailTranslations = {
        subject: t('form.emailContent.subject'),
        intro: t('form.emailContent.intro'),
        labels: {
          name: t('form.name'),
          email: t('form.email'),
          phone: t('form.phone'),
          groupSize: t('form.groupSize'),
          dates: t('form.dates'),
          message: t('form.message'),
        },
        replyTip: t('form.emailContent.replyTip'),
      };

      // Map form data (without honeypot field)
      const formData = {
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        groupSize: data.groupSize || '',
        dates: data.dates || '',
        message: data.message,
      };

      await sendContactEmail(formData, emailTranslations);

      toast({
        title: t('form.successTitle'),
        description: t('form.success'),
      });
      form.reset();
    } catch (error) {
      console.error('EmailJS error:', error);
      toast({
        title: t('form.errorTitle'),
        description: t('form.error'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactOptions = [
    {
      icon: Phone,
      title: t('options.phone.title'),
      description: t('options.phone.description'),
      action: t('options.phone.action'),
      href: 'tel:+32478030352',
    },
    {
      icon: Mail,
      title: t('options.email.title'),
      description: t('options.email.description'),
      action: t('options.email.action'),
      href: 'mailto:bieke@ardennest.be',
    },
    {
      icon: MessageCircle,
      title: t('options.whatsapp.title'),
      description: t('options.whatsapp.description'),
      action: t('options.whatsapp.action'),
      href: 'https://wa.me/32478030352?text=Hallo%2C%20ik%20heb%20interesse%20in%20Arden%27Nest.',
    },
  ];

  const faqQuestions = t('faq.questions', { returnObjects: true }) as Array<{
    q: string;
    a: string;
    link?: string;
    linkText?: string;
  }>;

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground section-padding">
        <div className="container-luxury">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
            {/* Small Photo */}
            <img 
              src={hostBieke} 
              alt={t('hero.imageAlt', 'Bieke, uw persoonlijke gastvrouw bij Arden\'Nest - altijd bereikbaar voor vragen en tips')}
              width={128}
              height={128}
              loading="lazy"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-primary-foreground/20"
            />
            {/* Text */}
            <div className="text-center md:text-left">
              <h1 className="heading-display mb-2">{t('title')}</h1>
              <p className="body-large text-primary-foreground/80">{t('subtitle')}</p>
              <p className="text-lg text-primary-foreground/70 mt-2 italic">— {t('signature')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {contactOptions.map((option, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <option.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold mb-2">
                    {option.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-grow">
                    {option.description}
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <a href={option.href}>{option.action}</a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form + Practical Info */}
      <section className="section-padding bg-cream-dark">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">{t('form.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('form.name')}</FormLabel>
                            <FormControl>
                              <Input placeholder={t('form.namePlaceholder')} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('form.email')}</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder={t('form.emailPlaceholder')}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('form.phone')}</FormLabel>
                            <FormControl>
                              <Input placeholder={t('form.phonePlaceholder')} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="groupSize"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('form.groupSize')}</FormLabel>
                            <FormControl>
                              <Input
                                placeholder={t('form.groupSizePlaceholder')}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="dates"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('form.dates')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('form.datesPlaceholder')} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('form.message')}</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={t('form.messagePlaceholder')}
                              rows={4}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Honeypot field - hidden from real users */}
                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem
                          style={{
                            position: 'absolute',
                            left: '-9999px',
                            top: '-9999px',
                          }}
                        >
                          <FormLabel>Website</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              tabIndex={-1}
                              autoComplete="off"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {t('form.submitting')}
                        </>
                      ) : (
                        <>
                          {t('form.submit')}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Practical Information */}
            <div className="space-y-6">
              <h2 className="heading-3">{t('practical.title')}</h2>

              {/* On-site host badge */}
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-4 flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{t('practical.onSiteHost')}</h4>
                    <p className="text-sm text-muted-foreground">
                      {t('practical.availability')}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* House Rules Icons */}
              <div className="flex flex-wrap justify-center gap-6">
                {/* 26 personen - allowed */}
                <div className="flex flex-col items-center">
                  <div className="bg-emerald-50 rounded-full p-2">
                    <MdFamilyRestroom className="h-6 w-6 text-emerald-600" />
                  </div>
                  <span className="text-xs text-gray-600 mt-1">{t('practical.amenities.guests')}</span>
                </div>

                {/* Oplaadpunt EV - allowed */}
                <div className="flex flex-col items-center">
                  <div className="bg-emerald-50 rounded-full p-2">
                    <FaChargingStation className="h-6 w-6 text-emerald-600" />
                  </div>
                  <span className="text-xs text-gray-600 mt-1">{t('practical.amenities.charging')}</span>
                </div>

                {/* Wifi - allowed */}
                <div className="flex flex-col items-center">
                  <div className="bg-emerald-50 rounded-full p-2">
                    <Wifi className="h-6 w-6 text-emerald-600" />
                  </div>
                  <span className="text-xs text-gray-600 mt-1">{t('practical.amenities.wifi')}</span>
                </div>

                {/* Geen huisdieren - not allowed */}
                <div className="flex flex-col items-center">
                  <div className="relative bg-gray-50 rounded-full p-2">
                    <PawPrint className="h-6 w-6 text-gray-400" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-0.5 bg-red-500 rotate-45" />
                    </div>
                  </div>
                  <span className="text-xs text-gray-600 mt-1">{t('practical.amenities.noPets')}</span>
                </div>

                {/* Niet roken - not allowed */}
                <div className="flex flex-col items-center">
                  <div className="relative bg-gray-50 rounded-full p-2">
                    <Cigarette className="h-6 w-6 text-gray-400" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-0.5 bg-red-500 rotate-45" />
                    </div>
                  </div>
                  <span className="text-xs text-gray-600 mt-1">{t('practical.amenities.noSmoking')}</span>
                </div>

                {/* Geen feestjes - not allowed */}
                <div className="flex flex-col items-center">
                  <div className="relative bg-gray-50 rounded-full p-2">
                    <MegaphoneOff className="h-6 w-6 text-gray-400" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-0.5 bg-red-500 rotate-45" />
                    </div>
                  </div>
                  <span className="text-xs text-gray-600 mt-1">{t('practical.amenities.noParties')}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">{t('practical.checkIn.title')}</h4>
                      <p className="text-sm text-muted-foreground">
                        {t('practical.checkIn.time')}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">{t('practical.checkOut.title')}</h4>
                      <p className="text-sm text-muted-foreground">
                        {t('practical.checkOut.time')}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardContent className="p-4 flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">{t('practical.location.title')}</h4>
                    <a 
                      href="https://www.google.com/maps/search/?api=1&query=Rue+de+la+Ferme+3,+5575+Malvoisin,+Belgium"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <p>{t('practical.location.address')}</p>
                      <p>{t('practical.location.postalCity')}</p>
                      <p>{t('practical.location.region')}</p>
                      <p>{t('practical.location.country')}</p>
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3 mb-3">
                    <Car className="h-5 w-5 text-primary mt-0.5" />
                    <h4 className="font-medium">{t('practical.distances.title')}</h4>
                  </div>
                  <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-muted-foreground">
                    {[
                      t('practical.distances.brussels'),
                      t('practical.distances.antwerp'),
                      t('practical.distances.hasselt'),
                      t('practical.distances.brugge') || t('practical.distances.bruges'),
                      t('practical.distances.trier'),
                      t('practical.distances.utrecht'),
                      t('practical.distances.cologne'),
                      t('practical.distances.amsterdam'),
                      t('practical.distances.paris'),
                    ].map((distance, index) => {
                      const [city, time] = distance.split(': ');
                      return (
                        <li key={index} className="flex justify-between">
                          <span>{city}</span>
                          <span className="tabular-nums">{time}</span>
                        </li>
                      );
                    })}
                    <li>
                      <a 
                        href="https://www.google.com/maps/dir/?api=1&destination=Rue+de+la+Ferme+3,+5575+Malvoisin,+Belgium"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1"
                      >
                        {t('practical.distances.calculate')}
                        <ArrowRight className="h-3 w-3" />
                      </a>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps — lazy loaded on scroll */}
      <LazyGoogleMap />

      {/* FAQ */}
      <section className="section-padding bg-background">
        <div className="container-luxury max-w-3xl">
          <h2 className="heading-2 text-center mb-8">{t('faq.title')}</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqQuestions.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.a}
                  {faq.link && faq.linkText && (
                    <>
                      {' '}
                      <Link 
                        to={faq.link} 
                        className="text-primary hover:underline font-medium"
                      >
                        {faq.linkText} →
                      </Link>
                    </>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Contact;
