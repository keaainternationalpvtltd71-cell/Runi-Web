import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './routes.jsx';
import './index.css';
export const createRoot = ViteReactSSG({ routes, basename: '/' }, ({ isClient }) => {
  if (isClient) {
    const id = import.meta.env.VITE_GA_ID;
    if (id && !window.gtag) {
      const s = document.createElement('script'); s.async = true; s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`; document.head.appendChild(s);
      window.dataLayer = window.dataLayer || []; window.gtag = function () { window.dataLayer.push(arguments); }; window.gtag('js', new Date()); window.gtag('config', id, { anonymize_ip: true });
    }
  }
});
