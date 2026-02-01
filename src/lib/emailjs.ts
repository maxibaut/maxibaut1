import emailjs from '@emailjs/browser';

// EmailJS configuration (public keys - safe to include in frontend)
const EMAILJS_SERVICE_ID = 'service_6226qav';
const EMAILJS_TEMPLATE_ID = 'template_5n62t8r';

export interface ContactFormEmailData {
  naam: string;
  email: string;
  telefoon: string;
  groepssamenstelling: string;
  gewenste_periode: string;
  bericht: string;
}

/**
 * Send contact form data via EmailJS
 * @param formData - The form data object with Dutch field names for the EmailJS template
 * @returns Promise that resolves when email is sent successfully
 */
export const sendContactEmail = async (formData: ContactFormEmailData): Promise<void> => {
  await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formData as unknown as Record<string, unknown>);
};
