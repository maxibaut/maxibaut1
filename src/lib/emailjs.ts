import emailjs from '@emailjs/browser';

// EmailJS configuration (public keys - safe to include in frontend)
const EMAILJS_SERVICE_ID = 'service_6226qav';
const EMAILJS_TEMPLATE_ID = 'template_5n62t8r';

export type SupportedLanguage = 'nl' | 'fr' | 'en' | 'de';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  groupSize: string;
  dates: string;
  message: string;
}

export interface EmailTranslations {
  subject: string;
  intro: string;
  labels: {
    name: string;
    email: string;
    phone: string;
    groupSize: string;
    dates: string;
    message: string;
  };
  replyTip: string;
}

/**
 * Send contact form data via EmailJS with localized email content
 * @param formData - The form data object
 * @param translations - Localized strings for the email
 * @returns Promise that resolves when email is sent successfully
 */
export const sendContactEmail = async (
  formData: ContactFormData,
  translations: EmailTranslations
): Promise<void> => {
  const emailData = {
    // Subject line
    subject: translations.subject,
    // Intro text
    intro: translations.intro,
    // Labels
    label_naam: translations.labels.name,
    label_email: translations.labels.email,
    label_telefoon: translations.labels.phone,
    label_groepssamenstelling: translations.labels.groupSize,
    label_gewenste_periode: translations.labels.dates,
    label_bericht: translations.labels.message,
    // Values
    naam: formData.name,
    email: formData.email,
    telefoon: formData.phone || '-',
    groepssamenstelling: formData.groupSize || '-',
    gewenste_periode: formData.dates || '-',
    bericht: formData.message,
    // Reply tip
    reply_tip: translations.replyTip,
  };

  await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, emailData as unknown as Record<string, unknown>);
};
