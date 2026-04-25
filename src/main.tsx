// Critical font preload — inject before fontsource CSS imports parse so the
// browser can fetch above-fold woff2 in parallel with the bundle.
import interLatin400 from '@fontsource/inter/files/inter-latin-400-normal.woff2?url';
import interLatin600 from '@fontsource/inter/files/inter-latin-600-normal.woff2?url';
import playfairLatin500 from '@fontsource/playfair-display/files/playfair-display-latin-500-normal.woff2?url';

[interLatin400, interLatin600, playfairLatin500].forEach((href) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'font';
  link.type = 'font/woff2';
  link.crossOrigin = 'anonymous';
  link.href = href;
  document.head.appendChild(link);
});

import '@fontsource/playfair-display/latin-500.css';
import '@fontsource/playfair-display/latin-600.css';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-600.css';

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
