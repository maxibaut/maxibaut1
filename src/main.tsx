import '@fontsource/playfair-display/latin-500.css';
import '@fontsource/playfair-display/latin-ext-500.css';
import '@fontsource/playfair-display/latin-600.css';
import '@fontsource/playfair-display/latin-ext-600.css';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-ext-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-ext-500.css';
import '@fontsource/inter/latin-600.css';
import '@fontsource/inter/latin-ext-600.css';

import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './lib/i18n';
import './index.css';

// Defer EmailJS initialization until after first paint
const initEmailJS = () => import('@emailjs/browser').then(m => m.default.init('GOWvcryg-MOYFp0nk'));
if ('requestIdleCallback' in window) {
  (window as any).requestIdleCallback(initEmailJS);
} else {
  setTimeout(initEmailJS, 2000);
}

createRoot(document.getElementById("root")!).render(<App />);
