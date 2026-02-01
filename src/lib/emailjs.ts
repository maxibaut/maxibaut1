import emailjs from '@emailjs/browser';

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
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

  if (!serviceId || !templateId) {
    throw new Error('EmailJS configuration is missing. Please set VITE_EMAILJS_SERVICE_ID and VITE_EMAILJS_TEMPLATE_ID.');
  }

  // Log form data before sending (for debugging and template setup)
  console.log('📧 EmailJS - Form data being sent:', formData);

  await emailjs.send(serviceId, templateId, formData as unknown as Record<string, unknown>);
};
