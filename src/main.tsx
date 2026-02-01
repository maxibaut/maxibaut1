import '@fontsource/playfair-display/400.css';
import '@fontsource/playfair-display/500.css';
import '@fontsource/playfair-display/600.css';
import '@fontsource/playfair-display/700.css';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

import emailjs from '@emailjs/browser';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './lib/i18n';
import './index.css';

// Initialize EmailJS with public key
const emailjsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
if (emailjsPublicKey) {
  emailjs.init(emailjsPublicKey);
}

createRoot(document.getElementById("root")!).render(<App />);
