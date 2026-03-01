import '@fontsource/playfair-display/500.css';
import '@fontsource/playfair-display/600.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';

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
