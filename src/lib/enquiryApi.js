/**
 * Sends the site's forms to the shared enquiry API (one lead desk for both brands). The server
 * tells the brands apart by the Turnstile hostname and the Origin header, never by anything in
 * the body, and only POST /api/contact, /api/rfq and /api/catalogue-requests accept this origin.
 *
 * The API address is a build setting, VITE_API_BASE_URL (e.g. https://api.runiindustries.eu),
 * never written into the code. Left empty, `formsEnabled` is false and the forms keep showing the
 * email / phone notice, so a preview build without the variable cannot send anything.
 */
const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').trim().replace(/\/+$/, '');

export const formsEnabled = Boolean(API_BASE);

/** Server limit for the message field (PublicFormRequests.MAX_MESSAGE). */
export const MAX_MESSAGE = 4000;

/**
 * The `meta` block every public form sends: bot evidence the server scores (a failed check marks
 * the lead for review, it never refuses it) and the page the visitor sent it from. Best effort:
 * anything unavailable is null.
 */
export function buildMeta({ turnstileToken, website, startedAt }) {
  let landingPage = null;
  let referrer = null;
  try { landingPage = window.location.href.slice(0, 500); } catch { /* no window */ }
  try { referrer = document.referrer ? document.referrer.slice(0, 500) : null; } catch { /* no document */ }
  return {
    turnstileToken: turnstileToken || null,
    website: website || '',
    elapsedMs: startedAt ? Date.now() - startedAt : null,
    countryCode: null,
    utmSource: null, utmMedium: null, utmCampaign: null, utmTerm: null, utmContent: null,
    landingPage,
    referrer,
  };
}

/**
 * POST one form. Resolves to { ok, status, fields, error } and never throws.
 *   200 -> ok
 *   400 -> fields: { field: message } for the highlighted inputs
 *   429 -> error: the server's "too many submissions" sentence
 */
export async function postEnquiry(path, payload) {
  try {
    const r = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const body = await r.json().catch(() => ({}));
    if (r.ok) return { ok: true, status: r.status };
    return { ok: false, status: r.status, fields: body.fields || null, error: body.error || null };
  } catch {
    return { ok: false, status: 0, fields: null, error: null };
  }
}
