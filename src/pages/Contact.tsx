import { useState } from 'react';
import { PageWrapper } from '@/components/layout';
import { useTranslation } from 'react-i18next';
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
} from 'lucide-react';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Naam is verplicht').max(100),
  email: z.string().trim().email('Ongeldig e-mailadres').max(255),
  phone: z.string().trim().optional(),
  dates: z.string().trim().optional(),
  groupSize: z.string().trim().optional(),
  message: z.string().trim().min(1, 'Bericht is verplicht').max(1000),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const { t } = useTranslation('contact');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      dates: '',
      groupSize: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Form submitted:', data);
    toast({
      title: 'Bericht verzonden!',
      description: t('form.success'),
    });
    form.reset();
    setIsSubmitting(false);
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
      href: 'https://wa.me/32478030352?text=Hallo%2C%20ik%20heb%20interesse%20in%20ArdenNest.',
    },
  ];

  const faqQuestions = t('faq.questions', { returnObjects: true }) as Array<{
    q: string;
    a: string;
  }>;

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground section-padding">
        <div className="container-luxury text-center">
          <h1 className="heading-display mb-4">{t('title')}</h1>
          <p className="body-large text-primary-foreground/80">{t('subtitle')}</p>
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

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? 'Verzenden...' : t('form.submit')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Practical Information */}
            <div className="space-y-6">
              <h2 className="heading-3">{t('practical.title')}</h2>

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
                    <p className="text-sm text-muted-foreground">
                      {t('practical.location.address')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t('practical.location.region')}
                    </p>
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
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

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
