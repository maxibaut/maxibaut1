// Web3Forms configuration
// Access key will be set once provided by user
const WEB3FORMS_ACCESS_KEY = 'YOUR_ACCESS_KEY_HERE';
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

export interface ContactFormData {
  naam: string;
  email: string;
  telefoon: string;
  groepssamenstelling: string;
  gewenste_periode: string;
  bericht: string;
}

interface Web3FormsResponse {
  success: boolean;
  message: string;
}

/**
 * Send contact form data via Web3Forms
 * @param formData - The form data object with Dutch field names
 * @returns Promise that resolves when email is sent successfully
 */
export const sendContactEmail = async (formData: ContactFormData): Promise<void> => {
  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `Nieuwe aanvraag via ArdenNest.be - ${formData.naam}`,
      from_name: formData.naam,
      naam: formData.naam,
      email: formData.email,
      telefoon: formData.telefoon || '-',
      groepssamenstelling: formData.groepssamenstelling || '-',
      gewenste_periode: formData.gewenste_periode || '-',
      bericht: formData.bericht,
    }),
  });

  const result: Web3FormsResponse = await response.json();

  if (!result.success) {
    throw new Error(result.message || 'Failed to send message');
  }
};
