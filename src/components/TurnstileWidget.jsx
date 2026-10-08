import { useEffect, useRef, useState } from 'react';

/**
 * Cloudflare Turnstile, rendered explicitly so the script loads only on pages with a form.
 *
 * The site key is a build setting (VITE_TURNSTILE_SITE_KEY): the same widget the enquiry API's
 * secret verifies, with runiindustries.eu on its hostname list. No key, a blocked script or a
 * widget error all render nothing and leave the token null: the form still sends, and the server
 * marks the lead for a human check instead of refusing it.
 */
const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || '';
const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

let scriptPromise = null;

function loadTurnstile() {
  if (typeof window === 'undefined') return Promise.resolve(false);
  if (window.turnstile) return Promise.resolve(true);
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(Boolean(window.turnstile));
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });
  return scriptPromise;
}

export default function TurnstileWidget({ onToken, action = 'submit', className = '' }) {
  const hostRef = useRef(null);
  const widgetIdRef = useRef(null);
  const onTokenRef = useRef(onToken);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => { onTokenRef.current = onToken; }, [onToken]);

  useEffect(() => {
    if (!SITE_KEY) { setUnavailable(true); return undefined; }
    let cancelled = false;
    loadTurnstile().then((ready) => {
      if (cancelled || !ready || !hostRef.current) {
        if (!cancelled && !ready) setUnavailable(true);
        return;
      }
      try {
        widgetIdRef.current = window.turnstile.render(hostRef.current, {
          sitekey: SITE_KEY,
          action,
          theme: 'light',
          callback: (token) => onTokenRef.current?.(token),
          'expired-callback': () => onTokenRef.current?.(null),
          'error-callback': () => { onTokenRef.current?.(null); setUnavailable(true); },
        });
      } catch {
        setUnavailable(true);
      }
    });
    return () => {
      cancelled = true;
      try {
        if (widgetIdRef.current && window.turnstile) window.turnstile.remove(widgetIdRef.current);
      } catch { /* already gone */ }
    };
  }, [action]);

  if (unavailable) return null;
  return <div ref={hostRef} className={className} />;
}
