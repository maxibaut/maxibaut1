import emailjs from '@emailjs/browser';

// EmailJS configuration (public keys - safe to include in frontend)
const EMAILJS_SERVICE_ID = 'service_6226qav';
const EMAILJS_TEMPLATE_ID = 'template_5n62t8r';

// Email translations for multilingual support
const emailTranslations = {
  nl: {
    onderwerp: "Nieuwe aanvraag via ArdenNest.be",
    intro_tekst: "Hallo! Er is een nieuwe aanvraag binnengekomen via ardennest.be.",
    form_naam: "Naam",
    form_email: "Email",
    form_telefoon: "Telefoon",
    form_groep: "Groepssamenstelling",
    form_periode: "Gewenste periode",
    form_bericht: "Bericht",
    reply_tip: "Klik op reply om rechtstreeks te antwoorden naar"
  },
  fr: {
    onderwerp: "Nouvelle demande via ArdenNest.be",
    intro_tekst: "Bonjour! Une nouvelle demande est arrivée via ardennest.be.",
    form_naam: "Nom",
    form_email: "Email",
    form_telefoon: "Téléphone",
    form_groep: "Composition du groupe",
    form_periode: "Période souhaitée",
    form_bericht: "Message",
    reply_tip: "Cliquez sur répondre pour contacter directement"
  },
  en: {
    onderwerp: "New inquiry via ArdenNest.be",
    intro_tekst: "Hello! A new inquiry has been received via ardennest.be.",
    form_naam: "Name",
    form_email: "Email",
    form_telefoon: "Phone",
    form_groep: "Group composition",
    form_periode: "Preferred period",
    form_bericht: "Message",
    reply_tip: "Click reply to respond directly to"
  },
  de: {
    onderwerp: "Neue Anfrage über ArdenNest.be",
    intro_tekst: "Hallo! Eine neue Anfrage ist über ardennest.be eingegangen.",
    form_naam: "Name",
    form_email: "E-Mail",
    form_telefoon: "Telefon",
    form_groep: "Gruppenzusammensetzung",
    form_periode: "Gewünschter Zeitraum",
    form_bericht: "Nachricht",
    reply_tip: "Klicken Sie auf Antworten, um direkt zu kontaktieren"
  }
} as const;

type SupportedLanguage = keyof typeof emailTranslations;

export interface ContactFormEmailData {
  naam: string;
  email: string;
  telefoon: string;
  groepssamenstelling: string;
  gewenste_periode: string;
  bericht: string;
  language?: string;
}

/**
 * Send contact form data via EmailJS with multilingual support
 * @param formData - The form data object with Dutch field names for the EmailJS template
 * @returns Promise that resolves when email is sent successfully
 */
export const sendContactEmail = async (formData: ContactFormEmailData): Promise<void> => {
  // Detect language and get translations
  const lang = (formData.language || 'nl') as SupportedLanguage;
  const translations = emailTranslations[lang] || emailTranslations.nl;
  
  // Build template params with form data and translated labels
  const templateParams = {
    // Form data
    naam: formData.naam,
    email: formData.email,
    telefoon: formData.telefoon,
    groepssamenstelling: formData.groepssamenstelling,
    gewenste_periode: formData.gewenste_periode,
    bericht: formData.bericht,
    // Translated labels
    onderwerp: translations.onderwerp,
    intro_tekst: translations.intro_tekst,
    form_naam: translations.form_naam,
    form_email: translations.form_email,
    form_telefoon: translations.form_telefoon,
    form_groep: translations.form_groep,
    form_periode: translations.form_periode,
    form_bericht: translations.form_bericht,
    reply_tip: `${translations.reply_tip} ${formData.email}`
  };

  await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
};
