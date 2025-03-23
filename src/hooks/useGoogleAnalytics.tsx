import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GA_TRACKING_ID = 'G-0E2RX96WQ'; 

declare global {
  interface Window {
    gtag?: (command: string, action: string, params?: Record<string, any>) => void;
  }
}

export const useGoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    if (!window.gtag) {
      const script1 = document.createElement('script');
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
      script1.async = true;
      document.head.appendChild(script1);

      const script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', '${GA_TRACKING_ID}', { 'send_page_view': false });
      `;
      document.head.appendChild(script2);
    }
  }, []);

  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', GA_TRACKING_ID, {
        page_path: location.pathname,
      });
    }
  }, [location]);
};
